<template>
  <section id="docs" class="docs-section section-glow-top">
    <div class="orb" style="width:350px;height:350px;background:radial-gradient(circle,rgba(0,245,255,0.06) 0%,transparent 70%);bottom:-80px;left:-80px;pointer-events:none;position:absolute" />

    <div class="docs-inner">
      <div class="reveal section-label">
        <span class="label-line" /><span>API REFERENCE</span><span class="label-line" />
      </div>
      <h2 class="reveal reveal-delay-1 section-title">
        <span class="gradient-text">Documentation</span>
      </h2>
      <p class="reveal reveal-delay-2 section-sub">
        Full docs on
        <a href="https://github.com/Vanni-broUser/crazy-workers" target="_blank" class="doc-link">GitHub</a>
        and
        <a href="https://pypi.org/project/crazy-workers/" target="_blank" class="doc-link">PyPI</a>.
      </p>

      <div class="api-grid">
        <div
          v-for="(m, i) in methods"
          :key="m.name"
          class="reveal api-card"
          :class="`reveal-delay-${(i % 3) + 1}`"
        >
          <div class="api-header">
            <code class="api-name">{{ m.name }}</code>
          </div>
          <p class="api-desc">{{ m.desc }}</p>
          <div v-if="m.params.length" class="api-table">
            <div class="api-row header">
              <span>Param</span><span>Type</span><span>Description</span>
            </div>
            <div v-for="p in m.params" :key="p.name" class="api-row">
              <code class="p-name">{{ p.name }}</code>
              <span class="p-type">{{ p.type }}</span>
              <span class="p-desc">{{ p.desc }}</span>
            </div>
          </div>
          <div v-if="m.returns" class="api-returns">
            <span class="ret-label">returns</span>
            <code class="ret-val">{{ m.returns }}</code>
          </div>
        </div>
      </div>

      <div class="reveal reveal-delay-3 docs-ctas">
        <a class="doc-btn" href="https://github.com/Vanni-broUser/crazy-workers/blob/main/CLI.md" target="_blank">
          <v-icon icon="mdi-console" size="16" /> CLI Reference
        </a>
        <a class="doc-btn secondary" href="https://github.com/Vanni-broUser/crazy-workers/blob/main/AI.md" target="_blank">
          <v-icon icon="mdi-code-braces" size="16" /> Coding Standards
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'
useScrollReveal()

const methods = [
  {
    name: 'WorkerManager(workers_dir, create_dir)',
    desc: 'Initialise the manager pointing at the folder containing your .py worker scripts.',
    params: [
      { name: 'workers_dir', type: 'str',  desc: 'Directory containing worker .py scripts' },
      { name: 'create_dir',  type: 'bool', desc: 'Auto-create the folder if missing (default: True)' },
    ],
    returns: null,
  },
  {
    name: 'start_worker(worker_type, worker_key, parameters, env)',
    desc: 'Spawn a new background process running the named worker script.',
    params: [
      { name: 'worker_type', type: 'str',   desc: 'Filename (without .py) of the worker' },
      { name: 'worker_key',  type: 'str?',  desc: 'Unique ID; defaults to worker_type' },
      { name: 'parameters',  type: 'dict?', desc: 'JSON-serialisable dict → sys.argv[1]' },
      { name: 'env',         type: 'dict?', desc: 'Extra env vars injected into the process' },
    ],
    returns: '(bool, dict | str)',
  },
  {
    name: 'stop_worker(worker_key)',
    desc: 'Gracefully terminate a worker (SIGTERM → SIGKILL after timeout).',
    params: [{ name: 'worker_key', type: 'str', desc: 'Unique identifier of the worker to stop' }],
    returns: '(bool, str)',
  },
  {
    name: 'list_workers()',
    desc: 'Return all known workers including RUNNING, STOPPED, CRASHED, and NEVER_STARTED.',
    params: [],
    returns: 'list[dict]',
  },
  {
    name: 'recover_workers()',
    desc: 'Restart any worker whose DB status is RUNNING but whose process is dead. File-locked for Gunicorn safety.',
    params: [],
    returns: 'list[str]',
  },
  {
    name: 'dispose()',
    desc: 'Close DB connection and clear internal references. Background workers keep running independently.',
    params: [],
    returns: 'None',
  },
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
  color: rgba(224,224,255,0.5); margin: 0 0 48px;
}
.doc-link {
  color: #00F5FF; text-decoration: none;
}
.doc-link:hover { text-decoration: underline; }

.api-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  text-align: left;
  margin-bottom: 40px;
}
@media (max-width: 700px) { .api-grid { grid-template-columns: 1fr; } }

.api-card {
  padding: 24px;
  border-radius: 14px;
  background:
    linear-gradient(135deg, rgba(0,245,255,0.03) 0%, transparent 50%),
    #090918;
  border: 1px solid rgba(0,245,255,0.1);
  transition: border-color 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}
.api-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,245,255,0.25), transparent);
}
.api-card:hover {
  border-color: rgba(0,245,255,0.25);
  box-shadow: 0 4px 30px rgba(0,245,255,0.07), inset 0 0 20px rgba(0,245,255,0.03);
}

.api-header { margin-bottom: 10px; }
.api-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: #00F5FF;
  word-break: break-all;
}

.api-desc {
  font-size: 0.82rem;
  color: rgba(224,224,255,0.5);
  line-height: 1.6;
  margin: 0 0 14px;
}

.api-table { font-size: 0.75rem; }
.api-row {
  display: grid;
  grid-template-columns: 110px 60px 1fr;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
}
.api-row.header {
  font-size: 0.63rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: rgba(224,224,255,0.25);
  text-transform: uppercase;
}
.api-row:not(.header):nth-child(even) { background: rgba(0,245,255,0.03); }

.p-name { font-family: 'JetBrains Mono',monospace; color: #BF00FF; font-size: 0.74rem; word-break: break-all; }
.p-type { color: rgba(0,245,255,0.6); }
.p-desc { color: rgba(224,224,255,0.4); }

/* On small screens switch to a stacked card layout */
@media (max-width: 520px) {
  .api-row { grid-template-columns: 1fr; gap: 2px; padding: 8px; }
  .api-row.header { display: none; }
  .api-row:not(.header) { border: 1px solid rgba(0,245,255,0.07); border-radius: 6px; margin-bottom: 6px; }
  .p-type::before { content: 'type: '; color: rgba(224,224,255,0.25); font-size: 0.65rem; }
  .p-desc::before { content: '→ '; color: rgba(224,224,255,0.2); }
}

.api-returns {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.ret-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(224,224,255,0.25);
}
.ret-val {
  font-family: 'JetBrains Mono',monospace;
  font-size: 0.75rem;
  color: #00FF88;
}

.docs-ctas {
  display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;
}
.doc-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid rgba(0,245,255,0.3);
  color: #00F5FF;
  background: rgba(0,245,255,0.05);
  transition: all 0.2s;
}
.doc-btn:hover {
  background: rgba(0,245,255,0.12);
  box-shadow: 0 4px 20px rgba(0,245,255,0.15);
}
.doc-btn.secondary {
  color: #BF00FF;
  border-color: rgba(191,0,255,0.3);
  background: rgba(191,0,255,0.05);
}
.doc-btn.secondary:hover { background: rgba(191,0,255,0.12); box-shadow: 0 4px 20px rgba(191,0,255,0.15); }
</style>
