import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: null
  },
  mutations: {
    load(state) {
      state.recipes =
        JSON.parse(localStorage.getItem("broccorama-items")) || [];
    },
    save(state) {
      localStorage.setItem("broccorama-items", JSON.stringify(state.recipes));
    },
    push(state, item) {
      state.recipes.push(item);
    }
  },
  getters: {
    filterRecipesByName: state => name => {
      return state.recipes.filter(({ title }) =>
        name === ""
          ? true
          : title.toLowerCase().indexOf(name.toLowerCase()) >= 0
      );
    }
  },
  actions: {},
  modules: {}
});
