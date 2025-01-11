<template>
  <MainMasterPage>
    <v-container class="cart-list-wrapper">
      <v-row>
        <v-col cols="12" lg="9" xl="7">
          <div class="mb-5 text-h5">Cart</div>
          <CartList />
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="summary" cols="12" lg="3" xl="4">
          <div class="mb-5 text-h5">Summary</div>
          <CartCheckout />
        </v-col>
      </v-row>
    </v-container>
  </MainMasterPage>
</template>

<script>
import CartList from "@/components/cart/list.vue"
import CartCheckout from "@/components/cart/checkout.vue"
import { mapGetters } from "vuex"
import MainMasterPage from "@/layouts/MainMasterPage.vue"
export default {
  name: "CartPage",
  components: {
    CartList,
    CartCheckout,
    MainMasterPage,
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  beforeMount() {
    if (!this.isAuthenticated) {
      this.$router.push({ name: "Login" })
    }
  },
}
</script>

<style lang="css" scoped>
.cart-list-wrapper {
  margin-top: 5rem;
  width: 100%;
}
.summary {
  position: sticky;
  top: 10rem;
  align-self: flex-start;
}
</style>
