<template>
  <div id="app">
    <Tools />
    <Content />
    <GlobalUI />
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
    return {};
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
html,
body,
div#app {
  height: 100%;
  width: 100%;
}
body {
  font: caption;
  margin: 0;
  display: flex;
}
button,
input {
  font-size: 20px;
  border-radius: 5px;
}
button {
  background: dodgerblue;
  color: white;
  border: none;
  outline: none;
}
input {
  border: 1px solid silver;
  padding: 0 10px;
}
input::placeholder {
  color: lightgray;
}
</style>
