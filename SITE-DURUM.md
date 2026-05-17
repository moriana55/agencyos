# AgencyOS — Yayın Öncesi Eksik Raporu

Son güncelleme: 2026-05-17

## Mevcut Durum Özeti

Landing page + Clerk auth + Dashboard UI + Neon DB (Prisma 7) + API routes. Temel yapı oturmuş, çoğu sayfa UI tamamlanmış ama gerçek entegrasyonlar bağlı değil.

## Sayfalar & Durumları

| Sayfa | Durum | Açıklama |
|-------|-------|----------|
| Landing `/` | ✅ Tam | Navbar, hero, features, pricing, CTA |
| Login/Signup | ✅ Tam | Clerk SignIn/SignUp bileşenleri |
| Panel (Dashboard) | ⚠️ Kısmi | UI tam, `/api/stats` gerçek veri çekiyor ama feed mock |
| Müşteriler | ✅ Tam | CRUD + detay sayfası, DB'den okuma/yazma |
| İçerik Takvimi | ✅ Tam | Post CRUD, Ayrshare publish, durum takibi |
| Reklam | ⚠️ Kısmi | Kampanya listesi DB'den, ama "Yeni Kampanya" modal boş (form çalışmıyor) |
| AI Sosyal | ⚠️ Kısmi | Randevular DB'den çalışıyor, Bilgi Havuzu kaydediyor, AI Simülatör mock (setTimeout) |
| Analizler | ❌ Mock | Tamamen hardcoded data, hiçbir gerçek veri yok |
| Entegrasyonlar | ⚠️ Kısmi | API key kayıt çalışıyor ama gerçek OAuth/doğrulama yok |
| Abonelik | ⚠️ Kısmi | Plan seçimi DB'ye kaydediliyor ama Iyzico bağlı değil (ödeme almıyor) |
| Ayarlar | ❌ Mock | UI güzel ama hiçbir kaydet işlemi gerçek API'ye bağlı değil |
| Rapor `/rapor/[id]` | ❌ Mock | Tamamen hardcoded chart data |

## Kritik Eksikler (Yayın için şart)

| # | Eksik | Detay | Efor |
|---|-------|-------|------|
| 1 | **Iyzico ödeme entegrasyonu** | Abonelik planı seçilince gerçek ödeme alınmıyor. Checkout flow + webhook gerekli | Büyük |
| 2 | **Reklam kampanya CRUD** | Modal açılıyor ama form boş, submit yok. Kampanya ekleme/düzenleme/silme | Orta |
| 3 | **Ayarlar → DB kayıt** | Profil/ajans/bildirim/güvenlik/branding ayarları localStorage değil DB'ye yazmalı | Orta |
| 4 | **AI Simülatör → Gerçek AI** | Şu an setTimeout ile fake yanıt. OpenAI API bağlantısı gerekli | Orta |
| 5 | **Analizler → Gerçek data** | Hardcoded değil, kampanya + post verilerinden aggregate | Orta |
| 6 | **Meta Ads API bağlantısı** | Reklam sayfası var ama Meta Marketing API'den gerçek veri çekmiyor | Büyük |
| 7 | **Ayrshare OAuth flow** | Müşteri kendi sosyal hesabını bağlayabilmeli (şu an sadece key ile) | Büyük |
| 8 | **middleware.ts → uyumluluk** | Deprecated uyarısı var. Clerk Next.js 16 proxy desteği gelene kadar ignore edilebilir ama ideal değil | Küçük |
| 9 | **Rapor sayfası → gerçek veri** | `/rapor/[id]` tamamen mock, müşteriye gösterilecek white-label rapor olmalı | Orta |
| 10 | **Email bildirimleri** | Yeni lead, randevu onayı, abonelik değişikliği için email gitmeli | Orta |

## Önemli Ama Acil Olmayan

