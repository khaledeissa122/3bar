<template>
  <v-app id="inspire">
    <v-content>
      <v-container  class="fill-height d-block" fluid>
        <v-row  justify="center" class="mb-10">
          <v-img
            class="d-block"
            :aspect-ratio="1"
            max-width="40"
            :src="require('~/assets/logo.svg')"
          ></v-img>
          <h2 class="ml-2 teal--text">3bar</h2>
        </v-row>
        <v-row  justify="center">
          <v-col cols="12" sm="8" md="4">
            <Login />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Login from "@/components/enduser/Login";
export default {
  layout: "home",

  components: {
    Login
  },
  props: {
    source: String
  },
  data() {
    return {
      rtl: true
    };
  },
  methods: {
    changeRTL() {
      this.$vuetify.rtl = true;
      this.$vuetify.lang.current = "ar";
    }
  }
};
</script>

<style lang="scss"></style>
