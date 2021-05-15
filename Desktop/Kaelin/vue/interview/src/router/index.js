import Vue from 'vue';
import VueRouter from 'vue-router';
import { Toast } from 'vant';
import routes from './routes';
import { MKToken } from '../utils';
import { loginAPI } from '../api';
import store from '../store';

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
router.beforeEach(async (to, from, next) => {
  // console.log(to, from);
  if (!to.meta.needLogin) {
    next();
  } else {
    const token = MKToken.getMKToken('MKTOKEN');
    if (!token) {
      Toast.fail('主任,请登录哦~~~');
      next(`/login?redirect=${to.path}`);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (store.getters.newIsLogin) {
        next();
      } else {
        const user = await loginAPI.getUserInfo();
        // console.log(user);
        store.commit('SET_USER_INFO', user);
        store.commit('SET_IS_LOGIN', true);
        next();
      }
    }
  }
});
export default router;
