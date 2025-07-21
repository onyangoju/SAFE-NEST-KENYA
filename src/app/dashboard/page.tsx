'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Shield, FileText, Loader2, AlertCircle, Eye, Lock, Bell } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useNotifications } from '@/lib/notification-context'
import { format } from 'date-fns'

interface CaseReport {
  id: string
  title: string
  status: string
  incident_date: string
  sentiment_score: number | null
  created_at: string
  is_anonymous: boolean
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [cases, setCases] = useState<CaseReport[]>([])
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const { unreadCount, notifications, markAllRead } = useNotifications()
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth')
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchCases = async () => {
      if (!user) return
      setFetching(true)
      setFetchError('')
      let query = supabase.from('case_reports').select('*').order('created_at', { ascending: false })
      if (user.role === 'victim') {
        query = query.eq('victim_id', user.id)
      }
      const { data, error } = await query
      if (error) setFetchError('Could not fetch cases.')
      else setCases(data || [])
      setFetching(false)
    }
    if (user) fetchCases()
  }, [user])

  if (loading) {
    return <div className="text-center py-20"><Loader2 className="animate-spin inline-block mr-2" />Loading...</div>
  }

  if (!user) return null

  return (
    <div className="max-w-3xl mx-auto mt-12 p-4 sm:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex flex-col items-center mb-6 relative">
        {/* Notification Bell */}
        <button
          className="absolute right-0 top-0 flex items-center justify-center p-2 bg-white rounded-full shadow hover:bg-blue-50 focus:outline-none"
          onClick={() => setShowDropdown((v) => !v)}
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6 text-blue-500" />
          {unreadCount > 0 && (
            <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">{unreadCount}</span>
          )}
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-10 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <span className="font-semibold text-gray-700">Notifications</span>
              <button className="text-xs text-blue-600 hover:underline" onClick={markAllRead}>Mark all as read</button>
            </div>
            <ul className="max-h-64 overflow-y-auto divide-y">
              {notifications.length === 0 ? (
                <li className="p-4 text-gray-500 text-sm">No notifications.</li>
              ) : (
                notifications.map((n) => (
                  <li key={n.id} className={`p-4 text-sm ${!n.is_read ? 'bg-blue-50' : ''}`}>
                    <div className="font-medium text-gray-800">{n.message}</div>
                    <div className="text-xs text-gray-400 mt-1">{new Date(n.created_at).toLocaleString()}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-2">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Your Case Dashboard</h1>
        <p className="text-gray-600 text-sm text-center">Track the status of your reports. <span className="block mt-1 text-xs text-blue-500">All data is private and secure.</span></p>
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-1 text-green-600 text-xs"><Lock className="w-4 h-4" /> Secure</div>
          <div className="flex items-center gap-1 text-green-600 text-xs"><Eye className="w-4 h-4" /> Private</div>
        </div>
      </div>
      {fetchError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4">
          <AlertCircle className="w-5 h-5" />
          <span>{fetchError}</span>
        </div>
      )}
      {fetching ? (
        <div className="text-center py-8"><Loader2 className="animate-spin inline-block mr-2" />Loading cases...</div>
      ) : cases.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No case reports found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded-lg">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Sentiment</th>
                <th className="px-4 py-2 text-left">Anonymous</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c.id} className="border-b hover:bg-blue-50/50 cursor-pointer" onClick={() => router.push(`/dashboard/${c.id}`)}>
                  <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-2"><FileText className="w-4 h-4 text-blue-400" />{c.title}</td>
                  <td className="px-4 py-2 capitalize">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${c.status === 'resolved' ? 'bg-green-100 text-green-700' : c.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{c.status.replace('_', ' ')}</span>
                  </td>
                  <td className="px-4 py-2">{format(new Date(c.incident_date), 'yyyy-MM-dd')}</td>
                  <td className="px-4 py-2">{c.sentiment_score !== null ? c.sentiment_score.toFixed(2) : 'N/A'}</td>
                  <td className="px-4 py-2">{c.is_anonymous ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
} 