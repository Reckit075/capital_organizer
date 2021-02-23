import en from './constants/locales/en';
import de from './constants/locales/de';

const rules = [
  {
    enforce: 'pre',
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    exclude: /(node_modules)/,
  },
  {
    test: /\.(png|jpe?g|gif|svg|webp)$/,
    loader: 'url-loader',
    query: {
      limit: 1000,
      name: 'img/[name].[ext]',
    },
  },
];

export default {
  dev: (process.env.NODE_ENV !== 'production'),
  router: {
    // base: '/home/',
  // mode: 'abstract',
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'titleTemplate',
    title: process.env.npm_package_name || 'Title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vue-fragment',
    { src: '@/plugins/vue-imgix.js', mode: 'client' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    'nuxtjs-mdi-font',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // '@nuxtjs/apollo',
    '@nuxtjs/proxy',
    '@nuxtjs/component-cache',
    'nuxt-webfontloader', 'nuxt-i18n'],
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'de',
    vueI18n: {
      fallbackLocale: 'de',
      detectBrowserLanguage: {
        // If enabled, a cookie is set once a user has been redirected to his
        // preferred language to prevent subsequent redirections
        // Set to false to redirect every time
        useCookie: true,
        // Cookie name
        cookieKey: 'i18n_redirected',
        // Set to always redirect to value stored in the cookie, not just once
        alwaysRedirect: false,
        // If no locale for the browsers locale is a match, use this one as a fallback
        fallbackLocale: en,
      },
      lazy: true,
      langDir: 'static',
      // rootRedrect: {
      //   statusCode: 301,
      //   path: '/advisor/',
      // },
      messages: {
        en, de,
      },
    },
  },
  render: {
    http2: {
      push: true,
    },
  },
  pwa: {
    workboxOptions: {
      importWorkboxFrom: 'local',
    },
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    optionsPath: '~/options/vuetify.options.js',
    defaultAssets: false,
  },
  // apollo: {
  //   tokenName: 'apollo-token', // optional, default: apollo-token
  //   includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
  //   // (Optional) Default 'apollo' definition
  //   // required
  //   errorHandler: '~/plugins/apollo-error-handler.js',
  //   clientConfigs: {
  //     default: '~/plugins/apollo-default-config.js',
  //   },
  // },
  proxy: {
    // '/api/public': {
    //   target: 'https://dev.volunteerworld.com',
    //   secure: false,
    //   changeOrigin: true,
    //   // pathRewrite: {
    //   //   '^/api' : '/'
    //   // }
    // },
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push(...rules);
      }
    },
  },
};
