import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollReveal(selector = '.reveal') {
  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll(selector).forEach((el) => observer.observe(el))
  })

  onUnmounted(() => observer?.disconnect())
}
