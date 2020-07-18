export default {
  SET_USER(state, account) {
    state.user = account;
  },
  setUserData(state, data) {
    state.userData = Object.assign(state.userData, data);
  },
  setAuthUserData(state, data) {
    state.authUserData = data;
  }
};
