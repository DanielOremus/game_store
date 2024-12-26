<template>
  <v-container fluid class="bg-transparent ma-0 pa-0 d-flex">
    <component
      :is="this.$route.meta.subComponent"
      class="flex-grow-1"
    ></component>
    <div
      class="image w-50"
      :style="{ 'background-image': `url(${imgSrc})` }"
    ></div>
  </v-container>
</template>

<script>
export default {
  name: "EntryWrapper",

  props: {
    imgSrc: {
      type: String,
      default: "/auth-page-image.png",
    },
  },
}
</script>
<style lang="css" scoped>
.v-container {
  min-height: 100%;
}

.image {
  background-position: center;
}

@media only screen and (max-width: 850px) {
  .image {
    display: none;
  }
}
</style>
