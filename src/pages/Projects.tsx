import { useEffect, useRef } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import HomeNav from "../components/home/HomeNav"

const TABS = [
  { to: "/projects", label: "Overview", end: true },
  { to: "/projects/client-portal", label: "Client Portal" },
  { to: "/projects/logistics", label: "Logistics" },
  { to: "/projects/vitech", label: "ViTech" },
  {
    to: "/projects/load-balancer-monitoring",
    label: "Load Balancer",
  },
  { to: "/projects/finance", label: "Finance" },
  { to: "/projects/huntxp", label: "HuntXP" },
  { to: "/projects/recycling-platform", label: "Recycling Platform" },
  { to: "/projects/virtual-office", label: "Virtual Spaces" },
]

export default function Projects() {
  const { pathname } = useLocation()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]')
    if (!nav || !active) return

    const navRect = nav.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()

    if (activeRect.right > navRect.right) {
      nav.scrollLeft += activeRect.right - navRect.right + 8
    } else if (activeRect.left < navRect.left) {
      nav.scrollLeft -= navRect.left - activeRect.left + 8
    }
  }, [pathname])

  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#11161D] antialiased">
      <HomeNav showExperience={false} />

      <main className="mx-auto max-w-[1240px] px-5 pb-16 pt-8 sm:px-8">
        <div className="flex flex-col gap-3 border-b border-slate-300 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/projects"
            className="text-sm font-semibold text-teal-700 transition-colors hover:text-teal-900"
          >
            Projects
          </Link>
          <nav
            ref={navRef}
            aria-label="Project sections"
            className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1"
          >
            {TABS.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.end}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#11161D] text-white"
                      : "text-slate-500 hover:bg-white/60 hover:text-slate-950"
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-8">
          <Outlet />
        </div>
      </main>

      <footer className="mx-auto max-w-[1240px] border-t border-slate-300 px-5 py-6 text-xs text-slate-500 sm:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>Nathaniel B. Berres · Software Developer</p>
          <NavLink
            to="/"
            className="font-semibold text-slate-600 transition-colors hover:text-slate-950"
          >
            Back to home
          </NavLink>
        </div>
      </footer>
    </div>
  )
}
