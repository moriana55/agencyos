export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rows = await sql`SELECT ayrshare_key FROM agencies WHERE clerk_id=${userId}`
  const key  = rows[0]?.ayrshare_key
  if (!key) return NextResponse.json({ error: 'API key yok' }, { status: 400 })

  const res = await fetch('https://app.ayrshare.com/api/user', {
    headers: { Authorization: `Bearer ${key}` },
  })
  return res.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Geçersiz key' }, { status: 400 })
}
