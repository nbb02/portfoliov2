import { TAG_ICONS } from "./tagIcons"

export default function TagPill({
  tag,
  dark = false,
}: {
  tag: string
  dark?: boolean
}) {
  const meta = TAG_ICONS[tag]
  const Icon = meta?.icon
  const color = meta
    ? dark
      ? meta.darkColor ??
        (meta.color === "#0f766e" ? "#5eead4" : meta.color)
      : meta.color
    : undefined

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
        dark
          ? "border-white/15 bg-white/[0.06] text-slate-200"
          : "border-slate-300 bg-white/35 text-slate-600"
      }`}
    >
      {Icon && (
        <Icon size={11} style={{ color }} aria-hidden="true" />
      )}
      {tag}
    </span>
  )
}
