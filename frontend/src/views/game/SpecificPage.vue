<template>
  <KeyArtMasterPage :key-art-src="gameKeyArt">
    <div class="trapezoid w-100 bg-grey-darken-4"></div>
    <div v-if="isLoading" class="text-center">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <v-container v-else class="main-container bg-grey-darken-4">
      <v-row class="panel-container">
        <v-col cols="12" lg="6" xl="6">
          <div class="mr-10">
            <img
              class="main-img"
              :src="`${API_BASE}/${game.mainImgSrc}`"
              alt="game-img"
            />
          </div>
        </v-col>
        <v-col cols="12" lg="6" xl="6">
          <v-card
            elevation="0"
            class="main-info-card pa-4 ml-10 d-flex flex-column ga-4 align-center"
          >
            <v-card-title class="game-name">
              {{ game.name }}
            </v-card-title>
            <div class="d-flex ga-5">
              <a
                :href="platform.url"
                target="_blank"
                v-for="platform in game.platform"
              >
                <v-chip class="pl-2 cursor-pointer" size="x-large">
                  <img
                    width="40px"
                    height="40px"
                    :src="platform.logo"
                    alt="platform-logo"
                    class="pa-1 d-block"
                  />
                  <span>
                    {{ platform.name }}
                  </span>
                </v-chip>
              </a>
            </div>
            <div class="price-container d-flex ga-8">
              <span class="old-price" v-if="game.sale_price !== game.price"
                >{{ game.price }}$</span
              >
              <span class="sale" v-if="game.sale !== 0">
                -{{ game.sale * 100 }}%
              </span>
              <span class="new-price"> {{ game.sale_price }}$ </span>
            </div>
            <div class="d-flex w-75 flex-column flex-wrap ga-3">
              <v-btn
                color="orange-darken-3"
                size="large"
                block
                @click="onAddToCart"
                >Add to Cart</v-btn
              >
              <div class="d-flex ga-3 flex-wrap">
                <v-btn
                  v-if="pagesPermissions?.games.update"
                  color="blue-darken-3"
                  class="flex-fill"
                  prepend-icon="mdi-update"
                  size="large"
                  @click="
                    $router.push({
                      name: 'UpdateGame',
                      params: { id: game._id },
                    })
                  "
                  >Update</v-btn
                >

                <v-btn
                  v-if="pagesPermissions?.games.update"
                  prepend-icon="mdi-image-edit"
                  class="flex-fill"
                  color="grey-darken-3"
                  size="large"
                  @click="
                    $router.push({
                      name: 'UpdateGallery',
                      params: { id: game._id },
                    })
                  "
                  >Update Gallery</v-btn
                >

                <v-btn
                  v-if="pagesPermissions?.games.delete"
                  prepend-icon="mdi-delete"
                  class="flex-fill"
                  color="error"
                  size="large"
                  @click="onDelete"
                  >Delete</v-btn
                >
                <DeleteDialog
                  :dialog-title="deleteDialog.title"
                  :text-content="deleteDialog.textContent"
                  :confirm-callback="deleteCallback"
                  ref="deleteDialog"
                />
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="description-container">
        <v-container>
          <h3 class="text-h3">Description</h3>
          <v-row class="game-description">
            <v-col cols="12" lg="6" xl="6">
              <p>
                {{ game.description }}
              </p>
            </v-col>
            <v-col cols="12" lg="6" xl="6">
              <div class="game-data-container d-flex flex-column ga-3">
                <div class="d-flex justify-space-between">
                  <span>Installation</span>
                  <a
                    href="https://youtube.com/playlist?list=PL3jra4TqDKaQxpy4jT5cgWWG9_nx1mzo8&si=-aPC5SP-gSzQh_ni"
                    target="_blank"
                    >How to activate your game</a
                  >
                </div>
                <div class="d-flex justify-space-between">
                  <span>Release Date</span>
                  <span>
                    {{ gameFormattedRelease }}
                  </span>
                </div>
                <div class="d-flex justify-space-between">
                  <span>Genre</span>
                  <span>{{ game.genre?.map((el) => el.name).join(", ") }}</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
      <v-row v-if="game.gallery?.length > 0" class="gallery-container">
        <v-col cols="12">
          <v-container class="mx-0 pa-0">
            <h3 class="text-h3 d-block">Gallery</h3>
            <v-row class="gallery-wrapper">
              <v-col
                cols="12"
                md="6"
                lg="4"
                xl="4"
                v-for="imageObj in gameImages"
              >
                <img :src="`${API_BASE}/${imageObj.src}`" alt="" />
              </v-col>
              <v-col
                v-if="gameVideos.length > 0"
                cols="12"
                md="6"
                lg="6"
                xl="6"
                v-for="videoObj in gameVideos"
              >
                <VideoPlayer
                  :options="{
                    controls: true,
                    aspectRatio: '16:9',
                    sources: videoObj,
                  }"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12"> </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </KeyArtMasterPage>
