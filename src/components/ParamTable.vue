<template>
  <div class="table-wrap">
    <div class="param-table">
      <div class="param-row head">
        <span>Parameter</span><span>Type</span><span>Default</span><span>Description</span>
      </div>
      <div
        v-for="p in rows"
        :key="p.name"
        class="param-row"
      >
        <code class="p-name">{{ p.name }}</code>
        <span class="p-type">{{ p.type }}</span>
        <code class="p-def">{{ p.def }}</code>
        <span class="p-desc">{{ p.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ rows: { type: Array, required: true } });
</script>

<style scoped>
.table-wrap { overflow-x: auto; margin: 0 0 18px; max-width: 820px; }
.param-table {
  min-width: 560px;
  border: 1px solid rgba(0,245,255,0.12);
  border-radius: 10px;
  overflow: hidden;
  font-size: 0.8rem;
}
.param-row {
  display: grid;
  grid-template-columns: 120px 110px 92px 1fr;
  gap: 10px;
  padding: 9px 14px;
  align-items: baseline;
}
.param-row:not(.head):nth-child(even) { background: rgba(0,245,255,0.03); }
.param-row.head {
  font-size: 0.64rem; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; color: rgba(224,224,255,0.82);
  background: rgba(0,245,255,0.05);
}
.p-name { font-family: 'JetBrains Mono', monospace; color: #BF00FF; font-size: 0.78rem; word-break: break-word; }
.p-type { color: rgba(0,245,255,0.75); font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; }
.p-def  { font-family: 'JetBrains Mono', monospace; color: #FFB800; font-size: 0.74rem; background: none; padding: 0; }
.p-desc { color: rgba(224,224,255,0.82); line-height: 1.55; }

@media (max-width: 560px) {
  .param-table { min-width: 0; }
  .param-row { grid-template-columns: 1fr; gap: 3px; padding: 12px 14px; }
  .param-row.head { display: none; }
  .param-row:not(.head) { border-bottom: 1px solid rgba(0,245,255,0.07); }
  .p-type::before { content: 'type: '; color: rgba(224,224,255,0.3); font-size: 0.65rem; }
  .p-def::before  { content: 'default: '; color: rgba(224,224,255,0.3); font-size: 0.65rem; }
  .p-desc { margin-top: 3px; }
}
</style>
