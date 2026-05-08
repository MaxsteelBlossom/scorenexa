import type { Metadata } from 'next'
import Link from 'next/link'
import AdSlot from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: 'Football Betting – Tips, Sites, Free Bets & Predictions',
  description: 'ScoreNexa betting hub: best betting sites, free bets, top predictions, accumulator tips and responsible gambling guides. Updated daily.',
  keywords: ['football betting','betting tips','best betting sites','free bets','football predictions','accumulator tips','betting bonus'],
}

const FEATURED_SITES = [
  { name:'Betway', rating:4.8, bonus:'100% up to £50', highlight:'Best for Live Betting', href:'/betting/guide-betway', tag:'Editor\'s Choice' },
  { name:'Hollywoodbets', rating:4.6, bonus:'£10 Free Bet', highlight:'Great Mobile App', href:'/betting/guide-hollywoodbets', tag:'Popular' },
  { name:'Betfred', rating:4.5, bonus:'£40 Free Bet', highlight:'Best for New Customers', href:'/betting/guide-betfred', tag:'Top Bonus' },
  { name:'Easybet', rating:4.3, bonus:'50% up to £30', highlight:'Best Odds Guarantee', href:'/betting/guide-easybet', tag:'' },
  { name:'Yesplay', rating:4.2, bonus:'£20 Free Bet', highlight:'Fast Withdrawals', href:'/betting/guide-yesplay', tag:'' },
]

const QUICK_LINKS = [
  { label:'Best Betting Sites', href:'/betting/best-betting-sites', icon:'🏆', desc:'Ranked and reviewed' },
  { label:'Bonus Offers', href:'/betting/bonus-offers', icon:'🎁', desc:'Latest sign-up deals' },
  { label:'Free Bet No Deposit', href:'/betting/free-bets', icon:'💰', desc:'Risk-free offers' },
  { label:'Best Betting Apps', href:'/betting/best-apps', icon:'📱', desc:'iOS & Android picks' },
  { label:"Today's Predictions", href:'/betting/predictions', icon:'🔮', desc:'Expert tips daily' },
  { label:'Accumulators', href:'/betting/accumulators', icon:'🎯', desc:'Weekend acca tips' },
  { label:'BTTS Tips', href:'/betting/btts-tips', icon:'⚽', desc:'Both teams to score' },
  { label:'Betting Glossary', href:'/betting/glossary', icon:'📖', desc:'Learn the lingo' },
]

