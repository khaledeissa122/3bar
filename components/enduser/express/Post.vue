<template>
  <v-card v-if="replyData" class="mx-auto mt-4 mb-4 rounded-5">
    <v-card-title class="pb-0">
      <img
        contain
        :aspect-ratio="1"
        class="pa-1"
        max-width="40"
        width="40"
        height="40"
        max-height="40"
        transition="scale-transition"
        :src="require('~/assets/logo.svg')"
      />
      <span class="title font-weight-medium">3bar</span>
    </v-card-title>
    <v-card-actions>
      <v-row>
        <v-list flat class="ml-2">
          <v-list-item
            nuxt
            :ripple="false"
            :to="{ name: 'users-profile', params: { profile: myUsername } }"
            active-class="false"
          >
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                :src="
                  sendedAvatar
                    ? sendedAvatar
                    : require('~/assets/avatardef.jpg')
                "
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">{{
                sendedName ? sendedName : "Unknown"
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                this.$moment(timeAgo).fromNow()
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-row>
    </v-card-actions>
    <v-card-text class="title pt-0 font-weight-bold">
      {{ content }}
    </v-card-text>
    <v-card-text class="title pt-0 font-weight-bold">
      <v-row align="center" @click="openImage = true">
        <!-- <v-btn icon > -->
        <v-img
          v-if="image"
          max-height="400"
          :aspect-ratio="1.7"
          class="pa-1"
          transition="scale-transition"
          :src="image"
        />
        <!-- </v-btn> -->
      </v-row>
      <v-overlay class="d-block" :value="openImage">
        <v-btn icon @click="openImage = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-img
          v-if="image"
          :aspect-ratio="2"
          contain
          height="500"
          class="pa-1 d-block"
          transition="scale-transition"
          :src="image"
        ></v-img>
      </v-overlay>
    </v-card-text>
    <div v-if="replyData">
      <v-divider></v-divider>
      <v-card-actions>
        <v-row>
          <v-list flat class="ml-2">
            <v-list-item nuxt :ripple="false" :to="{ name: 'users-profile', params: { profile: replyData[0].sender.username } }" two-line>
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  :src="replyData[0].sender.avatarUrl"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">{{
                  replyData[0].sender.name
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  this.$moment(replyData[0].createdAt).fromNow()
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>
      </v-card-actions>
      <v-card-text class="title font-weight-bold pt-0">
        {{ replyData[0].contentReply }}
      </v-card-text>
    </div>
    <v-card-actions>
      <v-row justify="end" align="center">
        <v-list flat class="ml-0 transparent">
          <v-list-item
            nuxt
            :ripple="false"
            :to="{
              name: 'users-profile',
              params: { profile: user.username }
            }"
          >
            <v-list-item-avatar color="grey darken-3 ml-2">
              <v-img
                v-if="myAvatar"
                class="elevation-6"
                :src="myAvatar"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
        <v-textarea
          class="ml-n5 pa-3"
          rounded
          v-model="expressToPerson"
          outlined
          auto-grow
          @focus="openExpressDialog"
          loading="false"
          single-line
          rows="1"
          counter
          :hide-details="!expressToPerson"
          name="input-7-1"
          label="Express"
          hint="300 Words maximam"
        ></v-textarea>

        <div align="center" justify="end">
          <v-btn
            @click="
              $emit('LikeClick');
              updateLike(ifLike, likes.id);
              getLikeCount();
            "
            icon
            :color="`${ifLike ? 'pink' : ''}`"
            ><v-icon>mdi-heart</v-icon></v-btn
          >
          <span class="subheading mr-2">{{
            likes ? likes.username.length : 0
          }}</span>
          <span class="mr-1">·</span>
          <v-btn icon><v-icon>mdi-share-variant</v-icon></v-btn>
          <span class="subheading"></span>
          <v-menu offset-y top left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="openReport">
                <v-list-item-title>
                  Report post
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Post",
  props: ["ProfileParam"],
  data() {
    return {
      openImage: false,
      anonymous: "",
      imagePreview: null,
      like: false,
      replyData: null,
      likes: null,
      ifLike: false
    };
  },

  props: {
    expressToPerson: {
      type: String,
      require: true
    },
    progress: {
      type: String | Boolean,
      require: true
    },
    image: {
      default: "null",
      type: String,
      require: true
    },
    sendedAvatar: {
      default: "https://cdn.vuetifyjs.com/images/john.jpg",
      type: String,
      require: true
    },
    myAvatar: {
      default: "https://cdn.vuetifyjs.com/images/john.jpg",
      type: String,
      require: true
    },
    sendedName: {
      default: "Sended Name",
      type: String,
      require: true
    },

    content: {
      default: "No Message",
      type: String,
      require: true
    },
    timeAgo: {
      default: "",
      type: String,
      require: true
    },
    myUsername: {
      default: "",
      type: String,
      require: true
    },
    messageId: {
      type: String,
      require: true
    },
    ProfileParam: {
      type: String,
      require: false
    }
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
    // likes(val) {
    //   console.log("wathc")
    //   this.likes = val;
    // }
    // replyData(val) {
    //   this.getReplys();
    //   console.log(val[0].id);
    // }
  },
  computed: {
    ...mapState("enduser", ["userData", "user"]),
    ...mapState("partials", ["loading"]),
    themeMode() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  },
  methods: {
    ...mapActions("enduser/express", [
      "getReplyData",
      "getAllReplyData",
      "getLikeData",
      "getIfLike",
      "deleteLike",
      "addLike"
    ]),
    openDialog() {
      this.$emit("openDialog");
    },
    async updateLike(ifLike, likeId) {
      if (ifLike) {
        await this.deleteLike({
          ifLike: ifLike,
          likeId: likeId,
          username: this.userData.disName
        });
        this.ifLike = false;
      }
      if (!ifLike) {
        await this.addLike({
          ifLike: ifLike,
          likeId: likeId,
          username: this.userData.disName
        });
        this.ifLike = true;
      }
    },
    async getLikeCount() {
      let likes = await this.getLikeData({
        replyId: this.replyData[0].id
      });
      if (likes) this.likes = likes[0];
    },
    async getReplys() {
      let res = await this.getReplyData({
        username: this.ProfileParam,
        messageId: this.messageId
      });
      this.replyData = res;
      // console.log(res[0].id)
      let likes = await this.getLikeData({
        replyId: res[0].id
      });
      if (likes) this.likes = likes[0];
      let ifLike = await this.getIfLike({
        username: this.ProfileParam,
        replyId: res[0].id
      });
      if (ifLike) this.ifLike = ifLike;
    },
    async getAllReplys() {
      let res = await this.getAllReplyData({
        messageId: this.messageId
      });
      this.replyData = res;
      let likes = await this.getLikeData({
        replyId: res[0].id
      });
      if (likes) this.likes = likes[0];
      let ifLike = await this.getIfLike({
        username: this.ProfileParam,
        replyId: res[0].id
      });
      if (ifLike) this.ifLike = ifLike;
    },
    // async getLikes() {},
    openReport() {
      this.$emit("openReport");
    },
    openExpressDialog() {
      this.$emit("openExpressDialog");
    }
  },
  mounted() {
    if (this.ProfileParam) {
      this.getReplys();
    } else {
      this.getAllReplys();
    }
  }

};
</script>
