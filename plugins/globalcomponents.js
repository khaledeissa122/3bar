import Vue from 'vue'
import Loader from "@/components/partials/_Loader";
import UploadButton from 'vuetify-upload-button';

const components = { Loader,UploadButton }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
});
