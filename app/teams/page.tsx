import type { Metadata } from 'next'
import Link from 'next/link'
import AdSlot from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: 'Football Teams – Clubs, Squads & Stats',
  description: 'Browse football teams from the Premier League, La Liga, Bundesliga and beyond. Squad news, results and statistics.',
}

const TOP_CLUBS = [
  { name:'Manchester City', slug:'man-city', league:'Premier League', country:'England', founded:1880, stadium:'Etihad Stadium', capacity:'53,400' },
  { name:'Arsenal', slug:'arsenal', league:'Premier League', country:'England', founded:1886, stadium:'Emirates Stadium', capacity:'60,704' },
  { name:'Liverpool', slug:'liverpool', league:'Premier League', country:'England', founded:1892, stadium:'Anfield', capacity:'61,276' },
  { name:'Manchester United', slug:'man-utd', league:'Premier League', country:'England', founded:1878, stadium:'Old Trafford', capacity:'74,310' },
  { name:'Chelsea', slug:'chelsea', league:'Premier League', country:'England', founded:1905, stadium:'Stamford Bridge', capacity:'40,343' },
  { name:'Tottenham', slug:'tottenham', league:'Premier League', country:'England', founded:1882, stadium:'Tottenham Hotspur Stadium', capacity:'62,062' },
  { name:'Real Madrid', slug:'real-madrid', league:'La Liga', country:'Spain', founded:1902, stadium:'Santiago Bernabéu', capacity:'81,044' },
  { name:'Barcelona', slug:'barcelona', league:'La Liga', country:'Spain', founded:1899, stadium:'Spotify Camp Nou', capacity:'99,354' },
  { name:'Bayern Munich', slug:'bayern-munich', league:'Bundesliga', country:'Germany', founded:1900, stadium:'Allianz Arena', capacity:'75,024' },
  { name:'Paris Saint-Germain', slug:'psg', league:'Ligue 1', country:'France', founded:1970, stadium:'Parc des Princes', capacity:'47,929' },
  { name:'Juventus', slug:'juventus', league:'Serie A', country:'Italy', founded:1897, stadium:'Allianz Stadium', capacity:'41,507' },
  { name:'AC Milan', slug:'ac-milan', league:'Serie A', country:'Italy', founded:1899, stadium:'San Siro', capacity:'75,817' },
]

export default function TeamsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>🛡️ TEAMS</h1>
        <p className="text-slate-500 text-sm mt-1">Explore clubs, squads, stats and the latest news</p>
      </div>
      <AdSlot position="banner" className="mb-6"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOP_CLUBS.map(t => (
          <Link key={t.slug} href={`/teams/${t.slug}`}
            className="bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all p-5 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center text-2xl font-bold text-blue-900 border border-blue-100">
                {t.name[0]}
              </div>
              <div>
                <h2 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors" style={{fontFamily:'Oswald,sans-serif'}}>{t.name}</h2>
                <p className="text-xs text-slate-500">{t.league} · {t.country}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
              <span>🏟️ {t.stadium}</span>
              <span>👥 {t.capacity}</span>
              <span>📅 Est. {t.founded}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
