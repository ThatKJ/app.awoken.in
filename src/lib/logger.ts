const isDev = process.env.NODE_ENV === "development"

type LogLevel = "debug" | "info" | "warn" | "error"

const levels: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 }

function shouldLog(level: LogLevel): boolean {
  return levels[level] >= (isDev ? 0 : 1)
}

function formatMessage(level: LogLevel, message: string, meta?: unknown) {
  const timestamp = new Date().toISOString()
  const metaStr = meta !== undefined ? ` ${JSON.stringify(meta)}` : ""
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`
}

export const logger = {
  debug(message: string, meta?: unknown) {
    if (!shouldLog("debug")) return
    if (isDev) console.debug(formatMessage("debug", message, meta))
  },
  info(message: string, meta?: unknown) {
    if (!shouldLog("info")) return
    if (isDev) console.info(formatMessage("info", message, meta))
  },
  warn(message: string, meta?: unknown) {
    if (!shouldLog("warn")) return
    console.warn(formatMessage("warn", message, meta))
  },
  error(message: string, meta?: unknown) {
    if (!shouldLog("error")) return
    console.error(formatMessage("error", message, meta))
  },
}
