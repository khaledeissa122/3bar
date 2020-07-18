<template>
  <v-card flat class="transparent">
    <div v-if="userData">
      <v-img
        :src="
          userData.coverUrl ? userData.coverUrl : require('~/assets/' + imgdef)
        "
        :lazy-src="userData.coverUrl"
        aspect-ratio="2"
      >
        <v-col cols="12">
          <v-row no-gutters justify="center">
            <div class="custom-avatar ma-3">
              <v-img
                @click="openImage = true"
                class="avatar pointer"
                :src="
                  userData.avatarUrl
                    ? userData.avatarUrl
                    : require('~/assets/' + imgdef)
                "
                :lazy-src="`https://picsum.photos/10/6?image=${8 * 5 + 10}`"
                aspect-ratio="1"
              >
              </v-img>
            </div>
          </v-row>
        </v-col>
        <v-row
          no-gutters
          :class="`${show ? 'pa-5 pb-0  ' : 'pa-5 pb-0 opacity'}`"
        >
          <v-col sm="12">
            <v-card elevation="5" class="py-0 px-5 rounded">
              <v-row
                justify="center"
                align="center"
                class="justify-lg-space-between"
              >
                <v-card-title>
                  {{ userData.name }}
                </v-card-title>
                <v-card-actions v-if="authUserData">
                  <div v-if="authUserData.disName != username" class="mx-2">
                    <v-btn
                      class="flex-row"
                      outlined
                      small
                      rounded
                      @click="
                        ifCrush = !ifCrush;
                        crushOrUncrush(username);
                      "
                      :color="`${ifCrush ? 'red' : 'pink'}`"
                    >
                      <v-expand-transition>
                        <v-icon small left>
                          {{
                            ifCrush
                              ? "mdi-heart-minus-outline"
                              : "mdi-heart-plus-outline"
                          }}
                        </v-icon>
                      </v-expand-transition>
                      {{ ifCrush ? "unCrush" : "Crush" }}
                    </v-btn>
                    <v-hover v-slot:default="{ hover }" open-delay="200">
                      <v-btn
                        dark
                        class="flex-row"
                        outlined
                        icon
                        small
                        rounded
                        @click="
                          ifFollow = !ifFollow;
                          followOrUnfollow(username);
                        "
                        :color="`${hover && ifFollow ? 'red' : 'blue'}`"
                      >
                        <v-expand-transition>
                          <v-icon small v-if="!hover && !ifFollow">
                            mdi-account-multiple-plus-outline
                          </v-icon>
                          follow
                          <v-icon small v-if="!hover && ifFollow">
                            mdi-account-check-outline
                          </v-icon>
                          <v-icon small v-if="hover && ifFollow">
                            mdi-account-multiple-minus-outline
                          </v-icon>
                          <v-icon small v-if="hover && !ifFollow">
                            mdi-account-multiple-plus-outline
                          </v-icon>
                        </v-expand-transition>
                      </v-btn>
                    </v-hover>
                  </div>
                  <v-btn
                    icon
                    small
                    outlined
                    rounded
                    color="indigo"
                    @click="copyTestingCode"
                  >
                    <v-icon small>mdi-share</v-icon>
                  </v-btn>
                  <div v-if="username == authUserData.disName" class="ma-2">
                    <v-btn
                      @click="openProfileEdit = true"
                      icon=""
                      rounded
                      outlined
                      small
                      color="indigo"
                    >
                      <v-icon small>mdi-pencil</v-icon>
                    </v-btn>
                  </div>

                  <v-btn
                    small
                    @click="show = !show"
                    color="indigo"
                    rounded
                    outlined
                  >
                    <v-icon small
                      >{{
                        show ? "mdi-chevron-up" : "mdi-chevron-down"
                      }} </v-icon
                    >info
                  </v-btn>
                </v-card-actions>
              </v-row>
              <v-expand-transition>
                <div v-show="show">
                  <v-card-text v-if="userData.bio" class="text--primary">
                    {{ userData.bio }}
                  </v-card-text>
                  <v-card-subtitle>
                    <v-icon small class="mb-1">mdi-cake</v-icon>
                    {{ userData.birthday }}
                  </v-card-subtitle>
                  <v-card-subtitle class="pt-0">
                    <v-icon small class="mb-1">mdi-map-marker</v-icon>
                    {{ userData.address.country }} -
                    {{ userData.address.region }}
                  </v-card-subtitle>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-col cols="12">
            <v-row no-gutters justify="center">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    to="/frindes/follow"
                    rounded
                    :color="$vuetify.theme.themes[themeMode].forth"
                    class="px-4 my-1 "
                    v-on="on"
                  >
                    <!-- <span class="font-weight-bold body-1">356 &nbsp;</span> -->
                    Follower
                  </v-btn>
                </template>
                <span>Followers</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    to="/frindes/following"
                    rounded
                    :color="$vuetify.theme.themes[themeMode].forth"
                    class="px-4 mx-2 my-1 "
                    v-on="on"
                  >
                    <!-- <span class="font-weight-bold body-1">356 &nbsp;</span> -->
                    Following
                  </v-btn>
                </template>
                <span>Following</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    to="/frindes/crushs"
                    rounded
                    :color="$vuetify.theme.themes[themeMode].forth"
                    class="px-4 my-1 "
                    v-on="on"
                  >
                    <!-- <span class="font-weight-bold body-1">7 &nbsp;</span> -->
                    Crushs
                  </v-btn>
                </template>
                <span> Just you can see this link </span>
              </v-tooltip>
            </v-row>
          </v-col>
        </v-card-actions>
      </v-img>
      <v-card class="rounded-5 mt-4">
        <v-card-title>
          Your Replys
        </v-card-title>
      </v-card>
      <v-card flat class="transparent" v-if="userMessages">
        <v-card v-if="authUserData" flat class="transparent noshadow">
          <Post
            v-for="(message, i) in userMessages"
            :key="i"
            :isInvisible="message.isInvisible"
            :sendedName="message.sender.name"
            :myUsername="message.sender.username"
            :ProfileParam="username"
            :sendedAvatar="message.sender.avatarUrl"
            :content="message.content"
            :image="message.image"
            :messageId="message.id"
            :myAvatar="authUserData.avatarUrl"
            :timeAgo="message.createdAt"
            @openExpressDialog="openExpress = true"
            @LikeClick="like = !like"
            @openReport="openReport = !openReport"
          />
        </v-card>
      </v-card>
      <v-row v-else class="pa-4" align="center" justify="center">
        <v-col class="text-center">
          <h3 class="headline">There are no posts yet</h3>
        </v-col>
      </v-row>

      <v-overlay class="d-block" :value="openImage">
        <v-btn icon @click="openImage = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-img
          :aspect-ratio="2"
          contain
          height="500"
          class="pa-1 d-block"
          transition="scale-transition"
          :src="
            userData.avatarUrl
              ? userData.avatarUrl
              : require('~/assets/' + imgdef)
          "
        ></v-img>
      </v-overlay>

      <v-dialog v-model="openReport" max-width="400">
        <v-card>
          <v-card-text>
            <Report />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="openReport = false">
              Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="openReport = false">
              Done
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <NewExpress @close="closeDialog" :openExpress="openExpress" />
      <ProfileEdit
        :coverUrl="userData.coverUrl"
        :avatarUrl="userData.avatarUrl"
        :name="userData.name"
        :address="userData.address.country"
        :birthDate="userData.birthday"
        :showBirthday="userData.showBirthday"
        :open="openProfileEdit"
        @close="closeDialog"
      />
    </div>
  </v-card>
