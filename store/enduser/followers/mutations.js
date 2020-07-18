export default {
  setUserMessages(state, messages) {
    state.userMessages = messages;
  },
  setUserFollowers(state, payload) {
    state.userFollowers = {followers : payload.followers,id :payload.id};
  },
  setSpecificUserData(state,data){
    state.specificUserData.push(data)
  }
};
