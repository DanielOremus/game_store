<template>
  <v-alert
    :type="type"
    class="alert mb-2"
    v-model="isShown"
    closable
    @click:close="closeAlert()"
  >
    <v-alert-title class="font-weight-bold">{{ title }}</v-alert-title>
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: "Alert",
  props: {
    type: {
      type: String,
      default: "success",
    },
    title: {
      type: String,
      default: "Success!",
    },
    text: {
      type: String,
      default: "You did it!",
    },
  },
  data() {
    return {
      isShown: null,
      timeout: null,
    }
  },
  methods: {
    closeAlert() {
      this.isShown = false
      clearTimeout(this.timeout)
    },
    showAlert() {
      this.isShown = true
      this.timeout = setTimeout(() => {
        this.closeAlert()
      }, 5000)
    },
  },
  beforeRouteLeave(to, from, next) {
    console.log(111)

    this.closeAlert()
    next()
  },
}
</script>

<style lang="css" scoped>
.alert {
  position: absolute;
  top: 1.5rem;
  left: 50%;
  translate: -50%;
  min-width: 400px;
}
</style>
