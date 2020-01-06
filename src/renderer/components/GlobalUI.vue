<template>
  <div id="global-ui" :style="{ display: show ? 'flex' : 'none' }">
    <input
      autofocus
      id="url"
      type="text"
      placeholder="Enter URL"
      v-model="input"
      @keyup.enter="handleAdd"
    />
    <button
      id="add"
      :disabled="processing || notReady"
      :class="{ processing: processing || notReady }"
      @click="handleAdd"
    >
      {{ processing ? "Loading..." : "Add Item" }}
    </button>
    <button
      id="cancel"
      :disabled="processing"
      :class="{ processing }"
      :style="{ display: processing ? 'none' : 'block' }"
      @click="handleCancel"
    >
      Cancel
    </button>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  name: "GlobalUI",
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      input: "",
      processing: false
    };
  },
  computed: {
    notReady() {
      return this.input === "";
    }
  },
  methods: {
    handleAdd() {
      if (this.notReady) return;
      this.processing = true;
      ipcRenderer.send("new-item", this.input);
    },
    handleCancel() {
      this.input = "";
      this.$emit("cancel");
    }
  },
  // mounted() {
  //   $refs.input.focus();
  // },
  created() {
    ipcRenderer.on("new-item-success", (e, item) => {
      this.processing = false;
      this.input = "";
      this.$emit("done", item);
    });
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
.processing
  background-color gray
</style>
