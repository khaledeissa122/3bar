<template>
  <v-list :color="$vuetify.theme.themes[themeMode].third" dense two-line class="py-0 pb-1">
    <template>
      <v-list-item
        nuxt
        :to="
          spacUserData
            ? {
                name: 'users-profile',
                params: { profile: spacUserData.disName }
              }
            : ''
        "
      >
        <v-list-item-avatar class="my-0">
          <v-img
            :src="
              spacUserData
                ? spacUserData.avatarUrl
                : require('~/assets/' + imgdef)
            "
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{
            spacUserData ? spacUserData.name : "Unknown"
          }}</v-list-item-title>
          <v-list-item-subtitle>{{
            spacUserData ? spacUserData.bio : "Unknown"
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-divider></v-divider>
  </v-list>
</template>

<script>
import { db } from "@/services/firebase.js";
import { mapActions, mapState } from "vuex";
export default {
  props: ["crusher"],
  data() {
    return {
      spacUserData: null,
      imgdef: "avatardef.jpg"
    };
  },
  props: {
    crusher: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapState("enduser", ["user"]),
    themeMode() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    SpecificUser: async function() {
      return await this.getSpecificUser({
        username: this.crusher
      });
    }
  },
  methods: {
    ...mapActions("enduser/following", ["getSpecificUser"])
  },
  async mounted() {
    await db
      .collection("crushs")
      .doc(String(this.user.username))
      .onSnapshot(doc => {
        if (doc.data().crushs.includes(this.crusher)) {
          this.SpecificUser.then(res => {
            this.spacUserData = res;
          });
        }
      });
  }
};
</script>
