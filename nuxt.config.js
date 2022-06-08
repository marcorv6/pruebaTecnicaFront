export default {
  ssr: false,
  server: { port: 8080 },
  target: 'static',
  head: {
    title: 'Prueba técnica',
    htmlAttrs: {
      lang: 'es',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: [],
  modules: ['nuxt-buefy', '@nuxtjs/axios', 'nuxt-sweetalert2'],
  axios: {},
  build: {},
  env: {
    api: "http://localhost:3000",
  },
}
