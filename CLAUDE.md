# AgencyOS — Teknik Mimari & Proje Belgeleri

## Proje
Sosyal medya ajansları için AI destekli multi-tenant SaaS platform.
`~/Desktop/agency-os` — Next.js 16, Tailwind v4, TypeScript.
Büşra (reklam yöneticisi, müşteri getirir) + Yiğit (teknik) ortaklığı.

## Tech Stack
| Katman | Araç |
|--------|------|
| Frontend | Next.js 16 + Tailwind v4 + Framer Motion |
| Auth | Clerk (Organizations = Ajans) — `@clerk/nextjs/legacy` hooks kullanılıyor |
| DB | Neon (Serverless PostgreSQL) — `@neondatabase/serverless` |
| Otomasyon | n8n Cloud (self-host'a taşınacak) |
| İçerik yayınlama | Ayrshare API |
| WhatsApp | WATI |
| Instagram DM | Manychat |
| Ödeme | Iyzico |
| Deploy | Vercel Pro |

## BSP Mimarisi (Neden direkt API değil)
Meta onay süreci haftalarca sürer, ban riski yüksek. BSP'ler Meta Partner:
- **Ayrshare** → IG/TikTok/FB/LinkedIn içerik yayınlama ($99/ay, 10 profil)
- **WATI** → WhatsApp otomasyonu ($39/ay, Growth plan)
- **Manychat** → Instagram DM + yorum otomasyonu ($45+/ay)
- **Meta Marketing API direkt** → Ads optimizasyonu (Büşra zaten partner)

## Dosya Yapısı
```
src/
├── app/
│   ├── (auth)/login/[[...rest]]/   # Clerk <SignIn /> bileşeni
│   ├── (auth)/signup/[[...rest]]/  # Clerk <SignUp /> bileşeni
│   └── (dashboard)/
│       ├── panel/      # Ana dashboard (mock data)
│       ├── reklam/     # Meta Ads — placeholder
│       ├── takvim/     # İçerik takvimi + Ayrshare yayınlama ✅
│       ├── analizler/  # Raporlar — placeholder
│       ├── musteriler/ # Müşteri CRUD (Neon DB) ✅
│       ├── ai-sosyal/  # DM/yorum otomasyonu — placeholder
│       └── ayarlar/    # Ayrshare key + ajans ayarları ✅
├── components/
│   ├── Sidebar.tsx     # Clerk logout, aktif link, profil
│   └── TopNav.tsx      # Gerçek kullanıcı adı/ajans
├── lib/
│   ├── db.ts           # Neon SQL client
│   └── agency.ts       # DB helper: getOrCreateAgency, getClients vs.
└── middleware.ts        # Clerk route koruması (deprecated → proxy.ts olacak)
```

## API Route'ları
| Route | Method | İşlev |
|-------|--------|-------|
| `/api/clients` | GET/POST/PATCH/DELETE | Müşteri CRUD |
| `/api/agency` | PATCH | Ajans adı + Ayrshare key kaydet |
| `/api/posts` | GET/POST/DELETE | İçerik takvimi CRUD |
| `/api/ayrshare/test` | GET | Ayrshare bağlantı testi |
| `/api/ayrshare/publish` | POST | Post'u Ayrshare ile yayınla |

## Neon DB Şeması
```
agencies (id, clerk_id, name, plan, ayrshare_key, created_at)
clients (id, agency_id, name, industry, logo_url, status, created_at)
social_accounts (id, client_id, platform, platform_username, ayrshare_profile, profile_key)
content_posts (id, client_id, agency_id, title, caption, media_urls, platforms,
               scheduled_at, published_at, status, ayrshare_post_id, created_at)
```

## Clerk Notları
- `@clerk/nextjs/legacy` — `useSignIn`/`useSignUp` hooks (yeni Signals API çok farklı)
- Auth sayfaları `[[...rest]]` catch-all route gerektirir
- Dashboard layout'ta `auth()` + `currentUser()` server-side
- Ajans adı `user.unsafeMetadata.agency_name`'den geliyor
- Organizations aktif (Clerk Dashboard'da) — ileride ajans yönetimi için

## Sprint Durumu
| Sprint | Kapsam | Durum |
|--------|--------|-------|
| S1 | Auth shell + dashboard UI | ✅ |
| S2 | Clerk + Neon entegrasyonu | ✅ |
| S3 | Müşteri CRUD + Ayrshare + İçerik takvimi | ✅ |
| S4 | Meta Ads optimizasyonu (n8n) | ⏳ (Frontend ✅) |
| S5 | Manychat + WATI DM/yorum otomasyonu | ⏳ (Frontend ✅) |
| S6 | Raporlama | ⏳ (Frontend ✅) |
| S7 | Iyzico ödeme + abonelik | ⏳ |
| S8 | Google Ads + SEO | ⏳ |
| S9 | B2B/B2C fiyatlandırma | ⏳ |

## Aylık Maliyet (MVP)
| Servis | Ücret |
|--------|-------|
| Vercel Pro | $20 |
| Neon | $0 (free tier) |
| Clerk | $0 (free tier, 10k MAU'ya kadar) |
| n8n (self-host Hetzner) | ~€10 |
| Ayrshare Business | $99 |
| WATI Growth | $39 |
| Manychat | $45+ |
| OpenAI | ~$20-40 |
| **Toplam** | **~$233-263/ay** |

Not: n8n Cloud ($50) yerine Hetzner VPS + Coolify ile self-host öneriliyor.

## Önemli Teknik Notlar
- `middleware.ts` deprecated → Next.js 16'da `proxy.ts` olmalı ama Clerk henüz desteklemiyor, uyarı normal
- Auth sayfaları custom UI değil, Clerk'in `<SignIn />`/`<SignUp />` bileşenleri (appearance prop ile stillendirilmiş)
- `window.location.href` kullanılıyor router.push yerine — session cookie'nin server'a iletilmesi için
- Ayrshare'de her müşteri için ayrı "Profile" oluşturulmalı, OAuth ile müşteri kendi hesabını bağlar
