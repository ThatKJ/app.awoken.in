import type { Conversation, Message } from "@/types"

const conversations: Conversation[] = [
  { id: "c1", lead_id: "l1", lead_name: "Rahul Patel", channel: "whatsapp", worker_name: "Response Worker", worker_type: "lead_response", last_message: "Yes, I'm interested in the 3BHK. Can I see it this weekend?", last_timestamp: "2 min ago", unread: 2, status: "active", ai_confidence: 92, is_escalated: false, is_ai: true },
  { id: "c2", lead_id: "l2", lead_name: "Priya Sharma", channel: "whatsapp", worker_name: "Qualification Worker", worker_type: "qualification", last_message: "What's the maintenance cost for this property?", last_timestamp: "15 min ago", unread: 0, status: "active", ai_confidence: 87, is_escalated: false, is_ai: true },
  { id: "c3", lead_id: "l3", lead_name: "Amit Singh", channel: "email", worker_name: "Follow-up Worker", worker_type: "followup", last_message: "Hi, I checked the brochure. Can you share the floor plan?", last_timestamp: "1 hour ago", unread: 1, status: "waiting", ai_confidence: 45, is_escalated: false, is_ai: true },
  { id: "c4", lead_id: "l4", lead_name: "Sneha Reddy", channel: "whatsapp", worker_name: "Response Worker", worker_type: "lead_response", last_message: "Please call me after 6 PM", last_timestamp: "3 hours ago", unread: 0, status: "escalated", ai_confidence: 28, is_escalated: true, is_ai: false },
  { id: "c5", lead_id: "l5", lead_name: "Vikram Joshi", channel: "sms", worker_name: "Recovery Worker", worker_type: "recovery", last_message: "Is this offer still valid?", last_timestamp: "1 day ago", unread: 0, status: "waiting", ai_confidence: 34, is_escalated: false, is_ai: true },
  { id: "c6", lead_id: "l6", lead_name: "Ananya Gupta", channel: "whatsapp", worker_name: "Appointment Worker", worker_type: "appointment", last_message: "Saturday 11 AM works for us!", last_timestamp: "30 min ago", unread: 3, status: "active", ai_confidence: 95, is_escalated: false, is_ai: true },
  { id: "c7", lead_id: "l7", lead_name: "Neha Kapoor", channel: "email", worker_name: "Recovery Worker", worker_type: "recovery", last_message: "We have a new project that matches your requirements", last_timestamp: "2 days ago", unread: 0, status: "waiting", ai_confidence: 22, is_escalated: false, is_ai: true },
  { id: "c8", lead_id: "l8", lead_name: "Rohan Desai", channel: "whatsapp", worker_name: "Qualification Worker", worker_type: "qualification", last_message: "Can you share the payment plan?", last_timestamp: "45 min ago", unread: 1, status: "active", ai_confidence: 88, is_escalated: false, is_ai: true },
]

const messages: Record<string, Message[]> = {
  c1: [
    { id: "m1", conversation_id: "c1", sender: "lead", channel: "whatsapp", content: "Hi, I saw your listing for the 3BHK in Viman Nagar", type: "text", created_at: "2024-01-15T10:00:00Z" },
    { id: "m2", conversation_id: "c1", sender: "worker", channel: "whatsapp", content: "Hello Rahul! Great choice. The 3BHK at Viman Nagar is one of our most popular options. Would you like to know more about the pricing?", type: "text", created_at: "2024-01-15T10:00:30Z" },
    { id: "m3", conversation_id: "c1", sender: "lead", channel: "whatsapp", content: "Yes, I'm interested in the 3BHK. Can I see it this weekend?", type: "text", created_at: "2024-01-15T10:02:00Z" },
  ],
  c2: [
    { id: "m4", conversation_id: "c2", sender: "worker", channel: "whatsapp", content: "Hi Priya! We have several options in your budget. Let me ask you a few questions to find the perfect match.", type: "text", created_at: "2024-01-15T09:45:00Z" },
    { id: "m5", conversation_id: "c2", sender: "lead", channel: "whatsapp", content: "What's the maintenance cost for this property?", type: "text", created_at: "2024-01-15T09:50:00Z" },
  ],
}

export const ConversationsService = {
  async list() {
    return conversations
  },

  async getById(id: string) {
    return conversations.find((c) => c.id === id) ?? null
  },

  async getMessages(conversationId: string) {
    return messages[conversationId] ?? []
  },
}
