<template>
  <v-overlay :value="loading" :absolute="absolute">
    <v-progress-circular  indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name:"Loader",
  props:{
    loading: {
      type: Boolean,
      required:true,
      default:false
    },
    absolute:{
      type: Boolean,
      default:false
    }
  },
     watch: {
      loading (val) {
        val && setTimeout(() => {
          this.loading = false
        }, 3000)
      },
    },
};
</script>
