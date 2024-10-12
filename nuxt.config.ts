export default defineNuxtConfig({
  plugins: ['~/utils/utils.js'],

  devtools: { enabled: false },
  compatibilityDate: "2024-07-03",
  modules: ['@nuxtjs/i18n'],

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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'en',
    },
  },

  app: {
    head: {
      title: "Litlab",
      meta: [
        {
          name: 'description',
          content: 'Crea libros personalizados con nuestra plataforma de IA. Sube imágenes de tus personajes, define nombres y la trama. Genera un libro único con ilustraciones que cobran vida para tu hijo o cualquier lector. Disfruta de la mejor experiencia educativa y creativa.'
        },
        {
          name: 'keywords',
          content: 'IA, libros personalizados, creación de historias, ilustraciones personalizadas, educación infantil, tecnología en la lectura'
        },
        { property: 'og:title', content: 'Crea tu historia personalizada con IA' },
        {
          property: 'og:description',
          content: 'Nuestro sistema de inteligencia artificial te permite crear libros únicos para tus hijos, con protagonistas, nombres e ilustraciones que tú mismo defines. ¡Como magia!'
        },
        { property: 'og:image', content: 'https://tusitio.com/images/your-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Crea tu libro personalizado ahora' },
        {
          name: 'twitter:description',
          content: 'Genera libros con IA, selecciona personajes, nombres e historias personalizadas. ¡Da vida a la imaginación de tu hijo!'
        },
        {
          name: 'google-site-verification',
          content: '5EumjvGmKAlWZDip428_AIWrpl6XzTe-lwGJGbssji4'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap'
        },
        {
          rel: 'icon',
          href: '/favicon.ico'
        } // Updated favicon link
      ]
    }
  },
  
  css: ['~/assets/css/main.css'],
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
