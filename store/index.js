import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// const store =  new Vuex.Store({
//     state:{
//         userID:''
//     },
//     actions:{},
//     modules:{
//         getUserId: state => state.userID,
//     },
// })

export const state = () => ({
  userID: "",
});

export const mutations = {
  setUserId(state, payload) {
    state.userID = payload;
  },
};
