import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';

const routes = [
  { path: '/',     name: 'home', component: HomePage },
  { path: '/docs', name: 'docs', component: () => import('../pages/DocsPage.vue') },
  // Unknown paths fall back to the home page
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      // let the page mount, then scroll to the anchor
      return { el: to.hash, top: 80, behavior: 'smooth' };
    }
    return { top: 0 };
  },
});

export default router;
