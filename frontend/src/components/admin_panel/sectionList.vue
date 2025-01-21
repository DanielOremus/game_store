<template>
  <v-container>
    <v-row v-for="item in list" :key="item._id">
      <v-col></v-col>
      <v-col></v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { it } from "vuetify/locale"

export default {
  name: "",
  props: {
    list: {
      type: Array,
      default: {},
    },
  },
}
</script>

<style lang="scss" scoped></style>
