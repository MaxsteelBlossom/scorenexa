import Link from 'next/link'
import { Suspense } from 'react'
import { Clock, TrendingUp, Zap, ChevronRight, Star, Shield, Target } from 'lucide-react'
import { getTodayFixtures, getStandings } from '@/lib/sports/adapter'

async function getArticles(options?: { category?: string; limit?: number }) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return []
    let endpoint = `${url}/rest/v1/articles?status=eq.published&order=published_at.desc&limit=${options?.limit || 10}`
    if (options?.category) endpoint += `&category_name=eq.${encodeURIComponent(options.category)}`
    const res = await fetch(endpoint, { headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }, next: { revalidate: 60 } })
    if (!res.ok) return []
    return await res.json()
  } catch { return [] }
}

function timeAgo(d: string) {
  if (!d) return ''
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s/60)}m ago`
  if (s < 86400) return `${Math.floor(s/3600)}h ago`
  return new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short'})
}

const catColor: Record<string,string> = {
  'News':'bg-blue-600','Transfer News':'bg-purple-600','Gossip':'bg-orange-500','Match Report':'bg-emerald-600','Opinion':'bg-slate-600'
}

function ArticleCardSmall({ a }: { a: any }) {
  return (
    <Link href={`/article/${a.slug}`} className="group block bg-white rounded-xl border border-slate-100 hover:border-[#E63946]/30 hover:shadow-md transition-all overflow-hidden">
      {a.featured_image ? <img src={a.featured_image} alt={a.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"/> : <div className="w-full h-36 bg-gradient-to-br from-[#0D1117] to-slate-700 flex items-center justify-center text-3xl">⚽</div>}
      <div className="p-3">
        {a.category_name && <span className={`${catColor[a.category_name]||'bg-blue-600'} text-white text-[9px] font-black px-2 py-0.5 rounded-full`}>{a.category_name}</span>}
        <h3 className="font-black text-slate-800 text-sm line-clamp-2 group-hover:text-[#E63946] transition-colors leading-snug mt-1" style={{fontFamily:'Oswald,sans-serif'}}>{a.title}</h3>
        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Clock size={9}/>{timeAgo(a.published_at)}</p>
      </div>
    </Link>
  )
}

function ArticleRow({ a, rank }: { a: any; rank?: number }) {
  return (
    <Link href={`/article/${a.slug}`} className="group flex gap-3 hover:bg-slate-50 p-2 rounded-xl transition-all">
      {rank && <span className="text-2xl font-black text-slate-200 w-7 flex-shrink-0 leading-none">{rank}</span>}
      <div className="flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden bg-slate-100">
        {a.featured_image ? <img src={a.featured_image} alt={a.title} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-gradient-to-br from-[#0D1117] to-slate-700 flex items-center justify-center text-lg">⚽</div>}
      </div>
      <div className="flex-1 min-w-0">
        {a.category_name && <span className="text-[10px] text-[#E63946] font-black uppercase">{a.category_name}</span>}
        <p className="text-sm font-black text-slate-800 group-hover:text-[#E63946] transition-colors line-clamp-2 leading-snug">{a.title}</p>
        <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1"><Clock size={9}/>{timeAgo(a.published_at)}</p>
      </div>
    </Link>
  )
}

function SectionHeader({ title, href, color='bg-[#E63946]' }: { title:string; href:string; color?:string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-black text-slate-900 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
        <span className={`w-1 h-6 ${color} rounded-full`}/>{title}
      </h2>
      <Link href={href} className="text-[#E63946] text-sm font-bold hover:text-[#c0303c] flex items-center gap-1">See all <ChevronRight size={14}/></Link>
    </div>
  )
}

async function LiveWidget() {
  const matches = await getTodayFixtures()
  const live = matches.filter(m => ['LIVE','1H','2H','HT'].includes(m.status))
  const shown = live.length > 0 ? live : matches.slice(0,5)
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-black text-sm flex items-center gap-1.5" style={{fontFamily:'Oswald,sans-serif'}}><Zap size={13} className="animate-pulse"/>{live.length>0?`LIVE (${live.length})`:"TODAY'S MATCHES"}</h3>
        <Link href="/live-scores" className="text-red-200 hover:text-white text-xs font-bold">All →</Link>
      </div>
      {shown.length > 0 ? shown.map(m => {
        const isLive = ['LIVE','1H','2H','HT'].includes(m.status)
        return (
          <div key={m.id} className="px-3 py-2.5 flex items-center gap-2 border-b border-slate-50 hover:bg-slate-50">
            <span className="text-[9px] text-slate-400 font-bold w-10 flex-shrink-0 truncate">{m.league.split(' ')[0]}</span>
            <div className="flex-1 text-right"><p className="text-xs font-black text-slate-800 truncate">{m.homeTeam}</p></div>
            <div className={`flex-shrink-0 text-center min-w-[52px] py-0.5 px-2 rounded-lg ${isLive?'bg-red-50':'bg-slate-50'}`}>
              {m.homeScore!==null ? <span className="text-sm font-black">{m.homeScore}-{m.awayScore}</span> : <span className="text-xs text-blue-600 font-bold">{new Date(m.kickoffTime).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</span>}
              {isLive && <div className="text-[9px] text-red-500 font-black">{m.minute?`${m.minute}'`:'LIVE'}</div>}
            </div>
            <div className="flex-1"><p className="text-xs font-black text-slate-800 truncate">{m.awayTeam}</p></div>
          </div>
        )
      }) : <div className="p-6 text-center text-slate-400 text-sm">No matches today</div>}
      <div className="p-3 border-t border-slate-100"><Link href="/live-scores" className="block text-center text-xs font-black text-[#E63946] hover:underline">VIEW ALL SCORES →</Link></div>
    </div>
  )
}

