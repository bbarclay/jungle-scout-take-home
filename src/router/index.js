import Vue from 'vue';
import cors from 'cors';
import Router from 'vue-router';
import Welcome from '@/components/Welcome';
import Buylist from '@/components/buylist/Buylist';


Vue.use(Router);
Vue.use(cors);

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },

    {
      path: '/:id',
      name: 'Buylist',
      component: Buylist
    },

    // {
    //   path: '*',
    //   component: NotFoundComponent
    // },
  ],
})
