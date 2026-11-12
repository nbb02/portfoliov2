import { Link } from "react-router-dom"
import {
  FiArrowUpRight,
  FiAward,
  FiBox,
  FiHeart,
  FiShoppingBag,
  FiTrendingUp,
} from "react-icons/fi"
import TagPill from "./TagPill"

const GRID_PATTERN = {
  backgroundImage:
    "linear-gradient(to right, rgba(148,163,184,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.16) 1px, transparent 1px)",
  backgroundSize: "44px 44px",
}

const DOT_PATTERN = {
  backgroundImage:
    "radial-gradient(circle, rgba(255,255,255,0.28) 1px, transparent 1px)",
  backgroundSize: "18px 18px",
}

function Arrow() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
      <FiArrowUpRight size={16} aria-hidden="true" />
    </span>
  )
}

function LightArrow() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
      <FiArrowUpRight size={16} aria-hidden="true" />
    </span>
  )
}

export function ClientPortalCard({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/projects/client-portal"
      className={`group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-2xl bg-[#11161D] p-6 text-white shadow-xl ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={GRID_PATTERN}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="absolute right-6 top-6 hidden gap-2 lg:flex">
        {["tenant", "policy", "audit"].map((label) => (
          <span
            key={label}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-400"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="relative">
        <p className="text-xs font-semibold text-teal-300">
          Enterprise platform · 2026–Present
        </p>
        <h2 className="mt-3 max-w-md text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          Client Portal Platform
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
          A multi-tenant operations portal unifying CRM, project delivery,
          embedded forms, and document generation.
        </p>
      </div>

      <div className="relative mt-6">
        <div className="flex flex-wrap gap-1.5">
          {["Multi-tenancy", "Authorization", "Modular architecture"].map(
            (tag) => (
              <TagPill key={tag} tag={tag} dark />
            ),
          )}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-semibold">View project</span>
          <Arrow />
        </div>
      </div>
    </Link>
  )
}

export function LoadBalancerCard({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/projects/load-balancer-monitoring"
      className={`group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-2xl border border-slate-800 bg-[#11161D] p-5 text-white ${className}`}
    >
      <img
        src="/assets/projects/load-balancer-monitoring/Load Balancer Visualizer.png"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#11161D] via-[#11161D]/70 to-transparent" />
      <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        <FiArrowUpRight size={14} aria-hidden="true" />
      </span>
      <div className="relative">
        <p className="text-[10px] font-semibold text-teal-300">
          Local infrastructure lab · 2026
        </p>
        <h2 className="mt-1 text-xl font-semibold">
          Load Balancer + Observability
        </h2>
        <p className="mt-1 text-xs text-slate-300">
          NGINX, Prometheus, Grafana, Loki
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Local lab", "Observability", "Docker"].map((tag) => (
            <TagPill key={tag} tag={tag} dark />
          ))}
        </div>
      </div>
    </Link>
  )
}

export function ViTechCard({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/projects/vitech"
      className={`group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-2xl border border-slate-800 bg-[#11161D] p-5 text-white ${className}`}
    >
      <img
        src="/assets/projects/vitech/dashboard.png"
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-55 transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#11161D] via-[#11161D]/70 to-transparent" />
      <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        <FiArrowUpRight size={14} aria-hidden="true" />
      </span>
      <div className="relative">
        <p className="text-[10px] font-semibold text-teal-300">
          Capstone project · 2024
        </p>
        <h2 className="mt-1 text-xl font-semibold">ViTech Analytics</h2>
        <p className="mt-1 text-xs text-slate-300">
          Dashboards, QR check-in, role-based access
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Capstone", "RBAC", "Dashboards"].map((tag) => (
            <TagPill key={tag} tag={tag} dark />
          ))}
        </div>
      </div>
    </Link>
  )
}

