import { Link } from "react-router-dom"
import {
  ClientPortalCard,
  FinanceCard,
  HuntXPCard,
  LoadBalancerCard,
  LogisticsCard,
  PrintSetCard,
  RecyclingPlatformCard,
  ViTechCard,
  VirtualOfficeCard,
} from "./ProjectCards"

export default function SelectedWork() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-300 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-teal-700">Selected work</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">
            Systems I&apos;ve built.
          </h2>
        </div>
        <Link
          to="/projects"
          className="shrink-0 pb-1 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-950"
        >
          All projects →
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <ClientPortalCard className="lg:col-span-7 lg:h-[420px]" />
        <div className="grid gap-4 lg:col-span-5">
          <LoadBalancerCard className="lg:h-[202px]" />
          <ViTechCard className="lg:h-[202px]" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <LogisticsCard />
        <RecyclingPlatformCard />
      </div>

      <div className="mt-10 border-t border-slate-300 pt-8">
        <div>
          <p className="text-sm font-semibold text-teal-700">
            Personal &amp; experiments
          </p>
          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Side builds.
          </h3>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <PrintSetCard />
          <HuntXPCard />
          <FinanceCard />
          <VirtualOfficeCard />
        </div>
      </div>
    </section>
  )
}
