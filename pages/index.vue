<template>
  <v-app id="inspire">
    <v-content>
      <v-overlay :absolute="false" :opacity="0.5" :value="true" :z-index="0">
      </v-overlay>
      <Videobg :sources="['vidbg.mp4']" img="vidbgimg.png">
        <v-container class="fill-height visible" fluid>
          <v-row justify="center" align="center" class="pa-0 ma-0 ">
            <v-col cols="12" sm="8" md="4" align="center">
              <div
                class="flex-row d-md-flex d-sm-inline-flex"
                justify="center"
                align="center"
              >
                <v-img
                  contain
                  class="d-flex"
                  :aspect-ratio="1"
                  max-width="40"
                  transition="scale-transition"
                  :src="require('~/assets/logo.svg')"
                ></v-img>
                <h2
                  class="flex-row d-md-flex d-sm-inline-flex ml-2 primary--text"
                >
                  3bar
                </h2>
              </div>
            </v-col>
            <v-col cols="12" sm="8" md="3" class="justify-space-between">
              <v-btn
                class=" mb-4"
                dark
                color="primary"
                to="/registration"
                nuxt
                rounded
                block
                >Sign up</v-btn
              >
              <v-btn
                class=""
                rounded
                outlined
                color="secondary"
                to="/login"
                nuxt
                block
                >Login</v-btn
              >
            </v-col>
          </v-row>
          <!--   -->
        </v-container>
      </Videobg>
    </v-content>
    <Loader :loading="loading"></Loader>
  </v-app>
</template>

<script>
import Videobg from "@/components/partials/_videobg";
export default {
  layout: "home",
  components: {
    Videobg
  },
  data() {
    return {
      loading: true,
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-information" }
      ]
    };
  },
  mounted() {
    this.loading = false;
    // if(this.$store.state.enduser.user){
    //   this.$router.push("/home")
    // }else{
    //   this.$router.push("/")
    // }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.v-btn__content {
  line-height: 2.3;
}

.back {
  background-image: url("~assets/wave.svg");
  background-size: cover;
}
#inspire {
  background: none;
}
.visible {
  background: transparent;
}
</style>
