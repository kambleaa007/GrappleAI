export interface Transaction {
  id: string
  amount: number
  currency: string
  status: 'completed' | 'pending' | 'failed'
  timestamp: string
  seller: string
  description: string
}

export interface Dispute {
  id: string
  transactionId: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  damageDescription: string
  confidenceScore: number
  evidenceId?: string
  createdAt: string
  updatedAt: string
}

export interface Evidence {
  id: string
  disputeId: string
  type: 'image' | 'video' | 'document'
  url: string
  confidenceScore: number
  verified: boolean
  uploadedAt: string
}

export interface NegotiationResult {
  transactionId: string
  strategy: 'aggressive' | 'balanced' | 'conservative'
  demand: string
  status: 'pending' | 'accepted' | 'rejected' | 'counter_offered'
  counterOffer?: string
}

export interface MCPRequest {
  method: string
  params: Record<string, any>
}

export interface MCPResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
