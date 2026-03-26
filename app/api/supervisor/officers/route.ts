import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';
import { requireAuth } from '@/lib/middleware';
import { UserRole } from '@/types';

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request, [UserRole.SUPERVISOR, UserRole.ADMIN]);
  if (authResult instanceof NextResponse) return authResult;

  try {
    // Join officers with users and departments
    const { data: officers, error: officerError } = await supabaseAdmin
      .from('officers')
      .select(`
        id,
        designation,
        departments (name),
        users (full_name)
      `);

    if (officerError) throw officerError;

    // Get all complaints to calculate metrics per officer
    const { data: complaints, error: complaintError } = await supabaseAdmin
      .from('complaints')
      .select('officer_id, status, sla_deadline');

    if (complaintError) throw complaintError;

    const now = new Date();
    const performance = officers.map(o => {
      const assigned = complaints.filter(c => c.officer_id === o.id);
      const resolved = assigned.filter(c => c.status === 'resolved').length;
      const overdue = assigned.filter(c => {
        const terminal = ['resolved', 'closed'];
        return !terminal.includes(c.status) && c.sla_deadline && new Date(c.sla_deadline) < now;
      }).length;

      const totalAssigned = assigned.length;
      const slaRate = totalAssigned > 0 ? Math.round(((totalAssigned - overdue) / totalAssigned) * 100) : 100;

      return {
        officer_id: o.id,
        officer_name: o.users?.full_name || 'Unknown Officer',
        //@ts-ignore
        department_name: o.departments?.name || 'N/A',
        assigned_count: totalAssigned,
        resolved_count: resolved,
        overdue_count: overdue,
        sla_compliance_rate: slaRate
      };
    });

    return NextResponse.json({
      success: true,
      officers: performance
    });

  } catch (err) {
    console.error('[API] supervisor officers error:', err);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
