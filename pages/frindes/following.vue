<template>
  <v-card flat class="transparent">
   <Following
      v-for="(following,i) in userFollowings.followings"
      :key="i"
      :following="following"
      :id="userFollowings.id"
    />
    <v-card>
       <v-overlay :value="loading" >
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    </v-card>
  </v-card>
</template>

<script>
import Following from "@/components/enduser/users/Following.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    Following
  },
  data() {
    return {
      isCrush: false,
      isFollow: false
    };
  },
  computed: {
    ...mapState("enduser/following", ["userFollowings"]),
    ...mapState("enduser", ["user"]),
    ...mapState("partials", ["loading"])
  },
  methods: {
    ...mapActions("enduser/following", ["getUserFollowings"]),
    async getData() {
      await this.getUserFollowings(this.user.username);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  }
};
</script>
