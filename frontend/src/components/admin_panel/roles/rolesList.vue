<template>
  <v-container fluid>
    <v-row class="text-subtitle-1 font-weight-bold">
      <v-col class="text-center">Role Title</v-col>
      <v-col cols="6" lg="8" xl="8" class="text-center">Role Permissions</v-col>
      <v-col class="text-center">Actions</v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row v-for="role in roles" :key="role._id" class="role-container">
      <roleItem :role="role" />
      <v-divider opacity="50" color="grey-darken-2" class="mx-3"></v-divider>
    </v-row>
    <v-row v-if="canCreate">
      <!-- Для створення ролі -->
      <roleItem :role="roleDefaultData" />
    </v-row>
  </v-container>
</template>

<script>
const roleDefaultData = {
  title: "Role title",
  pagesPermissions: {
    games: {
      read: false,
      create: false,
      update: false,
      delete: false,
    },
    carts: {
      read: false,
      create: false,
      update: false,
      delete: false,
    },
    roles: {
      read: false,
      create: false,
      update: false,
      delete: false,
    },
    users: {
      read: false,
      create: false,
      update: false,
      delete: false,
    },
  },
}
import { mapGetters } from "vuex"
import roleItem from "./roleItem.vue"
export default {
  name: "",
  components: {
    roleItem,
  },
  props: {
    roles: {
      type: Array,
      default: [],
    },
  },
  methods: {},
  computed: {
    ...mapGetters("permissions", { userPagesPermissions: "pagesPermissions" }),

    roleDefaultData() {
      return JSON.parse(JSON.stringify(roleDefaultData))
    },
    canCreate() {
      return this.userPagesPermissions?.roles.create
    },
  },
  mounted() {
    console.log(this.roles)
  },
}
</script>

<style lang="css" scoped></style>
