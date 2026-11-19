import { FiTrendingUp } from "react-icons/fi"
import CaseStudy from "./CaseStudy"

export default function Finance() {
  return (
    <CaseStudy
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
      sections={[
        {
          title: "Features",
          body: "A mobile-first workspace for day-to-day personal finance.",
          bullets: [
            "Accounts dashboard for liquid cash, liabilities, and receivables.",
            "Transaction ledger with income, expense, transfers, loans, lend, and collect-debt flows.",
            "Budgets with monthly category caps and dynamic progress states.",
            "Bills and subscriptions with fixed, variable, and installment schedules.",
            "Investments and venture groupings with capital, returns, and ROI.",
            "AI chat with tool access to accounts, transactions, budgets, bills, notes, and investments.",
            "Installable PWA with offline caching and a mobile-first bottom nav.",
          ],
        },
        {
          title: "AI assistant",
          body: "The assistant is the part that makes the app more than a set of CRUD screens.",
          bullets: [
            "Streams answers with tool calls into accounts, transactions, budgets, bills, investments, and notes.",
            "Surfaces its reasoning and the tool results it used instead of returning an opaque paragraph.",
            "Sanitizes tool output before it reaches the model and keeps provider keys on the server.",
            "Lets the user choose between a free Groq model and BYOK OpenRouter or Gemini providers.",
            "Exposes the same capabilities through an MCP server, scoped to the user's existing rights.",
            "Uses an in-process tool layer, so the browser never holds the provider key.",
          ],
        },
        {
          title: "Stack",
          body: "A Next.js App Router PWA with a server-side security boundary.",
          bullets: [
            "Next.js 16, React 19, TypeScript, Tailwind CSS, and Radix/shadcn UI.",
            "Supabase Postgres, Auth, and Row Level Security with Drizzle ORM.",
            "TanStack Query for cache-first client shells and background revalidation.",
            "Vercel AI SDK with free-tier Groq and BYOK OpenRouter/Gemini keys.",
            "MCP tool server, Serwist service worker, and Vercel deployment.",
          ],
        },
        {
          title: "Security",
          body: "The client is fast, but sensitive operations stay on the server.",
          bullets: [
            "Server Actions adjust balances and write ledger data; clients never set balances directly.",
            "AI keys are encrypted with AES-256-GCM and never sent to the browser.",
            "Supabase RLS enforces per-user data access.",
            "MCP tools and AI streaming run in server-side route handlers.",
          ],
        },
      ]}
      preview={{
        src: "/assets/projects/finance/ai-assistant.webp",
        alt: "Finance PWA AI assistant screen",
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
      highlightsKicker="Capabilities"
      highlightsTitle="Skills"
      highlights={[
        "PWA architecture and offline caching",
        "Server Actions and ledger invariants",
        "Supabase Auth, RLS, and Drizzle schema design",
        "AI streaming, tool calling, and MCP",
        "Secure API-key storage and server boundaries",
        "TanStack Query cache-first navigation",
      ]}
      nextHref="/projects/huntxp"
      nextLabel="Next: HuntXP"
    />
  )
}
