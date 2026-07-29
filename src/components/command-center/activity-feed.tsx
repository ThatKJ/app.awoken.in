"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Bot, User, Target, Clock, MessageSquare } from "lucide-react"

type Activity = {
  icon: typeof Bot
  text: string
  detail: string
  time: string
  type: "ai" | "human" | "system"
}

const today: Activity[] = [
  { icon: Bot, text: "Elena qualified Priya Sharma", detail: "Confidence 96% · Auto-approved", time: "2 min ago", type: "ai" },
  { icon: MessageSquare, text: "Marcus resolved Rajesh Kumar", detail: "Contract terms explained", time: "15 min ago", type: "ai" },
  { icon: Target, text: "Priya detected anomaly in visit data", detail: "Week-over-week drop of 18% · Needs review", time: "32 min ago", type: "ai" },
  { icon: User, text: "You dismissed 3 recovered deals", detail: "Bulk action · No longer valid", time: "1 hr ago", type: "human" },
  { icon: Clock, text: "MLS sync completed", detail: "Duration 12s · 0 errors", time: "1 hr ago", type: "system" },
]

const dotColors = {
  ai: "bg-primary",
  human: "bg-muted-foreground",
  system: "bg-info",
}

const iconColors = {
  ai: "text-primary",
  human: "text-muted-foreground",
  system: "text-info",
}

export function ActivityFeed() {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Live Activity</h3>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border/50" />

        <div className="flex flex-col gap-0">
          {today.map((item, i) => (
            <motion.div
              key={`today-${i}`}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="relative flex gap-4 py-2.5"
            >
              {/* Dot on the timeline */}
              <div className="relative z-10 flex shrink-0">
                <div className={cn("size-[10px] rounded-full mt-0.5", dotColors[item.type])} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <item.icon className={cn("size-3 shrink-0", iconColors[item.type])} strokeWidth={2} />
                  <span className="text-sm font-medium text-foreground">{item.text}</span>
                </div>
                <p className="text-[12px] text-muted-foreground mt-0.5">{item.detail}</p>
                <span className="text-[11px] text-muted-foreground/50 tabular-nums mt-0.5 block">{item.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
