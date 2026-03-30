export const DocumentType = {
  CONTRACT: "contract",
  INVOICE: "invoice",
  REPORT: "report",
  LEGAL: "legal",
  TECHNICAL: "technical",
  ACADEMIC: "academic",
  GENERAL: "general",
  UNKNOWN: "unknown"
} as const;

export type DocumentType = typeof DocumentType[keyof typeof DocumentType];

export const AgentStatus = {
  PENDING: "pending",
  RUNNING: "running",
  DONE: "done",
  ERROR: "error"
} as const;

export type AgentStatus = typeof AgentStatus[keyof typeof AgentStatus];

export interface AgentResult {
  agent_name: string;
  status: AgentStatus;
  output: Record<string, any>;
}

export interface TranslationResponse {
  file_name: string;
  document_type: DocumentType;
  document_type_confidence: number;
  extracted_text: string;
  pinyin: string;
  summary: string;
  translated_text: string;
  agent_results: AgentResult[];
}

export interface ErrorResponse {
  detail: string;
}