export default function BettingPage() {
  return (
    <div className="bg-[#f8f9fc]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0D1117] to-[#1a1f2e] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#E63946]/20 text-[#E63946] text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-[#E63946]/30">
            🎯 BETTING HUB
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{fontFamily:'Oswald,sans-serif'}}>
            FOOTBALL BETTING<br/>TIPS & GUIDES
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-6">Expert betting tips, best site reviews, free bet offers and responsible gambling resources. Everything you need to bet smarter.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/betting/predictions" className="bg-[#E63946] hover:bg-[#c0303c] text-white font-bold px-6 py-3 rounded-xl transition-all" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
              🔮 TODAY'S PREDICTIONS
            </Link>
            <Link href="/betting/free-bets" className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-all border border-white/20">
              💰 FREE BETS
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdSlot position="banner" className="mb-8"/>

        {/* Quick links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {QUICK_LINKS.map(q => (
            <Link key={q.href} href={q.href}
              className="bg-white rounded-xl border border-slate-100 hover:border-[#E63946]/30 hover:shadow-md transition-all p-4 group">
              <span className="text-2xl mb-2 block">{q.icon}</span>
              <p className="font-bold text-slate-900 text-sm group-hover:text-[#E63946] transition-colors">{q.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{q.desc}</p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Top betting sites */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
                  <span className="w-1 h-6 bg-[#E63946] rounded-full"/>TOP BETTING SITES
                </h2>
                <Link href="/betting/best-betting-sites" className="text-[#E63946] text-sm font-semibold hover:text-[#c0303c]">See all →</Link>
              </div>
              <div className="space-y-3">
                {FEATURED_SITES.map((site, i) => (
                  <div key={site.name} className="bg-white rounded-2xl border border-slate-100 hover:border-[#E63946]/20 hover:shadow-md transition-all p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-black text-slate-900 text-lg" style={{fontFamily:'Oswald,sans-serif'}}>{site.name}</h3>
                          {site.tag && <span className="bg-[#E63946] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{site.tag}</span>}
                        </div>
                        <p className="text-sm text-slate-500">{site.highlight}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1 justify-end mb-1">
                          {'★★★★★'.split('').map((s,idx) => (
                            <span key={idx} className={`text-sm ${idx < Math.floor(site.rating) ? 'text-yellow-400' : 'text-slate-200'}`}>★</span>
                          ))}
                          <span className="text-sm font-bold text-slate-700 ml-1">{site.rating}</span>
                        </div>
                        <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded mb-2">{site.bonus}</div>
                        <Link href={site.href} className="bg-[#E63946] hover:bg-[#c0303c] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all inline-block" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
                          CLAIM OFFER
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <AdSlot position="in-article"/>

            {/* Today's tips preview */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
                  <span className="w-1 h-6 bg-emerald-500 rounded-full"/>TODAY'S TOP TIPS
                </h2>
                <Link href="/betting/predictions" className="text-[#E63946] text-sm font-semibold">All tips →</Link>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                {[
                  {home:'Arsenal',away:'Man City',pick:'Both Teams to Score',odds:'1.72',conf:'High'},
                  {home:'Barcelona',away:'Atletico',pick:'Over 2.5 Goals',odds:'1.85',conf:'High'},
                  {home:'Bayern',away:'Dortmund',pick:'Bayern to Win',odds:'1.55',conf:'Medium'},
                  {home:'PSG',away:'Lyon',pick:'PSG -1 Handicap',odds:'2.10',conf:'Medium'},
                ].map((tip, i) => (
                  <div key={i} className={`px-5 py-4 flex items-center gap-4 ${i > 0 ? 'border-t border-slate-50' : ''} hover:bg-slate-50 transition-colors`}>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 text-sm">{tip.home} vs {tip.away}</p>
                      <p className="text-[#E63946] text-xs font-semibold mt-0.5">{tip.pick}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-slate-900 text-white font-black text-sm px-3 py-1 rounded-lg">{tip.odds}</div>
                    </div>
                    <div className={`text-xs font-bold px-2.5 py-1 rounded-full ${tip.conf === 'High' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {tip.conf}
                    </div>
                  </div>
                ))}
                <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
                  <Link href="/betting/predictions" className="bg-[#E63946] hover:bg-[#c0303c] text-white font-bold px-8 py-2.5 rounded-xl text-sm transition-all inline-block" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
                    VIEW ALL PREDICTIONS
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <AdSlot position="sidebar"/>
            <div className="bg-[#0D1117] rounded-2xl p-5 text-white">
              <h3 className="font-bold text-base mb-3 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>🛡️ RESPONSIBLE GAMBLING</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">Gambling should always be fun. Never bet more than you can afford to lose. If gambling stops being enjoyable, seek help immediately.</p>
              <Link href="/betting/responsible-gambling" className="block text-center bg-white/10 hover:bg-white/20 text-white text-sm font-bold py-2.5 rounded-xl transition-all border border-white/10">
                Read Our Guide →
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <h3 className="font-bold text-slate-900 mb-3 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>BETTING GUIDES</h3>
              <nav className="space-y-2">
                {[["Guide to Betway",'/betting/guide-betway'],["Guide to Hollywoodbets",'/betting/guide-hollywoodbets'],["Guide to Betfred",'/betting/guide-betfred'],["Betting Glossary A-Z",'/betting/glossary'],["How We Rate Sites",'/betting/how-we-produce-content']].map(([l,h]) => (
                  <Link key={h} href={h} className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#E63946] transition-colors py-1 border-b border-slate-50">
                    <span className="text-[#E63946]">→</span>{l}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
