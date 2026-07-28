export const queryKeys = {
  workers: {
    all: ["workers"] as const,
    detail: (id: string) => ["workers", id] as const,
    health: ["workers", "health"] as const,
    kpis: ["workers", "kpis"] as const,
  },
  leads: {
    all: ["leads"] as const,
    detail: (id: string) => ["leads", id] as const,
    byStatus: (status: string) => ["leads", "status", status] as const,
  },
  tasks: {
    all: ["tasks"] as const,
    detail: (id: string) => ["tasks", id] as const,
    pending: ["tasks", "pending"] as const,
    approvals: ["tasks", "approvals"] as const,
    byWorker: (workerId: string) => ["tasks", "worker", workerId] as const,
  },
  commandCenter: {
    summary: ["commandCenter", "summary"] as const,
    activity: ["commandCenter", "activity"] as const,
  },
  opportunities: {
    all: ["opportunities"] as const,
    detail: (id: string) => ["opportunities", id] as const,
  },
  conversations: {
    all: ["conversations"] as const,
    detail: (id: string) => ["conversations", id] as const,
  },
  notifications: {
    all: ["notifications"] as const,
  },
  integrations: {
    all: ["integrations"] as const,
  },
}
