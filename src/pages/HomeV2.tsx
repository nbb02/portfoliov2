import { lazy, Suspense } from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { JOURNEY_ROLES } from "../components/journeyRoles"
import HomeNav from "../components/home/HomeNav"
import GithubScene from "../components/home/GithubScene"
import SelectedWork from "../components/home/SelectedWork"
import ScrollLink from "../components/home/ScrollLink"
import SiteFooter from "../components/home/SiteFooter"
import HeadlineFill from "../components/home/HeadlineFill"
import StackSection from "../components/home/StackSection"

const Laptop = lazy(() => import("../components/laptop"))
const Rubiks = lazy(() => import("../components/rubiks"))
const ProfessionalExperience = lazy(
  () => import("../components/ProfessionalExperience"),
)

export default function HomeV2() {
  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#11161D] antialiased">
      <HomeNav />

      <main>
        <section className="mx-auto max-w-[1240px] px-5 pb-6 pt-6 sm:px-8 sm:pt-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div>
              <p className="text-xs font-semibold text-teal-700">
                Software Developer · Fullstack & Realtime
              </p>

              <HeadlineFill
                className="mt-5 max-w-[620px] text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] md:text-[2.85rem]"
                text="I build systems that hold up under real load."
                accent="hold up"
              />

              <p className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-slate-600">
                Fullstack engineer focused on multi-tenant platforms, realtime
                systems, and the observability that keeps them honest.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ScrollLink
                  target="work"
                  className="group rounded-full bg-[#11161D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
                >
                  View selected work{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
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
                    React, Laravel, Node, MySQL, AWS
                  </p>
                </div>
              </div>
            </div>

            <div className="relative pb-6">
              <div className="relative h-[420px] overflow-hidden rounded-[30px] bg-[#0D1117] shadow-[0_30px_80px_rgba(15,23,42,0.24)] sm:h-[540px]">
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden="true"
                >
                  <div
                    className="absolute inset-0 opacity-[0.35]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(148,163,184,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.22) 1px, transparent 1px)",
                      backgroundSize: "44px 44px",
                      maskImage:
                        "radial-gradient(ellipse at 50% 45%, black, transparent 72%)",
                      WebkitMaskImage:
                        "radial-gradient(ellipse at 50% 45%, black, transparent 72%)",
                    }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(45,212,191,0.16),transparent_62%)]" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgba(13,148,136,0.22),transparent_68%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(2,6,12,0.72)_100%)]" />
                  <span
                    className="hero-laser w-[58%]"
                    style={{
                      top: "18%",
                      animationDelay: "-1s",
                      animationDuration: "7.5s",
                    }}
                  />
                  <span
                    className="hero-laser hero-laser--b w-[46%]"
                    style={{
                      top: "44%",
                      animationDelay: "-4s",
                      animationDuration: "9s",
                    }}
                  />
                  <span
                    className="hero-laser hero-laser--c w-[64%]"
                    style={{
                      top: "70%",
                      animationDelay: "-6s",
                      animationDuration: "8s",
                    }}
                  />
                  <span
                    className="hero-laser hero-laser--b w-[34%]"
                    style={{
                      top: "31%",
                      animationDelay: "-2.5s",
                      animationDuration: "10s",
                    }}
                  />
                </div>
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

          <StackSection />
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

        <GithubScene />

        <SiteFooter />
      </main>
    </div>
  )
}
