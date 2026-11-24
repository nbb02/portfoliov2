import "./index.css"
import { lazy, Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useLocation, useNavigationType } from "react-router-dom"
import HomeV2 from "./pages/HomeV2"
import { trackPageVisit } from "./lib/visitorTracker"

const Profile = lazy(() => import("./pages/Profile"))
const Desktop = lazy(() => import("./pages/Desktop"))
const Projects = lazy(() => import("./pages/Projects"))
const Overview = lazy(() => import("./pages/Overview"))
const References = lazy(() => import("./pages/References"))
const NotFound = lazy(() => import("./pages/NotFound"))
const Stats = import.meta.env.DEV
  ? lazy(() => import("./pages/Stats"))
  : null
const ViTech = lazy(() => import("./components/desktop/vitech"))
const LoadBalancerMonitoring = lazy(
  () => import("./components/projects/load-balancer-monitoring"),
)
const ClientPortal = lazy(() => import("./components/projects/client-portal"))
const Logistics = lazy(() => import("./components/projects/logistics"))
const Finance = lazy(() => import("./components/projects/finance"))
const HuntXP = lazy(() => import("./components/projects/huntxp"))
const RecyclingPlatform = lazy(
  () => import("./components/projects/recycling-platform"),
)
const VirtualOffice = lazy(() => import("./components/projects/virtual-office"))
const PrintSet = lazy(() => import("./components/projects/printset"))

function ScrollToTop() {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    // Back/forward keeps the browser's restored position instead of
    // snapping to the top of the page the user is returning to.
    if (navigationType === "POP") return

    const target = location.hash
      ? document.getElementById(location.hash.slice(1))
      : null
    if (target) {
      target.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash, navigationType])

  return null
}

function VisitorTracking() {
  const location = useLocation()

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`
    void trackPageVisit(path)
  }, [location.pathname, location.search, location.hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <VisitorTracking />
      <Suspense
        fallback={<div className="route-fallback" aria-hidden="true" />}
      >
        <Routes>
          <Route path="/" element={<HomeV2 />} />
          <Route path="/v1" element={<Profile />} />
          <Route path="/desktop" element={<Desktop />} />
          <Route path="/projects" element={<Projects />}>
            <Route index element={<Overview />} />
            <Route path="client-portal" element={<ClientPortal />} />
            <Route path="logistics" element={<Logistics />} />
            <Route path="finance" element={<Finance />} />
            <Route path="huntxp" element={<HuntXP />} />
            <Route path="recycling-platform" element={<RecyclingPlatform />} />
            <Route path="virtual-office" element={<VirtualOffice />} />
            <Route path="printset" element={<PrintSet />} />
            <Route path="vitech" element={<ViTech />} />
            <Route
              path="load-balancer-monitoring"
              element={<LoadBalancerMonitoring />}
            />
          </Route>
          <Route path="/references" element={<References />} />
          {import.meta.env.DEV && Stats && (
            <Route path="/stats" element={<Stats />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}
