import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DisputeForm } from '@/components/DisputeForm'
import { useDisputeStore } from '@/store/useDisputeStore'
import { disputeApi } from '@/services/api'
import type { Dispute } from '@/types'

export function CreateDispute() {
  const navigate = useNavigate()
  const { addDispute, setError, setLoading, loading } = useDisputeStore()
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (data: Partial<Dispute>) => {
    setLoading(true)
    try {
      const response = await disputeApi.createDispute(data)
      if (response.data.success && response.data.data) {
        addDispute(response.data.data)
        setSuccess(true)
        setTimeout(() => {
          navigate(`/disputes/${response.data.data?.id}`)
        }, 1500)
      }
    } catch (err) {
      setError('Failed to create dispute')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">File a Dispute</h1>
        <p className="text-gray-600 mt-2">
          Provide details about your transaction issue and let GrappleAI advocate for you.
        </p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          ✓ Dispute created successfully! Redirecting...
        </div>
      )}

      <DisputeForm onSubmit={handleSubmit} loading={loading} />

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>1. Describe your issue and upload evidence (photos/videos)</li>
          <li>2. GrappleAI analyzes your case and assigns a confidence score</li>
          <li>3. If strong enough, we automatically negotiate with the seller</li>
          <li>4. You receive updates in your preferred language</li>
        </ul>
      </div>
    </div>
  )
}
