const siteInfo = require('./content/setup/info.json');
const pkginfo = require('./package.json')
const webpack = require('webpack')

module.exports = {
  target: 'static',
  components: true,
  mode: "universal",
  /*
  ** Headers of the page
  */
  transition: { mode: "in-out" },
  env: {
    API_URL: process.env.API_URL,
    BAEL_VERSION: pkginfo.version
  },
  head: {
    title: siteInfo.sitename,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: siteInfo.sitedescription }

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' }
    ]
  },
  css: ["@/assets/main.css", "@/assets/content.scss"],
  // icon: {
  //   iconSrc: `${siteInfo.siteicon}`
  //  },
  /*
  ** Customize the progress bar color
  */

  loading: { color: process.env.PRIMARY_COLOR || "#26a69a" },
  buildModules: ['@nuxtjs/vuetify'],
  modules: ['@nuxt/content', '@nuxtjs/pwa', '@nuxtjs/axios', 'nuxt-polyfill'],
  vuetify: {
    defaultAssets: false,
    optionsPath: "./vuetify.options.js"
  },
  content: {
    fullTextSearchFields: ['title', 'description', 'category']
  },
  manifest: {
    name: siteInfo.sitename,
    short_name: siteInfo.sitename,
    description: siteInfo.sitedescription,
    lang: 'en'
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: '/images/uploads/.*',
        handler: 'cacheFirst',
        strategyOptions: {
          cacheName: 'image-cache',
          cacheExpiration: {
            maxEntries: 100,
            maxAgeSeconds: 86400
          }
        }
      }
    ]
  },
  polyfill: {
    features: [
      {
        require: "intersection-observer",
        detect: () => "IntersectionObserver" in window
      }
    ]
  },

  plugins: [
    "~/plugins/methods"
  ],

  /*
  ** Build configuration
  */

  build: {
    extractCSS: false,
    html: {
      minify: {
       minifyCSS: false,
       minifyJS: false
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        _get: 'lodash/get',
      })
    ],
  },
}


