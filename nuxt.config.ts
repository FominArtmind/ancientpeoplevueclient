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
    '@nuxt/content'
  ],
  typescript: {
    strict: true,
    typeCheck: true
  }
}
