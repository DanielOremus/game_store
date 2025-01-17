<template>
  <v-form
    class="w-100"
    validate-on="input"
    v-model="isDataValid"
    @submit.prevent="onChangePassword"
  >
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            label="Password"
            variant="outlined"
            v-model.trim="oldPassword.value"
            :rules="oldPassword.rules"
            clearable
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="New password"
            variant="outlined"
            v-model.trim="newPassword.value"
            :rules="newPassword.rules"
            clearable
          >
          </v-text-field>
        </v-col>
        <v-col class="pt-0" cols="12">
          <v-btn
            type="submit"
            color="orange-darken-4"
            :disabled="!isDataValid"
            block
            size="large"
            >Change Password</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { getFieldValidationFunc } from "@/validators/validationHelpers.js"
import ProfileValidator from "@/validators/ProfileValidator"
import { mapActions } from "vuex"
export default {
  name: "PasswordForm",
  props: {
    profileId: {
      type: String,
      default: "",
      required: true,
    },
  },
  data() {
    return {
      isDataValid: false,
      oldPassword: {
        value: "",
        rules: [
          getFieldValidationFunc(
            ProfileValidator.passwordSchema,
            "oldPassword"
          ),
        ],
      },
      newPassword: {
        value: "",
        rules: [
          getFieldValidationFunc(
            ProfileValidator.passwordSchema,
            "newPassword"
          ),
        ],
      },
    }
  },
  methods: {
    ...mapActions("profile", ["updateUserPassword"]),
    clearPasswordFields() {
      this.oldPassword.value = ""
      this.newPassword.value = ""
    },

    async onChangePassword() {
      if (!this.isDataValid) return
      try {
        await this.updateUserPassword({
          userId: this.profileId,
          oldPassword: this.oldPassword.value,
          newPassword: this.newPassword.value,
        })
        this.clearPasswordFields()
        this.$emit("submit-password-form", {
          type: "success",
          title: "Success",
          text: "Password was successfully changed",
        })
      } catch (error) {
        const response = error.response
        switch (response?.status) {
          case 400: {
            this.$emit("submit-password-form", {
              type: "error",
              title: "Error",
              text: response.data.errors
                ? response.data.errors[0].msg
                : response.data.msg,
            })
            break
          }
          default: {
            this.$emit("submit-password-form", {
              type: "error",
              title: "Oops",
              text: "Something went wrong, please try again later",
            })
            break
          }
        }
      }
    },
  },
  computed: {},
}
</script>

<style lang="scss" scoped></style>
