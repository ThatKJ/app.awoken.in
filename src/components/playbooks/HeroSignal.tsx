"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Phone, Globe, MessageCircle, Mail } from "lucide-react"

const channels = [
  { icon: Phone, label: "Phone" },
  { icon: Globe, label: "Website" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Mail, label: "Email" },
]

const stages = ["Inquiry", "Response", "Conversation", "Deal"]

export function HeroSignal() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="py-16 sm:py-20 md:py-24 lg:py-28">
        <Container>
          {/* Label */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/10 bg-accent/5 px-3 py-1 text-xs font-semibold text-accent">
              Real Estate / Opportunity Recovery
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-text-primary">
            Every inquiry starts as an opportunity.
          </h1>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            What happens next determines whether it becomes a conversation, a viewing, a deal — or disappears without anyone noticing.
          </p>

          {/* Signal Flow Visual */}
          <div className="mt-14 sm:mt-16 md:mt-20">
            {/* Inbound Channels */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
              {channels.map((ch, i) => (
                <motion.div
                  key={ch.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 sm:px-5 sm:py-3.5"
                >
                  <ch.icon className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-text-primary">{ch.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Convergence Arrow */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center my-4 sm:my-5"
            >
              <div className="flex flex-col items-center gap-1.5">
                <div className="h-6 sm:h-8 w-px bg-gradient-to-b from-accent to-accent/40" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                  Converges Into
                </span>
                <div className="h-6 sm:h-8 w-px bg-gradient-to-b from-accent/40 to-accent" />
              </div>
            </motion.div>

            {/* Single Opportunity */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              className="mx-auto max-w-xs text-center"
            >
              <div className="rounded-xl border-2 border-accent/20 bg-accent/5 px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  One Opportunity
                </p>
                <p className="mt-1 text-lg font-bold text-text-primary">Aarav Mehta</p>
                <p className="text-sm text-text-secondary">3 BHK · Dubai Marina</p>
              </div>
            </motion.div>

            {/* Journey Flow Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="mt-8 flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
            >
              {stages.map((s, i) => (
                <div key={s} className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                    <span className="text-xs font-bold text-text-secondary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold text-text-primary">{s}</span>
                  </div>
                  {i < stages.length - 1 && (
                    <div className="h-px w-4 bg-border" />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  )
}
