<template>
  <div id="recipe">
    <header>
      <button @click="handleBack" id="back">
        <font-awesome-icon icon="angle-left" />
      </button>
      <h2 id="title">{{ recipe.title }}</h2>
    </header>
    <main>
      <div>
        <span>Title</span>
        <input type="text" v-model="title" />
      </div>
      <div>
        <span>URL</span>
        <span>{{ url }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Recipe",
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: ""
    };
  },
  computed: {
    ...mapGetters(["getRecipeEntry"]),
    recipe() {
      return this.getRecipeEntry(this.url);
    }
  },
  methods: {
    handleBack() {
      this.$router.back();
    }
  },
  watch: {
    title(newValue, oldValue) {
      const recipe = this.getRecipeEntry(this.url);
      recipe.title = newValue;
      this.$store.commit("update", recipe);
      this.$store.commit("save");
    }
  },
  created() {
    this.title = this.recipe.title;
  }
};
</script>

<style lang="stylus" scoped>
#recipe
  display flex
  flex-flow column nowrap
  padding 10px
  & > header
    display flex
    flex-flow row nowrap

#back
  padding 0px 12px 5px
  font-size 30px
#title
  flex 0 1 100%
  padding 0px 12px 0
  margin-block-start 0.3em
  margin-block-end 0.3em

main
  display flex
  flex-flow column nowrap
  padding 10px
  & > div
    display flex
    flex-flow row nowrap
    justify-content space-between
</style>
