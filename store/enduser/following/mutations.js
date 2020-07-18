export default {
  setUserfollowings(state, payload) {
    state.userFollowings = {followings : payload.followings,id :payload.id};
    // console.log("Followers in mutation =>",payload.followers)
  },
  setSpecificUserData(state,data){
    state.specificUserData.push(data)
    // console.log("Spcefic user data in mutation =>",state.specificUserData)
  }
};
