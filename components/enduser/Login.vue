<template>
  <v-card class="elevation-2">
    <v-toolbar flat>
      <v-toolbar-title class="teal--text">Login form</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-img
        :aspect-ratio="1"
        max-width="40"
        :src="require('~/assets/logo.svg')"
      ></v-img>
    </v-toolbar>
    <v-divider></v-divider>
    <div v-if="error" class="ma-3">
      <v-alert dense outlined type="error">
        {{ error }}
      </v-alert>
    </div>
    <div class="ml-4 mr-4 mt-2">
      Don’t have an account yet?
      <NuxtLink to="/registration"> Sign up </NuxtLink>
    </div>
    <v-form v-model="valid" @submit.prevent="login" @submit.enter="login">
      <v-card-text class="pb-0">
        <v-text-field
          label="Email"
          name="email"
          type="email"
          outlined
          append-icon="person"
          :counter="30"
          :rules="emailRules"
          required
          dense
          v-model="account.email"
          rounded
          class="mb-5"
          placeholder="Your email"
        />

        <v-text-field
          id="password"
          label="Password"
          name="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          v-model="account.password"
          :rules="passwordRules"
          @click:append="show = !show"
          required
          dense
          outlined
          rounded
          placeholder="Your password"
        />
      </v-card-text>
      <v-toolbar flat>
        <!-- <v-checkbox
        class="ml-4"
        v-model="remember"
        label="Remember me"
        :error="false"
        dense
        hide-details
      ></v-checkbox>
      <v-spacer /> -->
        <a href="#">Forget Password ? </a>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-actions class="pa-5">
        <v-spacer />
        <v-btn
          width="100%"
          outlined
          rounded
          color="teal"
          @click="login"
          type="submit"
          :disabled="!valid"
          @keyup.enter="login"
          >Login</v-btn
        >
      </v-card-actions>
    </v-form>
    <!-- <v-card-actions class="pa-5 pt-2">
      <v-tollbar class="pr-3">Login with</v-tollbar>
      <v-btn class="mx-2" fab dark small @click="googleLogin" color="google">
        <v-icon dark>mdi-google</v-icon>
      </v-btn>
      <v-btn class="mx-2" fab dark small @click="fbLogin" color="facebook">
        <v-icon dark>mdi-facebook</v-icon>
      </v-btn>
      <v-btn class="mx-2" fab dark small color="twitter">
        <v-icon dark>mdi-twitter</v-icon>
      </v-btn>
    </v-card-actions> -->

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  // props: {
  //   source: String,
  //   remember: String
  // },
  data() {
    return {
      remember: false,
      valid: false,
      isError: false,
      errorMsg: "",
      account: {
        email: "",
        password: ""
      },
      rtl: true,
      show: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],

      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be 6 characters"
      ]
    };
  },
  computed: {
    ...mapState("partials", ["loading", "error"])
  },
  // watch:{
  //   error(val){
  //     if(val){
  //       this.isError = true
  //     }else{
  //       this.isError = false
  //     }
  //   }
  // },
  methods: {
    removeError() {
      this.$store.commit("partials/setError", null);
    },
    // changeRTL() {
    //   this.$vuetify.rtl = true;
    //   this.$vuetify.lang.current = "ar";
    // },
    login(e) {
      e.preventDefault();
      // TODO: add parsing of data.
      this.$store.dispatch("enduser/login", this.account);
    }
    // googleLogin() {
    //   this.$store.dispatch("enduser/googleLogin");
    // },
    // fbLogin() {
    //   this.$store.dispatch("enduser/fbLogin");
    // }
  }
};
</script>

<style lang="scss"></style>
