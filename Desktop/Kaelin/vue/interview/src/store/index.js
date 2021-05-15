import Vue from 'vue';
import Vuex from 'vuex';
import userLoginInfo from './modules/user_login';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userLoginInfo,
  },
  state: {
    BASEURL: process.env.VUE_APP_BASEURL,
  },

});
