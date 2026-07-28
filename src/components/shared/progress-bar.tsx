"use client"

import { Progress } from "@/components/ui/progress"

type ProgressBarProps = {
  value: number
  max?: number
  variant?: "default" | "success" | "warning" | "danger"
  size?: "sm" | "md"
  showLabel?: boolean
  className?: string
}

export function ProgressBar(props: ProgressBarProps) {
  return <Progress {...props} />
}
