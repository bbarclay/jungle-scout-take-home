const amazonReq = require('./services/amazon-request');
const axios = require('axios');
const cors = require('cors')({origin: true});
const fromXML = require('from-xml').fromXML;
const functions = require('firebase-functions');

exports.findByASIN = functions.https.onCall((data, context) => {
  const asinCode = data.asinCode;

  if(asinCode) {
    const requestUrl = amazonReq.byASIN(asinCode);

    return axios
      .get(`${requestUrl}`, { crossdomain: true, method: 'GET' })
      .then(response => {
        const data = fromXML(response.data).ItemLookupResponse.Items;
        const errors = data.Request.Errors;
        const item = data.Item;

        return({ "item": item, "errors": errors });
      })
      .catch(error => {
        throw new functions.https.HttpsError(error);
      })
  } else {
    return('Need an ASIN code, please.');
  }
})