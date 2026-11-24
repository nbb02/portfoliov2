import { Link } from "react-router-dom"
import "./printset-showcase.css"

export default function PrintSetShowcase() {
  return (
    <div className="site -mx-5 sm:-mx-8">
      <article>
        <section className="mx-auto max-w-[1240px] px-5 pt-2 sm:px-8 sm:pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="site-eyebrow">
              Image layouts · real paper · local first
            </p>
            <p className="site-eyebrow">Windows desktop + static web</p>
          </div>

          <div className="mt-8 grid gap-8 sm:mt-12 sm:grid-cols-12 sm:items-end">
            <h1 className="site-display col-span-8 text-[48px] sm:text-[80px] lg:text-[104px]">
              What you see
              <br />
              is what
              <br />
              <span className="relative inline-block">
                comes out.
                <span className="absolute -bottom-2 left-0 h-[3px] w-full bg-[var(--accent)]" />
              </span>
            </h1>

            <div className="col-span-4 pb-3">
              <p className="text-[15px] leading-relaxed text-[var(--muted)]">
                Drop photos, place them on Letter, A4 or your own paper size at
                exact inch positions, then print or export a PDF that measures
                what it says.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link to="/projects/printset" className="site-btn site-btn-ink">
                  View overview
                  <Arrow />
                </Link>
                <a href="#craft" className="site-btn site-btn-ghost">
                  See the craft
                </a>
              </div>
            </div>
          </div>

          <figure className="mt-12 sm:mt-16">
            <div className="site-tick-long" />
            <div className="site-crop">
              <img
                className="site-shot"
                src="/assets/projects/printset/editor-grid.webp"
                alt="PrintSet editing a four-photo grid on Letter paper with rulers and guides visible"
                width={2880}
                height={1800}
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
              <span>
                Letter · 0.5 in margins · four cells at 3.55 × 4.80 in
              </span>
              <span>Guides, magnet snap and spacing readouts on screen only</span>
            </figcaption>
          </figure>
        </section>

        <section
          id="craft"
          className="mx-auto mt-20 max-w-[1240px] scroll-mt-24 px-5 sm:mt-28 sm:px-8"
        >
          <div className="grid gap-10 border-t border-[var(--line)] pt-10 sm:grid-cols-12">
            <p className="site-eyebrow sm:col-span-3">01 · Precision</p>
            <div className="sm:col-span-9">
              <h2 className="site-display text-[34px] sm:text-[52px]">
                Real inches, not resampled pixels.
              </h2>
              <p className="mt-9 max-w-[62ch] text-[15px] leading-relaxed text-[var(--muted)]">
                Every box stores its position in inches. Change the paper and the
                layout follows the sheet, not a screenshot of it. The PDF is drawn
                at the paper&apos;s own size, so a 6 inch photo measures six inches
                in any viewer and in the print dialog.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="site-paper-chip">Letter 8.5 × 11</span>
                <span className="site-paper-chip">A4 210 × 297</span>
                <span className="site-paper-chip">8 × 13 folio</span>
                <span className="site-paper-chip">Custom, saved</span>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-12 sm:items-center">
            <div className="sm:col-span-5">
              <p className="site-eyebrow">02 · Control</p>
              <h2 className="site-display mt-4 text-[34px] sm:text-[46px]">
                Place it, then nudge it by a sixteenth.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-[var(--muted)]">
                Drag photos onto the sheet. Magnets take over when an edge or
                centre lines up, with the gap measured while you move. Arrow keys
                nudge by 1/16 in, shift by 1/4 in. Eight handles resize a free box;
                crop is on the canvas with edge handles and a precise modal.
              </p>
              <ul className="mt-8 space-y-3 text-[13px]">
                {[
                  "Centre, margin and item guides",
                  "Equal-gap snapping between neighbours",
                  "Fit, cover, stretch, fit-width and fit-height",
                  "Rotate a quarter turn; the box turns with it",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 border-t border-[var(--line)] pt-3"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span className="text-[var(--muted)]">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-7">
              <div className="site-crop">
                <img
                  className="site-shot"
                  src="/assets/projects/printset/collage.webp"
                  alt="A hand-placed collage with guide lines and spacing readouts on the canvas"
                  width={2880}
                  height={1800}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="why"
          className="mx-auto mt-20 max-w-[1240px] scroll-mt-24 px-5 sm:mt-28 sm:px-8"
        >
          <div className="grid gap-10 border-t border-[var(--line)] pt-10 sm:grid-cols-12">
            <p className="site-eyebrow sm:col-span-3">Why this exists</p>
            <div className="sm:col-span-9">
              <h2 className="site-display text-[34px] sm:text-[52px]">
                Not another design editor.
              </h2>
              <p className="mt-6 max-w-[64ch] text-[15px] leading-relaxed text-[var(--muted)]">
                The job it removes is the boring one: lining up the same photos, on
                the same paper, at the same margins, for the hundredth time. Keep
                your design tool. This is the last step before the printer.
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-3">
                {[
                  [
                    "Presets for the repeat work",
                    "Slots, grids and saved templates place everything at exact inches in one click. The ID sheet, the photo grid, the label run: done, not dragged.",
                  ],
                  [
                    "Free when it is one-off",
                    "Hand-placed boxes, guides, magnet snap and a 1/16 in nudge are still there. Presets are the shortcut, not a cage.",
                  ],
                  [
                    "A tool, not a replacement",
                    "No text, no effects, no layers. It takes photos and puts them on a sheet at the size you meant, then gets out of the way.",
                  ],
                ].map(([title, body]) => (
                  <div
                    key={title}
                    className="border-t border-[var(--line-strong)] pt-4"
                  >
                    <h3 className="text-[16px] font-semibold tracking-[-0.02em]">
                      {title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
                      {body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-14 grid gap-8 border-t border-[var(--line)] pt-8 sm:grid-cols-12">
                <div className="sm:col-span-5">
                  <h3 className="site-display text-[24px] sm:text-[30px]">
                    Why a desktop app?
                  </h3>
                  <p className="mt-3 max-w-[40ch] text-[13px] leading-relaxed text-[var(--muted)]">
                    It is the same TypeScript bundle in a Tauri window. That window
                    is the whole point: double-click, and it is there.
                  </p>
                </div>
                <div className="sm:col-span-7">
                  <ul className="grid gap-x-8 gap-y-4 text-[13px] leading-relaxed text-[var(--muted)] sm:grid-cols-2">
                    {[
                      [
                        "No npm install",
                        "No Node, no package manager, no build step on your machine.",
                      ],
                      [
                        "No server to babysit",
                        "Nothing running in a terminal, nothing to close later.",
                      ],
                      [
                        "No Rust either",
                        "The binary is compiled once; you just run it.",
                      ],
                      [
                        "No browser tab",
                        "Its own window and icon. WebView2 is the only runtime, and Windows already has it.",
                      ],
                    ].map(([title, body]) => (
                      <li key={title}>
                        <span className="block text-[13px] font-medium text-[var(--ink)]">
                          {title}
                        </span>
                        {body}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 max-w-[56ch] text-[12px] leading-relaxed text-[var(--muted)]">
                    The one optional exception is the AI bridge, which your MCP
                    client starts from this repo with Node. Everything else is
                    offline and self-contained.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="things"
          className="mx-auto mt-20 max-w-[1240px] scroll-mt-24 px-5 sm:mt-28 sm:px-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[var(--line)] pt-10">
            <div>
              <p className="site-eyebrow">03 · Output</p>
              <h2 className="site-display mt-4 text-[34px] sm:text-[52px]">
                Made for the things you actually print.
              </h2>
            </div>
            <p className="max-w-[36ch] text-[13px] leading-relaxed text-[var(--muted)]">
              Not a mood board. Sheets that go to a printer and come out at the
              size you planned.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <Thing
              image="/assets/projects/printset/sheet-id.webp"
              alt="Two ID-sized cards laid out on a sheet with cut guides"
              title="ID front and back"
              body="A built-in template: 3.5 in wide, height following the photo, evenly spaced, with cut guides."
              tag="Slots"
            />
            <Thing
              image="/assets/projects/printset/sheet-grid.webp"
              alt="Four photos in an equal grid"
              title="Photo grids"
              body="Equal cells that flow across pages as photos fill up, with a fit rule per cell."
              tag="Grid"
            />
            <Thing
              image="/assets/projects/printset/sheet-collage.webp"
              alt="Hand-placed photo boxes on a sheet"
              title="Collages and labels"
              body="Hand-placed boxes, a slot designer you can save as a template, and custom paper."
              tag="Free"
            />
          </div>
        </section>

        <section id="ai" className="mt-20 bg-[var(--ink)] py-16 text-[#f5f2ea] sm:mt-28 sm:py-24">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <div className="grid gap-10 sm:grid-cols-12">
              <div className="sm:col-span-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8b9099]">
                  04 · Live editing
                </p>
                <h2 className="site-display mt-5 text-[36px] sm:text-[52px]">
                  The agent edits.
                  <br />
                  You stay in charge.
                </h2>
                <p className="mt-7 max-w-[42ch] text-[15px] leading-relaxed text-[#a7abb3]">
                  Switch on AI in the header and an MCP client can build or adjust
                  the open layout while you watch. Every change is ordinary
                  undoable history, in the same document you can grab and move
                  yourself. The server runs over loopback; the app owns the file.
                </p>
                <div className="mt-8 overflow-x-auto rounded-lg border border-white/10 bg-black/30 p-4">
                  <pre className="font-mono text-[11px] leading-relaxed text-[#c9cdd4]">
                    {`{
  "mcpServers": {
    "printset": {
      "command": "node",
      "args": ["--import", "tsx", "src/index.ts"],
      "cwd": "…/PrintSet/mcp"
    }
  }
}`}
                  </pre>
                </div>
              </div>

              <div className="sm:col-span-7">
                <div className="site-crop">
                  <img
                    className="site-shot"
                    src="/assets/projects/printset/ai-live.webp"
                    alt="PrintSet with the AI live indicator in the header"
                    width={2880}
                    height={1800}
                  />
                </div>
                <div className="mt-5 grid gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8b9099] sm:grid-cols-3">
                  <span>Loopback, one window</span>
                  <span>Undo works on AI edits</span>
                  <span>No hidden copy of your file</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-10 border-t border-[var(--line)] pt-10 sm:grid-cols-4">
            {[
              ["300", "dpi target for composed photos"],
              ["1/16", "inch arrow-key nudge"],
              ["0", "accounts, servers or uploads"],
              ["123", "tests on the layout maths"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="site-display text-[44px]">{value}</p>
                <p className="mt-2 max-w-[22ch] text-[12px] leading-relaxed text-[var(--muted)]">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-end justify-between gap-8 border-t border-[var(--line)] pt-12">
            <div>
              <p className="site-eyebrow">Ready when you are</p>
              <h2 className="site-display mt-4 max-w-[22ch] text-[40px] sm:text-[62px]">
                Put a photo on paper, exactly.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/projects/printset" className="site-btn site-btn-ink">
                Back to overview
                <Arrow />
              </Link>
              <a
                href="https://github.com/nbb02/PrintSet"
                target="_blank"
                rel="noreferrer"
                className="site-btn site-btn-ghost"
              >
                Source on GitHub
              </a>
            </div>
          </div>
        </section>
      </article>
    </div>
  )
}

function Thing({
  image,
  alt,
  title,
  body,
  tag,
}: {
  image: string
  alt: string
  title: string
  body: string
  tag: string
}) {
  return (
    <article className="group">
      <div className="flex aspect-[4/5] items-center justify-center rounded-md border border-[var(--line)] bg-[var(--paper-deep)] p-7">
        <img
          src={image}
          alt={alt}
          width={1080}
          height={1394}
          className="max-h-full w-auto max-w-full object-contain shadow-[0_16px_30px_-18px_rgba(16,19,24,0.5)] transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="site-card mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[17px] font-semibold tracking-[-0.02em]">
            {title}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
            {body}
          </p>
        </div>
        <span className="site-paper-chip shrink-0">{tag}</span>
      </div>
    </article>
  )
}

function Arrow({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path
        d="M3 8h9.5M9 4.5 12.5 8 9 11.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
