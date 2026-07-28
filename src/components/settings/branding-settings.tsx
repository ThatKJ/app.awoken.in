"use client"

import { SettingsSection, SettingsCard, SettingsRow, SettingsInput, SettingsColorInput } from "./settings-primitives"
import type { Branding } from "@/services/settings/settings.service"

type Props = { data: Branding; onChange: (d: Branding) => void }

export function BrandingSettings({ data, onChange }: Props) {
  const set = <K extends keyof Branding>(k: K, v: Branding[K]) => onChange({ ...data, [k]: v })

  return (
    <SettingsSection title="Branding" description="Your brand identity across all communications.">
      <SettingsCard>
        <SettingsRow label="Company Name">
          <SettingsInput value={data.companyName} onChange={(v) => set("companyName", v)} className="w-72" />
        </SettingsRow>
        <SettingsRow label="Primary Color">
          <SettingsColorInput value={data.primaryColor} onChange={(v) => set("primaryColor", v)} />
        </SettingsRow>
        <SettingsRow label="Accent Color">
          <SettingsColorInput value={data.accentColor} onChange={(v) => set("accentColor", v)} />
        </SettingsRow>
      </SettingsCard>
      <SettingsCard>
        <label className="text-sm font-medium text-foreground">Email Signature</label>
        <textarea
          value={data.emailSignature}
          onChange={(e) => set("emailSignature", e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-colors mt-1"
        />
      </SettingsCard>
    </SettingsSection>
  )
}
