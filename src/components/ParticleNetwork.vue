<template>
  <canvas
    ref="canvas"
    class="particle-canvas"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);
let ctx, animId, particles = [], mouse = { x: -9999, y: -9999 };

const COLORS = ['#00F5FF', '#00F5FF', '#00F5FF', '#BF00FF', '#FF0080'];
const MAX_DIST = 130;
const MOUSE_DIST = 120;

class Particle {
  constructor(w, h) { this.reset(w, h); }
  reset(w, h) {
    this.x  = Math.random() * w;
    this.y  = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r  = Math.random() * 1.8 + 0.8;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = Math.random() * 0.5 + 0.3;
  }
  update(w, h) {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < MOUSE_DIST) {
      const force = (MOUSE_DIST - dist) / MOUSE_DIST * 0.6;
      this.vx += (dx / dist) * force * 0.3;
      this.vy += (dy / dist) * force * 0.3;
    }
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > 2) { this.vx = (this.vx / speed) * 2; this.vy = (this.vy / speed) * 2; }
    this.vx *= 0.99; this.vy *= 0.99;
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0)  { this.x = 0;  this.vx *= -1; }
    if (this.x > w)  { this.x = w;  this.vx *= -1; }
    if (this.y < 0)  { this.y = 0;  this.vy *= -1; }
    if (this.y > h)  { this.y = h;  this.vy *= -1; }
  }
  draw(c) {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.globalAlpha = this.alpha;
    c.fill();
    // glow
    c.shadowColor = this.color;
    c.shadowBlur = 8;
    c.fill();
    c.shadowBlur = 0;
  }
}

function initParticles() {
  const w = canvas.value.width;
  const h = canvas.value.height;
  const count = Math.min(Math.floor((w * h) / 12000), 100);
  particles = Array.from({ length: count }, () => new Particle(w, h));
}

function resize() {
  if (!canvas.value) return;
  canvas.value.width  = canvas.value.offsetWidth;
  canvas.value.height = canvas.value.offsetHeight;
  initParticles();
}

function draw() {
  const w = canvas.value.width;
  const h = canvas.value.height;
  ctx.clearRect(0, 0, w, h);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update(w, h);
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < MAX_DIST) {
        const alpha = (1 - d / MAX_DIST) * 0.35;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = particles[i].color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth   = 0.7;
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
  particles.forEach(p => p.draw(ctx));
  animId = requestAnimationFrame(draw);
}

function onMouseMove(e) {
  const rect = canvas.value?.getBoundingClientRect();
  if (!rect) return;
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
}
function onMouseLeave() { mouse.x = -9999; mouse.y = -9999; }

const ro = new ResizeObserver(resize);

onMounted(() => {
  ctx = canvas.value.getContext('2d');
  resize();
  draw();
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseleave', onMouseLeave);
  ro.observe(canvas.value);
});
onUnmounted(() => {
  cancelAnimationFrame(animId);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseleave', onMouseLeave);
  ro.disconnect();
});
</script>

<style scoped>
.particle-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: block;
}
</style>
