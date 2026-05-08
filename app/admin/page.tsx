import Link from 'next/link'
import { FileText, Eye, Users, TrendingUp, Plus, Edit, Zap } from 'lucide-react'

const STATS = [
  { label: 'Total Articles', value: '248', change: '+12 this week', icon: FileText, color: 'bg-blue-500' },
  { label: 'Page Views Today', value: '14,820', change: '+23% vs yesterday', icon: Eye, color: 'bg-emerald-500' },
  { label: 'Registered Users', value: '3,641', change: '+28 this week', icon: Users, color: 'bg-purple-500' },
  { label: 'Premium Members', value: '184', change: '+5 this month', icon: TrendingUp, color: 'bg-orange-500' },
]

const RECENT_ARTICLES = [
  { id: '1', title: "Mbappé Set for Shock Return to PSG", status: 'published', views: 14820, cat: 'Transfer News', time: '2h ago' },
  { id: '2', title: "Arsenal vs Man City: Five Key Battles", status: 'published', views: 9240, cat: 'News', time: '4h ago' },
  { id: '3', title: "Barcelona £180m Double Swoop", status: 'draft', views: 0, cat: 'Transfer News', time: '6h ago' },
  { id: '4', title: "Premier League VAR Emergency Summit", status: 'published', views: 6300, cat: 'News', time: '8h ago' },
  { id: '5', title: "Bellingham Agent Secret Talks", status: 'scheduled', views: 0, cat: 'Gossip', time: 'Due in 1h' },
]

const statusColors: Record<string, string> = {
  published: 'bg-emerald-100 text-emerald-700',
  draft: 'bg-slate-100 text-slate-600',
  scheduled: 'bg-blue-100 text-blue-700',
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>DASHBOARD</h1>
          <p className="text-slate-400 text-sm">Welcome back. Here's what's happening on ScoreNexa today.</p>
        </div>
        <Link href="/admin/articles/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all">
          <Plus size={16}/> New Article
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className={`${s.color} w-10 h-10 rounded-xl flex items-center justify-center`}>
                <s.icon size={18} className="text-white"/>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500 mt-0.5">{s.label}</p>
            <p className="text-xs text-emerald-600 font-medium mt-1">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href:'/admin/articles/new', icon:Plus, label:'New Article', color:'bg-blue-600 text-white' },
          { href:'/admin/articles/new?type=gossip', icon:Zap, label:'New Gossip', color:'bg-orange-500 text-white' },
          { href:'/admin/articles/new?type=transfer', icon:TrendingUp, label:'Transfer News', color:'bg-purple-600 text-white' },
          { href:'/admin/media', icon:Edit, label:'Media Library', color:'bg-slate-700 text-white' },
        ].map(a => (
          <Link key={a.href} href={a.href}
            className={`${a.color} rounded-xl p-4 flex items-center gap-3 hover:opacity-90 transition-all font-medium text-sm`}>
            <a.icon size={18}/>{a.label}
          </Link>
        ))}
      </div>

      {/* Recent articles */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>RECENT ARTICLES</h2>
          <Link href="/admin/articles" className="text-blue-600 text-sm hover:text-blue-700 font-medium">View all →</Link>
        </div>
        <div className="divide-y divide-slate-50">
          {RECENT_ARTICLES.map(a => (
            <div key={a.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm truncate">{a.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-400">{a.cat}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-400">{a.time}</span>
                  {a.views > 0 && <><span className="text-slate-300">·</span><span className="text-xs text-slate-400">{a.views.toLocaleString()} views</span></>}
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColors[a.status]}`}>{a.status}</span>
                <Link href={`/admin/articles/${a.id}/edit`} className="text-slate-400 hover:text-blue-600 transition-colors">
                  <Edit size={14}/>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
