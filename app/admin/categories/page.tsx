'use client'
import { useState } from 'react'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'

const INITIAL = [
  { id:'1', name:'News', slug:'news', color:'#2563eb', description:'General football news and updates', count:98 },
  { id:'2', name:'Transfer News', slug:'transfer-news', color:'#7c3aed', description:'Transfer rumours and confirmed deals', count:64 },
  { id:'3', name:'Gossip', slug:'gossip', color:'#ea580c', description:'Rumours, whispers and inside stories', count:41 },
  { id:'4', name:'Match Report', slug:'match-report', color:'#16a34a', description:'Post-match analysis and reports', count:33 },
  { id:'5', name:'Opinion', slug:'opinion', color:'#475569', description:'Expert opinion and analysis pieces', count:12 },
]

export default function CategoriesAdmin() {
  const [cats, setCats] = useState(INITIAL)
  const [editing, setEditing] = useState<string|null>(null)
  const [editData, setEditData] = useState({name:'',slug:'',color:'',description:''})
  const [showNew, setShowNew] = useState(false)
  const [newCat, setNewCat] = useState({name:'',slug:'',color:'#2563eb',description:''})

  const startEdit = (c: typeof INITIAL[0]) => { setEditing(c.id); setEditData({name:c.name,slug:c.slug,color:c.color,description:c.description}) }
  const saveEdit = () => { setCats(cs => cs.map(c => c.id === editing ? {...c,...editData} : c)); setEditing(null) }
  const del = (id: string) => setCats(cs => cs.filter(c => c.id !== id))
  const addNew = () => {
    setCats(cs => [...cs, {...newCat, id: Date.now().toString(), count: 0}])
    setShowNew(false); setNewCat({name:'',slug:'',color:'#2563eb',description:''})
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>CATEGORIES</h1>
          <p className="text-slate-400 text-sm">Manage article categories and their display colours</p>
        </div>
        <button onClick={() => setShowNew(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all"><Plus size={16}/>New Category</button>
      </div>

      {showNew && (
        <div className="bg-white border-2 border-blue-300 rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>NEW CATEGORY</h3>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-semibold text-slate-600 block mb-1.5">Name</label>
              <input value={newCat.name} onChange={e => setNewCat(p=>({...p,name:e.target.value,slug:e.target.value.toLowerCase().replace(/\s+/g,'-')}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Transfer News"/></div>
            <div><label className="text-xs font-semibold text-slate-600 block mb-1.5">Slug</label>
              <input value={newCat.slug} onChange={e => setNewCat(p=>({...p,slug:e.target.value}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="transfer-news"/></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs font-semibold text-slate-600 block mb-1.5">Colour</label>
              <div className="flex items-center gap-2"><input type="color" value={newCat.color} onChange={e => setNewCat(p=>({...p,color:e.target.value}))} className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer"/>
                <span className="text-sm font-mono text-slate-600">{newCat.color}</span></div></div>
            <div><label className="text-xs font-semibold text-slate-600 block mb-1.5">Description</label>
              <input value={newCat.description} onChange={e => setNewCat(p=>({...p,description:e.target.value}))} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Short description..."/></div>
          </div>
          <div className="flex gap-2"><button onClick={addNew} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">Save Category</button>
            <button onClick={() => setShowNew(false)} className="border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all">Cancel</button></div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-50">
          {cats.map(c => (
            <div key={c.id} className="px-5 py-4">
              {editing === c.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input value={editData.name} onChange={e => setEditData(p=>({...p,name:e.target.value}))} className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    <input value={editData.slug} onChange={e => setEditData(p=>({...p,slug:e.target.value}))} className="border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={editData.color} onChange={e => setEditData(p=>({...p,color:e.target.value}))} className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer"/>
                    <input value={editData.description} onChange={e => setEditData(p=>({...p,description:e.target.value}))} className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Description"/>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all"><Save size={13}/>Save</button>
                    <button onClick={() => setEditing(null)} className="flex items-center gap-1.5 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all"><X size={13}/>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{backgroundColor:c.color}}/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{c.name}</span>
                      <span className="text-xs text-slate-400 font-mono">/{c.slug}</span>
                      <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">{c.count} articles</span>
                    </div>
                    {c.description && <p className="text-xs text-slate-400 mt-0.5">{c.description}</p>}
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button onClick={() => startEdit(c)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={14}/></button>
                    <button onClick={() => del(c.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14}/></button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
