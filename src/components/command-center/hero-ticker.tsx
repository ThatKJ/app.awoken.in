"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const items = [
  { text: "Elena qualified Priya Sharma — Prestige Homes campaign", type: "ai" as const },
  { text: "Marcus recovered ₹82K — Deal closed from follow-up #4", type: "ai" as const },
  { text: "WhatsApp reconnected — Integration healthy", type: "system" as const },
  { text: "2 deals won — Total pipeline value ₹1.2Cr", type: "ai" as const },
  { text: "Forecast updated — ₹3.8Cr for current quarter", type: "system" as const },
]

const typeDot = {
  ai: "bg-primary",
  system: "bg-info",
}

export function HeroTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const current = items[index]

  return (
    <div className="flex items-center gap-2 px-6 py-2.5 overflow-hidden">
      <span className={cn("size-1.5 rounded-full shrink-0 animate-pulse-dot", typeDot[current.type])} />
      <div className="relative h-4 flex-1 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={index}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 text-[11px] text-muted-foreground truncate"
          >
            {current.text}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
