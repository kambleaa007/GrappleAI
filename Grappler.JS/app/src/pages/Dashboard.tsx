import { useEffect, useState } from 'react'
import { BarChart3, AlertCircle, TrendingUp } from 'lucide-react'
import { useDisputeStore } from '@/store/useDisputeStore'
import { disputeApi } from '@/services/api'
import { DisputeCard } from '@/components/DisputeCard'

export function Dashboard() {
  const { disputes, setDisputes, loading, setLoading, error, setError } = useDisputeStore()
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    inProgress: 0,
    successRate: 0,
  })

  useEffect(() => {
    fetchDisputes()
  }, [])

  const fetchDisputes = async () => {
    setLoading(true)
    try {
      const response = await disputeApi.getDisputes()
      if (response.data.success && response.data.data) {
        setDisputes(response.data.data)
        calculateStats(response.data.data)
      }
    } catch (err) {
      setError('Failed to fetch disputes')
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (disputes: any[]) => {
    const total = disputes.length
    const resolved = disputes.filter((d) => d.status === 'resolved').length
    const inProgress = disputes.filter((d) => d.status === 'in_progress').length
    const successRate = total > 0 ? (resolved / total) * 100 : 0

    setStats({ total, resolved, inProgress, successRate })
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={AlertCircle}
          label="Total Disputes"
          value={stats.total}
          color="bg-blue-50"
        />
        <StatCard
          icon={TrendingUp}
          label="Resolved"
          value={stats.resolved}
          color="bg-green-50"
        />
        <StatCard
          icon={BarChart3}
          label="In Progress"
          value={stats.inProgress}
          color="bg-yellow-50"
        />
        <StatCard
          icon={TrendingUp}
          label="Success Rate"
          value={`${stats.successRate.toFixed(1)}%`}
          color="bg-purple-50"
        />
      </div>

      {/* Disputes List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Disputes</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading disputes...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : disputes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No disputes yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {disputes.map((dispute) => (
              <DisputeCard key={dispute.id} dispute={dispute} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
  color: string
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div className={`${color} rounded-lg p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
    </div>
  )
}
