<template>
  <RouterView />
</template>
<script>
import { mapActions } from "vuex"
export default {
  methods: {
    ...mapActions("auth", ["syncAuthStatus"]),
  },
}
</script>
<style></style>
