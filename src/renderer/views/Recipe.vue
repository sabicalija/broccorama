<template>
  <div id="recipe">
    <Toolbar :url="url" />
    <Ingredients />
    <Instructions />
  </div>
</template>

<script>
import Toolbar from "@/components/recipe/Toolbar.vue";
import Ingredients from "@/components/recipe/Ingredients.vue";
import Instructions from "@/components/recipe/Instructions.vue";

import { recipe } from "@/components/mixins/recipes.js";
export default {
  name: "Recipe",
  mixins: [recipe],
  components: { Toolbar, Ingredients, Instructions }
};
</script>

<style lang="stylus" scoped>
#recipe
  display flex
  flex-flow column nowrap
</style>
