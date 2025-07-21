'use client';
import { Shield, BookOpen, Users, User, UserCog } from 'lucide-react';
import React from 'react';

const organizations = [
  {
    icon: <Shield className="w-10 h-10 text-purple-500" />,
    name: 'National Legal Aid Service (NLAS)',
    desc: 'Provides free legal aid to indigent, marginalized, and vulnerable persons in Kenya.',
    link: 'https://www.nlas.go.ke/legal-aid',
  },
  {
    icon: <BookOpen className="w-10 h-10 text-green-500" />,
    name: 'FIDA Kenya',
    desc: 'An organization of women lawyers promoting women\'s rights and providing legal aid.',
    link: 'https://www.fidakenya.org/',
  },
  {
    icon: <Users className="w-10 h-10 text-sky-500" />,
    name: 'Kituo cha Sheria',
    desc: 'A leading legal aid organization providing legal services to the poor and marginalized.',
    link: 'https://kituochasheria.or.ke/',
  },
];

const lawyers = [
  {
    icon: <User className="w-10 h-10 text-pink-500" />,
    name: 'Jane Mwangi',
    phone: '+254 712 345 678',
    email: 'jane.lawyer@example.com',
    org: 'Justice for All',
  },
  {
    icon: <UserCog className="w-10 h-10 text-blue-500" />,
    name: 'David Otieno',
    phone: '+254 733 987 654',
    email: 'david.otieno@legalhelp.co.ke',
    org: 'Legal Aid Kenya',
  },
];

export default function LegalAidResourcesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('/public/file.svg')" }}>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center text-white p-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Legal Aid & Your Rights</h1>
            <p className="mt-4 text-lg max-w-2xl">Find legal support, understand your rights, and get connected with professionals who can help.</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Know Your Rights */}
        <section className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3 text-center">
            <BookOpen className="w-20 h-20 text-sky-500 mx-auto" />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Know Your Rights</h2>
            <p className="text-gray-700 mb-3">In Kenya, the law provides protections against gender-based violence through acts like the Sexual Offences Act and the Protection Against Domestic Violence Act. You have the right to report abuse, seek protection orders, and access medical and legal support without discrimination.</p>
            <p className="text-gray-700">Understanding these rights is the first step toward seeking justice and ensuring your safety.</p>
          </div>
        </section>

        {/* Key Organizations */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Legal Aid Organizations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {organizations.map((org, i) => (
              <a href={org.link} key={i} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 flex flex-col items-center text-center border">
                {org.icon}
                <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900">{org.name}</h3>
                <p className="text-gray-600">{org.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Legal Professionals */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Connect with a Legal Professional</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {lawyers.map((lawyer, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 flex items-start gap-4 border">
                {lawyer.icon}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{lawyer.name}</h3>
                  <p className="text-gray-600">{lawyer.org}</p>
                  <div className="mt-2 text-sm">
                    <a href={`tel:${lawyer.phone}`} className="block text-sky-600 hover:underline">{lawyer.phone}</a>
                    <a href={`mailto:${lawyer.email}`} className="block text-sky-600 hover:underline">{lawyer.email}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Steps to Take */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Steps to Take</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 bg-white p-8 rounded-lg shadow border">
            <li><strong>Ensure Your Safety:</strong> If you are in immediate danger, go to a safe place and contact emergency services.</li>
            <li><strong>Preserve Evidence:</strong> If possible, preserve any physical evidence. Do not change clothes or bathe before seeking medical help.</li>
            <li><strong>Seek Medical Attention:</strong> Visit a healthcare provider or a GBV recovery center for medical care and documentation of injuries.</li>
            <li><strong>Report the Incident:</strong> File a report at the nearest police station. You can be accompanied by a trusted person.</li>
            <li><strong>Contact a Legal Advisor:</strong> Reach out to a legal aid organization or a lawyer to understand your options and get representation.</li>
          </ol>
        </section>
      </div>
    </main>
  );
} 