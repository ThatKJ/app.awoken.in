type EventHandler = (data: unknown) => void

class EventBus {
  private listeners = new Map<string, Set<EventHandler>>()

  on(event: string, handler: EventHandler) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set())
    this.listeners.get(event)!.add(handler)
    return () => this.off(event, handler)
  }

  off(event: string, handler: EventHandler) {
    this.listeners.get(event)?.delete(handler)
  }

  emit(event: string, data?: unknown) {
    this.listeners.get(event)?.forEach((h) => h(data))
  }
}

export const eventBus = new EventBus()

export const Events = {
  LEAD_QUALIFIED: "lead:qualified",
  CONVERSATION_REPLIED: "conversation:replied",
  DEAL_WON: "deal:won",
  DEAL_LOST: "deal:lost",
  WORKER_STATUS_CHANGED: "worker:status-changed",
  WORKER_ESCALATED: "worker:escalated",
  WORKER_STATS_UPDATED: "worker:stats-updated",
  KNOWLEDGE_INDEXED: "knowledge:indexed",
  INTEGRATION_STATUS: "integration:status",
  KPI_UPDATED: "kpi:updated",
  PIPELINE_UPDATED: "pipeline:updated",
  NOTIFICATION_NEW: "notification:new",
  ACTIVITY_NEW: "activity:new",
} as const
