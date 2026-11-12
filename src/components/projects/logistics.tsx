import { FiTruck } from "react-icons/fi"
import CaseStudy from "./CaseStudy"

export default function Logistics() {
  return (
    <CaseStudy
      kicker="Realtime platform · 2025–2026"
      title="Logistics & Realtime Booking"
      intro="A real-time logistics platform for dispatching, live tracking, and rider-customer bidding, serving roughly 50k registered users."
      icon={FiTruck}
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
      keyPoints={[
        "~50k registered users",
        "Realtime dispatch and live tracking",
        "AWS with Prometheus, Grafana, and Loki",
      ]}
      tags={["Realtime", "WebSockets", "Redis", "AWS", "Observability"]}
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
        "Observability, alerting, and production troubleshooting",
        "Failure handling and resilience testing",
      ]}
      nextHref="/projects/load-balancer-monitoring"
      nextLabel="Next: Load Balancer + Observability"
    />
  )
}
