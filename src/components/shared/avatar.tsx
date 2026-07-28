"use client"

import { cn } from "@/lib/utils"

type AvatarProps = {
  name: string
  src?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = { sm: "size-6 text-[10px]", md: "size-8 text-xs", lg: "size-10 text-sm" }

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
}

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn("rounded-full object-cover ring-2 ring-background", sizeMap[size], className)}
      />
    )
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-primary/10 font-semibold text-primary ring-2 ring-background",
        sizeMap[size],
        className
      )}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  )
}

type AvatarGroupProps = {
  users: { name: string; src?: string }[]
  max?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AvatarGroup({ users, max = 3, size = "sm", className }: AvatarGroupProps) {
  const visible = users.slice(0, max)
  const remaining = users.length - max
  return (
    <div className={cn("flex items-center -space-x-1.5", className)}>
      {visible.map((user, i) => (
        <Avatar key={i} name={user.name} src={user.src} size={size} />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-muted font-medium text-muted-foreground ring-2 ring-background",
            sizeMap[size]
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}
