export type KnowledgeStatus = "ready" | "processing" | "embedding" | "error"

export type KnowledgeDocument = {
  id: string
  title: string
  folder_id: string | null
  folder_name: string | null
  type: "pdf" | "docx" | "txt" | "md" | "csv"
  size: number
  pages: number
  created_at: string
  updated_at: string
  status: KnowledgeStatus
  confidence: number
  tags: string[]
  workers: { id: string; name: string; type: string }[]
  preview: string
  usage_count: number
  embedding_status: "complete" | "pending" | "failed"
}

export type KnowledgeFolder = {
  id: string
  name: string
  icon: string
  document_count: number
  parent_id: string | null
  children?: KnowledgeFolder[]
}

export type KnowledgeStats = {
  documents: number
  folders: number
  lastUpdated: string
  coverage: number
}

export type KnowledgeSearchResult = {
  document: KnowledgeDocument
  highlights: string[]
  score: number
}

export type UploadProgress = {
  filename: string
  progress: number
  status: "uploading" | "processing" | "embedding" | "complete" | "error"
  error?: string
}

const folders: KnowledgeFolder[] = [
  { id: "f-all", name: "All Knowledge", icon: "book", document_count: 25, parent_id: null },
  { id: "f-company", name: "Company", icon: "building", document_count: 4, parent_id: null },
  { id: "f-pricing", name: "Pricing", icon: "dollar", document_count: 3, parent_id: null },
  { id: "f-products", name: "Products", icon: "package", document_count: 5, parent_id: null },
  { id: "f-policies", name: "Policies", icon: "shield", document_count: 3, parent_id: null },
  { id: "f-faqs", name: "FAQs", icon: "help", document_count: 2, parent_id: null },
  { id: "f-scripts", name: "Scripts", icon: "message", document_count: 3, parent_id: null },
  { id: "f-sales", name: "Sales", icon: "trending", document_count: 2, parent_id: null },
  { id: "f-legal", name: "Legal", icon: "gavel", document_count: 1, parent_id: null },
  { id: "f-training", name: "Training", icon: "graduation", document_count: 3, parent_id: null },
  { id: "f-archived", name: "Archived", icon: "archive", document_count: 2, parent_id: null },
]

const workers = [
  { id: "w1", name: "Response Worker", type: "lead_response" },
  { id: "w2", name: "Qualification Worker", type: "qualification" },
  { id: "w3", name: "Follow-up Worker", type: "followup" },
  { id: "w4", name: "Appointment Worker", type: "appointment" },
  { id: "w5", name: "Recovery Worker", type: "recovery" },
]

