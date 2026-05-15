import Link from 'next/link'
import { Suspense } from 'react'
import AdSlot from '@/components/ui/AdSlot'
import { getTodayFixtures } from '@/lib/sports/adapter'
import { Clock, TrendingUp, Zap, ChevronRight, FileText } from 'lucide-react'

// Real data fetch from Supabase
async function getArticles(type?: string, limit = 10) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return []

    let endpoint = `${url}/rest/v1/articles?status=eq.published&order=published_at.desc&limit=${limit}`
    if (type) endpoint += `&article_type=eq.${type}`

    const res = await fetch(endpoint, {
      headers: { 'apikey': key, 'Authorization': `Bearer ${key}` },
      next: { revalidate: 60 }
    })
    if (!res.ok) return []
    return await res.json()
  } catch { return [] }
}

async function TodayScores() {
  const matches = await getTodayFixtures()
  const live = matches.filter(m => m.status === 'LIVE' || m.status === '1H' || m.status === '2H' || m.status === 'HT')
  const displayed = live.length > 0 ? live : matches.slice(0, 6)

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-bold text-sm flex items-center gap-1.5" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
          <Zap size={14} className="animate-pulse"/>
          {live.length > 0 ? 'LIVE NOW' : "TODAY'S MATCHES"}
        </h3>
        <Link href="/live-scores" className="text-red-200 hover:text-white text-xs transition-colors">All Scores →</Link>
      </div>
      <div className="divide-y divide-slate-50">
        {displayed.map(m => (
          <div key={m.id} className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors">
            <div className="flex-1 text-right">
              <p className="text-sm font-semibold text-slate-800 truncate">{m.homeTeam}</p>
            </div>
            <div className="flex-shrink-0 text-center min-w-[72px]">
              {m.homeScore !== null ? (
                <span className="font-bold text-slate-900 text-base">{m.homeScore} - {m.awayScore}</span>
              ) : (
                <span className="text-xs text-blue-600 font-semibold">{new Date(m.kickoffTime).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</span>
              )}
              <div className={`text-[10px] font-bold mt-0.5 ${(m.status === 'LIVE' || m.status === '1H' || m.status === '2H') ? 'text-red-500' : 'text-slate-400'}`}>
                {m.minute ? `${m.minute}'` : m.status}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800 truncate">{m.awayTeam}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EmptyState({ type }: { type: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
      <FileText size={40} className="text-slate-200 mx-auto mb-3"/>
      <p className="font-bold text-slate-600 mb-1">No {type} yet</p>
      <p className="text-slate-400 text-sm mb-4">Go to the admin panel and publish your first article.</p>
      <Link href="/admin/articles/new"
        className="inline-flex items-center gap-2 bg-[#E63946] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#c0303c] transition-all">
        Write Article →
      </Link>
    </div>
  )
}

function ArticleCard({ article }: { article: any }) {
  return (
    <Link href={`/article/${article.slug}`}
      className="group flex gap-4 bg-white rounded-xl border border-slate-100 hover:border-[#E63946]/30 hover:shadow-md transition-all p-3">
      {article.featured_image ? (
        <div className="w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
          <img src={article.featured_image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
        </div>
      ) : (
        <div className="w-28 h-20 flex-shrink-0 rounded-lg bg-gradient-to-br from-[#0D1117] to-slate-800 flex items-center justify-center text-2xl">⚽</div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          {article.is_breaking && <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">BREAKING</span>}
          {article.category_name && <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{article.category_name}</span>}
        </div>
        <h3 className="text-slate-800 font-bold text-sm line-clamp-2 group-hover:text-[#E63946] transition-colors leading-snug">{article.title}</h3>
        {article.excerpt && <p className="text-slate-500 text-xs mt-1 line-clamp-1">{article.excerpt}</p>}
        <div className="flex items-center gap-3 mt-2 text-slate-400 text-xs">
          <span className="flex items-center gap-0.5"><Clock size={10}/>{article.published_at ? new Date(article.published_at).toLocaleDateString('en-GB',{day:'numeric',month:'short'}) : ''}</span>
          {article.author_name && <span>By {article.author_name}</span>}
        </div>
      </div>
    </Link>
  )
}

function HeroCard({ article }: { article: any }) {
  return (
    <Link href={`/article/${article.slug}`} className="group block relative overflow-hidden rounded-2xl bg-slate-900 aspect-[16/9]">
      {article.featured_image ? (
        <img src={article.featured_image} alt={article.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"/>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1117] to-slate-800 flex items-center justify-center text-8xl">⚽</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"/>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-2 mb-2">
          {article.is_breaking && <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded animate-pulse">BREAKING</span>}
          {article.category_name && <span className="bg-[#E63946] text-white text-xs font-bold px-2 py-0.5 rounded">{article.category_name}</span>}
        </div>
        <h2 className="text-white text-xl md:text-2xl font-black leading-tight mb-2 group-hover:text-[#E63946] transition-colors" style={{fontFamily:'Oswald,sans-serif'}}>{article.title}</h2>
        {article.excerpt && <p className="text-slate-300 text-sm line-clamp-2 hidden md:block">{article.excerpt}</p>}
        <div className="flex items-center gap-3 mt-3 text-slate-400 text-xs">
          <span className="flex items-center gap-1"><Clock size={11}/>{article.published_at ? new Date(article.published_at).toLocaleDateString('en-GB',{day:'numeric',month:'long'}) : ''}</span>
          {article.author_name && <span>By {article.author_name}</span>}
        </div>
      </div>
    </Link>
  )
}

export default async function HomePage() {
  const [allArticles, transfers, gossip] = await Promise.all([
    getArticles(undefined, 10),
    getArticles('transfer', 4),
    getArticles('gossip', 4),
  ])

  const hero = allArticles[0]
  const secondary = allArticles.slice(1, 3)
  const rest = allArticles.slice(3)

  return (
    <div className="bg-[#f8f9fc]">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        {hero ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2"><HeroCard article={hero}/></div>
            <div className="flex flex-col gap-4">
              {secondary.length > 0 ? secondary.map((a: any) => (
                <Link key={a.id} href={`/article/${a.slug}`} className="group bg-white rounded-xl border border-slate-100 hover:border-[#E63946]/30 hover:shadow-md transition-all p-4 flex gap-3">
                  {a.featured_image && <img src={a.featured_image} alt={a.title} className="w-20 h-16 object-cover rounded-lg flex-shrink-0"/>}
                  <div>
                    {a.category_name && <span className="bg-[#E63946] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{a.category_name}</span>}
                    <h3 className="text-slate-800 font-black text-sm mt-1 group-hover:text-[#E63946] transition-colors line-clamp-2" style={{fontFamily:'Oswald,sans-serif'}}>{a.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{a.published_at ? new Date(a.published_at).toLocaleDateString('en-GB',{day:'numeric',month:'short'}) : ''}</p>
                  </div>
                </Link>
              )) : (
                <div className="bg-white rounded-xl border border-slate-100 p-4 text-center text-slate-400 text-sm">Publish more articles to fill this space</div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
            <div className="text-6xl mb-4">⚽</div>
            <h2 className="text-2xl font-black text-slate-800 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>WELCOME TO SCORENEXA</h2>
            <p className="text-slate-500 mb-6">Start publishing articles to populate your homepage.</p>
            <Link href="/admin/articles/new" className="inline-flex items-center gap-2 bg-[#E63946] text-white px-6 py-3 rounded-xl font-black hover:bg-[#c0303c] transition-all" style={{fontFamily:'Oswald,sans-serif'}}>
              + PUBLISH FIRST ARTICLE
            </Link>
          </div>
        )}
      </section>

      {/* Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <AdSlot position="banner"/>
      </div>

      {/* Main grid */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-8">

            {/* Latest News */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
                  <span className="w-1 h-6 bg-[#E63946] rounded-full"/>LATEST NEWS
                </h2>
                <Link href="/news" className="text-[#E63946] hover:text-[#c0303c] text-sm font-bold flex items-center gap-1">All News <ChevronRight size={14}/></Link>
              </div>
              {rest.length > 0 ? (
                <div className="space-y-3">{rest.map((a: any) => <ArticleCard key={a.id} article={a}/>)}</div>
              ) : (
                <EmptyState type="news articles"/>
              )}
            </div>

            <AdSlot position="in-article"/>

            {/* Transfer News */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
                  <span className="w-1 h-6 bg-purple-600 rounded-full"/>TRANSFER NEWS
                </h2>
                <Link href="/transfer-news" className="text-[#E63946] text-sm font-bold flex items-center gap-1">All Transfers <ChevronRight size={14}/></Link>
              </div>
              {transfers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{transfers.map((a: any) => <ArticleCard key={a.id} article={a}/>)}</div>
              ) : (
                <EmptyState type="transfer stories"/>
              )}
            </div>

            {/* Gossip */}
            {gossip.length > 0 && (
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-black text-orange-900 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>🔥 GOSSIP COLUMN</h2>
                  <Link href="/gossip" className="text-orange-600 text-sm font-bold">More Gossip →</Link>
                </div>
                <div className="space-y-3">
                  {gossip.map((a: any, i: number) => (
                    <Link key={a.id} href={`/article/${a.slug}`} className="flex items-start gap-3 group">
                      <span className="text-2xl font-black text-orange-200 leading-none">{String(i+1).padStart(2,'0')}</span>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-orange-700 transition-colors leading-tight">{a.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{a.published_at ? new Date(a.published_at).toLocaleDateString('en-GB') : ''}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Suspense fallback={<div className="bg-white rounded-2xl border border-slate-100 h-64 animate-pulse"/>}>
              <TodayScores/>
            </Suspense>
            <AdSlot position="sidebar"/>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-[#0D1117] to-[#1a1f2e] rounded-2xl p-5 text-white">
              <h3 className="font-black text-lg mb-1" style={{fontFamily:'Oswald,sans-serif'}}>📧 DAILY DIGEST</h3>
              <p className="text-slate-400 text-sm mb-4">Get the day's biggest football stories to your inbox.</p>
              <form className="space-y-2" action="/api/newsletter" method="POST">
                <input type="email" name="email" placeholder="Your email address"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]" required/>
                <button type="submit"
                  className="w-full bg-[#E63946] hover:bg-[#c0303c] text-white font-black py-2.5 rounded-lg text-sm transition-all"
                  style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
                  SUBSCRIBE FREE
                </button>
              </form>
              <p className="text-slate-600 text-xs mt-2 text-center">No spam. Unsubscribe anytime.</p>
            </div>

            {/* Betting tips promo */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="bg-[#E63946] px-4 py-3">
                <h3 className="text-white font-black text-sm flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>🔮 TODAY'S PREDICTIONS</h3>
              </div>
              <div className="p-4 text-center">
                <p className="text-slate-500 text-sm mb-3">Expert betting tips updated daily</p>
                <Link href="/betting/predictions"
                  className="inline-block bg-[#E63946] hover:bg-[#c0303c] text-white font-black px-5 py-2 rounded-xl text-sm transition-all"
                  style={{fontFamily:'Oswald,sans-serif'}}>
                  VIEW TIPS →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
