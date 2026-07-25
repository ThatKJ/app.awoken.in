import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IndustryCard } from "@/components/product/industry-card"
import { RecoveryConcept } from "@/components/product/recovery-concept"
import { IndustryPreview } from "@/components/product/industry-preview"
import { CTASection } from "@/components/product/cta-section"
import { industries } from "@/data/industries"

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <Container as="section" className="py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="soft" className="mb-6">
              Revenue Recovery System
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-text-primary">
              See what happens to the opportunities your business is already generating.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Choose your business to explore how Awoken detects, responds to, follows up with,
              and recovers opportunities before they disappear.
            </p>
          </div>
        </Container>
      </section>

      {/* Industry Selection */}
      <section className="py-14 sm:py-18 md:py-22 lg:py-26">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
              What kind of business do you run?
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <IndustryCard
                key={industry.slug}
                slug={industry.slug}
                name={industry.name}
                description={industry.shortDescription}
                problemStatement={industry.problemStatement}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Revenue Recovery Concept */}
      <RecoveryConcept />

      {/* Industry Preview */}
      <IndustryPreview />

      {/* CTA */}
      <CTASection />
    </>
  )
}
