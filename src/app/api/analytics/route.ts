export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const [campaigns, posts, clients] = await Promise.all([
      prisma.campaign.findMany({ where: { client: { userId } }, include: { client: true } }),
      prisma.post.findMany({ where: { client: { userId } } }),
      prisma.client.findMany({ where: { userId } }),
    ]);

    const totalSpend = campaigns.reduce((s, c) => s + c.spend, 0);
    const totalBudget = campaigns.reduce((s, c) => s + c.budget, 0);
    const avgRoas = campaigns.length > 0 ? campaigns.reduce((s, c) => s + c.roas, 0) / campaigns.length : 0;
    const totalClicks = campaigns.reduce((s, c) => s + c.clicks, 0);

    const publishedPosts = posts.filter(p => p.status === 'published').length;
    const scheduledPosts = posts.filter(p => p.status === 'scheduled').length;
    const totalPosts = posts.length;

    // Platform breakdown
    const platformStats: Record<string, { spend: number; roas: number; count: number }> = {};
    for (const c of campaigns) {
      if (!platformStats[c.platform]) platformStats[c.platform] = { spend: 0, roas: 0, count: 0 };
      platformStats[c.platform].spend += c.spend;
      platformStats[c.platform].roas += c.roas;
      platformStats[c.platform].count += 1;
    }
    const platforms = Object.entries(platformStats).map(([name, data]) => ({
      name,
      spend: data.spend,
      avgRoas: data.count > 0 ? +(data.roas / data.count).toFixed(1) : 0,
      campaigns: data.count,
    }));

    // Client performance
    const clientPerf = clients.map(client => {
      const clientCampaigns = campaigns.filter(c => c.clientId === client.id);
      const clientPosts = posts.filter(p => p.clientId === client.id);
      return {
        id: client.id,
        name: client.name,
        spend: clientCampaigns.reduce((s, c) => s + c.spend, 0),
        roas: clientCampaigns.length > 0 ? +(clientCampaigns.reduce((s, c) => s + c.roas, 0) / clientCampaigns.length).toFixed(1) : 0,
        campaigns: clientCampaigns.length,
        posts: clientPosts.length,
      };
    }).sort((a, b) => b.spend - a.spend);

    return NextResponse.json({
      overview: {
        totalSpend,
        totalBudget,
        avgRoas: +avgRoas.toFixed(1),
        totalClicks,
        totalClients: clients.length,
        totalCampaigns: campaigns.length,
        totalPosts,
        publishedPosts,
        scheduledPosts,
      },
      platforms,
      clientPerformance: clientPerf,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
