<template>
  <v-container class="cart-list-container rounded-lg">
    <div v-if="isLoading" class="d-flex justify-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div class="items" v-else>
      <div v-for="(item, i) in cart?.games">
        <CartItem
          :key="item._id"
          :game="item.game"
          :selectedPlatform="item.selectedPlatform"
          :amount="item.amount"
        />
        <v-divider class="my-8" v-if="i + 1 < cart.games.length"></v-divider>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import CartItem from "./item.vue"
export default {
  name: "CartList",
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters("cart", ["cart", "isLoading"]),
  },
  methods: {
    ...mapActions("cart", ["fetchCartData"]),
  },
  mounted() {
    this.fetchCartData()
  },
}
</script>

<style lang="css" scoped>
.cart-list-container {
  background-color: rgb(47, 47, 47);
  padding: 2rem;
}
</style>
