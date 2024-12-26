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
      @submit.prevent="onRegister"
      v-model="form"
    >
      <div class="login-separator mb-10">
        <h2 class="login-label">Sign up</h2>
      </div>

      <v-text-field
        class="input"
        placeholder="First name"
        variant="outlined"
        color="orange-darken-4"
        v-model="firstName.value"
        :rules="firstName.rules"
      ></v-text-field>

      <v-text-field
        class="input"
        placeholder="Last name"
        variant="outlined"
        color="orange-darken-4"
        v-model="lastName.value"
        :rules="lastName.rules"
      ></v-text-field>

      <v-text-field
        class="input"
        type="email"
        placeholder="Email"
        variant="outlined"
        color="orange-darken-4"
        v-model="email.value"
        :rules="email.rules"
        :error-messages="email.errorMessages"
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

      <v-text-field
        class="input"
        placeholder="Confirm password"
        variant="outlined"
        color="orange-darken-4"
        :type="isPasswordVisible ? 'text' : 'password'"
        v-model="confirmPassword.value"
        :rules="confirmPassword.rules"
        ref="confirmPasswordField"
      ></v-text-field>

      <v-btn
        color="orange-darken-3"
        class="login-btn rounded-lg text-center font-weight-bold text-h6"
        size="x-large"
        block
        type="submit"
        :disabled="isBtnDisabled"
        >Sign up</v-btn
      >

      <v-row class="mt-1">
        <v-col>
          <span
            @click="$router.push({ name: 'Login' })"
            class="text-grey-lighten-2 actions"
          >
            Already have an account?
          </span>
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
  name: "RegisterForm",
  components: {
    Alert,
  },
  data() {
    return {
      form: false,

      firstName: {
        value: "",
        rules: [
          getFieldValidationFunc(AuthValidator.registerSchema, "firstName"),
        ],
      },
      lastName: {
        value: "",
        rules: [
          getFieldValidationFunc(AuthValidator.registerSchema, "lastName"),
        ],
      },
      email: {
        value: "",
        rules: [getFieldValidationFunc(AuthValidator.registerSchema, "email")],
        errorMessages: [],
      },
      password: {
        value: "",
        rules: [
          getFieldValidationFunc(AuthValidator.registerSchema, "password"),
        ],
      },
      confirmPassword: {
        value: "",
        rules: [
          (v) => {
            if (!v.trim()) return "Confirmation is required"
            return true
          },
          (v) => {
            if (v !== this.password.value) return "Your passwords don't match"
            return true
          },
        ],
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
    ...mapActions("auth", ["register"]),
    showAlert(type, title, text) {
      this.alert = {
        type,
        title,
        text,
      }
      this.$refs.alertComponent.showAlert()
    },

    async onRegister() {
      this.$refs.formElement.validate()
      if (!this.form) {
        return
      }

      try {
        await this.register({
          firstName: this.firstName.value.trim(),
          lastName: this.lastName.value.trim(),
          email: this.email.value.trim(),
          password: this.password.value.trim(),
          confirmPassword: this.confirmPassword.value.trim(),
        })
        this.showAlert("success", "Success", "You successfully signed up!")
        setTimeout(() => {
          this.$router.push({ name: "HomePage" })
        }, 3000)
      } catch (error) {
        const response = error.response
        if (response?.status === 400) {
          const { errors } = response.data
          console.log(errors)
          errors.forEach((errObj) => {
            this[errObj.path].errorMessages = errObj.msg
          })
          return
        }
        this.showAlert(
          "error",
          "Oops",
          "Something went wrong, please try again later"
        )
      }
    },
  },
  watch: {
    "password.value"(newValue) {
      if (newValue !== this.confirmPassword.value) {
        this.$refs.confirmPasswordField.validate()
      } else {
        this.$refs.confirmPasswordField.resetValidation()
      }
    },
    "email.value"() {
      this.email.errorMessages = []
    },
  },
}
</script>

<style lang="css" scoped>
@import url("/public/styles/entry.css");
</style>
