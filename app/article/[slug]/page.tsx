import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AdSlot from '@/components/ui/AdSlot'
import { Clock, Eye, Share2, ChevronRight, Twitter, Facebook } from 'lucide-react'

async function getArticle(slug: string) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return null
    const res = await fetch(
      `${url}/rest/v1/articles?slug=eq.${slug}&status=eq.published&limit=1`,
      { headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }, next: { revalidate: 300 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data[0] || null
  } catch { return null }
}

async function getRelated(categoryName: string, excludeSlug: string) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return []
    const res = await fetch(
      `${url}/rest/v1/articles?status=eq.published&category_name=eq.${encodeURIComponent(categoryName)}&slug=neq.${excludeSlug}&order=published_at.desc&limit=3`,
      { headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }, next: { revalidate: 300 } }
    )
    if (!res.ok) return []
    return await res.json()
  } catch { return [] }
}

async function getLatest(excludeSlug: string) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return []
    const res = await fetch(
      `${url}/rest/v1/articles?status=eq.published&slug=neq.${excludeSlug}&order=published_at.desc&limit=5`,
      { headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }, next: { revalidate: 300 } }
    )
    if (!res.ok) return []
    return await res.json()
  } catch { return [] }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug)
  if (!article) return { title: 'Article Not Found | ScoreNexa' }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scorenexa.com'
  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt || '',
    openGraph: {
      title: article.title,
      description: article.seo_description || article.excerpt || '',
      type: 'article',
      publishedTime: article.published_at || '',
      modifiedTime: article.updated_at || '',
      authors: article.author_name ? [article.author_name] : ['ScoreNexa'],
      images: article.featured_image
        ? [{ url: article.featured_image, width: 1200, height: 630, alt: article.title }]
        : [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.seo_description || article.excerpt || '',
      images: article.featured_image ? [article.featured_image] : [],
    },
    alternates: { canonical: `${siteUrl}/article/${article.slug}` },
  }
}

