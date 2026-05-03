export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { post_id } = await req.json()

  const agency = await sql`SELECT * FROM agencies WHERE clerk_id=${userId}`
  if (!agency[0]?.ayrshare_key) return NextResponse.json({ error: 'Ayrshare API key eksik. Ayarlar sayfasından ekle.' }, { status: 400 })

  const post = await sql`
    SELECT p.*, sa.profile_key
    FROM content_posts p
    JOIN social_accounts sa ON sa.client_id = p.client_id
    WHERE p.id=${post_id} AND p.agency_id=${agency[0].id}
    LIMIT 1`

  if (!post[0]) return NextResponse.json({ error: 'Post bulunamadı' }, { status: 404 })

  const body: any = {
    post:        post[0].caption || post[0].title,
    platforms:   post[0].platforms,
    mediaUrls:   post[0].media_urls?.length ? post[0].media_urls : undefined,
    scheduleDate: post[0].scheduled_at || undefined,
    profileKeys: post[0].profile_key ? [post[0].profile_key] : undefined,
  }

  const res  = await fetch('https://app.ayrshare.com/api/post', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${agency[0].ayrshare_key}` },
    body:    JSON.stringify(body),
  })
  const data = await res.json()

  if (res.ok) {
    await sql`UPDATE content_posts SET status='published', published_at=now(), ayrshare_post_id=${data.id||null} WHERE id=${post_id}`
  }

  return res.ok
    ? NextResponse.json({ ok: true, data })
    : NextResponse.json({ error: data.message || 'Yayınlama başarısız' }, { status: 400 })
}
