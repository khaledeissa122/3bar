<template>
  <v-stepper v-model="e6" vertical>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-stepper-step
      :editable="editable"
      :complete="e6 > 1"
      color="teal"
      step="1"
    >
      Write your name and email
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card class="elevation-0 mb-2">
        <v-toolbar flat>
          <v-toolbar-title class="teal--text"
            >Registration form</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-img
            :aspect-ratio="1"
            max-width="40"
            :src="require('~/assets/logo.svg')"
          ></v-img>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="ml-4 mr-4 mt-2">
          Do you have an account ?
          <NuxtLink to="/login"> Login </NuxtLink>
        </div>
        <v-card-text class="pb-0">
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-lowercase
              label="Username"
              name="Username"
              @input="checkUsername()"
              type="text"
              :success="success"
              :success-messages="successMsg"
              :error="isUsernameError"
              :error-messages="usernameErrorMsg"
              :counter="30"
              :rules="usernameRules"
              required
              @keydown.space.prevent
              outlined
              rounded
              dense
              v-model="account.username"
              class="mb-5"
              placeholder="username"
            />
            <v-text-field
              label="Name"
              name="Name"
              type="text"
              append-icon="person"
              :counter="30"
              :rules="nameRules"
              required
              outlined
              rounded
              dense
              v-model="account.name"
              class="mb-5"
              placeholder="Name"
            />

            <v-text-field
              id="Email"
              label="Email"
              name="email"
              type="email"
              append-icon="mdi-at"
              v-model="account.email"
              :rules="emailRules"
              required
              dense
              outlined
              rounded
              placeholder="Email"
            />

            <v-select
              id="gender"
              label="Gender"
              name="gender"
              type="gender"
              :items="gender"
              v-model="account.gender"
              required
              :rules="genderRules"
              dense
              outlined
              rounded
            ></v-select>
          </v-form>
        </v-card-text>
      </v-card>
      <v-btn
        color="teal"
        outlined
        rounded
        @click="
          e6 = 2;
          geoip();
        "
        >Continue</v-btn
      >
    </v-stepper-content>

    <v-stepper-step
      :editable="editable"
      :complete="e6 > 2"
      step="2"
      color="teal"
      >Configure your password</v-stepper-step
    >
    <v-stepper-content step="2">
      <v-card class="elevation-0 mb-2">
        <v-card-text class="pb-0">
          <v-form ref="form" v-model="passValid">
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
              placeholder="Password"
            />
          </v-form>
        </v-card-text>
      </v-card>
      <v-btn color="teal" :editable="editable" outlined rounded @click="e6 = 3"
        >Continue</v-btn
      >
    </v-stepper-content>

    <v-stepper-step
      :editable="editable"
      :complete="e6 > 3"
      step="3"
      color="teal"
      >Select your birthday date</v-stepper-step
    >
    <v-stepper-content step="3">
      <v-card class="elevation-0 mb-2">
        <v-card-text>
          <v-form ref="form" v-model="birthdayValid">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="account.date"
                  label="Birthday date"
                  append-icon="event"
                  :rules="birthdayRules"
                  required
                  dense
                  outlined
                  hide-details
                  rounded
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                color="teal"
                v-model="account.date"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-form>
        </v-card-text>
      </v-card>
      <v-expand-transition>
        <v-btn
          v-if="birthdayValid && passValid && valid"
          type="submit"
          color="teal"
          @click="
            e6 = 3;
            signUp();
          "
          outlined
          rounded
          >Submit</v-btn
        >
      </v-expand-transition>
      <v-snackbar color="error" v-model="isError" :timeout="5000">
        {{ errorMsg }}
        <v-btn color="white" text @click="isError = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-stepper-content>
    <!-- <v-card-actions class="pa-5 pt-2">
      <v-tollbar class="pr-3">Sign up with</v-tollbar>
      <v-btn class="mx-2" fab dark small color="google">
        <v-icon dark>mdi-google</v-icon>
      </v-btn>
      <v-btn class="mx-2" fab dark small color="facebook">
        <v-icon dark>mdi-facebook</v-icon>
      </v-btn>
      <v-btn class="mx-2" fab dark small color="twitter">
        <v-icon dark>mdi-twitter</v-icon>
      </v-btn>
    </v-card-actions> -->
  </v-stepper>
</template>

<script>
import { getCollectionwithid } from "@/services/firestore/methods.js";
import { mapState } from "vuex";
// import VueGeolocationApi from 'vue-geolocation-api'
export default {
  name: "Registration",
  data() {
    return {
      account: {
        username: "",
        email: "",
        password: "",
        name: "",
        gender: "",
        date: null,
        location: null
      },
      gender: ["Male", "Female"],
      show: false,
      e6: 1,
      editable: true,
      menu: false,
      valid: false,
      passValid: false,
      birthdayValid: false,
      isError: false,
      errorMsg: "",
      successMsg: "",
      success: false,
      usernameErrorMsg: "",
      isUsernameError: false,
      name: "",
      usernameRules: [
        v => !!v || "username is required",
        v => v.length <= 30 || "Name must be less than 30 characters"
      ],
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 30 || "Name must be less than 30 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      genderRules: [v => !!v || "Gender is required"],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Password must be less than 6 characters"
      ],
      birthdayRules: [v => !!v || "Birthday date is required"]
    };
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
    // valid(val){
    //   if(val == true && this.passValid == true && this.birthdayValid == true){
    //     console.log("value ")
    //   }
    // }
  },
  computed: {
    ...mapState("partials", ["loading", "error"])
  },
  directives: {
    lowercase: {
      bind(el, _, vnode) {
        el.addEventListener("keyup", e => {
          e.target.value = e.target.value.toLowerCase();
          vnode.componentInstance.$emit("input", e.target.value.toLowerCase());
        });
      }
    }
  },
  methods: {
    geoip() {
      fetch("https://extreme-ip-lookup.com/json/")
        .then(res => res.json())
        .then(response => {
          this.account.location = {
            country: response.country,
            city: response.city,
            continent: response.continent,
            countryCode: response.countryCode,
            ipName: response.ipName,
            ipType: response.ipType,
            isp: response.isp,
            lat: response.lat,
            lon: response.lon,
            org: response.org,
            query: response.query,
            region: response.region,
            status: response.status
          };
          console.log("Country: ", this.account.location);
        })
        .catch((data, status) => {
          this.$store.commit("partials/setError", "Error in address please try again");
        });
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    Upper(e) {
      e.target.value = e.target.value.toUpperCase();
    },
    signUp() {
      // TODO: add parsing of data.
      // console.log(this.account);
      if (this.errorMsg == "") {
        this.$store
          .dispatch("enduser/signUp", this.account)
          .then(() => {
            console.log("success sign up man");
          })
          .catch(error => {
            this.isError = true;
            this.errorMsg = "Error please try again";
            setTimeout(() => {
              this.isError = false;
            }, 5000);
          });
      }
    },
    checkUsername() {
      let users = getCollectionwithid("users");
      let username = users
        .where("username", "==", String(this.account.username))
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            this.success = true;
            this.isUsernameError = false;
            this.successMsg = "this username is Available";
            this.usernameErrorMsg = "";
            console.log("this username is Available");
          } else {
            this.isUsernameError = true;
            this.success = false;
            this.usernameErrorMsg = "this username in not Available";
            console.log("this username is  not Available");
          }
        })
        .catch(err => {
          this.isError = true;
          this.errorMsg = error.message;
        });
    }
  },
  created() {
    this.geoip();
  }
};
</script>

<style lang="scss"></style>
