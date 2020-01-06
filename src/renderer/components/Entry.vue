<template>
  <div id="item">
    <img id="picture" :src="screenshot" />
    <h2 id="title">{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: "Entry",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    screenshot() {
      return this.data.screenshot;
    },
    title() {
      return this.data.title;
    }
  }
};
</script>

<style lang="stylus" scoped>
#item
  display flex
  align-items center
  align-content center
  border-bottom lightgray 2px solid
  background #fafafa
  padding 10px

#picture
  width 20%
  margin-right 25px
</style>
