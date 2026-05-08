import type { Metadata } from 'next'
import Link from 'next/link'
import { getStandings } from '@/lib/sports/adapter'
import AdSlot from '@/components/ui/AdSlot'

const LEAGUE_DATA: Record<string, {name:string;flag:string;country:string;apiId:number;desc:string}> = {
  'premier-league': { name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: 'England', apiId: 39, desc: "The Premier League is the top level of the English football league system. Contested by 20 clubs, it operates on a system of promotion and relegation with the English Football League." },
  'la-liga': { name: 'La Liga', flag: '🇪🇸', country: 'Spain', apiId: 140, desc: 'La Liga is the top professional football division of the Spanish football league system. It is contested by 20 teams, with the three lowest-placed teams being relegated at the end of each season.' },
  'bundesliga': { name: 'Bundesliga', flag: '🇩🇪', country: 'Germany', apiId: 78, desc: 'The Bundesliga is a professional association football league in Germany and the football league with the highest average stadium attendance worldwide.' },
  'champions-league': { name: 'Champions League', flag: '🏆', country: 'Europe', apiId: 2, desc: 'The UEFA Champions League is the most prestigious club football competition in the world, featuring the top clubs from across European leagues.' },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const league = LEAGUE_DATA[params.slug]
  if (!league) return { title: 'League Not Found' }
  return {
    title: `${league.name} Table, News & Fixtures`,
    description: league.desc,
  }
}

export default async function LeaguePage({ params }: { params: { slug: string } }) {
  const league = LEAGUE_DATA[params.slug] || { name: params.slug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()), flag: '🏆', country: '', apiId: 39, desc: '' }
  const standings = await getStandings(league.apiId)
  const formColors: Record<string, string> = { W: 'bg-emerald-500', D: 'bg-slate-300', L: 'bg-red-500' }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <span className="text-5xl">{league.flag}</span>
        <div>
          <h1 className="text-3xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>{league.name}</h1>
          <p className="text-slate-500 text-sm">{league.country} · 2024/25 Season</p>
        </div>
      </div>
      <AdSlot position="banner" className="mb-6"/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-[#0f1f5c] to-[#1d4ed8] px-5 py-4">
              <h2 className="text-white font-bold" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>STANDINGS 2024/25</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="pl-4 py-3 text-left">#</th>
                    <th className="py-3 text-left">Club</th>
                    <th className="py-3 text-center">P</th>
                    <th className="py-3 text-center">W</th>
                    <th className="py-3 text-center">D</th>
                    <th className="py-3 text-center">L</th>
                    <th className="py-3 text-center">GD</th>
                    <th className="py-3 text-center font-bold text-slate-700">Pts</th>
                    <th className="py-3 pr-4 text-right hidden sm:table-cell">Form</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {standings.map((s,i) => (
                    <tr key={i} className={`hover:bg-slate-50 transition-colors ${i<4?'border-l-4 border-l-blue-500':i<6?'border-l-4 border-l-orange-400':''}`}>
                      <td className="pl-4 py-3 font-bold text-slate-400">{s.position}</td>
                      <td className="py-3 font-semibold text-slate-800">{s.team}</td>
                      <td className="py-3 text-center text-slate-600">{s.played}</td>
                      <td className="py-3 text-center text-slate-600">{s.won}</td>
                      <td className="py-3 text-center text-slate-600">{s.drawn}</td>
                      <td className="py-3 text-center text-slate-600">{s.lost}</td>
                      <td className="py-3 text-center text-slate-600">{s.gd>0?`+${s.gd}`:s.gd}</td>
                      <td className="py-3 text-center font-bold text-slate-900 text-base">{s.points}</td>
                      <td className="py-3 pr-4 hidden sm:table-cell">
                        <div className="flex gap-0.5 justify-end">
                          {(s.form||'').split('').slice(-5).map((f,fi)=>(
                            <span key={fi} className={`w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center font-bold ${formColors[f]||'bg-slate-200'}`}>{f}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <aside className="space-y-5">
          <AdSlot position="sidebar"/>
          {league.desc && (
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <h3 className="font-bold text-slate-800 mb-2 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>ABOUT {league.name.toUpperCase()}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{league.desc}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
