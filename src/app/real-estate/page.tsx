import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { HeroSignal } from "@/components/playbooks/HeroSignal"
import { LiveOpportunity } from "@/components/playbooks/LiveOpportunity"
import { OpportunityJourney } from "@/components/playbooks/OpportunityJourney"
import { LeakInterruption } from "@/components/playbooks/LeakInterruption"
import { RecoverySequence } from "@/components/playbooks/RecoverySequence"
import { BeforeAfterImpact } from "@/components/playbooks/BeforeAfterImpact"

export const metadata: Metadata = {
  title: "Real Estate | Opportunity Recovery System",
  description:
    "Explore how Awoken recovers real estate opportunities that would otherwise disappear.",
}

export default function RealEstatePage() {
  return (
    <>
      {/* Section 1 — System Introduction */}
      <HeroSignal />

      {/* Section 2 — Live Opportunity */}
      <LiveOpportunity />

      {/* Section 3 — The Journey */}
      <OpportunityJourney />

      {/* Section 4 — Leaks */}
      <LeakInterruption />

      {/* Section 5 — Recovery */}
      <RecoverySequence />

      {/* Section 6 — Before / After + Metrics */}
      <BeforeAfterImpact />

      {/* Section 7 — Final CTA */}
      <section className="border-t border-border py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.08] text-text-primary">
              Where are your opportunities disappearing?
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Every business has a different opportunity journey. The first step is finding where yours breaks.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button variant="primary" size="lg">
                  Explore Your Opportunity Flow
                </Button>
              </Link>
              <Link href="https://www.awoken.in/book" target="_blank">
                <Button variant="secondary" size="lg">
                  Book a Business Intelligence Audit
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
