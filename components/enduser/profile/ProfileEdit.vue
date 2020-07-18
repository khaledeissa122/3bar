<template>
  <v-dialog v-model="open" max-width="700" @click:outside="close">
    <v-dialog v-model="show" max-width="500">
      <v-card>
        <v-card-title class="headline">Crop your avatar</v-card-title>

        <v-card-text>
          <VueCropper
            v-model="show"
            max-width="700"
            ref="cropper"
            :guides="false"
            :view-mode="2"
            drag-mode="crop"
            :auto-crop-area="0.5"
            :min-container-width="250"
            :min-container-height="180"
            :background="true"
            :rotatable="true"
            :src="profile.avatarImgPreview"
            alt="Source Image"
            :img-style="{ width: '400px', height: '300px' }"
          >
          </VueCropper>
          <v-row v-show="cropImg">
            <v-col lg="4">
              <div class="custom-avatar mt-n12 ml-3">
                <v-img class="avatar pointer" :src="cropImg" aspect-ratio="1">
                </v-img>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="rotate"
            v-if="profile.avatarImgPreview != ''"
          >
            Rotate
          </v-btn>

          <v-btn
            color="green darken-1"
            v-if="profile.avatarImgPreview != ''"
            text
            @click="cropImage"
          >
            Crop
          </v-btn>
          <v-btn
            color="green darken-1"
            v-if="profile.avatarImgPreview != ''"
            text
            @click="
              cropImage;
              show = false;
            "
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-text>
        <v-row no-gutters>
          <v-overlay :value="loading" :absolute="true">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
          <v-snackbar color="success" :value="success" :timeout="5000">
            {{ success }}
          </v-snackbar>
          <v-col lg="12">
            <v-card class="mt-5">
              <v-img
                :src="
                  profile.coverImgPreview ? profile.coverImgPreview : coverUrl
                "
                aspect-ratio="4"
              >
                <UploadButton
                  icon
                  flat
                  accept="image/*"
                  :style="
                    `background: ${$vuetify.theme.themes[themeMode].send}`
                  "
                  class="upload-img-center v-btn v-btn--contained v-btn--fab v-btn--round theme--dark v-size--x-small"
                  @file-update="coverImgHandler"
                  ref="cover"
                >
                  <template slot="icon">
                    <v-icon>mdi-pencil</v-icon>
                  </template>
                </UploadButton>
                <v-btn
                  x-small
                  rounded
                  fab
                  class="ma-2"
                  color="black"
                  @click="
                    profile.coverImgPreview = null;
                    profile.avatarImgPreview = null;
                    profile.avatarImg = null;
                    profile.coverImg = null;
                  "
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </v-img>

              <v-row no-gutters>
                <v-col lg="4">
                  <div class="custom-avatar mt-n12 ml-3">
                    <v-img
                      @click="openImage = true"
                      class="avatar pointer"
                      :src="
                        cropImg
                          ? cropImg
                          : profile.avatarImgPreview
                          ? profile.avatarImgPreview
                          : avatarUrl
                      "
                      aspect-ratio="1"
                    >
                      <UploadButton
                        icon
                        accept="image/*"
                        flat
                        :style="
                          `background: ${$vuetify.theme.themes[themeMode].send}`
                        "
                        ref="avatar"
                        @file-update="avatarImgHandler"
                        class="upload-avatar-center v-btn v-btn--contained v-btn--fab v-btn--round theme--dark v-size--x-small"
                      >
                        <template slot="icon">
                          <v-icon>mdi-pencil</v-icon>
                        </template>
                      </UploadButton>
                    </v-img>
                  </div>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col sm="12">
                  <form width="100%">
                    <v-card-title>
                      <v-text-field
                        v-model="form.name"
                        outlined
                        rounded
                        label="Name"
                        :placeholder="name"
                      ></v-text-field
                    ></v-card-title>
                    <v-card-text class="pb-0">
                      <!-- 24 Yrs.. FCi Mansoura University (Graduated) #FrontEnd #Developer
              #EGYPT http://curiouscat.me/Khaledeissa -->
                      <v-textarea
                        name="input-7-1"
                        label="bio"
                        :value="
                          bio
                            ? '24 Yrs.. FCi Mansoura University (Graduated) #FrontEnd #Developer#EGYPT http://curiouscat.me/Khaledeissa'
                            : ''
                        "
                        hint="300 charactar"
                        rows="1"
                        v-model="form.bio"
                        placeholder="Write your bio "
                        outlined
                        rounded
                        auto-grow
                      ></v-textarea>
                      <!-- <v-file-input @change="Imagefilehandler($event)" accept="image/*" label="File input"></v-file-input> -->
                    </v-card-text>
                    <v-card-subtitle>
                      <v-icon small class="mb-1">mdi-cake</v-icon>
                      {{ birthDate }}
                      <v-form>
                        <!-- <v-checkbox
                          :value="showBirthday"
                          v-model="form.showBirthday"
                          label="show your Birthday"
                        ></v-checkbox> -->
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
                              v-model="date"
                              label="Birthday date"
                              append-icon="event"
                              :rules="birthdayRules"
                              required
                              dense
                              outlined
                              rounded
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            ref="picker"
                            color="teal"
                            v-model="form.birthday"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="save"
                          ></v-date-picker>
                        </v-menu>
                      </v-form>
                    </v-card-subtitle>
                    <v-card-subtitle class="pt-0">
                      <v-text-field
                        outlined
                        rounded
                        label="address"
                        :placeholder="address"
                        v-model="form.location"
                      ></v-text-field>
                    </v-card-subtitle>
                  </form>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="close">
          Cancel
        </v-btn>
        <v-btn color="green darken-1" text @click="updateCover">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { ColorMixin } from "../../../mixins/ColorMixin.js";
