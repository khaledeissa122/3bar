export default {
  setUserCrushs(state, payload) {
    state.userCrushs = {crushs : payload.crushs,id :payload.id};
  },
  setSpecificUserData(state,data){
    state.specificUserData.push(data)
  }
};
