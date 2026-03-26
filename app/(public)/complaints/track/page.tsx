'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Loader2, FileSearch, Phone, ChevronRight, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { maskPhone } from '@/lib/utils';

// ── Shared types ──────────────────────────────────────────────────────────────
interface PhoneComplaint {
  complaint_uid: string;
  title: string;
  status: string;
  category: string;
  created_at: string;
  sla_deadline: string | null;
}

// ── Tab: Track by UID ─────────────────────────────────────────────────────────
function TrackByUid() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [uid, setUid] = useState(searchParams.get('uid') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const handleSearch = useCallback(async (searchUid: string) => {
    const trimmed = searchUid.trim().toUpperCase();
    if (!trimmed) {
      setError(t('complaint.enterId', { defaultValue: 'Please enter a Complaint ID.' }));
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/complaints/track/${trimmed}`);
      const data = await res.json();
      if (data.success) {
        router.push(`/complaints/track/${trimmed}`);
      } else {
        setError(data.message || t('complaint.notFound', { defaultValue: 'Complaint not found.' }));
      }
    } catch {
      setError(t('complaint.networkError', { defaultValue: 'Network error. Please try again.' }));
    } finally {
      setLoading(false);
    }
  }, [router, t]);

  // Auto-search on load if ?uid= is present
  useEffect(() => {
    const paramUid = searchParams.get('uid');
    if (paramUid) { setUid(paramUid); handleSearch(paramUid); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="track-uid" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('complaint.id', { defaultValue: 'Complaint ID' })}
        </label>
        <input
          id="track-uid"
          type="text"
          value={uid}
          onChange={(e) => { setUid(e.target.value.toUpperCase()); setError(''); }}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(uid); }}
          placeholder={t('complaint.idPlaceholder', { defaultValue: 'e.g. NYC-20260325-00042' })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all
            text-gray-900 font-mono text-center text-lg tracking-wider placeholder-gray-400"
        />
      </div>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      <button
        onClick={() => handleSearch(uid)}
        disabled={loading || !uid.trim()}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
          bg-indigo-600 text-white font-medium hover:bg-indigo-700
          disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
          <><Search className="w-5 h-5" />{t('complaint.btnTrack', { defaultValue: 'Track Complaint' })}</>
        )}
      </button>
    </div>
  );
}

// ── Tab: Track by Phone ───────────────────────────────────────────────────────
function TrackByPhone() {
  const router = useRouter();
  const { t } = useTranslation();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [complaints, setComplaints] = useState<PhoneComplaint[] | null>(null);
  const otpRef = useRef<HTMLInputElement>(null);

  const handleSendOtp = useCallback(async () => {
    const phoneClean = phone.replace(/\s+/g, '');
    if (!/^\d{10}$/.test(phoneClean)) {
      setError(t('complaint.phoneInvalid', { defaultValue: 'Please enter a valid 10-digit phone number.' }));
      return;
    }
    setSendingOtp(true);
    setError('');
    try {
      const res = await fetch('/api/complaints/track-by-phone/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneClean }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        setTimeout(() => otpRef.current?.focus(), 100);
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch {
      setError(t('complaint.networkError', { defaultValue: 'Network error. Please try again.' }));
    } finally {
      setSendingOtp(false);
    }
  }, [phone, t]);

  const handleVerify = useCallback(async () => {
    if (!/^\d{6}$/.test(otp)) {
      setError(t('complaint.otpInvalid', { defaultValue: 'Please enter the 6-digit OTP.' }));
      return;
    }
    const phoneClean = phone.replace(/\s+/g, '');
    setVerifying(true);
    setError('');
    try {
      const res = await fetch('/api/complaints/track-by-phone/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneClean, otp }),
      });
      const data = await res.json();
      if (data.success) {
        setComplaints(data.complaints);
      } else {
        setError(data.message || 'OTP verification failed.');
      }
    } catch {
      setError(t('complaint.networkError', { defaultValue: 'Network error. Please try again.' }));
    } finally {
      setVerifying(false);
    }
  }, [phone, otp, t]);

  // ── Complaints list ─────────────────────────────────────────────────────────
  if (complaints !== null) {
    if (complaints.length === 0) {
      return (
        <div className="text-center py-6">
          <p className="text-gray-500 text-sm">
            {t('complaint.noComplaintsPhone', { defaultValue: 'No complaints found for this phone number.' })}
          </p>
          <button
            onClick={() => { setComplaints(null); setOtp(''); setOtpSent(false); setPhone(''); }}
            className="mt-3 text-xs text-indigo-600 hover:underline"
          >
            {t('complaint.tryAnother', { defaultValue: 'Try another number' })}
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold text-gray-700">
            {t('complaint.complaintsLinked', { defaultValue: 'Complaints linked to your number' })} ({maskPhone(phone)})
          </p>
          <button
            onClick={() => { setComplaints(null); setOtp(''); setOtpSent(false); setPhone(''); }}
            className="text-xs text-indigo-600 hover:underline"
          >
            {t('complaint.change', { defaultValue: 'Change' })}
          </button>
        </div>
        {complaints.map((c) => (
          <button
            key={c.complaint_uid}
            onClick={() => router.push(`/complaints/track/${c.complaint_uid}`)}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200
              bg-white hover:border-indigo-300 hover:shadow-sm transition-all text-left"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{c.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {c.complaint_uid} &bull; {c.status.replace(/_/g, ' ').toUpperCase()}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500">
        {t('complaint.phoneTabDesc', { defaultValue: 'Enter your registered phone number to find all linked complaints.' })}
      </p>

      {/* Phone input */}
      <div>
        <label htmlFor="track-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('complaint.phone', { defaultValue: 'Phone Number' })}
        </label>
        <div className="flex gap-2">
          <div className="flex items-center px-3 bg-gray-50 border border-gray-300 border-r-0 rounded-l-lg text-sm text-gray-500">
            +91
          </div>
          <input
            id="track-phone"
            type="tel"
            value={phone}
            onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
            placeholder="10-digit number"
            disabled={otpSent}
            className="flex-1 px-4 py-3 rounded-r-lg border border-gray-300 outline-none
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all
              text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
      </div>

      {/* OTP input (shown after send) */}
      {otpSent && (
        <div>
          <label htmlFor="track-otp" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('complaint.otp', { defaultValue: 'One Time Password' })}
          </label>
          <input
            id="track-otp"
            ref={otpRef}
            type="text"
            inputMode="numeric"
            value={otp}
            onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleVerify(); }}
            placeholder="6-digit OTP"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-900 tracking-widest text-center"
          />
          <p className="text-xs text-gray-400 mt-1">
            {`OTP sent to +91 ${maskPhone(phone)}`}
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {!otpSent ? (
        <button
          onClick={handleSendOtp}
          disabled={sendingOtp || phone.length !== 10}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
            bg-indigo-600 text-white font-medium hover:bg-indigo-700
            disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {sendingOtp ? <Loader2 className="w-5 h-5 animate-spin" /> : (
            <><Phone className="w-5 h-5" />{t('complaint.sendOtpToPhone', { defaultValue: 'Send OTP to phone' })}</>
          )}
        </button>
      ) : (
        <button
          onClick={handleVerify}
          disabled={verifying || otp.length !== 6}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
            bg-green-600 text-white font-medium hover:bg-green-700
            disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {verifying ? <Loader2 className="w-5 h-5 animate-spin" /> : (
            <><Search className="w-5 h-5" />{t('complaint.findComplaints', { defaultValue: 'Find My Complaints' })}</>
          )}
        </button>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
type TrackTab = 'uid' | 'phone';

function TrackPageContent() {
  const [activeTab, setActiveTab] = useState<TrackTab>('uid');
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  // If ?uid= is in URL, default to uid tab
  useEffect(() => {
    if (searchParams.get('uid')) setActiveTab('uid');
  }, [searchParams]);

  const tabs: { key: TrackTab; label: string; icon: React.ReactNode }[] = [
    {
      key: 'uid',
      label: t('complaint.trackByUid', { defaultValue: 'Track by ID' }),
      icon: <FileSearch className="w-4 h-4" />,
    },
    {
      key: 'phone',
      label: t('complaint.trackByPhone', { defaultValue: 'Track by Phone' }),
      icon: <Phone className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileSearch className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('complaint.trackTitle', { defaultValue: 'Track Your Complaint' })}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {t('complaint.trackSub', { defaultValue: 'Check status using your Complaint ID or registered phone number' })}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all
                  ${activeTab === tab.key
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === 'uid' ? <TrackByUid /> : <TrackByPhone />}
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          {t('complaint.trackHelp', { defaultValue: 'Your Complaint ID was given when you filed the complaint' })}
        </p>
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    }>
      <TrackPageContent />
    </Suspense>
  );
}
