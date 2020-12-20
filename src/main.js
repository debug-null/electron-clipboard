import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Sql from '@/sql/index.js';

const Db = new Sql();
Db.connect('superCopy.sqlite3');
Vue.prototype.$db = Db;

Vue.config.productionTip = false;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
