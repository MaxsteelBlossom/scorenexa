import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-[#0D1117] text-slate-400 mt-16">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-[#0D1117] border border-white/20 rounded-xl flex items-center justify-center relative">
                <div className="flex items-end leading-none">
                  <span className="text-white font-black text-2xl" style={{fontFamily:'Arial Black,Impact,sans-serif',lineHeight:1}}>S</span>
                  <span className="text-[#E63946] font-black text-base mb-0.5" style={{fontFamily:'Arial Black,Impact,sans-serif',lineHeight:1}}>N</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center text-[8px]">⚽</div>
              </div>
              <div>
                <div>
                  <span className="text-white font-black text-lg" style={{fontFamily:'Arial Black,Impact,sans-serif'}}>Score</span>
                  <span className="text-[#E63946] font-black text-lg" style={{fontFamily:'Arial Black,Impact,sans-serif'}}>Nexa</span>
                </div>
                <div className="text-slate-500 text-[9px] tracking-widest uppercase">Live Scores · News · Stats</div>
              </div>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">Real-time sports intelligence. Live scores, transfer news, fixtures, betting tips and expert football coverage 24/7.</p>
            <div className="flex gap-2">
              {[['X', 'https://x.com/scorenexa'], ['IG', 'https://instagram.com/scorenexa'], ['YT', 'https://youtube.com/@scorenexa'], ['FB', 'https://facebook.com/scorenexa']].map(([s, h]) => (
                <a key={s} href={h} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/5 hover:bg-[#E63946] rounded-lg flex items-center justify-center cursor-pointer transition-all text-xs font-bold text-slate-400 hover:text-white">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Football */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider" style={{fontFamily:'Oswald,sans-serif'}}>Football</h4>
            <nav className="flex flex-col gap-2 text-sm">
              {[['News', '/news'], ['Transfer News', '/transfer-news'], ['Gossip', '/gossip'], ['Live Scores', '/live-scores'], ['Fixtures', '/fixtures'], ['Tables', '/tables']].map(([l, h]) => (
                <Link key={h} href={h} className="hover:text-white transition-colors">{l}</Link>
              ))}
            </nav>
          </div>

          {/* Competitions */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider" style={{fontFamily:'Oswald,sans-serif'}}>Competitions</h4>
            <nav className="flex flex-col gap-2 text-sm">
              {[['Premier League', '/leagues/premier-league'], ['La Liga', '/leagues/la-liga'], ['Champions League', '/leagues/champions-league'], ['Bundesliga', '/leagues/bundesliga'], ['Serie A', '/leagues/serie-a'], ['All Leagues', '/leagues']].map(([l, h]) => (
                <Link key={h} href={h} className="hover:text-white transition-colors">{l}</Link>
              ))}
            </nav>
          </div>

          {/* Betting */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-1.5" style={{fontFamily:'Oswald,sans-serif'}}>
              <span className="w-1.5 h-1.5 bg-[#E63946] rounded-full inline-block"/>Betting
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              {[['Betting Home', '/betting'], ['How We Produce Content', '/betting/how-we-produce-content'], ['Responsible Gambling', '/betting/responsible-gambling'], ['Best Betting Sites', '/betting/best-betting-sites'], ['Bonus Offers', '/betting/bonus-offers'], ['Free Bet No Deposit', '/betting/free-bets'], ['Best Betting Apps', '/betting/best-apps']].map(([l, h]) => (
                <Link key={h} href={h} className="hover:text-white transition-colors">{l}</Link>
              ))}
            </nav>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider" style={{fontFamily:'Oswald,sans-serif'}}>Company</h4>
            <nav className="flex flex-col gap-2 text-sm">
              {[['About Us', '/about'], ['Premium', '/premium'], ['Advertise', '/advertise-with-us'], ['Contact', '/contact'], ['Privacy Policy', '/privacy-policy'], ['Terms of Use', '/terms'], ['Editorial Policy', '/editorial-policy'], ['DMCA', '/dmca']].map(([l, h]) => (
                <Link key={h} href={h} className="hover:text-white transition-colors">{l}</Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Responsible gambling notice */}
        <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">🛡️</span>
          <div>
            <p className="text-white text-xs font-bold mb-1">RESPONSIBLE GAMBLING</p>
            <p className="text-slate-500 text-xs leading-relaxed">Betting content on ScoreNexa is for informational purposes only. Please gamble responsibly. If you or someone you know has a gambling problem, contact the National Problem Gambling Helpline. Must be 18+ to bet. Terms and conditions apply.</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">© {currentYear} ScoreNexa. All rights reserved. Part of SyntaxForgeScriptHorizon.</p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-600">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
            <Link href="/editorial-policy" className="hover:text-slate-400 transition-colors">Editorial Policy</Link>
            <Link href="/dmca" className="hover:text-slate-400 transition-colors">DMCA</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">Sitemap</Link>
          </div>
          <p className="text-xs text-slate-700">🌍 Football fans worldwide</p>
        </div>
      </div>
    </footer>
  )
}
