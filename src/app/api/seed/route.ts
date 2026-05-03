export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // 1. Create Demo Client
    const client = await prisma.client.create({
      data: {
        name: 'Bella Fashion (Demo)',
        sector: 'E-Ticaret / Moda',
        userId,
        status: 'active',
      }
    });

    // 2. Create Demo Campaigns
    await prisma.campaign.createMany({
      data: [
        { 
          name: 'Yaz Koleksiyonu Ads', 
          platform: 'Meta', 
          budget: 15000, 
          spend: 4250, 
          roas: 4.8, 
          clicks: 1240, 
          clientId: client.id,
          status: 'active'
        },
        { 
          name: 'Google Search Promo', 
          platform: 'Google', 
          budget: 8000, 
          spend: 2100, 
          roas: 3.5, 
          clicks: 840, 
          clientId: client.id,
          status: 'active'
        }
      ]
    });

    // 3. Create Demo Posts
    await prisma.post.createMany({
      data: [
        { 
          title: 'Yeni Sezon Tanıtımı', 
          caption: 'Yeni sezon ürünlerimizde %20 indirim başladı! Hemen keşfedin. #moda #trend', 
          platforms: 'instagram,facebook', 
          status: 'scheduled', 
          scheduledAt: new Date(Date.now() + 172800000), // 2 days later
          clientId: client.id 
        },
        { 
          title: 'Haftalık Stil Önerisi', 
          caption: 'Pazartesi şıklığı için 3 farklı kombin önerisi blogda yayında!', 
          platforms: 'tiktok', 
          status: 'draft', 
          clientId: client.id 
        }
      ]
    });

    // 4. Create Demo Integration
    await prisma.integration.upsert({
      where: { platform_userId: { platform: 'meta', userId } },
      update: { status: 'connected', lastSync: new Date() },
      create: { platform: 'meta', userId, status: 'connected', lastSync: new Date() }
    });

    return NextResponse.json({ success: true, message: 'Demo verileri siber-premium bir hızla yüklendi! 🚀' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
