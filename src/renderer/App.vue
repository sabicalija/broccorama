<template>
  <div id="app">
    <Tools @add="handleAdd" />
    <Content :data="items" />
    <GlobalUI
      :show="displayGlobalUI"
      @cancel="handleCancel"
      @done="handleDone"
    />
  </div>
</template>

<script>
import Tools from "./components/Tools.vue";
import Content from "./components/Content.vue";
import GlobalUI from "./components/GlobalUI.vue";

export default {
  name: "App",
  components: {
    Tools,
    Content,
    GlobalUI
  },
  data() {
    return {
      displayGlobalUI: false,
      items: null
    };
  },
  methods: {
    handleAdd() {
      this.displayGlobalUI = true;
    },
    handleCancel() {
      this.displayGlobalUI = false;
    },
    handleDone(item) {
      this.items.push(item);
      this.save();
      this.displayGlobalUI = false;
    },
    save() {
      const data = JSON.stringify(this.items);
      console.log("SAVING", data);
      localStorage.setItem("broccorama-items", data);
    },
    load() {
      this.items = JSON.parse(localStorage.getItem("broccorama-items")) || [];
    }
  },
  created() {
    this.load();
  }
};
</script>

<style lang="stylus">
:focus
  outline-offset -2px
  outline auto 5px darken(dodgerblue,40%)
  z-index 6

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
