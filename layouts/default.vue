<template>
  <!-- id="sandbox" -->
  <v-app :style="`background: ${$vuetify.theme.themes[themeMode].background}`">
    <v-content>
      <v-container fluid>
        <v-row no-gutters justify="center" style=" z-index: 9999">
          <v-expand-transition>
            <v-col
              cols="12"
              md="3"
              sm="4"
              v-show="drawer"
              :class="`pa-2 ${$vuetify.breakpoint.mdAndUp ? '' : 'fix'}`"
              v-if="user"
            >
              <v-overlay :value="drawer" class="overlayFix"> </v-overlay>

              <v-card tile rounded>
                <!-- <v-navigation-drawer
                class="ma-0"
                width="100%"
                v-model="drawer"
                permanent
                :app="$vuetify.breakpoint.mdAndDown"
                clipped
                floating
              > -->
                <v-list rounded>
                  <v-list-item-group
                    :color="$vuetify.theme.themes[themeMode].primary"
                  >
                    <v-row>
                      <v-col cols="9">
                        <v-list-item
                          @click="
                            $vuetify.breakpoint.mdAndDown
                              ? (drawer = false)
                              : ''
                          "
                          one-line
                          nuxt
                          :to="{
                            name: 'home'
                          }"
                          class="center"
                        >
                          <img
                            contain
                            :aspect-ratio="1"
                            class="pr-1 pl-1"
                            max-width="40"
                            width="40"
                            height="40"
                            max-height="40"
                            transition="scale-transition"
                            :src="require('~/assets/logo.svg')"
                          />

                          <v-list-item-content>
                            <v-list-item-title>3bar</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col
                        cols="3"
                        v-if="drawer && $vuetify.breakpoint.mdAndDown"
                      >
                        <v-btn icon @click="drawer = false" class="mt-2">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row no-gutters="" justify="start">
                      <!-- <v-col lg="12" xs="12">
                        <div v-if="selectedUsers.length >= 1">
                          <v-chip
                            v-for="(value, i) in selectedUsers"
                            :key="i"
                            close
                            @click:close="removeUser(i)"
                            class="ma-2"
                            color="indigo"
                            text-color="white"
                          >
                            <v-avatar left>
                              <v-img :src="value.avatarUrl"></v-img>
                            </v-avatar>
                            {{ value.name }}
                          </v-chip>
                        </div>
                      </v-col> -->
                      <!-- <v-row> -->
                      <!-- @change="selectUser" -->
                      <!-- @update:search-input="search" -->
                      <v-col lg="12" sm="12" xs="12">
                        <v-autocomplete
                          v-model="values"
                          :items="searshedUsers"
                          :search-input.sync="search"
                          @change="selectUser"
                          outlined
                          hide-no-data
                          hide-selected
                          item-text="name"
                          item-value="disName"
                          placeholder="Search"
                          multiple
                          full-width
                          return-object
                        >
                        </v-autocomplete>
                      </v-col>
                      <!-- </v-row> -->
                    </v-row>
                    <v-row>
                      <v-col cols="9">
                        <v-list-item
                          link
                          nuxt
                          @click="
                            $vuetify.breakpoint.mdAndDown
                              ? (drawer = false)
                              : ''
                          "
                          :to="{
                            name: 'users-profile',
                            params: { profile: user.username }
                          }"
                        >
                          <v-list-item-avatar>
                            <v-img
                              v-if="authUserData"
                              :src="authUserData.avatarUrl"
                            />
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title>
                              {{
                                authUserData ? authUserData.name : ""
                              }}</v-list-item-title
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="3">
                        <v-menu min-width="200px">
                          <template v-slot:activator="{ on }">
                            <v-btn icon class="mt-3">
                              <v-icon dark v-on="on" color="grey lighten-1"
                                >mdi-chevron-down</v-icon
                              >
                            </v-btn>
                          </template>
                          <v-list>
                            <div v-for="(item, index) in links" :key="index">
                              <v-list-item
                                :to="item.link"
                                nuxt
                                link
                                @click="
                                  !item.switch ? (isLogoutOpen = true) : ''
                                "
                              >
                                <v-list-item-icon v-if="!item.switch">
                                  <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-switch
                                  v-if="item.switch"
                                  v-model="darkMode"
                                ></v-switch>
                                <v-list-item-title>
                                  <!-- <v-btn flat text > -->
                                  {{ item.title }}
                                  <!-- </v-btn> -->
                                </v-list-item-title>
                              </v-list-item>
                            </div>
                          </v-list>
                        </v-menu>
                      </v-col>
                    </v-row>
                    <!-- :nuxt="item.title == 'New message' ? false : true" -->
                    <v-list-item
                      v-for="item in items"
                      :key="item.title"
                      :to="item.link ? item.link : ''"
                      :inactive="item.link ? false : true"
                      style="cursor: pointer"
                      @click="
                        item.title == 'New message' ? (openExpress = true) : '';
                        $vuetify.breakpoint.mdAndDown ? (drawer = false) : '';
                      "
                      nuxt
                    >
                      <v-list-item-icon>
                        <v-icon v-if="item.title != 'Notifications'">{{
                          item.icon
                        }}</v-icon>
                        <v-badge
                          v-if="item.title == 'Notifications'"
                          :content="1"
                          :value="1"
                          color="accent"
                          overlap
                        >
                          <v-icon>{{ item.icon }}</v-icon>
                        </v-badge>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item-content>
                      <client-only>
                        <v-menu min-width="200px" v-if="item.title == 'More'">
                          <template v-slot:activator="{ on }">
                            <v-btn icon>
                              <v-icon dark v-on="on" color="grey lighten-1"
                                >mdi-chevron-down</v-icon
                              >
                            </v-btn>
                          </template>
                          <v-list>
                            <div v-for="(item, index) in mores" :key="index">
                              <v-list-item :to="item.link">
                                <v-list-item-icon
                                  v-if="item.title != 'Dark mode'"
                                >
                                  <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-switch
                                  v-if="item.title == 'Dark mode'"
                                  v-model="darkMode"
                                ></v-switch>
                                <v-list-item-title>{{
                                  item.title
                                }}</v-list-item-title>
                              </v-list-item>
                            </div>
                          </v-list>
                        </v-menu>
                      </client-only>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
                <!-- </v-navigation-drawer> -->
              </v-card>
            </v-col>
          </v-expand-transition>
          <v-col
            cols="12"
            :md="$vuetify.breakpoint.mdAndDown ? '12' : '6'"
            :sm="$vuetify.breakpoint.mdAndDown ? '12' : '4'"
            class="pa-2"
          >
            <nuxt />
          </v-col>
          <v-expand-transition>
            <v-col
              cols="12"
              md="3"
              sm="4"
              :class="`pa-2 ${$vuetify.breakpoint.mdAndUp ? '' : 'fix'}`"
              v-show="chrusherNav"
            >
              <v-overlay
                :value="$vuetify.breakpoint.mdAndUp ? false : chrusherNav"
                class="overlayFix"
              >
              </v-overlay>
              <v-card rounded>
                <v-row>
                  <v-col cols="9">
                    <v-subheader>People you may know</v-subheader>
                  </v-col>

                  <v-col
                    cols="3"
                    v-if="chrusherNav && $vuetify.breakpoint.mdAndDown"
                  >
                    <v-btn icon @click="chrusherNav = false" class="mt-2">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <div v-for="(user, index) in users" :key="index">
                  <Followers :userMayKnow="user" />
                </div>
                <v-divider></v-divider>
                <v-subheader>Crushs</v-subheader>
                <div v-if="crushers.length != 0">
                  <div v-for="(crush, index) in crushers" :key="'u' + index">
                    <Crushs :crusher="crush" />
                  </div>
                </div>
                <v-row v-else class="pa-4" align="center" justify="center">
                  <v-col class="text-center">
                    <h3 class="subtitle-2">You don't have any chrushers</h3>
                  </v-col>
                </v-row>
              </v-card>
              <!-- <v-banner sticky class="mt-6">
              <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
            </v-banner> -->
            </v-col>
          </v-expand-transition>
        </v-row>
      </v-container>
      <v-dialog v-model="isLogoutOpen" width="500">
        <v-card>
          <v-card-title class="headline">Do you want logout ?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="logout">
              Yes
            </v-btn>

            <v-btn color="green darken-1" text @click="isLogoutOpen = false">
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <NewExpress @close="closeDialog" :openExpress="openExpress" />
      <Snackbar></Snackbar>
      <v-bottom-navigation
        grow
        :class="$vuetify.breakpoint.mdAndUp ? 'hide' : ''"
        app
      >
        <v-btn @click="drawer = true">
          <span>Menu</span>
          <v-icon>mdi-dots-horizontal-circle</v-icon>
        </v-btn>
        <v-btn
          nuxt
          :to="{
            name: 'home'
          }"
        >
          <span>Home</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn @click="chrusherNav = true">
          <span>Chrushers</span>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-content>
  </v-app>
