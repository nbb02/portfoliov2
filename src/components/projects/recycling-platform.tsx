import { FiGrid, FiHeart, FiLink, FiUsers } from "react-icons/fi"
import { RecyclingArt } from "../home/ProjectArt"
import ProjectOverview from "./ProjectOverview"

export default function RecyclingPlatform() {
  return (
    <ProjectOverview
      kicker="Social & blockchain · 2024–2025"
      title="Recycling Platform"
      intro="A community recycling platform where verified collections earn points, unlock tiers, and redeem at partner stores — with a blockchain-backed transaction ledger."
      icon={FiHeart}
      art={<RecyclingArt className="h-52 w-full" />}
      stack={["Laravel", "PHP", "MySQL", "Sanctum", "Tailwind", "Vite", "Docker"]}
      tags={["Social", "Blockchain", "Community", "Rewards", "QR verification"]}
      meta={[
        { label: "Role", value: "Full Stack Developer" },
        { label: "Timeline", value: "2024–2025" },
        { label: "Context", value: "Community platform" },
      ]}
      brief={{
        what: {
          title: "A reward loop for three audiences.",
          points: [
            "Residents: log collections, earn points, and redeem rewards.",
            "Partners: manage stock, exchanges, and reimbursements.",
            "Admins: approve events, collections, and reward issuance.",
          ],
        },
        how: {
          title: "Verified by QR, recorded on chain.",
          points: [
            "Three roles share one API; permissions live in middleware instead of duplicated screens.",
            "QR codes expire, so a screenshot cannot be replayed later.",
            "Chain hashes record reward issuance without putting user data on-chain.",
          ],
        },
      }}
      notes={[
        {
          label: "Role model",
          text: "Three frontends share one Laravel API and role-scoped middleware.",
          icon: FiUsers,
        },
        {
          label: "QR flows",
          text: "Time-limited codes verify collections, exchanges, and event attendance.",
          icon: FiGrid,
        },
        {
          label: "Chain record",
          text: "Reward events store a transaction hash and can be retried.",
          icon: FiLink,
        },
      ]}
      nextHref="/projects/virtual-office"
      nextLabel="Next: Virtual Spaces"
    />
  )
}