</template>

<script>
import KeyArtMasterPage from "@/layouts/KeyArtMasterPage.vue"
import { mapActions, mapGetters } from "vuex"
import config from "../../../config/default"
import VideoPlayer from "@/components/VideoPlayer.vue"
import DeleteDialog from "@/components/games/deleteDialog.vue"
export default {
  name: "SpecificGamePage",
  components: {
    KeyArtMasterPage,
    VideoPlayer,
    DeleteDialog,
  },
  data() {
    return {
      game: {},
      API_BASE: config.API_BASE,
      deleteDialog: {
        title: "Are you sure?",
        textContent: "Do you really want to delete this game?",
      },
    }
  },
  computed: {
    ...mapGetters("game", ["isLoading"]),
    ...mapGetters("permissions", ["pagesPermissions"]),
    ...mapGetters("auth", ["isAuthenticated"]),

    gameImages() {
      return this.game.gallery?.filter((el) => el.mimetype.startsWith("image/"))
    },
    gameVideos() {
      return (
        this.game.gallery
          ?.filter((el) => el.mimetype.startsWith("video/"))
          .map((el) => ({
            src: `${this.API_BASE}/${el.src}`,
            type: el.mimetype,
          })) || []
      )
    },
    gameFormattedRelease() {
      const formatter = Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
      if (!this.game.releaseDate) return null
      return formatter.format(new Date(this.game.releaseDate))
    },
    gameKeyArt() {
      if (this.game.mainImgSrc) {
        return this.API_BASE + "/" + this.game.mainImgSrc
      } else return "/backgrounds/ghost-of-tsushima-key-art.jpg"
    },
  },
  methods: {
    ...mapActions("game", [
      "fetchGameById",
      "updateCurrentGame",
      "deleteGameById",
    ]),
    ...mapActions("cart", ["addGameToCart"]),
    onDelete() {
      this.$refs.deleteDialog.isActive = true
    },

    async deleteCallback() {
      try {
        await this.deleteGameById(this.game._id)
        this.$router.push({ name: "Home" })
      } catch (error) {}
    },
    async onAddToCart() {
      try {
        if (!this.isAuthenticated) {
          this.$router.push({ name: "Login" })
        } else {
          await this.addGameToCart({
            gameId: this.game._id,
          })
        }
      } catch (error) {}
    },
  },
  async beforeMount() {
    try {
      this.game = await this.fetchGameById(this.$route.params.id)
      this.updateCurrentGame(this.game)
      document.title = this.game.name
    } catch (error) {}
  },
}
</script>

<style lang="css" scoped>
.main-container {
  position: relative;
  width: 80%;
}
.trapezoid {
  position: relative;
}
.trapezoid::after {
  content: "";
  position: absolute;
  left: 0;
  top: -11rem;
  width: 100%;
  height: 11rem;
  background-color: inherit;
  clip-path: polygon(0 20%, 100% 90%, 100% 100%, 0 100%);
  z-index: 2;
}
.panel-container {
  position: absolute;
  top: -20rem;
  z-index: 3;
  width: 100%;
}
.main-img {
  width: 100%;
  /* height: 100%; */
  aspect-ratio: 16/9;
  object-fit: fill;
  border-radius: 25px;
}
.main-info-card {
  border-radius: 25px;
  background: transparent;
  backdrop-filter: blur(50px);
  color: white;
}
.game-name {
  text-align: center;
  font-size: 2rem;
}
.price-container {
  font-size: 1.5rem;
  align-items: center;
  span.old-price {
    text-decoration: line-through;
    color: #626262;
  }
  span.sale {
    font-weight: 400;
    color: rgb(255, 106, 0);
  }
  span.new-price {
    font-size: 3rem;
  }
}
.description-container {
  margin-top: 8rem;
}
.game-description {
  margin-top: 2rem;
  color: var(--main-text-color);
}
.game-data-container {
  font-size: 1.2rem;
  margin-left: 4rem;
  a,
  a:visited {
    color: var(--main-text-color);
    text-decoration: none;
    transition: color 0.1s ease;
  }
  a:hover {
    color: rgb(255, 106, 0);
  }
}
.gallery-container {
  margin-top: 4rem;
  img {
    width: 100%;
  }
}
.gallery-wrapper {
  margin-top: 2rem;
}
</style>