| # | Eksik | Detay |
|---|-------|-------|
| 11 | WATI (WhatsApp) entegrasyonu | AI Sosyal'da mesaj yanıtlama — şu an sadece UI |
| 12 | Manychat (IG DM) entegrasyonu | Yorum/DM otomasyonu — şu an sadece UI |
| 13 | Google Ads API | Reklam sayfasında tab var ama bağlı değil |
| 14 | n8n workflow'ları | Otomasyon zinciri kurulmalı (ad optimization, posting, reporting) |
| 15 | Multi-tenant (Organizations) | Clerk Organizations aktif ama kullanılmıyor, tek kullanıcı modu |
| 16 | White-label rapor PDF export | Müşteriye gönderilecek branded PDF |
| 17 | Rate limiting | API route'larda rate limit yok |
| 18 | Error handling & toast | Hata durumlarında kullanıcıya bilgi eksik (çoğu yerde sadece console.error) |

## Çalışan Entegrasyonlar

| Entegrasyon | Durum |
|-------------|-------|
| Clerk Auth | ✅ Login/signup/logout/session çalışıyor |
| Neon DB (Prisma) | ✅ Tüm CRUD'lar çalışıyor |
| Ayrshare Publish | ✅ İçerik takviminden yayınlama çalışıyor (key girilmişse) |
| Ayrshare Test | ✅ Bağlantı testi çalışıyor |

## API Routes

| Route | Durum |
|-------|-------|
| `/api/clients` | ✅ GET/POST/PATCH/DELETE |
| `/api/posts` | ✅ GET/POST/DELETE |
| `/api/campaigns` | ✅ GET/POST |
| `/api/appointments` | ✅ GET/POST |
| `/api/knowledge` | ✅ GET/POST |
| `/api/integrations` | ✅ GET/POST |
| `/api/subscription` | ✅ GET/POST (DB kayıt, ödeme yok) |
| `/api/stats` | ✅ GET (gerçek count'lar) |
| `/api/ayrshare/publish` | ✅ POST |
| `/api/ayrshare/test` | ✅ GET |
| `/api/reklam/optimize` | ⚠️ Placeholder |
| `/api/search` | ✅ GET |
| `/api/agency` | ✅ PATCH |

## Env Değişkenleri (Gereken)

```
DATABASE_URL=           # Neon PostgreSQL (var)
CLERK_SECRET_KEY=       # Clerk (var, .env.local)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= # (var)
AYRSHARE_API_KEY=       # Ayrshare (ayarlardan girilir)
OPENAI_API_KEY=         # AI Simülatör için (eksik)
IYZICO_API_KEY=         # Ödeme için (eksik)
IYZICO_SECRET_KEY=      # Ödeme için (eksik)
META_APP_ID=            # Meta Ads API (eksik)
META_APP_SECRET=        # Meta Ads API (eksik)
```

## Yayına Alma Planı (Önerilen Sıra)

### Fase 1 — MVP Yayın (1-2 gün)
1. Reklam kampanya form'unu çalıştır (submit → DB)
2. Ayarlar'ı DB'ye bağla
3. Analizler'i gerçek veriden aggregate et
4. Error handling / toast notification ekle
5. Vercel'e deploy et (Neon + Clerk env'ler)

### Fase 2 — Ödeme + AI (3-5 gün)
6. Iyzico checkout flow (abonelik)
7. OpenAI API → AI Simülatör gerçek yanıt
8. Rapor sayfası gerçek data

### Fase 3 — Tam Entegrasyon (1-2 hafta)
9. Meta Ads API (kampanya verisi çekme)
10. Ayrshare OAuth (müşteri hesap bağlama)
11. n8n workflow setup
12. WATI + Manychat

## Teknik Notlar

- **Prisma 7** kullanılıyor, `prisma.config.ts` mevcut
- **dev.db** dosyası root'ta — SQLite dev DB'si, prod'da Neon kullanılacak
- Landing page public, dashboard Clerk korumalı
- Tüm UI Framer Motion ile animasyonlu, design language tutarlı
- Recharts grafik kütüphanesi kullanılıyor
