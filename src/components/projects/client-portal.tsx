import { FiBox, FiFileText, FiLayers, FiUsers } from "react-icons/fi"
import { PortalArt } from "../home/ProjectArt"
import ProjectOverview from "./ProjectOverview"

export default function ClientPortal() {
  return (
    <ProjectOverview
      kicker="Enterprise platform · 2026–Present"
      title="Client Portal Platform"
      intro="An existing multi-tenant operations portal covering CRM, project delivery, and a large modular add-on system. I contribute across tenancy, authorization, and delivery workflows."
      icon={FiUsers}
      art={<PortalArt className="h-52 w-full" />}
      stack={[
        "React",
        "TypeScript",
        "Laravel",
        "Inertia.js",
        "Tailwind",
        "Redis",
        "MySQL",
        "AWS",
      ]}
      tags={["Multiple clients", "Authorization", "Add-on modules"]}
      meta={[
        { label: "Role", value: "Software Developer" },
        { label: "Timeline", value: "May 2026 – Present" },
        {
          label: "Focus",
          value: "Tenancy, authorization, reliable delivery",
        },
      ]}
      brief={{
        what: {
          title: "A shared operating system for client work.",
          points: [
            "CRM and delivery: pipelines, deals, contacts, tasks, approvals, and audit trails.",
            "Add-ons: isolated routes and versioned modules that ship without modifying core code.",
            "Integrations: accounting, commerce, calendar, email, and messaging behind permission checks.",
          ],
        },
        how: {
          title: "Tenant boundaries first.",
          points: [
            "Tenancy: resolve the tenant at the request boundary and scope every read and write.",
            "Authorization: role checks and policy-based access in front of sensitive actions.",
            "Auditability: every change stays attributable to a real actor.",
          ],
        },
      }}
      notes={[
        {
          label: "Tenant isolation",
          text: "Requests resolve a tenant before any query runs.",
          icon: FiLayers,
        },
        {
          label: "Add-on modules",
          text: "Extension points and isolated routes keep core changes out of feature work.",
          icon: FiBox,
        },
        {
          label: "Audit trail",
          text: "Sensitive actions record the actor and the change.",
          icon: FiFileText,
        },
      ]}
      nextHref="/projects/logistics"
      nextLabel="Next: Logistics & Realtime Booking"
    />
  )
}
