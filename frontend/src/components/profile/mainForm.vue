<template>
  <v-form
    class="w-100"
    v-model="isDataValid"
    validate-on="eager"
    @submit.prevent="onUpdateProfile"
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            variant="outlined"
            label="First Name"
            v-model="firstName.value"
            :rules="firstName.rules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            label="Last Name"
            variant="outlined"
            v-model="lastName.value"
            :rules="lastName.rules"
          ></v-text-field>
        </v-col>
        <v-col class="pt-0" cols="12">
          <v-select
            theme="dark"
            variant="outlined"
            label="Role"
            item-value="_id"
            item-title="title"
            :loading="isLoading"
            :items="roleList"
            :readonly="!hasRoleUpdatePerm"
            v-model="role.value"
          >
          </v-select>
        </v-col>
        <v-col class="pt-0">
          <v-btn
            type="submit"
            color="orange-darken-4"
            block
            size="large"
            :disabled="!isDataValid"
            >Change</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import ProfileValidator from "@/validators/ProfileValidator"
import { getFieldValidationFunc } from "@/validators/validationHelpers.js"
import { mapGetters, mapActions } from "vuex"
export default {
  name: "MainForm",
  props: {
    profile: {
      type: Object,
      default: {},
    },
  },
  //TODO: add paswsword validation
  data() {
    return {
      isDataValid: false,
      firstName: {
        value: this.profile.firstName,
        rules: [
          getFieldValidationFunc(ProfileValidator.mainSchema, "firstName"),
        ],
      },

      lastName: {
        value: this.profile.lastName,
        rules: [
          getFieldValidationFunc(ProfileValidator.mainSchema, "lastName"),
        ],
      },
      role: {
        value: this.profile.role.id,
        rules: [],
      },
    }
  },
  computed: {
    ...mapGetters("permissions", ["pagesPermissions"]),
    ...mapGetters("role", ["roleList", "isLoading"]),

    hasRoleUpdatePerm() {
      return this.pagesPermissions?.users.update
    },
  },
  methods: {
    ...mapActions("profile", ["updateProfileById"]),
    async onUpdateProfile() {
      try {
        await this.updateProfileById({
          userId: this.profile.id,
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          roleId: this.role.value,
        })
        this.$emit("submit-main-form", {
          type: "success",
          title: "Success",
          text: "Profile was successfully updated",
        })
      } catch (error) {
        //ADD alert message
        console.log(error)
      }
    },
  },
  mounted() {
    console.log(this.roleList)

    console.log(this.profile)
  },
}
</script>

<style lang="scss" coped></style>
