'use client';
import { Search, LifeBuoy, BookOpen, Shield, Lock, MapPin, Users, UserCircle2 } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';

const supportCategories = [
  {
    icon: <LifeBuoy className="w-10 h-10 text-sky-500" />,
    title: 'Getting Help',
    desc: 'Confidential support, safety planning, and immediate assistance.',
    link: '/emergency',
  },
  {
    icon: <BookOpen className="w-10 h-10 text-green-500" />,
    title: 'Tools & Guides',
    desc: 'Access survivor handbooks, self-care resources, and mental health tools.',
    link: '/resources',
  },
  {
    icon: <Shield className="w-10 h-10 text-purple-500" />,
    title: 'Legal & Rights Info',
    desc: 'Learn how to file a report, get legal aid, and understand your rights.',
    link: '/resources/legal-aid-resources',
  },
  {
    icon: <Lock className="w-10 h-10 text-yellow-500" />,
    title: 'Your Safety First',
    desc: 'Tips for private browsing, quick exit features, and emergency contacts.',
    link: '/emergency',
  },
  {
    icon: <MapPin className="w-10 h-10 text-blue-500" />,
    title: 'Find Safe Spaces',
    desc: 'Locate safe houses, shelters, and trusted support centers near you.',
    link: '/resources/safe-houses-map',
  },
  {
    icon: <Users className="w-10 h-10 text-pink-500" />,
    title: 'Get Involved',
    desc: 'Learn how to volunteer, refer a survivor, or donate to our cause.',
    link: '/Get Involved.pdf',
  },
];

export default function SupportPage() {
  const [callbackForm, setCallbackForm] = useState({ name: '', time: '' });
  const [callbackSuccess, setCallbackSuccess] = useState(false);
  const [callbackError, setCallbackError] = useState('');

  const handleCallbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCallbackForm({ ...callbackForm, [e.target.name]: e.target.value });
  };
  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackForm.name || !callbackForm.time) {
      setCallbackError('Please fill in all fields.');
      return;
    }
    setCallbackSuccess(true);
    setCallbackError('');
    setCallbackForm({ name: '', time: '' });
  };

  return (
    <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Support Center</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">How can we help? Find guidance, tools, and contact options below.</p>
      </header>

      {/* Search Bar */}
      <div className="mb-12 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search for resources..."
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
      </div>

      {/* Support Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {supportCategories.map((cat, i) => (
          <Link href={cat.link} key={i} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 flex flex-col items-start text-left border border-gray-100">
            <div className="mb-4">{cat.icon}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{cat.title}</h2>
            <p className="text-gray-600">{cat.desc}</p>
          </Link>
        ))}
      </div>

      {/* "We got you" Contact Section */}
      <section className="mt-20 py-12 bg-sky-50 rounded-2xl border border-sky-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <UserCircle2 className="w-16 h-16 text-sky-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Still need help? We've got you.</h2>
          <p className="text-gray-700 mb-6">Our support team is here to help you. Reach out for confidential, one-on-one assistance.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact Options */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Talk to Someone</h3>
              <p className="text-sm text-gray-600 mb-3">Call or WhatsApp us for immediate support.</p>
              <a href="tel:0705682047" className="block w-full text-center py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600">Call Now</a>
              <a href="https://wa.me/254705682047" className="mt-2 block w-full text-center py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">WhatsApp</a>
            </div>
            {/* Email */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-3">Send us an email and we'll get back to you.</p>
              <a href="mailto:support@safenestkenya.org" className="block w-full text-center py-2 px-4 bg-sky-500 text-white rounded-lg hover:bg-sky-600">Email Us</a>
            </div>
            {/* Request a callback */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Request a Callback</h3>
              <form onSubmit={handleCallbackSubmit} className="flex flex-col gap-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="form-input"
                  value={callbackForm.name}
                  onChange={handleCallbackChange}
                />
                <input
                  type="text"
                  name="time"
                  placeholder="Safe time to call"
                  className="form-input"
                  value={callbackForm.time}
                  onChange={handleCallbackChange}
                />
                <button type="submit" className="py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900">Request</button>
              </form>
              {callbackSuccess && <div className="text-green-700 text-xs mt-1">Callback requested.</div>}
              {callbackError && <div className="text-red-700 text-xs mt-1">{callbackError}</div>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 