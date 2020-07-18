<template>
<v-expand-transition>
  <v-card class="rounded-5 mt-4">
    <Replay
      :openReplay="openReplay"
      :messageId="messageId"
      @close="closeDialog"
    />
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
            :to="sendedName ? 'users/' + myUsername : ''"
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
    <v-card-text class="title py-0 font-weight-bold">
      <v-row align="center" @click="openImage = true">
        <!-- <v-btn icon > -->
        <v-img
          v-if="image"
          max-height="400"
          :aspect-ratio="2"
          class="pa-1"
          transition="scale-transition"
          :src="image"
          :lazy-src="image"
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
          :lazy-src="image"
        ></v-img>
      </v-overlay>
    </v-card-text>
    <v-card-text class="pt-0">
      <v-row justify="end" align="center">
        <v-list flat class="ml-0">
          <v-list-item nuxt :ripple="false" :to="{ name: 'users-profile', params: { profile: myUsername }}">
            <v-list-item-avatar color="grey darken-3 ml-0">
              <v-img class="elevation-6" :src="myAvatar"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
        <v-textarea
        class="ml-n5 pa-3"
          rounded
          v-model="replayToPerson"
          outlined
          auto-grow
          loading="false"
          single-line
          @focus="openReplay = true"
          rows="1"
          counter
          :hide-details="!expressToPerson"
          name="input-7-1"
          label="Replay"
          hint="200 Words maximam"
        ></v-textarea>

        <div align="center" justify="end">
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
    </v-card-text>
  </v-card>
</v-expand-transition>
</template>

<script>
import Replay from "@/components/enduser/messages/Replay";
export default {
  name: "Post",
  components: {
    Replay
  },
  data() {
    return {
      openReplay: false,
      openImage: false,
      replayToPerson: "",
      anonymous: "",
      imagePreview: null,
      loading: false
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
    }
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
  },
  computed: {
    themeMode() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  },
  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
    openDialog() {
      this.$emit("openDialog");
    },
    closeDialog() {
      this.openReplay = false;
    },

    openReport() {
      this.$emit("openReport");
    },
    progressType() {
      return (this.progress = (this.expressText.length / 300) * 100);
    },
    update(image) {
      this.imagePreview = image.name;
    }
  },

};
</script>
