export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const [clientsCount, campaignsCount, integrationsCount, postsCount, subscription] = await Promise.all([
      prisma.client.count({ where: { userId } }),
      prisma.campaign.count({ where: { client: { userId } } }),
      prisma.integration.count({ where: { userId, status: 'connected' } }),
      prisma.post.count({ where: { client: { userId }, status: 'scheduled' } }),
      prisma.subscription.findUnique({ where: { userId } })
    ]);

    return NextResponse.json({
      stats: {
        clients: clientsCount,
        activeCampaigns: campaignsCount,
        integrations: integrationsCount,
        scheduledPosts: postsCount,
        plan: subscription?.plan || 'free'
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
