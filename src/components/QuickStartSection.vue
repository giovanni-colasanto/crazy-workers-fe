<template>
  <section id="quickstart" class="qs-section section-glow-top cyber-grid">
    <div class="qs-inner">
      <div class="reveal section-label">
        <span class="label-line" /><span>GET STARTED IN 2 MINUTES</span><span class="label-line" />
      </div>
      <h2 class="reveal reveal-delay-1 section-title">
        Quick <span class="gradient-text">Start</span>
      </h2>

      <div class="qs-layout">
        <!-- Steps sidebar -->
        <div class="qs-steps reveal reveal-delay-2">
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="qs-step"
            :class="{ active: activeStep === i }"
            @click="selectStep(i)"
          >
            <div class="step-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div>
              <div class="step-title">{{ step.label }}</div>
              <div class="step-desc">{{ step.desc }}</div>
            </div>
          </div>
        </div>

        <!-- Terminal -->
        <div class="qs-terminal reveal reveal-delay-3">
          <div class="terminal">
            <div class="terminal-bar">
              <span class="terminal-dot" style="background:#FF5F57" />
              <span class="terminal-dot" style="background:#FFBD2E" />
              <span class="terminal-dot" style="background:#28CA41" />
              <span class="terminal-filename">{{ steps[activeStep].filename }}</span>
              <button class="term-copy" @click="copyCode" title="Copy">
                <v-icon :icon="justCopied ? 'mdi-check' : 'mdi-content-copy'" size="14" :color="justCopied ? '#00FF88' : 'rgba(224,224,255,0.4)'" />
              </button>
            </div>
            <pre class="terminal-pre code-block" v-html="steps[activeStep].html" />
          </div>

          <!-- Navigation -->
          <div class="step-nav">
            <button class="step-btn" :disabled="activeStep === 0" @click="activeStep--">
              <v-icon icon="mdi-chevron-left" size="16" /> Prev
            </button>
            <div class="step-dots">
              <span
                v-for="(_, i) in steps" :key="i"
                class="step-dot"
                :class="{ active: activeStep === i }"
                @click="selectStep(i)"
              />
            </div>
            <span v-if="activeStep < steps.length - 1" class="scroll-hint-arrow" aria-hidden="true">›</span>
            <button class="step-btn" :disabled="activeStep === steps.length - 1" @click="activeStep++">
              Next <v-icon icon="mdi-chevron-right" size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal()

const activeStep = ref(0)
const justCopied = ref(false)

function selectStep(i) { activeStep.value = i }

function h(code) {
  // Usiamo attributi NON quotati (data-t=kw invece di class="syn-kw"):
  // così né '...' né "..." né \bclass\b potranno mai matchare dentro i tag già inseriti.
  return code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\b(import|from|def|return|if|for|in|as|with|class|True|False|None)\b/g, '<span data-t=kw>$1</span>')
    .replace(/("[^"]*"|'[^']*')/g,                                                     '<span data-t=str>$1</span>')
    .replace(/\b(\d+)\b/g,                                                             '<span data-t=num>$1</span>')
    .replace(/\b(WorkerManager|Flask|request|jsonify)\b/g,                             '<span data-t=cls>$1</span>')
    .replace(/\b(start_worker|stop_worker|list_workers|recover_workers|dispose|create_app|print|json\.loads|time\.sleep)\b/g, '<span data-t=fn>$1</span>')
    .replace(/\$(.*$)/gm,  '<span data-t=cli>$$$1</span>')
    .replace(/(#[^<\n]*)/g, '<span data-t=cm>$1</span>')
}

const steps = [
  {
    label: '1. Create a worker script',
    desc:  'A plain Python file that reads its params from sys.argv[1].',
    filename: 'workers/my_worker.py',
    raw: `import json, sys, time

params = json.loads(sys.argv[1]) if len(sys.argv) > 1 else {}
duration = params.get('duration', 60)

for _ in range(duration):
    time.sleep(1)`,
    get html() { return h(this.raw) },
  },
  {
    label: '2. Manage from Python',
    desc:  'Instantiate WorkerManager pointing at your workers folder.',
    filename: 'app.py',
    raw: `from crazy_workers import WorkerManager

manager = WorkerManager('workers')

# Start a worker
success, result = manager.start_worker(
    'my_worker',
    worker_key='job_1',
    parameters={'duration': 30},
)
print(result['pid'])     # OS process ID
print(result['status'])  # 'RUNNING'

# List all workers
for w in manager.list_workers():
    print(w['worker_key'], w['status'])

# Stop it
manager.stop_worker('job_1')

# Recover crashed workers on startup
restarted = manager.recover_workers()`,
    get html() { return h(this.raw) },
  },
  {
    label: '3. Or use the CLI',
    desc:  'Manage workers directly from your terminal — no code needed.',
    filename: 'terminal',
    raw: `$ crazy-workers list

$ crazy-workers start my_worker \\
    --key job_1 \\
    --params '{"duration": 30}'

$ crazy-workers stop job_1

$ crazy-workers restore`,
    get html() { return h(this.raw) },
  },
  {
    label: '4. Flask integration',
    desc:  'Wire WorkerManager into a Flask app factory.',
    filename: 'app.py',
    raw: `from flask import Flask, request, jsonify
from crazy_workers import WorkerManager

def create_app():
    app = Flask(__name__)
    manager = WorkerManager('workers')

    @app.route('/workers/start', methods=['POST'])
    def start():
        data = request.json
        ok, result = manager.start_worker(
            data['worker_type'],
            worker_key=data.get('worker_key'),
            parameters=data.get('parameters', {}),
        )
        return (jsonify(result), 200) if ok else (jsonify({'error': result}), 400)

    # Restart crashed workers on boot
    manager.recover_workers()
    return app`,
    get html() { return h(this.raw) },
  },
]

function copyCode() {
  navigator.clipboard.writeText(steps[activeStep.value].raw)
  justCopied.value = true
  setTimeout(() => { justCopied.value = false }, 2000)
}
</script>

<style scoped>
.qs-section {
  position: relative;
  padding: 100px 0;
  overflow: hidden;
}
.qs-inner {
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
  color: #BF00FF;
  margin-bottom: 20px;
}
.label-line {
  flex: 1; max-width: 80px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(191,0,255,.3));
}
.label-line:last-child { background: linear-gradient(90deg, rgba(191,0,255,.3), transparent); }

.section-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900;
  letter-spacing: -0.5px;
  color: #E0E0FF;
  margin: 0 0 48px;
}

