<template>
  <deleteDialog
    ref="deleteDialog"
    :text-content="dialogTextContent"
    :dialog-title="dialogTitle"
    :confirm-callback="deleteCallback"
  />
  <v-card elevation="5" color="grey-darken-3">
    <v-card-title class="text-h5 pb-0">{{ user.fullName }}</v-card-title>
    <v-card-subtitle class="text-subtitle-1">{{
      user.role.title
    }}</v-card-subtitle>
    <v-card-actions>
      <v-btn class="w-25" variant="flat" color="primary" @click="onEdit"
        >Edit</v-btn
      >
      <v-btn class="w-25" variant="flat" color="red-darken-3" @click="onDelete"
        >Delete</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
const dialogTitle = "Are you sure"
import deleteDialog from "@/components/games/deleteDialog.vue"
import { mapActions } from "vuex"
export default {
  name: "UserItem",
  components: {
    deleteDialog,
  },
  props: {
    user: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions("user", ["deleteUserById"]),
    onEdit() {
      this.$router.push({ name: "UserProfile", params: { id: this.user_id } })
    },
    onDelete() {
      this.$refs.deleteDialog.isActive = true
    },
    async deleteCallback() {
      try {
        await this.deleteUserById(this.user._id)
      } catch (error) {
        console.log(error)
      }
    },
  },
  computed: {
    dialogTextContent() {
      return `Do you really want to delete user "${this.user.fullName}" ?`
    },
    dialogTitle() {
      return dialogTitle
    },
  },
}
</script>

<style lang="scss" scoped></style>
