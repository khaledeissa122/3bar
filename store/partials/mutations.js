export default {
  setLoading(state, loading) {
    state.loading = loading;
  },
  setError(state, error) {
    state.error = error;
  },
  setSuccess(state, success) {
    state.success = success;
  },
  showMessage (state, payload) {
    state.content = payload.content
    state.color = payload.color
  }
};
