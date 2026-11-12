import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { IconType } from "react-icons"
import { FiCheck, FiMaximize2, FiX } from "react-icons/fi"
import TagPill from "../home/TagPill"
import TechText from "../home/TechText"

type Section = {
  title: string
  body: string
  bullets?: string[]
}

type Meta = {
  label: string
  value: string
}

type GalleryImage = {
  src: string
  alt: string
}

function BulletText({ text }: { text: string }) {
  const separator = text.indexOf(":")

  if (separator > 0 && separator < 48) {
    return (
      <>
        <span className="font-semibold text-slate-900">
          {text.slice(0, separator)}:
        </span>
        <TechText text={text.slice(separator + 1)} />
      </>
    )
  }

  return <TechText text={text} />
}

export default function CaseStudy({
  kicker,
  title,
  intro,
  tags,
  stack,
  icon: Icon,
  meta,
  sections,
  gallery,
  highlights,
  highlightsKicker = "Highlights",
  highlightsTitle = "Highlights",
  nextHref,
  nextLabel,
}: {
  kicker: string
  title: string
  intro: string
  tags: string[]
  stack?: string[]
  icon?: IconType
  meta: Meta[]
  sections: Section[]
  gallery?: GalleryImage[]
  highlights: string[]
  highlightsKicker?: string
  highlightsTitle?: string
  nextHref: string
  nextLabel: string
}) {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    if (!activeImage) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [activeImage])

  return (
    <>
      <div className="space-y-10">
        <section className="relative overflow-hidden rounded-3xl bg-[#11161D] p-6 text-white shadow-xl sm:p-10">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex items-center gap-3">
              {Icon && (
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-teal-300">
                  <Icon size={20} aria-hidden="true" />
                </span>
              )}
              <p className="text-sm font-semibold text-teal-300">{kicker}</p>
            </div>

            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
              {intro}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <TagPill key={tag} tag={tag} dark />
              ))}
            </div>

            {stack && stack.length > 0 && (
              <div
                className="mt-4 flex flex-wrap items-center gap-2"
                aria-label="Tech stack"
              >
                {stack.map((tag) => (
                  <TagPill key={tag} tag={tag} dark size="md" />
                ))}
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
              {meta.map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-200">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {sections.map((section) => (
          <section
            key={section.title}
            className="border-t border-slate-300 pt-6"
          >
            <div className="flex items-center gap-3">
              <h2 className="shrink-0 text-sm font-semibold text-teal-700">
                {section.title}
              </h2>
              <span
                className="h-px flex-1 bg-slate-300"
                aria-hidden="true"
              />
            </div>

            <div className="mt-3">
              <p className="max-w-3xl text-base leading-relaxed text-slate-700">
                <TechText text={section.body} />
              </p>
              {section.bullets && (
                <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-[15px] leading-relaxed text-slate-600"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-teal-600" />
                      <span>
                        <BulletText text={bullet} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}

        <section className="rounded-2xl border border-slate-200 bg-white/70 p-6">
          <p className="text-sm font-semibold text-teal-700">
            {highlightsKicker}
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            {highlightsTitle}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-2.5 text-sm leading-relaxed text-slate-600"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <FiCheck size={11} aria-hidden="true" />
                </span>
                <TechText text={highlight} />
              </li>
            ))}
          </ul>
        </section>

        {gallery && gallery.length > 0 && (
          <section className="border-t border-slate-300 pt-6">
            <div className="flex items-center gap-3">
              <p className="shrink-0 text-sm font-semibold text-teal-700">
                Screens
              </p>
              <span className="h-px flex-1 bg-slate-300" aria-hidden="true" />
            </div>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Selected views
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {gallery.map((image) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  aria-label={`Open image: ${image.alt}`}
                  className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-left transition-colors hover:border-slate-300"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </div>
                  <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <FiMaximize2 size={14} aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-300 pt-6">
          <Link
            to="/projects"
            className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
          >
            ← Back to projects
          </Link>
          <Link
            to={nextHref}
            className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
          >
            {nextLabel} →
          </Link>
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              aria-label="Close image"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white transition-colors hover:bg-slate-800"
            >
              <FiX size={18} aria-hidden="true" />
            </button>
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-h-[88vh] w-full rounded-2xl bg-slate-900 object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  )
}
