<template>
  <v-container>
    <div v-if="title" class="list-title-container">
      <span>
        {{ title }}
      </span>
    </div>

    <v-row justify-center>
      <v-col
        class="game-card"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        v-for="game in games"
        :key="game._id"
      >
        <GameCard :game="game" />
      </v-col>

      <v-col cols="12" class="text-center" v-if="isLoading">
        <v-progress-circular indeterminate></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GameCard from "./card.vue"
import { mapGetters } from "vuex"
export default {
  name: "GamesList",
  components: {
    GameCard,
  },
  props: {
    games: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters("game", ["isLoading"]),
  },
}
</script>

<style lang="css" scoped>
.list-title-container {
  font-size: 2rem;
  color: var(--main-text-color);
  margin-bottom: 1.5rem;
}
</style>