.qs-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 20px;
  text-align: left;
}
@media (max-width: 780px) {
  .qs-layout { grid-template-columns: 1fr; }
}

/* ── Mobile responsive ── */
@media (max-width: 600px) {
  .qs-section    { padding: 56px 0; }
  .section-title { margin-bottom: 20px; }
  .qs-layout     { gap: 12px; }

  /* grid items: devono poter restringersi */
  .qs-steps, .qs-terminal { min-width: 0; }

  /* Steps → tab-bar orizzontale compatta */
  .qs-step {
    flex-direction: column;
    align-items: center;
    padding: 8px 10px;
    min-width: 72px;
    text-align: center;
    gap: 3px;
    flex-shrink: 0;
  }
  .step-desc  { display: none; }
  .step-num   { padding-top: 0; }
  .step-title { font-size: 0.68rem; white-space: nowrap; margin-bottom: 0; }

  /* Terminal: font più piccolo, scroll orizzontale esplicito */
  .terminal-pre {
    font-size: 0.7rem !important;
    padding: 12px 14px !important;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* Step-nav */
  .step-btn { padding: 5px 10px; font-size: 0.75rem; }
}

/* ── Freccia scroll hint (solo mobile) ── */
.scroll-hint-arrow {
  display: none;
}
@media (max-width: 600px) {
  .scroll-hint-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: 300;
    color: #00F5FF;
    line-height: 1;
    animation: hint-bounce 1.2s ease-in-out infinite;
    text-shadow: 0 0 8px rgba(0,245,255,0.7);
    pointer-events: none;
    margin: 0 2px;
  }
}
@keyframes hint-bounce {
  0%, 100% { transform: translateX(0);    opacity: 1; }
  50%       { transform: translateX(5px); opacity: 0.5; }
}

/* Steps */
.qs-steps { display: flex; flex-direction: column; gap: 4px; }
/* mobile override — inline per battere la @media block nell'ordine compilato */
@media (max-width: 600px) {
  .qs-steps { flex-direction: row !important; gap: 6px !important; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
  .qs-steps::-webkit-scrollbar { display: none; }
}

.qs-step {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.qs-step:hover { background: rgba(0,245,255,0.04); }
.qs-step.active {
  background: rgba(0,245,255,0.06);
  border-color: rgba(0,245,255,0.2);
}

.step-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(0,245,255,0.35);
  padding-top: 2px;
  flex-shrink: 0;
}
.qs-step.active .step-num { color: #00F5FF; }

.step-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(224,224,255,0.55);
  margin-bottom: 3px;
}
.qs-step.active .step-title { color: #E0E0FF; }

.step-desc {
  font-size: 0.75rem;
  color: rgba(224,224,255,0.3);
  line-height: 1.5;
}

/* Terminal */
.qs-terminal { display: flex; flex-direction: column; gap: 16px; min-width: 0; }

.terminal-filename {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: rgba(224,224,255,0.35);
  margin-left: 8px;
  flex: 1;
}

.term-copy {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
}
.term-copy:hover { background: rgba(255,255,255,0.05); }

.terminal-pre {
  color: #C8C8F0;
  min-height: 160px;
  font-size: 0.82rem;
  -webkit-overflow-scrolling: touch;
}
@media (max-width: 500px) {
  .terminal-pre { font-size: 0.72rem; padding: 14px 16px; }
}

/* Nav */
.step-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.step-btn {
  background: rgba(0,245,255,0.05);
  border: 1px solid rgba(0,245,255,0.15);
  color: rgba(224,224,255,0.6);
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
}
.step-btn:hover:not(:disabled) {
  background: rgba(0,245,255,0.1);
  color: #00F5FF;
  border-color: rgba(0,245,255,0.4);
}
.step-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.step-dots { display: flex; gap: 6px; }
.step-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(224,224,255,0.2);
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.step-dot.active {
  background: #00F5FF;
  transform: scale(1.3);
  box-shadow: 0 0 6px #00F5FF;
}
</style>
