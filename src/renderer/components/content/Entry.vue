<template>
  <div
    id="item"
    :class="{ selected }"
    @click="$emit('click')"
    @dblclick="handleDblClick"
  >
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
  },
  methods: {
    handleDblClick() {
      // window.open(
      //   this.data.url,
      //   "",
      //   `
      //   maxWidth=2000,
      //   maxHeight=2000,
      //   width=1200,
      //   height=800,
      //   nodeIntegration=0,
      //   contextIsolation=1
      // `
      // );
      this.$router.push({ name: "recipe" });
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
  user-select none
  &:hover
    background-color #eee
  &.selected
    border-left-color dodgerblue

#picture
  width 20%
  margin-right 25px
</style>
