import axios from 'axios';
// vant 的弹出框
import { Toast } from 'vant';
//  设置清除MKToken
import { MKToken } from './index';
// 路由信息
import router from '../router';

// eslint-disable-next-line no-underscore-dangle
const _http = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
});
// eslint-disable-next-line arrow-body-style
_http.interceptors.request.use((config) => {
  const token = MKToken.getMKToken('MKTOKEN');
  // console.log(token, config);
  if (config.needMKToken && token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});
// eslint-disable-next-line consistent-return
_http.interceptors.response.use((response) => {
  if (response.status === 200) {
    // console.log(response);
    if (response.data.code === 200) {
      return response.data.data;
    } if (response.data.code === 401 || response.data.code === 403) {
      // 弹出提示信息
      Toast.fail(response.data.message);
      // 清除token
      MKToken.removeMKToken('MKTOKEN');
      //  返回login页面
      router.push({ name: 'Login' });
      // // eslint-disable-next-line prefer-promise-reject-errors
      // return Promise.reject(222);
    } else {
      return Promise.reject(new Error(response.data.message));
    }
  }
}, (err) => Promise.reject(err));
export default _http;
