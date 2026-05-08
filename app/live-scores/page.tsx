import type { Metadata } from 'next'
import { getTodayFixtures } from '@/lib/sports/adapter'
import LiveScoreCard from '@/components/scores/LiveScoreCard'
import AdSlot from '@/components/ui/AdSlot'
import { Zap, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Live Football Scores – Real-Time Results Today',
  description: 'Follow live football scores from Premier League, La Liga, Champions League, Bundesliga and more. Updated in real-time.',
}

export const revalidate = 60

const LEAGUES_ORDER = ['Premier League', 'La Liga', 'Champions League', 'Bundesliga', 'Serie A', 'Ligue 1']

export default async function LiveScoresPage() {
  const matches = await getTodayFixtures()

  const liveMatches = matches.filter(m => ['LIVE','1H','2H','HT','ET','P'].includes(m.status))
  const finishedMatches = matches.filter(m => m.status === 'FT')
  const upcomingMatches = matches.filter(m => m.status === 'NS')

  const groupByLeague = (arr: typeof matches) =>
    arr.reduce<Record<string, typeof matches>>((acc, m) => {
      if (!acc[m.league]) acc[m.league] = []
      acc[m.league].push(m)
      return acc
    }, {})

  const liveByLeague = groupByLeague(liveMatches)
  const finishedByLeague = groupByLeague(finishedMatches)
  const upcomingByLeague = groupByLeague(upcomingMatches)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
            <Zap className="text-red-500" size={28}/>
            LIVE SCORES
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})} · Updated every 60s
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
          <RefreshCw size={14}/> Refresh
        </button>
      </div>

      <AdSlot position="banner" className="mb-6"/>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          {/* Live now */}
          {liveMatches.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4" style={{fontFamily:'Oswald,sans-serif'}}>
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse inline-block"/>
                LIVE NOW ({liveMatches.length})
              </h2>
              {Object.entries(liveByLeague).map(([league, ms]) => (
                <div key={league} className="mb-5">
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <span className="text-sm font-bold text-slate-700">{league}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ms.map(m => <LiveScoreCard key={m.id} match={m}/>)}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Upcoming */}
          {upcomingMatches.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4" style={{fontFamily:'Oswald,sans-serif'}}>⏰ UPCOMING TODAY</h2>
              {Object.entries(upcomingByLeague).map(([league, ms]) => (
                <div key={league} className="mb-5">
                  <p className="text-sm font-bold text-slate-600 mb-2 px-1">{league}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ms.map(m => <LiveScoreCard key={m.id} match={m}/>)}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Finished */}
          {finishedMatches.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4" style={{fontFamily:'Oswald,sans-serif'}}>✅ FINAL RESULTS</h2>
              {Object.entries(finishedByLeague).map(([league, ms]) => (
                <div key={league} className="mb-5">
                  <p className="text-sm font-bold text-slate-600 mb-2 px-1">{league}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ms.map(m => <LiveScoreCard key={m.id} match={m}/>)}
                  </div>
                </div>
              ))}
            </section>
          )}

          {matches.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
              <div className="text-5xl mb-4">⚽</div>
              <h3 className="text-xl font-bold text-slate-700 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>No Matches Today</h3>
              <p className="text-slate-400">Check back later or browse upcoming fixtures.</p>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <AdSlot position="sidebar"/>
          <div className="bg-white rounded-2xl border border-slate-100 p-4 sticky top-24">
            <h3 className="font-bold text-slate-800 mb-3 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>COMPETITIONS</h3>
            <nav className="space-y-1">
              {['Premier League','La Liga','Champions League','Bundesliga','Serie A','Ligue 1','Europa League','MLS','Eredivisie'].map(l => (
                <button key={l} className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-700 rounded-lg transition-colors font-medium">
                  {l}
                </button>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  )
}
