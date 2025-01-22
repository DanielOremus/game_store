<template>
  <v-btn
    color="grey-lighten-1"
    variant="text"
    icon="mdi-home"
    class="home-btn"
    size="large"
    @click="this.$router.push({ name: 'Home' })"
  ></v-btn>
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

<style lang="css" scoped>
.home-btn {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
  font-size: 1.8rem;
}
</style>
