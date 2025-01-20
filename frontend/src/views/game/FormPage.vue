<template>
  <MainMasterPage>
    <Form @submit-event="submitCallback" />
  </MainMasterPage>
</template>

<script>
import MainMasterPage from "@/layouts/MainMasterPage.vue"
import Form from "@/components/games/form.vue"
export default {
  name: "FormPage",
  components: {
    MainMasterPage,
    Form,
  },
  methods: {
    submitCallback(e) {
      console.log("id")

      console.log(e.id)

      if (e.success) {
        this.$router.push({ name: "SpecificGame", params: { id: e.id } })
      } else {
        //TODO: something
      }
    },
  },
}
</script>

<style lang="css" scoped>
.form-container {
  margin-top: 2rem;
}
</style>
