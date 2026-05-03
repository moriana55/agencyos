export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) return NextResponse.json({ results: [] });

    const [clients, campaigns] = await Promise.all([
      prisma.client.findMany({
        where: { userId, name: { contains: query } },
        take: 5
      }),
      prisma.campaign.findMany({
        where: { client: { userId }, name: { contains: query } },
        take: 5,
        include: { client: true }
      })
    ]);

    const results = [
      ...clients.map((c: any) => ({ id: c.id, name: c.name, type: 'Müşteri', path: `/musteriler/${c.id}` })),
      ...campaigns.map((c: any) => ({ id: c.id, name: c.name, type: 'Kampanya', path: '/reklam' }))
    ];

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: 'Hata' }, { status: 500 });
  }
}
