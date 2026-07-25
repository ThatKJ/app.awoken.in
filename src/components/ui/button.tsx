import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 active:scale-[0.97]",
        secondary:
          "bg-text-primary text-primary-foreground hover:bg-text-primary/90 hover:shadow-lg active:scale-[0.97]",
        outline:
          "border border-border bg-background hover:bg-surface hover:border-accent/30 active:scale-[0.97]",
        subtle:
          "bg-accent/5 text-accent hover:bg-accent/10 active:scale-[0.97]",
        ghost: "hover:bg-surface active:scale-[0.97]",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3.5 text-xs gap-1.5",
        md: "h-10 px-4 text-sm gap-2",
        lg: "h-12 px-6 text-[15px] gap-2",
        xl: "h-14 px-8 text-[15px] gap-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
