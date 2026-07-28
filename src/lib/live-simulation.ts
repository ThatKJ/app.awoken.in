import { eventBus, Events } from "./event-bus"

const firstNames = ["Priya", "Rajesh", "Ananya", "Vikram", "Neha", "Arjun", "Kavya", "Rohan", "Isha", "Dev"]
const lastNames = ["Sharma", "Kumar", "Patel", "Singh", "Verma", "Gupta", "Joshi", "Malhotra", "Rao", "Nair"]

function randomName() {
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const workerNames = ["Elena", "Marcus", "Priya", "James", "Aria"]

let leadCounter = 0
let convCounter = 0
let dealCounter = 0

function simulateLeadQualified() {
  leadCounter++
  const name = randomName()
  const confidence = randomInt(78, 99)
  eventBus.emit(Events.LEAD_QUALIFIED, {
    id: `lead-${leadCounter}`,
    name,
    confidence,
    source: pick(["Website", "Referral", "MLS", "Email Campaign", "Social Media"]),
  })
  eventBus.emit(Events.ACTIVITY_NEW, {
    id: `act-lead-${leadCounter}`,
    icon: "bot",
    text: `Elena qualified lead ${name}`,
    detail: `Confidence ${confidence}% · Auto-approved → Convert`,
    timestamp: new Date(),
    type: "ai",
  })
}

function simulateConversation() {
  convCounter++
  const name = randomName()
  eventBus.emit(Events.CONVERSATION_REPLIED, { id: `conv-${convCounter}`, name })
  eventBus.emit(Events.ACTIVITY_NEW, {
    id: `act-conv-${convCounter}`,
    icon: "message",
    text: `Marcus resolved query for ${name}`,
    detail: "Contract terms explained · 4 messages",
    timestamp: new Date(),
    type: "ai",
  })
}

function simulateDealWon() {
  dealCounter++
  const amount = randomInt(3, 25)
  eventBus.emit(Events.DEAL_WON, {
    id: `deal-${dealCounter}`,
    description: `${randomName()} deal closed at ₹${amount}L`,
    amount,
  })
  eventBus.emit(Events.ACTIVITY_NEW, {
    id: `act-deal-${dealCounter}`,
    icon: "target",
    text: `Deal won — ${randomName()}`,
    detail: `₹${amount}L · 18-day cycle`,
    timestamp: new Date(),
    type: "ai",
  })
}

function simulateWorkerUpdate() {
  const name = pick(workerNames)
  eventBus.emit(Events.WORKER_STATS_UPDATED, {
    name,
    conversations: randomInt(5, 28),
    confidence: randomInt(82, 98),
    queue: randomInt(0, 6),
    avgTime: `${randomInt(30, 90)}s`,
  })
}

function simulateWorkerEscalation() {
  const name = pick(workerNames)
  eventBus.emit(Events.WORKER_ESCALATED, {
    name,
    reason: `${name} flagged anomalous lead pattern — requires manual review`,
  })
  eventBus.emit(Events.ACTIVITY_NEW, {
    id: `act-esc-${Date.now()}`,
    icon: "alert",
    text: `${name} escalated a lead`,
    detail: "Confidence dropped below threshold · Needs review",
    timestamp: new Date(),
    type: "human",
  })
}

function simulateKpiUpdate() {
  eventBus.emit(Events.KPI_UPDATED, {
    automations: randomInt(38, 45),
    conversations: randomInt(10, 16),
    qualified: randomInt(4, 9),
    visits: randomInt(1, 4),
    recovered: randomInt(28, 38) * 100000,
  })
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

let running = false

export async function startLiveSimulation() {
  if (running) return
  running = true

  // eslint-disable-next-line no-constant-condition
  while (running) {
    await sleep(randomInt(6000, 18000))
    if (!running) break

    const roll = Math.random()
    if (roll < 0.25) {
      simulateLeadQualified()
    } else if (roll < 0.45) {
      simulateConversation()
    } else if (roll < 0.55) {
      simulateDealWon()
    } else if (roll < 0.65) {
      simulateWorkerEscalation()
    } else if (roll < 0.80) {
      simulateWorkerUpdate()
    } else {
      simulateKpiUpdate()
    }
  }
}

export function stopLiveSimulation() {
  running = false
}
