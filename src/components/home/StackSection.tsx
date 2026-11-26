import { useRef } from "react"
import type { IconType } from "react-icons"
import { FaAws } from "react-icons/fa"
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
import { useStackRipple } from "./useStackRipple"

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

export default function StackSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  useStackRipple(gridRef)

  return (
    <div className="mt-2 border-t border-slate-300 pt-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
          Stack
        </p>
        <span className="text-[11px] font-semibold text-slate-500">
          Scroll to explore ↓
        </span>
      </div>
      <div
        ref={gridRef}
        className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8"
      >
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
  )
}
