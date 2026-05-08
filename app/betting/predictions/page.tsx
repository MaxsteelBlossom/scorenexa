import type { Metadata } from 'next'
import Link from 'next/link'
import AdSlot from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: "Today's Football Predictions & Betting Tips – ScoreNexa",
  description: "Expert football predictions and betting tips for today's matches. Premier League, La Liga, Champions League and more. Free tips updated daily.",
  keywords: ['football predictions today','betting tips','football tips','accumulator tips','Premier League predictions','Champions League tips'],
}

const TODAY = new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' })

const TIPS = [
  { league:'Premier League', home:'Arsenal', away:'Manchester City', time:'12:30', pick:'Both Teams to Score', detail:'Arsenal have scored in 9 of their last 10 home games. Man City have conceded in 7 of their last 10 away matches.', odds:'1.72', conf:5, type:'btts' },
  { league:'La Liga', home:'Barcelona', away:'Atletico Madrid', time:'16:00', pick:'Over 2.5 Goals', detail:'Barcelona\'s last 6 home La Liga games have all produced 3+ goals. Atletico are struggling defensively away from home.', odds:'1.85', conf:4, type:'goals' },
  { league:'Bundesliga', home:'Bayern Munich', away:'Borussia Dortmund', time:'14:30', pick:'Bayern Munich to Win', detail:'Bayern are unbeaten in their last 11 home Bundesliga games. Dortmund have lost 4 of their last 6 away matches.', odds:'1.55', conf:5, type:'result' },
  { league:'Champions League', home:'Real Madrid', away:'Man City', time:'20:00', pick:'Over 2.5 Goals', detail:'Real Madrid vs Man City fixtures have averaged 3.8 goals over the last 5 meetings. Both sides in excellent attacking form.', odds:'1.65', conf:4, type:'goals' },
  { league:'Serie A', home:'Inter Milan', away:'AC Milan', time:'20:45', pick:'Inter Milan -0.5', detail:'Inter lead Serie A and are dominant at the San Siro this season with 8 wins from 10 home matches.', odds:'1.80', conf:3, type:'result' },
  { league:'Ligue 1', home:'PSG', away:'Lyon', time:'20:00', pick:'PSG to Win & Over 2.5', detail:'PSG have won their last 7 home Ligue 1 fixtures, scoring 3+ goals in 5 of them.', odds:'2.10', conf:4, type:'combo' },
]

const confLabel = (c: number) => {
  if (c >= 5) return { label: '★★★★★ Very High', color: 'bg-emerald-100 text-emerald-700' }
  if (c >= 4) return { label: '★★★★☆ High', color: 'bg-blue-100 text-blue-700' }
  return { label: '★★★☆☆ Medium', color: 'bg-yellow-100 text-yellow-700' }
}

const typeColor: Record<string, string> = {
  btts: 'bg-purple-100 text-purple-700',
  goals: 'bg-orange-100 text-orange-700',
  result: 'bg-blue-100 text-blue-700',
  combo: 'bg-emerald-100 text-emerald-700',
}
const typeLabel: Record<string, string> = { btts:'BTTS', goals:'Goals', result:'Result', combo:'Combo' }

export default function PredictionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link href="/betting" className="hover:text-[#E63946]">Betting</Link>
          <span>›</span><span>Predictions</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>🔮 TODAY'S FOOTBALL PREDICTIONS</h1>
        <p className="text-slate-500 text-sm mt-1">{TODAY} · {TIPS.length} expert tips across top European leagues</p>
      </div>

      <AdSlot position="banner" className="mb-6"/>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {TIPS.map((tip, i) => {
            const conf = confLabel(tip.conf)
            return (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-all overflow-hidden">
                <div className="bg-slate-900 px-5 py-2 flex items-center justify-between">
                  <span className="text-slate-300 text-xs font-semibold">{tip.league}</span>
                  <span className="text-slate-400 text-xs">{tip.time} KO</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h2 className="font-black text-slate-900 text-lg" style={{fontFamily:'Oswald,sans-serif'}}>{tip.home} vs {tip.away}</h2>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="bg-slate-900 text-white font-black text-xl px-4 py-2 rounded-xl">{tip.odds}</div>
                      <p className="text-xs text-slate-400 mt-1">Best odds</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeColor[tip.type]}`}>{typeLabel[tip.type]}</span>
                    <span className="text-[#E63946] font-black text-sm">📌 {tip.pick}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{tip.detail}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${conf.color}`}>{conf.label}</span>
                    <Link href="/betting/best-betting-sites"
                      className="bg-[#E63946] hover:bg-[#c0303c] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                      style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
                      BET NOW
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
            <strong>⚠️ Betting Disclaimer:</strong> All tips are for informational purposes only. ScoreNexa does not guarantee results. Odds are subject to change. Please gamble responsibly. 18+ only. <Link href="/betting/responsible-gambling" className="underline">Responsible Gambling →</Link>
          </div>
        </div>

        <aside className="space-y-5">
          <AdSlot position="sidebar"/>
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <h3 className="font-bold text-slate-900 mb-3 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>MORE TIPS</h3>
            <nav className="space-y-1">
              {[["Accumulator Tips",'/betting/accumulators'],["BTTS Tips",'/betting/btts-tips'],["Weekend Tips",'/betting/predictions'],["Free Bet Offers",'/betting/free-bets'],["Best Odds Sites",'/betting/best-betting-sites']].map(([l,h]) => (
                <Link key={h} href={h} className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#E63946] py-2 border-b border-slate-50 transition-colors">
                  <span className="text-[#E63946] font-bold">→</span>{l}
                </Link>
              ))}
            </nav>
          </div>
          <div className="bg-[#0D1117] rounded-2xl p-4 text-white text-center">
            <p className="text-2xl mb-2">🛡️</p>
            <p className="text-xs text-slate-400 leading-relaxed">Please gamble responsibly. Never chase losses. Set deposit limits with your bookmaker.</p>
            <Link href="/betting/responsible-gambling" className="text-[#E63946] text-xs font-bold mt-2 inline-block hover:underline">Get Help →</Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
