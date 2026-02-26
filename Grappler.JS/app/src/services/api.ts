import axios from 'axios'
import type { Transaction, Dispute, Evidence, NegotiationResult, ApiResponse } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const transactionApi = {
  getTransactions: () => apiClient.get<ApiResponse<Transaction[]>>('/transactions'),
  getTransaction: (id: string) => apiClient.get<ApiResponse<Transaction>>(`/transactions/${id}`),
  createTransaction: (data: Partial<Transaction>) =>
    apiClient.post<ApiResponse<Transaction>>('/transactions', data),
}

export const disputeApi = {
  getDisputes: () => apiClient.get<ApiResponse<Dispute[]>>('/disputes'),
  getDispute: (id: string) => apiClient.get<ApiResponse<Dispute>>(`/disputes/${id}`),
  createDispute: (data: Partial<Dispute>) =>
    apiClient.post<ApiResponse<Dispute>>('/disputes', data),
  updateDispute: (id: string, data: Partial<Dispute>) =>
    apiClient.put<ApiResponse<Dispute>>(`/disputes/${id}`, data),
}

export const evidenceApi = {
  uploadEvidence: (disputeId: string, file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('disputeId', disputeId)
    return apiClient.post<ApiResponse<Evidence>>('/evidence/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  getEvidence: (id: string) => apiClient.get<ApiResponse<Evidence>>(`/evidence/${id}`),
  verifyEvidence: (id: string) =>
    apiClient.post<ApiResponse<Evidence>>(`/evidence/${id}/verify`, {}),
}

export const negotiationApi = {
  initiateNegotiation: (transactionId: string, sellerId: string) =>
    apiClient.post<ApiResponse<NegotiationResult>>('/negotiation/initiate', {
      transactionId,
      sellerId,
    }),
  getNegotiationStatus: (transactionId: string) =>
    apiClient.get<ApiResponse<NegotiationResult>>(`/negotiation/${transactionId}`),
}

export default apiClient
