<template>
  <div id="item" :class="{ selected }" @click="$emit('click')">
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
    },
    selected: {
      type: Boolean,
      default: false
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
  height 5.5rem
  padding 10px
  border-left: 10px solid lightgray
  &:hover
    background-color #eee
  &.selected
    border-left-color dodgerblue

#picture
  width 20%
  margin-right 25px
</style>
