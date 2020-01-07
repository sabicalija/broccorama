<template>
  <div>
    <Tools :search.sync="filter" />
    <Content :filter="filter" :selection.sync="selection" />
  </div>
</template>

<script>
import Tools from "@/renderer/components/Tools.vue";
import Content from "@/renderer/components/Content.vue";

import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Tools,
    Content
  },
  data() {
    return {
      filter: "",
      selection: null
    };
  },
  computed: {
    ...mapGetters(["filterRecipesByName"])
  },
  methods: {}
};
</script>

<style lang="stylus" scoped></style>
