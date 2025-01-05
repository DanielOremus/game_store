<template>
  <v-card
    elevation="0"
    class="bg-transparent d-flex flex-column justify-center"
  >
    <transition name="slide-y-transition">
      <Alert
        ref="alertComponent"
        :type="alert.type"
        :text="alert.text"
        :title="alert.title"
      />
    </transition>
    <v-card-title class="mb-10 text-h4 px-0">Forgot password?</v-card-title>
    <v-card-text class="mb-5 text-h6 px-0 text-grey-lighten-1 flex-grow-0">
      Please enter the address which you used to register. We'll send you an
      email with a reset link. Check your spam box if you didn't receive it. In
      case of any complications, please contact us : gamestore.by.do@gmail.com.
    </v-card-text>
    <v-form @submit.prevent="onSend" ref="formElement" v-model="form">
      <v-text-field
        color="orange-darken-3"
        variant="outlined"
        placeholder="Your email"
        :rules="email.rules"
        v-model="email.value"
      >
      </v-text-field>
      <v-btn
        block
        size="large"
        color="orange-darken-3"
        type="submit"
        class="mt-2"
        :disabled="isBtnDisabled"
        >Send</v-btn
      >
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from "vuex"
import AuthValidator from "@/validators/AuthValidator"
import { getFieldValidationFunc } from "@/validators/validationHelpers"
import Alert from "@/components/alerts/Alert.vue"
export default {
  name: "EmailForm",
  components: {
    Alert,
  },
  data() {
    return {
      form: false,
      email: {
        value: "",
        rules: [getFieldValidationFunc(AuthValidator.registerSchema, "email")],
      },
      alert: {
        type: "success",
        text: "Letter was sent successfully!",
        title: "Success",
      },
    }
  },
  computed: {
    isBtnDisabled() {
      return !this.form
    },
  },
  methods: {
    ...mapActions("auth", ["sendResetLink"]),
    showAlert() {
      this.alert = {
        type: this.alert.type,
        title: this.alert.title,
        text: this.alert.text,
      }
      this.$refs.alertComponent.showAlert()
    },
    async onSend() {
      //TODO: Add email validator
      try {
        await this.sendResetLink(this.email.value)
        this.showAlert()
      } catch (error) {}
    },
  },
}
</script>

<style lang="css" scoped>
.v-card {
  max-width: 800px;
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
