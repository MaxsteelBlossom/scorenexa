import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'

const GUIDES = [
  { name:"Reader's Guide to Betway", slug:'/betting/guide-betway', status:'live' },
  { name:"Reader's Guide to Hollywoodbets", slug:'/betting/guide-hollywoodbets', status:'live' },
  { name:"Reader's Guide to Betfred", slug:'/betting/guide-betfred', status:'draft' },
  { name:"Reader's Guide to Easybet", slug:'/betting/guide-easybet', status:'draft' },
  { name:"Reader's Guide to Yesplay", slug:'/betting/guide-yesplay', status:'draft' },
  { name:"Reader's Guide to Lucky Fish", slug:'/betting/guide-lucky-fish', status:'draft' },
  { name:'Betting Glossary A-Z', slug:'/betting/glossary', status:'live' },
  { name:'How We Produce Content', slug:'/betting/how-we-produce-content', status:'live' },
]

export default function BettingGuidesAdmin() {
  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>📖 BETTING GUIDES</h1>
          <p className="text-slate-400 text-sm">Manage bookmaker review pages and guides</p>
        </div>
        <Link href="/admin/articles/new?type=betting-guide"
          className="flex items-center gap-2 bg-[#E63946] hover:bg-[#c0303c] text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all">
          <Plus size={16}/> New Guide
        </Link>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-50">
          {GUIDES.map(g => (
            <div key={g.slug} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex-1">
                <p className="font-semibold text-slate-900 text-sm">{g.name}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{g.slug}</p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${g.status === 'live' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                {g.status}
              </span>
              <Link href={g.slug} target="_blank" className="text-xs text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all">
                View →
              </Link>
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit size={14}/>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
        💡 <strong>Tip:</strong> Draft guides are live pages but need real content added. Click the article editor to fill them in with proper reviews.
      </div>
    </div>
  )
}
