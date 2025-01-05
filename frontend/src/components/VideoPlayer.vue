<template>
  <div>
    <div>
      <video ref="videoPlayer" class="video-js"></video>
    </div>
  </div>
</template>

<script>
import videojs from "video.js"

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      player: null,
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {})
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  },
}
</script>

<style lang="css" scoped></style>
