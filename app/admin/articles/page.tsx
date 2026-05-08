import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react'

const ARTICLES = [
  { id:'1', title:"Mbappé Set for Shock Return to PSG", status:'published', category:'Transfer News', author:'James Fletcher', views:14820, published_at:'2025-04-26', is_breaking:true },
  { id:'2', title:"Arsenal vs Man City: Five Key Battles", status:'published', category:'News', author:'Sarah Williams', views:9240, published_at:'2025-04-26', is_breaking:false },
  { id:'3', title:"Barcelona £180m Double Swoop Planned", status:'draft', category:'Transfer News', author:'Carlos Mendez', views:0, published_at:'-', is_breaking:false },
  { id:'4', title:"Premier League Refs VAR Emergency Summit", status:'published', category:'News', author:'Mike Thompson', views:6300, published_at:'2025-04-25', is_breaking:false },
  { id:'5', title:"Bellingham Agent Holds Secret Talks", status:'scheduled', category:'Gossip', author:'Insider Desk', views:0, published_at:'Scheduled: 18:00', is_breaking:false },
  { id:'6', title:"Chelsea Set to Miss Out on Primary Target", status:'published', category:'Transfer News', author:'David Park', views:4800, published_at:'2025-04-25', is_breaking:false },
  { id:'7', title:"Ten Hag: Board Support Claims Questioned", status:'published', category:'News', author:'James Fletcher', views:5400, published_at:'2025-04-24', is_breaking:false },
  { id:'8', title:"January Window: Every Signing Rated", status:'published', category:'Opinion', author:'Mike Thompson', views:5500, published_at:'2025-04-24', is_breaking:false },
]

const statusColors: Record<string, string> = {
  published: 'bg-emerald-100 text-emerald-700',
  draft: 'bg-slate-100 text-slate-500',
  scheduled: 'bg-blue-100 text-blue-700',
}

export default function ArticlesAdmin() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>ARTICLES</h1>
        <Link href="/admin/articles/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all">
          <Plus size={16}/> New Article
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input placeholder="Search articles..." className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"/>
        </div>
        <select className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Scheduled</option>
        </select>
        <select className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Categories</option>
          <option>News</option>
          <option>Transfer News</option>
          <option>Gossip</option>
          <option>Opinion</option>
          <option>Match Report</option>
        </select>
      </div>

      {/* Quick add buttons */}
      <div className="flex gap-2 flex-wrap">
        {[['News','/admin/articles/new?type=news','bg-blue-50 text-blue-700 border-blue-200'],
          ['Transfer News','/admin/articles/new?type=transfer','bg-purple-50 text-purple-700 border-purple-200'],
          ['Gossip','/admin/articles/new?type=gossip','bg-orange-50 text-orange-700 border-orange-200'],
          ['Match Report','/admin/articles/new?type=match-report','bg-green-50 text-green-700 border-green-200'],
          ['Opinion','/admin/articles/new?type=opinion','bg-slate-50 text-slate-700 border-slate-200']].map(([l,h,c]) => (
          <Link key={l} href={h} className={`flex items-center gap-1.5 border px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80 ${c}`}>
            <Plus size={12}/>{l}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="pl-5 py-3 text-left">Title</th>
                <th className="py-3 text-left hidden md:table-cell">Category</th>
                <th className="py-3 text-left hidden lg:table-cell">Author</th>
                <th className="py-3 text-center hidden sm:table-cell">Views</th>
                <th className="py-3 text-center">Status</th>
                <th className="py-3 text-left hidden md:table-cell">Published</th>
                <th className="pr-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ARTICLES.map(a => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="pl-5 py-3.5 pr-2">
                    <div className="flex items-center gap-2">
                      {a.is_breaking && <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0">BREAKING</span>}
                      <p className="font-semibold text-slate-800 text-sm line-clamp-1">{a.title}</p>
                    </div>
                  </td>
                  <td className="py-3.5 hidden md:table-cell">
                    <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">{a.category}</span>
                  </td>
                  <td className="py-3.5 hidden lg:table-cell text-sm text-slate-500">{a.author}</td>
                  <td className="py-3.5 text-center hidden sm:table-cell text-sm text-slate-600">{a.views > 0 ? a.views.toLocaleString() : '—'}</td>
                  <td className="py-3.5 text-center">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColors[a.status]}`}>{a.status}</span>
                  </td>
                  <td className="py-3.5 hidden md:table-cell text-xs text-slate-400">{a.published_at}</td>
                  <td className="pr-5 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <Link href={`/article/${a.id}`} className="text-slate-400 hover:text-blue-600 transition-colors p-1"><Eye size={14}/></Link>
                      <Link href={`/admin/articles/${a.id}/edit`} className="text-slate-400 hover:text-emerald-600 transition-colors p-1"><Edit size={14}/></Link>
                      <button className="text-slate-400 hover:text-red-500 transition-colors p-1"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Showing 8 of 248 articles</span>
          <div className="flex gap-1">
            {[1,2,3,'...',24].map((p,i) => (
              <button key={i} className={`w-7 h-7 rounded-lg text-xs font-medium ${p === 1 ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 text-slate-600'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
