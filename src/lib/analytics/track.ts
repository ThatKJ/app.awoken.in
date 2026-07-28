import { logger } from "@/lib/logger"

type EventProperties = Record<string, string | number | boolean | null | undefined>

export function track(event: string, properties?: EventProperties) {
  logger.info(`[Analytics] ${event}`, properties)
}
