# 🚀 AgencyOS - Production Deployment Guide (VPS)

Hayırlı olsun kanka! VPS'i aldın, şimdi bu canavarı canlıya alma vakti. İşte adım adım yapman gerekenler:

## 1. Veri Tabanı Hazırlığı (Postgres)
Şu an SQLite kullanıyoruz ama canlıda **Postgres** (Neon.tech veya Supabase öneririm) kullanmalısın.
- `.env` dosyandaki `DATABASE_URL` kısmına Postgres bağlantı adresini yapıştır.
- Terminalde şu komutu çalıştırarak tabloları oluştur:
  ```bash
  npx prisma db push
  ```

## 2. Environment Variables (.env)
VPS'te şu değişkenlerin mutlaka ayarlı olduğundan emin ol:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
DATABASE_URL="postgresql://user:password@host:port/db"
NEXT_PUBLIC_APP_URL="https://ajansinadresi.com"
```

## 3. Kurulum ve Başlatma
Sunucuna bağlandığında şu komutlarla sistemi ayağa kaldır:
```bash
npm install
npm run build
npm run start
```
*(Eğer sistemin sürekli açık kalmasını istiyorsan `pm2` kullanmanı öneririm: `pm2 start npm --name "agency-os" -- start`)*

## 4. Kritik Modüller
- **Takvim:** Drive'dan içerik çekme şu an görsel simülasyon, gerçek Google API keylerini `api/knowledge` kısmından ileride bağlayabiliriz.
- **Reklam:** Kampanyalar artık veri tabanına (`budget` ve `spend` olarak) kaydediliyor.
- **AI Sosyal:** Bilgi bankası verileri VPS'teki Postgres'e kaydedilecek, böylece AI her zaman markanı tanıyacak.

Bol şans kanka, ajansın yeni dönemi hayırlı olsun! 🦾🚀🔥
