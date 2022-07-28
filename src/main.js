import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
axios.defaults.withCredentials=true;
import routes from "./routes";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import './assets/sass/index.sass'
import { BPagination } from 'bootstrap-vue'
Vue.component('b-pagination', BPagination)
import { BModal } from 'bootstrap-vue'
Vue.component('b-modal', BModal)
import { VBModal } from 'bootstrap-vue'
// Note: Vue automatically prefixes the directive name with 'v-'
Vue.directive('b-modal', VBModal)
import { BFormTextarea } from 'bootstrap-vue'
Vue.component('b-form-textarea', BFormTextarea)
import { BFormRadioGroup } from 'bootstrap-vue'
Vue.component('b-form-radio-group', BFormRadioGroup)
import { ModalPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)
import { BListGroup } from 'bootstrap-vue'	
Vue.component('b-list-group', BListGroup)
import { ImagePlugin } from 'bootstrap-vue'
Vue.use(ImagePlugin)

import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);
Vue.use(VueCookies);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  lastSearchText: localStorage.lastSearchText,
  lastSearchNum:localStorage.lastSearchNum,
  lastSearchCuisine:localStorage.lastSearchCuisine,
  lastSearchDiet:localStorage.lastSearchDiet,
  lastSearchIntolerance:localStorage.lastSearchIntolerance,
  lastSearchResults:localStorage.lastSearchResults,

  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("lastSearchText");
    localStorage.removeItem("lastSearchNum");
    localStorage.removeItem("lastSearchCuisine");
    localStorage.removeItem("lastSearchDiet");
    localStorage.removeItem("lastSearchIntolerance");
    localStorage.removeItem("lastSearchResults");
    this.username = undefined;
    this.lastSearchText = undefined;
    this.lastSearchNum = undefined;
    this.lastSearchCuisine = undefined;
    this.lastSearchDiet = undefined;
    this.lastSearchIntolerance = undefined;
    this.lastSearchResults = undefined;
  },
  // server_domain:  "http://perricipes.cs.bgu.ac.il:443",
  server_domain:  "http://localhost:80",
  search(s,num,c,d,i,lr){
    localStorage.setItem("lastSearchText",s);
    localStorage.setItem("lastSearchNum",num);
    localStorage.setItem("lastSearchCuisine",c);
    localStorage.setItem("lastSearchDiet",d);
    localStorage.setItem("lastSearchIntolerance",i);
    localStorage.setItem("lastSearchResults",lr);
    this.lastSearchText=s;
    this.lastSearchNum=num;
    this.lastSearchCuisine=c;
    this.lastSearchDiet=d;
    this.lastSearchIntolerance=i;
    this.lastSearchResults=lr;
  }
};
//console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
