<template>
  <v-card class="bg-transparent" theme="dark" elevation="5">
    <v-container>
      <v-row>
        <MainForm @submit-main-form="emitFormSubmit" :profile="profile" />
      </v-row>
      <v-row>
        <EmailForm
          v-if="isOwnProfile"
          @submit-email-form="emitFormSubmit"
          :profile-email="profile.email"
        />
      </v-row>
      <v-row v-if="isOwnProfile">
        <PasswordForm
          @submit-password-form="emitFormSubmit"
          :profile-id="profile.id"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
import PasswordForm from "./passwordForm.vue"
import EmailForm from "./emailForm.vue"
import MainForm from "./mainForm.vue"
export default {
  name: "ProfileCard",
  components: {
    MainForm,
    PasswordForm,
    EmailForm,
  },
  props: {
    profile: {
      type: Object,
      default: {},
    },
  },
  methods: {
    emitFormSubmit(payload) {
      this.$emit("submit-form", payload)
    },
  },
  computed: {
    ...mapGetters("auth", ["userId"]),
    isOwnProfile() {
      return (
        this.$route.name === "OwnProfile" ||
        this.$route.params.id === this.userId
      )
    },
  },
}
</script>

<style lang="css" scoped>
:deep(.v-btn__overlay) {
  background-color: black;
}
:deep(.v-btn--disabled .v-btn__overlay) {
  opacity: 0.3;
}
</style>
