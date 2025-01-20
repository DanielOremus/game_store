<template>
  <MainMasterPage>
    <div class="main-container">
      <component
        v-if="!arePlatformsLoading && !areGenresLoading"
        class="filter-panel"
        :is="FilterPanel"
        :platforms="platforms"
        :genres="genres"
        :sort-options="sortOptions"
        @filters-apply="onApplyFilters"
        @search-apply="onSearchApply"
      >
      </component>
      <GamesList
        v-show="isLoading || totalGamesCount"
        :games="currentPageGames"
        fluid
      />

      <div
        v-show="!isLoading && !totalGamesCount"
        class="flex-grow-1 text-h5 w-100"
      >
        <div class="w-100 h-100 d-flex justify-center align-center">
          Sorry, we couldn't find anything
        </div>
      </div>
    </div>
  </MainMasterPage>
</template>

<script>
const sortOptions = [
  {
    title: "Discount: Best",
    value: "sale:desc",
  },
  {
    title: "Price: Low to High",
    value: "price:asc",
  },
  {
    title: "Price: High to Low",
    value: "price:desc",
  },
  {
    title: "Release: Recent",
    value: "releaseDate:desc",
  },
  {
    title: "Release: Old",
    value: "releaseDate:asc",
  },
]
import MainMasterPage from "@/layouts/MainMasterPage.vue"
import GamesList from "@/components/games/list.vue"
// import FilterPanel from ""
import { mapActions, mapGetters } from "vuex"
import { defineAsyncComponent } from "vue"
export default {
  name: "GameListPage",
  components: {
    MainMasterPage,
    GamesList,
    // FilterPanel,
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions("platform", ["fetchAllPlatforms"]),
    ...mapActions("genre", ["fetchAllGenres"]),
    ...mapActions("game", ["fetchGames"]),

    async onWindowScroll() {
      if (this.isLoading) return
      if (this.noMoreGame) return
      if (!this.isNearToWindowBottom()) return
      await this.fetchGames({
        query: {
          page: this.currentPage + 1,
          perPage: this.perPage,
        },
        isNew: false,
      })
    },
    isNearToWindowBottom() {
      return (
        window.innerHeight + window.scrollY > document.body.offsetHeight - 300
      )
    },
    setScrollListener() {
      window.addEventListener("scroll", this.onWindowScroll)
    },
    clearScrollListener() {
      window.removeEventListener("scroll", this.onWindowScroll)
    },
    onApplyFilters() {
      this.fetchGames({ query: this.$route.query, isNew: true })
    },
    onSearchApply() {
      this.fetchGames({ query: { name: this.$route.query.name }, isNew: true })
    },
  },
  computed: {
    ...mapGetters("game", [
      "currentPageGames",
      "currentPage",
      "perPage",
      "totalGamesCount",
      "isLoading",
    ]),
    ...mapGetters("platform", ["platforms"]),
    ...mapGetters("platform", { arePlatformsLoading: "isLoading" }),
    ...mapGetters("genre", ["genres"]),
    ...mapGetters("genre", { areGenresLoading: "isLoading" }),

    noMoreGame() {
      return this.totalGamesCount <= this.currentPageGames.length
    },
    FilterPanel() {
      return defineAsyncComponent(() =>
        import("@/components/games/filterPanel.vue")
      )
    },
    sortOptions() {
      return sortOptions
    },
  },
  mounted() {
    this.fetchAllPlatforms()
    this.fetchAllGenres()
    this.fetchGames({ query: this.$route.query, isNew: true })
    this.setScrollListener()
  },
  beforeUnmount() {
    this.clearScrollListener()
  },
}
</script>

<style lang="css" scoped>
.filter-panel {
  padding-inline: 2rem;
}
.main-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  margin-inline: 4rem;
}
</style>
