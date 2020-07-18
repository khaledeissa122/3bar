<template>
  <v-card flat class="rounded-5 transparent">
    <v-card class="rounded-5 ">
      <v-card-title>
        Your messages
      </v-card-title>
    </v-card>
    <!-- <pre>{{authUserData}}</pre> -->
    <div v-if="userMessages && authUserData">
      <Message
        v-for="(message, i) in userMessages"
        :key="i"
        :isInvisible="message.isInvisible"
        :sendedName="message.sender.name"
        :myUsername="authUserData.disName"
        :sendedAvatar="message.sender.avatarUrl"
        :content="message.content"
        :image="message.image"
        :messageId="message.id"
        :myAvatar="authUserData.avatarUrl"
        :timeAgo="message.createdAt"
        @openReport="openReport = !openReport"
      />
    </div>

    <v-row v-else class="pa-4" align="center" justify="center">
      <v-col class="text-center">
        <h3 class="headline">No new messages</h3>
      </v-col>
    </v-row>
    <v-dialog v-model="openReport" max-width="400">
      <v-card>
        <v-card-text>
          <Report />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="openReport = false">
            Cancel
          </v-btn>

          <v-btn color="green darken-1" text @click="openReport = false">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Message from "@/components/enduser/messages/Message";
import Report from "@/components/enduser/reports/Report";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    Message,
    Report
    // Replay
  },
  data() {
    return {
      openReport: false,
      userMessages:null,
      // openReplay: false
    };
  },
  computed: {
    ...mapState("enduser", ["user", "authUserData"]),
    ...mapState("enduser/express"),
    getMessages: async function() {
      return await this.getUserMessages({
        username: this.user.username,
        reply: false
      });
    }
  },
  methods: {
    ...mapActions("enduser/express", ["getUserMessages"])
  },
  mounted() {
    this.getMessages.then(res=>{
      this.userMessages = res;
      // console.log("Result od get messages",res)
    });
  }
};
</script>
