<template>
  <v-card flat class="rounded-5 transparent">
    <v-card>
      <v-card-title class="headline">Express</v-card-title>
      <v-card-text>
        <v-list rounded class="rounded-5" elevation="1">
          <v-list-item-group :color="$vuetify.theme.themes[themeMode].primary">
            <v-list-item inactive class="top">
              <v-list-item-avatar class="mb-10" v-if="authUserData">
                <img :src="authUserData.avatarUrl" />
              </v-list-item-avatar>
              <v-list-item-content class="pa-4">
                <v-card flat>
                  <v-form>
                    <v-textarea
                      class="rounded-5"
                      @focus="openExpress = true"
                      outlined
                      auto-grow
                      single-line
                      maxlength="300"
                      rows="1"
                      counter
                      name="input-7-1"
                      label="Express"
                      hint="300 Words maximam"
                    ></v-textarea>
                  </v-form>
                </v-card>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
    <NewExpress @close="closeDialog" :openExpress="openExpress" />
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
    <!-- <audio-player autoplay :sources="audioSources" :loop="true"></audio-player> -->
    <!-- <v-dialog v-model="openExpress" max-width="900">
      <v-card>
        <v-card-title class="headline">Express</v-card-title>
        <v-card-text>
          <NewExpress />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="openExpress = false">
            Cancel
          </v-btn>

          <v-btn color="green darken-1" text @click="openExpress = false">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
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
    <v-dialog v-model="dialog" max-width="470">
      <v-card>
        <v-card-title class="headline">Record your voice message</v-card-title>
        <v-card-text>
          <!-- <audio-recorder
            upload-url="YOUR_API_URL"
            :attempts="1"
            :time="1"
            :before-recording="callback"
            :pause-recording="callback"
            :after-recording="ad"
            :select-record="callback"
            :before-upload="callback"
            :successful-upload="callback"
            :failed-upload="callback"
          /> -->
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            Cancel
          </v-btn>

          <v-btn color="green darken-1" text @click="dialog = false">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-overlay :value="loading" :absolute="true">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import { ColorMixin } from "../mixins/ColorMixin.js";
import NewExpress from "@/components/enduser/express/NewExpress";
import Post from "@/components/enduser/express/Post";
import Report from "@/components/enduser/reports/Report";
import { mapActions, mapState } from "vuex";
export default {
  mixins: [ColorMixin],
  components: {
    NewExpress,
    Post,
    Report
  },
  // props: {
  //   dialog:{
  //     type:Boolean,
  //     require:false
  //   }
  // },
  data: () => ({
    like: false,
    anonymous: true,
    dialog: false,
    openExpress: false,
    openReport: false,
    file1: "",
    audioSources: ["assets/fallback.mp3"],
    progress: 0,
    expressText: null,
    userMessages:null,
    username:null,
  }),
  methods: {
    ...mapActions("enduser", ["getUserData"]),
    ...mapActions("enduser/express", ["getPosts"]),
    async getData() {
      await this.getUserData(this.$route.params.profile);
    },
    closeDialog() {
      this.openExpress = false;
    },
    progressType() {
      return (this.progress = (this.expressText.length / 300) * 100);
    },
    update(image) {
      console.log(image);
      this.imagePreview = image.name;
    }
  },
  computed: {
    ...mapState("partials", ["loading", "success"]),
    ...mapState("enduser", ["user","authUserData"]),
    getMessages: async function() {
      return await this.getPosts({
        username: this.user.username,
        reply: true
      });
    }
  },
  watch: {
    darkMode() {
      this.$vuetify.theme.dark = this.darkMode;
      localStorage.setItem("darkmode", this.darkMode);
      // console.log(this.darkMode);
    }
  },
  mounted() {
    this.getData();
    this.getMessages.then(res => {
      this.userMessages = res;
    });
  }
};
</script>

<style lang="scss">
.top {
  align-self: start;
}
.custom {
  position: absolute;
  top: 12px;
  left: 4px;
}
.record {
  width: 40px;
  height: 40px;
}
</style>
