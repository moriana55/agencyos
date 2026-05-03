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

    const integrations = await prisma.integration.findMany({
      where: { userId }
    });

    return NextResponse.json({ integrations });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { platform, apiKey, apiSecret, status } = body;

    const integration = await prisma.integration.upsert({
      where: { 
        platform_userId: {
          platform,
          userId
        }
      },
      update: {
        apiKey,
        apiSecret,
        status,
        lastSync: new Date()
      },
      create: {
        platform,
        userId,
        apiKey,
        apiSecret,
        status,
        lastSync: new Date()
      }
    });

    return NextResponse.json({ integration });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
