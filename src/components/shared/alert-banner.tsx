"use client"

import { X, AlertTriangle, Info, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type AlertBannerProps = {
  type?: "info" | "warning" | "error" | "success"
  title: string
  description?: string
  action?: { label: string; onClick?: () => void }
  dismissible?: boolean
  onDismiss?: () => void
}

const config: Record<string, { icon: typeof Info; container: string; iconColor: string; titleColor: string }> = {
  info: { icon: Info, container: "bg-info/5 border-info/20", iconColor: "text-info", titleColor: "text-info" },
  warning: { icon: AlertTriangle, container: "bg-warning/5 border-warning/20", iconColor: "text-warning", titleColor: "text-warning" },
  error: { icon: AlertCircle, container: "bg-destructive/5 border-destructive/20", iconColor: "text-destructive", titleColor: "text-destructive" },
  success: { icon: CheckCircle, container: "bg-success/5 border-success/20", iconColor: "text-success", titleColor: "text-success" },
}

export function AlertBanner({ type = "info", title, description, action, dismissible, onDismiss }: AlertBannerProps) {
  const { icon: Icon, container, iconColor, titleColor } = config[type]
  return (
    <div className={cn("relative flex items-start gap-3 rounded-lg border p-4", container)} role="alert">
      <Icon className={cn("mt-0.5 size-5 shrink-0", iconColor)} aria-hidden="true" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className={cn("text-sm font-medium", titleColor)}>{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {action && <Button variant="secondary" size="sm" onClick={action.onClick}>{action.label}</Button>}
        {dismissible && (
          <button onClick={onDismiss} className="rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Dismiss">
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}
