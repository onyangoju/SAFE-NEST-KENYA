'use client';
import { Phone, Shield, MessageCircle, AlertTriangle, LifeBuoy, Zap, Wind } from 'lucide-react';
import React from 'react';

export default function EmergencyPage() {
  const handleQuickExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <main>
      {/* Header Section */}
      <section className="bg-red-600 text-white text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Emergency Assistance</h1>
          <p className="mt-4 text-lg text-red-100">If you are in immediate danger, please call your local emergency number first.</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <a href="tel:999" className="bg-red-50 hover:bg-red-100 border-2 border-red-500 text-red-700 p-8 rounded-2xl text-center transition flex flex-col justify-center items-center">
            <Phone className="w-12 h-12 mb-3" />
            <h2 className="text-2xl font-bold">Call Emergency</h2>
            <p className="mt-1 text-sm">Police / Ambulance / Fire</p>
          </a>
          <a href="https://wa.me/254705682047" target="_blank" rel="noopener noreferrer" className="bg-green-50 hover:bg-green-100 border-2 border-green-500 text-green-700 p-8 rounded-2xl text-center transition flex flex-col justify-center items-center">
            <MessageCircle className="w-12 h-12 mb-3" />
            <h2 className="text-2xl font-bold">Get Help Now</h2>
            <p className="mt-1 text-sm">WhatsApp a Responder</p>
          </a>
          <button onClick={handleQuickExit} className="bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-500 text-yellow-700 p-8 rounded-2xl text-center transition flex flex-col justify-center items-center">
            <Zap className="w-12 h-12 mb-3" />
            <h2 className="text-2xl font-bold">Quick Exit</h2>
            <p className="mt-1 text-sm">Leave this page immediately</p>
          </button>
        </div>
      </section>

      {/* Information Sections */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Emergency Hotlines */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><LifeBuoy className="text-sky-500" /> Emergency Hotlines (Kenya)</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 bg-gray-50 p-6 rounded-lg border">
            <li><strong>GBV Helpline (1195):</strong> Toll-free for Gender-Based Violence</li>
            <li><strong>Childline Kenya:</strong> 116</li>
            <li><strong>Mental Health Support:</strong> 0800 720 122</li>
            <li><strong>Safe Nest Kenya Emergency Line:</strong> [Insert Your CBO Line]</li>
          </ul>
        </section>

        {/* Tips If You Can’t Speak Freely */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Shield className="text-purple-500" /> Tips If You Can’t Speak Freely</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 bg-gray-50 p-6 rounded-lg border">
            <li>Use code words with trusted persons.</li>
            <li>Leave location tracking on for a trusted contact.</li>
            <li>Share a Safe Nest code-based help request (e.g., "Request Red Ribbon").</li>
          </ul>
        </section>

        {/* Grounding Techniques */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Wind className="text-green-500" /> Grounding Techniques for Panic/Anxiety</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 bg-gray-50 p-6 rounded-lg border">
            <li><strong>4-7-8 Breathing:</strong> Inhale for 4s, hold for 7s, exhale for 8s.</li>
            <li><strong>5-4-3-2-1 Senses:</strong> Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.</li>
          </ul>
        </section>
      </div>
    
    </main>
  );
} 