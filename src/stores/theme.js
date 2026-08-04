import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useTheme } from 'vuetify';

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true);

  function toggle() {
    const theme = useTheme();
    isDark.value = !isDark.value;
    theme.global.name.value = isDark.value ? 'cyber' : 'light';
  }

  return { isDark, toggle };
});
