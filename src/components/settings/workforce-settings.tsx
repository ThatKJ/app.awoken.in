"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { SettingsSection, SettingsCard, SettingsRow, SettingsSelect, SettingsSlider, SettingsToggle, SettingsInput } from "./settings-primitives"
import type { WorkerConfig, WorkerMode } from "@/services/settings/settings.service"

type Props = { data: WorkerConfig[]; onChange: (d: WorkerConfig[]) => void }

export function WorkforceSettings({ data, onChange }: Props) {
  const [selectedId, setSelectedId] = useState(data[0]?.id)

  const selected = data.find((w) => w.id === selectedId) ?? data[0]

  function updateWorker(id: string, partial: Partial<WorkerConfig>) {
    onChange(data.map((w) => (w.id === id ? { ...w, ...partial } : w)))
  }

  const modeOptions: { value: WorkerMode; label: string }[] = [
    { value: "autonomous", label: "Autonomous" },
    { value: "assisted", label: "Assisted" },
    { value: "observing", label: "Observing" },
    { value: "off", label: "Off" },
  ]

  return (
    <SettingsSection title="Workforce" description="Configure how each AI worker operates.">
      {/* Worker tabs */}
      <div className="flex gap-1 rounded-xl border border-border bg-card p-1 overflow-x-auto">
        {data.map((w) => (
          <button
            key={w.id}
            onClick={() => setSelectedId(w.id)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all",
              selectedId === w.id ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {w.name}
          </button>
        ))}
      </div>

      {selected && (
        <SettingsCard key={selected.id}>
          <SettingsRow label="Mode">
            <SettingsSelect value={selected.mode} onChange={(v) => updateWorker(selected.id, { mode: v as WorkerMode })} options={modeOptions} />
          </SettingsRow>
          <SettingsRow label="Confidence Threshold" description="Minimum confidence to act without approval">
            <SettingsSlider value={selected.confidenceThreshold} onChange={(v) => updateWorker(selected.id, { confidenceThreshold: v })} min={50} max={100} />
          </SettingsRow>
          <SettingsRow label="Approval Threshold" description="Require human approval below this confidence">
            <SettingsSlider value={selected.approvalThreshold} onChange={(v) => updateWorker(selected.id, { approvalThreshold: v })} min={50} max={100} />
          </SettingsRow>
          <SettingsRow label="Working Hours">
            <div className="flex items-center gap-2">
              <SettingsInput value={selected.workingHours.start} onChange={(v) => updateWorker(selected.id, { workingHours: { ...selected.workingHours, start: v } })} className="w-24" />
              <span className="text-xs text-muted-foreground">to</span>
              <SettingsInput value={selected.workingHours.end} onChange={(v) => updateWorker(selected.id, { workingHours: { ...selected.workingHours, end: v } })} className="w-24" />
            </div>
          </SettingsRow>
          <SettingsRow label="Response Style">
            <SettingsSelect value={selected.responseStyle} onChange={(v) => updateWorker(selected.id, { responseStyle: v as "professional" | "friendly" | "formal" })}
              options={[
                { value: "professional", label: "Professional" },
                { value: "friendly", label: "Friendly" },
                { value: "formal", label: "Formal" },
              ]}
            />
          </SettingsRow>
          <SettingsRow label="Escalation Rules">
            <SettingsInput value={selected.escalationRules} onChange={(v) => updateWorker(selected.id, { escalationRules: v })} className="w-80" />
          </SettingsRow>
        </SettingsCard>
      )}
    </SettingsSection>
  )
}
