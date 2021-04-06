import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: 0,
  },
  getters: {
    getUserId: state => {
      return state.userId;
    }
  },
  mutations: {
    setUserId(state,userId) {
      state.userId = userId;
    },
  },
  actions: {},
});