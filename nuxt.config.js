export default {

  target: 'static',
  router: {
	  base: '/'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/font.css'},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/icons.scss',
    '@/assets/scss/colors.scss',
    '@/assets/scss/layout.scss',
    '@/assets/scss/post/Post.scss',
    'github-markdown-css/github-markdown-light.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-infinite-loading', mode: 'client', ssr: false },
    { src: '@/plugins/vue-aos', mode: 'client', ssr: false },
    { src: '@/plugins/vue-masonry-css', mode: 'client', ssr: false },
    { src: '@/plugins/vue-tui-editor.js', ssr:false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/dotenv",
	  "@nuxtjs/axios",
    "@tui-nuxt/editor",
  ],

  tui: {
    editor: {}
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
