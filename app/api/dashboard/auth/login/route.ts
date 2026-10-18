import { NextResponse } from 'next/server';
import { oauthConfig, sessions, cookieOptions } from '@/lib/dashboard/server';
export const runtime = 'nodejs';
export async function GET() {
  try {
    const config = oauthConfig();
    const state = sessions.begin();
    const url = new URL('https://discord.com/oauth2/authorize');
    url.search = new URLSearchParams({
      client_id: config.clientId,
      response_type: 'code',
      redirect_uri: config.redirectUri,
      scope: 'identify guilds',
      state,
    }).toString();
    const response = NextResponse.redirect(url);
    response.headers.set('Cache-Control', 'no-store');
    response.cookies.set('starvis-oauth-state', state, { ...cookieOptions(), maxAge: 300 });
    return response;
  } catch {
    return NextResponse.json(
      {
        error: 'Dashboard sign-in is not available. Ask the host administrator to configure OAuth.',
      },
      { status: 503 },
    );
  }
}
