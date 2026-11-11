import { Link } from "react-router-dom"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import ScrollLink from "./ScrollLink"

export default function HomeNav({
  showExperience = true,
}: {
  showExperience?: boolean
}) {
  return (
    <header className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
      <Link to="/" className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#11161D] text-[11px] font-bold text-white">
          NB
        </span>
        <span className="hidden text-sm font-semibold tracking-tight text-[#11161D] sm:block">
          Nathaniel B. Berres
        </span>
      </Link>

      <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
        <Link to="/projects" className="transition-colors hover:text-slate-950">
          Work
        </Link>
        {showExperience && (
          <ScrollLink
            target="experience"
            className="transition-colors hover:text-slate-950"
          >
            Experience
          </ScrollLink>
        )}
      </nav>

      <div className="flex items-center gap-2">
        <Link
          to="/v1"
          aria-label="View version 1"
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950"
        >
          v1
        </Link>
        <a
          href="https://www.linkedin.com/in/nathaniel-berres-396397147"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:border-slate-400 hover:text-[#0A66C2]"
        >
          <FaLinkedin size={18} aria-hidden="true" />
        </a>
        <a
          href="https://github.com/nbb02"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          title="GitHub"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#11161D] text-white transition-colors hover:bg-teal-800"
        >
          <FaGithub size={18} aria-hidden="true" />
        </a>
      </div>
    </header>
  )
}
