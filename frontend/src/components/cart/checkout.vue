<template>
  <v-card
    theme="dark"
    elevation="0"
    class="checkout-container rounded-lg pa-10"
  >
    <div v-if="isLoading" class="d-flex justify-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else class="d-flex flex-column ga-3">
      <div class="d-flex justify-space-between official-price">
        <span>Official Price</span>
        <span>{{ totalPrice }}$</span>
      </div>
      <div class="d-flex justify-space-between discount">
        <span>Discount </span>
        <span>{{ discount }}$</span>
      </div>
      <div class="mt-5 d-flex justify-space-between subtotal">
        <span>Subtotal</span>
        <span>{{ totalSalePrice }}$</span>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "CartCheckout",
  computed: {
    ...mapGetters("cart", ["totalPrice", "totalSalePrice", "isLoading"]),
    discount() {
      const discount = this.totalSalePrice - this.totalPrice
      return parseFloat(discount.toFixed(2))
    },
  },
}
</script>

<style lang="css" scoped>
.official-price,
.discount {
  color: var(--main-text-color);
  font-size: 1.1rem;
}
.subtotal {
  & :first-child {
    font-size: 1.3rem;
  }
  & :last-child {
    font-size: 1.5rem;
  }
}
.checkout-container {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
