<template>
  <v-dialog v-model="openExpress" max-width="900" @click:outside="close">
    <v-card>
      <v-card-title class="headline">Express</v-card-title>
      <v-card-text>
        <v-list rounded class="rounded-5" elevation="1">
          <v-list-item-group :color="$vuetify.theme.themes[themeMode].primary">
            <v-list-item inactive class="top">
              <!-- <v-list-item-avatar class="top">
                <img src="https://randomuser.me/api/portraits/men/81.jpg" />
              </v-list-item-avatar> -->
              <v-list-item-content class="pa-4">
                <v-card flat>
                  <!-- <v-btn @click="getUser">Get</v-btn> -->
                  <v-progress-linear
                    v-if="progress"
                    color="primary"
                    height="2"
                    :value="progress"
                    class="mb-1"
                  ></v-progress-linear>
                  <v-form v-model="valid">
                    <v-textarea
                      :rules="msgRules"
                      class="rounded-5"
                      :class="`${form.content ? '' : 'mb-1'}`"
                      @input="progressType(val)"
                      v-model="form.content"
                      @focus="openNewExpress"
                      outlined
                      auto-grow
                      single-line
                      maxlength="300"
                      rows="1"
                      counter
                      :hide-details="!form.content"
                      name="input-7-1"
                      placeholder="Express"
                      hint="300 Words maximam"
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
                <v-toolbar
                  dense
                  class="rounded"
                  elevation="1"
                  :class="`${file1 ? 'mt-1' : ''}`"
                >
                  <v-switch
                    class="mt-5 mr-2"
                    v-model="form.isInvisible"
                    label="Express invisibly"
                  >
                    Anonymous</v-switch
                  >
                  <UploadButton
                    flat
                    :style="
                      `background: ${$vuetify.theme.themes[themeMode].send}`
                    "
                    class="mt-0 pa-0 mx-2  v-btn v-btn--contained v-btn--fab v-btn--round theme--dark v-size--x-small"
                    @file-update="setImage"
                    accept="image/*"
                  >
                    <template slot="icon" class="flat">
                      <v-icon class="flat">mdi-image</v-icon>
                    </template>
                  </UploadButton>

                  <!-- <v-btn
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
                  <v-expand-transition>
                    <v-chip
                      v-show="imagePreview"
                      close
                      @click:close="
                        imagePreview = null;
                        isImage = null;
                      "
                      class="ma-2"
                      color="indigo"
                      text-color="white"
                    >
                      <v-avatar left>
                        <v-img v-if="imagePreview" :src="imagePreview"></v-img>
                      </v-avatar>
                    </v-chip>
                    <!-- <img
                      v-show="imagePreview"
                      :aspect-ratio="1"
                      class="pa-1 border"
                      width="30"
                      max-height="40"
                      transition="scale-transition"
                      :src="imagePreview"
                    /> -->
                  </v-expand-transition>
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
                </v-toolbar>
                <v-expand-transition>
                  <v-row class="mt-4">
                    <v-col lg="12" xs="12">
                      <div class="font-weight-bold headline">
                        Select Friends
                      </div>
                    </v-col>
                    <!-- <v-divider></v-divider> -->
                    <v-row no-gutters="" justify="start">
                      <v-col lg="12" xs="12">
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
                      </v-col>
                      <v-row>
                        <v-col  lg="12" sm="12" xs="12">
                          <v-autocomplete
                            v-model="values"
                            :items="items"
                            :search-input.sync="typingName"
                            @change="selectUser"
                            outlined
                            hide-no-data
                            hide-selected
                            item-text="name"
                            item-value="disName"
                            placeholder="Write name of user you want to send this message"
                            multiple
                            full-width
                            return-object
                          >
                          </v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-row>
                  </v-row>
                </v-expand-transition>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="close">
          Cancel
        </v-btn>
        <v-btn
          color="green darken-1"
          :disabled="!selectedUsers.length >= 1 || !valid"
          text
          @click="send"
        >
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
  name: "NewExpress",
  data() {
    return {
      msgRules: [value => !!value || "Required."],
      form: {
        content: "",
        createdAt: null,
        image: null,
        isInvisible: false,
        isReply: false,
        receiversUsername: [],
        sender: {
          avatarUrl: null,
          name: null,
          username: null
        }
      },
      isImage: null,
      expressIsOpen: false,
      values: [],
      selectedUsers: [],
      value: null,
      typingName: null,
      usersAllData: [],
      name: [],
      anonymous: true,
      imagePreview: null,
      isLoading: false,
      valid: false
    };
  },

  props: {
    openExpress: {
      default: false,
      type: Boolean,
      required: false
    },
    progress: {
      type: String | Boolean,
      require: false
    },
    expressText: {
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
    }
  },

  watch: {
    async typingName(val) {
      console.log("in express",this.typingName)
      const user = await this.getUserBySearch(this.typingName);
      this.usersAllData = user;
      user.forEach(element => {
        this.name.push(element.name);
      });
    },
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
  },
  computed: {
    ...mapState("partials", ["loading", "success"]),
    items() {
      return this.usersAllData.map(entry => {
        return Object.assign({}, entry);
      });
    },
    themeMode() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  },
  methods: {
    ...mapActions("enduser/express", ["getUserBySearch", "sendMessage"]),
    async assignData() {
      if (!this.form.isInvisible) {
        this.form.sender.avatarUrl = this.$store.state.enduser.authUserData.avatarUrl;
        this.form.sender.name = this.$store.state.enduser.authUserData.name;
        this.form.sender.username = this.$store.state.enduser.authUserData.disName;
      } else {
        this.form.sender.avatarUrl = null;
        this.form.sender.name = null;
        this.form.sender.username = null;
      }
      let arr = [];
      // let arr2 = [];
      this.selectedUsers.forEach(element => {
        arr.push(element.disName);
        // arr.push(element.avatarUrl);
        // arr2.push(arr);
      });
      if (this.isImage) {
        this.form.image = this.isImage;
        this.form.image.username = this.$store.state.enduser.authUserData.disName;
        this.form.image.receiversUsername = arr;
      }
      this.form.receiversUsername = arr;
      this.form.createdAt = this.$moment().format("D MMMM YYYY, h:mm:ss a");
    },
    async send() {
      await this.assignData();
      await this.sendMessage(this.form);
      await this.close();
    },
    reset() {
      this.form.content = "";
      this.form.createdAt = null;
      this.form.image = null;
      this.form.receiversUsername = [];
      this.selectedUsers = [];
    },
    selectUser() {
      let parsedobj = JSON.parse(JSON.stringify(this.values));
      if (this.selectedUsers.length == 0) {
        this.selectedUsers.push(this.values[0]);
      }
      let compare = false;
      this.selectedUsers.forEach((element, i) => {
        if (parsedobj[0].disName != element.disName) {
          compare = true;
        } else {
          compare = false;
        }
      });
      if (compare) this.selectedUsers.push(this.values[0]);
      this.values = [];
    },
    removeUser(item) {
      if (item >= 0) this.selectedUsers.splice(item, 1);
    },
    async close() {
      this.$emit("close");
      // this.reset();
    },
    openDialog() {
      this.$emit("openDialog");
    },
    openNewExpress() {
      this.$emit("openNewExpress");
    },
    progressType() {
      return (this.progress = (this.form.content.length / 300) * 100);
    },
    setImage(e) {
      this.isImage = {
        file: e,
        imgName: "post"
      };
      if (e) {
        var reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(this.isImage.file);
      }
      // this.imagePreview = image.name;
    }
  }
};
</script>
