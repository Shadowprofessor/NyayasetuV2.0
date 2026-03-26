'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { Search, Sparkles, MapPin, ArrowRight, ShieldCheck, FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full animate-fadeIn">
      {/* SECTION 1: HERO */}
      <section className="relative pt-28 pb-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          
          {/* LEFT SIDE: Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-500" />
              {t('landing.badge')}
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-[1.1]">
              {t('landing.headline')}<br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                {t('landing.headlineHighlight')}
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              {t('landing.subline')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link href="/schemes">
                <Button size="lg" className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/20 group">
                  {t('landing.exploreSchemes')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/complaints/file">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-gray-300 hover:bg-gray-100 bg-white text-gray-800 font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
                  {t('landing.fileComplaint')}
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: UI Mockup */}
          <div className="relative flex-1 w-full max-w-md mx-auto lg:mt-0">
            <div className="absolute -inset-10 z-0 opacity-5 pointer-events-none" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%234F46E5' stroke-width='1' /%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }} />
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 hover:-translate-y-1 transition-transform">
              
              {/* Header Row */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-gray-900">Scheme Finder</span>
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">3 schemes matched for you</span>
              </div>
              
              {/* Search Bar */}
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-6">
                <Search className="w-5 h-5 text-indigo-500" />
                <span className="text-gray-400 text-sm">Search welfare schemes...</span>
              </div>
              
              {/* Scheme Cards */}
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{t('landing.mockScheme1Tag')}</span>
                    <span className="text-[10px] text-gray-500">{t('generic.under3Lakh')}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{t('landing.mockScheme1Title')}</h4>
                  <p className="text-[10px] text-gray-600 mb-3 line-clamp-2">{t('landing.mockScheme1Elig')}</p>
                  <div className="flex items-center text-[10px] font-medium text-blue-600">
                    {t('landing.mockCheckElig')}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{t('landing.mockScheme2Tag')}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{t('landing.mockScheme2Title')}</h4>
                  <p className="text-[10px] text-gray-600 mb-3">{t('landing.mockScheme2Elig')}</p>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[85%]"></div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-lg border border-orange-100 ring-2 ring-orange-500/20">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle2 size={24} />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{t('schemes.schemesMatched', { count: 12 })}</h4>
                    <p className="text-[10px] text-gray-500 mb-3">{t('landing.mockShowMatching', { count: 12 })}</p>
                    <div className="w-full py-2 bg-orange-500 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                      {t('landing.exploreSchemes')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROBLEM STATEMENT */}
      <section className="py-24 bg-[#FAFAF9] relative z-20 border-t border-gray-100">
        <div className="container mx-auto px-4 py-8 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">{t('landing.problemTitle')}</h2>
            <p className="text-lg text-gray-500">
              {t('landing.problemSub', { defaultValue: "Delhi provides hundreds of services, but citizens often struggle to access them or hold agencies accountable." })}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            {/* Missing Schemes Stat */}
            <div className="group relative p-8 rounded-[2rem] bg-[#FFF8F1] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md border border-orange-100/50">
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100/40 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="relative">
                <div className="w-10 h-10 mb-6 text-orange-500">
                  <FileText className="w-full h-full" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('landing.stat1Title')}</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {t('landing.stat1Desc', { defaultValue: "Millions of rupees in welfare funds go unused because citizens don't know they qualify or find the application process confusing. Our AI engine matches your profile directly to active schemes." })}
                </p>
              </div>
            </div>

            {/* Lost Complaints Stat */}
            <div className="group relative p-8 rounded-[2rem] bg-[#FFF0F0] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md border border-red-100/50">
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-100/40 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="relative">
                <div className="w-10 h-10 mb-6 text-red-500">
                  <AlertTriangle className="w-full h-full" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('landing.stat2Title')}</h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {t('landing.stat2Desc', { defaultValue: "Civic complaints often fall into a black hole with no updates. We enforce strict SLAs (Service Level Agreements) that automatically escalate your issue if not resolved in time." })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">{t('landing.howItWorksTitle')}</h2>
            <p className="text-xl text-gray-500">
              {t('landing.howItWorksSub')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group p-6 rounded-3xl hover:bg-gray-50 transition-colors">
              <div className="mb-8 relative">
                <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-500">
                  <Search className="w-10 h-10" />
                </div>
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-sm font-bold text-gray-400 shadow-sm">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('landing.step1Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.step1Desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative group p-6 rounded-3xl hover:bg-gray-50 transition-colors">
              <div className="mb-8 relative">
                <div className="w-20 h-20 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-sm font-bold text-gray-400 shadow-sm">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('landing.step2Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.step2Desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative group p-6 rounded-3xl hover:bg-gray-50 transition-colors">
              <div className="mb-8 relative">
                <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-500">
                  <Clock className="w-10 h-10" />
                </div>
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-sm font-bold text-gray-400 shadow-sm">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('landing.step3Title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURE HIGHLIGHTS */}
      <section className="py-24 bg-[#FAFAF9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          
          {/* Highlight 1: Filter Schemes */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                <Search className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">{t('landing.feat1Title')}</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('landing.feat1Desc')}
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3 text-lg text-gray-700 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0" /> {t('landing.feat1Bullet1')}
                </li>
                <li className="flex items-center gap-3 text-lg text-gray-700 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0" /> {t('landing.feat1Bullet2')}
                </li>
                <li className="flex items-center gap-3 text-lg text-gray-700 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0" /> {t('landing.feat1Bullet3')}
                </li>
              </ul>
            </div>
            <div className="flex-1 w-full bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-gray-200 shadow-xl relative min-h-[400px] flex items-center justify-center">
              {/* Realistic Mockup: Filter UI */}
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden text-sm">
                <div className="bg-gray-50 border-b border-gray-100 text-gray-900 p-4 font-semibold flex justify-between items-center">
                  <span>{t('landing.mockEligibilityTitle')}</span>
                  <span className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded shadow-sm hover:bg-gray-50 cursor-pointer">Reset</span>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('landing.mockAnnualIncome')}</label>
                    <div className="mt-2 h-2 bg-gray-100 rounded-full relative">
                      <div className="absolute left-0 top-0 h-full w-1/3 bg-blue-500 rounded-full" />
                      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow" />
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-500 font-medium mt-2">
                      <span>₹0</span><span className="text-blue-600 font-bold">Under ₹3 Lakh</span><span>₹10L+</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{t('landing.mockCategory')}</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-lg font-bold shadow-sm">SC / ST</span>
                      <span className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg font-medium hover:bg-gray-50">OBC</span>
                      <span className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg font-medium hover:bg-gray-50">General</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md">
                    Show 12 Matching Schemes
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Highlight 2: Accountability & Tracking */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">{t('landing.feat2Title')}</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('landing.feat2Desc')}
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3 text-lg text-gray-700 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" /> {t('landing.feat2Bullet1')}
                </li>
                <li className="flex items-center gap-3 text-lg text-gray-700 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" /> {t('landing.feat2Bullet2')}
                </li>
                <li className="flex items-center gap-3 text-lg text-gray-700 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" /> {t('landing.feat2Bullet3')}
                </li>
              </ul>
            </div>
            <div className="flex-1 w-full bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border border-gray-200 shadow-xl relative min-h-[400px] flex items-center justify-center">
              {/* Realistic Mockup: Complaint Timeline */}
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{t('landing.mockComplaintId')}</span>
                    <h4 className="font-bold text-gray-900 text-sm">{t('landing.mockComplaintTitle')}</h4>
                  </div>
                  <div className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-[10px] font-bold animate-pulse">
                    {t('landing.mockSlaLeft')}
                  </div>
                </div>

                <div className="space-y-4 relative">
                  {/* Timeline vertical line */}
                  <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                  <div className="flex items-start gap-3 relative">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-500 z-10 mt-1"></div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-900">{t('landing.mockFiled')}</p>
                      <p className="text-[9px] text-gray-500">{t('landing.mockTimeline1')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 relative">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-500 z-10 mt-1"></div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-900">{t('landing.mockAssigned')}</p>
                      <p className="text-[9px] text-gray-500">{t('landing.mockTimeline2')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 relative">
                    <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white ring-1 ring-blue-500 z-10 mt-1"></div>
                    <div>
                      <p className="text-[11px] font-bold text-blue-600">{t('landing.mockInspection')}</p>
                      <p className="text-[9px] text-blue-500 italic">{t('landing.mockInProgress')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 relative opacity-30">
                    <div className="w-3 h-3 rounded-full bg-gray-300 border-2 border-white ring-1 ring-gray-300 z-10 mt-1"></div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-400">{t('landing.mockResolution')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlight 3: AI Assistant */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            <div className="flex-1 space-y-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">{t('landing.feat3Title')}</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('landing.feat3Desc')}
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3 text-lg text-gray-700 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0" /> {t('landing.feat3Bullet1')}
                </li>
                <li className="flex items-center gap-3 text-lg text-gray-700 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0" /> {t('landing.feat3Bullet2')}
                </li>
                <li className="flex items-center gap-3 text-lg text-gray-700 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0" /> {t('landing.feat3Bullet3')}
                </li>
              </ul>
            </div>
            <div className="flex-1 w-full bg-gradient-to-br from-blue-50 to-fuchsia-50 rounded-3xl p-8 border border-gray-200 shadow-xl relative min-h-[400px] flex items-center justify-center">
              {/* Realistic Mockup: AI Chat */}
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-[320px] p-4">
                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{t('landing.mockAiTitle')}</h4>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[8px] font-medium text-gray-400 uppercase tracking-widest">AI Assistance Active</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-end">
                    <div className="bg-indigo-600 text-white p-2.5 rounded-2xl rounded-tr-none max-w-[85%]">
                      <p className="text-[10px] font-medium leading-relaxed">{t('landing.mockAiQuery')}</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-tl-none max-w-[90%] border border-gray-200">
                      <p className="text-[10px] font-bold text-indigo-700 mb-1">{t('landing.mockChatScheme')}</p>
                      <p className="text-[10px] leading-relaxed mb-2">{t('landing.mockChatDesc')}</p>
                      <ul className="text-[9px] space-y-1 text-gray-600">
                        <li className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-indigo-400"></div>
                          {t('landing.mockChatReq1')}
                        </li>
                        <li className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-indigo-400"></div>
                          {t('landing.mockChatReq2')}
                        </li>
                        <li className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-indigo-400"></div>
                          {t('landing.mockChatReq3')}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[10px] text-gray-400 flex items-center justify-between">
                    {t('landing.mockAiInput')}
                    <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: STATS STRIP */}
      <section className="bg-white border-y border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-gray-100">
            <div className="text-center px-4">
              <p className="text-5xl font-black text-gray-900 mb-2 tracking-tight">15+</p>
              <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase">{t('landing.statsLabel1')}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-5xl font-black text-gray-900 mb-2 tracking-tight">7</p>
              <p className="text-sm font-semibold text-red-600 tracking-wide uppercase">{t('landing.statsLabel2')}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-5xl font-black text-gray-900 mb-2 tracking-tight">24/7</p>
              <p className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">{t('landing.statsLabel3')}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-5xl font-black text-gray-900 mb-2 tracking-tight">100%</p>
              <p className="text-sm font-semibold text-blue-500 tracking-wide uppercase">{t('landing.statsLabel4')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: ROLE CARDS */}
      <section className="py-24 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">{t('landing.rolesTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('landing.rolesSub')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400/50 shadow-sm hover:shadow-lg transition-all group flex flex-col h-full">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-blue-500">👤</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('landing.roleCitizen')}</h3>
              <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                {t('landing.roleCitizenDesc')}
              </p>
              <Link href="/schemes" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  {t('nav.login')}
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-400/50 shadow-sm hover:shadow-lg transition-all group flex flex-col h-full">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-orange-500">👷</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('landing.roleOfficer')}</h3>
              <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                {t('landing.roleOfficerDesc')}
              </p>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  {t('nav.officerLogin')}
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-emerald-400/50 shadow-sm hover:shadow-lg transition-all group flex flex-col h-full">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-emerald-500">📈</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('landing.roleSupervisor')}</h3>
              <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
               {t('landing.roleSupervisorDesc')}
              </p>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  {t('nav.login')}
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA BANNER */}
      <section className="py-24 bg-white text-center px-4">
        <div className="max-w-4xl mx-auto space-y-8 p-12 md:py-20 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-900/40 rounded-full blur-2xl -ml-10 -mb-10"></div>
          
          <div className="absolute top-8 right-12 opacity-30">
            <Sparkles className="w-24 h-24 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight relative z-10">{t('landing.ctaTitle')}</h2>
          <p className="text-xl text-blue-100 font-medium relative z-10">{t('landing.ctaSub')}</p>
          <div className="pt-6 flex justify-center relative z-10">
            <Link href="/complaints/file">
              <Button size="lg" className="shadow-2xl shadow-blue-900/50 hover:scale-105 transition-transform px-8 py-7 rounded-full font-bold text-lg bg-white text-blue-900 hover:bg-gray-50">
                {t('landing.ctaButton')}
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
