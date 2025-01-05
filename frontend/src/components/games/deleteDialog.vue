<template>
  <v-dialog max-width="700" v-model="isActive">
    <v-card color="grey-darken-4" :title="this.dialogTitle">
      <v-card-text>
        {{ textContent }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          size="large"
          prepend-icon=""
          @click="isActive = false"
          >No, I'm not sure</v-btn
        >
        <v-btn
          color="red"
          size="large"
          prepend-icon="mdi-alert"
          @click="onConfirm"
          >Yes, I'm sure</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteDialog",
  props: {
    dialogTitle: {
      type: String,
      default: "",
    },
    textContent: {
      type: String,
      default: "",
    },
    confirmCallback: {
      type: Function,
    },
  },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    onConfirm() {
      console.log(this.confirmCallback)

      this.isActive = false
      this.confirmCallback()
    },
  },
}
</script>

<style lang="scss" scoped></style>
