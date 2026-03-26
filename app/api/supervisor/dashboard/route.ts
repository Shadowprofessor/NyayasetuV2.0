import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';
import { requireAuth } from '@/lib/middleware';
import { UserRole } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request, [UserRole.SUPERVISOR, UserRole.ADMIN]);
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { data: complaints, error } = await supabaseAdmin
      .from('complaints')
      .select('id, status, category, urgency, created_at, sla_deadline');

    if (error) throw error;

    const total = complaints.length;
    const active = complaints.filter(c => ['submitted', 'verified', 'assigned', 'in_progress', 'reopened'].includes(c.status)).length;
    const resolved = complaints.filter(c => c.status === 'resolved').length;
    const escalated = complaints.filter(c => c.status === 'escalated').length;
    
    const now = new Date();
    const overdue = complaints.filter(c => {
      const terminal = ['resolved', 'closed'];
      return !terminal.includes(c.status) && c.sla_deadline && new Date(c.sla_deadline) < now;
    }).length;

    // SLA compliance %
    const slaCompliance = total > 0 ? Math.round(((total - overdue) / total) * 100) : 100;

    // Category breakdown
    const categoryMap: Record<string, number> = {};
    complaints.forEach(c => {
      categoryMap[c.category] = (categoryMap[c.category] || 0) + 1;
    });
    const categoryBreakdown = Object.entries(categoryMap).map(([category, count]) => ({ category, count }));

    // 7-day trend
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const dailyTrendMap: Record<string, number> = {};
    
    // Initialize last 7 days with 0
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dailyTrendMap[d.toISOString().split('T')[0]] = 0;
    }

    complaints.forEach(c => {
      const dateStr = c.created_at.split('T')[0];
      if (dailyTrendMap[dateStr] !== undefined) {
        dailyTrendMap[dateStr]++;
      }
    });

    const dailyTrend = Object.entries(dailyTrendMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({
      success: true,
      metrics: {
        total_complaints: total,
        active_complaints: active,
        resolved_complaints: resolved,
        overdue_complaints: overdue,
        escalated_complaints: escalated,
        sla_compliance_rate: slaCompliance,
        category_breakdown: categoryBreakdown,
        daily_trend: dailyTrend,
        ward_hotspots: [] // Placeholder for now
      }
    });

  } catch (err) {
    console.error('[API] supervisor dashboard error:', err);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