const docs: KnowledgeDocument[] = [
  { id: "d1", title: "Complete Pricing Guide 2026", folder_id: "f-pricing", folder_name: "Pricing", type: "pdf", size: 2_400_000, pages: 24, created_at: "2026-01-10", updated_at: "2026-06-15", status: "ready", confidence: 98, tags: ["pricing", "core"], workers: [workers[0], workers[1], workers[2]], preview: "This comprehensive pricing guide covers all residential and commercial property pricing structures for 2026. Includes base rates, premium floor charges, parking add-ons, and bulk purchase discounts.", usage_count: 1240, embedding_status: "complete" },
  { id: "d2", title: "Company Overview & Values", folder_id: "f-company", folder_name: "Company", type: "pdf", size: 1_800_000, pages: 18, created_at: "2026-01-05", updated_at: "2026-05-20", status: "ready", confidence: 96, tags: ["company", "culture"], workers: [workers[0]], preview: "Awoken is redefining real estate sales through AI-powered workforce orchestration. Our values center on transparency, speed, and human-AI collaboration.", usage_count: 890, embedding_status: "complete" },
  { id: "d3", title: "Property Catalog — Phase 1", folder_id: "f-products", folder_name: "Products", type: "pdf", size: 5_600_000, pages: 62, created_at: "2026-02-01", updated_at: "2026-06-10", status: "ready", confidence: 97, tags: ["properties", "catalog"], workers: [workers[0], workers[1], workers[3]], preview: "Complete catalog of Phase 1 properties including 1BHK, 2BHK, 3BHK, and penthouse units. Detailed floor plans, dimensions, and premium finish specifications.", usage_count: 2100, embedding_status: "complete" },
  { id: "d4", title: "Lead Response Scripts", folder_id: "f-scripts", folder_name: "Scripts", type: "docx", size: 980_000, pages: 12, created_at: "2026-01-20", updated_at: "2026-06-01", status: "ready", confidence: 94, tags: ["scripts", "response"], workers: [workers[0], workers[1]], preview: "Standardized response scripts for inbound lead inquiries covering WhatsApp, website chat, and call-based conversations. Includes objection handling templates.", usage_count: 3450, embedding_status: "complete" },
  { id: "d5", title: "FAQ — Customer Inquiries", folder_id: "f-faqs", folder_name: "FAQs", type: "md", size: 340_000, pages: 8, created_at: "2026-01-15", updated_at: "2026-06-12", status: "ready", confidence: 99, tags: ["faq", "customer"], workers: [workers[0], workers[2], workers[3], workers[4]], preview: "Curated FAQ covering 120+ common customer questions about payments, possession, legal documentation, loan assistance, and post-purchase support.", usage_count: 5670, embedding_status: "complete" },
  { id: "d6", title: "CRM Integration Guide", folder_id: "f-training", folder_name: "Training", type: "md", size: 520_000, pages: 10, created_at: "2026-03-01", updated_at: "2026-05-25", status: "ready", confidence: 91, tags: ["crm", "integration"], workers: [workers[1], workers[3]], preview: "Step-by-step guide for CRM integration covering lead import, pipeline mapping, webhook configuration, and automated sync scheduling.", usage_count: 340, embedding_status: "complete" },
  { id: "d7", title: "Sales Playbook 2026", folder_id: "f-sales", folder_name: "Sales", type: "pdf", size: 4_200_000, pages: 48, created_at: "2026-02-10", updated_at: "2026-06-08", status: "ready", confidence: 95, tags: ["sales", "playbook"], workers: [workers[1], workers[3], workers[4]], preview: "The definitive sales playbook for 2026 covering qualification frameworks, objection handling, closing techniques, and negotiation strategies.", usage_count: 1890, embedding_status: "complete" },
  { id: "d8", title: "Legal Terms & Conditions", folder_id: "f-legal", folder_name: "Legal", type: "pdf", size: 1_200_000, pages: 32, created_at: "2026-01-01", updated_at: "2026-04-15", status: "ready", confidence: 88, tags: ["legal", "terms"], workers: [workers[0], workers[1]], preview: "Standard terms and conditions for property sales including payment schedules, cancellation policy, force majeure, and dispute resolution clauses.", usage_count: 670, embedding_status: "complete" },
  { id: "d9", title: "Property Catalog — Phase 2", folder_id: "f-products", folder_name: "Products", type: "pdf", size: 6_800_000, pages: 78, created_at: "2026-04-01", updated_at: "2026-06-14", status: "embedding", confidence: 85, tags: ["properties", "catalog", "phase2"], workers: [workers[0], workers[1]], preview: "Phase 2 property catalog featuring premium villas and luxury 4BHK apartments with smart home integration and resort-style amenities.", usage_count: 1280, embedding_status: "pending" },
  { id: "d10", title: "Employee Onboarding Handbook", folder_id: "f-company", folder_name: "Company", type: "pdf", size: 3_100_000, pages: 36, created_at: "2026-02-15", updated_at: "2026-05-30", status: "ready", confidence: 93, tags: ["onboarding", "hr"], workers: [], preview: "Complete onboarding handbook for new team members covering company policies, tools, team structure, and 90-day ramp plan.", usage_count: 420, embedding_status: "complete" },
  { id: "d11", title: "Follow-up Sequence Templates", folder_id: "f-scripts", folder_name: "Scripts", type: "docx", size: 650_000, pages: 9, created_at: "2026-03-10", updated_at: "2026-06-05", status: "ready", confidence: 92, tags: ["templates", "followup"], workers: [workers[2], workers[4]], preview: "Automated follow-up sequences for leads at different stages: initial, site-visit, proposal-sent, and re-engagement campaigns.", usage_count: 2340, embedding_status: "complete" },
  { id: "d12", title: "Pricing — Premium Add-ons", folder_id: "f-pricing", folder_name: "Pricing", type: "csv", size: 180_000, pages: 0, created_at: "2026-04-05", updated_at: "2026-06-12", status: "ready", confidence: 97, tags: ["pricing", "premium"], workers: [workers[0], workers[1], workers[3]], preview: "Premium add-on pricing for modular kitchen, automated shades, home automation, landscaping, and custom interior packages.", usage_count: 920, embedding_status: "complete" },
  { id: "d13", title: "Payment Plan Options", folder_id: "f-pricing", folder_name: "Pricing", type: "pdf", size: 1_500_000, pages: 16, created_at: "2026-01-25", updated_at: "2026-06-10", status: "ready", confidence: 96, tags: ["pricing", "payment"], workers: [workers[0], workers[1], workers[2], workers[3]], preview: "Flexible payment plan options including down payment structures, EMI plans, construction-linked plans, and subvention schemes.", usage_count: 3150, embedding_status: "complete" },
  { id: "d14", title: "Handover Process Guide", folder_id: "f-policies", folder_name: "Policies", type: "pdf", size: 2_100_000, pages: 22, created_at: "2026-02-20", updated_at: "2026-05-18", status: "ready", confidence: 90, tags: ["handover", "process"], workers: [workers[3]], preview: "Standard operating procedure for property handover including inspection checklist, documentation requirements, and possession letter templates.", usage_count: 780, embedding_status: "complete" },
  { id: "d15", title: "Customer Complaint SOP", folder_id: "f-policies", folder_name: "Policies", type: "docx", size: 890_000, pages: 11, created_at: "2026-03-15", updated_at: "2026-06-02", status: "ready", confidence: 89, tags: ["complaint", "sop"], workers: [workers[0], workers[4]], preview: "Standard operating procedure for handling customer complaints including escalation matrix, resolution SLAs, and feedback collection.", usage_count: 560, embedding_status: "complete" },
  { id: "d16", title: "Product Brochure — Premium Villas", folder_id: "f-products", folder_name: "Products", type: "pdf", size: 8_200_000, pages: 44, created_at: "2026-04-20", updated_at: "2026-06-11", status: "ready", confidence: 95, tags: ["brochure", "villas"], workers: [workers[0], workers[1], workers[3]], preview: "Luxury brochure for premium villa collection featuring architectural renders, community amenities, and investment highlights.", usage_count: 430, embedding_status: "complete" },
  { id: "d17", title: "Community Guidelines", folder_id: "f-policies", folder_name: "Policies", type: "txt", size: 45_000, pages: 0, created_at: "2026-01-10", updated_at: "2026-03-01", status: "ready", confidence: 87, tags: ["community", "guidelines"], workers: [workers[0], workers[3]], preview: "Community living guidelines covering noise policies, common area usage, visitor management, and maintenance requests.", usage_count: 320, embedding_status: "complete" },
  { id: "d18", title: "Training — Qualification Script", folder_id: "f-training", folder_name: "Training", type: "md", size: 280_000, pages: 6, created_at: "2026-04-10", updated_at: "2026-06-13", status: "ready", confidence: 93, tags: ["training", "qualification"], workers: [workers[1]], preview: "Training module for qualification calls covering BANT framework, lead scoring, documentation verification, and handoff criteria.", usage_count: 210, embedding_status: "complete" },
  { id: "d19", title: "Sales Playbook — Objections", folder_id: "f-sales", folder_name: "Sales", type: "pdf", size: 3_400_000, pages: 36, created_at: "2026-05-01", updated_at: "2026-06-14", status: "processing", confidence: 82, tags: ["sales", "objections"], workers: [workers[1], workers[3], workers[4]], preview: "Advanced objection handling playbook with 50+ real-world scenarios across pricing, location, competition, and timing objections.", usage_count: 1560, embedding_status: "complete" },
  { id: "d20", title: "Product Specs — Smart Home", folder_id: "f-products", folder_name: "Products", type: "pdf", size: 4_500_000, pages: 52, created_at: "2026-05-15", updated_at: "2026-06-15", status: "ready", confidence: 94, tags: ["specs", "smart-home"], workers: [workers[0], workers[1]], preview: "Technical specifications for smart home integration including IoT sensors, automation controllers, energy management, and security systems.", usage_count: 670, embedding_status: "complete" },
  { id: "d21", title: "FAQ — Technical Support", folder_id: "f-faqs", folder_name: "FAQs", type: "md", size: 420_000, pages: 9, created_at: "2026-03-20", updated_at: "2026-06-08", status: "ready", confidence: 91, tags: ["faq", "technical"], workers: [workers[0]], preview: "Technical FAQ covering smart home troubleshooting, maintenance requests, utility connections, and warranty claims.", usage_count: 850, embedding_status: "complete" },
  { id: "d22", title: "Company Brand Guidelines", folder_id: "f-company", folder_name: "Company", type: "pdf", size: 6_100_000, pages: 68, created_at: "2026-01-12", updated_at: "2026-04-20", status: "ready", confidence: 96, tags: ["brand", "design"], workers: [], preview: "Complete brand guidelines covering logo usage, typography, color palette, tone of voice, and visual identity across all communication channels.", usage_count: 190, embedding_status: "complete" },
  { id: "d23", title: "Old Pricing 2025", folder_id: "f-archived", folder_name: "Archived", type: "pdf", size: 2_100_000, pages: 22, created_at: "2025-06-01", updated_at: "2025-12-31", status: "ready", confidence: 60, tags: ["pricing", "archive"], workers: [], preview: "Previous year pricing guide for reference purposes. Superseded by Complete Pricing Guide 2026.", usage_count: 45, embedding_status: "complete" },
  { id: "d24", title: "Deprecated Scripts v1", folder_id: "f-archived", folder_name: "Archived", type: "docx", size: 780_000, pages: 10, created_at: "2025-08-01", updated_at: "2026-01-05", status: "ready", confidence: 55, tags: ["scripts", "archive"], workers: [], preview: "Previous version of response scripts. Use Lead Response Scripts (d4) for current version.", usage_count: 12, embedding_status: "complete" },
  { id: "d25", title: "Training — Appointment Setting", folder_id: "f-training", folder_name: "Training", type: "md", size: 310_000, pages: 7, created_at: "2026-05-10", updated_at: "2026-06-14", status: "error", confidence: 78, tags: ["training", "appointment"], workers: [workers[3]], preview: "Training module for appointment setting including calendar management, confirmation sequences, and rescheduling protocols.", usage_count: 180, embedding_status: "failed" },
]

