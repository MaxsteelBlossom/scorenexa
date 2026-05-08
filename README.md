# ScoreNexa ⚽

**Real-Time Sports Intelligence** — A full-stack football media platform built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

---

## 🚀 Quick Start (Local Deploy)

### 1. Install Dependencies
```bash
cd scorenexa
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env.local
```
Open `.env.local` and fill in your values (see Setup Guide below).

### 3. Set Up Supabase Database
1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the entire contents of `supabase/schema.sql`
3. Copy your Project URL and API keys into `.env.local`

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 5. Make Yourself Admin
After signing up on the site, run this in Supabase SQL Editor:
```sql
UPDATE public.profiles SET is_admin = true
WHERE id = (SELECT id FROM auth.users WHERE email = 'your@email.com');
```
Then go to [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📋 Setup Guide

### Supabase (Required)
1. Go to [supabase.com](https://supabase.com) → New Project
2. SQL Editor → paste & run `supabase/schema.sql`
3. Settings → API → copy `URL`, `anon key`, `service_role key`
4. Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
SUPABASE_SERVICE_ROLE_KEY=eyJhb...
```

### Sports API (Optional — mock data works without it)
1. Sign up at [api-sports.io](https://api-sports.io) (free tier: 100 calls/day)
2. Add to `.env.local`:
```
SPORTS_PROVIDER=api-football
API_FOOTBALL_KEY=your_key_here
```
Without a key, the site uses realistic mock data automatically.

### Google AdSense (For Monetisation)
1. Apply at [google.com/adsense](https://google.com/adsense)
2. Once approved, add to `.env.local`:
```
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXXX
```
3. AdSense script loads automatically. Ad slots are pre-placed across the site.

### Google Analytics (Optional)
```
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 📁 Project Structure

```
scorenexa/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── news/page.tsx             # News listing
│   ├── transfer-news/page.tsx    # Transfer news
│   ├── gossip/page.tsx           # Gossip column
│   ├── live-scores/page.tsx      # Live scores
│   ├── fixtures/page.tsx         # Fixtures
│   ├── tables/page.tsx           # League tables
│   ├── leagues/                  # Leagues + [slug]
│   ├── teams/                    # Teams + [slug]
│   ├── article/[slug]/           # Article detail
│   ├── search/page.tsx           # Search
│   ├── premium/page.tsx          # Premium upsell
│   ├── login/page.tsx            # Login
│   ├── register/page.tsx         # Register
│   ├── admin/                    # Admin dashboard
│   │   ├── page.tsx              # Dashboard overview
│   │   ├── articles/             # Articles CMS
│   │   │   ├── page.tsx          # Articles list
│   │   │   └── new/page.tsx      # Article editor
│   │   ├── categories/           # Category manager
│   │   ├── teams/                # Teams manager
│   │   ├── leagues/              # Leagues manager
│   │   ├── media/                # Media library
│   │   ├── ads/                  # Ad slot manager
│   │   ├── users/                # User manager
│   │   └── settings/             # Site settings
│   ├── api/                      # API routes
│   │   ├── sports/live/          # Live scores API
│   │   ├── sports/fixtures/      # Fixtures API
│   │   ├── sports/standings/     # Standings API
│   │   ├── newsletter/           # Newsletter subscribe
│   │   └── admin/articles/       # Admin articles CRUD
│   ├── sitemap.ts                # Auto-generated sitemap
│   └── robots.ts                 # Robots.txt
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Sticky nav with search
│   │   ├── Footer.tsx            # Full footer
│   │   └── ScoreTicker.tsx       # Live score ticker bar
│   ├── ui/
│   │   ├── AdSlot.tsx            # AdSense-ready ad component
│   │   └── ArticleCard.tsx       # Multi-size article cards
│   ├── scores/
│   │   └── LiveScoreCard.tsx     # Live match card
│   └── home/
│       └── StandingsWidget.tsx   # League table widget
├── lib/
│   ├── sports/adapter.ts         # Sports API adapter (multi-provider)
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client
│   │   ├── server.ts             # Server Supabase client
│   │   └── database.types.ts     # TypeScript DB types
│   └── utils.ts                  # Utility functions
├── supabase/
│   └── schema.sql                # Complete DB schema
├── public/
│   ├── favicon.svg
│   └── manifest.json
├── .env.local                    # Your secrets (git-ignored)
├── .env.example                  # Template for .env.local
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🏗️ Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# Project → Settings → Environment Variables
# Add all variables from .env.local
```

Or connect your GitHub repo to Vercel for automatic deployments.

---

## 💰 AdSense Approval Tips

To maximise your chances of AdSense approval:

1. **Publish at least 15–20 original articles** before applying
2. **All legal pages are included**: Privacy Policy, Terms, About, Contact, Editorial Policy
3. **No placeholder content** — replace all mock articles with real ones
4. **Fast loading** — the site is already optimised for Core Web Vitals
5. **Custom domain** — scorenexa.com or similar (not .vercel.app)
6. **Submit sitemap** to Google Search Console first
7. Apply at [google.com/adsense](https://google.com/adsense) once you have real content

---

## ⚡ Connect Your Domain

1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In Vercel: Project → Settings → Domains → Add your domain
3. Update your DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_SITE_URL` in environment variables

---

## 🔌 Sports API Providers Supported

| Provider | Free Tier | Notes |
|----------|-----------|-------|
| `api-football` | 100 calls/day | Best coverage, recommended |
| `football-data.org` | 10 calls/min | Good for European leagues |
| `thesportsdb` | Free | Basic data |
| `mock` | Unlimited | Dev/testing only |

Set `SPORTS_PROVIDER=api-football` in `.env.local` and add your key.

---

## 🔮 Next Steps

- [ ] Add Stripe for Premium subscriptions
- [ ] Connect Supabase Storage for image uploads
- [ ] Set up email newsletter (Resend / SendGrid)
- [ ] Enable Supabase Auth providers (Google, etc.)
- [ ] Add push notifications
- [ ] Build mobile app (React Native / Expo)

---

Built by **SyntaxForgeScriptHorizon** · ScoreNexa © 2025
