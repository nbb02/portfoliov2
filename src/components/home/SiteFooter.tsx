import { Link } from "react-router-dom"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function SiteFooter() {
  return (
    <footer className="bg-[#0B0F14] text-white">
      <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 border-b border-white/20 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-teal-300">
              Nathaniel B. Berres
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
              Software Developer building multi-tenant platforms, realtime
              systems, and the boundaries that keep them reliable.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/nathaniel-berres-396397147"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
            >
              <FaLinkedin size={18} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/nbb02"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
            >
              <FaGithub size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Nathaniel B. Berres</p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#github"
              className="font-medium text-slate-200 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              GitHub
            </a>
            <Link
              to="/projects"
              className="font-medium text-slate-200 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Projects
            </Link>
            <Link
              to="/references"
              className="font-medium text-slate-200 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Credits
            </Link>
            <Link
              to="/v1"
              className="font-medium text-slate-200 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              v1
            </Link>
            <button
              type="button"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="rounded-full border border-white/25 px-3 py-1.5 font-medium text-slate-200 transition-colors hover:border-white/50 hover:text-white"
            >
              Back to top ↑
            </button>
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-slate-300">
          <span className="text-slate-400">3D credits:</span> Rubik&apos;s
          Cube, Laptop, Sun, Moon. Full credits in{" "}
          <Link
            to="/references"
            className="font-medium text-white underline underline-offset-2 transition-colors hover:text-teal-200"
          >
            references
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
