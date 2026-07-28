"use client"

import { useState, useCallback, useEffect } from "react"
import { eventBus, Events } from "@/lib/event-bus"

export type Notification = {
  id: string
  type: "critical" | "warning" | "info" | "success"
  title: string
  description: string
  timestamp: Date
  read: boolean
  archived: boolean
}

const SAMPLE: Notification[] = [
  { id: "n1", type: "critical", title: "Worker Escalated", description: "Lead qualification worker needs review — confidence dropped below 70%", timestamp: new Date(Date.now() - 2 * 60 * 1000), read: false, archived: false },
  { id: "n2", type: "warning", title: "Integration Expiring", description: "MLS token expires in 2 days", timestamp: new Date(Date.now() - 15 * 60 * 1000), read: false, archived: false },
  { id: "n3", type: "info", title: "Weekly Report Ready", description: "Your performance summary is available", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), read: false, archived: false },
  { id: "n4", type: "success", title: "Lead Qualified", description: "Priya Sharma was automatically qualified (92% confidence)", timestamp: new Date(Date.now() - 5 * 60 * 1000), read: false, archived: false },
  { id: "n5", type: "info", title: "Deal Won", description: "Sunrise Estates deal closed at ₹12.5L", timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), read: true, archived: false },
  { id: "n6", type: "warning", title: "Missed SLA", description: "Response time exceeded for 2 conversations", timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), read: true, archived: false },
  { id: "n7", type: "success", title: "Integration Connected", description: "Google Calendar sync completed successfully", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), read: true, archived: false },
]

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE)

  useEffect(() => {
    const unsubs = [
      eventBus.on(Events.LEAD_QUALIFIED, (data: any) => {
        addNotification({ type: "success", title: "Lead Qualified", description: `${data?.name ?? "A lead"} was qualified` })
      }),
      eventBus.on(Events.WORKER_ESCALATED, (data: any) => {
        addNotification({ type: "critical", title: "Worker Escalated", description: data?.reason ?? "Worker needs review" })
      }),
      eventBus.on(Events.DEAL_WON, (data: any) => {
        addNotification({ type: "success", title: "Deal Won", description: data?.description ?? "Deal closed" })
      }),
      eventBus.on(Events.CONVERSATION_REPLIED, () => {
        addNotification({ type: "info", title: "Conversation Replied", description: "AI responded to a conversation" })
      }),
      eventBus.on(Events.INTEGRATION_STATUS, (data: any) => {
        addNotification({
          type: data?.status === "disconnected" ? "warning" : "success",
          title: data?.status === "disconnected" ? "Integration Disconnected" : "Integration Connected",
          description: data?.description ?? "",
        })
      }),
    ]
    return () => unsubs.forEach((u) => u())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addNotification = useCallback((n: { type: Notification["type"]; title: string; description: string }) => {
    const notif: Notification = {
      id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: n.type,
      title: n.title,
      description: n.description,
      timestamp: new Date(),
      read: false,
      archived: false,
    }
    setNotifications((prev) => [notif, ...prev])
    eventBus.emit(Events.NOTIFICATION_NEW, notif)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read && !n.archived).length

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => (n.read ? n : { ...n, read: true })))
  }, [])

  const archive = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, archived: true } : n)))
  }, [])

  const grouped = useCallback(() => {
    const now = Date.now()
    const groups: { label: string; items: Notification[] }[] = []
    const today: Notification[] = []
    const yesterday: Notification[] = []
    const earlier: Notification[] = []

    notifications
      .filter((n) => !n.archived)
      .forEach((n) => {
        const diff = now - n.timestamp.getTime()
        if (diff < 24 * 60 * 60 * 1000) today.push(n)
        else if (diff < 48 * 60 * 60 * 1000) yesterday.push(n)
        else earlier.push(n)
      })

    if (today.length) groups.push({ label: "Today", items: today })
    if (yesterday.length) groups.push({ label: "Yesterday", items: yesterday })
    if (earlier.length) groups.push({ label: "Earlier", items: earlier })
    return groups
  }, [notifications])

  return { notifications, unreadCount, addNotification, markRead, markAllRead, archive, grouped: grouped() }
}
