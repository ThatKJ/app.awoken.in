"use client"

import { cn } from "@/lib/utils"
import { SettingsSection, SettingsCard } from "./settings-primitives"
import type { RolePermissions } from "@/services/settings/settings.service"

type Props = { data: RolePermissions[] }

export function PermissionsSettings({ data }: Props) {
  const allResources = [...new Set(data.flatMap((r) => r.permissions.map((p) => p.resource)))]

  return (
    <SettingsSection title="Permissions" description="Granular access control for each role.">
      <SettingsCard className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground sticky left-0 bg-card">Resource</th>
              {data.map((r) => (
                <th key={r.role} className="text-center py-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{r.role}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allResources.map((resource) => (
              <tr key={resource} className="border-b border-border/20 last:border-b-0">
                <td className="py-2.5 pr-4 text-sm font-medium text-foreground sticky left-0 bg-card">{resource}</td>
                {data.map((role) => {
                  const perm = role.permissions.find((p) => p.resource === resource)
                  return (
                    <td key={role.role} className="text-center py-2.5 px-3">
                      {perm ? (
                        <span className="text-[10px] text-success font-medium">
                          {perm.actions.includes("manage") ? "Manage" :
                           perm.actions.includes("delete") ? "Full" :
                           perm.actions.includes("update") ? "Edit" :
                           perm.actions.includes("create") ? "Create" :
                           "View"}
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground/40">—</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </SettingsCard>
    </SettingsSection>
  )
}
