import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  //=============================state==============================
  state: {
    userId: null,
    userProfilePic: null,
    firstName: null,
    lastName: null
  },

  //===========================mutations============================
  mutations: {
    setUserId(state, id){
      state.userId = id;
    },
    setUserProfilePic(state,user_profile_url){
      state.userProfilePic=user_profile_url
    },
    setUserName(state, userName){
      state.userName = userName;
    }
  },

  //============================actions=============================
  actions: {

  //============================getters=============================
  },
  getters:{
    getUserId(state){
      return state.userId;
    }
  },

  //============================modules=============================
  modules: {

  }
});
