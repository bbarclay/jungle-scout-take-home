export default class AmazonProduct {
  /**
   * Amazon products are structured with a lot of
   * cruft for our needs. This class maps those raw
   * and cruft-y attributes to something more purposeful
   * for our needs.
   *
   * @param {Object} product
   * @returns {Object}
   */
  constructor(product) {
    this.itemAttributes = product.ItemAttributes;

    this.dimensions = this.dimensions();
    this.price = this.price();

    this.title = this.itemAttributes.Title;
    this.asin = product.ASIN;
    this.url = product.DetailPageURL;
  }

  /**
   * Formats an Amazon product's list price to be a little
   * cleaner of an interface.
   *
   * ie. We turn `product.ListPrice.Amount` into `product.price.amount`
   *
   * @returns {Object}
   */
  price() {
    const listPrice = this.itemAttributes.ListPrice;
    let price = {
      amount: 'unavailable',
      currencyCode: 'unavailable',
      formattedPrice: 'unavailable'
    };

    if(listPrice) {
      price = {
        amount: listPrice.Amount,
        currencyCode: listPrice.CurrencyCode,
        formattedPrice: listPrice.FormattedPrice
      };
    }

    return price;
  }

  /**
   * Formats an Amazon product's dimensions to be a little
   * cleaner of an interface.
   *
   * ie. We turn `dimensions.Height["@Units"]` into `dimensions.height.units`
   *
   * @returns {Object}
   */
  dimensions() {
    const itemDimensions = this.itemAttributes.ItemDimensions;
    const unavailable = {
      unit: 'unavailable',
      number: 'unavailable',
      "@Units": 'unavailable',
      "#": 'unavailable'
    };

    let dimensions = {
      height: unavailable,
      width: unavailable,
      weight: unavailable
    };

    if(itemDimensions) {
      const height = itemDimensions.Height || unavailable;
      const width = itemDimensions.Width || unavailable;
      const weight = itemDimensions.Weight || unavailable;

      dimensions = this.convertDimensions({
        height: { unit: height['@Units'], number: height['#'] },
        width: { unit: width['@Units'], number: width['#'] },
        weight: { unit: weight['@Units'], number: weight['#'] }
      });
    }

    return dimensions;
  }

  /**
   * Sometimes Amazon uses product dimensions that are hundredths
   * and we'll divide the unit number by 100 and remove 'hundredths'
   * on the unit type string.
   *
   * @param {Object} dimensions
   * @returns {Object}
   */
  convertDimensions(dimensions) {
   return Object
      .entries(dimensions)
      .reduce((acc, [key, value]) => {
        let unit = value.unit.toLowerCase();
        let number = Number(value.number);

        if(unit.includes('hundredths')) {
          unit = this.formatUnit(unit);
          number = number / 100;
        }

        acc[key] = {
          unit: unit,
          number: number
        }

        return acc;
      }, {});
  }

  /**
   * Removes instances of the string 'hundred'
   *
   * @param {string} unit
   * @returns {string}
   */
  formatUnit(unit) {
    return unit
      .replace('hundredths ', '')
      .replace('hundredths-', '');
  }
};
