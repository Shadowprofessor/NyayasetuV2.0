'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, CheckCircle, Clock, Filter, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ComplaintQueueCard from '@/components/complaints/ComplaintQueueCard';
import type { Complaint } from '@/types';

const TOKEN_KEY = 'nyayasetu_token';

export default function SupervisorQueuePage() {
  const router = useRouter();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  // Filters
  const [statusFilter, setStatusFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  const fetchQueue = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (urgencyFilter) params.set('urgency', urgencyFilter);
      params.set('sort_by', sortBy);
      params.set('sort_order', sortOrder);

      const res = await fetch(`/api/officer/queue?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setComplaints(data.complaints);
        setTotal(data.total);
      } else {
        setError(data.message || 'Failed to load queue.');
      }
    } catch {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, urgencyFilter, sortBy, sortOrder]);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  // Stats
  const overdue = complaints.filter((c) => {
    const terminal = ['resolved', 'closed'];
    return !terminal.includes(c.status) && new Date(c.sla_deadline) < new Date();
  }).length;

  const resolvedToday = complaints.filter((c) => {
    if (c.status !== 'resolved') return false;
    const today = new Date().toISOString().split('T')[0];
    return c.updated_at.startsWith(today);
  }).length;

  return (
    <div className="p-6 max-w-6xl mx-auto w-full animate-fadeIn">
      {/* Back link */}
      <button onClick={() => router.push('/supervisor')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <h1 className="text-xl font-bold text-gray-900 mb-6">All Complaints Master Queue</h1>

      {/* Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Filter className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{total}</p>
            <p className="text-xs text-gray-500">Total System</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">{overdue}</p>
            <p className="text-xs text-gray-500">Overdue Status</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{resolvedToday}</p>
            <p className="text-xs text-gray-500">Resolved Today</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          {/* Filters... */}
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 text-sm">
            <option value="">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="escalated">Escalated</option>
          </select>

          <select value={urgencyFilter} onChange={(e) => setUrgencyFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 text-sm">
            <option value="">All Urgencies</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select value={`${sortBy}:${sortOrder}`} onChange={(e) => {
              const [field, order] = e.target.value.split(':');
              setSortBy(field); setSortOrder(order);
            }} className="px-3 py-2 rounded-lg border border-gray-300 text-sm">
            <option value="created_at:desc">Newest First</option>
            <option value="created_at:asc">Oldest First</option>
            <option value="sla_deadline:asc">SLA Soonest</option>
            <option value="sla_deadline:desc">SLA Latest</option>
          </select>

          <button onClick={fetchQueue} className="ml-auto flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
            <Clock className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-pulse h-24"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <AlertTriangle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500 mb-3">{error}</p>
        </div>
      ) : complaints.length === 0 ? (
        <div className="text-center py-16">
          <CheckCircle className="w-10 h-10 text-green-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No complaints in system.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {complaints.map((c) => (
            <ComplaintQueueCard key={c.id} complaint={c} basePath="/supervisor/complaints" />
          ))}
        </div>
      )}
    </div>
  );
}
