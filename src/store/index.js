import Vue from 'vue';
import Vuex from 'vuex';
import Sql from '@/sql/index.js';

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
    ADDALL(state, data) {
      console.log('🚀 ~ file: index.js ~ line 21 ~ ADDALL ~ data', data);
      const Db = new Sql();
      Db.connect('superCopy.sqlite3');
      const sql = `INSERT INTO paste_con(type,content,source) VALUES (?,?,?)`;
      Db.run(sql, [data.type, data.content, data.source]).then(res => {
        console.log('🚀 ~ file: index.js ~ line 27 ~ Db.run ~ res', res);
      });
      state.all.push(data);
    }
  },
  actions: {
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
