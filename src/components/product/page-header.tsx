import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  showBack?: boolean
  className?: string
}

export function PageHeader({ title, description, showBack, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-10 md:mb-12", className)}>
      {showBack && (
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-text-primary transition-colors duration-200"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Explorer
        </Link>
      )}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.08] text-text-primary">
        {title}
      </h1>
      {description && (
        <p className="mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
