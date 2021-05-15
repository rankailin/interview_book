import { loginAPI } from '@/api';
import { SET_USER_INFO, SET_IS_LOGIN } from '../mutations-type';

export default {
  strict: true,
  state: {
    userInfo: null,
    isLogin: false,
  },
  getters: {
    newUserInfo(state) {
      return state.userInfo;
    },
    newIsLogin(state) {
      return state.isLogin;
    },
    genderList() { return { 0: '未知', 1: '男', 2: '女' }; },
  },
  mutations: {
    [SET_USER_INFO](state, payload) {
      // console.log(payload);
      state.userInfo = payload;
    },
    [SET_IS_LOGIN](state, payload) {
      state.isLogin = payload;
    },
  },
  actions: {
    async setUserInfo({ commit }) {
      try {
        const user = await loginAPI.getUserInfo();
        // console.log(user);
        commit('SET_USER_INFO', user);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
