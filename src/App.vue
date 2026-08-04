<template>
  <v-app theme="cyber">
    <!-- Scroll progress bar -->
    <div
      class="scroll-progress"
      :style="{ width: scrollPct + '%' }"
    />

    <AppNav />

    <v-main style="padding:0; padding-top:60px !important">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </v-main>

    <FooterSection />

    <v-snackbar
      v-model="snackbar.visible.value"
      :timeout="2500"
      location="bottom center"
      color="surface"
      rounded="pill"
    >
      {{ snackbar.message.value }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import AppNav         from './components/AppNav.vue';
import FooterSection  from './components/FooterSection.vue';
import { useSnackbar } from './composables/useSnackbar';

const snackbar = useSnackbar();
const scrollPct = ref(0);

function onScroll() {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  scrollPct.value = h > 0 ? (window.scrollY / h) * 100 : 0;
}

onMounted(()   => window.addEventListener('scroll', onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 5px;
  background: linear-gradient(90deg, #00F5FF, #BF00FF, #FF0080);
  z-index: 9999;
  transition: width 0.1s linear;
  box-shadow:
    0 0 10px rgba(0, 245, 255, 0.9),
    0 0 24px rgba(0, 245, 255, 0.5),
    0 0 50px rgba(191, 0, 255, 0.3);
}
</style>
