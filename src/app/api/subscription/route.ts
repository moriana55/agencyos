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

    const subscription = await prisma.subscription.findUnique({
      where: { userId }
    });

    return NextResponse.json({ subscription: subscription || { plan: 'free' } });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { plan, billingCycle } = body;

    const subscription = await prisma.subscription.upsert({
      where: { userId },
      update: {
        plan,
        billingCycle,
        updatedAt: new Date()
      },
      create: {
        userId,
        plan,
        billingCycle,
        status: 'active'
      }
    });

    return NextResponse.json({ subscription });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
