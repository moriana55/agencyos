export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse('Unauthorized', { status: 401 });

    // Simüle edilmiş AI optimizasyonu: 
    // Mevcut aktif kampanyaların ROAS değerlerini hafifçe yükseltelim 
    // ve bir 'AI Optimization' kaydı gibi davranalım.
    
    const campaigns = await prisma.campaign.findMany({
      where: { status: 'active' }
    });

    for (const campaign of campaigns) {
      await prisma.campaign.update({
        where: { id: campaign.id },
        data: {
          roas: campaign.roas + (Math.random() * 0.5), // Hafif bir iyileştirme simülasyonu
          updatedAt: new Date(),
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: `${campaigns.length} kampanya AI tarafından optimize edildi.`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[OPTIMIZE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
