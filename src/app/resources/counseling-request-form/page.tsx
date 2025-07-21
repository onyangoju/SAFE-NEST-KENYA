'use client';
import { Phone, Mail, MapPin, Twitter, Facebook, Instagram, Send } from 'lucide-react';
import React, { useState } from 'react';

export default function CounselingRequestFormPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    contactMethod: 'email',
    service: '',
    message: ''
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.service || !form.message) {
      setFormError('Please fill in all required fields.');
      return;
    }
    setFormSuccess(true);
    setFormError('');
    // Reset form logic here
  };

  return (
    <main className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Form Section */}
          <div className="p-8 md:p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Counseling Service Request</h1>
            <p className="text-gray-600 mb-6">Please fill out the form below to request support. All submissions are confidential.</p>
            {formSuccess && <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-4 text-green-800 rounded">Your request has been submitted successfully.</div>}
            {formError && <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4 text-red-800 rounded">{formError}</div>}
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="font-semibold text-gray-700">Full Name</label>
                <input type="text" id="name" name="name" onChange={handleFormChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="font-semibold text-gray-700">Email</label>
                  <input type="email" id="email" name="email" onChange={handleFormChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white" required />
                </div>
                <div>
                  <label htmlFor="phone" className="font-semibold text-gray-700">Phone Number</label>
                  <input type="tel" id="phone" name="phone" onChange={handleFormChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactMethod" className="font-semibold text-gray-700">Preferred Contact</label>
                  <select 
                    id="contactMethod" 
                    name="contactMethod" 
                    onChange={handleFormChange} 
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-900 appearance-none"
                    style={{ WebkitAppearance: 'menulist', MozAppearance: 'menulist' }}
                  >
                    <option value="email" className="text-gray-900 bg-white">Email</option>
                    <option value="phone" className="text-gray-900 bg-white">Phone Call</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="service" className="font-semibold text-gray-700">Service Needed</label>
                  <select 
                    id="service" 
                    name="service" 
                    onChange={handleFormChange} 
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-900 appearance-none"
                    style={{ WebkitAppearance: 'menulist', MozAppearance: 'menulist' }}
                    required
                  >
                    <option value="" className="text-gray-900 bg-white">Select a service...</option>
                    <option value="individual" className="text-gray-900 bg-white">Individual Counseling</option>
                    <option value="group" className="text-gray-900 bg-white">Group Support</option>
                    <option value="legal" className="text-gray-900 bg-white">Legal Aid Navigation</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="font-semibold text-gray-700">Your Message</label>
                <textarea id="message" name="message" rows={4} onChange={handleFormChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white" required></textarea>
              </div>
              <div>
                <button type="submit" className="w-full py-3 px-6 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" /> Submit Request
                </button>
              </div>
            </form>
          </div>
          {/* Contact Info Section */}
          <div className="bg-sky-600 text-white p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3"><Mail className="w-5 h-5" /> info@safenestkenya.org</li>
                <li className="flex items-center gap-3"><Phone className="w-5 h-5" /> +254 705 682 047</li>
                <li className="flex items-center gap-3"><MapPin className="w-5 h-5" /> Kisumu, Kenya</li>
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:opacity-80"><Twitter /></a>
                <a href="#" className="hover:opacity-80"><Facebook /></a>
                <a href="#" className="hover:opacity-80"><Instagram /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Footer Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <div className="bg-sky-50 rounded-2xl p-10 border border-sky-100">
          <h2 className="text-3xl font-bold text-sky-800 mb-3">You are not alone.</h2>
          <p className="text-sky-700 max-w-2xl mx-auto">Your journey to healing and justice is important to us. We are here to walk with you every step of the way.</p>
        </div>
      </section>
    </main>
  );
} 