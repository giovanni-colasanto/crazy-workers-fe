<template>
  <section
    id="hero"
    class="hero-section scanline-wrap cyber-grid"
  >
    <!-- Particle network -->
    <ParticleNetwork />

    <!-- Decorative orbs -->
    <div class="orb orb-1" />
    <div class="orb orb-2" />
    <div class="orb orb-3" />

    <!-- Scanline sweep -->
    <div class="scan-line" />

    <!-- Draggable mascot -->
    <div
      ref="mascotWrapRef"
      class="hero-mascot-wrap"
      :class="{ dragging: isDragging }"
      :style="mascotStyle"
      @mousedown.prevent="onDragStart"
      @touchstart.prevent="onDragStart"
    >
      <div class="mascot-inner">
        <div class="mascot-ring mascot-ring-outer" />
        <div class="mascot-ring mascot-ring-inner" />
        <div class="mascot-frame">
          <img
            src="/crazy-snake.png"
            alt="crazy-workers mascot"
            class="mascot-img"
          >
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="hero-content">
      <!-- Badge -->
      <div
        class="reveal hero-badge"
        @click="copyInstall"
      >
        <span class="badge-dot" />
        <span class="badge-text">pip install crazy-workers</span>
        <v-icon
          icon="mdi-content-copy"
          size="14"
          style="opacity:.5"
        />
      </div>

      <!-- Title -->
      <h1 class="reveal reveal-delay-1 hero-title">
        <span class="hero-title-line1">{{ line1 }}</span>
        <br>
        <span
          class="gradient-text"
          style="display:inline-block"
        >{{ line2 }}</span>
      </h1>

      <!-- Typed subtitle -->
      <p class="reveal reveal-delay-2 hero-sub">
        A Python library for managing background worker processes with
        <span class="neon-text">persistent state</span>,
        <span style="color:#BF00FF">automatic crash recovery</span>,
        and a built-in CLI —
        <span style="color:#FF0080">built for production</span>.
      </p>

      <!-- CTA buttons -->
      <div class="reveal reveal-delay-3 hero-ctas">
        <a
          class="cta-primary"
          href="https://github.com/giovanni-colasanto/crazy-workers"
          target="_blank"
        >
          <v-icon
            icon="mdi-github"
            size="18"
          />
          GitHub
          <span class="cta-glow" />
        </a>
        <button
          class="cta-secondary"
          @click="scrollTo('quickstart')"
        >
          <v-icon
            icon="mdi-play-circle-outline"
            size="18"
          />
          Quick Start
        </button>
        <button
          class="cta-accent"
          @click="scrollTo('donate')"
        >
          <v-icon
            icon="mdi-heart"
            size="18"
          />
          Support
        </button>
      </div>

      <!-- Stats -->
      <div class="reveal reveal-delay-4 hero-stats">
        <div
          v-for="s in stats"
          :key="s.label"
          class="stat-item"
        >
          <div class="stat-val gradient-text">
            {{ s.val }}
          </div>
          <div class="stat-lbl">
            {{ s.label }}
          </div>
        </div>
      </div>

      <!-- Badges -->
      <div class="reveal reveal-delay-5 hero-badges">
        <a
          v-for="b in badges"
          :key="b.alt"
          :href="b.href"
          target="_blank"
          class="badge-img"
        >
          <img
            :src="b.src"
            :alt="b.alt"
          >
        </a>
      </div>
    </div>

    <!-- Bottom fade -->
    <div class="hero-fade" />

    <v-snackbar
      v-model="copied"
      timeout="2000"
      location="bottom center"
      color="surface"
      rounded="pill"
    >
      <v-icon
        icon="mdi-check-circle"
        color="success"
        class="mr-2"
      /> Copied to clipboard!
    </v-snackbar>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ParticleNetwork from './ParticleNetwork.vue';
import { useScrollReveal } from '../composables/useScrollReveal';

useScrollReveal();

const copied = ref(false);

// ── Draggable mascot ──────────────────────────────────────────────
const mascotWrapRef = ref(null);
const isDragging    = ref(false);
const pos           = ref({ x: 0, y: 0 });   // center of mascot in hero coords
const dragOffset    = ref({ x: 0, y: 0 });
const HALF = 130;   // half of the visual size (rings ~260px)

function heroRect() {
  return document.getElementById('hero').getBoundingClientRect();
}

function initPos() {
  const r = heroRect();
  const mobile = r.width < 680;

  if (mobile) {
    // Centro orizzontale, nella zona alta tra nav e badge pip install
    pos.value = { x: r.width / 2, y: HALF };
  } else {
    // Lato random (sinistra o destra) con altezza random
    const onLeft  = Math.random() < 0.5;
    const xFrac   = onLeft
      ? 0.08 + Math.random() * 0.10   // 8–18 % da sinistra
      : 0.82 + Math.random() * 0.10;   // 82–92 % da sinistra
    const yMin = HALF + 40;
    const yMax = r.height - HALF - 40;
    pos.value = {
      x: r.width  * xFrac,
      y: yMin + Math.random() * (yMax - yMin),
    };
  }
}

