<template>
  <div><Add @cancel="handleCancel" /></div>
</template>

<script>
import Add from "@/renderer/components/content/Add.vue";
export default {
  name: "GlobalUI",
  components: {
    Add
  },
  methods: {
    handleCancel() {
      // this.$router.push({ name: "home" });
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped></style>
