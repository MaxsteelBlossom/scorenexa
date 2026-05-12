import Link from 'next/link'
import {
  LayoutDashboard, FileText, Tag, Users, Megaphone,
  Settings, Shield, Image, Trophy, Layers, LogOut,
  TrendingUp, MessageSquare, Target, BookOpen, Globe
} from 'lucide-react'

const NAV = [
  { section: 'CONTENT', items: [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/articles', label: 'Articles', icon: FileText },
    { href: '/admin/articles/new?type=news', label: 'New Article', icon: FileText },
    { href: '/admin/articles/new?type=gossip', label: 'New Gossip', icon: MessageSquare },
    { href: '/admin/articles/new?type=transfer', label: 'Transfer News', icon: TrendingUp },
    { href: '/admin/categories', label: 'Categories', icon: Tag },
    { href: '/admin/media', label: 'Media Library', icon: Image },
  ]},
  { section: 'SPORTS DATA', items: [
    { href: '/admin/teams', label: 'Teams', icon: Trophy },
    { href: '/admin/leagues', label: 'Leagues', icon: Layers },
  ]},
  { section: 'BETTING', items: [
    { href: '/admin/betting/predictions', label: 'Predictions', icon: Target },
    { href: '/admin/betting/sites', label: 'Betting Sites', icon: Globe },
    { href: '/admin/betting/guides', label: 'Guides', icon: BookOpen },
  ]},
  { section: 'MONETISATION', items: [
    { href: '/admin/ads', label: 'Ad Slots', icon: Megaphone },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]},
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0D1117] flex-shrink-0 flex flex-col border-r border-white/5 fixed h-full overflow-y-auto">
        <div className="p-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#0D1117] border border-white/20 rounded-xl flex items-center justify-center relative flex-shrink-0">
              <div className="flex items-end leading-none">
                <span className="text-white font-black text-xl" style={{fontFamily:'Arial Black,sans-serif',lineHeight:1}}>S</span>
                <span className="text-[#E63946] font-black text-sm mb-0.5" style={{fontFamily:'Arial Black,sans-serif',lineHeight:1}}>N</span>
              </div>
            </div>
            <div>
              <p className="text-white font-black text-sm" style={{fontFamily:'Oswald,sans-serif'}}>SCORENEXA</p>
              <p className="text-slate-500 text-[10px]">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-4">
          {NAV.map(section => (
            <div key={section.section}>
              <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest px-3 mb-1.5">{section.section}</p>
              <div className="space-y-0.5">
                {section.items.map(n => (
                  <Link key={n.href} href={n.href}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium group">
                    <n.icon size={14} className="group-hover:text-[#E63946] transition-colors flex-shrink-0"/>
                    {n.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-1">
          <Link href="/" target="_blank"
            className="flex items-center gap-2 text-slate-500 hover:text-white text-xs px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            🌐 View Live Site
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button type="submit"
              className="w-full flex items-center gap-2 text-slate-500 hover:text-[#E63946] text-xs px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
              <LogOut size={13}/> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content - offset by sidebar width */}
      <div className="flex-1 flex flex-col min-w-0 ml-60">
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Shield size={15} className="text-[#E63946]"/>
            <span className="text-slate-600 text-sm font-semibold">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/articles/new"
              className="bg-[#E63946] hover:bg-[#c0303c] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5"
              style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
              + NEW ARTICLE
            </Link>
            <div className="w-8 h-8 bg-[#E63946] rounded-full flex items-center justify-center text-white font-black text-xs">A</div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
