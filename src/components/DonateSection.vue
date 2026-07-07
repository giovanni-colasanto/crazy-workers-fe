<template>
  <section id="donate" class="donate-section section-glow-top">
    <div class="orb" style="width:600px;height:300px;background:radial-gradient(ellipse,rgba(255,0,128,0.07) 0%,transparent 70%);top:0;left:50%;transform:translateX(-50%);pointer-events:none;position:absolute" />

    <div class="donate-inner">
      <div class="reveal section-label">
        <span class="label-line" /><span>SUPPORT THE PROJECT</span><span class="label-line" />
      </div>
      <h2 class="reveal reveal-delay-1 section-title">
        Keep the lights on
      </h2>
      <p class="reveal reveal-delay-2 section-sub">
        crazy-workers is free and open-source. If it saves you time or powers your project,
        a small donation keeps development active.
      </p>

      <div class="donate-cards">
        <!-- GitHub Sponsors -->
        <div class="reveal reveal-delay-2 donate-card donate-card--primary">
          <div class="dc-badge">RECOMMENDED</div>
          <div class="dc-icon">
            <v-icon icon="mdi-github" size="36" color="#E0E0FF" />
          </div>
          <div class="dc-title">GitHub Sponsors</div>
          <div class="dc-desc">Recurring or one-time support directly on GitHub. Helps track the project's sustainability.</div>
          <a class="dc-btn primary" href="https://github.com/sponsors/Vanni-broUser" target="_blank">
            Sponsor on GitHub
            <span class="btn-shine" />
          </a>
        </div>

        <!-- Stripe -->
        <div class="reveal reveal-delay-3 donate-card donate-card--secondary">
          <div class="dc-icon">
            <v-icon icon="mdi-credit-card" size="36" color="#00F5FF" />
          </div>
          <div class="dc-title">Stripe</div>
          <div class="dc-desc">Secure one-time or recurring donations via Stripe. Multiple payment methods supported.</div>
          <a class="dc-btn secondary" href="https://buy.stripe.com/test_6oUcN5fzqazQ9eYezzgYU00" target="_blank">
            Donate via Stripe
          </a>
        </div>
      </div>

      <!-- Star -->
      <div class="reveal reveal-delay-4 star-section">
        <div class="star-text">Even a ⭐ star on GitHub helps — it increases visibility and shows appreciation.</div>
        <a class="star-btn" href="https://github.com/Vanni-broUser/crazy-workers" target="_blank">
          <v-icon icon="mdi-star-outline" size="16" color="#FFB800" />
          Star on GitHub
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'
useScrollReveal()
</script>

<style scoped>
.donate-section {
  position: relative; overflow: hidden; padding: 100px 0;
}
.donate-inner {
  max-width: 780px; margin: 0 auto; padding: 0 24px; text-align: center;
}

.section-label {
  display: flex; align-items: center; justify-content: center;
  gap: 12px; font-size: 0.7rem; font-weight: 700;
  letter-spacing: 3px; color: #FF0080; margin-bottom: 20px;
}
.label-line { flex:1;max-width:80px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,0,128,.3)); }
.label-line:last-child { background:linear-gradient(90deg,rgba(255,0,128,.3),transparent); }

.section-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900; color: #E0E0FF; margin: 0 0 16px;
}
.section-sub {
  color: rgba(224,224,255,0.85); font-size: 1rem; line-height: 1.7;
  max-width: 480px; margin: 0 auto 48px;
}

.donate-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;
}
@media (max-width: 620px) { .donate-cards { grid-template-columns: 1fr; gap: 14px; } }

.donate-card {
  padding: 32px 28px;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  transition: box-shadow 0.3s, transform 0.2s;
}
.donate-card:hover { transform: translateY(-4px); }

/* top shimmer line */
.donate-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
}

.donate-card--primary {
  background:
    linear-gradient(135deg, rgba(255,0,128,0.07) 0%, rgba(191,0,255,0.05) 50%, transparent 100%),
    #0a0a20;
  border: 1px solid rgba(255,0,128,0.2);
  box-shadow: inset 0 0 40px rgba(255,0,128,0.04);
}
.donate-card--primary::before {
  background: linear-gradient(90deg, transparent, rgba(255,0,128,0.4), rgba(191,0,255,0.4), transparent);
}
.donate-card--primary:hover {
  border-color: rgba(255,0,128,0.45);
  box-shadow:
    0 8px 40px rgba(255,0,128,0.15),
    inset 0 0 40px rgba(255,0,128,0.06);
}

.donate-card--secondary {
  background:
    linear-gradient(135deg, rgba(0,245,255,0.05) 0%, transparent 60%),
    #0a0a20;
  border: 1px solid rgba(0,245,255,0.12);
  box-shadow: inset 0 0 30px rgba(0,245,255,0.02);
}
.donate-card--secondary::before {
  background: linear-gradient(90deg, transparent, rgba(0,245,255,0.25), transparent);
}
.donate-card--secondary:hover {
  border-color: rgba(0,245,255,0.3);
  box-shadow:
    0 8px 40px rgba(0,245,255,0.08),
    inset 0 0 30px rgba(0,245,255,0.04);
}

.dc-badge {
  position: absolute;
  top: -1px; right: 16px;
  background: linear-gradient(135deg, #FF0080, #BF00FF);
  color: #fff;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 1px;
  padding: 3px 10px;
  border-radius: 0 0 6px 6px;
}

.dc-icon { margin-bottom: 16px; }
.dc-title { font-size: 1.1rem; font-weight: 800; color: #E0E0FF; margin-bottom: 10px; }
.dc-desc { font-size: 0.82rem; color: rgba(224,224,255,0.85); line-height: 1.6; margin-bottom: 24px; }

.dc-btn {
  display: block;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.dc-btn:hover { transform: translateY(-2px); }

.dc-btn.primary {
  background: linear-gradient(135deg, #CC0066, #FF0080);
  color: #fff;
  box-shadow: 0 4px 20px rgba(255,0,128,0.35);
}
.dc-btn.primary:hover { box-shadow: 0 8px 30px rgba(255,0,128,0.55); }

.dc-btn.secondary {
  background: rgba(0,245,255,0.08);
  color: #00F5FF;
  border: 1px solid rgba(0,245,255,0.25);
}
.dc-btn.secondary:hover { background: rgba(0,245,255,0.14); box-shadow: 0 4px 20px rgba(0,245,255,0.2); }

.btn-shine {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, transparent, rgba(255,255,255,0.15), transparent);
  background-size: 200% 200%;
  animation: shimmer 2.5s linear infinite;
}

.star-section {
  border: 1px solid rgba(255,184,0,0.15);
  background: rgba(255,184,0,0.03);
  border-radius: 12px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}
.star-text {
  font-size: 0.85rem;
  color: rgba(224,224,255,0.85);
}
.star-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 18px; border-radius: 8px;
  border: 1px solid rgba(255,184,0,0.3);
  color: #FFB800; font-size: 0.82rem; font-weight: 700;
  text-decoration: none; background: rgba(255,184,0,0.06);
  transition: all 0.2s; white-space: nowrap;
}
.star-btn:hover {
  background: rgba(255,184,0,0.12);
  box-shadow: 0 4px 16px rgba(255,184,0,0.2);
}
</style>
