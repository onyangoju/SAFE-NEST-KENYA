'use client'

import { Shield, FileText, Users, MessageCircle, Heart, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Centered Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          You Are{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            Safe Here
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Safe Nest Kenya provides a secure, confidential platform for victims of gender-based violence. Get the support you need in a safe, judgment-free environment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/support" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Get Support</span>
          </Link>
          <Link href="/report" className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Report Incident</span>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Help You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides multiple ways to get the support and help you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Anonymous Reporting */}
            <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Anonymous Reporting</h3>
              <p className="text-gray-600 mb-4">
                Report incidents completely anonymously. Your identity is protected while ensuring your case gets the attention it needs.
              </p>
              <Link href="/report" className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                <span>Report Now</span>
              </Link>
            </div>

            {/* Professional Support */}
            <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Support</h3>
              <p className="text-gray-600 mb-4">
                Connect with trained counselors and support professionals who understand your situation and can provide guidance.
              </p>
              <Link href="/support" className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1">
                <span>Get Support</span>
              </Link>
            </div>

            {/* Case Management */}
            <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Case Management</h3>
              <p className="text-gray-600 mb-4">
                Track your case progress, upload evidence securely, and stay informed about developments in your situation.
              </p>
              <Link href="/dashboard" className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1">
                <span>View Cases</span>
              </Link>
            </div>

            {/* Support Chat */}
            <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Support Chat</h3>
              <p className="text-gray-600 mb-4">
                Get immediate support through our secure chat system. Trained volunteers are available around the clock.
              </p>
              <Link href="/chat" className="text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-1">
                <span>Start Chat</span>
              </Link>
            </div>

            {/* Resources */}
            <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Resources & Education</h3>
              <p className="text-gray-600 mb-4">
                Access educational materials, legal information, and resources to help you understand your rights and options.
              </p>
              <Link href="/resources" className="text-teal-600 hover:text-teal-700 font-medium flex items-center space-x-1">
                <span>Browse Resources</span>
              </Link>
            </div>

            {/* Emergency Contacts */}
            <div className="card hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Emergency Contacts</h3>
              <p className="text-gray-600 mb-4">
                Quick access to emergency numbers, police contacts, and crisis hotlines for immediate assistance.
              </p>
              <Link href="/emergency" className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-1">
                <span>Emergency Help</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Safe Nest Kenya
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Safe Nest Kenya is dedicated to providing a secure, confidential platform for victims of gender-based violence. 
                We understand that seeking help can be difficult, which is why we've created a safe space where you can get the 
                support you need without fear of judgment or exposure.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our team of trained professionals and volunteers work tirelessly to ensure that every person who reaches out 
                receives the care, support, and resources they need to begin their journey toward healing and justice.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">1000+</div>
                  <div className="text-sm text-gray-600">Cases Helped</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-gray-600">Trained Counselors</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Commitment to You</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Complete Confidentiality</h4>
                      <p className="text-gray-600 text-sm">Your privacy is our top priority. All information is encrypted and secure.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Professional Support</h4>
                      <p className="text-gray-600 text-sm">Trained counselors and professionals ready to help you through your journey.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">No Judgment</h4>
                      <p className="text-gray-600 text-sm">A safe, supportive environment where you can share your story without fear.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Comprehensive Resources</h4>
                      <p className="text-gray-600 text-sm">Access to legal information, educational materials, and support networks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to help. Reach out to us through any of these channels for support and assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Hotline</h3>
              <p className="text-gray-600 mb-4">24/7 Crisis Support</p>
              <a href="tel:+254700000000" className="text-blue-600 hover:text-blue-700 font-semibold">
                +254 705 682 047
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get help via email</p>
              <a href="mailto:support@safenestke.org" className="text-green-600 hover:text-green-700 font-semibold">
                support@safenestke.org
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Instant messaging support</p>
              <Link href="/chat" className="text-purple-600 hover:text-purple-700 font-semibold">
                Start Chat Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
