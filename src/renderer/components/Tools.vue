<template>
  <header id="tools">
    <button @click="handleAdd" id="add">+</button>
    <input
      id="search"
      type="text"
      placeholder="Search"
      v-model="search"
      @input="$emit('update:search', search)"
    />
  </header>
</template>

<script>
export default {
  name: "Tools",
  data() {
    return {
      search: ""
    };
  },
  methods: {
    handleAdd() {
      this.$emit("add");
    }
  }
};
</script>

<style lang="stylus" scoped>
#tools
  background lightgray
  display flex
  padding 10px
  font-weight bold
  border-bottom 1px solid silver
  box-shadow 0px 10px 10px rgba(0, 0, 0, 0.1)

#add
  padding 0px 12px 5px
  margin-right 10px
  font-size 30px

#search
  flex-grow 1
</style>
