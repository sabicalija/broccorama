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
      if (!state.recipes.find(({ url }) => url === item.url)) {
        state.recipes.push(item);
      }
    },
    update(state, item) {
      const index = state.recipes.findIndex(({ url }) => url === item.url);
      state.recipes[index] = item;
    }
  },
  getters: {
    filterRecipesByName: state => name => {
      return state.recipes.filter(({ title }) =>
        name === ""
          ? true
          : title.toLowerCase().indexOf(name.toLowerCase()) >= 0
      );
    },
    getRecipeByUrl: state => itemUrl => {
      return state.recipes.find(({ url }) => url === itemUrl);
    }
  },
  actions: {},
  modules: {}
});