function formatBytes(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`
  return `${bytes} B`
}

export const KnowledgeService = {
  async getFolders(): Promise<KnowledgeFolder[]> {
    return folders
  },

  async getDocuments(folderId: string | null): Promise<KnowledgeDocument[]> {
    if (!folderId || folderId === "f-all") return docs
    return docs.filter((d) => d.folder_id === folderId)
  },

  async getDocument(id: string): Promise<KnowledgeDocument | null> {
    return docs.find((d) => d.id === id) ?? null
  },

  async getStats(): Promise<KnowledgeStats> {
    const ready = docs.filter((d) => d.status === "ready")
    return {
      documents: docs.length,
      folders: folders.length - 1,
      lastUpdated: "15 Jun 2026",
      coverage: Math.round((ready.length / docs.length) * 100),
    }
  },

  async search(query: string, filters?: { folderId?: string }): Promise<KnowledgeSearchResult[]> {
    let filtered = docs
    if (filters?.folderId && filters.folderId !== "f-all") {
      filtered = filtered.filter((d) => d.folder_id === filters.folderId)
    }
    const q = query.toLowerCase()
    return filtered
      .filter((d) => d.title.toLowerCase().includes(q) || d.preview.toLowerCase().includes(q) || d.tags.some((t) => t.toLowerCase().includes(q)))
      .map((d) => ({
        document: d,
        highlights: [],
        score: d.confidence,
      }))
  },

  async deleteDocument(id: string): Promise<void> {
    const idx = docs.findIndex((d) => d.id === id)
    if (idx !== -1) docs.splice(idx, 1)
  },

  async uploadDocument(file: File, folderId: string | null): Promise<KnowledgeDocument> {
    const doc: KnowledgeDocument = {
      id: `d-upload-${Date.now()}`,
      title: file.name,
      folder_id: folderId,
      folder_name: folders.find((f) => f.id === folderId)?.name ?? null,
      type: file.name.endsWith(".pdf") ? "pdf" : file.name.endsWith(".docx") ? "docx" : file.name.endsWith(".md") ? "md" : file.name.endsWith(".csv") ? "csv" : "txt",
      size: file.size,
      pages: 0,
      created_at: new Date().toISOString().slice(0, 10),
      updated_at: new Date().toISOString().slice(0, 10),
      status: "processing",
      confidence: 0,
      tags: [],
      workers: [],
      preview: "Processing...",
      usage_count: 0,
      embedding_status: "pending",
    }
    docs.unshift(doc)
    return doc
  },

  formatBytes,
  formatDate: (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
}
