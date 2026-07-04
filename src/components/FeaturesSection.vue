<template>
  <section id="features" class="features-section section-glow-top">
    <div class="orb" style="width:400px;height:400px;background:radial-gradient(circle,rgba(191,0,255,0.07) 0%,transparent 70%);top:-100px;right:-100px;pointer-events:none;position:absolute" />

    <div class="features-inner">
      <div class="reveal section-label">
        <span class="label-line" /><span>WHY CRAZY-WORKERS</span><span class="label-line" />
      </div>
      <h2 class="reveal reveal-delay-1 section-title">
        Everything a background worker needs.<br />
        <span class="gradient-text">Nothing it doesn't.</span>
      </h2>
      <p class="reveal reveal-delay-2 section-sub">
        No Celery, no Redis, no infrastructure overhead.<br />
        Just Python processes that restart themselves.
      </p>

      <div class="features-grid">
        <div
          v-for="(f, i) in features"
          :key="f.title"
          ref="cards"
          class="reveal feature-card"
          :class="`reveal-delay-${(i % 3) + 1}`"
          :style="`--c:${f.color}`"
        >
          <div class="fc-glow" />
          <div class="fc-icon">
            <v-icon :icon="f.icon" :color="f.color" size="22" />
          </div>
          <div class="fc-title">{{ f.title }}</div>
          <div class="fc-desc">{{ f.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useTilt } from '../composables/useTilt'

useScrollReveal()

const cards = ref([])

onMounted(() => {
  // attach tilt after DOM settled
  setTimeout(() => {
    cards.value.forEach((el) => {
      if (el) useTilt(el, 8)
    })
  }, 100)
})

const features = [
  { icon: 'mdi-sync',                color: '#BF00FF', title: 'Desired-State Model',    desc: 'Clients declare what should run; a single reconciler daemon owns the processes and drives reality to match — even across containers.' },
  { icon: 'mdi-database-outline',    color: '#00F5FF', title: 'Persistent State',       desc: 'SQLite (or your own DB) tracks desired vs actual status, PIDs, and parameters across app restarts — nothing lost on reload.' },
  { icon: 'mdi-refresh',             color: '#FFB800', title: 'Crash Recovery + Backoff', desc: 'The daemon restarts dead-but-RUNNING workers with exponential backoff, so an instantly-failing worker backs off instead of hot-looping.' },
  { icon: 'mdi-database-sync-outline',color:'#FF0080', title: 'Backend Integration',    desc: 'Co-locate its tables in your database via a shared SQLAlchemy engine, and inject DATABASE_URL into every worker.' },
  { icon: 'mdi-console',             color: '#00F5FF', title: 'Built-in CLI',            desc: 'status, start, stop, params, and the reconcile daemon from the terminal, with interactive prompts and worker auto-discovery.' },
  { icon: 'mdi-flask-outline',       color: '#00FF88', title: 'Testable',               desc: 'Drive orchestration with a FakeBackend — no real processes — plus polling helpers for true end-to-end tests.' },
  { icon: 'mdi-fingerprint',         color: '#BF00FF', title: 'PID-Reuse Safe',         desc: 'Each worker carries an identity token, so a recycled PID is never mistaken for — or killed as — a live worker.' },
  { icon: 'mdi-family-tree',         color: '#FF0080', title: 'Child Process Control',  desc: 'On stop, terminates unmanaged subprocesses while preserving independently-managed nested workers.' },
  { icon: 'mdi-shield-check-outline',color: '#00F5FF', title: 'Security',               desc: 'Safe identifier charset plus a defence-in-depth path check that blocks traversal on Unix and Windows.' },
  { icon: 'mdi-file-document-outline',color:'#BF00FF', title: 'Per-worker Logging',     desc: 'All service files (DB, lock, logs) live in a .service/ folder. Each worker gets its own log file.' },
  { icon: 'mdi-ghost-off-outline',   color: '#FF0080', title: 'Zombie Protection',      desc: 'Uses psutil to distinguish active processes from zombies — no false positives on status checks.' },
  { icon: 'mdi-web',                 color: '#00F5FF', title: 'Framework-agnostic',     desc: 'Works with Flask, FastAPI, Django, or any Python app. Gunicorn-safe via a file-based recovery lock.' },
]
</script>

<style scoped>
.features-section {
  position: relative;
  overflow: hidden;
  padding: 100px 0;
}
.features-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
}

.section-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: #00F5FF;
  margin-bottom: 20px;
}
.label-line {
  flex: 1;
  max-width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00F5FF40);
}
.label-line:last-child {
  background: linear-gradient(90deg, #00F5FF40, transparent);
}

.section-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900;
  letter-spacing: -0.5px;
  color: #E0E0FF;
  margin: 0 0 16px;
  line-height: 1.2;
}

.section-sub {
  color: rgba(224,224,255,0.85);
  font-size: 1rem;
  line-height: 1.7;
  margin: 0 auto 60px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 900px) { .features-grid { grid-template-columns: repeat(2,1fr); gap: 12px; } }
@media (max-width: 540px) { .features-grid { grid-template-columns: 1fr; gap: 10px; } }

.feature-card {
  position: relative;
  overflow: hidden;
  text-align: left;
  padding: 28px 24px;
  cursor: default;
  border-radius: 14px;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%),
    #0a0a20;
  border: 1px solid rgba(255,255,255,0.06);
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.15s ease;
}

.feature-card:hover {
  border-color: color-mix(in srgb, var(--c) 45%, transparent);
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--c) 20%, transparent),
    0 8px 40px color-mix(in srgb, var(--c) 12%, transparent),
    inset 0 0 30px color-mix(in srgb, var(--c) 5%, transparent);
}

/* corner accent */
.feature-card::before {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 60px; height: 60px;
  background: radial-gradient(circle at top right, color-mix(in srgb, var(--c) 18%, transparent), transparent 70%);
  border-radius: 0 14px 0 0;
  transition: opacity 0.3s;
}

/* subtle inner glow that pulses on hover */
.fc-glow {
  position: absolute;
  bottom: -40px; left: 50%;
  transform: translateX(-50%);
  width: 120px; height: 80px;
  background: radial-gradient(ellipse, color-mix(in srgb, var(--c) 20%, transparent), transparent 70%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s;
}
.feature-card:hover .fc-glow { opacity: 1; }

.fc-icon {
  width: 42px; height: 42px;
  border-radius: 10px;
  background: linear-gradient(135deg,
    color-mix(in srgb, var(--c) 16%, transparent),
    color-mix(in srgb, var(--c) 6%, transparent)
  );
  border: 1px solid color-mix(in srgb, var(--c) 30%, transparent);
  box-shadow: 0 0 12px color-mix(in srgb, var(--c) 15%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.fc-title {
  font-size: 0.93rem;
  font-weight: 700;
  color: #E0E0FF;
  margin-bottom: 8px;
  letter-spacing: 0.1px;
}

.fc-desc {
  font-size: 0.81rem;
  color: rgba(224,224,255,0.85);
  line-height: 1.65;
}
</style>
