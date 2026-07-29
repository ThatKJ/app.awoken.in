"use client"

import { cn } from "@/lib/utils"

type LeadAvatarProps = {
  name: string
  size?: "sm" | "md" | "lg"
  source?: string
  className?: string
}

const sizeMap = { sm: "size-7 text-[10px]", md: "size-9 text-xs", lg: "size-11 text-sm" }

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const bgColors = ["bg-primary/10 text-primary", "bg-success/10 text-success", "bg-warning/10 text-warning", "bg-info/10 text-info", "bg-chart-2/10 text-chart-2"]

const sourceRings: Record<string, string> = {
  "Google Ads": "ring-primary/40",
  "WhatsApp": "ring-success/40",
  "Website Form": "ring-info/40",
  "Meta Ads": "ring-chart-2/40",
  "Landing Page": "ring-teal-400/40",
  "CRM Import": "ring-muted-foreground/20",
}

export function LeadAvatar({ name, size = "md", source, className }: LeadAvatarProps) {
  const colorIndex = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % bgColors.length
  return (
    <div className={cn("flex shrink-0 items-center justify-center rounded-full font-semibold ring-2", sizeMap[size], bgColors[colorIndex], source && sourceRings[source], className)}>
      {initials(name)}
    </div>
  )
}
