<template>
  <v-container fluid>
    <v-row v-if="!isLoading && users">
      <v-col
        v-for="user in users"
        :key="user._id"
        cols="12"
        md="6"
        lg="4"
        xl="4"
      >
        <userItem :user="user" />
      </v-col>
    </v-row>
    <v-row v-else="users">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import userItem from "./userItem.vue"
export default {
  name: "UsersList",
  components: {
    userItem,
  },
  props: {
    users: {
      type: Array,
      default: [],
    },
  },
  methods: {
    name() {},
  },
  computed: {
    ...mapGetters("user", ["isLoading"]),
  },
}
</script>

<style lang="scss" scoped></style>
