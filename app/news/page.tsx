import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ChevronRight, TrendingUp, Flame } from 'lucide-react'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Football News – Latest Stories, Breaking News & Analysis',
  description: 'The latest football news, breaking stories, transfer updates, match reports and expert analysis. Updated throughout the day by the ScoreNexa team.',
  keywords: ['football news', 'Premier League news', 'transfer news', 'football analysis', 'match reports'],
}

const CATEGORIES = [
  { label: 'All News', value: '', icon: '📰' },
  { label: 'News', value: 'News', icon: '⚽' },
  { label: 'Transfer News', value: 'Transfer News', icon: '💼' },
  { label: 'Gossip', value: 'Gossip', icon: '🔥' },
  { label: 'Match Reports', value: 'Match Report', icon: '📊' },
  { label: 'Opinion', value: 'Opinion', icon: '💬' },
]

async function getArticles(category?: string, limit = 20, offset = 0) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return []
    let endpoint = `${url}/rest/v1/articles?status=eq.published&order=published_at.desc&limit=${limit}&offset=${offset}`
    if (category) endpoint += `&category_name=eq.${encodeURIComponent(category)}`
    const res = await fetch(endpoint, {
      headers: { 'apikey': key, 'Authorization': `Bearer ${key}` },
      next: { revalidate: 60 }
    })
    if (!res.ok) return []
    return await res.json()
  } catch { return [] }
}

function timeAgo(dateStr: string) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

const catColor: Record<string, string> = {
  'News': 'bg-blue-600',
  'Transfer News': 'bg-purple-600',
  'Gossip': 'bg-orange-500',
  'Match Report': 'bg-emerald-600',
  'Opinion': 'bg-slate-600',
}

