<template>
  <main>
    <p id="no-items">No Items</p>
    <div></div>
  </main>
</template>

<script>
export default {
  name: "Content"
};
</script>

<style lang="stylus" scoped>
#no-items
  font-weight bold
  color silver
  text-align center
  width 100%
  position absolute
  top 100px
  z-index -1
</style>
