'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Logo & Branding */}
        <div className="flex items-center gap-3 mb-10 pb-10 border-b border-gray-800">
          <Image 
            src="/logo.png" 
            alt="NyayaSetu" 
            width={40} 
            height={40} 
            className="rounded-2xl" 
          />
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-white leading-tight">NyayaSetu</span>
            <span className="text-sm text-gray-400 hidden sm:inline-block">Powered by AI · Built for Delhi Citizens</span>
          </div>
        </div>

        {/* Four Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          
          {/* Col 1: About (Spans 2 cols on lg) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">About</h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              NyayaSetu is an AI-powered civic platform bridging the gap between Delhi citizens and municipal services. Find welfare schemes, file verified complaints, and track resolutions.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link href="/schemes" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Explore Schemes</Link></li>
              <li><Link href="/chat" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Chat Assistant</Link></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/complaints/file" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">File Complaint</Link></li>
              <li><Link href="/complaints/track" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Track Complaint</Link></li>
              <li><Link href="/login" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Officer Login</Link></li>
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect</h3>
            <ul className="space-y-3">
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Twitter</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} NyayaSetu Civic Tech Prototype. Built with Next.js, Supabase & Groq.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <span className="text-amber-500 text-sm">⚠</span> Non-governmental civic tech experiment — Prototype only
          </p>
        </div>
      </div>
    </footer>
  );
}
