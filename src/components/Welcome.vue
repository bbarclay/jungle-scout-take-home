<template>
  <div class="welcome">
    <div class="welcome_page-title row">
      <div class="col s12 m12">
        <h1 class="welcome_instructions-title">
          These are buylists.
        </h1>
        <div class="welcome_instructions">
          You make buylists for activities. Like eating tacos.
        </div>
      </div>
    </div>

      <div class="welcome_loader center-align" v-if="isLoading">
        <div class="preloader-wrapper big active center-align">

          <div class="spinner-layer spinner-blue-only">

            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>

            <div class="gap-patch">
              <div class="circle"></div>
            </div>

            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>

        </div>
      </div>

    <div class="row" v-else>
      <div
       class="col s4 m4"

       v-for="(buylist, index) in buylists"
       :key="index"
      >

        <router-link
          class="brand-logo left welcome_buylist-title pink-text text-lighten light"

          :to="{ name: 'Buylist', params: { id: buylist.id } }"
        >

          <div class="card hoverable">
            <div class="card-image welcome_card-image">
              <img
              style="min-height: 215.25px"

              :src="randomImageUrl + buylist.id.replace(/-/g, ',')"
              >

              <span class="card-title pink-text text-lighten light welcome_card-title">
                What to
                <br />
                buy to...
              </span>
            </div>

            <div class="card-content welcome_card-content">
              <span>
                {{ buylist.id | titleizeId | capitalize }}
              </span>
            </div>
          </div>

        </router-link>

      </div>
    </div>

  </div>
</template>

<script>
  import db from '@/firebase/init';
  import slugify from 'slugify';

  export default {
    /** @type {string} */
    name: 'Welcome',

    data () {
      return {
        /** @type {boolean} */
        isLoading: true,

        /** @type {array} */
        buylists: [],

        /** @type {string} */
        randomImageUrl: 'https://source.unsplash.com/400x200/?'
      }
    },

    filters: {
      /**
       * @param {string} id
       * @returns {string}
       */
      titleizeId(id) {
        return slugify(id, {replacement: ' '});
      },

      /**
       * @param {string} value
       * @returns {string}
       */
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },

    /**
     * Lifecycle hook where we load up all the existing `buylist`
     * collections then set this component's buylist array.
     */
    created() {
      db
        .collection('buylist')
        .get()
        .then(collections => this.buylists = collections.docs)
        .finally(() => this.isLoading = false)
        .catch(error => console.log(error));
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1.welcome_instructions-title {
    margin: 0;

    font-size: 100px;
    font-weight: 900;
    line-height: 100px;
  }

  .welcome_loader {
    padding-top: 50px;
  }

  .welcome_instructions {
    font-size: 40px;
    font-weight: 900;
  }

  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .welcome_card-image span.welcome_card-title{
    padding: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
  }

  .welcome_card-content {
    padding: 12px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .welcome_card-title {
    padding: 0;

    font-weight: 900;
    text-transform: uppercase;
    font-size: 100px;
    text-overflow: clip;
    line-height: 70px;

    opacity: 0.4;
    mix-blend-mode: difference;

    user-select: none;
  }

  .welcome_buylist-title {
    float: none !important;

    font-size: 30px;
    font-weight: 100;
    line-height: 22px;
    text-overflow: ellipsis;
  }
</style>
