import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Search – ScoreNexa',
  description: 'Search ScoreNexa for football news, transfers, teams and more.',
}

async function searchArticles(query: string) {
  if (!query || query.length < 2) return []
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return []
    // Search in title, excerpt and tags
    const encoded = encodeURIComponent(query)
    const endpoint = `${url}/rest/v1/articles?status=eq.published&or=(title.ilike.*${encoded}*,excerpt.ilike.*${encoded}*,category_name.ilike.*${encoded}*)&order=published_at.desc&limit=20`
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
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

const catColor: Record<string, string> = {
  'News': 'bg-blue-600',
  'Transfer News': 'bg-purple-600',
  'Gossip': 'bg-orange-500',
  'Match Report': 'bg-emerald-600',
  'Opinion': 'bg-slate-600',
}

const TRENDING = ['Premier League', 'Transfer News', 'Champions League', 'Arsenal', 'Manchester City', 'Real Madrid', 'Betting Tips', 'La Liga']

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q?.trim() || ''
  const results = await searchArticles(query)

  return (
    <div className="bg-[#f8f9fc] min-h-screen">
      <div className="bg-gradient-to-r from-[#0D1117] to-slate-800 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-black text-white mb-5" style={{fontFamily:'Oswald,sans-serif'}}>🔍 SEARCH</h1>
          <form method="GET" action="/search">
            <div className="relative">
              <input
                name="q"
                defaultValue={query}
                placeholder="Search news, teams, transfers, players..."
                className="w-full bg-white text-slate-900 placeholder-slate-400 rounded-2xl px-5 py-4 pr-14 text-base focus:outline-none focus:ring-2 focus:ring-[#E63946] shadow-lg"
                autoFocus
              />
              <button type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#E63946] hover:bg-[#c0303c] text-white p-2.5 rounded-xl transition-all">
                <Search size={18}/>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {query ? (
          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-slate-600">
                {results.length > 0
                  ? <><strong className="text-slate-900">{results.length} results</strong> for "<strong className="text-[#E63946]">{query}</strong>"</>
                  : <>No results for "<strong className="text-[#E63946]">{query}</strong>"</>
                }
              </p>
              {results.length > 0 && (
                <p className="text-slate-400 text-sm">{results.length} articles found</p>
              )}
            </div>

            {results.length > 0 ? (
              <div className="space-y-3">
                {results.map((article: any) => (
                  <Link key={article.id} href={`/article/${article.slug}`}
                    className="group flex gap-4 bg-white rounded-xl border border-slate-100 hover:border-[#E63946]/30 hover:shadow-md transition-all p-4">
                    <div className="flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden bg-slate-100">
                      {article.featured_image ? (
                        <img src={article.featured_image} alt={article.title} className="w-full h-full object-cover"/>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0D1117] to-slate-700 flex items-center justify-center text-xl">⚽</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {article.is_breaking && <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">BREAKING</span>}
                        {article.category_name && (
                          <span className={`${catColor[article.category_name]||'bg-blue-600'} text-white text-[9px] font-black px-1.5 py-0.5 rounded`}>
                            {article.category_name}
                          </span>
                        )}
                      </div>
                      <h3 className="font-black text-slate-800 text-sm md:text-base group-hover:text-[#E63946] transition-colors line-clamp-2 leading-snug mb-1"
                        style={{fontFamily:'Oswald,sans-serif'}}>
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-slate-500 text-sm line-clamp-1 mb-2">{article.excerpt}</p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Clock size={10}/>{article.published_at ? timeAgo(article.published_at) : ''}</span>
                        {article.author_name && <span>By {article.author_name}</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-black text-slate-700 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>NO RESULTS FOUND</h3>
                <p className="text-slate-400 text-sm mb-6">Try different keywords or browse our sections below.</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {TRENDING.map(t => (
                    <Link key={t} href={`/search?q=${encodeURIComponent(t)}`}
                      className="bg-slate-100 hover:bg-[#E63946] hover:text-white text-slate-600 px-3 py-1.5 rounded-full text-sm font-bold transition-all">
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-black text-slate-700 mb-4" style={{fontFamily:'Oswald,sans-serif'}}>🔥 TRENDING SEARCHES</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {TRENDING.map(t => (
                <Link key={t} href={`/search?q=${encodeURIComponent(t)}`}
                  className="flex items-center gap-2 bg-white border border-slate-200 hover:border-[#E63946] hover:text-[#E63946] text-slate-600 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm">
                  🔍 {t}
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[['⚽ All News', '/news'], ['💼 Transfers', '/transfer-news'], ['🔥 Gossip', '/gossip'], ['📊 Live Scores', '/live-scores'], ['📅 Fixtures', '/fixtures'], ['🏆 Tables', '/tables'], ['🏆 Leagues', '/leagues'], ['🔮 Betting Tips', '/betting/predictions']].map(([l, h]) => (
                <Link key={h} href={h}
                  className="bg-white border border-slate-100 hover:border-[#E63946]/30 hover:shadow-md rounded-xl p-4 text-center text-sm font-bold text-slate-700 hover:text-[#E63946] transition-all">
                  {l}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
