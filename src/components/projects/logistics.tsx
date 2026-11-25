import { FiActivity, FiClock, FiRadio, FiTruck } from "react-icons/fi"
import { LogisticsArt } from "../home/ProjectArt"
import ProjectOverview from "./ProjectOverview"

export default function Logistics() {
  return (
    <ProjectOverview
      kicker="Realtime platform · 2025–2026"
      title="Logistics & Realtime Booking"
      intro="A real-time logistics platform for dispatching, live tracking, and rider-customer bidding."
      icon={FiTruck}
      art={<LogisticsArt className="h-52 w-full" />}
      stack={[
        "Node.js",
        "Express",
        "MySQL",
        "Redis",
        "AWS",
        "WebSockets",
        "Docker",
        "Prometheus",
        "Grafana",
        "Loki",
      ]}
      tags={["Realtime", "WebSockets", "Redis", "AWS", "Monitoring"]}
      meta={[
        { label: "Role", value: "Software Engineer" },
        { label: "Timeline", value: "Sep 2025 – Mar 2026" },
        {
          label: "Focus",
          value: "Realtime, infrastructure, observability",
        },
      ]}
      brief={{
        what: {
          title: "Dispatch, tracking and bidding in one loop.",
          points: [
            "Bookings: create, assign, and track deliveries from one flow.",
            "Bidding: riders and customers negotiate before dispatch.",
            "Live updates: WebSockets keep dispatch and tracking in sync.",
          ],
        },
        how: {
          title: "Realtime with a safety net.",
          points: [
            "Background work leaves the request path, so dispatch stays responsive under load.",
            "Realtime state survives reconnects; clients resubscribe to the same source of truth.",
            "Metrics and logs are part of the deployment, not an afterthought.",
          ],
        },
      }}
      notes={[
        {
          label: "Realtime",
          text: "Socket updates push dispatch and location changes to the right client.",
          icon: FiRadio,
        },
        {
          label: "Queues",
          text: "Redis and BullMQ keep background work off the request path.",
          icon: FiClock,
        },
        {
          label: "Observability",
          text: "Metrics, dashboards, and logs cover the deployed stack.",
          icon: FiActivity,
        },
      ]}
      nextHref="/projects/load-balancer-monitoring"
      nextLabel="Next: Load Balancer + Observability"
    />
  )
}
