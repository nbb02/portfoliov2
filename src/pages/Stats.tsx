import { useEffect, useState } from "react"
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Timestamp,
} from "firebase/firestore"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { db, isFirebaseConfigured } from "../lib/firebase"

type GlobalStats = {
  totalVisitors: number
  totalSessions: number
  totalPageViews: number
  lastUpdated?: Timestamp
}

type VisitorItem = {
  id: string
  visitorId: string
  totalPageViews: number
  sessionCount: number
  lastPath: string
  browser: string
  os: string
  language: string
  timezone: string
  referrer: string
  lastSeen?: Timestamp
}

type DailyStats = {
  date: string
  visitorCount: number
  sessionCount: number
  pageViewCount: number
}

function numberOrZero(value: unknown): number {
  return typeof value === "number" ? value : 0
}

function toVisitorItem(
  docSnap: QueryDocumentSnapshot<DocumentData>,
): VisitorItem {
  const data = docSnap.data()

  return {
    id: docSnap.id,
    visitorId: typeof data.visitorId === "string" ? data.visitorId : docSnap.id,
    totalPageViews: numberOrZero(data.totalPageViews),
    sessionCount: numberOrZero(data.sessionCount),
    lastPath: typeof data.lastPath === "string" ? data.lastPath : "-",
    browser: typeof data.browser === "string" ? data.browser : "Unknown",
    os: typeof data.os === "string" ? data.os : "Unknown",
    language: typeof data.language === "string" ? data.language : "-",
    timezone: typeof data.timezone === "string" ? data.timezone : "-",
    referrer: typeof data.referrer === "string" ? data.referrer : "direct",
    lastSeen: data.lastSeen as Timestamp | undefined,
  }
}

function formatDate(value?: Timestamp): string {
  if (!value) return "-"
  return value.toDate().toLocaleString()
}

