<template>
  <MainMasterPage :is-header-scrolled="true">
    <transition name="slide-y-transition">
      <alert
        ref="alertComponent"
        class="alert"
        :type="alert.type"
        :title="alert.title"
        :text="alert.text"
      />
    </transition>
    <Form @submit-event="submitCallback" />
  </MainMasterPage>
</template>

<script>
import MainMasterPage from "@/layouts/MainMasterPage.vue"
import Form from "@/components/games/form.vue"
import Alert from "@/components/alerts/Alert.vue"
export default {
  name: "FormPage",
  components: {
    MainMasterPage,
    Form,
    Alert,
  },
  data() {
    return {
      alert: {
        type: "",
        title: "",
        text: "",
      },
    }
  },
  methods: {
    submitCallback(e) {
      if (e.success) {
        this.$router.push({ name: "SpecificGame", params: { id: e.id } })
      } else {
        switch (e.statusCode) {
          case 400:
            this.showAlert({
              type: "warning",
              title: "Warning",
              text: "Check validity of fields and try again",
            })
            break
          case 404:
            this.showAlert({
              type: "error",
              title: "Not found",
              text: "Current game not found",
            })
            break

          default:
            this.showAlert({
              type: "error",
              title: "Oops",
              text: "Something went wrong, please try again later",
            })
            break
        }
      }
    },
    showAlert(alertObj) {
      this.alert = { ...alertObj }
      this.$refs.alertComponent.showAlert()
    },
  },
}
</script>

<style lang="css" scoped>
.form-container {
  margin-top: 2rem;
}
.alert {
  z-index: 100;
}
</style>
