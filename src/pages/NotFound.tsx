import { Link } from "react-router-dom"
import HomeNav from "../components/home/HomeNav"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#11161D] antialiased">
      <HomeNav showExperience={false} />

      <main className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8">
        <p className="text-sm font-semibold text-teal-700">404</p>
        <h1 className="mt-3 max-w-2xl text-5xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-6xl">
          This page doesn’t exist.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
          The link may be out of date, or the route moved. Start from the work
          index or head back home.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-full bg-[#11161D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
          >
            Back home
          </Link>
          <Link
            to="/projects"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950"
          >
            View projects
          </Link>
        </div>
      </main>
    </div>
  )
}
