import { createVuetify, ThemeDefinition  } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const ancientTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#7a9096',
    surface: '#7b9197',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

// 50: "#e0f0f3",
// 100: "#c5dfe5",
// 200: "#b4d0d7",
// 300: "#a6c2c9",
// 400: "#9ab6bd",
// 500: "#92acb3",
// 600: "#8aa2a9",
// 700: "#7b9197",
// 800: "#7a9096",
// 900: "#768b90"

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: false,
    components,
    directives,
    theme: {
      defaultTheme: "ancientTheme",
      themes: {
        ancientTheme
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
});
