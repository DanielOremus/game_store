<template>
  <div class="d-flex justify-center align-center flex-grow-1">
    <div class="text-center">
      <h3 class="text-h3">
        {{ statusMessage }}
      </h3>
      <v-progress-circular
        class="mt-5"
        indeterminate
        :size="40"
        v-if="isLoading"
      ></v-progress-circular>
      <v-icon
        class="icon mt-5"
        v-else
        size="x-large"
        :icon="statusIcon"
      ></v-icon>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "ConfirmEmailUpdate",
  data() {
    return {
      isLoading: true,
      statusMessage:
        "Please do not close this window until we confirm your link",
      success: false,
    }
  },
  methods: {
    ...mapActions("profile", ["updateUserEmail"]),
  },
  computed: {
    statusIcon() {
      return this.success ? "mdi-check-circle" : "mdi-close-circle"
    },
  },
  async mounted() {
    try {
      await this.updateUserEmail(this.$route.params.token)
      this.statusMessage =
        "We've successfully changed your email. You can close this window now"
      this.success = true
    } catch (error) {
      console.log(error)

      const response = error.response
      switch (response?.status) {
        case 400:
          this.statusMessage =
            "Your link is invalid or expired. You can close this window and try again later"
          break
        default:
          this.statusMessage =
            "Something went wrong. You can close this window and try again later"
          break
      }
      this.success = false
    } finally {
      this.isLoading = false
    }
  },
}
</script>

<style lang="css" scoped>
.icon {
  font-size: 3rem;
}
</style>
