'use client';
import { BookOpen, Heart, Shield, FileText, Users, Phone, Globe, Download, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const resources = [
  {
    icon: <BookOpen className="w-10 h-10 text-sky-500" />, 
    title: 'Self-Care Guide',
    desc: 'Practical self-care tips for survivors of gender-based violence.',
    link: '/Self-Care Guide.pdf',
    action: 'Download PDF',
  },
  {
    icon: <Heart className="w-10 h-10 text-pink-500" />,
    title: 'Mental Health Apps',
    desc: 'Free apps for mental wellness, grounding, and support.',
    link: '/resources/mental-health-apps',
    action: 'Explore Apps',
  },
  {
    icon: <Shield className="w-10 h-10 text-purple-500" />,
    title: 'Know Your Rights',
    desc: 'Understand Kenyan law on GBV and your legal protections.',
    link: 'https://www.ngeckenya.org/Downloads/Status%20of%20SGBV%20Legislations%20in%20Kenya.pdf',
    action: 'Learn More',
  },
  {
    icon: <FileText className="w-10 h-10 text-green-500" />,
    title: 'How to File a Report',
    desc: 'Step-by-step guide to reporting incidents safely.',
    link: '/How to File a Report.pdf',
    action: 'Read Guide',
  },
  {
    icon: <Users className="w-10 h-10 text-yellow-500" />,
    title: 'Legal Aid Directory',
    desc: 'Find legal aid clinics and support organizations in Kenya.',
    link: 'https://www.nlas.go.ke/legal-aid',
    action: 'View Directory',
  },
  {
    icon: <Phone className="w-10 h-10 text-red-500" />,
    title: 'Emergency Hotlines',
    desc: 'Quick access to GBV, police, and health hotlines.',
    link: 'tel:0705682047',
    action: 'Call Now',
  },
  {
    icon: <Globe className="w-10 h-10 text-blue-500" />,
    title: 'Safe Houses Map',
    desc: 'Find safe spaces and shelters near you.',
    link: '/resources/safe-houses-map',
    action: 'View Map',
  },
  {
    icon: <Download className="w-10 h-10 text-indigo-500" />,
    title: 'GBV Survivor Handbook',
    desc: 'Comprehensive handbook for survivors and allies.',
    link: '/GBV_Survivor_Handbook.pdf',
    action: 'Download',
  },
  {
    icon: <MessageCircle className="w-10 h-10 text-orange-500" />,
    title: 'Support Chat',
    desc: 'Chat with a trained volunteer for confidential support.',
    link: '/chat',
    action: 'Start Chat',
  },
];

export default function ResourcesPage() {
  return (
    <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Resources</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore our curated library of guides, tools, and support services for survivors, allies, and anyone seeking to learn more about gender-based violence, mental health, and legal rights in Kenya.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((res, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 flex flex-col items-center text-center border border-gray-100">
            <div className="mb-4">{res.icon}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{res.title}</h2>
            <p className="text-gray-600 mb-4">{res.desc}</p>
            <Link href={res.link} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-100 text-sky-700 font-semibold hover:bg-sky-200 transition">
              {res.action}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
} 