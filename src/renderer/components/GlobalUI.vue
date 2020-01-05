<template>
  <div id="global-ui" :style="{ display: show ? 'flex' : 'none' }">
    <input id="url" type="text" placeholder="Enter URL" />
    <button id="add">Add Item</button>
    <button id="cancel" @click="handleCancel">Cancel</button>
  </div>
</template>

<script>
export default {
  name: "GlobalUI",
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style lang="stylus" scoped>
#global-ui
  position absolute
  top: 0
  width 100%
  height 100%
  background rgba(0,0,0,0.85)
  display flex
  align-items center
  align-content center
  flex-wrap wrap
  #url
    flex-grow 1
    width 100%
    margin 0 25px 15px
    padding 10px
  button
    padding 10px
  #add
    margin-left 25px
  #cancel
    background white
    color black
    margin-left 15px
</style>
