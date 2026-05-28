'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, Tag, Users, Megaphone,
  Settings, Shield, Image, Trophy, Layers, LogOut,
  TrendingUp, MessageSquare, Target, BookOpen, Globe,
  Menu, X, Plus
} from 'lucide-react'

const NAV = [
  { section: 'CONTENT', items: [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/articles', label: 'All Articles', icon: FileText },
    { href: '/admin/articles/new', label: 'New Article', icon: Plus },
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

function SidebarContent({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <>
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#0D1117] border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
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
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 lg:hidden">
            <X size={20}/>
          </button>
        )}
      </div>
      <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
        {NAV.map(section => (
          <div key={section.section}>
            <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest px-3 mb-1.5">{section.section}</p>
            <div className="space-y-0.5">
              {section.items.map(n => {
                const isActive = pathname === n.href || (n.href !== '/admin' && pathname.startsWith(n.href.split('?')[0]))
                return (
                  <Link key={n.href} href={n.href} onClick={onClose}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
                      ${isActive ? 'bg-[#E63946] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                    <n.icon size={14} className={isActive ? 'text-white' : 'group-hover:text-[#E63946] transition-colors flex-shrink-0'}/>
                    {n.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10 space-y-1">
        <Link href="/" target="_blank" className="flex items-center gap-2 text-slate-500 hover:text-white text-xs px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
          🌐 View Live Site
        </Link>
        <form action="/api/admin/logout" method="POST">
          <button type="submit" className="w-full flex items-center gap-2 text-slate-500 hover:text-[#E63946] text-xs px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            <LogOut size={13}/> Sign Out
          </button>
        </form>
      </div>
    </>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}/>
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#0D1117] flex flex-col border-r border-white/5 z-50 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen`}>
        <SidebarContent pathname={pathname} onClose={() => setSidebarOpen(false)}/>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
              <Menu size={20}/>
            </button>
            <div className="flex items-center gap-2">
              <Shield size={15} className="text-[#E63946]"/>
              <span className="text-slate-600 text-sm font-bold hidden sm:block">Admin Panel</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/articles/new" className="bg-[#E63946] hover:bg-[#c0303c] text-white text-xs font-black px-3 py-2 rounded-lg transition-all flex items-center gap-1.5" style={{fontFamily:'Oswald,sans-serif'}}>
              <Plus size={13}/><span className="hidden sm:inline">NEW ARTICLE</span>
            </Link>
            <div className="w-8 h-8 bg-[#E63946] rounded-full flex items-center justify-center text-white font-black text-xs">A</div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
