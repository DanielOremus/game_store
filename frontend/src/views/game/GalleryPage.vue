<template>
  <MainMasterPage>
    <GalleryManager class="mt-10" :gallery="currentGame.gallery" />
  </MainMasterPage>
</template>

<script>
import MainMasterPage from "@/layouts/MainMasterPage.vue"
import GalleryManager from "@/components/games/galleryManager.vue"
import { mapGetters } from "vuex"
export default {
  name: "GalleryPage",
  components: {
    MainMasterPage,
    GalleryManager,
  },
  computed: {
    ...mapGetters("game", ["currentGame"]),
  },
}
</script>

<style lang="scss" scoped></style>
