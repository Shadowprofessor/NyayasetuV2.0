import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';
import { requireAuth } from '@/lib/middleware';
import { UserRole } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request, [UserRole.SUPERVISOR, UserRole.ADMIN]);
  if (authResult instanceof NextResponse) return authResult;

  try {
    const now = new Date().toISOString();

    // Fetch complaints that are past SLA deadline and not resolved/closed
    // Using simple query then manual join for robustness
    const { data: complaints, error } = await supabaseAdmin
      .from('complaints')
      .select(`
        id,
        complaint_uid,
        title,
        category,
        urgency,
        status,
        sla_deadline,
        officer_id
      `)
      .not('status', 'in', '("resolved","closed")')
      .lt('sla_deadline', now)
      .order('sla_deadline', { ascending: true });

    if (error) throw error;

    // Fetch all officers to join names
    const { data: officers } = await supabaseAdmin
      .from('officers')
      .select('id, users(full_name)');

    const officerMap = new Map();
    officers?.forEach(o => officerMap.set(
  o.id, 
  Array.isArray(o.users) 
    ? o.users[0]?.full_name 
    : (o.users as any)?.full_name
));
    const enriched = complaints.map(c => {
      const deadline = new Date(c.sla_deadline);
      const hoursOverdue = Math.floor((new Date().getTime() - deadline.getTime()) / (1000 * 60 * 60));

      return {
        id: c.id,
        uid: c.complaint_uid,
        title: c.title,
        category: c.category,
        officer_name: officerMap.get(c.officer_id) || 'Unassigned',
        hours_overdue: hoursOverdue
      };
    });

    return NextResponse.json({
      success: true,
      complaints: enriched
    });

  } catch (err) {
    console.error('[API] supervisor overdue error:', err);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
