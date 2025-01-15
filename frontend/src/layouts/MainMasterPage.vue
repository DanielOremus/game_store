<template>
  <Header class="header" :is-scrolled-prop="isHeaderScrolled" />
  <slot></slot>
</template>

<script>
import Header from "@/components/sections/Header.vue"
export default {
  name: "MainMasterPage",
  components: {
    Header,
  },
  props: {
    isHeaderScrolled: {
      type: Boolean,
      default: false,
    },
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
