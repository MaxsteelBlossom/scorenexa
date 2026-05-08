import Link from 'next/link'
import { LayoutDashboard, FileText, Tag, Users, Megaphone, Settings, Shield, Image, Trophy, Layers, LogOut } from 'lucide-react'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/articles', label: 'Articles', icon: FileText },
  { href: '/admin/categories', label: 'Categories', icon: Tag },
  { href: '/admin/teams', label: 'Teams', icon: Trophy },
  { href: '/admin/leagues', label: 'Leagues', icon: Layers },
  { href: '/admin/media', label: 'Media Library', icon: Image },
  { href: '/admin/ads', label: 'Ad Slots', icon: Megaphone },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

// Simple layout - middleware handles all auth protection
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-64 bg-[#0D1117] flex-shrink-0 flex flex-col border-r border-white/5">
        <div className="p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#0D1117] border border-white/20 rounded-xl flex items-center justify-center relative">
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

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map(n => (
            <Link key={n.href} href={n.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium group">
              <n.icon size={15} className="group-hover:text-[#E63946] transition-colors flex-shrink-0"/>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-1">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-white text-xs px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
            ← Back to Site
          </Link>
          <form action="/api/admin/logout" method="POST">
            <button type="submit"
              className="w-full flex items-center gap-2 text-slate-500 hover:text-[#E63946] text-xs px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
              <LogOut size={13}/> Sign Out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Shield size={15} className="text-[#E63946]"/>
            <span className="text-slate-600 text-sm font-semibold">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E63946] rounded-full flex items-center justify-center text-white font-black text-xs">A</div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
