"use client"

import { useState, useEffect, useCallback } from "react"

const INTERVAL = 30_000

export function useRelativeTime(date: Date | string | number | null | undefined): string {
  const getRelative = useCallback(() => {
    if (!date) return ""
    const now = Date.now()
    const then = new Date(date).getTime()
    const diff = now - then
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (seconds < 10) return "just now"
    if (seconds < 60) return `${seconds}s ago`
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return new Date(date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })
  }, [date])

  const [display, setDisplay] = useState(getRelative)

  useEffect(() => {
    setDisplay(getRelative())
    const id = setInterval(() => setDisplay(getRelative()), INTERVAL)
    return () => clearInterval(id)
  }, [getRelative])

  return display
}