async function StandingsWidget() {
  const standings = await getStandings(39)
  const top6 = standings.slice(0,6)
  const fc: Record<string,string> = {W:'bg-emerald-500',D:'bg-slate-300',L:'bg-red-500'}
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-[#0D1117] to-slate-800 px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-black text-sm" style={{fontFamily:'Oswald,sans-serif'}}>🏴󠁧󠁢󠁥󠁮󠁧󠁿 PREMIER LEAGUE</h3>
        <Link href="/tables" className="text-slate-400 hover:text-white text-xs font-bold">Full →</Link>
      </div>
      <table className="w-full text-xs">
        <thead><tr className="bg-slate-50 text-slate-400 uppercase tracking-wider">
          <th className="pl-3 py-2 text-left w-6">#</th>
          <th className="py-2 text-left">Team</th>
          <th className="py-2 text-center w-8">P</th>
          <th className="py-2 text-center w-10 font-bold text-slate-600">Pts</th>
          <th className="py-2 pr-3 text-right hidden sm:table-cell">Form</th>
        </tr></thead>
        <tbody>
          {top6.map((s,i) => (
            <tr key={i} className={`border-t border-slate-50 hover:bg-slate-50 ${i<4?'border-l-2 border-l-blue-500':''}`}>
              <td className="pl-3 py-2.5 font-black text-slate-400">{s.position}</td>
              <td className="py-2.5 font-bold text-slate-800 truncate max-w-[90px]">{s.team}</td>
              <td className="py-2.5 text-center text-slate-500">{s.played}</td>
              <td className="py-2.5 text-center font-black text-slate-900">{s.points}</td>
              <td className="py-2.5 pr-3 hidden sm:table-cell">
                <div className="flex gap-0.5 justify-end">
                  {(s.form||'').split('').slice(-5).map((f:string,fi:number) => (
                    <span key={fi} className={`w-4 h-4 rounded-full text-white text-[8px] flex items-center justify-center font-black ${fc[f]||'bg-slate-200'}`}>{f}</span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 border-t border-slate-100"><Link href="/tables" className="block text-center text-xs font-black text-[#E63946] hover:underline">FULL TABLE →</Link></div>
    </div>
  )
}

export default async function HomePage() {
  const [allArticles, transfers, gossip, opinions] = await Promise.all([
    getArticles({limit:20}), getArticles({category:'Transfer News',limit:6}),
    getArticles({category:'Gossip',limit:5}), getArticles({category:'Opinion',limit:3}),
  ])

  const hero = allArticles[0]
  const heroSec = allArticles.slice(1,4)
  const latest = allArticles.slice(4,10)
  const trending = allArticles.slice(0,5)
  const hasContent = allArticles.length > 0

  return (
    <div className="bg-[#f8f9fc]">
      {/* Quick nav bar */}
      <div className="bg-white border-b border-slate-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center overflow-x-auto scrollbar-hide">
            {[['🏠 Home','/'],['⚽ News','/news'],['💼 Transfers','/transfer-news'],['🔥 Gossip','/gossip'],['📊 Live Scores','/live-scores'],['📅 Fixtures','/fixtures'],['🏆 Tables','/tables'],['🏆 Leagues','/leagues'],['🔮 Predictions','/betting/predictions'],['⭐ Premium','/premium']].map(([l,h]) => (
              <Link key={h} href={h} className={`flex-shrink-0 px-4 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${h==='/'?'border-[#E63946] text-[#E63946]':'border-transparent text-slate-600 hover:text-[#E63946] hover:border-[#E63946]'}`}>{l}</Link>
            ))}
          </nav>
        </div>
      </div>

      {!hasContent ? (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="text-7xl mb-6">⚽</div>
          <h2 className="text-3xl font-black text-slate-800 mb-3" style={{fontFamily:'Oswald,sans-serif'}}>WELCOME TO SCORENEXA</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">Start publishing articles to populate your homepage.</p>
          <Link href="/admin/articles/new" className="inline-flex items-center gap-2 bg-[#E63946] text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-[#c0303c] transition-all" style={{fontFamily:'Oswald,sans-serif'}}>✏️ PUBLISH FIRST ARTICLE</Link>
        </div>
      ) : (
        <>
          {/* Hero */}
          <section className="max-w-7xl mx-auto px-4 pt-5 pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                {hero && (
                  <Link href={`/article/${hero.slug}`} className="group block relative rounded-2xl overflow-hidden shadow-xl" style={{aspectRatio:'16/8'}}>
                    {hero.featured_image ? <img src={hero.featured_image} alt={hero.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/> : <div className="absolute inset-0 bg-gradient-to-br from-[#0D1117] to-slate-800 flex items-center justify-center text-8xl">⚽</div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"/>
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                      <div className="flex items-center gap-2 mb-3">
                        {hero.is_breaking && <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full animate-pulse">🔴 BREAKING</span>}
                        {hero.category_name && <span className={`${catColor[hero.category_name]||'bg-blue-600'} text-white text-xs font-black px-3 py-1 rounded-full`}>{hero.category_name}</span>}
                      </div>
                      <h2 className="text-white text-xl md:text-3xl font-black leading-tight mb-2 group-hover:text-[#E63946] transition-colors" style={{fontFamily:'Oswald,sans-serif'}}>{hero.title}</h2>
                      {hero.excerpt && <p className="text-slate-300 text-sm line-clamp-2 hidden md:block mb-3">{hero.excerpt}</p>}
                      <div className="flex items-center gap-4 text-slate-400 text-xs">
                        <span className="flex items-center gap-1"><Clock size={11}/>{timeAgo(hero.published_at)}</span>
                        {hero.author_name && <span>By {hero.author_name}</span>}
                      </div>
                    </div>
                  </Link>
                )}
              </div>
              <div className="flex flex-col gap-3">
                {heroSec.map((a:any) => (
                  <Link key={a.id} href={`/article/${a.slug}`} className="group flex gap-3 bg-white rounded-xl border border-slate-100 hover:border-[#E63946]/30 hover:shadow-md transition-all p-3 flex-1">
                    <div className="w-20 h-full min-h-[60px] rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                      {a.featured_image ? <img src={a.featured_image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform"/> : <div className="w-full h-full bg-gradient-to-br from-[#0D1117] to-slate-700 flex items-center justify-center text-lg">⚽</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      {a.category_name && <span className={`text-[10px] text-white font-black px-1.5 py-0.5 rounded ${catColor[a.category_name]||'bg-blue-600'}`}>{a.category_name}</span>}
                      <p className="text-sm font-black text-slate-800 group-hover:text-[#E63946] transition-colors line-clamp-2 leading-snug mt-1" style={{fontFamily:'Oswald,sans-serif'}}>{a.title}</p>
                      <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><Clock size={9}/>{timeAgo(a.published_at)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Breaking bar */}
          {allArticles.filter((a:any)=>a.is_breaking).length>0 && (
            <div className="bg-[#E63946] py-2 px-4 mb-2">
              <div className="max-w-7xl mx-auto flex items-center gap-4">
                <span className="text-white font-black text-xs flex-shrink-0 bg-white/20 px-2 py-0.5 rounded">🔴 BREAKING</span>
                <div className="flex gap-8 overflow-hidden">
                  {allArticles.filter((a:any)=>a.is_breaking).slice(0,3).map((a:any)=>(
                    <Link key={a.id} href={`/article/${a.slug}`} className="text-white text-sm font-bold hover:text-red-200 whitespace-nowrap">→ {a.title}</Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Main grid */}
          <section className="max-w-7xl mx-auto px-4 py-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-8">

                {latest.length>0 && (
                  <div>
                    <SectionHeader title="LATEST NEWS" href="/news"/>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {latest.map((a:any)=><ArticleCardSmall key={a.id} a={a}/>)}
                    </div>
                    <div className="mt-4 text-center">
                      <Link href="/news" className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-[#E63946] hover:text-[#E63946] text-slate-600 px-6 py-2.5 rounded-xl font-bold text-sm transition-all">More News <ChevronRight size={14}/></Link>
                    </div>
                  </div>
                )}

                {transfers.length>0 && (
                  <div>
                    <SectionHeader title="💼 TRANSFER NEWS" href="/transfer-news" color="bg-purple-600"/>
                    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                      <div className="divide-y divide-slate-50">
                        {transfers.map((a:any,i:number)=>(
                          <div key={a.id}>
                            {i===0 ? (
                              <Link href={`/article/${a.slug}`} className="group block relative overflow-hidden" style={{height:'200px'}}>
                                {a.featured_image?<img src={a.featured_image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform"/>:<div className="w-full h-full bg-gradient-to-br from-purple-900 to-slate-800 flex items-center justify-center text-5xl">💼</div>}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"/>
                                <div className="absolute bottom-0 p-4">
                                  <span className="bg-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded mb-2 inline-block">TRANSFER</span>
                                  <h3 className="text-white font-black text-lg leading-tight group-hover:text-purple-300" style={{fontFamily:'Oswald,sans-serif'}}>{a.title}</h3>
                                </div>
                              </Link>
                            ) : <ArticleRow a={a}/>}
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-slate-100 text-center"><Link href="/transfer-news" className="text-xs font-black text-purple-600 hover:underline">ALL TRANSFER NEWS →</Link></div>
                    </div>
                  </div>
                )}

                {gossip.length>0 && (
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-5">
                    <SectionHeader title="🔥 GOSSIP COLUMN" href="/gossip" color="bg-orange-500"/>
                    <div className="space-y-3">
                      {gossip.map((a:any,i:number)=>(
                        <Link key={a.id} href={`/article/${a.slug}`} className="group flex items-start gap-3 hover:bg-white/50 p-2 rounded-xl transition-all">
                          <span className="text-2xl font-black text-orange-200 w-8 flex-shrink-0">{String(i+1).padStart(2,'0')}</span>
                          <div><p className="text-sm font-black text-slate-800 group-hover:text-orange-700 transition-colors line-clamp-2 leading-snug" style={{fontFamily:'Oswald,sans-serif'}}>{a.title}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{timeAgo(a.published_at)}</p></div>
                        </Link>
                      ))}
                    </div>
                    <Link href="/gossip" className="mt-4 block text-center text-sm font-black text-orange-600 hover:underline">MORE GOSSIP →</Link>
                  </div>
                )}

                {opinions.length>0 && (
                  <div>
                    <SectionHeader title="💬 OPINION & ANALYSIS" href="/news?cat=Opinion" color="bg-slate-600"/>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {opinions.map((a:any)=>(
                        <Link key={a.id} href={`/article/${a.slug}`} className="group bg-white rounded-xl border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all p-4">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Opinion</span>
                          <h3 className="font-black text-slate-800 text-sm mt-1 line-clamp-3 leading-snug group-hover:text-slate-600" style={{fontFamily:'Oswald,sans-serif'}}>{a.title}</h3>
                          <p className="text-[10px] text-slate-400 mt-2">{a.author_name||'ScoreNexa'}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explore cards */}
                <div>
                  <SectionHeader title="EXPLORE SCORENEXA" href="/news" color="bg-[#E63946]"/>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[{label:'Live Scores',href:'/live-scores',icon:'📊',color:'from-red-600 to-red-700',desc:'Real-time results'},{label:'Fixtures',href:'/fixtures',icon:'📅',color:'from-blue-600 to-blue-700',desc:'Upcoming matches'},{label:'Tables',href:'/tables',icon:'🏆',color:'from-emerald-600 to-emerald-700',desc:'League standings'},{label:'Betting Tips',href:'/betting/predictions',icon:'🔮',color:'from-purple-600 to-purple-700',desc:'Expert predictions'},{label:'Premier League',href:'/leagues/premier-league',icon:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',color:'from-slate-700 to-slate-800',desc:'Full standings'},{label:'Champions League',href:'/leagues/champions-league',icon:'⭐',color:'from-yellow-600 to-yellow-700',desc:"Europe's best"},{label:'Transfer Centre',href:'/transfer-news',icon:'💼',color:'from-indigo-600 to-indigo-700',desc:'Latest deals'},{label:'Go Premium',href:'/premium',icon:'👑',color:'from-[#E63946] to-red-700',desc:'Ad-free'}].map(c=>(
                      <Link key={c.href} href={c.href} className={`group bg-gradient-to-br ${c.color} rounded-xl p-4 text-white hover:scale-105 transition-transform shadow-sm`}>
                        <span className="text-2xl block mb-1">{c.icon}</span>
                        <p className="font-black text-sm" style={{fontFamily:'Oswald,sans-serif'}}>{c.label}</p>
                        <p className="text-white/70 text-[10px] mt-0.5">{c.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-5">
                <Suspense fallback={<div className="bg-white rounded-2xl border h-64 animate-pulse"/>}><LiveWidget/></Suspense>
                {trending.length>0 && (
                  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 flex items-center gap-2">
                      <TrendingUp size={13} className="text-[#E63946]"/>
                      <h3 className="text-white font-black text-sm" style={{fontFamily:'Oswald,sans-serif'}}>TRENDING NOW</h3>
                    </div>
                    <div className="p-3 space-y-1">{trending.map((a:any,i:number)=><ArticleRow key={a.id} a={a} rank={i+1}/>)}</div>
                  </div>
                )}
                <Suspense fallback={<div className="bg-white rounded-2xl border h-64 animate-pulse"/>}><StandingsWidget/></Suspense>
                <div className="bg-gradient-to-br from-[#0D1117] to-slate-800 rounded-2xl p-5 text-white">
                  <div className="flex items-center gap-2 mb-3"><Target size={16} className="text-[#E63946]"/><h3 className="font-black text-base" style={{fontFamily:'Oswald,sans-serif'}}>🔮 TODAY'S TIPS</h3></div>
                  <p className="text-slate-400 text-sm mb-4">Expert betting predictions updated daily.</p>
                  <Link href="/betting/predictions" className="block text-center bg-[#E63946] hover:bg-[#c0303c] text-white font-black py-2.5 rounded-xl text-sm" style={{fontFamily:'Oswald,sans-serif'}}>VIEW PREDICTIONS →</Link>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <h3 className="font-black text-slate-900 text-base mb-1" style={{fontFamily:'Oswald,sans-serif'}}>📧 DAILY DIGEST</h3>
                  <p className="text-slate-500 text-sm mb-4">The biggest stories to your inbox.</p>
                  <form action="/api/newsletter" method="POST" className="space-y-2">
                    <input type="email" name="email" required placeholder="your@email.com" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
                    <button type="submit" className="w-full bg-[#E63946] hover:bg-[#c0303c] text-white font-black py-2.5 rounded-xl text-sm" style={{fontFamily:'Oswald,sans-serif'}}>SUBSCRIBE FREE</button>
                  </form>
                </div>
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-5 text-white shadow-sm">
                  <div className="flex items-center gap-2 mb-2"><Star size={16} className="fill-current"/><h3 className="font-black text-base" style={{fontFamily:'Oswald,sans-serif'}}>GO PREMIUM</h3></div>
                  <ul className="space-y-1.5 mb-4 text-sm">
                    <li className="flex items-center gap-2"><Shield size={12}/>Ad-free experience</li>
                    <li className="flex items-center gap-2"><Zap size={12}/>Breaking news alerts</li>
                    <li className="flex items-center gap-2"><Star size={12}/>Exclusive content</li>
                  </ul>
                  <Link href="/premium" className="block text-center bg-white text-orange-600 font-black py-2.5 rounded-xl text-sm hover:bg-orange-50" style={{fontFamily:'Oswald,sans-serif'}}>FROM £3.99/MONTH →</Link>
                </div>
              </aside>
            </div>
          </section>

          {/* Leagues bottom */}
          <section className="bg-[#0D1117] py-8 px-4 mt-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-white font-black text-xl mb-5" style={{fontFamily:'Oswald,sans-serif'}}>🏆 LEAGUES & COMPETITIONS</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {[{name:'Premier League',flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',href:'/leagues/premier-league'},{name:'La Liga',flag:'🇪🇸',href:'/leagues/la-liga'},{name:'Bundesliga',flag:'🇩🇪',href:'/leagues/bundesliga'},{name:'Serie A',flag:'🇮🇹',href:'/leagues/serie-a'},{name:'Ligue 1',flag:'🇫🇷',href:'/leagues/ligue-1'},{name:'Champions League',flag:'🏆',href:'/leagues/champions-league'},{name:'Europa League',flag:'🥈',href:'/leagues/europa-league'},{name:'All Leagues',flag:'🌍',href:'/leagues'}].map(l=>(
                  <Link key={l.href} href={l.href} className="bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl p-3 text-center transition-all group">
                    <span className="text-2xl block mb-1">{l.flag}</span>
                    <p className="text-white text-xs font-bold group-hover:text-[#E63946] leading-tight">{l.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Stats bar */}
          <section className="bg-white border-t border-slate-100 py-6 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[{label:'Live Leagues',value:'50+',icon:'🌍'},{label:'Daily Articles',value:'10+',icon:'📰'},{label:'Matches Covered',value:'1,000+',icon:'⚽'},{label:'Expert Tips',value:'Daily',icon:'🔮'}].map(s=>(
                <div key={s.label}><span className="text-3xl block mb-1">{s.icon}</span><p className="text-2xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>{s.value}</p><p className="text-slate-500 text-sm">{s.label}</p></div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
