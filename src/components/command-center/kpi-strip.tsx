"use client"

export function KpiStrip() {
  const items = [
    { label: "Automations Today", value: "41", change: "+5% vs yesterday", positive: true },
    { label: "Active Conversations", value: "12", change: "+3 today", positive: true },
    { label: "Qualified Today", value: "6", change: "+2 today", positive: true },
    { label: "Site Visits", value: "2", change: "Scheduled", positive: true },
    { label: "Recovered Revenue", value: "₹3.2M", change: "+12% this week", positive: true },
  ]

  return (
    <div className="grid grid-cols-5 gap-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-border bg-card px-3.5 py-2.5">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{item.label}</span>
          <p className="text-lg font-bold text-foreground tabular-nums mt-0.5">{item.value}</p>
          <span className={`text-[11px] tabular-nums ${item.positive ? "text-success" : "text-destructive"}`}>
            {item.change}
          </span>
        </div>
      ))}
    </div>
  )
}
