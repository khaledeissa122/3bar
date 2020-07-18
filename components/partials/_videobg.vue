<template>
  <section class="VideoBg" >
    <video autoplay loop muted ref="video" @play="vidloaded" poster="http://www.w3schools.com/images/w3html5.gif">
      <source
        v-for="(source, index) in sources"
        :key="index"
        :src="require(`~/assets/${source}`)"
        :type="getMediaType(source)"

      />
    </video>
    <div class="VideoBg__content" >
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "Videobg",
  props: {
    sources: {
      type: Array,
      required: true
    },
    img: {
      type: String
    }
  },

  data() {
    return {
      videoRatio: null,
    };
  },

  mounted() {
    // this.setImageUrl();
    this.setContainerHeight();

    if (this.videoCanPlay()) {
      this.$refs.video.oncanplay = () => {
        if (!this.$refs.video) return;

        this.videoRatio =
          this.$refs.video.videoWidth / this.$refs.video.videoHeight;
        this.setVideoSize();
        this.$refs.video.style.visibility = "visible";
      };
    }

    window.addEventListener("resize", this.resize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },

  methods: {
    vidloaded() {
      // console.log(this.$el)
    },
    resize() {
      this.setContainerHeight();

      if (this.videoCanPlay()) {
        this.setVideoSize();
      }
    },

    videoCanPlay() {
      return !!this.$refs.video.canPlayType;
    },

    setImageUrl() {
      if (this.img) {
        this.$el.style.backgroundImage = `url('http://www.w3schools.com/images/w3html5.gif)`;
      }
    },

    setContainerHeight() {
      this.$el.style.height = `${window.innerHeight}px`;
    },

    setVideoSize() {
      var width,
        height,
        containerRatio = this.$el.offsetWidth / this.$el.offsetHeight;

      if (containerRatio > this.videoRatio) {
        width = this.$el.offsetWidth;
      } else {
        height = this.$el.offsetHeight;
      }

      this.$refs.video.style.width = width ? `${width}px` : "auto";
      this.$refs.video.style.height = height ? `${height}px` : "auto";
    },

    getMediaType(src) {


      return "video/" + src.split(".").pop();
    }
  }

};
</script>

<style>
.VideoBg {
  position: relative;
  background-size: cover;
  background-position: center;
  z-index: 1;
  overflow: hidden;
}

.VideoBg video {
  position: absolute;
  top: 50%;
  left: 50%;
  visibility: hidden;
  opacity: 0.4;
  transform: translate(-50%, -50%);
}

.VideoBg__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}
</style>
