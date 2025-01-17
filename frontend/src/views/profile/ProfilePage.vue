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
    <v-container class="flex-grow-1 d-flex" v-else>
      <v-row class="align-self-center">
        <v-col>
          <h1 class="fullname">
            Hello, <span>{{ profile.fullName }}</span>
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
    ...mapGetters("profile", ["profile"]),
    ...mapGetters("profile", { isProfileLoading: "isLoading" }),
  },
  methods: {
    ...mapActions("profile", ["fetchProfileById"]),

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
  mounted() {
    this.fetchProfileById()
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
