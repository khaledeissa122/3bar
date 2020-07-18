import Vue from 'vue'
import Loader from "@/components/partials/_loader";
import UploadButton from 'vuetify-upload-button';
// import VueGeolocationApi from 'vue-geolocation-api'
// import VueAudio from 'vue-audio';
// import AudioRecorder from 'vue-audio-recorder'
// import VueRecord from '@codekraft-studio/vue-record'
// import AudioVisual from 'vue-audio-visual'
// Vue.use(AudioRecorder)
// Vue.use(AudioVisual)
//  Vue.use(VueGeolocationApi)
const components = { Loader,UploadButton }
// Vue.use(VueRecord)
Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})

// window.addEventListener('scroll', this.handleScroll, true);

// handleScroll = (e) => {
//   if (e.target.classList.contains("on-scrollbar") === false) {
//       e.target.classList.add("on-scrollbar");
//   }
// }
