<template>
  <div id="app">

    <div class="content">
      <router-view/>
    </div>

    <footer class="footer valign-wrapper">
      <p class="center-align footer_instructions">
        Do you want to make your own buylist? Easy! Just type your buylist title in your browser's address bar after the backslash!
        <br />
        Example: <span>{{ currentURL }}make some apple cider</span>
      </p>
    </footer>

  </div>
</template>

<script>
export default {
  /** @type {string} */
  name: 'App',

  data() {
    return {
      /** @type {string} */
      currentURL: '',
    }
  },

  /**
   * Lifecycle hook that initializes MaterializeCSS javascript
   * and also sets the current base url to `currentURL`.
   */
  created() {
    M.AutoInit();
    this.currentURL = `${document.location.origin}/`;
  },
}
</script>

<style>
  #app {
    height: 100vh;
  }

  .content {
    min-height: 100vh;
    padding-top: 50px;
    padding-bottom: 100px;
    background-image: url('assets/lashes.png');
  }

  .footer {
    position:fixed;
    left:0px;
    bottom:0px;

    padding: 2px;
    margin: 0;
    width:100%;

    color: white;
    background:#880e4f;

    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)
  }

  p.footer_instructions {
    width: 100vw;
    margin: 0;

    font-size: 20px;
    font-weight: 100;
  }

  .footer_instructions span {
    font-size: 18px;
    font-family: monospace;
  }
</style>
