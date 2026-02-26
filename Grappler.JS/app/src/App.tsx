import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Gavel, Home, Plus } from 'lucide-react'
import { Dashboard } from '@/pages/Dashboard'
import { CreateDispute } from '@/pages/CreateDispute'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2">
                <Gavel className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold text-gray-900">GrappleAI</span>
              </Link>

              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/create"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
                >
                  <Plus className="w-4 h-4" />
                  New Dispute
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateDispute />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-gray-600 text-sm">
              GrappleAI © 2026 - Active Defense Layer for Consumers
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
