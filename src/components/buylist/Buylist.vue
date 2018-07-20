<template>
  <div class="buylist container">
    <div v-bind:class="{ 'progress': true, 'buylist_loader-hidden': !isSearching }">
      <div class="indeterminate"></div>
    </div>

    <ul class="collection with-header">
      <li class="buylist_list-header collection-header center-align orange lighten-5">
        <h4 class="pink-text text-lighten light">
          Find everything you need to...
        </h4>

        <h5 class="pink-text text-lighten light">...{{ topic }}</h5>

        <div class="buylist_search-field input-field">
          <input
            id="asin-search"
            type="text"
            class="validate"
            maxlength="10"
            data-length="10"

            v-model="asinCode"
          >
          <span class="helper-text left-align">
            Search with a 10-character Amazon ASIN code
          </span>
        </div>

        <a v-bind:class="buttonClass" v-on:click="findByASIN">
          <i class="material-icons left">search</i>
          search
        </a>

        <p
          class="red-text cente"
          v-if="errorMessage"
        >
          Error: {{ errorMessage }}
        </p>
      </li>

      <li
        class="collection-item buylist_collection-item"
        v-for="(product, index) in products"
        :key="index"
      >
        <p class="buylist_product-title">
          <a
            class="pink-text text-lighten light"
            target="_blank"

            :href="product.url"
          >
            <span class="title">
              {{ product.title }}
            </span>

            <span class="price">
              {{ `${product.price.formattedPrice} ${product.price.currencyCode}` | unavailable }}
            </span>
          </a>
        </p>

        height: {{ `${product.dimensions.height.number} ${product.dimensions.height.unit}` | unavailable }}<br />
        widht: {{ `${product.dimensions.width.number} ${product.dimensions.width.unit}` | unavailable }}<br />
        weight: {{ `${product.dimensions.weight.number} ${product.dimensions.weight.unit}` | unavailable }}<br />
      </li>
    </ul>
  </div>
</template>

<script>
  import slugify from 'slugify';
  import sanitizeSlug from '@/services/sanitize-slug';
  import firebase from 'firebase';
  import Buylist from '@/repositories/buylist';
  import Product from '@/models/amazon-product';

export default {
  name: 'Buylist',

  data() {
    return {
      /** @type {string} */
      slug: '',

      /** @type {string} */
      topic: '',

      /** @type {string} */
      asinCode: '',

      /** @type {boolean} */
      buylistExists: false,

      /** @type {?Object} */
      buylist: null,

      /** @type {Object[]} */
      products: [],

      /** @type {?string} */
      errorMessage: null,

      /** @type {boolean} */
      isSearching: false,
    }
  },

  computed: {
    buttonClass() {
      const buttonClass = 'waves-effect waves-light btn';
      return this.isSearching ? buttonClass + ' disabled' : buttonClass;
    }
  },

  methods: {
    /**
     * Makes a call to a firebase cloud function
     * that fetches an Amazon product.
     */
    findByASIN() {
      this.errorMessage = null;
      this.isSearching = true;

      const findByASIN = firebase.functions().httpsCallable('findByASIN');

      findByASIN({ asinCode: this.asinCode })
        .then(ret => {
          this.isSearching = false
          const data = ret.data;

          data.errors ?
            this.updateErrorMessage(data.errors.Error) :
            this.updateBuylist(data.item)
        })
        .finally(() => this.isSearching = false)
        .catch(err => console.log('Error', err));
    },

    /**
     * Sets an error message after fetching a product.
     *
     * @param {string}
     */
    updateErrorMessage(error) {
      this.errorMessage = error.Message;
    },

    /**
     * Adds a newly fetched/saved product to the buylist's
     * product association and also adds it to this
     * component's data attribute `products`
     *
     * @param {DocumentObject} item
     */
    updateBuylist(item) {
      this.asinCode = null;

      const product = new Product(item);

      const products = this.products;
      const buylist = this.buylist;

      products.unshift(product)
      buylist.productList = products;

      Buylist.update(this.buylist);
    },

    /**
     * Sets this component's data attribute 'topic' to
     * an undasherized version of the slug. Also fetches
     * the buylist associated to the slug.
     *
     * @param {string} slug
     */
    fetchBuylist(slug) {
      this.slug = slug;
      this.topic = slugify(slug, {replacement: ' '});

      Buylist.find(slug)
        .then(buylist => this.buylist = buylist)
        .then(() => this.buylist.exists ? this.setProducts() : this.addBuylist())
    },

    /**
     * Grabs a buylist's products and sets this
     * component's `product` data value to either
     * a set of products or an empty array.
     */
    setProducts() {
      this.products = this.buylist.get('productList') || [];
    },

    /**
     * Adds the current buylist to the firebase repository
     * if this buylist does not exist.
     */
    addBuylist() {
      Buylist.add(this.buylist);
    },

    /**
     * Reroutes to a sanitized slug
     *
     * @param {string} slug
     */
    rerouteToSanitizedSlug(slug) {
      this.$router
        .push({
          path: `/${ slug }`,
          onComplete: this.fetchBuylist(slug)
        })
    },
  },

  filters: {
  /**
   * Catches if any product attribute is unavailable
   * and if so returns 'Not listed'.
   *
   * @param {string} val
   * @returns {string}
   */
    unavailable(val) {
      return val.includes('unavailable') ? 'Not listed' : val;
    },
  },

  /**
   * Lifecycle hook that sanitizes the url slug then
   * decides to reroute the user if the entered slug
   * and the sanitized slug don't match or fetch
   * the current buylist.
   */
  created() {
    const slug = this.$route.params.id;
    const routeSlug = sanitizeSlug(slug);

    slug == routeSlug ?
      this.fetchBuylist(routeSlug) :
      this.rerouteToSanitizedSlug(routeSlug);
  },
}
</script>

<style>
  .buylist {
    width: 800px;
  }

  .buylist_list-header h4 {
    font-weight: 100;
  }

  .buylist_list-header h5,
  p.buylist_product-title {
    font-weight: 100;
  }

  .buylist_product-title {
    border-bottom: 1px solid #e91e63;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .buylist_product-title span.title {
    float: left;

    width: 80%;

    text-overflow: ellipsis;
    overflow: hidden;
  }
  .buylist_product-title span.price {
    float: right;

    width: 20%;

    text-align: right;
  }

  .buylist_list-header hr {
    width: 30%;
    height: 1px;
    border: 0;
    border-top: 1px solid #e91e63;
  }

  .buylist_search-field {
    width: 400px;

    margin-right: auto;
    margin-left: auto;
  }

  .buylist .buylist_collection-item {
    border-bottom: none;
  }

  .buylist .buylist_loader-hidden {
    visibility: hidden;
  }

  .buylist_button-disabled {
    pointer-events: none;
    background-color: #DFDFDF !important;
    box-shadow: none;
    color: #9F9F9F !important;
    cursor: default;
  }
</style>
