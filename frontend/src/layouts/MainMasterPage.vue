<template>
  <Header class="header" />
  <slot></slot>
</template>

<script>
import Header from "@/components/sections/Header.vue"
export default {
  name: "MainMasterPage",
  components: {
    Header,
  },
}
</script>

<style lang="css" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>
