import { useEffect, useRef } from "react"
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi"

export type LightboxImage = {
  src: string
  alt: string
}

export default function ImageLightbox({
  images,
  activeIndex,
  onChange,
  onClose,
}: {
  images: LightboxImage[]
  activeIndex: number | null
  onChange: (index: number) => void
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const isOpen = activeIndex !== null && images.length > 0

  useEffect(() => {
    if (!isOpen || activeIndex === null) return

    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    const index = activeIndex

    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault()
        onChange((index - 1 + images.length) % images.length)
      }

      if (event.key === "ArrowRight") {
        event.preventDefault()
        onChange((index + 1) % images.length)
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKeyDown)
      previousFocus?.focus()
    }
  }, [activeIndex, images.length, isOpen, onChange, onClose])

  if (activeIndex === null) return null

  const image = images[activeIndex]
  if (!image) return null

  const previous = (activeIndex - 1 + images.length) % images.length
  const next = (activeIndex + 1) % images.length

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-6xl flex-col items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between pb-3">
          <span
            className="rounded-full border border-white/15 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-300"
            aria-live="polite"
          >
            {activeIndex + 1} / {images.length}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close image"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white transition-colors hover:bg-slate-800"
          >
            <FiX size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="relative flex w-full items-center justify-center">
          {images.length > 1 && (
            <button
              type="button"
              onClick={() => onChange(previous)}
              aria-label="Previous image"
              className="absolute left-0 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white shadow-lg transition-colors hover:bg-slate-800 sm:left-4 sm:translate-x-0"
            >
              <FiChevronLeft size={22} aria-hidden="true" />
            </button>
          )}

          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[80vh] w-full rounded-2xl bg-slate-900 object-contain shadow-2xl"
          />

          {images.length > 1 && (
            <button
              type="button"
              onClick={() => onChange(next)}
              aria-label="Next image"
              className="absolute right-0 z-10 flex h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white shadow-lg transition-colors hover:bg-slate-800 sm:right-4 sm:translate-x-0"
            >
              <FiChevronRight size={22} aria-hidden="true" />
            </button>
          )}
        </div>

        <p className="mt-3 max-w-3xl text-center text-sm leading-relaxed text-slate-400">
          {image.alt}
        </p>
      </div>
    </div>
  )
}
