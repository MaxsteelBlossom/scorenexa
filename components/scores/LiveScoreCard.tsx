import { getStatusLabel, getStatusColor } from '@/lib/utils'
import Image from 'next/image'

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number | null
  awayScore: number | null
  status: string
  minute: number | null
  kickoffTime: string
  league: string
  homeTeamLogo: string
  awayTeamLogo: string
  venue: string
}

export default function LiveScoreCard({ match }: { match: Match }) {
  const isLive = match.status === 'LIVE' || match.status === '1H' || match.status === '2H' || match.status === 'HT'
  const statusLabel = getStatusLabel(match.status, match.minute)

  return (
    <div className={`bg-white rounded-xl border ${isLive ? 'border-red-200 shadow-md shadow-red-50' : 'border-slate-100'} p-4 hover:shadow-lg transition-all group cursor-pointer`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-500 font-medium">{match.league}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isLive ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
          {statusLabel}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center justify-end gap-2">
          <span className="text-sm font-bold text-slate-800 text-right leading-tight">{match.homeTeam}</span>
          {match.homeTeamLogo && (
            <div className="relative w-7 h-7 flex-shrink-0">
              <Image src={match.homeTeamLogo} alt={match.homeTeam} fill className="object-contain" />
            </div>
          )}
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg min-w-[60px] justify-center ${isLive ? 'bg-red-50 border border-red-100' : 'bg-slate-50'}`}>
          {match.homeScore !== null ? (
            <span className="text-lg font-bold text-slate-900">{match.homeScore} - {match.awayScore}</span>
          ) : (
            <span className="text-xs text-slate-400 font-medium">
              {new Date(match.kickoffTime).toLocaleTimeString('en-GB', {hour:'2-digit',minute:'2-digit'})}
            </span>
          )}
        </div>
        <div className="flex-1 flex items-center gap-2">
          {match.awayTeamLogo && (
            <div className="relative w-7 h-7 flex-shrink-0">
              <Image src={match.awayTeamLogo} alt={match.awayTeam} fill className="object-contain" />
            </div>
          )}
          <span className="text-sm font-bold text-slate-800 leading-tight">{match.awayTeam}</span>
        </div>
      </div>
      {match.venue && <p className="text-xs text-slate-400 text-center mt-2">{match.venue}</p>}
    </div>
  )
}
