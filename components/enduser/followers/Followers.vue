<template>
  <v-list :color="$vuetify.theme.themes[themeMode].third" dense two-line>
    <template v-if="userMayKnow">
      <v-list-item
      nuxt
        :to="{
          name: 'users-profile',
          params: { profile: userMayKnow.disName }
        }"
      >
        <v-list-item-avatar>
          <v-img :src="userMayKnow.avatarUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ userMayKnow.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ userMayKnow.bio }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      spacUserData: null
    };
  },
  props: {
    userMayKnow: {
      type: Object,
      required: false
    }
  },
  computed: {
    themeMode() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  }
};
</script>
