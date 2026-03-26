'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, LogIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/layout/LanguageProvider';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home', 'Home'), href: '/' },
    { name: t('nav.schemes', 'Schemes'), href: '/schemes' },
    { name: t('nav.fileComplaint', 'File Complaint'), href: '/complaints/file' },
    { name: t('nav.trackComplaint', 'Track Complaint'), href: '/complaints/track' },
    { name: t('nav.chatAssistant', 'Chat Assistant'), href: '/chat' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300 bg-white ${isScrolled ? 'shadow-sm' : ''}`}>
        {/* MAIN NAV */}
        <div className="border-b border-gray-200">
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
            
            {/* Logo area */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image 
                src="/logo.png" 
                alt="NyayaSetu" 
                width={48} 
                height={48} 
                className="rounded-2xl shadow-sm transition-transform group-hover:scale-105" 
              />
              <div className="flex flex-col justify-center">
                <span className="text-xl font-bold text-gray-900 leading-tight">NyayaSetu</span>
                <span className="text-xs text-gray-400 leading-tight">Civic Tech Prototype</span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-indigo-700 ${
                    pathname === link.href ? 'text-indigo-700' : 'text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Actions (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Globe className="w-4 h-4 text-gray-500" />
                {language === 'en' ? 'EN / हिं' : 'हिं / EN'}
              </button>
              
              <Link
                href="/login"
                className="flex items-center gap-2 bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-indigo-800 transition-colors shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="p-2 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50"
              >
                <Globe className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-b border-gray-200 py-3 px-4 flex flex-col gap-2 animate-fade-in-up">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-2 pt-3 border-t border-gray-100">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-indigo-700 text-white text-sm font-bold shadow-sm hover:bg-indigo-800 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Officer / Supervisor Login
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
