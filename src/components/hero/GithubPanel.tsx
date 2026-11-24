import { FaGithub } from "react-icons/fa"
import avatarUrl from "../../assets/hero/avatar.png"
import {
  CONNECT,
  EARLIER_SYSTEMS,
  EXPERIENCE,
  INTRO,
  PROFILE,
  PROFILE_TABS,
  RIGHT_NOW,
  SELECTED_WORK,
  STACK_CHIPS,
  STACK_NOTES,
  TIMELINE,
} from "./githubProfile"

const SURFACE = "#0D1117"
const BORDER = "#30363D"
const TEXT = "#E6EDF3"
const MUTED = "#8B949E"
const LINK = "#2F81F7"

function Heading({ children }: { children: string }) {
  return (
    <h2
      className="mt-6 pb-1.5 text-[13px] font-semibold @[700px]:text-[16px]"
      style={{ borderBottom: `1px solid ${BORDER}` }}
    >
      {children}
    </h2>
  )
}

export default function GithubPanel() {
  return (
    <div
      className="@container flex w-full flex-col font-sans"
      style={{ background: SURFACE, color: TEXT }}
    >
      <header
        className="flex h-11 shrink-0 items-center gap-2 px-3 @[700px]:h-14 @[700px]:gap-4 @[700px]:px-6"
        style={{ background: "#010409", borderBottom: `1px solid ${BORDER}` }}
      >
        <FaGithub
          className="h-5 w-5 shrink-0 @[700px]:h-8 @[700px]:w-8"
          aria-hidden="true"
        />
        <div
          className="hidden h-8 w-[300px] items-center rounded-md px-3 text-[12px] @[700px]:flex"
          style={{ border: `1px solid ${BORDER}`, color: MUTED }}
        >
          Type <span className="px-1">/</span> to search
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2 whitespace-nowrap text-[11px] @[700px]:gap-4 @[700px]:text-[13px]">
          <span style={{ color: TEXT }}>Sign in</span>
          <span
            className="shrink-0 rounded-md px-2 py-1 text-[11px] font-medium @[700px]:px-3 @[700px]:py-1.5 @[700px]:text-[13px]"
            style={{ border: `1px solid ${BORDER}` }}
          >
            Sign up
          </span>
        </div>
      </header>

      <nav
        className="flex shrink-0 items-center gap-4 overflow-x-auto px-3 text-[11px] [scrollbar-width:none] @[700px]:gap-7 @[700px]:px-8 @[700px]:text-[14px]"
        style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}` }}
      >
        {PROFILE_TABS.map((tab) => (
          <span
            key={tab.label}
            className="flex h-10 shrink-0 items-center gap-2 whitespace-nowrap border-b-2 @[700px]:h-12"
            style={{
              borderColor: tab.active ? "#F78166" : "transparent",
              color: tab.active ? TEXT : MUTED,
              fontWeight: tab.active ? 600 : 400,
            }}
          >
            {tab.label}
          </span>
        ))}
      </nav>

      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 items-start gap-5 px-4 py-4 @[700px]:grid-cols-[280px_minmax(0,1fr)] @[700px]:gap-8 @[700px]:px-10 @[700px]:py-6">
        <aside className="flex flex-col items-center">
          <img
            src={avatarUrl}
            alt=""
            className="h-[96px] w-[96px] rounded-full object-cover @[700px]:h-[230px] @[700px]:w-[230px]"
          />
          <h2 className="mt-3 text-[17px] font-normal leading-tight @[700px]:mt-4 @[700px]:text-[22px]">
            {PROFILE.name}
          </h2>
          <p
            className="text-[14px] font-light @[700px]:text-[18px]"
            style={{ color: MUTED }}
          >
            {PROFILE.handle}
          </p>
          <p className="mt-3 text-center text-[12px] leading-relaxed @[700px]:text-[13.5px]">
            {PROFILE.bio}
          </p>
          <a
            href="https://github.com/nbb02"
            target="_blank"
            rel="noreferrer"
            className="mt-4 w-full rounded-md py-1.5 text-center text-[13px] font-medium"
            style={{ background: "#21262D", border: `1px solid ${BORDER}` }}
          >
            Follow
          </a>
          <p className="mt-3 text-[12.5px]" style={{ color: MUTED }}>
            <span style={{ color: TEXT, fontWeight: 600 }}>
              {PROFILE.followers}
            </span>{" "}
            follower ·{" "}
            <span style={{ color: TEXT, fontWeight: 600 }}>
              {PROFILE.following}
            </span>{" "}
            following
          </p>
        </aside>

        <div className="min-w-0">
          <div
            className="rounded-md"
            style={{ border: `1px solid ${BORDER}` }}
          >
            <div
              className="flex items-center gap-2 px-3 py-2 font-mono text-[10px] @[700px]:px-4 @[700px]:text-[12px]"
              style={{ borderBottom: `1px solid ${BORDER}`, color: MUTED }}
            >
              <span style={{ color: TEXT }}>{PROFILE.handle}</span>
              <span>/</span>
              <span style={{ color: TEXT }}>README.md</span>
            </div>

            <div className="px-4 py-4 @[700px]:px-6 @[700px]:py-5">
              <h1 className="flex items-center gap-2 text-[17px] font-semibold @[700px]:text-[22px]">
                <span aria-hidden="true">👋</span> Hi there
              </h1>
              <p className="mt-2 text-[13.5px] leading-relaxed">{INTRO}</p>

              <Heading>🚀 Selected work</Heading>
              <div className="mt-2 overflow-hidden rounded-md" style={{ border: `1px solid ${BORDER}` }}>
                {SELECTED_WORK.map((item) => (
                  <div
                    key={item.name}
                    className="grid grid-cols-1 gap-1 px-3 py-2.5 @[700px]:grid-cols-[220px_minmax(0,1fr)] @[700px]:gap-4"
                    style={{ borderTop: `1px solid ${BORDER}` }}
                  >
                    <div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[13px] font-semibold"
                        style={{ color: LINK }}
                      >
                        {item.name}
                      </a>
                      <span
                        className="block text-[12px]"
                        style={{ color: MUTED }}
                      >
                        {item.period}
                      </span>
                      <span
                        className="mt-1 block text-[11px] leading-snug"
                        style={{ color: MUTED }}
                      >
                        {item.stack}
                      </span>
                    </div>
                    <p className="text-[12.5px]" style={{ color: MUTED }}>
                      {item.blurb}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-center text-[12.5px]">
                <a
                  href="https://nbb02.github.io/#/projects"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold"
                  style={{ color: LINK }}
                >
                  All case studies with screenshots →
                </a>
              </p>

              <Heading>🧭 Right now</Heading>
              <dl className="mt-2 space-y-1 text-[13px] leading-snug">
                {RIGHT_NOW.map((row) => (
                  <div key={row.label} className="flex gap-2 @[700px]:gap-3">
                    <dt
                      className="w-[76px] shrink-0 font-semibold @[700px]:w-[92px]"
                      style={{ color: MUTED }}
                    >
                      {row.label}
                    </dt>
                    <dd className="min-w-0">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <Heading>🛠️ Stack</Heading>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {STACK_CHIPS.map((chip) => (
                  <li
                    key={chip.label}
                    className="rounded-[3px] px-2 py-[3px] text-[11px] font-medium leading-none"
                    style={{
                      background: chip.color,
                      color: chip.dark ? "#0D1117" : "#FFFFFF",
                    }}
                  >
                    {chip.label}
                  </li>
                ))}
              </ul>
              {STACK_NOTES.map((note) => (
                <p
                  key={note}
                  className="mt-2 text-[12px] leading-relaxed"
                  style={{ color: MUTED }}
                >
                  {note}
                </p>
              ))}

              <Heading>💼 Experience</Heading>
              <div className="mt-2 overflow-hidden rounded-md" style={{ border: `1px solid ${BORDER}` }}>
                {EXPERIENCE.map((item) => (
                  <div
                    key={item.role + item.period}
                    className="grid grid-cols-1 gap-1 px-3 py-2.5 @[700px]:grid-cols-[250px_150px_minmax(0,1fr)] @[700px]:gap-3"
                    style={{ borderTop: `1px solid ${BORDER}` }}
                  >
                    <span className="text-[13px] font-semibold">
                      {item.role}
                      <span
                        className="block text-[12px] font-normal"
                        style={{ color: MUTED }}
                      >
                        {item.org}
                      </span>
                    </span>
                    <span className="text-[12px]" style={{ color: MUTED }}>
                      {item.period}
                    </span>
                    <span className="text-[12.5px]" style={{ color: MUTED }}>
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>

              <Heading>🌱 How I got here</Heading>
              <div className="mt-2 overflow-hidden rounded-md" style={{ border: `1px solid ${BORDER}` }}>
                {TIMELINE.map((row) => (
                  <div
                    key={row.when}
                    className="grid grid-cols-1 gap-1 px-3 py-2 @[700px]:grid-cols-[110px_minmax(0,1fr)] @[700px]:gap-3"
                    style={{ borderTop: `1px solid ${BORDER}` }}
                  >
                    <span className="text-[12.5px] font-semibold">
                      {row.when}
                    </span>
                    <span className="text-[12.5px]" style={{ color: MUTED }}>
                      {row.what}
                    </span>
                  </div>
                ))}
              </div>

              <Heading>📦 Earlier systems</Heading>
              <p className="mt-2 text-[12.5px]" style={{ color: MUTED }}>
                Freelance, internship, and school builds, grouped by the problem
                they solved.
              </p>
              <div className="mt-2 overflow-hidden rounded-md" style={{ border: `1px solid ${BORDER}` }}>
                {EARLIER_SYSTEMS.map((row) => (
                  <div
                    key={row.kind}
                    className="grid grid-cols-1 gap-1 px-3 py-2 @[700px]:grid-cols-[150px_minmax(0,1fr)] @[700px]:gap-3"
                    style={{ borderTop: `1px solid ${BORDER}` }}
                  >
                    <span className="text-[12.5px] font-semibold">
                      {row.kind}
                    </span>
                    <span className="text-[12.5px]" style={{ color: MUTED }}>
                      {row.what}
                    </span>
                  </div>
                ))}
              </div>

              <Heading>🤝 Let&rsquo;s connect</Heading>
              <p className="mt-2 text-[13px]">{CONNECT}</p>
              <p className="mt-2 flex gap-4 text-[12.5px]">
                <a
                  href="https://nbb02.github.io"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: LINK }}
                >
                  Portfolio
                </a>
                <a
                  href="https://www.linkedin.com/in/nathaniel-berres-396397147"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: LINK }}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/nbb02"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: LINK }}
                >
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
