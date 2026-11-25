import { FiDatabase, FiLock, FiSmartphone, FiTrendingUp } from "react-icons/fi"
import ProjectOverview from "./ProjectOverview"

export default function Finance() {
  return (
    <ProjectOverview
      kicker="Personal finance · 2026"
      title="Finance PWA"
      intro="A personal finance PWA whose AI assistant can read and act on the same accounts, ledger, budgets, bills, and investments as the UI — with the security boundary kept on the server."
      icon={FiTrendingUp}
      stack={[
        "Next.js",
        "React",
        "TypeScript",
        "Supabase",
        "Drizzle",
        "TanStack Query",
        "Vercel AI SDK",
        "Tailwind",
        "Vercel",
      ]}
      tags={["PWA", "AI", "MCP", "Security"]}
      meta={[
        { label: "Role", value: "Personal project" },
        { label: "Timeline", value: "2026" },
        { label: "Hosting", value: "Vercel · personal use" },
      ]}
      brief={{
        what: {
          title: "A ledger the assistant can use.",
          points: [
            "One record: cash, debts, budgets, bills, and investments.",
            "Tool access: the assistant queries and changes the same rows as the UI.",
            "Phone first: installable PWA with offline reads and a one-hand nav.",
          ],
        },
        how: {
          title: "One source of truth.",
          points: [
            "Balances: only Server Actions write them; the client never sets them directly.",
            "Assistant: it uses the same service layer as the UI, so there is no second copy of the data.",
            "Keys: provider secrets stay encrypted on the server; tool calls are authenticated and filtered by userId.",
          ],
        },
      }}
      preview={{
        src: "/assets/projects/finance/ai-assistant.webp",
        alt: "Finance PWA AI assistant screen",
        width: 1440,
        height: 1000,
      }}
      gallery={[
        {
          src: "/assets/projects/finance/ai-assistant.webp",
          alt: "Finance AI assistant analyzing the month's biggest expenses, flagging unusual spend, and showing its reasoning",
        },
        {
          src: "/assets/projects/finance/investments.webp",
          alt: "Finance investments view with capital, returns, net profit, and ROI per venture",
        },
        {
          src: "/assets/projects/finance/bills.webp",
          alt: "Finance bills view with paid, due-soon, and estimated recurring schedules",
        },
      ]}
      notes={[
        {
          label: "Ledger",
          text: "Only Server Actions write balances; clients never do.",
          icon: FiDatabase,
        },
        {
          label: "AI boundary",
          text: "Provider keys stay encrypted; tool calls are filtered by userId.",
          icon: FiLock,
        },
        {
          label: "Offline",
          text: "The PWA caches reads and keeps a one-hand mobile nav.",
          icon: FiSmartphone,
        },
      ]}
      nextHref="/projects/huntxp"
      nextLabel="Next: HuntXP"
    />
  )
}
