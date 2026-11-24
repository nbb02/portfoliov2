const NAV_OFFSET = 78

function scrollTo(top: number) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" })
}

export function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  scrollTo(target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET)
}

export function scrollToTop() {
  scrollTo(0)
}
