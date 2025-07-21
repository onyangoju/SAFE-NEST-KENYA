'use client' // Convert to client component for useState
import './globals.css'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { AuthProvider } from '../lib/auth-context'
import { NotificationProvider } from '../lib/notification-context'
import { useState } from 'react' // Import useState
import { Menu, X } from 'lucide-react' // Import icons for menu button

const inter = Inter({ subsets: ['latin'] })

// Metadata is now defined outside the component
// export const metadata: Metadata = {
//   title: "Safe Nest Kenya",
//   description: "Safe Nest Kenya",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleQuickExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <html lang="en">
      <head>
        <title>Safe Nest Kenya</title>
        <meta name="description" content="Safe Nest Kenya" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4A90E2" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <NotificationProvider>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
              {/* Consistent Navbar */}
              <nav className="sticky top-0 z-50 bg-sky-400/90 border-b border-gray-200 flex items-center justify-between px-6 h-20">
                {/* Logo left */}
                <div className="flex items-center gap-2">
                  <img src="/snk.jpg" alt="Safe Nest Kenya Logo" className="h-12 w-12 object-contain" />
                  <span className="text-2xl font-bold text-white">Safe Nest Kenya</span>
                </div>
                {/* Menu center (desktop) */}
                <div className="hidden md:flex gap-10">
                  <Link href="/" className="hover:text-blue-900 text-white font-medium">Home</Link>
                  <Link href="/support" className="hover:text-blue-900 text-white font-medium">Support</Link>
                  <Link href="/resources" className="hover:text-blue-900 text-white font-medium">Resources</Link>
                  <Link href="/chat" className="hover:text-blue-900 text-white font-medium">Chat</Link>
                  <Link href="#contact" className="hover:text-blue-900 text-white font-medium">Contact</Link>
                </div>
                {/* Quick Exit right */}
                <div className="hidden md:block">
                  <button onClick={handleQuickExit} className="border border-white text-sky-900 bg-white/80 rounded px-6 py-3 font-semibold hover:bg-white transition">Quick Exit</button>
                </div>
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X className="h-8 w-8 text-white" /> : <Menu className="h-8 w-8 text-white" />}
                  </button>
                </div>
              </nav>

              {/* Mobile Menu Panel */}
              {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-sky-500/95 z-40 shadow-lg">
                  <div className="flex flex-col items-center gap-6 py-8">
                    <Link href="/" className="hover:text-blue-900 text-white font-medium text-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link href="/support" className="hover:text-blue-900 text-white font-medium text-lg" onClick={() => setIsMenuOpen(false)}>Support</Link>
                    <Link href="/resources" className="hover:text-blue-900 text-white font-medium text-lg" onClick={() => setIsMenuOpen(false)}>Resources</Link>
                    <Link href="/chat" className="hover:text-blue-900 text-white font-medium text-lg" onClick={() => setIsMenuOpen(false)}>Chat</Link>
                    <Link href="#contact" className="hover:text-blue-900 text-white font-medium text-lg" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                    <button onClick={() => { handleQuickExit(); setIsMenuOpen(false); }} className="mt-4 border border-white text-white bg-red-500/80 rounded px-8 py-3 font-semibold hover:bg-red-600 transition">Quick Exit</button>
                  </div>
                </div>
              )}

              {/* Main Content */}
              <div className="flex-1">
                {children}
              </div>
              {/* Footer */}
              <footer className="bg-gray-800 text-white pt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Brand Column */}
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-3">Safe Nest Kenya</h2>
                    <p className="text-gray-400 text-sm">Safe Nest Kenya does not provide emergency medical response. Please contact local authorities if you are in danger.</p>
                  </div>
                  {/* Contact Column */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      <li>Email: <a href="mailto:info@safenestkenya.org" className="hover:text-sky-400">info@safenestkenya.org</a></li>
                      <li>Address: Kisumu, Kenya</li>
                    </ul>
                  </div>
                  {/* Links Column */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Links</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="/resources/nearest-health-facilities" className="text-gray-400 hover:text-sky-400" target="_blank" rel="noopener noreferrer">Nearest Health Facilities</a></li>
                      <li><a href="/resources/legal-aid-resources" className="text-gray-400 hover:text-sky-400" target="_blank" rel="noopener noreferrer">Legal Aid Resources</a></li>
                      <li><a href="/resources/counseling-request-form" className="text-gray-400 hover:text-sky-400" target="_blank" rel="noopener noreferrer">Counseling Request Form</a></li>
                      <li><a href="/resources/find-help-near-you" className="text-gray-400 hover:text-sky-400" target="_blank" rel="noopener noreferrer">Find Help Near You</a></li>
                    </ul>
                  </div>
                </div>
                {/* Bottom Bar */}
                <div className="mt-8 border-t border-gray-700 py-6 text-center">
                  <p className="text-gray-500 text-sm">&copy; Safe Nest Kenya 2025. All rights reserved.</p>
                </div>
              </footer>
            </div>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
