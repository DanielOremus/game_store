<template>
  <MainMasterPage :is-header-scrolled="true">
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <RolesList :roles="roleList" />
    </div>
  </MainMasterPage>
</template>

<script>
import MainMasterPage from "@/layouts/MainMasterPage.vue"
import RolesList from "@/components/admin_panel/roles/rolesList.vue"
import { mapGetters, mapActions } from "vuex"
export default {
  components: {
    MainMasterPage,
    RolesList,
  },
  computed: {
    ...mapGetters("role", ["roleList", "isLoading"]),
  },
  methods: {
    ...mapActions("role", ["fetchAllRoles"]),
  },
  beforeMount() {
    this.fetchAllRoles()
  },
}
</script>

<style lang="scss" scoped></style>
