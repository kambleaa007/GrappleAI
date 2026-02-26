import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react'
import type { Dispute } from '@/types'

interface DisputeCardProps {
  dispute: Dispute
  onClick?: () => void
}

const statusConfig = {
  open: { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  in_progress: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
  resolved: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  closed: { icon: XCircle, color: 'text-gray-600', bg: 'bg-gray-50' },
}

export function DisputeCard({ dispute, onClick }: DisputeCardProps) {
  const config = statusConfig[dispute.status]
  const Icon = config.icon

  return (
    <div
      onClick={onClick}
      className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${config.color}`} />
          <span className={`text-sm font-medium px-2 py-1 rounded ${config.bg}`}>
            {dispute.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(dispute.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-2 line-clamp-2">
        {dispute.damageDescription}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600">
          Transaction: {dispute.transactionId.slice(0, 8)}...
        </span>
        <div className="flex items-center gap-1">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${dispute.confidenceScore * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium text-gray-700">
            {(dispute.confidenceScore * 100).toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  )
}
