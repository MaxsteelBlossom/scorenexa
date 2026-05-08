'use client'
import { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

const TEAMS = [
  { id:'1', name:'Manchester City', slug:'man-city', league:'Premier League', country:'England', stadium:'Etihad Stadium', api_id:50 },
  { id:'2', name:'Arsenal', slug:'arsenal', league:'Premier League', country:'England', stadium:'Emirates Stadium', api_id:42 },
  { id:'3', name:'Real Madrid', slug:'real-madrid', league:'La Liga', country:'Spain', stadium:'Santiago Bernabéu', api_id:541 },
  { id:'4', name:'Barcelona', slug:'barcelona', league:'La Liga', country:'Spain', stadium:'Spotify Camp Nou', api_id:529 },
  { id:'5', name:'Bayern Munich', slug:'bayern-munich', league:'Bundesliga', country:'Germany', stadium:'Allianz Arena', api_id:157 },
]

export default function TeamsAdmin() {
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({name:'',slug:'',league:'Premier League',country:'England',stadium:'',api_id:''})

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>TEAMS</h1>
          <p className="text-slate-400 text-sm">Manage club profiles and API mappings</p>
        </div>
        <button onClick={() => setShowNew(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all"><Plus size={16}/>Add Team</button>
      </div>

      {showNew && (
        <div className="bg-white border-2 border-blue-300 rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>NEW TEAM</h3>
          <div className="grid grid-cols-2 gap-3">
            {[['Team Name','text','name','e.g. Liverpool'],['Slug','text','slug','e.g. liverpool'],['League','text','league','e.g. Premier League'],['Country','text','country','e.g. England'],['Stadium','text','stadium','e.g. Anfield'],['API-Football ID','number','api_id','e.g. 40']].map(([l,t,k,p]) => (
              <div key={k}><label className="text-xs font-semibold text-slate-600 block mb-1.5">{l}</label>
                <input type={t} placeholder={p} value={(form as any)[k]} onChange={e => setForm(f=>({...f,[k]:e.target.value}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/></div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowNew(false)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">Save Team</button>
            <button onClick={() => setShowNew(false)} className="border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all">Cancel</button>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <div className="relative flex-1"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input placeholder="Search teams..." className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"/></div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead><tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
            <th className="pl-5 py-3 text-left">Team</th>
            <th className="py-3 text-left hidden md:table-cell">League</th>
            <th className="py-3 text-left hidden lg:table-cell">Stadium</th>
            <th className="py-3 text-center hidden sm:table-cell">API ID</th>
            <th className="pr-5 py-3 text-right">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-50">
            {TEAMS.map(t => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="pl-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-700 text-xs">{t.name[0]}</div>
                    <div><p className="font-semibold text-slate-800">{t.name}</p><p className="text-xs text-slate-400 font-mono">/teams/{t.slug}</p></div>
                  </div>
                </td>
                <td className="py-3.5 text-slate-600 hidden md:table-cell">{t.league}</td>
                <td className="py-3.5 text-slate-500 hidden lg:table-cell text-sm">{t.stadium}</td>
                <td className="py-3.5 text-center hidden sm:table-cell"><span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded">{t.api_id}</span></td>
                <td className="pr-5 py-3.5">
                  <div className="flex items-center gap-1.5 justify-end">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={14}/></button>
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
