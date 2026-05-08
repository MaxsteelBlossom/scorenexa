import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scorenexa.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    // Core - highest priority
    { url: SITE_URL, lastModified: now, changeFrequency: 'hourly', priority: 1.0 },
    { url: `${SITE_URL}/news`, lastModified: now, changeFrequency: 'hourly', priority: 0.95 },
    { url: `${SITE_URL}/live-scores`, lastModified: now, changeFrequency: 'always', priority: 0.95 },
    { url: `${SITE_URL}/transfer-news`, lastModified: now, changeFrequency: 'hourly', priority: 0.90 },
    { url: `${SITE_URL}/gossip`, lastModified: now, changeFrequency: 'hourly', priority: 0.85 },
    { url: `${SITE_URL}/fixtures`, lastModified: now, changeFrequency: 'hourly', priority: 0.85 },
    { url: `${SITE_URL}/tables`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },

    // Leagues
    { url: `${SITE_URL}/leagues`, lastModified: now, changeFrequency: 'weekly', priority: 0.80 },
    { url: `${SITE_URL}/leagues/premier-league`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${SITE_URL}/leagues/la-liga`, lastModified: now, changeFrequency: 'daily', priority: 0.82 },
    { url: `${SITE_URL}/leagues/champions-league`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${SITE_URL}/leagues/bundesliga`, lastModified: now, changeFrequency: 'daily', priority: 0.80 },
    { url: `${SITE_URL}/leagues/serie-a`, lastModified: now, changeFrequency: 'daily', priority: 0.80 },
    { url: `${SITE_URL}/leagues/ligue-1`, lastModified: now, changeFrequency: 'daily', priority: 0.78 },

    // Teams
    { url: `${SITE_URL}/teams`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },

    // Betting section - valuable for SEO
    { url: `${SITE_URL}/betting`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${SITE_URL}/betting/best-betting-sites`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/betting/predictions`, lastModified: now, changeFrequency: 'daily', priority: 0.88 },
    { url: `${SITE_URL}/betting/free-bets`, lastModified: now, changeFrequency: 'weekly', priority: 0.82 },
    { url: `${SITE_URL}/betting/bonus-offers`, lastModified: now, changeFrequency: 'weekly', priority: 0.80 },
    { url: `${SITE_URL}/betting/best-apps`, lastModified: now, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${SITE_URL}/betting/tips-today`, lastModified: now, changeFrequency: 'daily', priority: 0.88 },
    { url: `${SITE_URL}/betting/accumulators`, lastModified: now, changeFrequency: 'daily', priority: 0.82 },
    { url: `${SITE_URL}/betting/btts-tips`, lastModified: now, changeFrequency: 'daily', priority: 0.80 },
    { url: `${SITE_URL}/betting/glossary`, lastModified: now, changeFrequency: 'monthly', priority: 0.70 },
    { url: `${SITE_URL}/betting/guide-betway`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/betting/guide-hollywoodbets`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/betting/guide-betfred`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/betting/responsible-gambling`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },

    // User
    { url: `${SITE_URL}/search`, lastModified: now, changeFrequency: 'monthly', priority: 0.60 },
    { url: `${SITE_URL}/premium`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${SITE_URL}/login`, lastModified: now, changeFrequency: 'monthly', priority: 0.40 },
    { url: `${SITE_URL}/register`, lastModified: now, changeFrequency: 'monthly', priority: 0.45 },

    // Company
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.55 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.45 },
    { url: `${SITE_URL}/advertise-with-us`, lastModified: now, changeFrequency: 'monthly', priority: 0.45 },
    { url: `${SITE_URL}/editorial-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.40 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.40 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.38 },
    { url: `${SITE_URL}/dmca`, lastModified: now, changeFrequency: 'yearly', priority: 0.30 },
  ]

  // TODO: add dynamic article URLs from Supabase:
  // const { data: articles } = await supabase.from('articles').select('slug,updated_at').eq('status','published').limit(1000)
  // articles?.forEach(a => routes.push({ url: `${SITE_URL}/article/${a.slug}`, lastModified: new Date(a.updated_at), changeFrequency: 'weekly', priority: 0.75 }))

  return routes
}