import { mapActions, mapState } from "vuex";
export default {
  mixins: [ColorMixin],
  components: {
    VueCropper
  },
  props: {
    open: {
      default: false,
      type: Boolean,
      required: false
    },
    coverUrl: {
      default: "",
      type: String,
      required: false
    },
    avatarUrl: {
      default: "",
      type: String,
      required: false
    },
    name: {
      default: "",
      type: String,
      required: true
    },
    bio: {
      default: "",
      type: String,
      required: false
    },
    address: {
      default: "",
      type: String,
      required: false
    },
    birthDate: {
      default: "",
      type: String,
      required: false
    },
    showBirthday: {
      default: "",
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      profile: {
        coverImgPreview: null,
        avatarImgPreview: null,
        img: null
      },
      form: {
        name: null,
        birthday: null,
        location: null,
        bio: null,
        showBirthday: null
      },

      // imageData: null,
      // picture: null,
      // uploadValue: 0,
      imgSrc: "",
      cropImg: "",
      show: false,
      date: null,
      menu: false,
      valid: false,
      value: false,
      birthdayRules: [v => !!v || "Birthday date is required"]
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  computed: {
    ...mapState("partials", ["loading", "success"])
  },
  methods: {

    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      if (this.profile.avatarImg.file.type) {
        this.cropImg = this.$refs.cropper
          .getCroppedCanvas()
          .toDataURL(this.profile.avatarImg.file.type);
        this.profile.avatarImg = {
          file: this.cropImg,
          imgName: "avatar"
        };
        if (this.$route.params.profile)
          this.profile.avatarImg["username"] = this.$route.params.profile;
      }
    },
    rotate() {
      // guess what this does :)
      this.$refs.cropper.rotate(90);
    },
    ...mapActions("enduser/profile", ["updateCoverImg", "updateUserData"]),
    close() {
      this.form.name = null;
      this.form.location = null;
      this.form.birthday = null;
      this.form.bio = null;
      this.form.showBirthday = null;
      this.profile.coverImgPreview = null;
      this.profile.avatarImgPreview = null;
      this.profile.avatarImg = null;
      this.profile.coverImg = null;
      this.$emit("close");
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    async getValue() {
      var changeData = {};
      if (this.form) {
        for (var prop in this.form) {
          if (this.form.hasOwnProperty(prop)) {
            if (this.form[prop] != null && this.form[prop] != "") {
              var innerObj = {};
              innerObj[prop] = this.form[prop];
              Object.assign(changeData, innerObj);
            }
          }
        }
      }
      return changeData;
    },
    async updateCover() {
      if (this.profile.avatarImg)
        await this.updateCoverImg(this.profile.avatarImg);
      if (this.profile.coverImg)
        await this.updateCoverImg(this.profile.coverImg);
      var value = await this.getValue();
      if (Object.keys(value).length != 0) {
        if (this.$route.params.profile)
          value["username"] = this.$route.params.profile;
        await this.updateUserData(value);
      }
      if (Object.keys(value).length != 0 && this.coverImgPreview != null && this.cropImg != null) {
        this.$notifier.showMessage({ content: "Saved", color: "success" });
      }
      this.close();
    },
    async coverImgHandler(e) {
      this.profile.coverImg = {
        file: e,
        imgName: "cover"
      };
      if (this.$route.params.profile)
        this.profile.coverImg["username"] = this.$route.params.profile;

      if (e) {
        var reader = new FileReader();
        reader.onload = () => {
          this.profile.coverImgPreview = reader.result;
        };
        reader.readAsDataURL(this.profile.coverImg.file);
      }
    },
    async avatarImgHandler(e) {
      this.profile.avatarImg = {
        file: e,
        imgName: "cover"
      };
      if (e) {
        var reader = new FileReader();
        reader.onload = event => {
          this.profile.avatarImgPreview = event.target.result;
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(this.profile.avatarImg.file);
        this.show = true;
      }
    }
  },
};
</script>

<style lang="scss">
.upload-avatar-center {
  left: 35% !important;
  bottom: -30px !important;
}
.upload-img-center {
  position: absolute;
  left: 50% !important;
  bottom: 40% !important;
}
</style>
