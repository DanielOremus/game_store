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
  methods: {
    ...mapActions("user", ["fetchUsers"]),
    onScroll() {
      if (this.isLoading || this.noMoreUsers || !this.isNearToBottom) return
      console.log(111)

      this.fetchUsers({
        query: {
          page: this.pageData.currentPage + 1,
          perPage: this.pageData.perPage,
        },
        isNew: false,
      })
    },
  },
  computed: {
    ...mapGetters("user", [
      "usersList",
      "isLoading",
      "totalUsersCount",
      "pageData",
    ]),
    noMoreUsers() {
      return this.usersList.length >= this.totalUsersCount
    },
    isNearToBottom() {
      return (
        window.innerHeight + window.scrollY > document.body.offsetHeight - 300
      )
    },
  },
  mounted() {
    this.fetchUsers({
      query: { page: 0, perPage: this.pageData.perPage },
      isNew: true,
    })
    window.addEventListener("scroll", this.onScroll)
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll)
  },
}
</script>

<style lang="css" scoped></style>
