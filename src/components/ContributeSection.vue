<template>
  <section
    id="contribute"
    class="contrib-section section-glow-top cyber-grid"
  >
    <div
      class="orb"
      style="width:500px;height:500px;background:radial-gradient(circle,rgba(191,0,255,0.07) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;position:absolute"
    />

    <div class="contrib-inner">
      <div class="reveal section-label">
        <span class="label-line" /><span>OPEN SOURCE</span><span class="label-line" />
      </div>
      <h2 class="reveal reveal-delay-1 section-title">
        Looking for <span class="gradient-text">collaborators</span>
      </h2>
      <p class="reveal reveal-delay-2 section-sub">
        crazy-workers is a solo project that could use more hands.
        Bug fixes, features, docs, or tests — every contribution matters.
      </p>

      <div class="areas-grid">
        <div
          v-for="(a, i) in areas"
          :key="a.title"
          class="reveal area-card"
          :class="`reveal-delay-${i + 1}`"
          :style="`--c:${a.color}`"
        >
          <div class="area-icon">
            <v-icon
              :icon="a.icon"
              :color="a.color"
              size="22"
            />
          </div>
          <div class="area-title">
            {{ a.title }}
          </div>
          <div class="area-desc">
            {{ a.desc }}
          </div>
        </div>
      </div>

      <div class="reveal reveal-delay-3 contrib-ctas">
        <a
          class="contrib-btn primary"
          href="https://github.com/Vanni-broUser/crazy-workers/issues"
          target="_blank"
        >
          <v-icon
            icon="mdi-github"
            size="18"
          />
          Browse open issues
          <span class="btn-shine" />
        </a>
        <a
          class="contrib-btn secondary"
          href="https://github.com/Vanni-broUser/crazy-workers/blob/main/AI.md"
          target="_blank"
        >
          <v-icon
            icon="mdi-book-open-outline"
            size="18"
          />
          Read the standards
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal';
useScrollReveal();

const areas = [
  { icon: 'mdi-bug-outline',         color: '#FF3D71', title: 'Bug fixes',  desc: 'Find and squash issues, improve edge-case handling.' },
  { icon: 'mdi-flask-outline',       color: '#FFB800', title: 'Tests',      desc: 'Expand unit, integration, and edge-case test coverage.' },
  { icon: 'mdi-lightbulb-outline',   color: '#BF00FF', title: 'Features',   desc: 'Async support, metrics, new CLI commands, and more.' },
  { icon: 'mdi-text-box-outline',    color: '#00F5FF', title: 'Docs',       desc: 'Improve the README, CLI.md, docstrings, and examples.' },
];
</script>

<style scoped>
.contrib-section {
  position: relative;
  overflow: hidden;
  padding: 100px 0;
}
.contrib-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
}

.section-label {
  display: flex; align-items: center; justify-content: center;
  gap: 12px; font-size: 0.7rem; font-weight: 700;
  letter-spacing: 3px; color: #BF00FF; margin-bottom: 20px;
}
.label-line { flex:1;max-width:80px;height:1px;background:linear-gradient(90deg,transparent,rgba(191,0,255,.3)); }
.label-line:last-child { background:linear-gradient(90deg,rgba(191,0,255,.3),transparent); }

.section-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900; color: #E0E0FF; margin: 0 0 16px;
}
.section-sub {
  color: rgba(224,224,255,0.85); font-size: 1rem; line-height: 1.7;
  max-width: 520px; margin: 0 auto 48px;
}

.areas-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 40px;
}
@media (max-width: 800px) { .areas-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .areas-grid { grid-template-columns: 1fr; } }

.area-card {
  position: relative;
  overflow: hidden;
  padding: 28px 20px;
  text-align: center;
  border-radius: 14px;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%),
    #0a0a20;
  border: 1px solid rgba(255,255,255,0.06);
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.15s ease;
}

.area-card:hover {
  border-color: color-mix(in srgb, var(--c) 45%, transparent);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--c) 18%, transparent),
    0 8px 36px color-mix(in srgb, var(--c) 10%, transparent),
    inset 0 0 24px color-mix(in srgb, var(--c) 5%, transparent);
  transform: translateY(-4px);
}

.area-card::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--c) 35%, transparent), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.area-card:hover::after { opacity: 1; }

.area-icon {
  width: 48px; height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--c) 16%, transparent),
    color-mix(in srgb, var(--c) 6%, transparent)
  );
  border: 1px solid color-mix(in srgb, var(--c) 30%, transparent);
  box-shadow: 0 0 14px color-mix(in srgb, var(--c) 14%, transparent);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
}

.area-title {
  font-size: 0.92rem; font-weight: 700; color: #E0E0FF; margin-bottom: 8px;
}
.area-desc {
  font-size: 0.78rem; color: rgba(224,224,255,0.85); line-height: 1.65;
}

.contrib-ctas {
  display: flex; flex-wrap: wrap; gap: 14px; justify-content: center;
}

.contrib-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: 8px; font-size: 0.9rem;
  font-weight: 700; cursor: pointer; text-decoration: none;
  position: relative; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;
}
.contrib-btn:hover { transform: translateY(-2px); }

.contrib-btn.primary {
  background: linear-gradient(135deg, #8000CC, #BF00FF);
  color: #fff;
  box-shadow: 0 4px 20px rgba(191,0,255,0.35);
}
.contrib-btn.primary:hover { box-shadow: 0 8px 30px rgba(191,0,255,0.55); }

.btn-shine {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, transparent, rgba(255,255,255,0.15), transparent);
  background-size: 200% 200%;
  animation: shimmer 2.5s linear infinite;
}

.contrib-btn.secondary {
  background: transparent;
  color: rgba(224,224,255,0.7);
  border: 1px solid rgba(224,224,255,0.2);
}
.contrib-btn.secondary:hover {
  border-color: rgba(191,0,255,0.5);
  color: #BF00FF;
}
</style>
