"use client"

import { cn } from "@/lib/utils"
import { SettingsSection, SettingsCard } from "./settings-primitives"
import type { BillingInfo } from "@/services/settings/settings.service"

type Props = { data: BillingInfo }

const planLabels: Record<string, string> = { starter: "Starter", growth: "Growth", enterprise: "Enterprise" }
const planColors: Record<string, string> = { starter: "bg-muted/30 text-muted-foreground", growth: "bg-primary/10 text-primary", enterprise: "bg-success/10 text-success" }

export function BillingSettings({ data }: Props) {
  return (
    <SettingsSection title="Billing" description="Your subscription and payment information.">
      {/* Plan card */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-muted/20 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-foreground">Current Plan</h3>
              <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-medium", planColors[data.plan])}>{planLabels[data.plan]}</span>
            </div>
            <p className="text-sm text-muted-foreground">₹{data.monthlyCost.toLocaleString("en-IN")}/month · {data.seats} seats ({data.usedSeats} used)</p>
          </div>
          <button className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Upgrade</button>
        </div>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-success" />
            <span>Next billing: 1 Jul 2026</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-info" />
            <span>Card ending in {data.paymentMethod.last4}</span>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <SettingsCard>
        <h3 className="text-sm font-semibold text-foreground mb-3">Invoices</h3>
        <div className="space-y-1">
          {data.invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between rounded-lg bg-muted/10 px-3 py-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">{inv.id}</span>
                <span className="text-xs text-muted-foreground">{inv.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground">₹{inv.amount.toLocaleString("en-IN")}</span>
                <span className={cn(
                  "text-[10px] font-medium px-2 py-0.5 rounded-full",
                  inv.status === "paid" ? "bg-success/10 text-success" : inv.status === "pending" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive",
                )}>
                  {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SettingsCard>

      {/* Payment Method */}
      <SettingsCard>
        <h3 className="text-sm font-semibold text-foreground mb-2">Payment Method</h3>
        <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/10 p-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <span className="text-sm font-bold text-primary">Visa</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">•••• {data.paymentMethod.last4}</p>
            <p className="text-xs text-muted-foreground">Expires {data.paymentMethod.exp}</p>
          </div>
          <button className="ml-auto rounded-lg border border-border/50 px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/30 transition-colors">Update</button>
        </div>
      </SettingsCard>
    </SettingsSection>
  )
}
