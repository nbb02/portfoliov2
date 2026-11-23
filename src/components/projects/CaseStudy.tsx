import { useCallback, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import type { IconType } from "react-icons"
import { FiCheck, FiMaximize2 } from "react-icons/fi"
import ImageLightbox from "../ImageLightbox"
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

type PreviewImage = GalleryImage & {
  width?: number
  height?: number
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
  preview,
  art,
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
  preview?: PreviewImage
  art?: ReactNode
  highlights: string[]
  highlightsKicker?: string
  highlightsTitle?: string
  nextHref: string
  nextLabel: string
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setActiveIndex(null), [])
  const changeLightbox = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  return (
    <>
      <div className="space-y-10">
        <section className="relative overflow-hidden rounded-3xl bg-[#11161D] p-6 text-white shadow-xl sm:p-10">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
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
              </div>

              {preview && (
                <div className="shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-2xl lg:w-[40%] lg:max-w-md">
                  <img
                    src={preview.src}
                    alt={preview.alt}
                    width={preview.width}
                    height={preview.height}
                    loading="lazy"
                    className="block h-auto w-full"
                  />
                </div>
              )}

              {!preview && art && (
                <div
                  className="hidden shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-6 text-teal-300/50 lg:flex lg:w-[40%] lg:max-w-md lg:self-center"
                  aria-hidden="true"
                >
                  {art}
                </div>
              )}
            </div>

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
                <ul className="mt-4 columns-1 gap-x-8 sm:columns-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="mb-2.5 flex break-inside-avoid gap-2 text-[15px] leading-relaxed text-slate-600"
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
          <ul className="mt-4 columns-1 gap-x-8 sm:columns-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="mb-3 flex break-inside-avoid gap-2.5 text-sm leading-relaxed text-slate-600"
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
              {gallery.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => changeLightbox(index)}
                  aria-label={`Open image: ${image.alt}`}
                  className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-left transition-colors hover:border-slate-300"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img
                      src={image.src}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
                    />
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="relative z-10 h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.01]"
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

      <ImageLightbox
        images={gallery ?? []}
        activeIndex={activeIndex}
        onChange={changeLightbox}
        onClose={closeLightbox}
      />
    </>
  )
}
