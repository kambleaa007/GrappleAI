import { useState } from 'react'
import { Upload, AlertCircle } from 'lucide-react'
import type { Dispute } from '@/types'

interface DisputeFormProps {
  onSubmit: (data: Partial<Dispute>) => void
  loading?: boolean
}

export function DisputeForm({ onSubmit, loading = false }: DisputeFormProps) {
  const [formData, setFormData] = useState({
    transactionId: '',
    damageDescription: '',
    confidenceScore: 0.5,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transaction ID
        </label>
        <input
          type="text"
          value={formData.transactionId}
          onChange={(e) =>
            setFormData({ ...formData, transactionId: e.target.value })
          }
          placeholder="Enter transaction ID"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Damage Description
        </label>
        <textarea
          value={formData.damageDescription}
          onChange={(e) =>
            setFormData({ ...formData, damageDescription: e.target.value })
          }
          placeholder="Describe the damage or issue..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confidence Score: {(formData.confidenceScore * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={formData.confidenceScore}
          onChange={(e) =>
            setFormData({ ...formData, confidenceScore: parseFloat(e.target.value) })
          }
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-2">
          {formData.confidenceScore > 0.8
            ? '✓ Strong case - likely to succeed'
            : formData.confidenceScore > 0.5
              ? '~ Medium case - balanced approach'
              : '⚠ Weak case - may need human review'}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary disabled:opacity-50 transition"
      >
        {loading ? 'Creating Dispute...' : 'Create Dispute'}
      </button>
    </form>
  )
}
