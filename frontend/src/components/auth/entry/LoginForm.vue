<template>
  <v-card
    elevation="0"
    color="transparent"
    class="d-flex justify-center align-center flex-column"
  >
    <transition name="slide-y-transition">
      <Alert
        ref="alertComponent"
        :type="alert.type"
        :text="alert.text"
        :title="alert.title"
      />
    </transition>

    <v-form
      class="form"
      ref="formElement"
      validate-on="input"
      @submit.prevent="onLogin"
      v-model="form"
    >
      <div class="login-separator mb-10">
        <h2 class="login-label">Log in</h2>
      </div>
      <v-text-field
        class="input"
        type="email"
        placeholder="Email"
        variant="outlined"
        color="orange-darken-4"
        v-model="email.value"
        :rules="email.rules"
      ></v-text-field>

      <v-text-field
        class="input"
        placeholder="Password"
        variant="outlined"
        color="orange-darken-4"
        :type="isPasswordVisible ? 'text' : 'password'"
        :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="isPasswordVisible = !isPasswordVisible"
        v-model="password.value"
        :rules="password.rules"
      ></v-text-field>

      <v-btn
        color="orange-darken-3"
        class="login-btn rounded-lg text-center font-weight-bold text-h6"
        size="x-large"
        block
        type="submit"
        :disabled="isBtnDisabled"
        >Log in</v-btn
      >

      <v-row class="mt-1">
        <v-col>
          <span
            class="text-grey-lighten-2 actions"
            @click="$router.push({ name: 'Register' })"
          >
            Don't have an account?
          </span>
        </v-col>
        <v-col class="text-right">
          <span
            @click="$router.push({ name: 'ResetPassword' })"
            class="text-grey-lighten-2 actions"
            >Forgot password?</span
          >
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from "vuex"
import AuthValidator from "@/validators/AuthValidator"
import { getFieldValidationFunc } from "@/validators/validationHelpers.js"

import Alert from "@/components/alerts/Alert.vue"
export default {
  name: "LoginForm",
  components: {
    Alert,
  },
  data() {
    return {
      form: false,
      email: {
        value: "",
        rules: [getFieldValidationFunc(AuthValidator.loginSchema, "email")],
      },
      password: {
        value: "",
        rules: [getFieldValidationFunc(AuthValidator.loginSchema, "password")],
      },
      isPasswordVisible: false,
      alert: {
        type: "success",
        title: "Success!",
        text: "You did it",
      },
    }
  },
  computed: {
    isBtnDisabled() {
      return !this.form
    },
  },
  methods: {
    ...mapActions("auth", ["login"]),
    showAlert(type, title, text) {
      this.alert = {
        type,
        title,
        text,
      }
      this.$refs.alertComponent.showAlert()
    },

    async onLogin() {
      this.$refs.formElement.validate()
      if (!this.form) return

      try {
        await this.login({
          email: this.email.value,
          password: this.password.value,
        })
        this.showAlert("success", "Success", "You successfully logged in!")
        setTimeout(() => {
          this.$router.push({ name: "Home" })
        }, 3000)
      } catch (error) {
        const response = error.response
        switch (response?.status) {
          case 401:
            this.password.value = ""
            this.showAlert("error", "Oops", response.data.msg)
            break

          case 409:
            this.showAlert("error", "Oops", response.data.msg)
            break

          default:
            this.showAlert(
              "error",
              "Oops",
              "Something went wrong, please try again later"
            )
            break
        }
      }
    },
  },
}
</script>

<style lang="css" scoped>
@import url("/public/styles/entry.css");
</style>
