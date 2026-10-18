import 'server-only';
import { cookies } from 'next/headers';
import { webOrigin } from '../site';
import { readDashboardSession, canManage } from './security';
export const cookieName = () =>
  webOrigin().startsWith('https:') ? '__Host-starvis-session' : 'starvis-session';
export const cookieOptions = () => ({
  httpOnly: true,
  secure: webOrigin().startsWith('https:'),
  sameSite: 'lax' as const,
  path: '/',
});
export function oauthConfig() {
  const clientId = process.env.DASHBOARD_DISCORD_CLIENT_ID;
  const secret = process.env.DASHBOARD_DISCORD_CLIENT_SECRET;
  if (!clientId || !/^\d{16,22}$/.test(clientId) || !secret)
    throw new Error('Dashboard authentication is not configured');
  return { clientId, secret, redirectUri: `${webOrigin()}/api/dashboard/auth/callback` };
}
export async function discord<T>(path: string, token: string): Promise<T> {
  const response = await fetch(`https://discord.com/api/v10${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
    redirect: 'error',
  });
  if (!response.ok) throw new Error('Discord authorization unavailable');
  return response.json() as Promise<T>;
}
export interface ManagedGuild {
  id: string;
  name: string;
  owner: boolean;
  permissions: string;
}
export async function managedGuilds(): Promise<ManagedGuild[] | null> {
  let session;
  try {
    session = readDashboardSession(oauthConfig().secret, (await cookies()).get(cookieName())?.value ?? '');
  } catch {
    return null;
  }
  if (!session) return null;
  const guilds = await discord<ManagedGuild[]>('/users/@me/guilds?limit=200', session.token);
  return guilds.filter(canManage);
}

