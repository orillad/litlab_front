// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: ['~/utils/utils.js'],

  devtools: { enabled: true },
  compatibilityDate: "2024-07-03",
  modules: [
    '@nuxtjs/i18n',
  ],

  devServer: {
    port: 8000
  },
  server: {
    host: '0.0.0.0', // Exposes the server to all network interfaces
    port: 8000, // The port you want the server to run on
  },
  i18n: {
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts',
    langDir: './lang',
    lazy: true,
    locales: [
      {
        code: 'ca',
        file: 'ca.json',
      },
      {
        code: 'es',
        file: 'es.json',
      },
      {
        code: 'en',
        file: 'en.json',
      },
    ],
  },
  app: {
    head: {
      title: "Litlab",
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap'
        }
      ]
    }
  },
  css: ['~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

})