"use client"

import { ArrowUpRight, MessageCircle, Filter, RotateCcw, CalendarCheck, Repeat, Mail, Phone } from "lucide-react"
import { Timeline } from "@/components/shared/timeline"

const leadColors: Record<string, string> = {
  created: "#22C55E",
  contacted: "#3B82F6",
  replied: "#F97316",
  qualified: "#22C55E",
  booked: "#F59E0B",
  recovered: "#8B5CF6",
}

const groups = [
  {
    label: "Today",
    events: [
      { id: "e1", icon: MessageCircle, color: leadColors.replied, title: "Lead replied to follow-up", description: "Interested in 3BHK in Wakad, budget up to ₹1.5Cr", timestamp: "2 hours ago", badge: { label: "Hot", className: "bg-success/8 text-success" } },
      { id: "e2", icon: Filter, color: leadColors.qualified, title: "Qualification worker scored lead", description: "Confidence score: 87% — high intent buyer", timestamp: "4 hours ago" },
    ],
  },
  {
    label: "Yesterday",
    events: [
      { id: "e3", icon: Mail, color: leadColors.contacted, title: "First follow-up sent", description: "Personalized property recommendations sent via email", timestamp: "Yesterday at 2:15 PM" },
      { id: "e4", icon: Phone, color: leadColors.created, title: "Lead captured from website form", description: "Source: Google Ads — Kw: 'apartments in Viman Nagar'", timestamp: "Yesterday at 10:30 AM" },
    ],
  },
]

export function LeadTimeline() {
  return <Timeline groups={groups} />
}
