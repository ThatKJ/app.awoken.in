"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { demoLead } from "@/data/real-estate-playbook"

export function LiveOpportunity() {
  return (
    <section className="border-b border-border py-16 sm:py-20 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Detection Banner */}
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-success">
              New Opportunity Detected
            </span>
          </div>

          {/* Opportunity Card */}
          <div className="rounded-xl border border-border bg-background overflow-hidden">
            <div className="grid sm:grid-cols-[1fr_auto] gap-6 p-6 sm:p-8 lg:p-10">
              {/* Main Info */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                      {demoLead.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {demoLead.inquiryType} · {demoLead.propertyInterest} · {demoLead.location}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-accent/10 bg-accent/5 px-3 py-1 text-[11px] font-semibold text-accent">
                    {demoLead.status}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Source
                    </p>
                    <p className="mt-1 text-sm font-medium text-text-primary">
                      {demoLead.source}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Budget
                    </p>
                    <p className="mt-1 text-sm font-medium text-text-primary">
                      {demoLead.budget}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Timeline
                    </p>
                    <p className="mt-1 text-sm font-medium text-text-primary">
                      {demoLead.timeline}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Intent
                    </p>
                    <p className="mt-1 text-sm font-medium text-text-primary">
                      High
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Preview */}
              <div className="sm:w-48 sm:border-l sm:border-border sm:pl-6 sm:pt-0 pt-6 border-t border-border sm:border-t-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Activity
                </p>
                <div className="mt-3 space-y-3">
                  {[
                    { time: "09:42", event: "Inquiry received" },
                    { time: "09:42", event: "Opportunity detected" },
                    { time: "09:43", event: "Response initiated" },
                  ].map((item) => (
                    <div key={item.event} className="flex items-start gap-2.5">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" />
                      <div>
                        <p className="text-[11px] font-medium text-text-secondary">
                          {item.time}
                        </p>
                        <p className="text-xs text-text-primary">{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Demo Label */}
            <div className="border-t border-border bg-surface px-6 sm:px-8 lg:px-10 py-2.5">
              <p className="text-[11px] text-muted-foreground">
                {demoLead.demoLabel}
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
