"use client"

import { SettingsSection, SettingsCard } from "./settings-primitives"
import { cn } from "@/lib/utils"
import { AlertTriangle, Trash2, ArrowLeftRight, RotateCcw } from "lucide-react"

type Props = {
  onReset: () => void
}

export function DangerZoneSettings({ onReset }: Props) {
  return (
    <SettingsSection title="Danger Zone" description="Irreversible actions that affect your entire organization.">
      <SettingsCard className="border-destructive/20">
        <div className="space-y-1">
          {[
            { icon: ArrowLeftRight, label: "Transfer Ownership", description: "Transfer organization ownership to another member", action: "Transfer" },
            { icon: RotateCcw, label: "Reset Knowledge Base", description: "Remove all documents from the knowledge base", action: "Reset", onClick: onReset },
            { icon: Trash2, label: "Delete Organization", description: "Permanently delete your organization and all data", action: "Delete", danger: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/10 p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-destructive/10">
                  <item.icon className="size-4 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <button
                onClick={item.onClick}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  "danger" in item && item.danger
                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    : "border border-destructive/30 text-destructive hover:bg-destructive/5",
                )}
              >
                {item.action}
              </button>
              </div>
            ))}
        </div>
      </SettingsCard>
    </SettingsSection>
  )
}