function clientXY(e) {
  return e.touches
    ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
    : { x: e.clientX,            y: e.clientY };
}

function onDragStart(e) {
  isDragging.value = true;
  const { x: cx, y: cy } = clientXY(e);
  const r = heroRect();
  dragOffset.value = {
    x: cx - r.left - pos.value.x,
    y: cy - r.top  - pos.value.y,
  };
}

function onDragMove(e) {
  if (!isDragging.value) return;
  e.preventDefault();
  const { x: cx, y: cy } = clientXY(e);
  const r = heroRect();
  pos.value = {
    x: Math.max(HALF, Math.min(r.width  - HALF, cx - r.left - dragOffset.value.x)),
    y: Math.max(HALF, Math.min(r.height - HALF, cy - r.top  - dragOffset.value.y)),
  };
}

function onDragEnd() { isDragging.value = false; }

const mascotStyle = computed(() => ({
  left:      pos.value.x + 'px',
  top:       pos.value.y + 'px',
  transform: 'translate(-50%, -50%)',
}));

onMounted(() => {
  initPos();
  window.addEventListener('mousemove',  onDragMove);
  window.addEventListener('mouseup',    onDragEnd);
  window.addEventListener('touchmove',  onDragMove, { passive: false });
  window.addEventListener('touchend',   onDragEnd);
  window.addEventListener('resize',     initPos);
});

onUnmounted(() => {
  window.removeEventListener('mousemove',  onDragMove);
  window.removeEventListener('mouseup',    onDragEnd);
  window.removeEventListener('touchmove',  onDragMove);
  window.removeEventListener('touchend',   onDragEnd);
  window.removeEventListener('resize',     initPos);
});
// ─────────────────────────────────────────────────────────────────
const line1 = 'Background workers';
const line2 = 'that just survive.';

const stats = [
  { val: '0',     label: 'Infrastructure needed' },
  { val: '4',     label: 'API methods' },
  { val: '< 60s', label: 'Setup time' },
  { val: 'MIT',   label: 'License' },
];

const badges = [
  { href: 'https://pypi.org/project/crazy-workers/', src: 'https://img.shields.io/pypi/v/crazy-workers?style=flat-square&color=00F5FF&labelColor=0E0E2A', alt: 'PyPI' },
  { href: 'https://pypi.org/project/crazy-workers/', src: 'https://img.shields.io/badge/python-3.10%2B-blue?style=flat-square&labelColor=0E0E2A', alt: 'Python 3.10+' },
  { href: 'https://github.com/giovanni-colasanto/crazy-workers/blob/main/LICENSE', src: 'https://img.shields.io/badge/License-MIT-BF00FF?style=flat-square&labelColor=0E0E2A', alt: 'MIT' },
  { href: 'https://github.com/giovanni-colasanto/crazy-workers/actions', src: 'https://img.shields.io/github/actions/workflow/status/giovanni-colasanto/crazy-workers/ci.yml?style=flat-square&label=CI&labelColor=0E0E2A', alt: 'CI' },
];

function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }

function copyInstall() {
  navigator.clipboard.writeText('pip install crazy-workers');
  copied.value = true;
}
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
}

/* orbs */
.orb { position: absolute; border-radius: 50%; pointer-events: none; }
.orb-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%);
  top: -100px; left: -200px;
  animation: float-slow 12s ease-in-out infinite;
}
.orb-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(191,0,255,0.08) 0%, transparent 70%);
  bottom: -80px; right: -150px;
  animation: float-med 9s ease-in-out infinite 2s;
}
.orb-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(255,0,128,0.06) 0%, transparent 70%);
  top: 40%; left: 60%;
  animation: float-slow 15s ease-in-out infinite 4s;
}

/* scanline sweep */
.scan-line {
  position: absolute;
  left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent);
  animation: scanline 6s linear infinite;
  pointer-events: none;
  z-index: 2;
}

/* content */
.hero-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;       /* flexbox centering — più affidabile di text-align */
  text-align: center;
  max-width: 820px;
  width: 100%;
  padding: 0 24px 80px;
  /* NO overflow:hidden qui — tagliava il lato sinistro */
}

