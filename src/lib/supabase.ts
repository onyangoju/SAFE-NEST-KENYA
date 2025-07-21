import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'victim' | 'counselor' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role: 'victim' | 'counselor' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'victim' | 'counselor' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      case_reports: {
        Row: {
          id: string
          victim_id: string
          title: string
          description: string
          incident_date: string
          location: string
          status: 'pending' | 'under_review' | 'in_progress' | 'resolved'
          severity_level: 'low' | 'medium' | 'high' | 'critical'
          sentiment_score: number
          is_anonymous: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          victim_id: string
          title: string
          description: string
          incident_date: string
          location: string
          status?: 'pending' | 'under_review' | 'in_progress' | 'resolved'
          severity_level: 'low' | 'medium' | 'high' | 'critical'
          sentiment_score?: number
          is_anonymous?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          victim_id?: string
          title?: string
          description?: string
          incident_date?: string
          location?: string
          status?: 'pending' | 'under_review' | 'in_progress' | 'resolved'
          severity_level?: 'low' | 'medium' | 'high' | 'critical'
          sentiment_score?: number
          is_anonymous?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      evidence_files: {
        Row: {
          id: string
          case_id: string
          file_name: string
          file_url: string
          file_type: string
          file_size: number
          uploaded_by: string
          created_at: string
        }
        Insert: {
          id?: string
          case_id: string
          file_name: string
          file_url: string
          file_type: string
          file_size: number
          uploaded_by: string
          created_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          file_name?: string
          file_url?: string
          file_type?: string
          file_size?: number
          uploaded_by?: string
          created_at?: string
        }
      }
    }
  }
} 