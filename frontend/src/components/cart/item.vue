<template>
  <v-card color="transparent" elevation="0" class="d-flex ga-5 flex-wrap">
    <img
      class="image"
      :src="`${API_BASE}/${game.mainImgSrc}`"
      alt="game-main-img"
      @click="onImgClick"
    />
    <div
      class="information flex-grow-1 d-flex flex-column justify-space-around"
    >
      <div>
        <div class="name">
          <img
            width="40"
            height="40"
            :src="selectedPlatform.logo"
            alt="platform-logo"
          />
          <span>{{ game.name }}</span>
        </div>
        <span>{{ selectedPlatform.name }}</span>
      </div>
      <v-icon
        icon="mdi-trash-can-outline"
        size="x-large"
        class="delete-icon"
        @click="onDelete"
      ></v-icon>
    </div>
    <div class="price-container d-flex ga-3 align-center">
      <span>{{ game.sale_price }}$</span>
      <v-number-input
        :min="1"
        :step="1"
        theme="dark"
        variant="outlined"
        v-model="selectedAmount.value"
        :rules="selectedAmount.rules"
        hide-details
        inset
        controlVariant="split"
      ></v-number-input>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from "vuex"
import config from "../../../config/default"
export default {
  name: "CartItem",
  props: {
    game: {
      type: Object,
      default: {},
    },
    selectedPlatform: {
      type: Object,
      default: {},
    },
    amount: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      API_BASE: config.API_BASE,
      selectedAmount: {
        value: this.amount,
        rules: [(v) => isFinite(v) && v >= 1],
      },
    }
  },
  methods: {
    ...mapActions("cart", ["deleteGameFromCart", "updateGameAmount"]),
    onDelete() {
      this.deleteGameFromCart({ gameId: this.game._id })
    },
    onImgClick() {
      this.$router.push({ name: "SpecificGame", params: { id: this.game._id } })
    },
  },
  watch: {
    "selectedAmount.value"(newValue) {
      this.updateGameAmount({ gameId: this.game._id, amount: newValue })
    },
  },
}
</script>

<style lang="css" scoped>
.name {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.image {
  border-radius: 1rem;
  height: 150px;
  cursor: pointer;
  aspect-ratio: 16/9;
}
.price-container span {
  font-size: 1.5rem;
  color: var(--main-text-color);
  vertical-align: middle;
}
.name > span {
  font-size: 1.3rem;
}
.delete-icon {
  color: rgb(105, 105, 105);
  cursor: pointer;
}
.delete-icon:hover {
  color: var(--main-text-color);
}
</style>
