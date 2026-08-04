import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'cyber',
    themes: {
      cyber: {
        dark: true,
        colors: {
          primary:    '#00F5FF',
          secondary:  '#BF00FF',
          accent:     '#FF0080',
          warning:    '#FFB800',
          success:    '#00FF88',
          error:      '#FF3D71',
          background: '#07071A',
          surface:    '#0E0E2A',
          'on-background': '#E0E0FF',
          'on-surface':    '#E0E0FF',
        },
      },
      light: {
        dark: false,
        colors: {
          primary:    '#0097A7',
          secondary:  '#6A0DAD',
          accent:     '#C2185B',
          background: '#F0F0FF',
          surface:    '#FFFFFF',
        },
      },
    },
  },
  icons: { defaultSet: 'mdi' },
});
