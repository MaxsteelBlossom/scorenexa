import Link from 'next/link'
import { LayoutDashboard, FileText, Tag, Users, Megaphone, Settings, Shield, Image, Trophy, Layers } from 'lucide-react'

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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a1240] flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">SN</div>
            <div>
              <p className="text-white font-bold text-sm" style={{fontFamily:'Oswald,sans-serif'}}>SCORENEXA</p>
              <p className="text-blue-400 text-[10px]">Admin Panel</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {NAV.map(n => (
            <Link key={n.href} href={n.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-all text-sm font-medium group">
              <n.icon size={16} className="group-hover:text-emerald-400 transition-colors flex-shrink-0"/>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2 text-blue-400 hover:text-white text-xs px-3 py-2 transition-colors">
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-emerald-500"/>
            <span className="text-slate-600 text-sm font-medium">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Logged in as Admin</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">A</div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
