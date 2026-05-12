'use client'
import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

const INITIAL_SITES = [
  { id:'1', name:'Betway', rating:4.8, bonus:'100% up to £50', badge:'Editor\'s Choice', active:true, url:'#' },
  { id:'2', name:'Hollywoodbets', rating:4.6, bonus:'£10 Free Bet', badge:'Best Free Bet', active:true, url:'#' },
  { id:'3', name:'Betfred', rating:4.5, bonus:'£40 Free Bet', badge:'Top Bonus', active:true, url:'#' },
  { id:'4', name:'Easybet', rating:4.3, bonus:'50% up to £30', badge:'', active:false, url:'#' },
]

export default function BettingSitesAdmin() {
  const [sites, setSites] = useState(INITIAL_SITES)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ name:'', rating:'4.5', bonus:'', badge:'', url:'', active:true })

  const toggleActive = (id: string) => setSites(s => s.map(site => site.id === id ? {...site, active: !site.active} : site))
  const deleteSite = (id: string) => setSites(s => s.filter(site => site.id !== id))

  const addSite = () => {
    setSites(s => [...s, { ...form, id: Date.now().toString(), rating: parseFloat(form.rating) }])
    setForm({ name:'', rating:'4.5', bonus:'', badge:'', url:'', active:true })
    setShowNew(false)
  }

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>🏆 BETTING SITES MANAGER</h1>
          <p className="text-slate-400 text-sm">Manage bookmaker listings and affiliate links</p>
        </div>
        <button onClick={() => setShowNew(true)}
          className="flex items-center gap-2 bg-[#E63946] hover:bg-[#c0303c] text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all">
          <Plus size={16}/> Add Site
        </button>
      </div>

      {showNew && (
        <div className="bg-white border-2 border-[#E63946]/30 rounded-2xl p-5 space-y-4">
          <h3 className="font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>NEW BETTING SITE</h3>
          <div className="grid grid-cols-2 gap-3">
            {[['Site Name','name','e.g. Betway'],['Welcome Bonus','bonus','e.g. 100% up to £50'],['Badge','badge','e.g. Editor\'s Choice'],['Affiliate URL','url','https://...'],['Rating (1-5)','rating','4.5']].map(([l,k,p]) => (
              <div key={k}>
                <label className="text-xs font-bold text-slate-500 block mb-1">{l}</label>
                <input value={(form as any)[k]} onChange={e => setForm(f=>({...f,[k]:e.target.value}))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]" placeholder={p}/>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-5">
              <input type="checkbox" checked={form.active} onChange={e => setForm(f=>({...f,active:e.target.checked}))} className="rounded"/>
              <label className="text-sm text-slate-600 font-medium">Show on site</label>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addSite} className="bg-[#E63946] hover:bg-[#c0303c] text-white px-5 py-2 rounded-xl text-sm font-bold transition-all">Save Site</button>
            <button onClick={() => setShowNew(false)} className="border border-slate-200 text-slate-600 px-5 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {sites.map((site, i) => (
          <div key={site.id} className={`bg-white rounded-2xl border ${site.active ? 'border-slate-100' : 'border-slate-100 opacity-60'} shadow-sm p-5`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black flex-shrink-0">{i+1}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>{site.name}</h3>
                  {site.badge && <span className="bg-[#E63946] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{site.badge}</span>}
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{site.bonus}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-0.5">
                  {'★★★★★'.split('').map((s,idx) => (
                    <span key={idx} className={idx < Math.floor(site.rating) ? 'text-yellow-400' : 'text-slate-200'}>{s}</span>
                  ))}
                  <span className="text-sm font-bold text-slate-700 ml-1">{site.rating}</span>
                </div>
                <button onClick={() => toggleActive(site.id)} className={`p-2 rounded-lg transition-colors ${site.active ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-400 hover:bg-slate-50'}`}>
                  {site.active ? <Eye size={15}/> : <EyeOff size={15}/>}
                </button>
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={15}/></button>
                <button onClick={() => deleteSite(site.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