/* install badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0,245,255,0.05);
  border: 1px solid rgba(0,245,255,0.2);
  border-radius: 999px;
  padding: 6px 14px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #00F5FF;
  cursor: pointer;
  margin-bottom: 28px;
  transition: background 0.2s, box-shadow 0.2s;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
.hero-badge:hover {
  background: rgba(0,245,255,0.1);
  box-shadow: 0 0 20px rgba(0,245,255,0.2);
}
.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #00F5FF;
  box-shadow: 0 0 6px #00F5FF;
  animation: neon-pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

/* title */
.hero-title {
  font-size: clamp(1.6rem, 5.5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: clamp(-0.5px, -0.03em, -1.5px);
  color: #E0E0FF;
  margin: 0 0 24px;
}
.hero-title-line1 {
  white-space: nowrap;
  display: inline-block;
}

/* sub */
.hero-sub {
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  color: rgba(224,224,255,0.9);
  line-height: 1.7;
  max-width: 620px;
  margin: 0 auto 36px;
}

/* CTAs */
.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 40px;
}
@media (max-width: 400px) {
  .hero-ctas { flex-direction: column; align-items: stretch; }
  .hero-ctas a, .hero-ctas button { justify-content: center; }
}

.cta-primary, .cta-secondary, .cta-accent {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}
.cta-primary:hover, .cta-secondary:hover, .cta-accent:hover {
  transform: translateY(-2px);
}

.cta-primary {
  background: linear-gradient(135deg, #00C8D4, #00F5FF);
  color: #07071A;
  box-shadow: 0 4px 20px rgba(0,245,255,0.35);
}
.cta-primary:hover { box-shadow: 0 8px 30px rgba(0,245,255,0.55); }

.cta-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent, rgba(255,255,255,0.2), transparent);
  background-size: 200% 200%;
  animation: shimmer 2s linear infinite;
}

.cta-secondary {
  background: transparent;
  color: #E0E0FF;
  border: 1px solid rgba(224,224,255,0.25);
}
.cta-secondary:hover {
  border-color: rgba(0,245,255,0.5);
  color: #00F5FF;
  box-shadow: 0 4px 20px rgba(0,245,255,0.12);
}

.cta-accent {
  background: rgba(255,0,128,0.12);
  color: #FF0080;
  border: 1px solid rgba(255,0,128,0.3);
}
.cta-accent:hover {
  background: rgba(255,0,128,0.2);
  box-shadow: 0 4px 20px rgba(255,0,128,0.25);
}

/* stats */
.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 28px;
}
.stat-item {
  border: 1px solid rgba(0,245,255,0.12);
  background: rgba(0,245,255,0.03);
  border-radius: 10px;
  padding: 10px 16px;
  min-width: 90px;
}
.stat-val {
  font-size: 1.3rem;
  font-weight: 900;
  letter-spacing: -0.5px;
  line-height: 1;
  margin-bottom: 4px;
}
.stat-lbl {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: rgba(224,224,255,0.8);
}
@media (max-width: 480px) {
  .hero-stats { gap: 8px; }
  .stat-item { padding: 8px 12px; min-width: 80px; }
  .stat-val { font-size: 1.1rem; }
}

/* badges */
.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  width: 100%;
  overflow: hidden;
}
.badge-img {
  display: inline-flex;
  flex-shrink: 0;
}
.badge-img img {
  height: 18px;
  width: auto;
  display: block;
  border-radius: 4px;
}

/* ── Draggable mascot ── */
.hero-mascot-wrap {
  position: absolute;
  z-index: 10;
  width: 260px;
  height: 260px;
  cursor: grab;
  touch-action: none;
  user-select: none;
  /* left/top/transform vengono da JS — centra il wrapper sul punto pos */
}
.hero-mascot-wrap.dragging { cursor: grabbing; }
.hero-mascot-wrap.dragging .mascot-inner { animation-play-state: paused; }

.mascot-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float-slow 9s ease-in-out infinite;
}

/* decorative spinning rings */
.mascot-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid transparent;
  animation: spin-slow linear infinite;
}
.mascot-ring-outer {
  width: 260px; height: 260px;
  border-color: rgba(0,245,255,0.15);
  border-top-color: rgba(0,245,255,0.6);
  animation-duration: 8s;
}
.mascot-ring-inner {
  width: 225px; height: 225px;
  border-color: rgba(191,0,255,0.12);
  border-bottom-color: rgba(191,0,255,0.5);
  animation-duration: 5s;
  animation-direction: reverse;
}
.mascot-frame {
  width: 200px; height: 200px;
  border-radius: 50%;
  overflow: hidden;
  background: #ffffff;
  box-shadow:
    0 0 0 2px rgba(0,245,255,0.5),
    0 0 30px rgba(0,245,255,0.5),
    0 0 60px rgba(191,0,255,0.3),
    0 0 100px rgba(255,0,128,0.15);
}
.mascot-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center 44%;
  display: block;
  transform: scale(1.25);
}
/* su mobile il mascot è in alto → lascia spazio al content */
@media (max-width: 680px) {
  .hero-content { padding-top: 280px; }
}

/* bottom fade */
.hero-fade {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 120px;
  background: linear-gradient(to bottom, transparent, #07071A);
  pointer-events: none;
  z-index: 2;
}
</style>
