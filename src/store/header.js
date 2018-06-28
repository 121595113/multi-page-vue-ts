import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    title: 'Oriente',
    isShowLoading: true,
  },
  mutations: {
    setTitle (state, title) {
      state.title = title;
    },
    setLoadingStatus (state, status) {
      state.isShowLoading = status;
    }
  }
});

export default store;
