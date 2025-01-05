<template>
  <Header class="header" />
  <div class="image-container">
    <img :src="keyArtSrc" class="image" ref="imageElement" />
    <div class="image-caption-container">
      <h3 class="text-h3">
        {{ imageCaptionTitle }}
      </h3>
      <p class="mt-6">
        {{ imageCaptionBody }}
      </p>
    </div>
  </div>
  <slot></slot>
</template>

<script>
import Header from "@/components/sections/Header.vue"

export default {
  name: "KeyArtMasterPage",
  components: {
    Header,
  },
  props: {
    imageCaptionTitle: {
      type: String,
      default: "",
    },
    imageCaptionBody: {
      type: String,
      default: "",
    },
    keyArtSrc: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="css" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
}
.image {
  z-index: -1;
  width: 100%;
  object-fit: cover;
  filter: saturate(110%) brightness(90%);
}
.image-container {
  position: relative;
  margin-top: -25%;
  white-space: pre-line;
}
.image-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0) 100%
  ); */
  z-index: 1;
}
.image-caption-container {
  position: absolute;
  top: 55%;
  left: 10%;
  z-index: 3;
  color: white;
  h3 {
    z-index: 3;
    line-height: 1.4em;
    font-weight: 600;
    color: #c8e1ff;
    animation: glowing 3s infinite;
  }
  p {
    z-index: 3;
    font-size: 1.25rem;
    color: #aad0ff;
    text-shadow: 0 0 2px black, 0 0 4px black, 0 0 6px black;
    line-height: 1.5em;
  }
}

@keyframes glowing {
  0% {
    text-shadow: 0 0 5px #67abff, 0 0 10px #67abff;
  }

  50% {
    text-shadow: 0 0 10px #67abff, 0 0 20px #67abff, 0 0 30px #67abff;
  }
  100% {
    text-shadow: 0 0 5px #67abff, 0 0 10px #67abff;
  }
}
</style>
