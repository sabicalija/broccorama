<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { tunnelEvents, cancelTunnel } from "./eventbus";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {
    this.$store.commit("load");
    tunnelEvents([
      "menu-new-recipe",
      "menu-open-recipe",
      "menu-open-native",
      "menu-search-recipe"
    ]);
  }
};
</script>

<style lang="stylus">
:focus
  outline none
  box-shadow 0 0 0 2px darken(dodgerblue, 20%)

html, body
  padding 0
  margin 0

html, body, #app
  height 100%
  width 100%

body
  font caption
  margin 0
  display flex

#app
  display flex
  flex-flow column

button, input
  font-size 20px
  border-radius 5px

button
  background dodgerblue
  color white
  border none
  outline none

input
  border 1px solid silver
  padding 0 10px
  &::placeholder
    color lightgray
</style>
