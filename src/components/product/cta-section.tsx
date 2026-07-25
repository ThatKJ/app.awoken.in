import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { industries } from "@/data/industries"

export function CTASection() {
  return (
    <section className="border-t border-border py-14 sm:py-18 md:py-22 lg:py-26">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
          Start with the problem your business already has
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Choose your industry and see exactly how Awoken recovers the opportunities you are already generating.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {industries.map((industry) => (
            <Link key={industry.slug} href={`/${industry.slug}`}>
              <Button variant="outline" size="md" className="group">
                {industry.name}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
