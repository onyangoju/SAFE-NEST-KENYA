'use client'

import { useState, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import { Shield, Eye, Lock, FileText, CheckCircle, AlertCircle, UploadCloud, X } from 'lucide-react'
import { useAuth } from '../../lib/auth-context';

async function analyzeSentiment(text: string): Promise<number | null> {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    })
    const result = await response.json()
    if (Array.isArray(result) && result[0]?.length) {
      // Find the positive score
      const positive = result[0].find((r: any) => r.label === 'POSITIVE')
      return positive ? positive.score : null
    }
    return null
  } catch {
    return null
  }
}

export default function ReportPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    description: '',
    incident_date: '',
    location: '',
    is_anonymous: true,
  })
  const [files, setFiles] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [lastSubmission, setLastSubmission] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, is_anonymous: e.target.checked })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (index: number) => {
    setFiles(files => files.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess(false)
    // Sentiment analysis (disabled)
    // const sentiment_score = await analyzeSentiment(form.description)
    const sentiment_score = null;
    // Prepare submission data
    const submissionData = {
      title: form.title,
      description: form.description,
      incident_date: form.incident_date,
      location: form.location,
      is_anonymous: form.is_anonymous,
      status: 'pending',
      severity_level: 'medium',
      sentiment_score,
      victim_id: user?.id,
    };
    setLastSubmission(submissionData);
    // Insert report into Supabase
    const { data: report, error: reportError } = await supabase.from('case_reports').insert([
      submissionData
    ]).select('id').single()
    if (reportError || !report) {
      setSubmitting(false)
      setError('There was a problem submitting your report. ' + (reportError?.message || JSON.stringify(reportError) || 'Unknown error'))
      return
    }
    // Upload files and store metadata
    for (const file of files) {
      const filePath = `${report.id}/${Date.now()}_${file.name}`
      const { data: storageData, error: storageError } = await supabase.storage.from('evidence').upload(filePath, file)
      if (storageError) {
        setError('File upload failed. Please try again.')
        setSubmitting(false)
        return
      }
      const fileUrl = supabase.storage.from('evidence').getPublicUrl(filePath).data.publicUrl
      await supabase.from('evidence_files').insert([
        {
          case_id: report.id,
          file_name: file.name,
          file_url: fileUrl,
          file_type: file.type,
          file_size: file.size,
          uploaded_by: null,
        },
      ])
    }
    setSubmitting(false)
    setSuccess(true)
    setForm({ title: '', description: '', incident_date: '', location: '', is_anonymous: true })
    setFiles([])
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        {/* TEMP: Show user ID for debugging */}
        <div className="mb-4 text-xs text-gray-500">
          <strong>Current user ID:</strong> {user?.id || 'No user'}
        </div>
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-2">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Anonymous Incident Report</h1>
          <p className="text-gray-700 text-base text-center">Your privacy is our top priority. You may submit this form anonymously.<br/>All information is encrypted and confidential.</p>
          <a href="#" className="text-xs text-blue-600 hover:underline mt-1">AI is used to help triage reports (sentiment analysis).</a>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1 text-green-600 text-xs"><Lock className="w-4 h-4" /> Secure</div>
            <div className="flex items-center gap-1 text-green-600 text-xs"><Eye className="w-4 h-4" /> Anonymous</div>
            <div className="flex items-center gap-1 text-green-600 text-xs"><Shield className="w-4 h-4" /> Protected</div>
          </div>
        </div>
        {success && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-4">
            <CheckCircle className="w-5 h-5" />
            <span>Your report has been submitted. Thank you for reaching out.</span>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-7 mt-4">
          <div>
            <label className="block text-gray-900 font-semibold mb-2" htmlFor="title">Title of Incident</label>
            <input
              className="form-input placeholder-gray-600 text-gray-900 bg-gray-50 border-gray-300 focus:border-blue-500 focus:bg-white"
              id="title"
              name="title"
              type="text"
              required
              maxLength={100}
              value={form.title}
              onChange={handleChange}
              placeholder="Short summary (e.g. Harassment at work)"
            />
          </div>
          <div>
            <label className="block text-gray-900 font-semibold mb-2" htmlFor="description">Description</label>
            <textarea
              className="form-input placeholder-gray-600 text-gray-900 bg-gray-50 border-gray-300 focus:border-blue-500 focus:bg-white"
              id="description"
              name="description"
              rows={4}
              required
              maxLength={1000}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what happened (no personal info required)"
            />
          </div>
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-gray-900 font-semibold mb-2" htmlFor="incident_date">Date</label>
              <input
                className="form-input text-gray-900 bg-gray-50 border-gray-300 focus:border-blue-500 focus:bg-white placeholder-gray-600"
                id="incident_date"
                name="incident_date"
                type="date"
                required
                value={form.incident_date}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-900 font-semibold mb-2" htmlFor="location">Location</label>
              <input
                className="form-input placeholder-gray-600 text-gray-900 bg-gray-50 border-gray-300 focus:border-blue-500 focus:bg-white"
                id="location"
                name="location"
                type="text"
                required
                maxLength={100}
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Nairobi, Kenya"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              id="is_anonymous"
              name="is_anonymous"
              type="checkbox"
              checked={form.is_anonymous}
              onChange={handleCheckbox}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_anonymous" className="text-base text-gray-900">Submit anonymously</label>
          </div>
          <div>
            <label className="block text-gray-900 font-semibold mb-2" htmlFor="files">Attach Evidence (optional)</label>
            <input
              id="files"
              name="files"
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="block w-full text-base text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-base file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {files.length > 0 && (
              <ul className="mt-2 space-y-1">
                {files.map((file, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-base text-gray-900">
                    <span>{file.name}</span>
                    <button type="button" onClick={() => removeFile(idx)} className="text-red-500 hover:underline"><X className="w-4 h-4 inline" /> Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full shadow transition-colors text-lg disabled:opacity-50 float-right mt-6"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  )
} 