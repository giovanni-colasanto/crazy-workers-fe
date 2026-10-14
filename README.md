# crazy-workers — Landing Page

Official landing page for the [crazy-workers](https://github.com/giovanni-colasanto/crazy-workers) Python library.

Built with **Vue 3 + Vite + Vuetify 3 + Pinia**, featuring a cyberpunk dark theme.

---

## Stack

| Tech | Version |
|------|---------|
| Vue 3 | `^3.x` |
| Vite | `^6.x` |
| Vuetify 3 | `^3.x` (custom `cyber` dark theme) |
| Pinia | `^2.x` |
| JetBrains Mono | Google Fonts |

---

## Getting started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Project structure

```
src/
├── components/
│   ├── AppNav.vue          # Fixed top nav bar (desktop + mobile hamburger)
│   ├── HeroSection.vue     # Hero with draggable mascot, pip install badge, stats
│   ├── FeaturesSection.vue # Feature cards grid
│   ├── QuickStartSection.vue # Interactive code walkthrough with syntax highlighting
│   ├── DocsSection.vue     # API reference
│   ├── ContributeSection.vue
│   ├── DonateSection.vue
│   └── FooterSection.vue
├── composables/
│   └── useScrollReveal.js  # IntersectionObserver reveal animations
├── App.vue                 # Root layout + scroll progress bar
├── main.js
└── style.css               # Global tokens, keyframes, utility classes
public/
├── crazy-snake.png         # Mascot (favicon + hero draggable element)
└── crazy-workers-brand.png # Full logo with text (og:image / social sharing)
```

---

## Notable features

- **Draggable mascot** — mouse drag on desktop, touch drag on mobile; random left/right spawn on desktop, centered top on mobile
- **Syntax highlighting** — custom regex highlighter using unquoted `data-t` attributes to avoid cascade collisions
- **Mobile-first nav** — `position: fixed; left: 0; right: 0` (avoids scrollbar-width overflow), hamburger drawer on mobile
- **Scroll progress bar** — thin gradient bar at the top of the viewport
- **Scroll reveal** — `IntersectionObserver`-based fade-in for all sections

---

## Credits

- Library by [GioVanni Colasanto](https://github.com/giovanni-colasanto)
- Website powered by [Fast-Site](https://fastsite.it)

---
