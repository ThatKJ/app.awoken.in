"use client"

import { cn } from "@/lib/utils"

type LeadAvatarProps = {
  name: string
  size?: "sm" | "md" | "lg"
  source?: string
  className?: string
}

const sizeMap = { sm: "size-7 text-[9px]", md: "size-9 text-[11px]", lg: "size-11 text-sm" }

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const pastels = [
  "bg-orange-50 text-orange-500 ring-orange-200/50",
  "bg-green-50 text-green-500 ring-green-200/50",
  "bg-blue-50 text-blue-500 ring-blue-200/50",
  "bg-purple-50 text-purple-500 ring-purple-200/50",
  "bg-amber-50 text-amber-500 ring-amber-200/50",
  "bg-rose-50 text-rose-500 ring-rose-200/50",
]

const sourceRings: Record<string, string> = {
  "Google Ads": "ring-orange-300/40",
  "WhatsApp": "ring-green-300/40",
  "Website Form": "ring-blue-300/40",
  "Meta Ads": "ring-purple-300/40",
  "Landing Page": "ring-teal-300/40",
  "CRM Import": "ring-gray-300/30",
}

export function LeadAvatar({ name, size = "md", source, className }: LeadAvatarProps) {
  const colorIndex = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % pastels.length
  return (
    <div className={cn("flex shrink-0 items-center justify-center rounded-full font-medium ring-1 ring-inset", sizeMap[size], pastels[colorIndex], source && sourceRings[source], className)}>
      {initials(name)}
    </div>
  )
}
