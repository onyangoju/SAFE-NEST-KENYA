'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../lib/supabase'
import { Shield, Loader2 } from 'lucide-react'
import { useAuth } from '../../lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('Auth page effect running');
    console.log('Loading:', loading);
    console.log('User:', user);
    
    if (!loading && user) {
      console.log('Redirecting to dashboard...');
      router.replace('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    console.log('Showing loading state');
    return <div className="text-center py-20"><Loader2 className="animate-spin inline-block mr-2" />Loading...</div>
  }

  if (user) {
    console.log('User exists, returning null while redirect happens');
    return null
  }

  console.log('Showing auth form');
  return (
    <div>
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-2">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome to Safe Nest Kenya</h1>
        <p className="text-gray-600 text-sm">Sign in or create an account to get support or report an incident.</p>
      </div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        theme="light"
        localization={{
          variables: {
            sign_in: {
              email_label: 'Email address',
              password_label: 'Password',
              button_label: 'Sign in',
              link_text: 'Already have an account? Sign in',
            },
            sign_up: {
              email_label: 'Email address',
              password_label: 'Password',
              button_label: 'Sign up',
              link_text: "Don't have an account? Sign up",
            },
            forgotten_password: {
              link_text: 'Forgot your password?',
              email_label: 'Email address',
              button_label: 'Send reset instructions',
            },
          },
        }}
        redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined}
      />
    </div>
  )
} 