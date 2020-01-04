<template>
  <div id="app">
    <div>{{ greeting }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greeting: "Hello World"
    };
  }
};
</script>

<style scoped>
#app > div {
  color: green;
}
</style>
