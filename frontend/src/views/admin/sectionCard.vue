<template>
  <v-card
    class="pa-5 text-center cursor-pointer"
    elevation="10"
    color="grey-darken-3"
    ripple
  >
    {{ cardData.title }}
  </v-card>
</template>

<script>
export default {
  name: "SectionCard",
  props: {
    cardData: {
      type: Object,
      default: {},
    },
  },
}
</script>

<style lang="scss" scoped></style>
