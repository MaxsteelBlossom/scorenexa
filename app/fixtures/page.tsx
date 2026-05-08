import type { Metadata } from 'next'
import { getTodayFixtures } from '@/lib/sports/adapter'
import AdSlot from '@/components/ui/AdSlot'
import { Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Football Fixtures – Upcoming Match Schedule',
  description: 'Upcoming football fixtures for Premier League, La Liga, Champions League and more. Never miss a match.',
}
export const revalidate = 3600

export default async function FixturesPage() {
  const matches = await getTodayFixtures()
  const upcoming = matches.filter(m => m.status === 'NS')
  const byLeague = upcoming.reduce<Record<string, typeof upcoming>>((acc, m) => {
    if (!acc[m.league]) acc[m.league] = []
    acc[m.league].push(m)
    return acc
  }, {})

  const days = Array.from({length: 7}, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
          <Calendar size={28} className="text-blue-600"/> FIXTURES
        </h1>
        <p className="text-slate-500 text-sm mt-1">Upcoming match schedule across European football</p>
      </div>

      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {days.map((d, i) => (
          <button key={i} className={`flex-shrink-0 flex flex-col items-center px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${i === 0 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'}`}>
            <span className="text-xs opacity-70">{i === 0 ? 'TODAY' : d.toLocaleDateString('en-GB',{weekday:'short'}).toUpperCase()}</span>
            <span className="font-bold">{d.getDate()}</span>
          </button>
        ))}
      </div>

      <AdSlot position="banner" className="mb-6"/>

      <div className="space-y-6">
        {Object.entries(byLeague).length > 0 ? Object.entries(byLeague).map(([league, ms]) => (
          <div key={league} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-[#0f1f5c] to-[#1d4ed8] px-5 py-3">
              <h2 className="text-white font-bold" style={{fontFamily:'Oswald,sans-serif'}}>{league}</h2>
            </div>
            <div className="divide-y divide-slate-50">
              {ms.map(m => (
                <div key={m.id} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className="w-14 text-center flex-shrink-0">
                    <p className="text-blue-600 font-bold text-sm">{new Date(m.kickoffTime).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</p>
                    <p className="text-slate-400 text-xs">KO</p>
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-2 items-center">
                    <p className="text-right font-semibold text-slate-800 text-sm">{m.homeTeam}</p>
                    <div className="text-center">
                      <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-lg">vs</span>
                    </div>
                    <p className="text-left font-semibold text-slate-800 text-sm">{m.awayTeam}</p>
                  </div>
                  {m.venue && <p className="text-xs text-slate-400 flex-shrink-0 hidden md:block w-32 truncate text-right">{m.venue}</p>}
                </div>
              ))}
            </div>
          </div>
        )) : (
          // Fallback fixture display when no API
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-[#0f1f5c] to-[#1d4ed8] px-5 py-3">
              <h2 className="text-white font-bold" style={{fontFamily:'Oswald,sans-serif'}}>Premier League</h2>
            </div>
            {[
              {home:'Arsenal',away:'Tottenham',time:'12:30'},
              {home:'Manchester City',away:'Chelsea',time:'15:00'},
              {home:'Liverpool',away:'Newcastle',time:'17:30'},
              {home:'Manchester United',away:'West Ham',time:'20:00'},
            ].map((f,i) => (
              <div key={i} className="px-5 py-4 flex items-center gap-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <div className="w-14 text-center flex-shrink-0">
                  <p className="text-blue-600 font-bold text-sm">{f.time}</p>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-2 items-center">
                  <p className="text-right font-semibold text-slate-800 text-sm">{f.home}</p>
                  <div className="text-center"><span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-lg">vs</span></div>
                  <p className="text-left font-semibold text-slate-800 text-sm">{f.away}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
