<template>
  <v-app id="">
    <v-content>
      <v-container class="fill-height d-block" fluid>
        <v-row justify="center">
          <v-img
            class="d-block"
            :aspect-ratio="1"
            max-width="40"
            :src="require('~/assets/logo.svg')"
          ></v-img>
          <h2 class="ml-2 teal--text">3bar</h2>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="4">
            <Registration />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Registration from "@/components/enduser/Registration";
export default {
  layout: "home",
  components: {
    Registration
  },
  data() {
    return {
      e6: 1
    };
  },
  methods: {

  },
  mounted() {
    // this.$vuetify.rtl = true;
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  }
};
</script>

<style lang="scss"></style>
