import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: "div" | "section" | "main" | "header" | "footer"
}

export function Container({ children, className, as: Component = "div" }: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-full lg:max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16",
        className,
      )}
    >
      {children}
    </Component>
  )
}
