<template>
  <v-container class="d-flex justify-center">
    <component :is="$route.meta.subComponent"> </component>
  </v-container>
</template>

<script>
export default {
  name: "ResetWrapper",
}
</script>

<style lang="css" scoped>
.v-container {
  min-height: 100%;
}
</style>
