import { create } from 'zustand'
import type { Dispute, Evidence } from '@/types'

interface DisputeStore {
  disputes: Dispute[]
  selectedDispute: Dispute | null
  evidence: Evidence[]
  loading: boolean
  error: string | null

  setDisputes: (disputes: Dispute[]) => void
  setSelectedDispute: (dispute: Dispute | null) => void
  addDispute: (dispute: Dispute) => void
  updateDispute: (id: string, dispute: Partial<Dispute>) => void
  setEvidence: (evidence: Evidence[]) => void
  addEvidence: (evidence: Evidence) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useDisputeStore = create<DisputeStore>((set) => ({
  disputes: [],
  selectedDispute: null,
  evidence: [],
  loading: false,
  error: null,

  setDisputes: (disputes) => set({ disputes }),
  setSelectedDispute: (dispute) => set({ selectedDispute: dispute }),
  addDispute: (dispute) =>
    set((state) => ({ disputes: [dispute, ...state.disputes] })),
  updateDispute: (id, updates) =>
    set((state) => ({
      disputes: state.disputes.map((d) => (d.id === id ? { ...d, ...updates } : d)),
      selectedDispute:
        state.selectedDispute?.id === id
          ? { ...state.selectedDispute, ...updates }
          : state.selectedDispute,
    })),
  setEvidence: (evidence) => set({ evidence }),
  addEvidence: (evidence) =>
    set((state) => ({ evidence: [evidence, ...state.evidence] })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}))
