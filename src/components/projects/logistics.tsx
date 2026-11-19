import { FiTruck } from "react-icons/fi"
import { LogisticsArt } from "../home/ProjectArt"
import CaseStudy from "./CaseStudy"

export default function Logistics() {
  return (
    <CaseStudy
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
      sections={[
        {
          title: "Features",
          body: "A realtime marketplace for bookings, dispatch, and live tracking.",
          bullets: [
            "Backend services for bookings, dispatch, and rider assignment using Node.js, Express, and MySQL.",
            "Drop-off PIN verification and rider-customer bidding flows.",
            "Live location tracking and WebSocket-based updates for dispatch and tracking.",
            "Admin and mobile integrations for operational workflows.",
            "Redis-backed caching and BullMQ job queues for background work.",
          ],
        },
        {
          title: "Infrastructure",
          body: "AWS and a Dockerized observability stack, so failures could be seen before they became support tickets.",
          bullets: [
            "AWS EC2, RDS, ElastiCache, S3, CloudFront, and Lightsail.",
            "CloudWatch monitoring and alerts.",
            "Prometheus, Grafana, and Loki for metrics, dashboards, and logs.",
            "Redis and Node exporters, HTTP statistics, and application metrics.",
            "Dockerized services with reproducible local and deployment environments.",
          ],
        },
      ]}
      highlightsKicker="Capabilities"
      highlightsTitle="Skills"
      highlights={[
        "Realtime architecture and WebSocket state",
        "Redis caching and queue design",
        "AWS deployment and infrastructure operations",
        "Monitoring, alerting, and production troubleshooting",
        "Failure handling and resilience testing",
      ]}
      nextHref="/projects/load-balancer-monitoring"
      nextLabel="Next: Load Balancer + Observability"
    />
  )
}
