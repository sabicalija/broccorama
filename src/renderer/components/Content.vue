<template>
  <main id="content">
    <p id="no-items" v-if="filterRecipesByName(this.filter).length === 0">
      No Items
    </p>
    <div v-else>
      <Entry
        ref="items"
        v-for="(item, i) of filterRecipesByName(this.filter)"
        :key="i"
        :data="item"
        :selected="selected(item, i === 0)"
        @click="$emit('update:selection', item.url)"
      />
    </div>
  </main>
</template>

<script>
import Entry from "@/components/content/Entry.vue";

import { shell } from "electron";
import { mapGetters } from "vuex";
import { EventBus, cancelTunnel } from "../eventbus";

export default {
  name: "Content",
  components: {
    Entry
  },
  props: {
    filter: {
      type: String,
      default: ""
    },
    selection: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["filterRecipesByName"]),
    anySelected() {
      return this.filterRecipesByName(this.filter).find(
        item => item.url === this.selection
      );
    },
    f() {
      return this.filter;
    }
  },
  methods: {
    selected({ url }, first = false) {
      const { anySelected, selection } = this;
      if (first) {
        if (!anySelected || !this.selection) {
          return true;
        }
      }
      return url === this.selection;
    }
  },
  created() {
    EventBus.$on("menu-open-recipe", () => {
      if (this.filterRecipesByName(this.filter).length > 0) {
        const selected = this.$refs.items.find(({ selected }) => selected);
        selected.handleDblClick();
      }
    });
    EventBus.$on("menu-open-native", () => {
      if (this.filterRecipesByName(this.filter).length > 0) {
        const selected = this.$refs.items.find(({ selected }) => selected);
        shell.openExternal(selected.data.url);
      }
    });
  },
  beforeDestroy() {
    cancelTunnel(["menu-open-recipe", "menu-open-native"]);
  }
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
