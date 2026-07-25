import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-text-primary text-primary-foreground",
        secondary: "border-transparent bg-surface text-text-primary",
        accent: "border-transparent bg-accent text-accent-foreground",
        outline: "text-text-primary border-border",
        soft: "border-accent/10 bg-accent/5 text-accent",
        success: "border-success-light bg-success-light text-success",
        warning: "border-warning-light bg-warning-light text-warning",
        info: "border-info-light bg-info-light text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
