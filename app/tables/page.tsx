import type { Metadata } from 'next'
import { getStandings } from '@/lib/sports/adapter'
import AdSlot from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: 'Football League Tables – Standings & Points',
  description: 'Up-to-date league tables for Premier League, La Liga, Bundesliga, Serie A, Ligue 1 and Champions League.',
}
export const revalidate = 600

const LEAGUES = [
  { name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', country: 'England', apiId: 39 },
  { name: 'La Liga', flag: '🇪🇸', country: 'Spain', apiId: 140 },
  { name: 'Bundesliga', flag: '🇩🇪', country: 'Germany', apiId: 78 },
  { name: 'Serie A', flag: '🇮🇹', country: 'Italy', apiId: 135 },
  { name: 'Ligue 1', flag: '🇫🇷', country: 'France', apiId: 61 },
]

const formColors: Record<string, string> = { W: 'bg-emerald-500', D: 'bg-slate-300', L: 'bg-red-500' }

async function LeagueTable({ name, flag, apiId }: { name: string; flag: string; apiId: number }) {
  const standings = await getStandings(apiId)
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-[#0f1f5c] to-[#1d4ed8] px-5 py-4 flex items-center justify-between">
        <h2 className="text-white font-bold flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif',fontSize:'1.1rem',letterSpacing:'0.05em'}}>
          <span>{flag}</span> {name}
        </h2>
        <span className="text-blue-300 text-xs">2024/25 Season</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="pl-4 py-3 text-left w-8">#</th>
              <th className="py-3 text-left">Club</th>
              <th className="py-3 text-center w-10">MP</th>
              <th className="py-3 text-center w-10">W</th>
              <th className="py-3 text-center w-10">D</th>
              <th className="py-3 text-center w-10">L</th>
              <th className="py-3 text-center w-10 hidden md:table-cell">GF</th>
              <th className="py-3 text-center w-10 hidden md:table-cell">GA</th>
              <th className="py-3 text-center w-10">GD</th>
              <th className="py-3 text-center w-12 font-bold text-slate-700">Pts</th>
              <th className="py-3 pr-4 text-right w-28 hidden sm:table-cell">Form</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {standings.map((s, i) => {
              const clBorder = i < 4 ? 'border-l-4 border-l-blue-500' : i < 6 ? 'border-l-4 border-l-orange-400' : i > standings.length - 4 ? 'border-l-4 border-l-red-500' : ''
              return (
                <tr key={i} className={`hover:bg-slate-50 transition-colors ${clBorder}`}>
                  <td className="pl-4 py-3 font-bold text-slate-500 text-sm">{s.position}</td>
                  <td className="py-3 font-semibold text-slate-800">{s.team}</td>
                  <td className="py-3 text-center text-slate-600">{s.played}</td>
                  <td className="py-3 text-center text-slate-600">{s.won}</td>
                  <td className="py-3 text-center text-slate-600">{s.drawn}</td>
                  <td className="py-3 text-center text-slate-600">{s.lost}</td>
                  <td className="py-3 text-center text-slate-600 hidden md:table-cell">{s.gf}</td>
                  <td className="py-3 text-center text-slate-600 hidden md:table-cell">{s.ga}</td>
                  <td className="py-3 text-center text-slate-600">{s.gd > 0 ? `+${s.gd}` : s.gd}</td>
                  <td className="py-3 text-center font-bold text-slate-900 text-base">{s.points}</td>
                  <td className="py-3 pr-4 hidden sm:table-cell">
                    <div className="flex gap-0.5 justify-end">
                      {(s.form || '').split('').slice(-5).map((f, fi) => (
                        <span key={fi} className={`w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center font-bold ${formColors[f] || 'bg-slate-200'}`}>{f}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-slate-50 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400 border-t border-slate-100">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-blue-500 rounded inline-block"/>Champions League</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-orange-400 rounded inline-block"/>Europa League</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-red-500 rounded inline-block"/>Relegation</span>
      </div>
    </div>
  )
}

export default async function TablesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>📊 LEAGUE TABLES</h1>
        <p className="text-slate-500 text-sm mt-1">Current standings across Europe's top divisions</p>
      </div>
      <AdSlot position="banner" className="mb-6"/>
      <div className="space-y-8">
        {LEAGUES.map(l => (
          <LeagueTable key={l.apiId} name={l.name} flag={l.flag} apiId={l.apiId}/>
        ))}
      </div>
    </div>
  )
}
