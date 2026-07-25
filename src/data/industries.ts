import type { Industry } from "@/types"

export const industries: Industry[] = [
  {
    slug: "real-estate",
    name: "Real Estate",
    shortDescription:
      "Recover opportunities from the leads your business already generates.",
    coreProblem:
      "Real estate agents lose 60-80% of inbound leads. Slow response times, missed calls, and unqualified follow-up waste opportunities that never convert.",
    revenueLeak:
      "Every hour of delay reduces contact probability by 10x. Most leads never hear back within the golden window.",
    problemStatement:
      "Leads arrive but disappear before meaningful conversations, viewings, and deals.",
    playbookStages: [
      "Lead Capture & Qualification",
      "Instant Follow-Up Automation",
      "Appointment Booking & Reminders",
      "Nurture Sequences",
      "Closed-Loop Analytics",
    ],
    journeySteps: [
      "Lead arrives",
      "Qualified instantly",
      "Property matched",
      "Showing booked",
    ],
    demoLabel:
      "See a lead move from call to booked showing in under 3 minutes",
    dashboardTerminology: {
      leads: "Active Buyers",
      conversions: "Booked Showings",
      revenue: "Commission Pipeline",
      dropped: "Missed Opportunities",
    },
  },
  {
    slug: "clinics",
    name: "Clinics",
    shortDescription:
      "Recover patient demand that never becomes an appointment.",
    coreProblem:
      "Clinics lose 30-50% of appointment requests. Voicemails go unanswered, online requests fall through cracks, and no-shows erode daily capacity.",
    revenueLeak:
      "Unanswered calls and unconfirmed appointments create unpredictable schedules and lost revenue that compounds daily.",
    problemStatement:
      "Patient demand arrives but disappears before appointments, attendance, and repeat visits.",
    playbookStages: [
      "Multi-Channel Intake",
      "Smart Scheduling",
      "Automated Reminders & Confirmations",
      "Waitlist Management",
      "Patient Reactivation",
    ],
    journeySteps: [
      "Inquiry arrives",
      "Intent captured",
      "Appointment scheduled",
      "Attendance confirmed",
    ],
    demoLabel:
      "Watch a patient book from a missed call without anyone touching a phone",
    dashboardTerminology: {
      leads: "Patient Inquiries",
      conversions: "Confirmed Appointments",
      revenue: "Booked Revenue",
      dropped: "Missed & No-Shows",
    },
  },
  {
    slug: "local-business",
    name: "Local Businesses",
    shortDescription:
      "Recover missed calls, inquiries, and customers that disappear before conversion.",
    coreProblem:
      "Local businesses rely on inbound calls and web forms, but most lack the systems to capture, qualify, and follow up consistently.",
    revenueLeak:
      "Missed calls, abandoned web forms, and untracked inquiries leak revenue daily. Most businesses have no idea how much they're losing.",
    problemStatement:
      "Calls, inquiries, and customer intent disappear before they become bookings, visits, or revenue.",
    playbookStages: [
      "Call Capture & Routing",
      "Lead Qualification",
      "Follow-Up Automation",
      "Booking & Reminders",
      "Customer Reactivation",
    ],
    journeySteps: [
      "Call or message arrives",
      "Intent understood",
      "Booking confirmed",
      "Customer arrives",
    ],
    demoLabel:
      "See how a missed call becomes a booked service in under 60 seconds",
    dashboardTerminology: {
      leads: "Inquiries",
      conversions: "Booked Jobs",
      revenue: "Pipeline Value",
      dropped: "Lost Opportunities",
    },
  },
]

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug)
}
