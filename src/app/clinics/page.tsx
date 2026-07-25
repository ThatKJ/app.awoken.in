import type { Metadata } from "next"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/product/page-header"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getIndustry } from "@/data/industries"

export const metadata: Metadata = {
  title: "Clinics Playbook",
  description: "Recover patient demand that never becomes an appointment.",
}

export default function ClinicsPage() {
  const industry = getIndustry("clinics")

  if (!industry) return null

  return (
    <section className="py-10 sm:py-14 md:py-16 lg:py-20">
      <Container as="section">
        <PageHeader
          title={`${industry.name} Playbook`}
          description={industry.coreProblem}
          showBack
        />

        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="warning">Revenue Leak</Badge>
            </div>
            <CardTitle className="text-lg">The Problem</CardTitle>
            <CardDescription className="mt-1.5">
              {industry.revenueLeak}
            </CardDescription>
          </CardHeader>
        </Card>
      </Container>
    </section>
  )
}
