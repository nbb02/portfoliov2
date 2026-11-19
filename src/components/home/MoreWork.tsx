import type { IconType } from "react-icons"
import {
  FiCalendar,
  FiCreditCard,
  FiMessageCircle,
  FiShoppingBag,
} from "react-icons/fi"
import TagPill from "./TagPill"
import {
  CommerceArt,
  LogisticsArt,
  PortalArt,
  RecyclingArt,
} from "./ProjectArt"

type ArtVariant = "portal" | "logistics" | "commerce" | "recycling"

type ArchivedProject = {
  title: string
  kicker: string
  description: string
  features: string[]
  techs: string[]
  icon: IconType
  art: ArtVariant
}

const ART: Record<ArtVariant, typeof PortalArt> = {
  portal: PortalArt,
  logistics: LogisticsArt,
  commerce: CommerceArt,
  recycling: RecyclingArt,
}

const ARCHIVED: ArchivedProject[] = [
  {
    title: "Places Booking",
    kicker: "Backend · booking platform",
    description:
      "Venue and place booking platform with availability management, payments, and admin workflows.",
    features: ["Bookings", "Payments", "Admin"],
    techs: ["Express", "MySQL", "PayMongo"],
    icon: FiCalendar,
    art: "portal",
  },
  {
    title: "Event Booking & Social System",
    kicker: "Backend · events & social",
    description:
      "Event booking platform with lightweight social features, realtime assignments, and message flows.",
    features: ["Realtime", "Social", "Bookings"],
    techs: ["Express", "MySQL", "WebSockets"],
    icon: FiMessageCircle,
    art: "logistics",
  },
  {
    title: "POS & Inventory System",
    kicker: "Fullstack · retail operations",
    description:
      "Point-of-sale and inventory management with realtime sync and Google sign-in.",
    features: ["Realtime", "Management", "Admin"],
    techs: ["Firebase", "React", "Google Auth"],
    icon: FiShoppingBag,
    art: "commerce",
  },
  {
    title: "E-Commerce System",
    kicker: "Fullstack · commerce",
    description:
      "Full-featured storefront and admin with serverless components and managed hosting.",
    features: ["E-commerce", "Payments", "Admin"],
    techs: ["Next.js", "MongoDB", "SCSS"],
    icon: FiShoppingBag,
    art: "portal",
  },
  {
    title: "E-Commerce System 2 & 3",
    kicker: "Backend · commerce",
    description:
      "Additional e-commerce builds for separate clients, with React frontend integrations.",
    features: ["E-commerce", "Integrations"],
    techs: ["Laravel", "MySQL", "React"],
    icon: FiCreditCard,
    art: "commerce",
  },
  {
    title: "Social System",
    kicker: "Backend · social platform",
    description:
      "Social platform with user interactions, messaging, and community features.",
    features: ["Social", "Realtime"],
    techs: ["Express", "MySQL", "AWS"],
    icon: FiMessageCircle,
    art: "recycling",
  },
]

export default function MoreWork() {
  return (
    <div className="space-y-4 border-t border-slate-300 pt-8">
      <div>
        <p className="text-sm font-semibold text-teal-700">Earlier work</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
          More systems.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          Client and internal builds from earlier years. They don't have public
          case studies, but they're part of the track record.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ARCHIVED.map((project) => {
          const Icon = project.icon
          const Art = ART[project.art]

          return (
            <article
              key={project.title}
              className="relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-2xl bg-[#11161D] p-5 text-white"
            >
              <Art className="absolute bottom-14 right-0 h-28 w-[52%] text-teal-300/25" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-teal-300">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <p className="text-[10px] font-semibold text-teal-300">
                    {project.kicker}
                  </p>
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {project.description}
                </p>
              </div>

              <div className="relative mt-4 space-y-2 border-t border-white/10 pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.features.map((feature) => (
                    <TagPill key={feature} tag={feature} dark />
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.techs.map((tech) => (
                    <TagPill key={tech} tag={tech} dark />
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
