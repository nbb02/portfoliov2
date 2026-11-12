import type { IconType } from "react-icons"
import { lazy, Suspense } from "react"
import { FaAws, FaGithub, FaLinkedin } from "react-icons/fa"
import { FiFileText } from "react-icons/fi"
import {
  SiDocker,
  SiGrafana,
  SiInertia,
  SiLaravel,
  SiMysql,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiPrometheus,
  SiReact,
  SiReactquery,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"
import { JOURNEY_ROLES } from "../components/journeyRoles"
import HomeNav from "../components/home/HomeNav"
import SelectedWork from "../components/home/SelectedWork"
import ScrollLink from "../components/home/ScrollLink"
import SiteFooter from "../components/home/SiteFooter"

const Laptop = lazy(() => import("../components/laptop"))
const Rubiks = lazy(() => import("../components/rubiks"))
const ProfessionalExperience = lazy(
  () => import("../components/ProfessionalExperience"),
)

type Tech = {
  name: string
  icon: IconType
  color: string
}

const TECH: Tech[] = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Grafana", icon: SiGrafana, color: "#F46800" },
  { name: "Prometheus", icon: SiPrometheus, color: "#E6522C" },
  { name: "Loki", icon: FiFileText, color: "#B45309" },
  { name: "NGINX", icon: SiNginx, color: "#009639" },
  { name: "Inertia.js", icon: SiInertia, color: "#9553E9" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "TanStack", icon: SiReactquery, color: "#FF4154" },
]

export default function HomeV2() {
  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#11161D] antialiased">
      <HomeNav />

      <main>
        <section className="mx-auto max-w-[1240px] px-5 pb-6 pt-6 sm:px-8 sm:pt-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div>
              <p className="text-xs font-semibold text-teal-700">
                Software Engineer · Fullstack & Realtime
              </p>

              <h1 className="mt-5 max-w-[620px] text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] md:text-[2.85rem]">
                I build systems that{" "}
                <span className="whitespace-nowrap text-[#B45309]">
                  hold up
                </span>{" "}
                under real load.
              </h1>

              <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-slate-600">
                Fullstack engineer focused on multi-tenant platforms, realtime
                systems, and the observability that keeps them honest.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ScrollLink
                  target="work"
                  className="rounded-full bg-[#11161D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
                >
                  View selected work →
                </ScrollLink>
                <a
                  href="https://www.linkedin.com/in/nathaniel-berres-396397147"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:border-slate-400 hover:text-[#0A66C2]"
                >
                  <FaLinkedin size={19} aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/nbb02"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950"
                >
                  <FaGithub size={19} aria-hidden="true" />
                </a>
              </div>

              <div className="mt-9 grid grid-cols-1 gap-4 border-t border-slate-300 pt-5 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
                    Experience
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-slate-900">
                    Fullstack + Realtime
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
                    Recent builds
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-slate-900">
                    Booking systems & real-time APIs
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
                    Primary stack
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-slate-900">
                    React, Node, MySQL, AWS
                  </p>
                </div>
              </div>
            </div>

            <div className="relative pb-6">
              <div className="relative h-[420px] overflow-hidden rounded-[30px] bg-[#0D1117] shadow-[0_30px_80px_rgba(15,23,42,0.24)] sm:h-[540px]">
                <Suspense
                  fallback={
                    <div
                      className="h-full w-full bg-[#0D1117]"
                      aria-hidden="true"
                    />
                  }
                >
                  <Laptop />
                </Suspense>
              </div>

              <div className="absolute -bottom-8 -left-2 h-[170px] w-[170px] sm:-left-8 sm:h-[215px] sm:w-[215px]">
                <Suspense
                  fallback={
                    <div className="h-full w-full" aria-hidden="true" />
                  }
                >
                  <Rubiks />
                </Suspense>
              </div>

              <div className="absolute -right-2 top-5 hidden rounded-full border border-slate-300 bg-white/90 px-4 py-2 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur sm:block">
                Currently building: enterprise client portals
              </div>
            </div>
          </div>

          <div className="mt-2 border-t border-slate-300 pt-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
                Stack
              </p>
              <span className="text-[11px] font-semibold text-slate-500">
                Scroll to explore ↓
              </span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
              {TECH.map((tech) => {
                const Icon = tech.icon
                return (
                  <div
                    key={tech.name}
                    title={tech.name}
                    className="group flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white/50 px-1.5 py-2.5 transition-colors hover:border-slate-300 hover:bg-white"
                  >
                    <Icon
                      size={20}
                      style={{ color: tech.color }}
                      aria-hidden="true"
                    />
                    <span className="text-[9px] font-semibold text-slate-600 transition-colors group-hover:text-slate-900">
                      {tech.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div id="work">
          <SelectedWork />
        </div>

        <div id="experience">
          <Suspense
            fallback={
              <div
                className="journey-v2 journey-v2-fallback"
                aria-hidden="true"
              />
            }
          >
            <ProfessionalExperience
              roles={JOURNEY_ROLES}
              title="The journey so far."
              className="journey-v2"
              atmosphere
            />
          </Suspense>
        </div>

        <SiteFooter />
      </main>
    </div>
  )
}
