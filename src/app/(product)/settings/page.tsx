"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { motion, type Variants } from "framer-motion"
import { SettingsSidebar } from "@/components/settings/settings-sidebar"
import { OrganizationSettings } from "@/components/settings/organization-settings"
import { BrandingSettings } from "@/components/settings/branding-settings"
import { WorkforceSettings } from "@/components/settings/workforce-settings"
import { AutomationSettings } from "@/components/settings/automation-settings"
import { NotificationsSettings, SecuritySettings } from "@/components/settings/notification-security-settings"
import { MembersSettings } from "@/components/settings/members-settings"
import { PermissionsSettings } from "@/components/settings/permissions-settings"
import { BillingSettings } from "@/components/settings/billing-settings"
import { APISettings } from "@/components/settings/api-settings"
import { DangerZoneSettings } from "@/components/settings/danger-zone-settings"
import { useSettings, useUpdateSettings, useResetSettings } from "@/hooks/use-settings"
import { Save, RotateCcw } from "lucide-react"

const section: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function SettingsPageWrapper() {
  return (
    <Suspense fallback={<SettingsSkeleton />}>
      <SettingsPage />
    </Suspense>
  )
}

function SettingsSkeleton() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-5 py-6 px-5">
      <div className="flex gap-5">
        <div className="w-[220px] shrink-0 space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-9 rounded-xl bg-muted/30 animate-pulse" />
          ))}
        </div>
        <div className="flex-1 space-y-4">
          <div className="h-6 w-48 rounded bg-muted/30 animate-pulse" />
          <div className="h-4 w-72 rounded bg-muted/20 animate-pulse" />
          <div className="h-48 rounded-2xl bg-muted/15 animate-pulse mt-4" />
        </div>
      </div>
    </div>
  )
}

function SettingsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const active = searchParams.get("section") ?? "organization"

  const { data: settings } = useSettings()
  const updateMutation = useUpdateSettings()
  const resetMutation = useResetSettings()

  const org = settings?.organization
  const branding = settings?.branding
  const workers = settings?.workers
  const automation = settings?.automation
  const notifications = settings?.notifications
  const security = settings?.security
  const members = settings?.members
  const roles = settings?.roles
  const billing = settings?.billing
  const apiKeys = settings?.apiKeys

  if (!settings) {
    return (
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5 py-6 px-5">
        <div className="flex gap-5">
          <div className="w-[220px] shrink-0 space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-9 rounded-xl bg-muted/30 animate-pulse" />
            ))}
          </div>
          <div className="flex-1 space-y-4">
            <div className="h-6 w-48 rounded bg-muted/30 animate-pulse" />
            <div className="h-4 w-72 rounded bg-muted/20 animate-pulse" />
            <div className="h-48 rounded-2xl bg-muted/15 animate-pulse mt-4" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-5 py-6 px-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure how your AI workforce operates.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => resetMutation.mutate()}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground hover:border-primary/30 transition-colors"
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
          <button
            onClick={() => updateMutation.mutate({})}
            className="flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Save className="size-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex gap-5">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Content */}
        <motion.div key={active} variants={section} initial="hidden" animate="visible" className="flex-1 min-w-0 max-w-3xl space-y-6">
          {active === "organization" && org && (
            <OrganizationSettings data={org} onChange={(d) => updateMutation.mutate({ organization: d })} />
          )}
          {active === "branding" && branding && (
            <BrandingSettings data={branding} onChange={(d) => updateMutation.mutate({ branding: d })} />
          )}
          {active === "workforce" && workers && (
            <WorkforceSettings data={workers} onChange={(d) => updateMutation.mutate({ workers: d })} />
          )}
          {active === "automation" && automation && (
            <AutomationSettings data={automation} onChange={(d) => updateMutation.mutate({ automation: d })} />
          )}
          {active === "notifications" && notifications && (
            <NotificationsSettings data={notifications} onChange={(d) => updateMutation.mutate({ notifications: d })} />
          )}
          {active === "security" && security && (
            <SecuritySettings data={security} onChange={(d) => updateMutation.mutate({ security: d })} />
          )}
          {active === "members" && members && (
            <MembersSettings data={members} onChange={(d) => updateMutation.mutate({ members: d })} />
          )}
          {active === "permissions" && roles && (
            <PermissionsSettings data={roles} />
          )}
          {active === "billing" && billing && (
            <BillingSettings data={billing} />
          )}
          {active === "api" && apiKeys && (
            <APISettings data={apiKeys} />
          )}
          {active === "danger-zone" && (
            <DangerZoneSettings onReset={() => resetMutation.mutate()} />
          )}
        </motion.div>
      </div>
    </div>
  )
}
