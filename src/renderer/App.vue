<template>
  <div id="app">
    <Tools ref="tools" @add="handleAdd" :search.sync="filter" />
    <Content
      ref="content"
      :data="filteredItems"
      :selected="selection"
      @selection="handleSelection"
    />
    <GlobalUI
      :show="displayGlobalUI"
      @cancel="handleCancel"
      @done="handleDone"
    />
  </div>
</template>

<script>
import { shell, ipcRenderer } from "electron";
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
      items: null,
      selected: null,
      filter: ""
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(({ title }) =>
        this.filter === ""
          ? true
          : title.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0
      );
    },
    selection() {
      return this.selected || this.filteredItems.length > 0
        ? this.filteredItems[0].url
        : "";
    }
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
    handleSelection(url) {
      this.selected = url;
    },
    save() {
      const data = JSON.stringify(this.items);
      localStorage.setItem("broccorama-items", data);
    },
    load() {
      this.items = JSON.parse(localStorage.getItem("broccorama-items")) || [];
    }
  },
  created() {
    this.load();
    ipcRenderer.on("menu-new-recipe", () => {
      this.handleAdd();
    });
    ipcRenderer.on("menu-open-recipe", () => {
      if (this.filteredItems.length > 0) {
        this.$refs.content.open();
      }
    });
    ipcRenderer.on("menu-open-native", () => {
      if (this.filteredItems.length > 0) {
        shell.openExternal(this.selection);
      }
    });
    ipcRenderer.on("menu-search-recipe", () => {
      this.$refs.tools.focusSearch();
    });
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
