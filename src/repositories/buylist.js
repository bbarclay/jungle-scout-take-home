import db from '@/firebase/init';

const BuylistRepository = class BuylistRepository {
  constructor() {
    this.db = db;
    this.ref = db.collection('buylist');
  }

  /**
   * @param {number} id
   * @returns {PromiseObject}
   */
  find(id) {
    return this.ref.doc(id).get()
      .then(record => record)
      .catch(err => console.log(err));
  }

  /**
   * @param {DocumentSnapshot} record
   * @returns {PromiseObject}
   */
  add(record) {
    return this.ref.doc(record.id)
      .set({ id: record.id })
      .catch(error => console.log(error))
  }

  /**
   * @param {DocumentSnapshot} record
   * @returns {PromiseObject}
   */
  update(record) {
    const products = record.productList
      .map((obj)=> {return Object.assign({}, obj)});

    const attributes = {
      productList: products
    }

    return this.ref
      .doc(record.id)
      .update(attributes)
      .catch(err => console.log(err));
  }

  // delete() {
  //  one day?
  // }

  /**
   * @param {DocumentSnapshot} record
   * @param {string} query
   * @returns {PromiseObject}
   */
  query(record, query) {
    return this.db.collection(query)
      .where('belongsTo', '==', record.id)
      .then(records => records)
  }
  /**
   * @param {DocumentSnapshot} record
   * @returns {PromiseObject}
   */
  products(record) {
    return this.db
      .collection('productList')
      .get(['productList/meh', 'productList/thing'])
      .then(products => products);
  }
};

const buylistRepository = new BuylistRepository();
export default buylistRepository;