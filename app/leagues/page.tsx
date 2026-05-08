import type { Metadata } from 'next'
import Link from 'next/link'
import AdSlot from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: 'Football Leagues – All Competitions & Tables',
  description: "Browse all major football leagues. Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Champions League and more.",
}

const LEAGUES = [
  { name: 'Premier League', slug: 'premier-league', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', teams: 20, desc: "The world's most-watched football league" },
  { name: 'La Liga', slug: 'la-liga', country: 'Spain', flag: '🇪🇸', teams: 20, desc: 'Home to Real Madrid and Barcelona' },
  { name: 'Bundesliga', slug: 'bundesliga', country: 'Germany', flag: '🇩🇪', teams: 18, desc: 'Europe\'s highest average attendance' },
  { name: 'Serie A', slug: 'serie-a', country: 'Italy', flag: '🇮🇹', teams: 20, desc: 'The birthplace of tactical football' },
  { name: 'Ligue 1', slug: 'ligue-1', country: 'France', flag: '🇫🇷', teams: 18, desc: 'France\'s elite football division' },
  { name: 'Champions League', slug: 'champions-league', country: 'Europe', flag: '🏆', teams: 36, desc: 'The pinnacle of European club football' },
  { name: 'Europa League', slug: 'europa-league', country: 'Europe', flag: '🥈', teams: 36, desc: 'Europe\'s second major club competition' },
  { name: 'MLS', slug: 'mls', country: 'USA/Canada', flag: '🇺🇸', teams: 30, desc: "North America's top football league" },
  { name: 'Eredivisie', slug: 'eredivisie', country: 'Netherlands', flag: '🇳🇱', teams: 18, desc: 'Famous for producing world-class talent' },
  { name: 'Primeira Liga', slug: 'primeira-liga', country: 'Portugal', flag: '🇵🇹', teams: 18, desc: 'Portugal\'s top football division' },
  { name: 'Championship', slug: 'championship', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', teams: 24, desc: 'The world\'s most competitive second division' },
  { name: 'Scottish Premiership', slug: 'scottish-premiership', country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', teams: 12, desc: 'Scotland\'s premier division' },
]

const REGIONS = ['All','England','Spain','Germany','Italy','France','Europe','USA/Canada','Netherlands','Portugal']

export default function LeaguesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>🏆 ALL LEAGUES</h1>
        <p className="text-slate-500 text-sm mt-1">Explore every major competition and follow your favourite league</p>
      </div>
      <AdSlot position="banner" className="mb-6"/>
      <div className="flex gap-2 flex-wrap mb-6">
        {REGIONS.map(r => (
          <button key={r} className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${r === 'All' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700'}`}>{r}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LEAGUES.map(l => (
          <Link key={l.slug} href={`/leagues/${l.slug}`}
            className="bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all p-5 group">
            <div className="flex items-start justify-between mb-3">
              <span className="text-4xl">{l.flag}</span>
              <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">{l.teams} clubs</span>
            </div>
            <h2 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors" style={{fontFamily:'Oswald,sans-serif'}}>{l.name}</h2>
            <p className="text-sm text-slate-500 mt-0.5">{l.country}</p>
            <p className="text-xs text-slate-400 mt-2">{l.desc}</p>
            <div className="mt-4 flex items-center gap-3 text-xs font-medium">
              <span className="text-blue-600 group-hover:text-blue-700">Standings →</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">News</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">Fixtures</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
