import {
  Fragment,
  useCallback,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { Link } from "react-router-dom"
import type { IconType } from "react-icons"
import { FiArrowUpRight, FiMaximize2 } from "react-icons/fi"
import ImageLightbox from "../ImageLightbox"
import TagPill from "../home/TagPill"
import TechText from "../home/TechText"
import { useProjectIntro } from "./useProjectIntro"

type Meta = {
  label: string
  value: string
}

type ProjectLink = {
  label: string
  href: string
  external?: boolean
}

type GalleryImage = {
  src: string
  alt: string
}

type PreviewImage = GalleryImage & {
  width?: number
  height?: number
}

type BriefBlock = {
  title: string
  points: readonly [string, string, string]
}

export type ProjectBrief = {
  what: BriefBlock
  how: BriefBlock
}

type BuildNote = {
  label: string
  text: string
  icon: IconType
}

type BuildNotes = readonly [BuildNote, BuildNote, BuildNote]

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

function BriefBlockView({
  label,
  block,
}: {
  label: string
  block: BriefBlock
}) {
  return (
    <section className="border-t border-slate-300 pt-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-teal-700">
        {label}
      </p>
      <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-950">
        {block.title}
      </h2>
      <ul className="mt-2">
        {block.points.map((point) => (
          <li
            key={point}
            className="flex gap-2 border-t border-slate-200 py-2.5 text-[15px] leading-relaxed text-slate-600 first:border-t-0 first:pt-0"
          >
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-teal-600" />
            <span>
              <BulletText text={point} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function ProjectOverview({
  kicker,
  title,
  intro,
  tags,
  stack,
  icon: Icon,
  iconNode,
  meta,
  brief,
  notes,
  gallery,
  preview,
  art,
  showcase,
  links,
  afterHero,
  children,
  nextHref,
  nextLabel,
}: {
  kicker: string
  title: string
  intro: string
  tags: string[]
  stack?: string[]
  icon?: IconType
  iconNode?: ReactNode
  meta: Meta[]
  brief?: ProjectBrief
  notes?: BuildNotes
  gallery?: GalleryImage[]
  preview?: PreviewImage
  art?: ReactNode
  showcase?: ReactNode
  links?: ProjectLink[]
  afterHero?: ReactNode
  children?: ReactNode
  nextHref: string
  nextLabel: string
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const titleVisualRef = useRef<HTMLSpanElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const { titleMode } = useProjectIntro({
    title,
    titleRef,
    visualRef: titleVisualRef,
    stackRef,
  })

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
                  {(iconNode || Icon) && (
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-teal-300">
                      {iconNode ??
                        (Icon ? <Icon size={20} aria-hidden="true" /> : null)}
                    </span>
                  )}
                  <p className="text-sm font-semibold text-teal-300">{kicker}</p>
                </div>

                <h1
                  ref={titleRef}
                  className="mt-4 max-w-3xl overflow-hidden pb-3 -mb-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl"
                >
                  <span className="sr-only">{title}</span>
                  <span
                    ref={titleVisualRef}
                    aria-hidden="true"
                    className="inline-block"
                  >
                    {titleMode === "blur"
                      ? title.split(" ").map((word, index, words) => (
                          <Fragment key={`${word}-${index}`}>
                            <span data-title-word className="inline-block">
                              {word}
                            </span>
                            {index < words.length - 1 ? " " : null}
                          </Fragment>
                        ))
                      : title}
                  </span>
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
                    ref={stackRef}
                    className="mt-4 flex flex-wrap items-center gap-2"
                    aria-label="Tech stack"
                  >
                    {stack.map((tag) => (
                      <TagPill key={tag} tag={tag} dark size="md" />
                    ))}
                  </div>
                )}

                {links && links.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {links.map((link) => {
                      const className =
                        "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-teal-300/40 hover:text-white"

                      return link.external === false ? (
                        <Link
                          key={link.href}
                          to={link.href}
                          className={className}
                        >
                          {link.label}
                          <FiArrowUpRight size={12} aria-hidden="true" />
                        </Link>
                      ) : (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className={className}
                        >
                          {link.label}
                          <FiArrowUpRight size={12} aria-hidden="true" />
                        </a>
                      )
                    })}
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

        {afterHero}

        {brief && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <BriefBlockView label="What it does" block={brief.what} />
            <BriefBlockView label="Engineering choices" block={brief.how} />
          </div>
        )}

        {showcase}

        {children}

        {gallery && gallery.length > 0 && (
          <section className="border-t border-slate-300 pt-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-teal-700">Screens</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  Selected views
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                {gallery.length} views
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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

        {notes && notes.length > 0 && (
          <section className="border-t border-slate-300 pt-6">
            <div>
              <p className="text-sm font-semibold text-teal-700">Build notes</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                The parts that matter.
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              {notes.map((note, index) => {
                const NoteIcon = note.icon

                return (
                  <article
                    key={note.label}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-5"
                  >
                    <NoteIcon
                      size={96}
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-5 -right-4 text-teal-900/[0.05] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                    />
                    <div className="relative">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-700">
                          <NoteIcon size={17} aria-hidden="true" />
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-4 text-base font-semibold tracking-[-0.02em] text-slate-950">
                        {note.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        <TechText text={note.text} />
                      </p>
                    </div>
                  </article>
                )
              })}
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
