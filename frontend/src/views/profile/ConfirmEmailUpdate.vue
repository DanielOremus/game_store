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
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "ConfirmEmailUpdate",
  data() {
    return {
      statusMessage: "Please do not close this window",
    }
  },
  methods: {
    ...mapActions("profile", [""]),
  },
  async mounted() {
    try {
    } catch (error) {}
  },
}
</script>

<style lang="scss" scoped></style>
