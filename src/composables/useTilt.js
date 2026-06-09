export function useTilt(el, maxTilt = 12) {
  function onMove(e) {
    const rect = el.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    const dx   = (e.clientX - cx) / (rect.width  / 2)
    const dy   = (e.clientY - cy) / (rect.height / 2)
    const rotX = -dy * maxTilt
    const rotY =  dx * maxTilt
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`
  }
  function onLeave() {
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
  }
  el.style.transition = 'transform 0.15s ease'
  el.style.transformStyle = 'preserve-3d'
  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)
  return () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  }
}
