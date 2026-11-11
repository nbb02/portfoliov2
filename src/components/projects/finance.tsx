import CaseStudy from "./CaseStudy"

export default function Finance() {
  return (
    <CaseStudy
      kicker="Personal finance · 2026"
      title="Finance PWA"
      intro="A personal finance dashboard and installable PWA for accounts, transactions, budgets, bills, investments, notes, and AI-assisted analysis."
      tags={["PWA", "Next.js", "Supabase", "AI", "Security"]}
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
      nextHref="/projects/virtual-office"
      nextLabel="Next: Virtual Office"
    />
  )
}