function ArticleCardLarge({ article }: { article: any }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block bg-white rounded-2xl border border-slate-100 hover:border-[#E63946]/30 hover:shadow-lg transition-all overflow-hidden">
      <div className="relative">
        {article.featured_image ? (
          <img src={article.featured_image} alt={article.title}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"/>
        ) : (
          <div className="w-full h-52 bg-gradient-to-br from-[#0D1117] to-slate-700 flex items-center justify-center text-5xl">⚽</div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {article.is_breaking && (
            <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-full animate-pulse">🔴 BREAKING</span>
          )}
          {article.category_name && (
            <span className={`${catColor[article.category_name] || 'bg-blue-600'} text-white text-[10px] font-black px-2 py-1 rounded-full`}>
              {article.category_name}
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-black text-slate-900 text-base leading-snug group-hover:text-[#E63946] transition-colors line-clamp-2 mb-2"
          style={{fontFamily:'Oswald,sans-serif'}}>
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-slate-500 text-sm line-clamp-2 mb-3 leading-relaxed">{article.excerpt}</p>
        )}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1"><Clock size={10}/>{article.published_at ? timeAgo(article.published_at) : ''}</span>
          {article.author_name && <span>By {article.author_name}</span>}
        </div>
      </div>
    </Link>
  )
}

function ArticleCardHorizontal({ article }: { article: any }) {
  return (
    <Link href={`/article/${article.slug}`}
      className="group flex gap-4 bg-white rounded-xl border border-slate-100 hover:border-[#E63946]/30 hover:shadow-md transition-all p-3">
      <div className="flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden bg-slate-100">
        {article.featured_image ? (
          <img src={article.featured_image} alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0D1117] to-slate-700 flex items-center justify-center text-xl">⚽</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          {article.is_breaking && <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">BREAKING</span>}
          {article.category_name && (
            <span className={`${catColor[article.category_name]||'bg-blue-600'} text-white text-[9px] font-black px-1.5 py-0.5 rounded`}>
              {article.category_name}
            </span>
          )}
        </div>
        <h3 className="font-black text-slate-800 text-sm line-clamp-2 group-hover:text-[#E63946] transition-colors leading-snug mb-1"
          style={{fontFamily:'Oswald,sans-serif'}}>
          {article.title}
        </h3>
        {article.excerpt && <p className="text-slate-400 text-xs line-clamp-1">{article.excerpt}</p>}
        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400">
          <span className="flex items-center gap-1"><Clock size={9}/>{article.published_at ? timeAgo(article.published_at) : ''}</span>
          {article.author_name && <span>By {article.author_name}</span>}
          {article.views > 0 && <span>{article.views.toLocaleString()} views</span>}
        </div>
      </div>
    </Link>
  )
}

export default async function NewsPage({
  searchParams
}: {
  searchParams: { cat?: string; page?: string }
}) {
  const cat = searchParams.cat || ''
  const page = parseInt(searchParams.page || '1')
  const limit = 12
  const offset = (page - 1) * limit

  const [articles, allArticles] = await Promise.all([
    getArticles(cat || undefined, limit, offset),
    getArticles(undefined, 5),
  ])

  const hero = !cat && page === 1 && articles[0] ? articles[0] : null
  const featured = !cat && page === 1 ? articles.slice(1, 4) : []
  const rest = !cat && page === 1 ? articles.slice(4) : articles
  const breaking = articles.filter((a: any) => a.is_breaking).slice(0, 3)

  return (
    <div className="bg-[#f8f9fc] min-h-screen">
      {/* Page header */}
      <div className="bg-gradient-to-r from-[#0D1117] to-slate-800 py-8 px-4 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12}/>
            <span className="text-white">News</span>
            {cat && <><ChevronRight size={12}/><span className="text-[#E63946]">{cat}</span></>}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-1" style={{fontFamily:'Oswald,sans-serif'}}>
            {cat ? cat.toUpperCase() : '⚽ FOOTBALL NEWS'}
          </h1>
          <p className="text-slate-400 text-sm">
            {cat ? `Latest ${cat} stories` : 'Breaking news, transfers, match reports and expert analysis'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Category filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {CATEGORIES.map(c => (
            <Link key={c.value}
              href={c.value ? `/news?cat=${encodeURIComponent(c.value)}` : '/news'}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all border
                ${(!cat && !c.value) || cat === c.value
                  ? 'bg-[#E63946] text-white border-[#E63946]'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#E63946] hover:text-[#E63946]'
                }`}>
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </Link>
          ))}
        </div>

        {/* Breaking news bar */}
        {breaking.length > 0 && !cat && page === 1 && (
          <div className="bg-red-600 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <span className="bg-white text-red-600 text-[10px] font-black px-2 py-1 rounded-full flex-shrink-0 animate-pulse">🔴 BREAKING</span>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 flex-1">
              {breaking.map((a: any) => (
                <Link key={a.id} href={`/article/${a.slug}`}
                  className="text-white text-sm font-bold hover:text-red-200 transition-colors line-clamp-1">
                  → {a.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">

            {/* Hero article */}
            {hero && (
              <Link href={`/article/${hero.slug}`} className="group block relative rounded-2xl overflow-hidden aspect-[16/8] shadow-lg">
                {hero.featured_image ? (
                  <img src={hero.featured_image} alt={hero.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0D1117] to-slate-700"/>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"/>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {hero.is_breaking && <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full animate-pulse">🔴 BREAKING</span>}
                    {hero.category_name && <span className={`${catColor[hero.category_name]||'bg-blue-600'} text-white text-xs font-black px-3 py-1 rounded-full`}>{hero.category_name}</span>}
                  </div>
                  <h2 className="text-white text-2xl md:text-3xl font-black leading-tight mb-2 group-hover:text-[#E63946] transition-colors"
                    style={{fontFamily:'Oswald,sans-serif'}}>
                    {hero.title}
                  </h2>
                  {hero.excerpt && <p className="text-slate-300 text-sm line-clamp-2 hidden md:block mb-3">{hero.excerpt}</p>}
                  <div className="flex items-center gap-4 text-slate-400 text-xs">
                    <span className="flex items-center gap-1"><Clock size={11}/>{hero.published_at ? timeAgo(hero.published_at) : ''}</span>
                    {hero.author_name && <span>By {hero.author_name}</span>}
                  </div>
                </div>
              </Link>
            )}

            {/* Featured grid */}
            {featured.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {featured.map((a: any) => <ArticleCardLarge key={a.id} article={a}/>)}
              </div>
            )}

            {/* Rest of articles */}
            {rest.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-black text-slate-900 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
                    <span className="w-1 h-5 bg-[#E63946] rounded-full"/>
                    {cat ? `${cat} Stories` : 'LATEST STORIES'}
                  </h2>
                </div>
                <div className="space-y-3">
                  {rest.map((a: any) => <ArticleCardHorizontal key={a.id} article={a}/>)}
                </div>
              </div>
            )}

            {articles.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
                <div className="text-5xl mb-4">📰</div>
                <h3 className="text-xl font-black text-slate-700 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>NO ARTICLES YET</h3>
                <p className="text-slate-400 text-sm mb-4">Head to the admin panel and publish your first article.</p>
                <Link href="/admin/articles/new" className="bg-[#E63946] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#c0303c] transition-all inline-block">
                  ✏️ Write Article
                </Link>
              </div>
            )}

            {/* Pagination */}
            {articles.length === limit && (
              <div className="flex justify-center gap-3 pt-4">
                {page > 1 && (
                  <Link href={`/news?${cat ? `cat=${encodeURIComponent(cat)}&` : ''}page=${page - 1}`}
                    className="px-5 py-2.5 border border-slate-200 bg-white text-slate-600 rounded-xl font-bold text-sm hover:border-[#E63946] hover:text-[#E63946] transition-all">
                    ← Previous
                  </Link>
                )}
                <Link href={`/news?${cat ? `cat=${encodeURIComponent(cat)}&` : ''}page=${page + 1}`}
                  className="px-5 py-2.5 bg-[#E63946] text-white rounded-xl font-bold text-sm hover:bg-[#c0303c] transition-all">
                  Load More →
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Most read */}
            {allArticles.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-[#0D1117] to-slate-800 px-4 py-3 flex items-center gap-2">
                  <TrendingUp size={14} className="text-[#E63946]"/>
                  <h3 className="text-white font-black text-sm" style={{fontFamily:'Oswald,sans-serif'}}>MOST READ</h3>
                </div>
                <div className="divide-y divide-slate-50">
                  {allArticles.map((a: any, i: number) => (
                    <Link key={a.id} href={`/article/${a.slug}`}
                      className="flex items-start gap-3 p-3 hover:bg-slate-50 transition-colors group">
                      <span className="text-2xl font-black text-slate-200 w-7 flex-shrink-0 leading-none">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        {a.category_name && (
                          <span className="text-[10px] text-[#E63946] font-black uppercase">{a.category_name}</span>
                        )}
                        <p className="text-sm font-bold text-slate-800 group-hover:text-[#E63946] transition-colors line-clamp-2 leading-snug">
                          {a.title}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">{a.published_at ? timeAgo(a.published_at) : ''}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Browse topics */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <h3 className="font-black text-slate-800 mb-3 text-sm flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
                <Flame size={14} className="text-[#E63946]"/> BROWSE TOPICS
              </h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.filter(c => c.value).map(c => (
                  <Link key={c.value} href={`/news?cat=${encodeURIComponent(c.value)}`}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border transition-all
                      ${cat === c.value ? 'bg-[#E63946] text-white border-[#E63946]' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-[#E63946] hover:text-[#E63946]'}`}>
                    {c.icon} {c.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <h3 className="font-black text-slate-800 mb-3 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>QUICK LINKS</h3>
              <nav className="space-y-1">
                {[
                  ['📊 Live Scores', '/live-scores'],
                  ['📅 Fixtures', '/fixtures'],
                  ['🏆 League Tables', '/tables'],
                  ['💼 Transfer News', '/transfer-news'],
                  ['🔥 Gossip', '/gossip'],
                  ['🔮 Betting Tips', '/betting/predictions'],
                ].map(([label, href]) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-2 py-2 px-3 text-sm text-slate-600 hover:text-[#E63946] hover:bg-slate-50 rounded-lg transition-colors font-medium">
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-[#0D1117] to-[#1a1f2e] rounded-2xl p-5 text-white">
              <h3 className="font-black text-base mb-1" style={{fontFamily:'Oswald,sans-serif'}}>📧 DAILY DIGEST</h3>
              <p className="text-slate-400 text-sm mb-4">Get the biggest stories to your inbox.</p>
              <form action="/api/newsletter" method="POST" className="space-y-2">
                <input type="email" name="email" required placeholder="your@email.com"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
                <button type="submit"
                  className="w-full bg-[#E63946] hover:bg-[#c0303c] text-white font-black py-2.5 rounded-xl text-sm transition-all"
                  style={{fontFamily:'Oswald,sans-serif'}}>
                  SUBSCRIBE FREE
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
