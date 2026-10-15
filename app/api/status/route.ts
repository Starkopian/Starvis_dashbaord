import { publicStatus } from '@/lib/site';
export async function GET() {
  return Response.json(await publicStatus(), { headers: { 'Cache-Control': 'no-store' } });
}
