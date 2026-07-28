"use client"

import { SettingsSection, SettingsCard, SettingsRow, SettingsInput, SettingsSelect } from "./settings-primitives"
import type { Organization } from "@/services/settings/settings.service"

type Props = { data: Organization; onChange: (d: Organization) => void }

export function OrganizationSettings({ data, onChange }: Props) {
  const set = <K extends keyof Organization>(k: K, v: Organization[K]) => onChange({ ...data, [k]: v })

  return (
    <SettingsSection title="Organization" description="Your company information and regional preferences.">
      <SettingsCard>
        <SettingsRow label="Company Name">
          <SettingsInput value={data.name} onChange={(v) => set("name", v)} className="w-72" />
        </SettingsRow>
        <SettingsRow label="Industry">
          <SettingsSelect value={data.industry} onChange={(v) => set("industry", v)} options={[
            { value: "Real Estate", label: "Real Estate" },
            { value: "Technology", label: "Technology" },
            { value: "Healthcare", label: "Healthcare" },
            { value: "Finance", label: "Finance" },
            { value: "Education", label: "Education" },
            { value: "E-commerce", label: "E-commerce" },
          ]} />
        </SettingsRow>
        <SettingsRow label="Timezone">
          <SettingsSelect value={data.timezone} onChange={(v) => set("timezone", v)} options={[
            { value: "Asia/Kolkata (IST, UTC+5:30)", label: "Asia/Kolkata (IST)" },
            { value: "Asia/Dubai (GST, UTC+4:00)", label: "Asia/Dubai (GST)" },
            { value: "America/New_York (EST, UTC-5:00)", label: "America/New_York (EST)" },
            { value: "Europe/London (GMT, UTC+0:00)", label: "Europe/London (GMT)" },
          ]} />
        </SettingsRow>
        <SettingsRow label="Business Hours">
          <div className="flex items-center gap-2">
            <SettingsInput value={data.businessHours.start} onChange={(v) => set("businessHours", { ...data.businessHours, start: v })} className="w-24" />
            <span className="text-xs text-muted-foreground">to</span>
            <SettingsInput value={data.businessHours.end} onChange={(v) => set("businessHours", { ...data.businessHours, end: v })} className="w-24" />
          </div>
        </SettingsRow>
        <SettingsRow label="Address">
          <SettingsInput value={data.address} onChange={(v) => set("address", v)} className="w-80" />
        </SettingsRow>
        <SettingsRow label="Currency">
          <SettingsSelect value={data.currency} onChange={(v) => set("currency", v)} options={[
            { value: "INR (₹)", label: "INR (₹)" },
            { value: "USD ($)", label: "USD ($)" },
            { value: "EUR (€)", label: "EUR (€)" },
            { value: "GBP (£)", label: "GBP (£)" },
          ]} />
        </SettingsRow>
        <SettingsRow label="Language">
          <SettingsSelect value={data.language} onChange={(v) => set("language", v)} options={[
            { value: "English (US)", label: "English (US)" },
            { value: "Hindi", label: "Hindi" },
            { value: "Marathi", label: "Marathi" },
          ]} />
        </SettingsRow>
        <SettingsRow label="Date Format">
          <SettingsSelect value={data.dateFormat} onChange={(v) => set("dateFormat", v)} options={[
            { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
            { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
            { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
          ]} />
        </SettingsRow>
      </SettingsCard>
    </SettingsSection>
  )
}
