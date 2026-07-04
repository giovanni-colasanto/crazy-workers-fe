<template>
  <div class="terminal code-wrap">
    <div class="terminal-bar">
      <span class="terminal-dot" style="background:#FF5F57" />
      <span class="terminal-dot" style="background:#FFBD2E" />
      <span class="terminal-dot" style="background:#28CA41" />
      <span class="terminal-filename">{{ filename || (lang === 'bash' ? 'terminal' : 'python') }}</span>
      <button class="term-copy" @click="copy" :title="copied ? 'Copied!' : 'Copy'">
        <v-icon :icon="copied ? 'mdi-check' : 'mdi-content-copy'" size="14"
                :color="copied ? '#00FF88' : 'rgba(224,224,255,0.4)'" />
      </button>
    </div>
    <pre class="terminal-pre code-block" v-html="rendered" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { highlight } from '../composables/useHighlight'

const props = defineProps({
  code:     { type: String, required: true },
  lang:     { type: String, default: 'python' },
  filename: { type: String, default: '' },
})

const rendered = computed(() => highlight(props.code.trim(), props.lang))
const copied = ref(false)

function copy() {
  navigator.clipboard.writeText(props.code.trim())
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<style scoped>
.code-wrap { margin: 0; }
.terminal-filename {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: rgba(224,224,255,0.35);
  margin-left: 8px;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.term-copy {
  background: none; border: none; cursor: pointer;
  padding: 2px 4px; border-radius: 4px;
  transition: background 0.2s; display: flex; align-items: center;
}
.term-copy:hover { background: rgba(255,255,255,0.05); }
.terminal-pre {
  color: #C8C8F0;
  font-size: 0.8rem;
  -webkit-overflow-scrolling: touch;
}
@media (max-width: 600px) {
  .terminal-pre { font-size: 0.72rem; padding: 14px 16px; }
}
</style>
