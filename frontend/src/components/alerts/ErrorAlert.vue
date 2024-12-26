<template>
  <v-alert type="error" closable>
    <v-alert-title class="error-alert mb-2 font-weight-bold">{{
      title
    }}</v-alert-title>
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: "ErrorAlert",
  props: {
    title: {
      type: String,
      default: "Oops",
    },
    text: {
      type: String,
      default: "Something went wrong. Please try again later",
    },
  },
}
</script>

<style lang="css" scoped></style>
