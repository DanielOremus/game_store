<template>
  <RouterView />
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "AuthPage",
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  beforeMount() {
    if (this.isAuthenticated) this.$router.push({ name: "Home" })
  },
}
</script>

<style lang="css" scoped></style>
