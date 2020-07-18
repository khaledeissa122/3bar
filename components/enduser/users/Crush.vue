<template>
  <v-list v-if="spacUserData" two-line class="pa-5 py-2 mt-2" rounded>
    <template>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="spacUserData.avatarUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="spacUserData.name"></v-list-item-title>
          <v-list-item-subtitle
            v-html="spacUserData.bio"
          ></v-list-item-subtitle>
        </v-list-item-content>
        <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-list-item-icon>
            <v-btn
              dark
              class="flex-row"
              outlined
              icon
              large
              rounded
              @click="
                ifFollow = !ifFollow;
                followOrUnfollow(spacUserData.disName);
              "
              :color="`${hover && ifFollow ? 'red' : 'indigo'}`"
            >
              <v-expand-transition>
                <v-icon v-if="!hover && !ifFollow">
                  mdi-account-multiple-plus-outline
                </v-icon>
                <v-icon v-if="!hover && ifFollow">
                  mdi-account-check-outline
                </v-icon>
                <v-icon v-if="hover && ifFollow">
                  mdi-account-multiple-minus-outline
                </v-icon>
                <v-icon v-if="hover && !ifFollow">
                  mdi-account-multiple-plus-outline
                </v-icon>
              </v-expand-transition>
            </v-btn>
          </v-list-item-icon>
        </v-hover>
        <v-list-item-icon>
          <v-btn
            class="flex-row"
            outlined
            icon
            large
            rounded
            @click="
              ifCrush = !ifCrush;
              crushOrUncrush(spacUserData.disName);
            "
            :color="`${ifCrush ? 'red' : 'pink'}`"
          >
            <v-expand-transition>
              <v-icon>
                {{
                  ifCrush ? "mdi-heart-minus-outline" : "mdi-heart-plus-outline"
                }}
              </v-icon>
            </v-expand-transition>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </template>
    <!-- {{spacUserData}} -->
  </v-list>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["crush", "id"],
  props: {
    crush: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }

  },
  data() {
    return {
      spacUserData: null,
      ifFollow: false,
      ifCrush: false
    };
  },
  computed: {
    ...mapState("enduser/crush", ["specificUserData"]),
    ...mapState("enduser", ["user"]),
    SpecificUser: async function() {
      return await this.getSpecificUser({
        username: this.crush
      });
    },
    isFollow: async function() {
      return await this.getIfFollow({
        username: this.user.username,
        followUsername: this.crush
      });
    },
    isCrush: async function() {
      return await this.getIfCrush({
        username: this.user.username,
        followUsername: this.crush
      });
    }
  },
  methods: {
    ...mapActions("enduser/crush", [
      "getSpecificUser",
      "getIfFollow",
      "getIfCrush",
      "addFollowing",
      "removeFollowing",
      "addCrush",
      "removeCrush",
    ]),
    followOrUnfollow(username) {
      if (this.ifFollow) {
        this.addFollowing({
          myUsername: this.user.username,
          id: this.id,
          usernameToFollow: username
        });
      } else {
        this.removeFollowing({
          myUsername: this.user.username,
          id: this.id,
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
    }
  },
  mounted() {
    this.SpecificUser.then(res => {
      this.spacUserData = res;
    });
    this.isFollow.then(res => {
      this.ifFollow = res;
    });
    this.isCrush.then(res => {
      this.ifCrush = res;
    });
  }
};
</script>
