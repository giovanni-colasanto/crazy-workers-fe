<template>
  <footer class="cyber-footer">
    <div class="footer-line" />
    <div class="footer-inner">
      <div class="footer-top-row">
        <span class="footer-logo gradient-text">[crazy-workers]</span>
        <div class="footer-icons">
          <a
            class="footer-icon"
            href="https://github.com/Vanni-broUser/crazy-workers"
            target="_blank"
            title="GitHub"
          >
            <v-icon
              icon="mdi-github"
              size="18"
            />
          </a>
          <a
            class="footer-icon"
            href="https://pypi.org/project/crazy-workers/"
            target="_blank"
            title="PyPI"
          >
            <v-icon
              icon="mdi-package-variant"
              size="18"
            />
          </a>
        </div>
      </div>
      <div class="footer-bottom-row">
        <span class="footer-copy">MIT License · Made with ❤ by
          <a
            href="https://github.com/Vanni-broUser"
            target="_blank"
            class="footer-link"
          >Vanni-broUser</a>
        </span>
        <span class="footer-sep">·</span>
        <a
          class="footer-powered"
          href="https://fastsite.it"
          target="_blank"
          title="Fast-Site"
        >
          Powered by <span class="footer-powered-name">Fast-Site</span>
          <v-icon
            icon="mdi-web"
            size="13"
            class="footer-powered-icon"
          />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.cyber-footer {
  position: relative;
}
.footer-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,245,255,0.2), rgba(191,0,255,0.2), transparent);
}
.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.footer-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.footer-bottom-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.footer-sep {
  color: rgba(255,255,255,0.3);
  font-size: 0.8rem;
}
.footer-icons {
  display: flex;
  gap: 4px;
}
.footer-logo {
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: -0.3px;
}
.footer-copy {
  font-size: 0.8rem;
  color: #ffffff;
  white-space: nowrap;
}
.footer-link {
  color: #00F5FF;
  text-decoration: none;
}
.footer-link:hover { text-decoration: underline; }



.footer-powered {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.2s;
  white-space: nowrap;
}
.footer-powered-name {
  font-weight: 700;
  color: #ffffff;
}
.footer-powered-icon {
  opacity: 0.8;
  transition: opacity 0.2s;
}
.footer-powered:hover { color: #00F5FF; }
.footer-powered:hover .footer-powered-name { color: #00F5FF; }
.footer-powered:hover .footer-powered-icon { opacity: 1; }
.footer-icon {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px;
  border-radius: 8px;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.2s, background 0.2s;
}
.footer-icon:hover {
  color: #00F5FF;
  background: rgba(0,245,255,0.08);
}
</style>
