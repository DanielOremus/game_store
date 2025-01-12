<template>
  <v-card class="card" elevation="0">
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <div
          v-bind="props"
          :style="{ transform: isHovering ? 'scale(1.04)' : 'scale(1)' }"
          class="main-img-container d-flex"
          @click="
            $router.push({
              name: 'SpecificGame',
              params: { id: game._id },
              meta: { pageTitle: game.name },
            })
          "
        >
          <img class="main-img" :src="`${API_BASE}/${game.mainImgSrc}`" />
          <div v-if="game.sale !== 0" class="sale-container">
            <span>-{{ game.sale * 100 }}%</span>
          </div>
        </div>
      </template>
    </v-hover>
    <div
      class="card-content-container align-center d-flex justify-space-between px-2"
    >
      <span>{{ game.name }}</span>
      <div class="d-flex ga-2 align-center">
        <span v-if="game.price !== game.sale_price" class="old-price">
          {{ game.price }}$
        </span>
        <span class="new-price">{{ game.sale_price }}$</span>
      </div>
    </div>
  </v-card>
</template>

<script>
import config from "../../../config/default"
export default {
  name: "GameCard",
  props: {
    game: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      API_BASE: config.API_BASE,
    }
  },
}
</script>

<style lang="css" scoped>
.card {
  padding: 1.3rem;
  border-radius: 1rem;
  background: transparent;
}
.main-img {
  cursor: pointer;

  border-radius: 1rem;
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: fill;
}
.main-img-container {
  transition: transform 0.3s ease;
  position: relative;
}
.sale-container {
  position: absolute;
  left: -4px;
  bottom: 0;
  padding: 4px 10px;
  background-color: #f57c00;
  z-index: 0;
  border-radius: 5px 5px 0;
  font-size: 1.2rem;
  color: white;
  transform-origin: left bottom;
}
.sale-container::after {
  content: "";
  position: absolute;
  right: -4px;
  bottom: 0;
  top: 0;
  border-radius: 6px 3px;
  background-color: inherit;
  z-index: -1;
  width: 100%;
  transform: skewX(16deg);
}
.card-content-container {
  margin-top: 0.7rem;
  font-size: 1.2rem;
  color: var(--main-text-color);
  span.new-price {
    font-size: 1.6rem;
    font-weight: 700;
  }
  span.old-price {
    font-size: 1.4rem;

    color: #626262;
    text-decoration: line-through;
  }
}
</style>
