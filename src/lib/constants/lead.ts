export const LEAD_STATUS = {
  NEW: "new",
  CONTACTED: "contacted",
  CONTACTED_NO_REPLY: "contacted_no_reply",
  IN_CONVERSATION: "in_conversation",
  QUALIFIED: "qualified",
  DISQUALIFIED: "disqualified",
  NURTURING: "nurturing",
  BOOKING_IN_PROGRESS: "booking_in_progress",
  BOOKED: "booked",
  VISITED: "visited",
  COLD: "cold",
  RECOVERABLE: "recoverable",
  LOST: "lost",
  WON: "won",
} as const

export const LEAD_SOURCES = {
  WEBSITE_FORM: "website_form",
  GOOGLE_ADS: "google_ads",
  META_ADS: "meta_ads",
  WHATSAPP: "whatsapp",
  LANDING_PAGE: "landing_page",
  CRM_IMPORT: "crm_import",
} as const

export const LEAD_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  contacted_no_reply: "No Reply",
  in_conversation: "In Conversation",
  qualified: "Qualified",
  disqualified: "Disqualified",
  nurturing: "Nurturing",
  booking_in_progress: "Booking",
  booked: "Booked",
  visited: "Visited",
  cold: "Cold",
  recoverable: "Recoverable",
  lost: "Lost",
  won: "Won",
}
