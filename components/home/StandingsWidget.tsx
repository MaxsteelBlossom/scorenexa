import Link from 'next/link'
import { getStandings } from '@/lib/sports/adapter'

export default async function StandingsWidget() {
  const standings = await getStandings()
  const top8 = standings.slice(0, 8)

  const formColors: Record<string, string> = { W: 'bg-green-500', D: 'bg-slate-400', L: 'bg-red-500' }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-[#0f1f5c] to-[#1d4ed8] px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-bold text-sm" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>🏴󠁧󠁢󠁥󠁮󠁧󠁿 PREMIER LEAGUE TABLE</h3>
        <Link href="/tables" className="text-blue-200 hover:text-white text-xs transition-colors">Full Table →</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider">
              <th className="pl-3 py-2 text-left w-6">#</th>
              <th className="py-2 text-left">Team</th>
              <th className="py-2 text-center">P</th>
              <th className="py-2 text-center">W</th>
              <th className="py-2 text-center">D</th>
              <th className="py-2 text-center">L</th>
              <th className="py-2 text-center">GD</th>
              <th className="py-2 text-center font-bold text-slate-700">Pts</th>
              <th className="py-2 pr-3 text-right hidden sm:table-cell">Form</th>
            </tr>
          </thead>
          <tbody>
            {top8.map((s, i) => (
              <tr key={i} className={`border-t border-slate-50 hover:bg-slate-50 transition-colors ${i < 4 ? 'border-l-2 border-l-blue-500' : i < 6 ? 'border-l-2 border-l-orange-400' : ''}`}>
                <td className="pl-3 py-2.5 font-bold text-slate-500">{s.position}</td>
                <td className="py-2.5 font-semibold text-slate-800 max-w-[100px] truncate">{s.team}</td>
                <td className="py-2.5 text-center text-slate-600">{s.played}</td>
                <td className="py-2.5 text-center text-slate-600">{s.won}</td>
                <td className="py-2.5 text-center text-slate-600">{s.drawn}</td>
                <td className="py-2.5 text-center text-slate-600">{s.lost}</td>
                <td className="py-2.5 text-center text-slate-600">{s.gd > 0 ? `+${s.gd}` : s.gd}</td>
                <td className="py-2.5 text-center font-bold text-slate-900">{s.points}</td>
                <td className="py-2.5 pr-3 hidden sm:table-cell">
                  <div className="flex gap-0.5 justify-end">
                    {(s.form || '').split('').slice(-5).map((f, fi) => (
                      <span key={fi} className={`w-3.5 h-3.5 rounded-full text-white text-[8px] flex items-center justify-center font-bold ${formColors[f] || 'bg-slate-300'}`}>{f}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-3 py-2 bg-slate-50 flex gap-4 text-[10px] text-slate-400">
        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full inline-block"/>Champions League</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-orange-400 rounded-full inline-block"/>Europa League</span>
      </div>
    </div>
  )
}
