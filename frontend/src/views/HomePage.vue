<template>
  <KeyArtMasterPage
    key-art-src="/backgrounds/ghost-of-tsushima-key-art.jpg"
    :image-caption-title="'Your Gateway to the\nGaming World!'"
    :image-caption-body="'Get game keys at unbeatable prices. From the latest releases to iconic\nclassics and exclusive discounts - all in one place. Start your next adventure today!'"
  >
    <div class="main-container bg-grey-darken-4">
      <GamesList :games="onSaleGames" title="Sales" />
      <GamesList :games="newReleasedGames" title="New" />
    </div>
  </KeyArtMasterPage>
</template>

<script>
import GamesList from "@/components/games/list.vue"
import KeyArtMasterPage from "@/layouts/KeyArtMasterPage.vue"
import { mapActions, mapGetters } from "vuex"
export default {
  name: "HomePage",
  components: {
    KeyArtMasterPage,
    GamesList,
  },

  computed: {
    ...mapGetters("game", ["homePageGames", ""]),
    onSaleGames() {
      return this.homePageGames("sales")
    },
    newReleasedGames() {
      return this.homePageGames("new")
    },
  },
  methods: {
    ...mapActions("game", ["fetchHomePageGames"]),
  },
  mounted() {
    this.fetchHomePageGames({
      category: "new",
      query: {
        sort: "releaseDate:desc",
      },
      limit: 9,
    })
    this.fetchHomePageGames({
      category: "sales",
      query: {
        category: "sales",
      },
      limit: 9,
    })
  },
  beforeMount() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  },
}
</script>

<style lang="css" scoped>
.main-container {
  position: relative;
}
.main-container::after {
  content: "";
  position: absolute;
  left: 0;
  top: -11rem;
  width: 100%;
  height: 11rem;
  background-color: inherit;
  clip-path: polygon(0 40%, 100% 90%, 100% 100%, 0 100%);
  z-index: 2;
}
</style>
