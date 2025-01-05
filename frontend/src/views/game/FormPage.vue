<template>
  <MainMasterPage>
    <Form @submit="submitCallback" />
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
      if (e.success) {
        this.$router.push({ name: "SpecificGame", id: e.id })
      } else {
      }
    },
  },
}
</script>

<style lang="css" scoped></style>
