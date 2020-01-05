<template>
  <div id="global-ui">
    <input id="url" type="text" placeholder="Enter URL" />
    <button id="add">Add Item</button>
    <button id="cancel">Cancel</button>
  </div>
</template>

<script>
export default {
  name: "GlobalUI"
};
</script>

<style lang="stylus" scoped>
#global-ui
  position absolute
  width 100%
  height 100%
  background rgba(0,0,0,0.85)
  display flex
  align-items center
  align-content center
  flex-wrap wrap
  button
    padding 10px

#url
  flex-grow 1
  width 100%
  margin 0 25px 15px
  padding 10px

#add
  margin-left 25px

#cancel
  background white
  color black
  margin-left 15px
</style>
