'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Zap, ChevronDown } from 'lucide-react'

const MAIN_NAV = [
  { label: 'News', href: '/news' },
  { label: 'Transfers', href: '/transfer-news' },
  { label: 'Gossip', href: '/gossip' },
  { label: 'Live Scores', href: '/live-scores' },
  { label: 'Fixtures', href: '/fixtures' },
  { label: 'Tables', href: '/tables' },
  {
    label: 'Leagues', href: '/leagues',
    mega: [
      { label: 'Premier League', href: '/leagues/premier-league', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      { label: 'La Liga', href: '/leagues/la-liga', flag: '🇪🇸' },
      { label: 'Champions League', href: '/leagues/champions-league', flag: '🏆' },
      { label: 'Bundesliga', href: '/leagues/bundesliga', flag: '🇩🇪' },
      { label: 'Serie A', href: '/leagues/serie-a', flag: '🇮🇹' },
      { label: 'Ligue 1', href: '/leagues/ligue-1', flag: '🇫🇷' },
      { label: 'MLS', href: '/leagues/mls', flag: '🇺🇸' },
      { label: 'All Leagues', href: '/leagues', flag: '🌍' },
    ]
  },
  { label: 'Teams', href: '/teams' },
  {
    label: 'Betting', href: '/betting',
    mega: [
      { label: 'Betting Home', href: '/betting', flag: '🎯' },
      { label: 'Best Betting Sites', href: '/betting/best-betting-sites', flag: '⭐' },
      { label: 'Betting Sites with Bonus', href: '/betting/bonus-offers', flag: '🎁' },
      { label: 'Free Bet No Deposit', href: '/betting/free-bets', flag: '💰' },
      { label: 'Best Betting Apps', href: '/betting/best-apps', flag: '📱' },
      { label: 'Top Predictions', href: '/betting/predictions', flag: '🔮' },
      { label: 'Betting Glossary', href: '/betting/glossary', flag: '📖' },
      { label: 'Responsible Gambling', href: '/betting/responsible-gambling', flag: '🛡️' },
    ]
  },
]

const MOBILE_NAV = [
  { label: 'News', href: '/news' },
  { label: 'Transfers', href: '/transfer-news' },
  { label: 'Gossip', href: '/gossip' },
  { label: 'Live Scores', href: '/live-scores' },
  { label: 'Fixtures', href: '/fixtures' },
  { label: 'Tables', href: '/tables' },
  { label: 'Leagues', href: '/leagues' },
  { label: 'Teams', href: '/teams' },
  { label: 'Betting', href: '/betting' },
  { label: 'Predictions', href: '/betting/predictions' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-[#0D1117] shadow-xl">
      {/* Top bar */}
      <div className="bg-black/40 px-4 py-1.5 hidden md:block border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#E63946] font-semibold">
              <Zap size={11} className="animate-pulse" />
              Live Scores. News. Stats. Everything Sports
            </span>
            <span className="text-slate-600 hidden lg:block">
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-5 text-xs text-slate-400">
            <Link href="/betting/predictions" className="hover:text-white transition-colors">🔮 Predictions</Link>
            <Link href="/premium" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">⭐ Go Premium</Link>
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
            <Link href="/register" className="hover:text-white transition-colors">Register</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Logo - matches brand image */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 flex-shrink-0">
              <div className="w-10 h-10 bg-[#0D1117] border-2 border-white/10 rounded-xl flex items-center justify-center overflow-hidden group-hover:border-[#E63946]/50 transition-all">
                <div className="flex items-end leading-none">
                  <span className="text-white font-black text-2xl" style={{fontFamily:'Arial Black,Impact,sans-serif',lineHeight:1}}>S</span>
                  <span className="text-[#E63946] font-black text-base mb-0.5" style={{fontFamily:'Arial Black,Impact,sans-serif',lineHeight:1}}>N</span>
                </div>
                {/* Football dot */}
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center text-[8px]">⚽</div>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="leading-none">
                <span className="text-white font-black text-xl tracking-tight" style={{fontFamily:'Arial Black,Impact,sans-serif'}}>Score</span>
                <span className="text-[#E63946] font-black text-xl tracking-tight" style={{fontFamily:'Arial Black,Impact,sans-serif'}}>Nexa</span>
              </div>
              <div className="text-slate-500 text-[9px] tracking-widest uppercase">Live Scores · News · Stats</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0">
            {MAIN_NAV.map(n => (
              <div key={n.href} className="relative group"
                onMouseEnter={() => n.mega && setMegaOpen(n.label)}
                onMouseLeave={() => setMegaOpen(null)}>
                <Link href={n.href}
                  className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-semibold transition-all tracking-wide
                    ${n.label === 'Betting'
                      ? 'text-[#E63946] hover:text-white hover:bg-[#E63946]'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  style={{fontFamily:'Oswald,sans-serif'}}>
                  {n.label}
                  {n.mega && <ChevronDown size={12} className="opacity-60"/>}
                </Link>

                {/* Mega dropdown */}
                {n.mega && megaOpen === n.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-[#0D1117] border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                    {n.mega.map(item => (
                      <Link key={item.href} href={item.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                        <span>{item.flag}</span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              <Search size={18} />
            </button>
            <Link href="/premium"
              className="hidden sm:flex items-center gap-1.5 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-black px-3 py-2 rounded-lg transition-all"
              style={{fontFamily:'Oswald,sans-serif', letterSpacing:'0.05em'}}>
              ⭐ PREMIUM
            </Link>
            <button onClick={() => setOpen(!open)}
              className="xl:hidden p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="max-w-7xl mx-auto mt-3">
            <form action="/search" className="relative">
              <input name="q" placeholder="Search news, teams, players, transfers, betting tips..."
                className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#E63946] text-sm"
                autoFocus />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <Search size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-[#0D1117] border-t border-white/10 px-4 py-3">
          <nav className="flex flex-col gap-0.5">
            {MOBILE_NAV.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-all
                  ${n.label === 'Betting' ? 'text-[#E63946] hover:bg-[#E63946]/10' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                style={{fontFamily:'Oswald,sans-serif'}}>
                {n.label}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-2 pt-2 grid grid-cols-2 gap-2">
              <Link href="/login" className="text-center py-2.5 text-sm text-slate-300 border border-white/10 rounded-lg hover:bg-white/5 font-medium">Login</Link>
              <Link href="/premium" className="text-center py-2.5 text-sm bg-yellow-500 text-black rounded-lg font-black" style={{fontFamily:'Oswald,sans-serif'}}>⭐ PREMIUM</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
