import { NextRequest, NextResponse } from 'next/server';
import { sessions, cookieName, cookieOptions } from '@/lib/dashboard/server';
import { webOrigin } from '@/lib/site';
export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== webOrigin())
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  sessions.revoke(request.cookies.get(cookieName())?.value ?? '');
  const response = NextResponse.redirect(`${webOrigin()}/dashboard`, 303);
  response.cookies.set(cookieName(), '', { ...cookieOptions(), maxAge: 0 });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
