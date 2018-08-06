import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Query from "./views/Query.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/query",
        name: "query",
        component: Query
    }
  ]
});
