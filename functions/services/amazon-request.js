const functions = require('firebase-functions');
const crypto = require('crypto');
const amazonConfig = functions.config().amzn;

// test ASIN codes
// B00A6TRKO4
// B07456NHZ7
// B073W7MGL4
exports.byASIN = function(asin) {
  const baseUrl = amazonConfig.base_url;
  const endpoint = amazonConfig.endpoint;
  const params = configureParams('ASIN', asin);
  const query = constructQuery(params);

  const stringToSign = `GET\n${baseUrl}\n${endpoint}\n${query}`;

  const signature = encryptString(stringToSign);

  return `https://${baseUrl}${endpoint}?${query}&Signature=${signature}`;
};

const configureParams = (type, asin) => {
  const accessKey = amazonConfig.access_key;
  const associateTag = amazonConfig.associate_tag;

  // IMPORTANT: the listed order of params is very important. Don't touch.
  return {
    AWSAccessKeyId: accessKey,
    AssociateTag: associateTag,
    IdType: type,
    ItemId: asin,
    Operation: 'ItemLookup',
    ResponseGroup: 'ItemAttributes',
    Service: 'AWSECommerceService',
    Timestamp: new Date().toISOString()
  };
};

const constructQuery = (params) => {
  return Object.keys(params)
    .reduce((acc, value) => {
      return `${acc}&${encodeURIComponent(value)}=${encodeURIComponent(params[value])}`;
    }, '')
    .slice(1);
};

const encryptString = (stringToSign) => {
  const secretKey = amazonConfig.secret_key;
  const hmac = crypto.createHmac('sha256', secretKey);

  return encodeURIComponent(hmac.update(stringToSign).digest('base64'));
};