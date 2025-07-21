'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white/90 border-b border-gray-200 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <div className="font-bold text-2xl text-gray-900">Safe Nest Kenya</div>
        <div className="flex gap-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/support" className="hover:text-blue-600">Support</Link>
          <Link href="/resources" className="hover:text-blue-600">Resources</Link>
          <Link href="/counseling" className="hover:text-blue-600">Request Counseling</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
        </div>
        <button className="border border-gray-400 rounded px-4 py-2 font-semibold hover:bg-gray-100 transition">Quick Exit</button>
      </div>
    </nav>
  );
} 