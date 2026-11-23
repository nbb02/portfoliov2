import { FiServer } from "react-icons/fi"
import CaseStudy from "./CaseStudy"

export default function LoadBalancerMonitoring() {
  return (
    <CaseStudy
      kicker="Local infrastructure lab · 2026"
      title="Load Balancer + Observability"
      intro="A self-contained, containerized lab with NGINX load balancing, JWT-protected APIs, Socket.IO realtime messaging, and a full observability stack."
      icon={FiServer}
      stack={[
        "NGINX",
        "Node.js",
        "Express",
        "Docker",
        "Prometheus",
        "Grafana",
        "Loki",
        "PostgreSQL",
        "Redis",
      ]}
      tags={[
        "Local lab",
        "Multiple servers",
        "Monitoring",
        "Docker",
        "NGINX",
        "Socket.IO",
        "JWT",
      ]}
      meta={[
        { label: "Role", value: "Backend Engineer" },
        { label: "Timeline", value: "2026" },
        {
          label: "Context",
          value: "Local lab · self-directed",
        },
      ]}
      sections={[
        {
          title: "Features",
          body: "A production-style backend architecture built to demonstrate distributed behavior and failure handling.",
          bullets: [
            "Three backend instances routed through NGINX with instance-level response headers.",
            "Socket.IO realtime messaging with a Redis adapter for cross-instance events.",
            "JWT-protected API endpoints and a secure authentication flow.",
            "Toggleable failure-mode simulation for resilience testing.",
            "Centralized metrics, dashboards, and structured logs.",
          ],
        },
        {
          title: "Infrastructure",
          body: "Dockerized services with externalized configuration and persistent volumes.",
          bullets: [
            "NGINX reverse proxy and three stateless Node.js/Express replicas.",
            "PostgreSQL and Redis for data and cache.",
            "Prometheus, Grafana, Loki, and Promtail for metrics and logs.",
            "cAdvisor, Redis Exporter, Node Exporter, and HTTP statistics.",
            "Structured logging and performance metrics for production-style troubleshooting.",
          ],
        },
      ]}
      preview={{
        src: "/assets/projects/load-balancer-monitoring/Load Balancer Visualizer.webp",
        alt: "Load balancer visualizer showing traffic across backend instances",
        width: 1800,
        height: 1020,
      }}
      gallery={[
        {
          src: "/assets/projects/load-balancer-monitoring/Load Balancer Visualizer.webp",
          alt: "Load balancer distribution",
        },
        {
          src: "/assets/projects/load-balancer-monitoring/HTTP Monitoring.webp",
          alt: "HTTP monitoring dashboard",
        },
        {
          src: "/assets/projects/load-balancer-monitoring/Docker Monitoring.webp",
          alt: "Docker monitoring",
        },
        {
          src: "/assets/projects/load-balancer-monitoring/Postgresql Exporter.webp",
          alt: "PostgreSQL metrics",
        },
        {
          src: "/assets/projects/load-balancer-monitoring/Redis Exporter.webp",
          alt: "Redis metrics",
        },
        {
          src: "/assets/projects/load-balancer-monitoring/Node Exporter.webp",
          alt: "Node metrics",
        },
      ]}
      highlightsKicker="Capabilities"
      highlightsTitle="Skills"
      highlights={[
        "Distributed architecture and horizontal scaling",
        "NGINX load balancing and reverse proxying",
        "Socket.IO realtime state across replicas",
        "Monitoring with Prometheus, Grafana, and Loki",
        "Dockerized environments and resilience testing",
      ]}
      nextHref="/projects/finance"
      nextLabel="Next: Finance PWA"
    />
  )
}
