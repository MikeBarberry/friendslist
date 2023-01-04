import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import ourRoutes from './router';

Vue.use(VueRouter);
const router = new VueRouter({
  routes: ourRoutes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
