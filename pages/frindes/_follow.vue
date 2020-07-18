<template>
  <v-card flat class="transparent">
    <User
      v-for="(follower,i) in userFollowers.followers"
      :key="i"
      :follower="follower"
      :id="userFollowers.id"
    />
    <v-card>
       <v-overlay :value="loading" >
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    </v-card>
  </v-card>
</template>

<script>
import User from "@/components/enduser/users/User.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    User
  },
  data() {
    return {
      isFollow: false,
      isCrush: false,
    };
  },
  computed: {
    ...mapState("enduser/followers", ["userFollowers"]),
    ...mapState("enduser", ["user"]),
    ...mapState("partials", ["loading"])
  },
  methods: {
    ...mapActions("enduser/followers", ["getUserFollowers"]),
    async getData() {
      await this.getUserFollowers(this.user.username);
    }
  },
  mounted() {
    this.$nextTick(() => {
			this.getData();
    });
  }
};
</script>
