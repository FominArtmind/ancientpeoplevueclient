// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  ssr: false,
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  },
  css: [
    '@/assets/css/main.css',
  ],
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxt/content',
    '@invictus.codes/nuxt-vuetify',
    'nuxt-socket-io'
  ],
  typescript: {
    strict: false,
    typeCheck: false
  },
  vite: {
    base: "/197/sclient"
  },
  content: {
    api: {
      baseURL: '/197/sclient/api/_content'
    }
  },
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      // @TODO: list all vuetify options
    },

    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true,
      useIconCDN: true,

      /* vite-plugin-vuetify options */
      styles: true,
      autoImport: true,
      useVuetifyLabs: false 
    }
  },
  io: {
    // module options
    sockets: [{
      name: 'main',
      url: 'http://localhost:3000'
    }]
  }
}
