import Vue from 'vue';
import F2 from '@antv/f2';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugin/vant';
import 'amfe-flexible';
import 'normalize.css';
import myPlugin from './plugin';
import './style/fontIcon/fontIcon.css';

Vue.prototype.$F2 = F2;
Vue.config.productionTip = false;
Vue.use(myPlugin.myCompPlugin);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
