import NavBar from '@/components/NavBar/index.vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');
const myCompPlugin = {};
function formatTime(tiem) {
  return dayjs(tiem).to();
}

myCompPlugin.install = (Vue) => {
  Vue.component('MyNavBar', NavBar);
  Vue.filter('formatTime', formatTime);
};

export default myCompPlugin;
