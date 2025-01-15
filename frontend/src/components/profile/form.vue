<template>
  <v-card class="bg-transparent" elevation="5">
    <v-container fluid>
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
            :readonly="!hasRoleUpdatePerm"
            :items="roleList"
            :item-value="roleList._id"
            :item-title="roleList.title"
            theme="dark"
            variant="outlined"
            v-model="role.value"
            label="Role"
          >
          </v-select>
        </v-col>
        <v-col class="pt-0">
          <v-btn color="orange-darken-4" block size="large">Change</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            disabled
            type="email"
            label="Email"
            variant="outlined"
            v-model="email.value"
            :rules="email.rules"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            type="email"
            label="New email"
            variant="outlined"
            v-model="newEmail.value"
            :rules="newEmail.rules"
          ></v-text-field>
        </v-col>
        <v-col class="pt-0" cols="12">
          <v-btn color="orange-darken-4" block size="large">Change Email</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="isOwnProfile">
        <v-col>
          <v-text-field
            readonly
            label="Password"
            variant="outlined"
            v-model="oldPassword.value"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            type="email"
            label="New password"
            variant="outlined"
            v-model="newPassword.value"
            :rules="newPassword.rules"
          ></v-text-field>
        </v-col>
        <v-col class="pt-0" cols="12">
          <v-btn color="orange-darken-4" block size="large"
            >Change Password</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  name: "ProfileForm",
  props: {
    profile: {
      type: Object,
      default: {},
    },
    roleList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      firstName: {
        value: this.profile.firstName,
        rules: [],
      },
      lastName: {
        value: this.profile.lastName,
        rules: [],
      },
      role: {
        value: { id: this.profile.role?.id, title: this.profile.role?.title },
        rules: [],
      },
      email: {
        value: this.profile.email,
        rules: [],
      },
      newEmail: {
        value: "",
        rules: [],
      },
      oldPassword: {
        value: "",
        rules: [],
      },
      newPassword: {
        value: "",
        rules: [],
      },
    }
  },
  computed: {
    ...mapGetters("auth", ["userId"]),
    ...mapGetters("permissions", ["pagePermissions"]),

    isOwnProfile() {
      return !this.$route.params.id || this.$route.params.id === this.userId
    },
    hasRoleUpdatePerm() {
      return this.pagePermissions?.users.update
    },
  },
  methods: {
    ...mapActions("profile", ["updateUserPassword"]),

    async onChangePassword() {
      try {
        await this.updateUserPassword({
          userId: this.userId,
          oldPassword: this.oldPassword.value,
          newPassword: this.newPassword.value,
        })
      } catch (error) {}
    },
  },
  mounted() {
    console.log(this.profile.role)
  },
}
</script>

<style lang="scss" coped></style>
