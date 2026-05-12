'use client'
import { useState } from 'react'
import { Plus, Trash2, Save } from 'lucide-react'

const INITIAL_TIPS = [
  { id:'1', home:'Arsenal', away:'Man City', league:'Premier League', pick:'Both Teams to Score', odds:'1.72', confidence:'High', time:'12:30', published:true },
  { id:'2', home:'Barcelona', away:'Atletico', league:'La Liga', pick:'Over 2.5 Goals', odds:'1.85', confidence:'High', time:'16:00', published:true },
  { id:'3', home:'Bayern', away:'Dortmund', league:'Bundesliga', pick:'Bayern to Win', odds:'1.55', confidence:'Medium', time:'14:30', published:false },
]

export default function PredictionsAdmin() {
  const [tips, setTips] = useState(INITIAL_TIPS)
  const [showNew, setShowNew] = useState(false)
  const [newTip, setNewTip] = useState({ home:'', away:'', league:'Premier League', pick:'', odds:'', confidence:'High', time:'', published:true })
  const [saved, setSaved] = useState(false)

  const addTip = () => {
    if (!newTip.home || !newTip.away || !newTip.pick) return
    setTips(t => [...t, { ...newTip, id: Date.now().toString() }])
    setNewTip({ home:'', away:'', league:'Premier League', pick:'', odds:'', confidence:'High', time:'', published:true })
    setShowNew(false)
  }

  const deleteTip = (id: string) => setTips(t => t.filter(tip => tip.id !== id))
  const togglePublish = (id: string) => setTips(t => t.map(tip => tip.id === id ? {...tip, published: !tip.published} : tip))

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>🔮 PREDICTIONS MANAGER</h1>
          <p className="text-slate-400 text-sm">Manage today's betting tips and predictions</p>
        </div>
        <button onClick={() => setShowNew(true)}
          className="flex items-center gap-2 bg-[#E63946] hover:bg-[#c0303c] text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all">
          <Plus size={16}/> Add Tip
        </button>
      </div>

      {showNew && (
        <div className="bg-white border-2 border-[#E63946]/30 rounded-2xl p-5 space-y-4">
          <h3 className="font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>NEW PREDICTION</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Home Team</label>
              <input value={newTip.home} onChange={e => setNewTip(p=>({...p,home:e.target.value}))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]" placeholder="e.g. Arsenal"/>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Away Team</label>
              <input value={newTip.away} onChange={e => setNewTip(p=>({...p,away:e.target.value}))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]" placeholder="e.g. Chelsea"/>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">League</label>
              <select value={newTip.league} onChange={e => setNewTip(p=>({...p,league:e.target.value}))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]">
                {['Premier League','La Liga','Bundesliga','Serie A','Ligue 1','Champions League','Europa League'].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Kick-off Time</label>
              <input type="time" value={newTip.time} onChange={e => setNewTip(p=>({...p,time:e.target.value}))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]"/>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Prediction / Pick</label>
              <input value={newTip.pick} onChange={e => setNewTip(p=>({...p,pick:e.target.value}))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]" placeholder="e.g. Both Teams to Score"/>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Best Odds</label>
              <input value={newTip.odds} onChange={e => setNewTip(p=>({...p,odds:e.target.value}))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]" placeholder="e.g. 1.85"/>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Confidence</label>
              <select value={newTip.confidence} onChange={e => setNewTip(p=>({...p,confidence:e.target.value}))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input type="checkbox" id="pub" checked={newTip.published} onChange={e => setNewTip(p=>({...p,published:e.target.checked}))} className="rounded"/>
              <label htmlFor="pub" className="text-sm text-slate-600 font-medium">Publish immediately</label>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addTip} className="bg-[#E63946] hover:bg-[#c0303c] text-white px-5 py-2 rounded-xl text-sm font-bold transition-all">Save Prediction</button>
            <button onClick={() => setShowNew(false)} className="border border-slate-200 text-slate-600 px-5 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="font-black text-slate-900 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>TODAY'S TIPS ({tips.length})</h2>
          <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700">
            <Save size={13}/>{saved ? 'Saved!' : 'Save All'}
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {tips.map(tip => (
            <div key={tip.id} className="px-5 py-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-slate-400 font-bold">{tip.league}</span>
                  <span className="text-xs text-slate-400">{tip.time}</span>
                </div>
                <p className="font-black text-slate-900 text-sm mt-0.5">{tip.home} vs {tip.away}</p>
                <p className="text-[#E63946] text-xs font-bold mt-0.5">📌 {tip.pick}</p>
              </div>
              <div className="text-center flex-shrink-0">
                <div className="bg-slate-900 text-white font-black text-sm px-3 py-1 rounded-lg">{tip.odds}</div>
              </div>
              <div className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${tip.confidence === 'High' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {tip.confidence}
              </div>
              <button onClick={() => togglePublish(tip.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex-shrink-0 ${tip.published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                {tip.published ? 'Live' : 'Draft'}
              </button>
              <button onClick={() => deleteTip(tip.id)} className="text-slate-300 hover:text-red-500 transition-colors flex-shrink-0">
                <Trash2 size={15}/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
