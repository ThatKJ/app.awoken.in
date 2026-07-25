import type { PlaybookStage } from "@/types"

export const defaultPlaybookStages: PlaybookStage[] = [
  {
    id: "capture",
    title: "Capture",
    description: "Every inbound touchpoint captured and qualified automatically.",
    icon: "Radio",
  },
  {
    id: "engage",
    title: "Engage",
    description: "Instant, personalized follow-up across the right channel.",
    icon: "MessageCircle",
  },
  {
    id: "convert",
    title: "Convert",
    description: "Seamless booking and confirmation workflow.",
    icon: "CalendarCheck",
  },
  {
    id: "retain",
    title: "Retain",
    description: "Nurture, re-engage, and measure every outcome.",
    icon: "RefreshCw",
  },
]
