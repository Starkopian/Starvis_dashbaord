import { NextRequest, NextResponse } from 'next/server';
import { oauthConfig, sessions, cookieName, cookieOptions } from '@/lib/dashboard/server';
import { webOrigin } from '@/lib/site';
export const runtime = 'nodejs';
export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(`${webOrigin()}/dashboard`);
  response.headers.set('Cache-Control', 'no-store');
  response.cookies.set('starvis-oauth-state', '', { ...cookieOptions(), maxAge: 0 });
  const state = request.nextUrl.searchParams.get('state') ?? '';
  const code = request.nextUrl.searchParams.get('code');
  if (!sessions.consume(state, request.cookies.get('starvis-oauth-state')?.value ?? '') || !code) {
    return NextResponse.json(
      { error: 'Invalid or expired login. Start sign-in again.' },
      { status: 400 },
    );
  }
  try {
    const config = oauthConfig();
    const exchange = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.secret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.redirectUri,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
      redirect: 'error',
    });
    if (!exchange.ok) throw new Error('Login failed');
    const data = (await exchange.json()) as {
      access_token: string;
      expires_in: number;
      scope: string;
      token_type: string;
    };
    if (data.token_type.toLowerCase() !== 'bearer' || !data.scope.split(' ').includes('guilds'))
      throw new Error('Invalid scopes');
    sessions.revoke(request.cookies.get(cookieName())?.value ?? '');
    const id = sessions.create(data.access_token, data.expires_in);
    response.cookies.set(cookieName(), id, {
      ...cookieOptions(),
      maxAge: Math.min(data.expires_in, 1800),
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Sign-in failed. Please start again.' }, { status: 503 });
  }
}