</template>
<script>
import { ColorMixin } from "../mixins/ColorMixin.js";
import NewExpress from "@/components/enduser/express/NewExpress";
import Followers from "@/components/enduser/followers/Followers";
import Crushs from "@/components/enduser/crushs/Crushs";
import Post from "@/components/enduser/express/Post";
import Report from "@/components/enduser/reports/Report";
import { auth } from "@/services/firebase";
import Cookie from "js-cookie";
import { mapActions, mapState } from "vuex";
import Snackbar from "~/components/partials/Snackbar.vue";
import { db } from "@/services/firebase.js";
export default {
  mixins: [ColorMixin],
  components: {
    NewExpress,
    Post,
    Followers,
    Report,
    Crushs,
    Snackbar
  },

  data: () => ({
    values: null,
    selectedUsers: [],
    value: null,
    usersAllData: [],
    name: [],
    isLogoutOpen: false,
    openImage: false,
    like: false,
    anonymous: true,
    dialog: false,
    openExpress: false,
    openReport: false,
    file1: "",
    audioSources: ["assets/fallback.mp3"],
    imagePreview: null,
    progress: 0,
    expressText: null,
    darkMode: Boolean,
    messages: 0,
    show: false,
    crushers: [],
    users: null,
    items: [
      { title: "Messages", icon: "mdi-message-text-outline", link: "/message" },
      {
        title: "New message",
        icon: "mdi-message-plus-outline",
        link: ""
      }
    ],
    links: [
      { switch: true, title: "Dark mode", icon: "mdi-message-text-outline" },
      { title: "Logout", icon: "mdi-logout" }
    ],
    mores: [{ title: "Settings", icon: "mdi-account-cog-outline" }],
    right: null,
    drawer: false,
    chrusherNav: false,
    footer: {
      inset: false
    },
    search: ""
  }),
  computed: {
    ...mapState("partials", ["loading"]),
    ...mapState("enduser", ["authUserData", "user"]),
    // getCrushers: function() {
    //   let chrushers = [];
    searshedUsers() {
      return this.usersAllData.map(entry => {
        return Object.assign({}, entry);
      });
    },
    // }
    // drawer: function (){
    //   if($vuetify.breakpoint.mdAndUp){
    //     return true;
    //   }
    //   return false;
    // },
    SpecificUser: async function() {
      return await this.getSpecificUser({
        username: this.selectedUser
      });
    },
    isIncreasing: function() {
      var prev, cur;
      for (var i = 0; i < this.crushers.length; i++) {
        cur = this.crushers[i];
        if (i && cur !== prev && cur !== prev + 1) return false;
        prev = cur;
      }
      return true;
    }
  },

  methods: {
    ...mapActions("enduser/express", ["getUserBySearch"]),
    async logout() {
      await auth.signOut();
      await Cookie.remove("access_token");
      await Cookie.remove("username");
      location.href = "/";
    },
    selectUser() {
      if (this.values) {
        this.$router.push({
          name: "users-profile",
          params: { profile: this.values[0].disName }
        });
        if(this.$vuetify.breakpoint.mdAndDown){
          this.drawer = false;
        }
      }
    },
    checkBreak() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.drawer = true;
        this.chrusherNav = true;
      } else {
        this.drawer = false;
        this.chrusherNav = false;
      }
    },
    closeNavigathion() {
      this.drawer = false;
    },
    closeDialog() {
      this.openExpress = false;
    },
    ad() {
      // console.log("this is not fun", this.user);
    },
    ...mapActions("enduser", ["getAuthUserData"]),
    async getData() {
      await this.getAuthUserData(this.user.username);
      if (this.authUserData) {
        await db
          .collection("users")
          .where("address.city", "==", String(this.authUserData.address.city))
          .limit(5)
          .onSnapshot(snap => {
            if (snap.empty) {
              // console.log("users Is Empty");
            } else {
              let data = snap.docs.map(doc =>
                Object.assign({}, doc.data(), { id: doc.id })
              );
              let filteredData = data.filter(
                el => el.disName !== String(this.user.username)
              );
              if (this.user) {
                filteredData.forEach((element, i) => {
                  db.collection("following")
                    .where("followingOf", "==", String(this.user.username))
                    .where(
                      "followings",
                      "array-contains",
                      String(element.username)
                    )
                    .onSnapshot(snap => {
                      if (snap.empty) {
                        return false;
                      } else {
                        filteredData.splice(i, 1);
                      }
                    });
                });
              }

              this.users = filteredData;
            }
          });
      }
    },

    // callback(data) {
    //   this.file1 = data.url;
    //   data = "";
    //   console.info("Event: ", data);
    // },
    removeTempVoice(data) {
      data.url = null;
    },
    onResult(data) {
      // this.file1 = window.URL.createObjectURL(data);
      // console.log("The blob data:", data);
      // console.log("Downloadable audio", window.URL.createObjectURL(data));
      var mediaUrl = window.URL.createObjectURL(data);
      this.file1 = mediaUrl;
    },
    progressType() {
      return (this.progress = (this.expressText.length / 300) * 100);
    },
    update(image) {
      this.imagePreview = image.name;
    }
  },

  watch: {
    darkMode() {
      this.$vuetify.theme.dark = this.darkMode;
      localStorage.setItem("darkmode", this.darkMode);
    },
    async search(val) {
      const user = await this.getUserBySearch(this.search);
      this.usersAllData = user;
      user.forEach(element => {
        this.name[0] = element.name;
      });
    }
  },
  created() {
    this.checkBreak();
    this.getData();
  },
  mounted() {
    if (this.user) {
      var mode = localStorage.getItem("darkmode");
      var val = mode === "true";
      this.darkMode = val;
      this.$vuetify.theme.dark = val;
      var oldVal = JSON.parse(JSON.stringify(this.crushers));
      db.collection("crushers")
        .where("crushersOf", "==", String(this.user.username))
        .onSnapshot(snap => {
          if (snap.empty) {
          } else {
            let data = snap.docs.map(doc => {
              let pars = doc.data().crushers;
              this.crushers = pars;
            });
          }
        });
    }
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.fix {
  position: fixed;
  bottom: 0;
  z-index: 9999;
}
.overlayFix {
  z-index: 0 !important;
}
.hide {
  opacity: 0;
}
</style>
