import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from 'jquery';
global.$ = jQuery;
let Bootstrap = require('bootstrap');
import "bootstrap/dist/css/bootstrap.min.css"
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
