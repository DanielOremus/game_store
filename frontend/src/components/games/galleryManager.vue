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
            :value="image"
            v-model="mediaToDelete"
          ></v-checkbox>
          <v-img
            :class="[
              'image',
              { selected: selectedMediaIds.includes(image._id) },
            ]"
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
            :value="video"
            v-model="mediaToDelete"
          ></v-checkbox>
          <VideoPlayer
            :class="[
              'video',
              { selected: selectedMediaIds.includes(video._id) },
            ]"
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
        ></v-file-upload>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import config from "../../../config/default"
import VideoPlayer from "../VideoPlayer.vue"
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
    selectedMediaIds() {
      return this.mediaToDelete.map((el) => el._id)
    },
  },
  methods: {
    videoObj(obj) {
      return { src: `${this.API_BASE}/${obj.src}`, type: obj.mimetype }
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
