<template>
  <v-container class="d-flex justify-center align-center">
    <div class="text-center">
      <h1 class="error-code">404</h1>
      <p class="text-h6">It seems we couldn't find requested resource</p>
      <v-btn
        class="mt-3"
        color="grey-darken-2"
        size="large"
        @click="$router.push({ name: 'HomePage' })"
      >
        Back to Home</v-btn
      >
    </div>
  </v-container>
</template>

<script>
export default {
  name: "NotFound",
}
</script>

<style lang="css" scoped>
.v-container {
  min-height: 100%;
}
.error-code {
  font-size: 10rem;
  font-weight: 500;
  line-height: 1em;
}
</style>
