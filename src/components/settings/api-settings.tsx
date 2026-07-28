"use client"

import { SettingsSection, SettingsCard, SettingsRow } from "./settings-primitives"
import type { ApiKey } from "@/services/settings/settings.service"

type Props = { data: ApiKey[] }

export function APISettings({ data }: Props) {
  return (
    <SettingsSection title="API" description="Manage API keys and webhook secrets.">
      {data.map((key) => (
        <SettingsCard key={key.id}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">{key.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <code className="rounded-md bg-muted/30 px-2 py-0.5 text-xs font-mono text-muted-foreground">
                  {key.key.slice(0, 12)}••••••••••••
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(key.key)}
                  className="text-[10px] text-primary hover:text-primary/80 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
            <button className="rounded-lg border border-destructive/20 px-3 py-1.5 text-[11px] font-medium text-destructive hover:bg-destructive/5 transition-colors">Revoke</button>
          </div>
          <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground">
            <span>Created {key.created}</span>
            <span>Last used {key.lastUsed}</span>
            <span>{key.permissions.join(", ")}</span>
          </div>
        </SettingsCard>
      ))}
      <button className="rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors w-full">
        + Generate New API Key
      </button>
    </SettingsSection>
  )
}
