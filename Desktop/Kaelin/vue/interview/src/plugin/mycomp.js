import NavBar from '@/components/NavBar/index.vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import { MKToken } from '../utils';
import router from '../router';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');
const myCompPlugin = {};
/** 相对时间 */
function formatTime(tiem) {
  return dayjs(tiem).to();
}
/** 固定时间 */
function formatFixedTime() {
  return dayjs().format('YYYY.MM.DD');
}
/** 封装一个判断登录全局函数 */
function isLogin(path) {
  const mkToken = MKToken.getMKToken('MKTOKEN');
  console.log(mkToken, path);
  if (mkToken) {
    return true;
    // eslint-disable-next-line no-else-return
  } else {
    router.push({ name: 'Login', query: { redirect: path } });
    return false;
  }
}
myCompPlugin.install = (Vue) => {
  Vue.component('MyNavBar', NavBar);
  Vue.filter('formatTime', formatTime);
  Vue.filter('formatFixedTime', formatFixedTime);
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$isLogin = isLogin;
};

export default myCompPlugin;
