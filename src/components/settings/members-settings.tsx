"use client"

import { cn } from "@/lib/utils"
import { SettingsSection, SettingsCard, SettingsRow } from "./settings-primitives"
import type { Member } from "@/services/settings/settings.service"

type Props = { data: Member[]; onChange: (d: Member[]) => void }

const roleColors: Record<string, string> = {
  owner: "bg-primary/10 text-primary",
  admin: "bg-info/10 text-info",
  manager: "bg-warning/10 text-warning",
  viewer: "bg-muted/30 text-muted-foreground",
}

const statusColors: Record<string, string> = {
  active: "bg-success/10 text-success",
  suspended: "bg-destructive/10 text-destructive",
  pending: "bg-warning/10 text-warning",
}

export function MembersSettings({ data, onChange }: Props) {
  return (
    <SettingsSection title="Members" description="Manage who has access to your organization.">
      <SettingsCard>
        <div className="space-y-1">
          {data.map((m) => (
            <div key={m.id} className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/10 p-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary shrink-0">
                {m.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.email}</p>
              </div>
              <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", roleColors[m.role])}>
                {m.role.charAt(0).toUpperCase() + m.role.slice(1)}
              </span>
              <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", statusColors[m.status])}>
                {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
              </span>
              <div className="flex items-center gap-1">
                <select
                  defaultValue={m.role}
                  onChange={(e) => onChange(data.map((mm) => mm.id === m.id ? { ...mm, role: e.target.value as Member["role"] } : mm))}
                  className="rounded-lg border border-border/50 bg-card px-2 py-1 text-[11px] text-foreground appearance-none cursor-pointer hover:border-primary/30 transition-colors focus:outline-none"
                >
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </SettingsCard>
    </SettingsSection>
  )
}
