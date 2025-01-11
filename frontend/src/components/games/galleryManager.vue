<template>
  <v-container>
    <h4 class="text-h4">Instructions:</h4>
    <p class="text-h6 my-5">
      1. If you want to delete media, just select them using checkbox.
      <br />2. If you want to add some new media, then add them to the file
      input below.
    </p>
    <v-row>
      <v-col
        cols="12"
        md="6"
        lg="4"
        xl="4"
        v-for="image in gameImages"
        :key="image._id"
      >
        <div class="image-container">
          <v-checkbox
            class="media-selector"
            :value="image._id"
            v-model="mediaToDelete"
          ></v-checkbox>
          <v-img
            :class="['image', { selected: mediaToDelete.includes(image._id) }]"
            :src="`${API_BASE}/${image.src}`"
          ></v-img>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="4"
        xl="4"
        v-for="video in gameVideos"
        :key="video._id"
      >
        <div class="video-container">
          <v-checkbox
            class="media-selector"
            :value="video._id"
            v-model="mediaToDelete"
          ></v-checkbox>
          <VideoPlayer
            :class="['video', { selected: mediaToDelete.includes(video._id) }]"
            :options="{
              controls: true,
              aspectRatio: '16:9',
              sources: [videoObj(video)],
            }"
          />
        </div>
      </v-col>
    </v-row>
    <h5 class="text-h5 my-10">Drop Zone:</h5>
    <v-row justify="center">
      <v-col>
        <v-file-upload
          theme="dark"
          accept="image/*, video/*"
          clearable
          density="default"
          v-model="mediaToAdd"
          multiple
        ></v-file-upload>
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-col>
        <v-btn block size="large" @click="onBack">Back</v-btn>
      </v-col>
      <v-col>
        <v-btn block size="large" @click="onSave">Save changes</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import config from "../../../config/default"
import VideoPlayer from "../VideoPlayer.vue"
import { mapActions } from "vuex"
export default {
  name: "GalleryManager",
  components: {
    VideoPlayer,
  },
  props: {
    gallery: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      API_BASE: config.API_BASE,
      mediaToDelete: [],
      mediaToAdd: [],
    }
  },
  computed: {
    gameImages() {
      return this.gallery.filter((media) => media.mimetype.startsWith("image/"))
    },
    gameVideos() {
      return this.gallery.filter((media) => media.mimetype.startsWith("video/"))
    },
  },
  methods: {
    ...mapActions("game", ["updateGallery"]),
    videoObj(obj) {
      return { src: `${this.API_BASE}/${obj.src}`, type: obj.mimetype }
    },
    async onSave() {
      try {
        await this.updateGallery({
          mediaToDelete: this.mediaToDelete,
          mediaToAdd: [...this.mediaToAdd],
          gameId: this.$route.params.id,
        })

        this.$router.push({ name: "SpecificGame", id: this.$route.params.id })
      } catch (error) {
        console.log(error)
      }
    },
    onBack() {
      this.$router.push({
        name: "SpecificGame",
        params: { id: this.$route.params.id },
      })
    },
  },
}
</script>

<style lang="css" scoped>
.image-container,
.video-container {
  position: relative;
}
.media-selector {
  position: absolute;
  z-index: 2;
  font-size: 1.4rem;
  top: 5px;
  right: 5px;
}
.selected {
  filter: brightness(50%);
}
.image,
.video {
  transition: filter ease 0.2s;
}
</style>
