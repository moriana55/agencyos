export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Cleanup old demo data
    const existingClients = await prisma.client.findMany({ where: { userId } });
    for (const c of existingClients) {
      await prisma.post.deleteMany({ where: { clientId: c.id } });
      await prisma.campaign.deleteMany({ where: { clientId: c.id } });
      await prisma.appointment.deleteMany({ where: { clientId: c.id } });
    }
    await prisma.client.deleteMany({ where: { userId } });
    await prisma.integration.deleteMany({ where: { userId } });

    // Clients
    const clients = await Promise.all([
      prisma.client.create({ data: { name: 'Aura Güzellik Merkezi', sector: 'Güzellik & Bakım', userId, status: 'active' } }),
      prisma.client.create({ data: { name: 'Bella Moda', sector: 'E-Ticaret / Moda', userId, status: 'active' } }),
      prisma.client.create({ data: { name: 'Hırdavat Pro', sector: 'B2B / Endüstriyel', userId, status: 'active' } }),
      prisma.client.create({ data: { name: 'FitZone Spor', sector: 'Spor & Sağlık', userId, status: 'active' } }),
      prisma.client.create({ data: { name: 'Lezzet Durağı', sector: 'Restoran / F&B', userId, status: 'active' } }),
    ]);

    const [aura, bella, hirdavat, fitzone, lezzet] = clients;

    // Campaigns
    await prisma.campaign.createMany({
      data: [
        { name: 'Cilt Bakımı Awareness', platform: 'Meta', budget: 12000, spend: 8400, roas: 5.2, clicks: 3200, clientId: aura.id, status: 'active' },
        { name: 'Lazer Epilasyon Lead Gen', platform: 'Meta', budget: 8000, spend: 6100, roas: 6.8, clicks: 2100, clientId: aura.id, status: 'active' },
        { name: 'Google Search - Güzellik', platform: 'Google', budget: 5000, spend: 3200, roas: 4.1, clicks: 1800, clientId: aura.id, status: 'active' },
        { name: 'Yaz Koleksiyonu Tanıtım', platform: 'Meta', budget: 20000, spend: 14500, roas: 4.5, clicks: 5600, clientId: bella.id, status: 'active' },
        { name: 'Retargeting - Sepet Terk', platform: 'Meta', budget: 6000, spend: 4800, roas: 7.2, clicks: 1900, clientId: bella.id, status: 'active' },
        { name: 'Google Shopping', platform: 'Google', budget: 10000, spend: 7200, roas: 3.8, clicks: 4200, clientId: bella.id, status: 'active' },
        { name: 'TikTok Influencer Collab', platform: 'TikTok', budget: 8000, spend: 5500, roas: 3.2, clicks: 8400, clientId: bella.id, status: 'active' },
        { name: 'B2B Lead Campaign', platform: 'Google', budget: 15000, spend: 9800, roas: 3.9, clicks: 2400, clientId: hirdavat.id, status: 'active' },
        { name: 'LinkedIn Ads', platform: 'Meta', budget: 5000, spend: 3200, roas: 2.8, clicks: 890, clientId: hirdavat.id, status: 'active' },
        { name: 'Yeni Üye Kampanyası', platform: 'Meta', budget: 7000, spend: 4600, roas: 5.5, clicks: 2800, clientId: fitzone.id, status: 'active' },
        { name: 'Google Local - Spor Salonu', platform: 'Google', budget: 3000, spend: 1800, roas: 4.2, clicks: 950, clientId: fitzone.id, status: 'active' },
        { name: 'Online Sipariş Ads', platform: 'Meta', budget: 4000, spend: 2900, roas: 6.1, clicks: 1600, clientId: lezzet.id, status: 'active' },
        { name: 'Google Maps Boost', platform: 'Google', budget: 2000, spend: 1400, roas: 5.8, clicks: 720, clientId: lezzet.id, status: 'active' },
      ]
    });

    // Posts
    const now = Date.now();
    await prisma.post.createMany({
      data: [
        { title: 'Cilt Bakım Rutin Videosu', caption: 'Günlük cilt bakım rutininizi 3 adımda tamamlayın! 🧴✨ #ciltbakımı #skincare', platforms: 'instagram,tiktok', status: 'published', scheduledAt: new Date(now - 86400000), clientId: aura.id },
        { title: 'Lazer Epilasyon Bilgilendirme', caption: 'Yaz öncesi lazer epilasyon hakkında bilmeniz gereken 5 şey. Randevu için DM!', platforms: 'instagram,facebook', status: 'published', scheduledAt: new Date(now - 172800000), clientId: aura.id },
        { title: 'Mayıs Kampanyası Duyuru', caption: 'Tüm cilt bakım paketlerinde %30 indirim! Son 5 gün ⏰', platforms: 'instagram,facebook,tiktok', status: 'scheduled', scheduledAt: new Date(now + 86400000), clientId: aura.id },
        { title: 'Yeni Sezon Lookbook', caption: 'Yaz 2026 koleksiyonu mağazalarda! İlk 100 siparişe özel hediye 🎁', platforms: 'instagram,tiktok', status: 'published', scheduledAt: new Date(now - 259200000), clientId: bella.id },
        { title: 'Kombin Önerisi Reels', caption: 'Ofiste şıklık: 3 farklı kombin önerisi #moda #style', platforms: 'instagram,tiktok', status: 'scheduled', scheduledAt: new Date(now + 172800000), clientId: bella.id },
        { title: 'Flash Sale Announcement', caption: '⚡ 24 saat geçerli flash sale! Tüm ürünlerde %40 indirim', platforms: 'instagram,facebook', status: 'draft', clientId: bella.id },
        { title: 'Ürün Tanıtım - CNC Freze', caption: 'Yeni CNC freze uçları stokta! Toplu alım için DM.', platforms: 'instagram,linkedin', status: 'published', scheduledAt: new Date(now - 345600000), clientId: hirdavat.id },
        { title: 'Endüstriyel Çözümler Video', caption: 'Metal kesim çözümlerinde 15 yıllık tecrübe. B2B fiyat listesi için iletişime geçin.', platforms: 'linkedin', status: 'scheduled', scheduledAt: new Date(now + 259200000), clientId: hirdavat.id },
        { title: 'Antrenman Motivasyon', caption: 'Pazartesi motivasyonu burada! 💪 Bu hafta hedefin ne? #fitness #spor', platforms: 'instagram,tiktok', status: 'published', scheduledAt: new Date(now - 86400000), clientId: fitzone.id },
        { title: 'Yeni Ders Programı', caption: 'Haziran ders programı yayında! Pilates, CrossFit, Yoga... Hepsi tek çatı altında 🏋️', platforms: 'instagram,facebook', status: 'scheduled', scheduledAt: new Date(now + 345600000), clientId: fitzone.id },
        { title: 'Burger Günü!', caption: 'Her Salı burger menülerde %25 indirim! 🍔 Online sipariş: link in bio', platforms: 'instagram,tiktok', status: 'published', scheduledAt: new Date(now - 172800000), clientId: lezzet.id },
        { title: 'Yeni Menü Lansmanı', caption: 'Yaz menümüz hazır! Taze salata bowllar ve smoothie çeşitleri seni bekliyor 🥗', platforms: 'instagram,facebook,tiktok', status: 'draft', clientId: lezzet.id },
      ]
    });

    // Appointments
    await prisma.appointment.createMany({
      data: [
        { clientName: 'Aura Güzellik - Aylık Değerlendirme', service: 'Performans Toplantısı', date: new Date(now + 86400000 * 2), clientId: aura.id },
        { clientName: 'Bella Moda - Yaz Stratejisi', service: 'Strateji Toplantısı', date: new Date(now + 86400000 * 5), clientId: bella.id },
        { clientName: 'FitZone - İçerik Planlaması', service: 'Content Planning', date: new Date(now + 86400000 * 3), clientId: fitzone.id },
        { clientName: 'Hırdavat Pro - Q3 Bütçe', service: 'Bütçe Toplantısı', date: new Date(now + 86400000 * 7), clientId: hirdavat.id },
      ]
    });

    // Integrations
    await prisma.integration.createMany({
      data: [
        { platform: 'meta', userId, status: 'connected', lastSync: new Date() },
        { platform: 'google', userId, status: 'connected', lastSync: new Date(now - 3600000) },
        { platform: 'whatsapp', userId, status: 'not_connected' },
        { platform: 'tiktok', userId, status: 'not_connected' },
      ]
    });

    // Knowledge base
    await prisma.agencyKnowledge.upsert({
      where: { userId },
      update: { content: seedKnowledge },
      create: { userId, content: seedKnowledge },
    });

    return NextResponse.json({
      success: true,
      summary: {
        clients: 5,
        campaigns: 13,
        posts: 12,
        appointments: 4,
        integrations: 4,
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Seed failed', details: String(error) }, { status: 500 });
  }
}

const seedKnowledge = `# Ajans Bilgi Havuzu

## Genel Kurallar
- Müşterilere her zaman profesyonel ve samimi yaklaş
- Fiyat bilgisi DM'den verilmez, "Size özel fiyat için randevu alalım" de
- Rakip marka karşılaştırması yapma
- Her müşteriye özel ton kullan (Aura: lüks/zarif, Bella: genç/enerjik, Hırdavat: teknik/profesyonel)

## Fiyatlandırma
- Aylık sosyal medya yönetimi: ₺7,500 - ₺15,000
- Reklam yönetimi komisyonu: Harcamanın %15'i
- İçerik üretimi (aylık 20 post): ₺5,000
- Tek seferlik strateji raporu: ₺3,000

## Sık Sorulan
- "Ne kadar sürede sonuç alırız?" → İlk sonuçlar 2-4 hafta, optimum performans 2-3 ay
- "Garanti var mı?" → Performans garantisi vermiyoruz ama KPI hedefleri koyuyoruz
- "Hangi platformlarda çalışıyorsunuz?" → Meta (IG+FB), Google Ads, TikTok, LinkedIn
`;
