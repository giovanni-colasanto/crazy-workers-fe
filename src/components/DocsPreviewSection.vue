<template>
  <section id="docs" class="docs-section section-glow-top">
    <div class="orb" style="width:350px;height:350px;background:radial-gradient(circle,rgba(0,245,255,0.06) 0%,transparent 70%);bottom:-80px;left:-80px;pointer-events:none;position:absolute" />

    <div class="docs-inner">
      <div class="reveal section-label">
        <span class="label-line" /><span>DOCUMENTATION</span><span class="label-line" />
      </div>
      <h2 class="reveal reveal-delay-1 section-title">
        Everything, <span class="gradient-text">documented</span>
      </h2>
      <p class="reveal reveal-delay-2 section-sub">
        A dedicated docs page covers the full Python API, the CLI, backend integration,
        automatic boot-restore, testing, and more — with copy-paste examples for each.
      </p>

      <div class="topics-grid">
        <RouterLink
          v-for="(t, i) in topics"
          :key="t.title"
          :to="t.to"
          class="reveal topic-card"
          :class="`reveal-delay-${(i % 3) + 1}`"
          :style="`--c:${t.color}`"
        >
          <div class="tc-icon">
            <v-icon :icon="t.icon" :color="t.color" size="20" />
          </div>
          <div class="tc-body">
            <div class="tc-title">{{ t.title }}</div>
            <div class="tc-desc">{{ t.desc }}</div>
          </div>
          <v-icon icon="mdi-arrow-top-right" size="16" class="tc-arrow" />
        </RouterLink>
      </div>

      <div class="reveal reveal-delay-3 docs-ctas">
        <RouterLink class="doc-btn primary" to="/docs">
          <v-icon icon="mdi-book-open-variant" size="18" /> Open full documentation
          <span class="btn-shine" />
        </RouterLink>
        <a class="doc-btn secondary" href="https://github.com/Vanni-broUser/crazy-workers" target="_blank">
          <v-icon icon="mdi-github" size="16" /> View on GitHub
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'
useScrollReveal()

const topics = [
  { icon: 'mdi-code-braces',          color: '#00F5FF', title: 'Python API',          desc: 'WorkerManager and every method, parameter, and return value.',          to: '/docs#api' },
  { icon: 'mdi-console',              color: '#BF00FF', title: 'CLI Reference',       desc: 'status, start, stop, params — plus workers-dir discovery.',             to: '/docs#cli' },
  { icon: 'mdi-database-sync-outline',color: '#FF0080', title: 'Backend Integration', desc: 'Co-locate tables in your DB, inject env, auto-recover on boot.',         to: '/docs#backend' },
  { icon: 'mdi-restart',             color: '#FFB800', title: 'Boot-Restore',         desc: 'Per-user OS hooks bring workers back after a reboot.',                   to: '/docs#boot' },
  { icon: 'mdi-flask-outline',       color: '#00FF88', title: 'Testing',              desc: 'FakeBackend and polling helpers for fast, non-flaky tests.',            to: '/docs#testing' },
  { icon: 'mdi-shield-check-outline',color: '#00F5FF', title: 'Security & Logs',      desc: 'Path-traversal defence, PID-reuse safety, per-worker logs.',             to: '/docs#security' },
]
</script>

<style scoped>
.docs-section {
  position: relative;
  padding: 100px 0;
  overflow: hidden;
}
.docs-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
}

.section-label {
  display: flex; align-items: center; justify-content: center;
  gap: 12px; font-size: 0.7rem; font-weight: 700;
  letter-spacing: 3px; color: #FF0080; margin-bottom: 20px;
}
.label-line { flex:1; max-width:80px; height:1px; background:linear-gradient(90deg,transparent,rgba(255,0,128,.3)); }
.label-line:last-child { background:linear-gradient(90deg,rgba(255,0,128,.3),transparent); }

.section-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900; color: #E0E0FF; margin: 0 0 12px;
}
.section-sub {
  color: rgba(224,224,255,0.85); margin: 0 auto 48px; max-width: 600px; line-height: 1.7;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  text-align: left;
  margin-bottom: 44px;
}
@media (max-width: 860px) { .topics-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .topics-grid { grid-template-columns: 1fr; } }

.topic-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 20px;
  border-radius: 14px;
  text-decoration: none;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%),
    #0a0a20;
  border: 1px solid rgba(255,255,255,0.06);
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.15s ease;
  position: relative;
  overflow: hidden;
}
.topic-card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--c) 45%, transparent);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--c) 18%, transparent),
    0 8px 36px color-mix(in srgb, var(--c) 12%, transparent);
}

.tc-icon {
  flex-shrink: 0;
  width: 40px; height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--c) 16%, transparent),
    color-mix(in srgb, var(--c) 6%, transparent)
  );
  border: 1px solid color-mix(in srgb, var(--c) 30%, transparent);
  display: flex; align-items: center; justify-content: center;
}
.tc-body { flex: 1; min-width: 0; }
.tc-title { font-size: 0.9rem; font-weight: 700; color: #E0E0FF; margin-bottom: 5px; }
.tc-desc  { font-size: 0.78rem; color: rgba(224,224,255,0.85); line-height: 1.55; }
.tc-arrow {
  color: rgba(224,224,255,0.25);
  flex-shrink: 0;
  transition: color 0.2s, transform 0.2s;
}
.topic-card:hover .tc-arrow { color: var(--c); transform: translate(2px,-2px); }

.docs-ctas {
  display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;
}
.doc-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.doc-btn:hover { transform: translateY(-2px); }
.doc-btn.primary {
  background: linear-gradient(135deg, #00C8D4, #00F5FF);
  color: #07071A;
  box-shadow: 0 4px 20px rgba(0,245,255,0.35);
}
.doc-btn.primary:hover { box-shadow: 0 8px 30px rgba(0,245,255,0.55); }
.btn-shine {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, transparent, rgba(255,255,255,0.2), transparent);
  background-size: 200% 200%;
  animation: shimmer 2.5s linear infinite;
}
.doc-btn.secondary {
  background: transparent;
  color: rgba(224,224,255,0.7);
  border: 1px solid rgba(224,224,255,0.2);
}
.doc-btn.secondary:hover { border-color: rgba(0,245,255,0.5); color: #00F5FF; }
</style>
