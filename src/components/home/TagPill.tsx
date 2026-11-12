import { TAG_ICONS } from "./tagIcons"

export default function TagPill({
  tag,
  dark = false,
  size = "sm",
}: {
  tag: string
  dark?: boolean
  size?: "sm" | "md"
}) {
  const meta = TAG_ICONS[tag]
  const Icon = meta?.icon
  const large = size === "md"
  const color = meta
    ? dark
      ? meta.darkColor ??
        (meta.color === "#0f766e" ? "#5eead4" : meta.color)
      : meta.color
    : undefined

  return (
    <span
      className={`inline-flex items-center rounded-full border font-semibold ${
        large
          ? "gap-2 px-3 py-1.5 text-[11px]"
          : "gap-1.5 px-2.5 py-1 text-[10px]"
      } ${
        dark
          ? "border-white/15 bg-white/[0.06] text-slate-200"
          : "border-slate-300 bg-white/35 text-slate-600"
      }`}
    >
      {Icon && (
        <Icon
          size={large ? 15 : 11}
          style={{ color }}
          aria-hidden="true"
        />
      )}
      {tag}
    </span>
  )
}
