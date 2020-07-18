<template>
  <v-dialog v-model="openReplay" @click:outside="close" max-width="600">
    <v-card>
      <v-card-title class="headline">Express</v-card-title>
      <v-card-text>
        <v-list rounded class="rounded-5" elevation="1">
          <v-list-item-group :color="$vuetify.theme.themes[themeMode].primary">
            <v-list-item inactive class="top">
              <!-- <v-list-item-avatar class="top">
                <img :src="authUserData.avatarUrl" />
              </v-list-item-avatar> -->
              <v-list-item-content class="pa-4">
                <v-card flat>
                  <v-form v-model="valid">
                    <v-textarea
                      :rules="msgRules"
                      class="rounded-5 mb-2"
                      v-model="form.contentReply"
                      outlined
                      auto-grow
                      loading="false"
                      single-line
                      rows="1"
                      hide-details
                      name="input-7-1"
                      label="Replay"
                    ></v-textarea>
                  </v-form>

                  <v-row justify="center">
                    <!-- <audio controls v-if="file1" class=" flex-row">
                <source :src="file1" type="audio/mp3" />
                Your browser does not support the audio element.
              </audio> -->
                    <v-btn
                      v-if="file1"
                      class="mt-3 ml-2 flex-row"
                      fab
                      dark
                      x-small
                      :color="$vuetify.theme.themes[themeMode].send"
                      @click.stop="file1 = ''"
                    >
                      <v-icon dark>mdi-close</v-icon>
                    </v-btn>
                  </v-row>
                </v-card>
                <!-- <v-toolbar
                  dense
                  class="rounded"
                  elevation="1"
                  :class="`${file1 ? 'mt-1' : ''}`"
                > -->
                  <!-- <UploadButton
                    icon
                    flat
                    :style="
                      `background: ${$vuetify.theme.themes[themeMode].send}`
                    "
                    class="mt-0 pa-0 mx-2 v-btn v-btn--contained v-btn--fab v-btn--round theme--dark v-size--x-small"
                    @file-update="update"
                  >
                    <template slot="icon">
                      <v-icon>mdi-image</v-icon>
                    </template>
                  </UploadButton> -->
                  <!-- <v-btn
                    :loading="loading"
                    v-if="!imagePreview && loading"
                    class="mx-2"
                    fab
                    dark
                    x-small
                    :color="$vuetify.theme.themes[themeMode].send"
                    @click.stop="dialog = !dialog"
                  >
                    <v-icon dark>mdi-microphone-outline</v-icon>
                  </v-btn> -->
                  <!-- <vue-record-audio @result="onResult" class="record" /> -->
                  <!-- <v-btn
                    class="mx-2"
                    fab
                    dark
                    x-small
                    :color="$vuetify.theme.themes[themeMode].send"
                    @click.stop="openDialog"
                  >
                    <v-icon dark>mdi-microphone-outline</v-icon>
                  </v-btn> -->
                  <!-- <v-spacer></v-spacer>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    x-small
                    :color="$vuetify.theme.themes[themeMode].send"
                  >
                    <v-icon dark>mdi-send</v-icon>
                  </v-btn> -->
                <!-- </v-toolbar> -->

                <!-- <v-list-item-title> </v-list-item-title> -->
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-overlay class="d-block" :value="openImage">
            <v-btn icon @click="openImage = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-img
              v-if="imagePreview"
              :aspect-ratio="2"
              contain
              height="500"
              class="pa-1 d-block"
              transition="scale-transition"
              :src="`${require('~/assets/' + imagePreview)}`"
            ></v-img>
          </v-overlay>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="close">
          Cancel
        </v-btn>

        <v-btn color="green darken-1" :disabled="!valid" text @click="reply">
          Send
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-overlay :value="loading" :absolute="true">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Reply",
  props: ["messageId"],
  data() {
    return {
      form: {
        contentReply: null,
        createdAt: null,
        messageId: null,
        sender: {
          avatarUrl: null,
          name: null,
          username: null
        }
      },
      msgRules: [value => !!value || "Required."],
      expressIsOpen: false,
      valid: false,
      openImage: false,
      imagePreview: null
    };
  },

  props: {
    openReplay: {
      type: Boolean,
      require: false
    },
    replayText: {
      type: String | Boolean,
      require: false
    },
    file1: {
      type: String,
      require: false
    },
    dialog: {
      type: Boolean,
      require: false
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
    ...mapState("partials", ["loading", "success"]),
    ...mapState("enduser", ["authUserData"]),

    themeMode() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  },
  methods: {
    ...mapActions("enduser/express", ["sendReply"]),
    async reply() {
      this.form.createdAt = this.$moment().format("D MMMM YYYY, h:mm:ss a");
      this.form.messageId = this.messageId;
      this.form.sender.avatarUrl = this.authUserData.avatarUrl;
      this.form.sender.name = this.authUserData.name;
      this.form.sender.username = this.authUserData.disName;
      await this.sendReply(this.form);
      this.reset();
    },
    reset() {
      this.form.createdAt = null;
      this.form.messageId = null;
      this.form.sender.avatarUrl = null;
      this.form.sender.name = null;
      this.form.sender.username = null;
      this.close();
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
