export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage ({ content = '', color = '' }) {
      store.commit('partials/showMessage', { content, color })
    }
  })
}
