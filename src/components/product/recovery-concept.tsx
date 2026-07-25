import { ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { label: "Demand", description: "Every inbound signal — calls, forms, messages" },
  { label: "Opportunity", description: "Qualified intent that could become revenue" },
  { label: "Response", description: "Instant, intelligent engagement across channels" },
  { label: "Follow-Up", description: "Persistent, sequenced outreach until conversion" },
  { label: "Conversion", description: "Booking, appointment, or closed outcome" },
  { label: "Recovery", description: "Reactivation and re-engagement of lost opportunities" },
]

export function RecoveryConcept() {
  return (
    <section className="border-t border-border py-14 sm:py-18 md:py-22 lg:py-26">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
            The Revenue Recovery Chain
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Every industry generates demand. The question is what happens between that moment and the outcome.
            The industry playbook changes. The underlying philosophy remains the same.
          </p>
        </div>

        <div className="relative mt-16 grid gap-6 sm:gap-4 md:grid-cols-6">
          {steps.map((step, index) => (
            <div key={step.label} className="relative flex flex-col items-center text-center">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                  index === steps.length - 1
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-background text-text-secondary",
                )}
              >
                {index + 1}
              </div>
              <span className="mt-3 text-sm font-semibold text-text-primary">
                {step.label}
              </span>
              <span className="mt-1 hidden text-xs leading-relaxed text-muted-foreground md:block">
                {step.description}
              </span>
              {index < steps.length - 1 && (
                <ArrowDown className="mt-2 hidden h-4 w-4 shrink-0 text-border md:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-xl text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Opportunities are generated but lost somewhere between initial demand and business outcome.
            <span className="block mt-1 font-medium text-text-primary">
              Awoken closes that gap.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