export function LogisticsCard({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/projects/logistics"
      className={`group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-2xl bg-[#0F2F2B] p-5 text-white ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={DOT_PATTERN}
        aria-hidden="true"
      />
      <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-400/10 px-3 py-1 text-[10px] text-teal-200">
        <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
        live dispatch
      </div>
      <div className="relative max-w-2xl">
        <p className="text-[10px] font-semibold text-teal-300">
          Realtime platform · 2025–2026
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
          Logistics &amp; Realtime Booking
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          Dispatch, live tracking, and rider-customer bidding for ~50k users.
        </p>
      </div>
      <div className="relative mt-6 flex items-end justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {["Realtime", "WebSockets", "AWS"].map((tag) => (
            <TagPill key={tag} tag={tag} dark />
          ))}
        </div>
        <Arrow />
      </div>
    </Link>
  )
}

export function EcommerceCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex min-h-[250px] flex-col justify-between rounded-2xl border border-slate-300 bg-white/60 p-5 ${className}`}
    >
      <div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <FiShoppingBag size={18} aria-hidden="true" />
        </div>
        <p className="mt-4 text-[10px] font-semibold text-slate-500">
          Full-stack · 2025
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
          E-Commerce &amp; Management
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Commerce and management platforms with payments, inventory, and admin
          workflows.
        </p>
      </div>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {["E-commerce", "Payments", "Admin"].map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>
      <p className="mt-4 text-xs font-semibold text-slate-400">
        Case study on request
      </p>
    </div>
  )
}

export function FinanceCard({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/projects/finance"
      className={`group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-300 bg-white/60 p-5 ${className}`}
    >
      <svg
        className="pointer-events-none absolute -bottom-2 right-0 h-28 w-64 text-teal-600/15"
        viewBox="0 0 240 100"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 82 L30 66 L58 72 L88 42 L118 52 L148 24 L178 34 L210 10 L240 18"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M0 82 L30 66 L58 72 L88 42 L118 52 L148 24 L178 34 L210 10 L240 18 V100 H0 Z"
          fill="currentColor"
          opacity="0.12"
        />
      </svg>

      <img
        src="/assets/projects/finance/ai-assistant.png"
        alt=""
        loading="lazy"
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-4 hidden h-20 w-28 rounded-lg border border-slate-200 object-cover shadow-sm sm:block"
      />

      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <FiTrendingUp size={18} aria-hidden="true" />
        </div>
        <p className="mt-4 text-[10px] font-semibold text-slate-500">
          Personal finance · 2026
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
          Finance PWA
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          Accounts, transactions, budgets, bills, investments, and AI-assisted
          analysis in one installable app.
        </p>
      </div>

      <div className="relative mt-5 flex items-end justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {["PWA", "Next.js", "AI", "Security"].map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
        <LightArrow />
      </div>
    </Link>
  )
}

export function HuntXPCard({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/projects/huntxp"
      className={`group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-300 bg-white/60 p-5 ${className}`}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-400/15 blur-3xl"
        aria-hidden="true"
      />
      <img
        src="/assets/projects/huntxp/homepage.png"
        alt=""
        loading="lazy"
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-4 hidden h-20 w-28 rounded-lg border border-slate-200 object-cover shadow-sm sm:block"
      />

      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-700">
          <FiAward size={18} aria-hidden="true" />
        </div>
        <p className="mt-4 text-[10px] font-semibold text-slate-500">
          Job-hunting platform · 2026
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
          HuntXP
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          A gamified application pipeline with XP, a leaderboard, resume
          parsing, and AI coaching that runs locally in the browser.
        </p>
      </div>

      <div className="relative mt-5 flex items-end justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {["Local-first AI", "WebLLM", "Gamification"].map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
        <LightArrow />
      </div>
    </Link>
  )
}

export function VirtualOfficeCard({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/projects/virtual-office"
      className={`group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl bg-[#11161D] p-5 text-white ${className}`}
    >
      <img
        src="/assets/projects/virtual-office/office.png"
        alt=""
        loading="lazy"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={GRID_PATTERN}
        aria-hidden="true"
      />
      <div className="absolute right-4 top-4 rounded-full border border-amber-300/30 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold text-amber-200">
        In progress
      </div>

      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-teal-300">
          <FiBox size={18} aria-hidden="true" />
        </div>
        <p className="mt-4 text-[10px] font-semibold text-slate-400">
          3D environment · 2026
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
          Virtual Office
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
          A browser-based 3D developer office with animated agents and a local
          task bridge. The scene is in place; real integrations are still being
          wired.
        </p>
      </div>

      <div className="relative mt-5 flex items-end justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {["3D", "React Three Fiber", "Agents"].map((tag) => (
            <TagPill key={tag} tag={tag} dark />
          ))}
        </div>
        <Arrow />
      </div>
    </Link>
  )
}

export function CleanBaliwagCard({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/projects/clean-baliwag"
      className={`group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-2xl bg-[#11161D] p-5 text-white ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={DOT_PATTERN}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-teal-300">
          <FiHeart size={18} aria-hidden="true" />
        </div>
        <p className="mt-4 text-[10px] font-semibold text-slate-400">
          Social &amp; blockchain · 2024–2025
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
          Clean Baliwag
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          A community recycling platform with verified collections, points,
          tiers, partner rewards, and a blockchain-backed ledger.
        </p>
      </div>

      <div className="relative mt-5 flex items-end justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {["Social", "Blockchain", "Civic tech"].map((tag) => (
            <TagPill key={tag} tag={tag} dark />
          ))}
        </div>
        <Arrow />
      </div>
    </Link>
  )
}
