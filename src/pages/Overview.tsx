import {
  ClientPortalCard,
  EcommerceCard,
  FinanceCard,
  HuntXPCard,
  LoadBalancerCard,
  LogisticsCard,
  PrintSetCard,
  RecyclingPlatformCard,
  ViTechCard,
  VirtualSpacesCard,
} from "../components/home/ProjectCards"
import MoreWork from "../components/home/MoreWork"

export default function Overview() {
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-300 pb-6">
        <p className="text-sm font-semibold text-teal-700">All work</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">
          Projects &amp; systems.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
          A visual index of production systems across enterprise platforms,
          realtime booking, observability, and data.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <ClientPortalCard className="lg:col-span-7 lg:h-[420px]" />
        <div className="grid gap-4 lg:col-span-5">
          <LoadBalancerCard className="lg:h-[202px]" />
          <ViTechCard className="lg:h-[202px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <LogisticsCard />
        <EcommerceCard />
        <RecyclingPlatformCard />
      </div>

      <div className="space-y-4 border-t border-slate-300 pt-8">
        <div>
          <p className="text-sm font-semibold text-teal-700">
            Personal &amp; experiments
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Side builds.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <PrintSetCard />
          <HuntXPCard />
          <FinanceCard />
          <VirtualSpacesCard />
        </div>
      </div>

      <MoreWork />
    </div>
  )
}
