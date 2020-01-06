<template>
  <main id="content">
    <p v-if="this.data.length === 0" id="no-items">No Items</p>
    <div v-else>
      <Entry
        v-for="(item, i) of data"
        :key="i"
        :data="item"
        :selected="item.url === selected"
        @click="$emit('selection', item.url)"
      />
    </div>
  </main>
</template>

<script>
import Entry from "./Entry.vue";
export default {
  name: "Content",
  components: {
    Entry
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    selected: {
      type: String,
      default: ""
    }
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
#content
  flex-grow 1
  overflow-y auto

#no-items
  font-weight bold
  color silver
  text-align center
  width 100%
  position absolute
  top 100px
  z-index -1
</style>
