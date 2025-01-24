<template>
  <transition name="slide-y-transition">
    <Alert
      ref="alertComponent"
      :type="alert.type"
      :title="alert.title"
      :text="alert.text"
    />
  </transition>
  <v-card
    elevation="0"
    class="bg-transparent d-flex flex-column justify-center"
  >
    <div class="card-main-content" v-if="isTokenValid">
      <v-card-title class="mb-10 text-h4 px-0">Reset password</v-card-title>
      <v-card-text class="mb-5 text-h6 px-0 text-grey-lighten-1 flex-grow-0">
        Please enter your new password in the fields below. After you can log in
        with your new password
      </v-card-text>
      <v-form
        ref="form"
        class="d-flex flex-column ga-3"
        v-model="form"
        validate-on="input"
        @submit.prevent="onReset"
      >
        <v-text-field
          theme="dark"
          placeholder="New password"
          variant="outlined"
          color="orange-darken-3"
          v-model="newPassword.value"
          :rules="newPassword.rules"
        >
        </v-text-field>
        <v-text-field
          theme="dark"
          placeholder="Confirm password"
          variant="outlined"
          color="orange-darken-3"
          type="password"
          ref="confirmPasswordField"
          v-model="confirmPassword.value"
          :rules="confirmPassword.rules"
        ></v-text-field>
        <v-btn
          color="orange-darken-3"
          type="submit"
          block
          size="large"
          :disabled="isBtnDisabled"
          >Reset Password</v-btn
        >
      </v-form>
    </div>
    <div
      v-else
      class="min-height-100 d-flex flex-column justify-center align-center"
    >
      <h1 class="font-weight-medium text-h2">{{ errorData.code }}</h1>
      <p class="text-h5">{{ errorData.msg }}</p>
    </div>
  </v-card>
</template>

<script>
const alertData = {
  200: {
    type: "success",
    text: "Password was changed successfully! You'll be redirected to Login page",
    title: "Success",
  },
  default: {
    type: "error",
    title: "Oops",
    text: "Something went wrong, please try again later",
  },
  400: {
    type: "warning",
    title: "Warning",
    text: "Please check your password validity and try again",
  },
}

import Alert from "@/components/alerts/Alert.vue"
import { mapActions } from "vuex"
export default {
  name: "PasswordForm",
  components: {
    Alert,
  },
  data() {
    return {
      form: false,
      isTokenValid: false,
      alert: {
        type: "",
        title: "",
        text: "",
      },
      newPassword: {
        value: "",
        rules: [
          (v) =>
            v.trim().length >= 4
              ? true
              : "Password must be at least 4 characters long",
        ],
      },
      confirmPassword: {
        value: "",
        rules: [
          (v) =>
            v === this.newPassword.value ? true : "Your passwords don't match",
        ],
      },
      errorData: {
        msg: "",
        code: null,
      },
    }
  },
  computed: {
    isBtnDisabled() {
      return !this.form
    },
  },
  methods: {
    ...mapActions("auth", ["validateResetToken", "resetPassword"]),
    setMountErrorData(code, msg) {
      this.errorData = {
        code,
        msg,
      }
    },
    showAlert(alertObj) {
      this.alert = { ...alertObj }
      this.$refs.alertComponent.showAlert()
    },

    async onReset() {
      this.$refs.form.validate()
      if (!this.form) return
      const { token } = this.$route.params
      try {
        await this.resetPassword({
          token,
          newPassword: this.newPassword.value,
          confirmPassword: this.confirmPassword.value,
        })
        this.showAlert(alertData[200])
        setTimeout(() => {
          this.$router.push({ name: "Login" })
        }, 5000)
      } catch (error) {
        const responseStatus = error.response?.status
        this.showAlert(alertData[responseStatus] ?? alertData.default)
      }
    },
  },
  watch: {
    "newPassword.value"() {
      this.$refs.confirmPasswordField.validate()
    },
  },
  async beforeMount() {
    const { token } = this.$route.params

    const resObj = await this.validateResetToken({ token })

    if (resObj.isTokenValid) {
      this.isTokenValid = true
    } else {
      const error = resObj.error
      console.log(error)
      switch (error.response?.status) {
        case 400:
          this.setMountErrorData(400, "Token is invalid or has expired")
          break
        default:
          this.setMountErrorData(500, "Something went wrong, try again later")
          break
      }
      this.isTokenValid = false
    }
  },
}
</script>

<style lang="css" scoped>
.v-card {
  max-width: 700px;
}
:deep(.v-btn__overlay) {
  background-color: black;
}
:deep(.v-btn--disabled .v-btn__overlay) {
  opacity: 0.3;
}

:deep(.v-text-field input) {
  font-size: 1.3rem;
}
</style>
