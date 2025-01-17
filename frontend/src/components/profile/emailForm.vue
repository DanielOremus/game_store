<template>
  <v-form class="w-100" v-model="isDataValid" @submit.prevent="onUpdate">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            readonly
            type="email"
            label="Email"
            variant="outlined"
            :model-value="email.value"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            type="email"
            label="New email"
            variant="outlined"
            clearable
            v-model="newEmail.value"
            :rules="newEmail.rules"
            :error-messages="newEmail.errorMessages"
          ></v-text-field>
        </v-col>
        <v-col class="pt-0" cols="12">
          <v-btn
            type="submit"
            color="orange-darken-4"
            block
            size="large"
            :disabled="!isDataValid"
            >Change Email</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { getFieldValidationFunc } from "@/validators/validationHelpers"
import ProfileValidator from "@/validators/ProfileValidator"
import { mapActions } from "vuex"
export default {
  name: "EmailForm",
  props: {
    profileEmail: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isDataValid: false,
      email: {
        value: this.profileEmail,
      },
      newEmail: {
        value: "",
        rules: [
          getFieldValidationFunc(ProfileValidator.emailSchema, "newEmail"),
        ],
        errorMessages: [],
      },
    }
  },
  methods: {
    ...mapActions("profile", ["sendEmailUpdateLink"]),
    async onUpdate() {
      if (!this.isDataValid) return
      try {
        await this.sendEmailUpdateLink({ newEmail: this.newEmail.value })
        this.$emit("submit-email-form", {
          type: "success",
          title: "Email was sent",
          text: "We sent you an email with confirmation link",
        })
      } catch (error) {
        const response = error.response
        switch (response?.status) {
          case 400:
            const { errors } = response.data
            errors.forEach((errObj) => {
              if (this[errObj.path]) {
                this[errObj.path].errorMessages.push(errObj.msg)
              }
            })
            break
          default:
            this.$emit("submit-email-form", {
              type: "error",
              title: "Oops",
              text: "Something went wrong, please try again later",
            })
            break
        }
      }
    },
  },
  computed: {},
  watch: {
    "newEmail.value"() {
      this.newEmail.errorMessages = []
    },
  },
}
</script>

<style lang="scss" scoped></style>
