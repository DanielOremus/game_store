<template>
  <MainMasterPage :is-header-scrolled="true">
    <transition name="slide-y-transition">
      <Alert
        :type="alert.type"
        :title="alert.title"
        :text="alert.text"
        class="alert"
        ref="alertComponent"
      />
    </transition>
    <div
      class="flex-grow-1 d-flex justify-center align-center"
      v-if="isProfileLoading"
    >
      <v-progress-circular
        size="35"
        :width="5"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-container v-else-if="profile" class="flex-grow-1 d-flex">
      <v-row class="align-self-center">
        <v-col>
          <h1 class="fullname">
            Hello, <span>{{ profile?.fullName }}</span>
          </h1>
        </v-col>
        <v-col>
          <ProfileFormCard @submit-form="onFormSubmit" :profile="profile" />
        </v-col>
      </v-row>
    </v-container>
  </MainMasterPage>
</template>

<script>
import PasswordForm from "@/components/profile/passwordForm.vue"
import ProfileFormCard from "@/components/profile/card.vue"
import Alert from "@/components/alerts/Alert.vue"
import MainMasterPage from "@/layouts/MainMasterPage.vue"
import { mapActions, mapGetters } from "vuex"
export default {
  name: "ProfilePage",
  components: {
    PasswordForm,
    MainMasterPage,
    ProfileFormCard,
    Alert,
  },
  data() {
    return {
      alert: {
        type: "success",
        text: "You successfully change password!",
        title: "Success",
      },
    }
  },
  computed: {
    ...mapGetters("profile", { isProfileLoading: "isLoading" }),
    ...mapGetters("profile", ["profile"]),
    ...mapGetters("permissions", ["pagesPermissions"]),
    ...mapGetters("role", ["roleList"]),

    hasRoleUpdatePerm() {
      return this.pagesPermissions?.users.update
    },
  },
  methods: {
    ...mapActions("profile", ["fetchProfileById"]),
    ...mapActions("role", ["fetchAllRoles", "setRoleList"]),

    showAlert(type, title, text) {
      this.alert.type = type
      this.alert.title = title
      this.alert.text = text
      this.$refs.alertComponent.showAlert()
    },
    onFormSubmit(e) {
      const { type, title, text } = e
      this.showAlert(type, title, text)
    },
  },
  async mounted() {
    await this.fetchProfileById(this.$route.params.id)
    if (this.hasRoleUpdatePerm) {
      this.fetchAllRoles()
    } else {
      const { id, ...roleObj } = this.profile.role
      this.setRoleList([{ _id: id, ...roleObj }])
    }
  },
}
</script>

<style lang="css" scoped>
.fullname {
  font-weight: 300;
  font-size: 3rem;
  text-align: center;
  color: var(--main-text-color);
}
.fullname > span {
  font-weight: 500;
}
.alert {
  z-index: 100;
}
</style>
