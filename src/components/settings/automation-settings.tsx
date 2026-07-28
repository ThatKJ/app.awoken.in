"use client"

import { SettingsSection, SettingsCard, SettingsRow, SettingsToggle, SettingsInput, SettingsSelect } from "./settings-primitives"
import type { Automation } from "@/services/settings/settings.service"

type Props = { data: Automation; onChange: (d: Automation) => void }

export function AutomationSettings({ data, onChange }: Props) {
  const set = <K extends keyof Automation>(k: K, v: Automation[K]) => onChange({ ...data, [k]: v })

  return (
    <SettingsSection title="Automation" description="Rules that govern how work flows through your AI workforce.">
      <SettingsCard>
        <SettingsRow label="Auto Assign" description="Automatically assign leads to the best available worker">
          <SettingsToggle checked={data.autoAssign} onChange={(v) => set("autoAssign", v)} />
        </SettingsRow>
        <SettingsRow label="Round Robin" description="Distribute leads evenly across workers">
          <SettingsToggle checked={data.roundRobin} onChange={(v) => set("roundRobin", v)} />
        </SettingsRow>
        <SettingsRow label="Retries" description="Number of retry attempts before escalation">
          <SettingsSelect value={String(data.retries)} onChange={(v) => set("retries", Number(v))} options={[
            { value: "0", label: "No retries" },
            { value: "1", label: "1 retry" },
            { value: "2", label: "2 retries" },
            { value: "3", label: "3 retries" },
            { value: "5", label: "5 retries" },
          ]} />
        </SettingsRow>
        <SettingsRow label="Cooldown Period" description="Minutes between retry attempts">
          <SettingsSelect value={String(data.cooldownMinutes)} onChange={(v) => set("cooldownMinutes", Number(v))} options={[
            { value: "15", label: "15 min" },
            { value: "30", label: "30 min" },
            { value: "60", label: "1 hour" },
            { value: "120", label: "2 hours" },
            { value: "1440", label: "24 hours" },
          ]} />
        </SettingsRow>
        <SettingsRow label="Follow-up Cadence" description="Hours between follow-up attempts">
          <SettingsSelect value={String(data.followupCadenceHours)} onChange={(v) => set("followupCadenceHours", Number(v))} options={[
            { value: "12", label: "12 hours" },
            { value: "24", label: "24 hours" },
            { value: "48", label: "48 hours" },
            { value: "72", label: "72 hours" },
          ]} />
        </SettingsRow>
      </SettingsCard>
      <SettingsCard>
        <label className="text-sm font-medium text-foreground">Recovery Rules</label>
        <textarea
          value={data.recoveryRules}
          onChange={(e) => set("recoveryRules", e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors mt-1"
        />
        <label className="text-sm font-medium text-foreground">Appointment Rules</label>
        <textarea
          value={data.appointmentRules}
          onChange={(e) => set("appointmentRules", e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors mt-1"
        />
      </SettingsCard>
    </SettingsSection>
  )
}
