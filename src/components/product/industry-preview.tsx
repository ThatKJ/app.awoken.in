import { cn } from "@/lib/utils"
import { industries } from "@/data/industries"

const industryColors: Record<string, string> = {
  "real-estate": "bg-accent",
  clinics: "bg-info",
  "local-business": "bg-success",
}

export function IndustryPreview() {
  return (
    <section className="border-t border-border py-14 sm:py-18 md:py-22 lg:py-26">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
            Same System, Different Business
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            The recovery chain adapts to how your industry works. The flow is universal. The context is yours.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {industries.map((industry) => (
            <div key={industry.slug} className="flex flex-col">
              <h3 className="text-base font-semibold text-text-primary">
                {industry.name}
              </h3>
              <div className="mt-4 space-y-3">
                {industry.journeySteps.map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white",
                        industryColors[industry.slug],
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-text-secondary">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
