'use client'
import { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'

const LEAGUES = [
  { id:'1', name:'Premier League', slug:'premier-league', country:'England', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', season:2024, api_id:39 },
  { id:'2', name:'La Liga', slug:'la-liga', country:'Spain', flag:'🇪🇸', season:2024, api_id:140 },
  { id:'3', name:'Bundesliga', slug:'bundesliga', country:'Germany', flag:'🇩🇪', season:2024, api_id:78 },
  { id:'4', name:'Serie A', slug:'serie-a', country:'Italy', flag:'🇮🇹', season:2024, api_id:135 },
  { id:'5', name:'Champions League', slug:'champions-league', country:'Europe', flag:'🏆', season:2024, api_id:2 },
]

export default function LeaguesAdmin() {
  const [showNew, setShowNew] = useState(false)
  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>LEAGUES</h1>
          <p className="text-slate-400 text-sm">Manage league profiles and API mappings</p></div>
        <button onClick={() => setShowNew(!showNew)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all"><Plus size={16}/>Add League</button>
      </div>

      {showNew && (
        <div className="bg-white border-2 border-blue-300 rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>NEW LEAGUE</h3>
          <div className="grid grid-cols-2 gap-3">
            {[['League Name','name','e.g. Ligue 1'],['Slug','slug','e.g. ligue-1'],['Country','country','e.g. France'],['Flag Emoji','flag','🇫🇷'],['Season','season','2024'],['API-Football ID','api_id','61']].map(([l,k,p]) => (
              <div key={k}><label className="text-xs font-semibold text-slate-600 block mb-1.5">{l}</label>
                <input placeholder={p} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/></div>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium">Save League</button>
            <button onClick={() => setShowNew(false)} className="border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-50">
          {LEAGUES.map(l => (
            <div key={l.id} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
              <span className="text-3xl">{l.flag}</span>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{l.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-400">{l.country}</span>
                  <span className="text-slate-200">·</span>
                  <span className="text-xs text-slate-400">Season {l.season}/{l.season+1}</span>
                  <span className="text-slate-200">·</span>
                  <span className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">API: {l.api_id}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={14}/></button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
