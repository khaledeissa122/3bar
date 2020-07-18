<template>
  <v-card flat class="transparent">
   <Crush
      v-for="(crush,i) in userCrushs.crushs"
      :key="i"
      :crush="crush"
      :id="userCrushs.id"
    />
    <v-card>
       <v-overlay :value="loading" >
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    </v-card>
  </v-card>
</template>

<script>
import Crush from "@/components/enduser/users/Crush.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    Crush
  },
  data() {
    return {
      isCrush: false,
      isFollow: false
    };
  },
  computed: {
    ...mapState("enduser/crush", ["userCrushs"]),
    ...mapState("enduser", ["user"]),
    ...mapState("partials", ["loading"])
  },
  methods: {
    ...mapActions("enduser/crush", ["getUserCrushs"]),
    async getData() {
      await this.getUserCrushs(this.user.username);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
      console.log("userCrushs =>",this.userCrushs)
    });
  }
};
</script>
