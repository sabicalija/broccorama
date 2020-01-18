<template>
  <header id="toolbar">
    <button id="back" @click="handleBack">
      <font-awesome-icon icon="angle-left" />
    </button>
    <h2 id="title">{{ recipe.title }}</h2>
  </header>
</template>

<script>
import { recipe } from "@/components/mixins/recipes.js";
export default {
  name: "Toolbar",
  mixins: [recipe],
  methods: {
    handleBack() {
      this.$router.back();
    }
  }
};
</script>

<style lang="stylus" scoped>
#toolbar
  background lightgray
  display flex
  flex-flow row nowrap
  padding 10px
  font-weight bold
  border-bottom 1px solid silver
  box-shadow 0px 10px 10px rgba(0, 0, 0, 0.1)
#back
  margin-right 10px
  font-size 30px
  width 2.5rem
  height 2.5rem
#title
  flex-grow 1
  margin 0
  line-height 2.5rem
</style>
