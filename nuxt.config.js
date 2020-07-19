
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    // script: [
    //   { src: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAzeziIZuzhvVvQm1QrVbcIU8n5O5yWhZ4' }
    // ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css' },


    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#000' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/main.scss'
  ],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
 plugins: [{src : '~plugins/globalcomponents' , ssr : false},{src :'~/plugins/notifier'}],
  /*
  ** Nuxt.js dev-modules
  */
 buildModules: [
  // Simple usage


  // With options

    // Simple usage
    '@nuxtjs/moment',

    // With options
    ['@nuxtjs/moment', { /* module options */ }]
],
vuetify: {
  customVariables: ["~/assets/variables.scss"],
  treeShake: true,
},
  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/vuetify','nuxt-material-design-icons','vue-geolocation-api/nuxt'],
  geolocation:  {
    // watch: true,
  },


  router: {
    middleware: ["auth"]
  },
  server: {
    port: 3000, // default: 3000
  },   // other configs
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
   transpile: ['vuetify-upload-button','vue-audio'],
    extend (config, ctx) {
    }
  }
}


