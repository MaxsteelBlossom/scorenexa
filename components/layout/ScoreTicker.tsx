'use client'
import { Zap } from 'lucide-react'

const MOCK_TICKER = [
  { homeTeam:'Arsenal', awayTeam:'Man City', homeScore:1, awayScore:2, status:'LIVE', minute:67, league:'PL' },
  { homeTeam:'Barcelona', awayTeam:'Real Madrid', homeScore:0, awayScore:0, status:'LIVE', minute:34, league:'LaLiga' },
  { homeTeam:'Bayern', awayTeam:'Dortmund', homeScore:3, awayScore:1, status:'FT', minute:90, league:'BL' },
  { homeTeam:'Liverpool', awayTeam:'Chelsea', homeScore:2, awayScore:2, status:'FT', minute:90, league:'PL' },
  { homeTeam:'PSG', awayTeam:'Lyon', homeScore:null, awayScore:null, status:'18:00', minute:null, league:'L1' },
  { homeTeam:'Inter', awayTeam:'AC Milan', homeScore:1, awayScore:0, status:'HT', minute:45, league:'SA' },
  { homeTeam:'Juventus', awayTeam:'Napoli', homeScore:null, awayScore:null, status:'20:45', minute:null, league:'SA' },
  { homeTeam:'Atletico', awayTeam:'Sevilla', homeScore:2, awayScore:0, status:"67'", minute:67, league:'LaLiga' },
]

export default function ScoreTicker() {
  // Duplicate for seamless loop
  const items = [...MOCK_TICKER, ...MOCK_TICKER]
  return (
    <div className="bg-black border-b border-white/5 overflow-hidden" style={{height:'30px'}}>
      <div className="flex items-center" style={{height:'30px'}}>
        {/* LIVE badge */}
        <div
          className="flex-shrink-0 flex items-center gap-1 bg-[#E63946] text-white font-black px-2.5"
          style={{height:'30px', fontFamily:'Oswald,sans-serif', letterSpacing:'0.1em', fontSize:'10px'}}>
          <Zap size={9} className="animate-pulse" />LIVE
        </div>
        {/* Scrolling track */}
        <div className="flex-1 overflow-hidden" style={{height:'30px'}}>
          <div className="ticker-content flex items-center" style={{height:'30px'}}>
            {items.map((m, i) => {
              const isLive = m.status === 'LIVE' || m.status === 'HT'
              const score = m.homeScore !== null ? `${m.homeScore}-${m.awayScore}` : 'vs'
              const time = m.status === 'LIVE' && m.minute ? `${m.minute}'` : m.status
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 border-r border-white/5"
                  style={{height:'30px', fontSize:'11px', whiteSpace:'nowrap'}}>
                  <span style={{color:'#4b5563', fontSize:'9px', fontWeight:700, textTransform:'uppercase'}}>{m.league}</span>
                  <span style={{color:'#d1d5db'}}>{m.homeTeam}</span>
                  <span
                    style={{
                      background: isLive ? '#E63946' : 'transparent',
                      color: isLive ? 'white' : '#e5e7eb',
                      fontWeight: 900,
                      fontSize: '10px',
                      padding: '1px 5px',
                      borderRadius: '3px',
                      minWidth: '32px',
                      textAlign: 'center',
                      display: 'inline-block',
                    }}>
                    {score}
                  </span>
                  <span style={{color:'#d1d5db'}}>{m.awayTeam}</span>
                  <span style={{color: isLive ? '#E63946' : '#6b7280', fontSize:'9px', fontWeight:700}}>{time}</span>
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
