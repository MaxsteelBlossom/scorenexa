import Link from 'next/link'
import { FileText, Eye, Users, TrendingUp, Plus, Edit, Zap, Target, Image } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>DASHBOARD</h1>
          <p className="text-slate-400 text-sm">Welcome back. Manage your ScoreNexa content.</p>
        </div>
        <Link href="/admin/articles/new"
          className="flex items-center gap-2 bg-[#E63946] hover:bg-[#c0303c] text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all">
          <Plus size={16}/> New Article
        </Link>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href:'/admin/articles/new', icon:Plus, label:'New Article', color:'bg-blue-600 text-white' },
          { href:'/admin/articles/new?type=gossip', icon:Zap, label:'New Gossip', color:'bg-orange-500 text-white' },
          { href:'/admin/articles/new?type=transfer', icon:TrendingUp, label:'Transfer News', color:'bg-purple-600 text-white' },
          { href:'/admin/betting/predictions', icon:Target, label:'Predictions', color:'bg-[#E63946] text-white' },
          { href:'/admin/media', icon:Image, label:'Upload Image', color:'bg-slate-700 text-white' },
          { href:'/admin/categories', icon:FileText, label:'Categories', color:'bg-emerald-600 text-white' },
          { href:'/admin/users', icon:Users, label:'Users', color:'bg-indigo-600 text-white' },
          { href:'/admin/ads', icon:Eye, label:'Ad Slots', color:'bg-yellow-500 text-white' },
        ].map(a => (
          <Link key={a.href} href={a.href}
            className={`${a.color} rounded-xl p-4 flex items-center gap-3 hover:opacity-90 transition-all font-bold text-sm`}>
            <a.icon size={18}/>{a.label}
          </Link>
        ))}
      </div>

      {/* Getting started checklist */}
      <div className="bg-gradient-to-br from-[#0D1117] to-[#1a1f2e] rounded-2xl p-6 text-white">
        <h2 className="font-black text-lg mb-4 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
          🚀 GETTING STARTED CHECKLIST
        </h2>
        <div className="space-y-3">
          {[
            { done:true, task:'Site deployed to Vercel', note:'✅ Live at scorenexa.vercel.app' },
            { done:true, task:'Supabase database connected', note:'✅ Auth and DB working' },
            { done:false, task:'Upload your first images', note:'→ Go to Media Library and upload article images', href:'/admin/media' },
            { done:false, task:'Write 15-20 real articles', note:'→ Go to Articles → New Article', href:'/admin/articles/new' },
            { done:false, task:'Add real predictions', note:'→ Go to Betting → Predictions', href:'/admin/betting/predictions' },
            { done:false, task:'Buy and connect your domain', note:'→ Buy scorenexa.com then add to Vercel' },
            { done:false, task:'Submit sitemap to Google Search Console', note:'→ search.google.com/search-console' },
            { done:false, task:'Apply for Google AdSense', note:'→ After 15+ real articles and custom domain' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 ${item.done ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                {item.done ? '✓' : i+1}
              </span>
              <div>
                <p className={`text-sm font-semibold ${item.done ? 'text-emerald-400 line-through opacity-70' : 'text-white'}`}>{item.task}</p>
                {item.href ? (
                  <Link href={item.href} className="text-xs text-[#E63946] hover:underline">{item.note}</Link>
                ) : (
                  <p className="text-xs text-slate-500">{item.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent articles - will show real data once connected */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-black text-slate-900 text-sm" style={{fontFamily:'Oswald,sans-serif'}}>RECENT ARTICLES</h2>
          <Link href="/admin/articles" className="text-[#E63946] text-sm hover:text-[#c0303c] font-bold">View all →</Link>
        </div>
        <div className="p-8 text-center text-slate-400">
          <FileText size={32} className="mx-auto mb-3 text-slate-200"/>
          <p className="font-semibold text-slate-600 mb-1">No articles yet</p>
          <p className="text-sm mb-4">Start publishing real content to appear here</p>
          <Link href="/admin/articles/new"
            className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#c0303c] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all">
            <Plus size={15}/> Write Your First Article
          </Link>
        </div>
      </div>
    </div>
  )
}
