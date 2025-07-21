'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Shield, FileText, Loader2, AlertCircle, Eye, Lock, CheckCircle, UploadCloud, MessageCircle } from 'lucide-react'
import { format } from 'date-fns'

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
]

export default function CaseDetailPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const caseId = params?.id as string
  const [caseReport, setCaseReport] = useState<any>(null)
  const [evidence, setEvidence] = useState<any[]>([])
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [statusUpdating, setStatusUpdating] = useState(false)
  const [statusSuccess, setStatusSuccess] = useState(false)
  const [statusError, setStatusError] = useState('')
  const [comments, setComments] = useState<any[]>([])
  const [commentText, setCommentText] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)
  const [commentError, setCommentError] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth')
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchCase = async () => {
      setFetching(true)
      setFetchError('')
      const { data, error } = await supabase.from('case_reports').select('*').eq('id', caseId).single()
      if (error || !data) {
        setFetchError('Could not fetch case details.')
        setFetching(false)
        return
      }
      // Only allow victim (their own), counselor, or admin
      if (user && user.role === 'victim' && data.victim_id !== user.id) {
        setFetchError('You are not authorized to view this case.')
        setFetching(false)
        return
      }
      setCaseReport(data)
      // Fetch evidence
      const { data: files } = await supabase.from('evidence_files').select('*').eq('case_id', caseId)
      setEvidence(files || [])
      // Fetch comments
      const { data: commentsData } = await supabase.from('case_comments').select('*').eq('case_id', caseId).order('created_at', { ascending: true })
      setComments(commentsData || [])
      setFetching(false)
    }
    if (user && caseId) fetchCase()
  }, [user, caseId])

  const notifyUsers = async (type: string, message: string) => {
    // Fetch case info to get victim_id
    const { data: caseData } = await supabase.from('case_reports').select('victim_id').eq('id', caseId).single()
    // Get all counselors and admins
    const { data: users } = await supabase.from('profiles').select('id, role')
    const counselorAdminIds = (users || []).filter(u => u.role === 'counselor' || u.role === 'admin').map(u => u.id)
    const notifications = []
    
    // Add a null check for caseData
    if (!caseData) {
      console.error('Could not find case data to send notifications.')
      return
    }

    if (caseData?.victim_id) notifications.push({ user_id: caseData.victim_id, type, message, case_id: caseId, is_read: false })
    if (type === 'comment') {
      for (const id of counselorAdminIds) {
        if (id !== caseData.victim_id) notifications.push({ user_id: id, type, message, case_id: caseId, is_read: false })
      }
    }
    if (notifications.length) {
      await supabase.from('notifications').insert(notifications)
    }
  }

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusUpdating(true)
    setStatusError('')
    setStatusSuccess(false)
    const newStatus = e.target.value
    const { error } = await supabase.from('case_reports').update({ status: newStatus }).eq('id', caseId)
    if (error) {
      setStatusError('Failed to update status.')
    } else {
      setCaseReport((prev: any) => ({ ...prev, status: newStatus }))
      setStatusSuccess(true)
      // Notify victim
      await notifyUsers('status', `Case status updated to "${newStatus.replace('_', ' ')}".`)
    }
    setStatusUpdating(false)
  }

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setCommentLoading(true)
    setCommentError('')
    const { error } = await supabase.from('case_comments').insert([
      {
        case_id: caseId,
        user_id: user.id,
        user_role: user.role,
        content: commentText,
      },
    ])
    if (error) {
      setCommentError('Failed to post comment.')
    } else {
      setCommentText('')
      // Refresh comments
      const { data: commentsData } = await supabase.from('case_comments').select('*').eq('case_id', caseId).order('created_at', { ascending: true })
      setComments(commentsData || [])
      // Notify users
      await notifyUsers('comment', `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} commented on a case.`)
    }
    setCommentLoading(false)
  }

  if (loading || fetching) {
    return <div className="text-center py-20"><Loader2 className="animate-spin inline-block mr-2" />Loading...</div>
  }
  if (fetchError) {
    return <div className="max-w-xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg border border-gray-100 text-center flex flex-col items-center gap-4"><AlertCircle className="w-8 h-8 text-red-500" /><div>{fetchError}</div></div>
  }
  if (!caseReport) return null

  return (
    <div className="max-w-2xl mx-auto mt-12 p-4 sm:p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-2">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Case Details</h1>
        <p className="text-gray-600 text-sm text-center">All information is private and secure.</p>
      </div>
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2"><span className="font-semibold">Title:</span> {caseReport.title}</div>
        <div className="mb-2 flex items-center gap-2"><span className="font-semibold">Status:</span>
          {['counselor', 'admin'].includes(user.role) ? (
            <select value={caseReport.status} onChange={handleStatusChange} className="form-input w-auto">
              {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          ) : (
            <span className="capitalize px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700">{caseReport.status.replace('_', ' ')}</span>
          )}
          {statusUpdating && <Loader2 className="w-4 h-4 animate-spin inline-block ml-2" />}
          {statusSuccess && <CheckCircle className="w-4 h-4 text-green-500 inline-block ml-2" />}
          {statusError && <span className="text-red-500 ml-2">{statusError}</span>}
        </div>
        <div className="mb-2 flex items-center gap-2"><span className="font-semibold">Date:</span> {format(new Date(caseReport.incident_date), 'yyyy-MM-dd')}</div>
        <div className="mb-2 flex items-center gap-2"><span className="font-semibold">Location:</span> {caseReport.location}</div>
        <div className="mb-2 flex items-center gap-2"><span className="font-semibold">Anonymous:</span> {caseReport.is_anonymous ? 'Yes' : 'No'}</div>
        <div className="mb-2 flex items-center gap-2"><span className="font-semibold">Sentiment Score:</span> {caseReport.sentiment_score !== null ? caseReport.sentiment_score.toFixed(2) : 'N/A'}</div>
        <div className="mb-2"><span className="font-semibold">Description:</span>
          <div className="bg-gray-50 rounded p-2 mt-1 text-gray-700 whitespace-pre-line">{caseReport.description}</div>
        </div>
      </div>
      <div className="mb-6">
        <div className="font-semibold mb-2 flex items-center gap-2"><UploadCloud className="w-4 h-4 text-blue-500" /> Evidence Files</div>
        {evidence.length === 0 ? (
          <div className="text-gray-500 text-sm">No evidence files attached.</div>
        ) : (
          <ul className="space-y-2">
            {evidence.map(file => (
              <li key={file.id} className="flex items-center gap-2 text-sm bg-gray-50 rounded px-2 py-1">
                <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex-1 truncate">{file.file_name}</a>
                <span className="text-gray-400">({(file.file_size / 1024).toFixed(1)} KB)</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mb-6">
        <div className="font-semibold mb-2 flex items-center gap-2"><MessageCircle className="w-4 h-4 text-blue-500" /> Comments</div>
        {comments.length === 0 ? (
          <div className="text-gray-500 text-sm">No comments yet.</div>
        ) : (
          <ul className="space-y-2 mb-4">
            {comments.map(comment => (
              <li key={comment.id} className="bg-gray-50 rounded p-2 text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-blue-600">{comment.user_role}</span>
                  <span className="text-gray-400 text-xs">{format(new Date(comment.created_at), 'yyyy-MM-dd HH:mm')}</span>
                </div>
                <div className="text-gray-700 whitespace-pre-line">{comment.content}</div>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handleAddComment} className="flex gap-2 items-end">
          <textarea
            className="form-input flex-1"
            rows={2}
            placeholder="Add a comment..."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            required
            disabled={commentLoading}
          />
          <button type="submit" className="btn-primary bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500" disabled={commentLoading || !commentText.trim()}>
            {commentLoading ? 'Posting...' : 'Post'}
          </button>
        </form>
        {commentError && <div className="text-red-500 text-xs mt-2">{commentError}</div>}
      </div>
    </div>
  )
} 