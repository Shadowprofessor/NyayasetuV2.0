import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/otp';
import { supabaseAdmin } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, otp } = body;

    // ── Input validation ─────────────────────────────────────────────────────
    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Phone number is required.' },
        { status: 400 }
      );
    }

    if (!otp || typeof otp !== 'string' || !/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { success: false, message: 'A valid 6-digit OTP is required.' },
        { status: 400 }
      );
    }

    const phoneClean = phone.replace(/\s+/g, '');

    // ── OTP verification ─────────────────────────────────────────────────────
    const otpResult = await verifyOTP(phoneClean, otp);
    if (!otpResult.success) {
      return NextResponse.json(otpResult, { status: 401 });
    }

    // ── Fetch complaints linked to this phone ─────────────────────────────────
    const { data: complaints, error } = await supabaseAdmin
      .from('complaints')
      .select('complaint_uid, title, status, category, created_at, sla_deadline')
      .eq('citizen_phone', phoneClean)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('[API] track-by-phone/verify DB error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch complaints.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      complaints: complaints || [],
    });
  } catch (err) {
    console.error('[API] track-by-phone/verify error:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
