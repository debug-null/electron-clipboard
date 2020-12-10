import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    all: [
      {
        category: "all", //类别
        type: "text", //类型
        content: "fff", // 内容
        icon: "didi", //图标
        tag: "钉钉", //软件名
        aplication: "app" // 应用名
      }
    ]
  },
  mutations: {
    ADDALL(state, data) {
      state.all.push(data);
      console.log(
        "🚀 ~ file: index.js ~ line 24 ~ ADDALL ~ state.all",
        state.all
      );
    }
  },
  actions: {
    addAll({ commit }, data) {
      commit("ADDALL", data);
    }
  },
  getters: {
    getOneCategory: state => category => {
      console.log("🚀 ~ file: index.js ~ line 31 ~ category", category);
      return state.all.filter(item => item.type === category);
    }
  },
  modules: {}
});
