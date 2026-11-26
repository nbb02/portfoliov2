import { useEffect, useRef, useState } from "react"
import { useInView } from "../useInView"
import { useMediaQuery } from "../useMediaQuery"

const SHOTS: Record<string, string[]> = {
  loadBalancer: [
    "/assets/projects/load-balancer-monitoring/Load%20Balancer%20Visualizer.webp",
    "/assets/projects/load-balancer-monitoring/HTTP%20Monitoring.webp",
    "/assets/projects/load-balancer-monitoring/Docker%20Monitoring.webp",
    "/assets/projects/load-balancer-monitoring/Node%20Exporter.webp",
  ],
  vitech: [
    "/assets/projects/vitech/dashboard.webp",
    "/assets/projects/vitech/dashboard-2.webp",
    "/assets/projects/vitech/members-list.webp",
    "/assets/projects/vitech/reports.webp",
  ],
  printset: [
    "/assets/projects/printset/editor-grid.webp",
    "/assets/projects/printset/sheet-collage.webp",
    "/assets/projects/printset/ai-live.webp",
  ],
  huntxp: [
    "/assets/projects/huntxp/homepage.webp",
    "/assets/projects/huntxp/leaderboard.webp",
    "/assets/projects/huntxp/pipeline.webp",
  ],
  finance: [
    "/assets/projects/finance/ai-assistant.webp",
    "/assets/projects/finance/bills.webp",
    "/assets/projects/finance/investments.webp",
  ],
  virtualSpaces: [
    "/assets/projects/virtual-office/day.webp",
    "/assets/projects/virtual-office/night.webp",
    "/assets/projects/virtual-office/tools-wing.webp",
  ],
}

/**
 * Decorative screenshot reel for a project card. It only advances while the
 * card is near the viewport, and stays on the first frame for reduced motion.
 */
export default function ProjectPreview({
  id,
  opacityClass = "opacity-50",
}: {
  id: keyof typeof SHOTS | string
  opacityClass?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, "200px")
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const shots = SHOTS[id] ?? []
  const [index, setIndex] = useState(0)
  /*
   * Two frames are mounted at a time: the one on show and the one about to be.
   * A card used to hold all of its screenshots, so a scroll through the grid
   * decoded every reel at once; the rest join as the reel reaches them.
   */
  const [mounted, setMounted] = useState(() => Math.min(2, shots.length))

  useEffect(() => {
    setMounted((current) =>
      Math.max(current, Math.min(shots.length, index + 2)),
    )
  }, [index, shots.length])

  useEffect(() => {
    if (!inView || reduceMotion || shots.length < 2) return

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % shots.length)
    }, 2400)

    return () => window.clearInterval(timer)
  }, [inView, reduceMotion, shots.length])

  if (shots.length === 0) return null

  return (
    <div
      ref={ref}
      data-showup-media
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      {shots.slice(0, mounted).map((src, shotIndex) => (
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform] duration-700 ease-out ${
            shotIndex === index ? `${opacityClass} scale-100` : "opacity-0 scale-105"
          }`}
        />
      ))}
    </div>
  )
}
