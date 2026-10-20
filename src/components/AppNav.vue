<template>
  <nav
    class="cyber-nav"
    :class="{ scrolled }"
  >
    <div class="nav-inner">
      <span
        class="nav-logo gradient-text"
        @click="close(); goSection('hero')"
      >
        <span class="logo-bracket">[</span>crazy-workers<span class="logo-bracket">]</span>
      </span>

      <!-- Desktop links -->
      <div class="nav-links">
        <a
          v-for="link in links"
          :key="link.id"
          class="nav-link"
          @click="goSection(link.id)"
        >
          {{ link.label }}
        </a>
        <RouterLink
          to="/docs"
          class="nav-link nav-link--docs"
          :class="{ active: isDocs }"
        >
          Docs
        </RouterLink>
      </div>

      <div class="nav-actions">
        <a
          class="icon-btn"
          href="https://github.com/giovanni-colasanto/crazy-workers"
          target="_blank"
          title="GitHub"
        >
          <v-icon
            icon="mdi-github"
            size="18"
          />
        </a>
        <a
          class="nav-pip"
          href="https://pypi.org/project/crazy-workers/"
          target="_blank"
        >
          <v-icon
            icon="mdi-package-variant"
            size="14"
          />
          PyPI
        </a>
        <!-- Hamburger (mobile only) -->
        <button
          class="hamburger"
          :class="{ open: menuOpen }"
          aria-label="Menu"
          @click="menuOpen = !menuOpen"
        >
          <span /><span /><span />
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Transition name="drawer">
      <div
        v-if="menuOpen"
        class="mobile-menu"
      >
        <a
          v-for="link in links"
          :key="link.id"
          class="mobile-link"
          @click="close(); goSection(link.id)"
        >
          <v-icon
            icon="mdi-chevron-right"
            size="14"
            color="#00F5FF"
          />
          {{ link.label }}
        </a>
        <RouterLink
          to="/docs"
          class="mobile-link"
          @click="close()"
        >
          <v-icon
            icon="mdi-book-open-variant"
            size="14"
            color="#BF00FF"
          />
          Documentation
        </RouterLink>
        <div class="mobile-divider" />
        <a
          class="mobile-link"
          href="https://github.com/giovanni-colasanto/crazy-workers"
          target="_blank"
        >
          <v-icon
            icon="mdi-github"
            size="14"
          />
          GitHub
        </a>
        <a
          class="mobile-link"
          href="https://pypi.org/project/crazy-workers/"
          target="_blank"
        >
          <v-icon
            icon="mdi-package-variant"
            size="14"
          />
          PyPI
        </a>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route  = useRoute();
const router = useRouter();

const scrolled  = ref(false);
const menuOpen  = ref(false);

const isDocs = computed(() => route.path === '/docs');

const links = [
  { id: 'features',   label: 'Features'    },
  { id: 'quickstart', label: 'Quick Start' },
  { id: 'contribute', label: 'Contribute'  },
  { id: 'donate',     label: 'Donate'      },
];

function onScroll()  { scrolled.value = window.scrollY > 30; }
function close()     { menuOpen.value = false; }

// Scroll to a home-page section. If we're on another route, navigate home
// first, then scroll once the section has mounted.
async function goSection(id) {
  if (route.path !== '/') {
    await router.push('/');
    await nextTick();
    // give the home page a tick to render its sections
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60);
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

onMounted(()   => window.addEventListener('scroll', onScroll));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<style scoped>
.cyber-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
  border-bottom: 1px solid transparent;
}
.cyber-nav.scrolled {
  background: rgba(7, 7, 26, 0.88);
  backdrop-filter: blur(20px) saturate(1.5);
  border-bottom-color: rgba(0, 245, 255, 0.12);
  box-shadow: 0 4px 40px rgba(0, 245, 255, 0.05);
}

.nav-inner {
  /* box-sizing esplicito — non ereditare da regole esterne */
  box-sizing: border-box;
  /* usa padding-inline per evitare conflitti col padding compensato da Vuetify */
  padding-inline: 20px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 12px;
  /* max-width centrato — solo su schermi grandi */
  max-width: 1100px;
  margin-inline: auto;
}

.nav-logo {
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  cursor: pointer;
  white-space: nowrap;
  transition: filter 0.3s;
  flex-shrink: 0;
}
.nav-logo:hover { filter: brightness(1.3) drop-shadow(0 0 8px #00F5FF); }
.logo-bracket { color: #BF00FF; -webkit-text-fill-color: #BF00FF; }

.nav-links {
  display: flex;
  gap: 2px;
  flex: 1;
  justify-content: center;
}
@media (max-width: 680px) { .nav-links { display: none; } }

.nav-link {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;
  padding: 6px 11px;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
  text-decoration: none;
  white-space: nowrap;
}
.nav-link:hover { color: #00F5FF; background: rgba(0, 245, 255, 0.07); }

/* Docs route link — accented to stand out as the secondary page */
.nav-link--docs { color: #BF00FF; font-weight: 700; }
.nav-link--docs:hover { color: #D84BFF; background: rgba(191, 0, 255, 0.08); }
.nav-link--docs.active {
  color: #D84BFF;
  background: rgba(191, 0, 255, 0.1);
  box-shadow: inset 0 0 0 1px rgba(191, 0, 255, 0.3);
}

.nav-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  padding: 8px;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;
  display: flex;
  align-items: center;
  text-decoration: none;
}
.icon-btn:hover { color: #00F5FF; background: rgba(0, 245, 255, 0.08); }

.nav-pip {
  font-size: 0.73rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  color: #00F5FF;
  border: 1px solid rgba(0, 245, 255, 0.3);
  border-radius: 6px;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.2s, border-color 0.2s;
  white-space: nowrap;
}
.nav-pip:hover { background: rgba(0,245,255,0.1); box-shadow: 0 0 12px rgba(0,245,255,0.25); border-color: rgba(0,245,255,0.6); }
@media (max-width: 400px) { .nav-pip { display: none; } }

/* ── Hamburger ── */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: background 0.2s;
}
.hamburger:hover { background: rgba(0,245,255,0.08); }
.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: #ffffff;
  border-radius: 2px;
  transform-origin: center;
  transition: transform 0.25s ease, opacity 0.25s ease, background 0.2s;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); background: #00F5FF; }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); background: #00F5FF; }

@media (max-width: 680px) { .hamburger { display: flex; } }

/* ── Mobile menu ── */
.mobile-menu {
  background: rgba(7,7,26,0.97);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(0,245,255,0.1);
  padding: 8px 0 16px;
  display: flex;
  flex-direction: column;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 24px;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(224,224,255,0.85);
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s, background 0.2s;
}
.mobile-link:hover { color: #00F5FF; background: rgba(0,245,255,0.05); }

.mobile-divider {
  height: 1px;
  background: rgba(255,255,255,0.06);
  margin: 8px 24px;
}

/* Transition */
.drawer-enter-active, .drawer-leave-active { transition: max-height 0.3s ease, opacity 0.3s ease; overflow: hidden; }
.drawer-enter-from, .drawer-leave-to { max-height: 0; opacity: 0; }
.drawer-enter-to, .drawer-leave-from { max-height: 400px; opacity: 1; }
</style>
