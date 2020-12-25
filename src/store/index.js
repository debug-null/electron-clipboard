import Vue from 'vue';
import Vuex from 'vuex';
import Sql from '@/sql/index.js';
const Db = new Sql();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    all: [
      {
        id: Math.random(),
        category: 'all', // 类别
        type: 'text', // 类型
        content: 'fff', // 内容
        icon: 'didi', // 图标
        title: '钉钉', // 标题
        application: 'app' // 应用名
      }
    ]
  },
  mutations: {
    initAll(state, data) {
      state.all = data;
    },
    ADDALL(state, data) {
      // console.log('🚀 ~ file: index.js ~ line 24 ~ ADDALL ~ data', data);
      // console.log('🚀 ~ file: index.js ~ line 24 ~ ADDALL ~ Db', Db);
      // Db.connect('superCopy.sqlite3');

      state.all.push(data);
    }
  },
  actions: {
    initAll({commit}, data) {
      commit('initAll', data);
    },
    addAll({ commit }, data) {
      commit('ADDALL', data);
    }
  },
  getters: {
    getOneCategory: state => category => {
      console.log('🚀 ~ file: index.js ~ line 31 ~ category', category);
      return state.all.filter(item => item.type === category);
    }
  },
  modules: {}
});
