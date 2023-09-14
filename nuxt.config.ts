// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
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
    'nuxt-icon'
  ],
  typescript: {
    strict: true,
    typeCheck: true
  }
}
