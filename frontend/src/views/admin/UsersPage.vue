<template>
  <MainMasterPage :is-header-scrolled="true">
    <usersList :users="usersList" />
  </MainMasterPage>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import usersList from "../../components/admin_panel/users/usersList.vue"
import MainMasterPage from "@/layouts/MainMasterPage.vue"
export default {
  name: "UsersPage",
  components: {
    MainMasterPage,
    usersList,
  },
  data() {
    return {
      users: [
        {
          _id: "67699d63ec8118914fa59447",
          fullName: "Adbul Habib",
          role: { title: "Guest" },
        },
        {
          _id: "6761d10d3a094a043b19ba02",
          fullName: "Mitz Cannon",
          role: { title: "Root" },
        },
        {
          _id: "6787420b653d5af5c468312e",
          fullName: "Mitz1 Cannon1",
          role: { title: "Manager" },
        },
      ],
    }
  },
  methods: {
    ...mapActions("user", ["fetchUsers"]),
  },
  computed: {
    ...mapGetters("user", ["usersList"]),
  },
  mounted() {
    this.fetchUsers({ query: { page: 0, perPage: 9 }, isNew: true })
  },
}
</script>

<style lang="scss" scoped></style>
