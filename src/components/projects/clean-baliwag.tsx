import { FiHeart } from "react-icons/fi"
import CaseStudy from "./CaseStudy"

export default function CleanBaliwag() {
  return (
    <CaseStudy
      kicker="Social & blockchain · 2024–2025"
      title="Clean Baliwag"
      intro="A community recycling platform where verified collections earn points, unlock tiers, and redeem at partner stores — with a blockchain-backed transaction ledger."
      icon={FiHeart}
      stack={["Laravel", "PHP", "MySQL", "Sanctum", "Tailwind", "Vite", "Docker"]}
      tags={["Social", "Blockchain", "Civic tech", "Rewards", "QR verification"]}
      meta={[
        { label: "Role", value: "Full Stack Developer" },
        { label: "Timeline", value: "2024–2025" },
        { label: "Context", value: "Community platform" },
      ]}
      sections={[
        {
          title: "Features",
          body: "A three-sided platform for residents, partner stores, and administrators.",
          bullets: [
            "Role-based access for residents, partner stores, and admins with Sanctum tokens and middleware.",
            "Recyclables catalog with per-type point values and collection logging.",
            "Time-limited QR codes for recycling, reward exchanges, and event attendance.",
            "Points, tiers, and claimable rewards based on cumulative kilograms recycled.",
            "Partner-store rewards, carts, and point exchanges with stock tracking.",
            "Community events with participation, attendance, approvals, and point distribution.",
            "Partner-store reimbursements and a complete transaction ledger.",
          ],
        },
        {
          title: "Blockchain verification",
          body: "The chain is used as an audit layer for rewards, not as a wallet UI.",
          bullets: [
            "Recycles, exchanges, reimbursements, and tier rewards store a transaction hash.",
            "A verification endpoint checks the expected payload against the blockchain node.",
            "Failed verifications can be retried from the admin side.",
            "The chain gives an independent record of reward issuance without exposing user details.",
          ],
        },
        {
          title: "Architecture",
          body: "An API-first Laravel backend with separate static frontends for each role.",
          bullets: [
            "Laravel 12 and PHP 8.2 with Sanctum authentication and role middleware.",
            "MySQL models for users, collections, transactions, rewards, tiers, events, and reimbursements.",
            "Static user, admin, and partner-store frontends served from public/html.",
            "Queued notifications and transactional email for approvals, collections, and point events.",
            "Docker-based deployment with a Vite and Tailwind asset pipeline.",
          ],
        },
      ]}
      highlightsKicker="Capabilities"
      highlightsTitle="Skills"
      highlights={[
        "Role-based API design with Sanctum and middleware",
        "QR-based verification and collection flows",
        "Points, tiers, and partner reward mechanics",
        "Blockchain transaction verification and retries",
        "Community event and reimbursement workflows",
        "Laravel/MySQL modeling and Docker deployment",
      ]}
      nextHref="/projects/virtual-office"
      nextLabel="Next: Virtual Office"
    />
  )
}
