import { FiActivity, FiRadio, FiServer } from "react-icons/fi"
import ProjectOverview from "./ProjectOverview"

export default function LoadBalancerMonitoring() {
  return (
    <ProjectOverview
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
      brief={{
        what: {
          title: "A lab that behaves like production.",
          points: [
            "Routing: three Express replicas behind NGINX.",
            "Realtime: Socket.IO with a Redis adapter across instances.",
            "Failure modes: toggle instance failures and watch traffic recover.",
          ],
        },
        how: {
          title: "Built to lose an instance.",
          points: [
            "Three stateless replicas make an instance loss boring.",
            "A shared adapter keeps realtime events consistent across replicas.",
            "Metrics and logs are wired before failures are simulated.",
          ],
        },
      }}
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
      notes={[
        {
          label: "Replicas",
          text: "Three stateless instances sit behind the proxy.",
          icon: FiServer,
        },
        {
          label: "Realtime",
          text: "A shared adapter carries Socket.IO events across replicas.",
          icon: FiRadio,
        },
        {
          label: "Failure",
          text: "Instance failures are toggled on purpose, not waited for.",
          icon: FiActivity,
        },
      ]}
      nextHref="/projects/finance"
      nextLabel="Next: Finance PWA"
    />
  )
}
