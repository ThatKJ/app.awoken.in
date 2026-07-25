import Link from "next/link"
import { ArrowRight, Building2, Stethoscope, Store } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface IndustryCardProps {
  slug: string
  name: string
  description: string
  problemStatement: string
  className?: string
}

const iconMap: Record<string, React.ReactNode> = {
  "real-estate": <Building2 className="h-5 w-5" />,
  clinics: <Stethoscope className="h-5 w-5" />,
  "local-business": <Store className="h-5 w-5" />,
}

export function IndustryCard({
  slug,
  name,
  description,
  problemStatement,
  className,
}: IndustryCardProps) {
  return (
    <Link href={`/${slug}`} className={cn("group block focus-visible:outline-none", className)}>
      <Card className="relative h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium hover:border-accent/20">
        <CardHeader>
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/5 text-accent group-hover:bg-accent/10 transition-colors">
            {iconMap[slug]}
          </div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mt-1">
            Problem
          </p>
          <CardDescription className="mt-1 text-sm">
            {problemStatement}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all group-hover:gap-2.5">
            Explore Playbook
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
