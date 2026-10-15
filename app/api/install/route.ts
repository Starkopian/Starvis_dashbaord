import { NextResponse } from 'next/server';
import { isSnowflake, webOrigin } from '@/lib/site';
export async function GET(request: Request) {
  const id = process.env.DISCORD_CLIENT_ID;
  if (!id || !isSnowflake(id))
    return NextResponse.redirect(new URL('/support?setup=installation', webOrigin()));
  const url = new URL('https://discord.com/oauth2/authorize');
  // View/send/embed/attach/read history, reactions, and voice connect/speak.
  // No Administrator, moderation, role, kick or ban permission is requested by default.
  url.search = new URLSearchParams({
    client_id: id,
    scope: 'bot applications.commands',
    permissions: '3263552',
    integration_type: '0',
  }).toString();
  const guildId = new URL(request.url).searchParams.get('guild_id');
  if (guildId && isSnowflake(guildId)) {
    url.searchParams.set('guild_id', guildId);
    url.searchParams.set('disable_guild_select', 'true');
  }
  return NextResponse.redirect(url);
}
