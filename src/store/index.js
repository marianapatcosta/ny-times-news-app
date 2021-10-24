import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      newsInfo: null,
    };
  },
  mutations: {
    setNewsInfo(state, newsInfo) {
      state.newsInfo = newsInfo;
    },
  },
  actions: {
    setNewsInfo(context, newsInfo) {
      context.commit("setNewsInfo", newsInfo);
    },
  },
  getters: {
    newsInfo(state) {
      return state.newsInfo;
    },
  },
});

export default store;
