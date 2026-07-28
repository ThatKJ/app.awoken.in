"use client"

import { SettingsSection, SettingsCard, SettingsRow, SettingsToggle } from "./settings-primitives"
import type { NotificationPreferences, Security } from "@/services/settings/settings.service"

type NotifProps = { data: NotificationPreferences; onChange: (d: NotificationPreferences) => void }

export function NotificationsSettings({ data, onChange }: NotifProps) {
  const set = <K extends keyof NotificationPreferences>(k: K, v: NotificationPreferences[K]) => onChange({ ...data, [k]: v })

  return (
    <SettingsSection title="Notifications" description="How and when your team gets notified.">
      <SettingsCard>
        <SettingsRow label="Email Notifications">
          <SettingsToggle checked={data.email} onChange={(v) => set("email", v)} />
        </SettingsRow>
        <SettingsRow label="SMS Notifications">
          <SettingsToggle checked={data.sms} onChange={(v) => set("sms", v)} />
        </SettingsRow>
        <SettingsRow label="Push Notifications">
          <SettingsToggle checked={data.push} onChange={(v) => set("push", v)} />
        </SettingsRow>
        <SettingsRow label="In-App Notifications">
          <SettingsToggle checked={data.inApp} onChange={(v) => set("inApp", v)} />
        </SettingsRow>
      </SettingsCard>
      <SettingsCard>
        <h3 className="text-sm font-semibold text-foreground">Alert Preferences</h3>
        <SettingsRow label="Approval Alerts" description="When a worker requests human approval">
          <SettingsToggle checked={data.approvalAlerts} onChange={(v) => set("approvalAlerts", v)} />
        </SettingsRow>
        <SettingsRow label="Escalations" description="When a conversation is escalated to a human">
          <SettingsToggle checked={data.escalations} onChange={(v) => set("escalations", v)} />
        </SettingsRow>
        <SettingsRow label="Weekly Reports" description="Weekly performance summary via email">
          <SettingsToggle checked={data.weeklyReports} onChange={(v) => set("weeklyReports", v)} />
        </SettingsRow>
        <SettingsRow label="Integration Failures" description="When an integration connection fails">
          <SettingsToggle checked={data.integrationFailures} onChange={(v) => set("integrationFailures", v)} />
        </SettingsRow>
      </SettingsCard>
    </SettingsSection>
  )
}

type SecurityProps = { data: Security; onChange: (d: Security) => void }

export function SecuritySettings({ data, onChange }: SecurityProps) {
  const set = <K extends keyof Security>(k: K, v: Security[K]) => onChange({ ...data, [k]: v })

  return (
    <SettingsSection title="Security" description="Protect your organization and data.">
      <SettingsCard>
        <SettingsRow label="Two-Factor Authentication" description="Require 2FA for all team members">
          <SettingsToggle checked={data.twoFactorEnabled} onChange={(v) => set("twoFactorEnabled", v)} />
        </SettingsRow>
        <SettingsRow label="Session Timeout" description="Auto-logout after inactivity">
          <select
            value={String(data.sessionTimeoutMinutes)}
            onChange={(e) => set("sessionTimeoutMinutes", Number(e.target.value))}
            className="rounded-xl border border-border bg-card px-3 py-1.5 text-sm text-foreground appearance-none cursor-pointer hover:border-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="1440">24 hours</option>
          </select>
        </SettingsRow>
        <SettingsRow label="Password Reset" description="Force password reset on next login">
          <SettingsToggle checked={data.passwordResetRequired} onChange={(v) => set("passwordResetRequired", v)} />
        </SettingsRow>
      </SettingsCard>
    </SettingsSection>
  )
}