const categoryColors: Record<string, string> = {
  'News': 'bg-blue-600',
  'Transfer News': 'bg-purple-600',
  'Gossip': 'bg-orange-500',
  'Match Report': 'bg-emerald-600',
  'Opinion': 'bg-slate-600',
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const [related, latest] = await Promise.all([
    getRelated(article.category_name || 'News', params.slug),
    getLatest(params.slug),
  ])

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scorenexa.com'
  const articleUrl = `${siteUrl}/article/${article.slug}`
  const catColor = categoryColors[article.category_name] || 'bg-blue-600'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt || '',
    datePublished: article.published_at,
    dateModified: article.updated_at || article.published_at,
    author: { '@type': 'Person', name: article.author_name || 'ScoreNexa Staff' },
    publisher: {
      '@type': 'Organization',
      name: 'ScoreNexa',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/favicon.svg` }
    },
    image: article.featured_image ? [article.featured_image] : [],
    keywords: Array.isArray(article.tags) ? article.tags.join(', ') : '',
    url: articleUrl,
  }

  const readTime = Math.max(1, Math.ceil(
    (article.content || '').replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length / 200
  ))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
      <div className="bg-[#f8f9fc] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#E63946] transition-colors">Home</Link>
            <ChevronRight size={12}/>
            <Link href="/news" className="hover:text-[#E63946] transition-colors">News</Link>
            {article.category_name && (
              <>
                <ChevronRight size={12}/>
                <Link href={`/news?cat=${encodeURIComponent(article.category_name)}`}
                  className="hover:text-[#E63946] transition-colors">{article.category_name}</Link>
              </>
            )}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main article */}
            <article className="lg:col-span-2">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">

                {/* Category + Breaking badge */}
                <div className="px-6 pt-6 pb-0">
                  <div className="flex items-center gap-2 mb-4">
                    {article.is_breaking && (
                      <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full animate-pulse uppercase tracking-wider">
                        🔴 Breaking
                      </span>
                    )}
                    {article.category_name && (
                      <span className={`${catColor} text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider`}>
                        {article.category_name}
                      </span>
                    )}
                  </div>

                  {/* Headline */}
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-4"
                    style={{fontFamily:'Oswald,sans-serif'}}>
                    {article.title}
                  </h1>

                  {/* Excerpt / standfirst */}
                  {article.excerpt && (
                    <p className="text-lg text-slate-600 leading-relaxed mb-5 border-l-4 border-[#E63946] pl-4 italic font-medium">
                      {article.excerpt}
                    </p>
                  )}

                  {/* Author + meta bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b border-slate-100 mb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E63946] to-red-700 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                        {(article.author_name || 'S')[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{article.author_name || 'ScoreNexa Staff'}</p>
                        <p className="text-xs text-slate-400">ScoreNexa Editorial Team</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12}/>
                        {article.published_at
                          ? new Date(article.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                          : 'Recently'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Eye size={12}/>
                        {readTime} min read
                      </span>
                      {article.views > 0 && (
                        <span>{article.views.toLocaleString()} views</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Featured image */}
                {article.featured_image && (
                  <div className="mx-6 mt-5">
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full rounded-xl object-cover"
                      style={{maxHeight:'480px'}}
                    />
                  </div>
                )}

                {/* Top in-article ad */}
                <div className="mx-6 mt-5">
                  <AdSlot position="in-article"/>
                </div>

                {/* Article body */}
                <div className="px-6 pt-5 pb-6">
                  <div
                    className="article-body"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  {/* Tags */}
                  {Array.isArray(article.tags) && article.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag: string) => (
                          <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`}
                            className="bg-slate-100 hover:bg-[#E63946] hover:text-white text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full transition-all">
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Share buttons */}
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <p className="text-sm font-black text-slate-600 mb-3 flex items-center gap-2">
                      <Share2 size={14}/> SHARE THIS STORY
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}&via=scorenexa`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-black hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all">
                        𝕏 Share on X
                      </a>
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all">
                        Share on Facebook
                      </a>
                      <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + articleUrl)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all">
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom ad */}
                <div className="px-6 pb-6">
                  <AdSlot position="in-article"/>
                </div>
              </div>

              {/* Related articles */}
              {related.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2"
                    style={{fontFamily:'Oswald,sans-serif'}}>
                    <span className="w-1 h-6 bg-[#E63946] rounded-full"/>
                    RELATED STORIES
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {related.map((r: any) => (
                      <Link key={r.id} href={`/article/${r.slug}`}
                        className="bg-white rounded-xl border border-slate-100 hover:border-[#E63946]/30 hover:shadow-md transition-all group overflow-hidden">
                        {r.featured_image && (
                          <img src={r.featured_image} alt={r.title}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"/>
                        )}
                        <div className="p-4">
                          {r.category_name && (
                            <span className="text-[10px] text-[#E63946] font-black uppercase tracking-wider">{r.category_name}</span>
                          )}
                          <h3 className="text-sm font-black text-slate-800 group-hover:text-[#E63946] mt-1 leading-snug transition-colors line-clamp-3"
                            style={{fontFamily:'Oswald,sans-serif'}}>
                            {r.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-2">
                            {r.published_at ? new Date(r.published_at).toLocaleDateString('en-GB', {day:'numeric',month:'short'}) : ''}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <AdSlot position="sidebar"/>

              {/* Latest articles */}
              {latest.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-[#0D1117] to-slate-800 px-4 py-3">
                    <h3 className="text-white font-black text-sm" style={{fontFamily:'Oswald,sans-serif'}}>
                      LATEST NEWS
                    </h3>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {latest.map((a: any) => (
                      <Link key={a.id} href={`/article/${a.slug}`}
                        className="flex gap-3 p-3 hover:bg-slate-50 transition-colors group">
                        {a.featured_image ? (
                          <img src={a.featured_image} alt={a.title}
                            className="w-16 h-14 object-cover rounded-lg flex-shrink-0"/>
                        ) : (
                          <div className="w-16 h-14 bg-gradient-to-br from-[#0D1117] to-slate-700 rounded-lg flex-shrink-0 flex items-center justify-center text-xl">⚽</div>
                        )}
                        <div className="flex-1 min-w-0">
                          {a.category_name && (
                            <span className="text-[10px] text-[#E63946] font-black uppercase">{a.category_name}</span>
                          )}
                          <p className="text-xs font-bold text-slate-800 group-hover:text-[#E63946] transition-colors line-clamp-2 leading-snug mt-0.5">
                            {a.title}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            {a.published_at ? new Date(a.published_at).toLocaleDateString('en-GB',{day:'numeric',month:'short'}) : ''}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="p-3 border-t border-slate-100">
                    <Link href="/news" className="block text-center text-xs font-black text-[#E63946] hover:underline">
                      VIEW ALL NEWS →
                    </Link>
                  </div>
                </div>
              )}

              {/* Newsletter signup */}
              <div className="bg-gradient-to-br from-[#0D1117] to-[#1a1f2e] rounded-2xl p-5 text-white">
                <h3 className="font-black text-base mb-1" style={{fontFamily:'Oswald,sans-serif'}}>📧 DAILY DIGEST</h3>
                <p className="text-slate-400 text-sm mb-4">Get the biggest football stories to your inbox daily.</p>
                <form action="/api/newsletter" method="POST" className="space-y-2">
                  <input type="email" name="email" required placeholder="your@email.com"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
                  <button type="submit"
                    className="w-full bg-[#E63946] hover:bg-[#c0303c] text-white font-black py-2.5 rounded-xl text-sm transition-all"
                    style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
                    SUBSCRIBE FREE
                  </button>
                </form>
                <p className="text-slate-600 text-xs mt-2 text-center">No spam. Unsubscribe anytime.</p>
              </div>

              <AdSlot position="sidebar"/>

              {/* Betting tip promo */}
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="bg-[#E63946] px-4 py-3">
                  <h3 className="text-white font-black text-sm" style={{fontFamily:'Oswald,sans-serif'}}>🔮 TODAY'S TIPS</h3>
                </div>
                <div className="p-4 text-center">
                  <p className="text-slate-500 text-sm mb-3">Expert betting predictions updated daily</p>
                  <Link href="/betting/predictions"
                    className="inline-block bg-[#E63946] hover:bg-[#c0303c] text-white font-black px-5 py-2 rounded-xl text-sm transition-all"
                    style={{fontFamily:'Oswald,sans-serif'}}>
                    VIEW PREDICTIONS →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
