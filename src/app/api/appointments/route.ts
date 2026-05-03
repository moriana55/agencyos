export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const appointments = await prisma.appointment.findMany({
      where: { client: { userId } },
      include: { client: true },
      orderBy: { date: 'asc' }
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    return NextResponse.json({ error: 'Hata' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

    const body = await req.json();
    const { clientName, service, date, clientId } = body;

    const appointment = await prisma.appointment.create({
      data: {
        clientName,
        service,
        date: new Date(date),
        clientId
      }
    });

    return NextResponse.json({ appointment });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Hata' }, { status: 500 });
  }
}
