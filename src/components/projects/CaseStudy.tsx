import { Link } from "react-router-dom"

type Section = {
  title: string
  body: string
  bullets?: string[]
}

type Meta = {
  label: string
  value: string
}

export default function CaseStudy({
  kicker,
  title,
  intro,
  tags,
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
  meta: Meta[]
  sections: Section[]
  gallery?: { src: string; alt: string }[]
  highlights: string[]
  highlightsKicker?: string
  highlightsTitle?: string
  nextHref: string
  nextLabel: string
}) {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl bg-[#11161D] p-6 text-white shadow-xl sm:p-10">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="text-sm font-semibold text-teal-300">{kicker}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
            {intro}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-200"
              >
                {tag}
              </span>
            ))}
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
          className="grid grid-cols-1 gap-4 border-t border-slate-300 pt-6 md:grid-cols-[0.34fr_0.66fr]"
        >
          <h2 className="text-sm font-semibold text-teal-700">
            {section.title}
          </h2>
          <div>
            <p className="text-sm leading-relaxed text-slate-600">
              {section.body}
            </p>
            {section.bullets && (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm leading-relaxed text-slate-600"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-600" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      {gallery && gallery.length > 0 && (
        <section className="border-t border-slate-300 pt-6">
          <p className="text-sm font-semibold text-teal-700">Screens</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            Selected views
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {gallery.map((image) => (
              <div
                key={image.src}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-56 w-full object-contain p-2"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white/70 p-6">
        <p className="text-sm font-semibold text-teal-700">
          {highlightsKicker}
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-950">
          {highlightsTitle}
        </h2>
        <ul className="mt-4 space-y-3">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex gap-2 text-sm leading-relaxed text-slate-600"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-600" />
              {highlight}
            </li>
          ))}
        </ul>
      </section>

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
  )
}
