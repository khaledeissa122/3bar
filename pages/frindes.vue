<template>
  <v-card class="transparent">
    <v-row justify="center">
      <v-col cols="12">
        <v-row no-gutters justify="center">
          <v-btn
            outlined
            rounded
            color="indigo"
            class="mx-1 mb-2"
            nuxt
            to="/frindes/follow"
          >
            Followers
          </v-btn>
          <v-btn
            outlined
            rounded
            color="indigo"
            nuxt
            class="mx-1"
            to="/frindes/following"
          >
            Following
          </v-btn>
          <v-btn
            outlined
            rounded
            color="indigo"
            nuxt
            class="mx-1"
            to="/frindes/cruchs"
          >
            Crushs
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <nuxt-child />
  </v-card>
</template>

<script>
export default {
};
</script>
