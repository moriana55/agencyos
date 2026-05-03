export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function PATCH(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, ayrshare_key } = await req.json()
  await sql`UPDATE agencies SET name=${name}, ayrshare_key=${ayrshare_key} WHERE clerk_id=${userId}`
  return NextResponse.json({ ok: true })
}
