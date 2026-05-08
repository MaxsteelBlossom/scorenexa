'use client'
import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

const INITIAL_SLOTS = [
  { id:'1', name:'Homepage Banner', position:'banner', is_active:true, code:'<!-- AdSense Banner -->', impressions:14200 },
  { id:'2', name:'Article Sidebar', position:'sidebar', is_active:true, code:'<!-- AdSense Sidebar -->', impressions:9800 },
  { id:'3', name:'In-Article Mid', position:'in-article', is_active:true, code:'<!-- AdSense In-Article -->', impressions:7400 },
  { id:'4', name:'Mobile Footer Sticky', position:'mobile-footer', is_active:true, code:'<!-- AdSense Mobile -->', impressions:22100 },
  { id:'5', name:'News Feed Native', position:'in-feed', is_active:false, code:'', impressions:0 },
]

export default function AdsAdmin() {
  const [slots, setSlots] = useState(INITIAL_SLOTS)
  const [editing, setEditing] = useState<string|null>(null)
  const [editCode, setEditCode] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [newSlot, setNewSlot] = useState({ name:'', position:'banner', code:'' })

  const toggle = (id: string) => setSlots(s => s.map(slot => slot.id === id ? {...slot, is_active: !slot.is_active} : slot))
  const startEdit = (slot: typeof INITIAL_SLOTS[0]) => { setEditing(slot.id); setEditCode(slot.code) }
  const saveEdit = (id: string) => {
    setSlots(s => s.map(slot => slot.id === id ? {...slot, code: editCode} : slot))
    setEditing(null)
  }

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>AD SLOTS</h1>
          <p className="text-slate-400 text-sm">Manage Google AdSense placements and direct ad codes</p>
        </div>
        <button onClick={() => setShowNew(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all">
          <Plus size={16}/> Add Slot
        </button>
      </div>

      {/* AdSense ID banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div>
          <p className="font-semibold text-blue-900 text-sm">Google AdSense Setup</p>
          <p className="text-blue-700 text-xs mt-0.5">Set your AdSense Publisher ID in <code className="bg-blue-100 px-1 rounded">.env.local</code> as <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXX</code>. Ad slots will automatically activate once approved by Google.</p>
        </div>
      </div>

      {/* New slot form */}
      {showNew && (
        <div className="bg-white border-2 border-blue-300 rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>NEW AD SLOT</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5">Slot Name</label>
              <input value={newSlot.name} onChange={e => setNewSlot(p=>({...p,name:e.target.value}))} placeholder="e.g. Homepage Leaderboard" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5">Position</label>
              <select value={newSlot.position} onChange={e => setNewSlot(p=>({...p,position:e.target.value}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {['banner','sidebar','in-article','mobile-footer','in-feed','header'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1.5">Ad Code (AdSense ins tag or custom HTML)</label>
            <textarea value={newSlot.code} onChange={e => setNewSlot(p=>({...p,code:e.target.value}))} rows={4} placeholder={'<ins class="adsbygoogle"\n  data-ad-client="ca-pub-XXXX"\n  data-ad-slot="XXXXXXXX"\n  ...></ins>'} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div className="flex gap-2">
            <button onClick={() => {
              setSlots(s => [...s, {...newSlot, id: Date.now().toString(), is_active: true, impressions: 0}])
              setShowNew(false)
              setNewSlot({name:'',position:'banner',code:''})
            }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">Save Slot</button>
            <button onClick={() => setShowNew(false)} className="border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all">Cancel</button>
          </div>
        </div>
      )}

      {/* Slots list */}
      <div className="space-y-3">
        {slots.map(slot => (
          <div key={slot.id} className={`bg-white rounded-2xl border ${slot.is_active ? 'border-slate-100' : 'border-slate-100 opacity-60'} shadow-sm overflow-hidden`}>
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900">{slot.name}</h3>
                  <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full font-mono">{slot.position}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${slot.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {slot.is_active ? 'Active' : 'Paused'}
                  </span>
                </div>
                {slot.impressions > 0 && <p className="text-xs text-slate-400 mt-0.5">{slot.impressions.toLocaleString()} impressions this month</p>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggle(slot.id)} className={`p-2 rounded-lg transition-colors ${slot.is_active ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-400 hover:bg-slate-50'}`}>
                  {slot.is_active ? <Eye size={16}/> : <EyeOff size={16}/>}
                </button>
                <button onClick={() => startEdit(slot)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={16}/></button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
              </div>
            </div>
            {editing === slot.id && (
              <div className="border-t border-slate-100 px-5 py-4 space-y-3 bg-slate-50">
                <label className="text-xs font-semibold text-slate-600">Ad Code</label>
                <textarea value={editCode} onChange={e => setEditCode(e.target.value)} rows={5} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"/>
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(slot.id)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">Save Changes</button>
                  <button onClick={() => setEditing(null)} className="border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-white transition-all">Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
