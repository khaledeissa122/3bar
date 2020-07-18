export const ColorMixin = {
  computed: {
    themeMode() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  },
}