</template>

<script>
// import AvatarPicker from '~/components/AvatarPicker'

import { ColorMixin } from "../../mixins/ColorMixin.js";
import NewExpress from "@/components/enduser/express/NewExpress";
import Post from "@/components/enduser/express/Post";
import Report from "@/components/enduser/reports/Report";
import ProfileEdit from "@/components/enduser/profile/ProfileEdit";
import { mapActions, mapState } from "vuex";
import { db } from "@/services/firebase.js";
export default {
  mixins: [ColorMixin],
  pageTitle: "My Profile",
  components: {
    NewExpress,
    Post,
    Report,
    ProfileEdit
  },
  //  validate ({ params }) {
  //   // Must be a number
  //   return params;
  //   // return /^\d+$/.test(params.profile)
  // },
  // components: { AvatarPicker },
  data() {
    return {
      spacUserData: null,
      ifFollow: false,
      ifCrush: false,
      username: null,
      data: null,
      show: false,
      openProfileEdit: false,
      openImage: false,
      openExpress: false,
      imgdef: "avatardef.jpg",
      like: false,
      openReport: false,
      tab: null,
      userMessages: null,
      items: [
        { tab: "One", content: "Tab 1 Content" },
        { tab: "Two", content: "Tab 2 Content" }
      ]
    };
  },
  methods: {
    ...mapActions("enduser", ["getUserData"]),
    ...mapActions("enduser/express", ["getUserMessages"]),
    ...mapActions("enduser/following", [
      "getSpecificUser",
      "getIfFollowProfile",
      "getIfCrushProfile",
      "addFollowing",
      "removeFollowing",
      "addCrush",
      "removeCrush"
    ]),
    followOrUnfollow(username) {
      if (this.ifFollow) {
        this.addFollowing({
          myUsername: this.user.username,
          usernameToFollow: username
        });
      } else {
        this.removeFollowing({
          myUsername: this.user.username,
          usernameToFollow: username
        });
      }
    },
    crushOrUncrush(username) {
      if (this.ifCrush) {
        this.addCrush({
          myUsername: this.user.username,
          id: this.id,
          usernameToFollow: username
        });
      } else {
        this.removeCrush({
          myUsername: this.user.username,
          id: this.id,
          usernameToFollow: username
        });
      }
    },
    closeDialog() {
      this.openProfileEdit = false;
      this.openExpress = false;
    },
    async getData() {
      await this.getUserData(this.$route.params.profile);
    },

    copyTestingCode() {
      const el = document.createElement("textarea");
      el.value = `http://localhost:3000/users/${this.username}`;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
          this.$notifier.showMessage({
              content: "Link user is copied",
              color: "success"
            });
    }
  },
  computed: {
    ...mapState("partials", ["loading", "error"]),
    ...mapState("enduser", ["user", "userData", "authUserData"]),
    ...mapState("enduser/express"),

    isFollow: async function() {
      return await this.getIfFollowProfile({
        username: this.username,
        followUsername: this.user.username
      });
    },
    isCrush: async function() {
      return await this.getIfCrushProfile({
        username: this.username,
        followUsername: this.user.username
      });
    },
    getMessages: async function() {
      return await this.getUserMessages({
        username: this.$route.params.profile,
        reply: true
      });
    }
  },
  mounted() {
    this.getData();
    this.getMessages.then(res => {
      // console.log("Result od get messages",res)
      this.userMessages = res;
    });
    this.isFollow.then(res => {
      this.ifFollow = res;
    });
    this.isCrush.then(res => {
      this.ifCrush = res;
      // console.log("Crush is =>", res);
    });
  },
  created() {
    this.username = this.$route.params.profile;
    this.bothCrush;
  }
};
</script>

<style lang="scss">
.noshadow {
  box-shadow: none !important;
}
</style>