export default function Stats() {
  const [globalStats, setGlobalStats] = useState<GlobalStats>({
    totalVisitors: 0,
    totalSessions: 0,
    totalPageViews: 0,
  })
  const [visitors, setVisitors] = useState<VisitorItem[]>([])
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([])
  const [todayVisitorCount, setTodayVisitorCount] = useState<number | null>(
    null,
  )

  useEffect(() => {
    if (!db) return

    const globalRef = doc(db, "siteStats", "global")
    const visitorsQuery = query(
      collection(db, "visitors"),
      orderBy("totalPageViews", "desc"),
      limit(25),
    )
    const dailyQuery = query(
      collection(db, "dailyStats"),
      orderBy("date", "desc"),
      limit(30),
    )
    const today = new Date().toISOString().split("T")[0]
    const todayVisitorQuery = query(
      collection(db, "visitors"),
      where("lastVisitDate", "==", today),
    )

    const stopGlobal = onSnapshot(globalRef, (snap) => {
      const data = snap.data()
      if (!data) return

      setGlobalStats({
        totalVisitors: numberOrZero(data.totalVisitors),
        totalSessions: numberOrZero(data.totalSessions),
        totalPageViews: numberOrZero(data.totalPageViews),
        lastUpdated: data.lastUpdated as Timestamp | undefined,
      })
    })

    const stopVisitors = onSnapshot(visitorsQuery, (snap) => {
      setVisitors(snap.docs.map(toVisitorItem))
    })

    const stopDaily = onSnapshot(dailyQuery, (snap) => {
      const sorted = snap.docs
        .map((doc) => {
          const data = doc.data()
          return {
            date: typeof data.date === "string" ? data.date : doc.id,
            visitorCount: numberOrZero(data.visitorCount),
            sessionCount: numberOrZero(data.sessionCount),
            pageViewCount: numberOrZero(data.pageViewCount),
          }
        })
        .sort((a, b) => a.date.localeCompare(b.date))
      setDailyStats(sorted)
    })

    const stopTodayVisitors = onSnapshot(todayVisitorQuery, (snap) => {
      setTodayVisitorCount(snap.size)
    })

    return () => {
      stopGlobal()
      stopVisitors()
      stopDaily()
      stopTodayVisitors()
    }
  }, [])

  if (!isFirebaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F0E8] p-6 text-[#11161D]">
        <div className="max-w-md rounded-2xl border border-slate-300 bg-white/70 p-6">
          <h1 className="text-2xl font-semibold">Visitor stats are offline</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Add the Firebase keys to <code className="font-mono">.env</code> to
            enable local visitor tracking. See{" "}
            <code className="font-mono">.env.example</code>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F0E8] p-4 text-[#11161D] antialiased md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl border border-slate-300 bg-white/70 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-teal-700">
                Local dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Visitor stats
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                Dev-only Firebase monitor for unique visitors, sessions, and
                page views. This route is not included in production builds.
              </p>
            </div>
            <p className="text-xs text-slate-500">
              Last updated: {formatDate(globalStats.lastUpdated)}
            </p>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-xl border border-slate-300 bg-white/70 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
              Unique visitors
            </p>
            <p className="mt-1.5 text-3xl font-semibold text-teal-700">
              {globalStats.totalVisitors.toLocaleString()}
            </p>
          </article>
          <article className="rounded-xl border border-slate-300 bg-white/70 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
              Sessions
            </p>
            <p className="mt-1.5 text-3xl font-semibold text-slate-900">
              {globalStats.totalSessions.toLocaleString()}
            </p>
          </article>
          <article className="rounded-xl border border-slate-300 bg-white/70 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
              Page views
            </p>
            <p className="mt-1.5 text-3xl font-semibold text-amber-700">
              {globalStats.totalPageViews.toLocaleString()}
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-slate-300 bg-white/70 p-4 md:p-6">
          <h2 className="text-xl font-semibold tracking-[-0.02em]">
            Visitors per day
          </h2>
          <p className="mt-1 text-xs text-slate-500">Last 30 days</p>
          <div className="mt-4 h-80">
            {dailyStats.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={(() => {
                    const merged = [...dailyStats]
                    if (todayVisitorCount != null) {
                      const today = new Date().toISOString().split("T")[0]
                      const idx = merged.findIndex((d) => d.date === today)
                      if (idx >= 0)
                        merged[idx] = {
                          ...merged[idx],
                          visitorCount: todayVisitorCount,
                        }
                      else
                        merged.push({
                          date: today,
                          visitorCount: todayVisitorCount,
                          sessionCount: 0,
                          pageViewCount: 0,
                        })
                      merged.sort((a, b) => a.date.localeCompare(b.date))
                    }
                    return merged
                  })()}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#cbd5e1"
                    opacity={0.6}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#64748b"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#334155" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visitorCount"
                    stroke="#0f766e"
                    strokeWidth={2}
                    dot={{ fill: "#0f766e", r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Visitors"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                No daily stats yet. Visit your site to generate data.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-300 bg-white/70 p-4 md:p-6">
          <h2 className="text-xl font-semibold tracking-[-0.02em]">
            Top visitors
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Persisted by cookie/local storage visitor ID and tracked live from
            Firestore.
          </p>

          <div className="mt-4 overflow-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-300 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
                <tr>
                  <th className="py-2 pr-4">Visitor ID</th>
                  <th className="py-2 pr-4">Views</th>
                  <th className="py-2 pr-4">Sessions</th>
                  <th className="py-2 pr-4">Last path</th>
                  <th className="py-2 pr-4">Browser / OS</th>
                  <th className="py-2 pr-4">Language</th>
                  <th className="py-2 pr-4">Timezone</th>
                  <th className="py-2 pr-4">Referrer</th>
                  <th className="py-2 pr-4">Last seen</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor) => (
                  <tr
                    key={visitor.id}
                    className="border-b border-slate-200 text-slate-600 last:border-0"
                  >
                    <td className="py-2 pr-4 font-mono text-xs text-teal-700">
                      {visitor.visitorId}
                    </td>
                    <td className="py-2 pr-4">{visitor.totalPageViews}</td>
                    <td className="py-2 pr-4">{visitor.sessionCount}</td>
                    <td className="py-2 pr-4">{visitor.lastPath}</td>
                    <td className="py-2 pr-4">
                      {visitor.browser} / {visitor.os}
                    </td>
                    <td className="py-2 pr-4">{visitor.language}</td>
                    <td className="py-2 pr-4">{visitor.timezone}</td>
                    <td className="max-w-[220px] truncate py-2 pr-4">
                      {visitor.referrer}
                    </td>
                    <td className="py-2 pr-4">
                      {formatDate(visitor.lastSeen)}
                    </td>
                  </tr>
                ))}
                {visitors.length === 0 ? (
                  <tr>
                    <td className="py-6 text-slate-500" colSpan={9}>
                      No visitor data yet. Open your site in another tab and
                      refresh to generate activity.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
