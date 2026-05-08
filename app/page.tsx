import Link from 'next/link'
import { Suspense } from 'react'
import AdSlot from '@/components/ui/AdSlot'
import ArticleCard from '@/components/ui/ArticleCard'
import StandingsWidget from '@/components/home/StandingsWidget'
import { getTodayFixtures } from '@/lib/sports/adapter'
import LiveScoreCard from '@/components/scores/LiveScoreCard'
import { Clock, TrendingUp, Zap, ChevronRight } from 'lucide-react'

// Mock articles for homepage (replace with Supabase fetch)
const FEATURED_ARTICLES = [
  { id: '1', title: 'Mbappé Set for Shock Return to PSG as Real Madrid Talks Collapse', slug: 'mbappe-shock-return-psg-real-madrid', excerpt: 'Sources close to the French superstar reveal that negotiations with Real Madrid have broken down completely over image rights.', featured_image: null, published_at: new Date(Date.now() - 3600000).toISOString(), category_name: 'Transfer News', author_name: 'James Fletcher', is_breaking: true, article_type: 'news', views: 14820 },
  { id: '2', title: 'Arsenal vs Man City: Five Key Battles That Will Decide the Title Race', slug: 'arsenal-man-city-five-key-battles', excerpt: 'As the two title contenders prepare to face off, we break down the tactical matchups that could define the Premier League season.', featured_image: null, published_at: new Date(Date.now() - 7200000).toISOString(), category_name: 'News', author_name: 'Sarah Williams', is_breaking: false, article_type: 'news', views: 9240 },
  { id: '3', title: 'Barcelona Plotting Audacious Double Swoop Worth £180m This Summer', slug: 'barcelona-double-swoop-summer-transfer', excerpt: 'Blaugrana president signals major investment plans with two world-class signings targeted for the upcoming transfer window.', featured_image: null, published_at: new Date(Date.now() - 10800000).toISOString(), category_name: 'Transfer News', author_name: 'Carlos Mendez', is_breaking: false, article_type: 'news', views: 7650 },
  { id: '4', title: 'Premier League Refs Under Fire Again After Three Controversial Decisions', slug: 'premier-league-refs-controversy-week-28', excerpt: 'Former officials slam VAR as another round of matches produces game-changing errors that have clubs furious.', featured_image: null, published_at: new Date(Date.now() - 14400000).toISOString(), category_name: 'News', author_name: 'Mike Thompson', is_breaking: false, article_type: 'news', views: 6300 },
  { id: '5', title: "Exclusive: Bellingham's Agent Holds Secret Talks With Premier League Giants", slug: 'bellingham-agent-secret-talks-premier-league', excerpt: 'In a stunning development, Jude Bellingham\'s representatives have been spotted in London amid growing unrest at Real Madrid.', featured_image: null, published_at: new Date(Date.now() - 18000000).toISOString(), category_name: 'Gossip', author_name: 'Insider Desk', is_breaking: false, article_type: 'gossip', views: 11200 },
]

const TRENDING = [
  { id: '6', title: 'Ten Hag: "I Have Full Board Support" — But Figures Tell a Different Story', slug: 'ten-hag-board-support-man-utd', excerpt: null, featured_image: null, published_at: new Date(Date.now() - 21600000).toISOString(), category_name: 'News', author_name: null, is_breaking: false, article_type: 'news', views: 4500 },
  { id: '7', title: 'Guardiola Drops Biggest Hint Yet That He Will Leave City Next Summer', slug: 'guardiola-leave-man-city-summer', excerpt: null, featured_image: null, published_at: new Date(Date.now() - 28800000).toISOString(), category_name: 'News', author_name: null, is_breaking: false, article_type: 'news', views: 8900 },
  { id: '8', title: 'Liverpool Identify Lamine Yamal as Top Transfer Priority — Price Tag Revealed', slug: 'liverpool-lamine-yamal-transfer-target', excerpt: null, featured_image: null, published_at: new Date(Date.now() - 36000000).toISOString(), category_name: 'Transfer News', author_name: null, is_breaking: false, article_type: 'news', views: 6700 },
  { id: '9', title: 'RATED: Every Signing in January Ranked from Disasters to Masterstrokes', slug: 'january-signings-ranked-rated', excerpt: null, featured_image: null, published_at: new Date(Date.now() - 43200000).toISOString(), category_name: 'Opinion', author_name: null, is_breaking: false, article_type: 'news', views: 5500 },
  { id: '10', title: 'Chelsea Complete Surprise Signing Hours Before Deadline', slug: 'chelsea-surprise-deadline-day-signing', excerpt: null, featured_image: null, published_at: new Date(Date.now() - 50400000).toISOString(), category_name: 'Transfer News', author_name: null, is_breaking: true, article_type: 'news', views: 9800 },
]

async function TodayScores() {
  const matches = await getTodayFixtures()
  const live = matches.filter(m => m.status === 'LIVE' || m.status === '1H' || m.status === '2H' || m.status === 'HT')
  const displayed = live.length > 0 ? live : matches.slice(0, 4)

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-bold text-sm flex items-center gap-1.5" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
          <Zap size={14} className="animate-pulse" />
          {live.length > 0 ? 'LIVE NOW' : "TODAY'S MATCHES"}
        </h3>
        <Link href="/live-scores" className="text-red-200 hover:text-white text-xs transition-colors">All Scores →</Link>
      </div>
      <div className="divide-y divide-slate-50">
        {displayed.map(m => (
          <div key={m.id} className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors">
            <div className="flex-1 text-right">
              <p className="text-sm font-semibold text-slate-800 truncate">{m.homeTeam}</p>
            </div>
            <div className="flex-shrink-0 text-center min-w-[72px]">
              {m.homeScore !== null ? (
                <span className="font-bold text-slate-900 text-base">{m.homeScore} - {m.awayScore}</span>
              ) : (
                <span className="text-xs text-blue-600 font-semibold">{new Date(m.kickoffTime).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</span>
              )}
              <div className={`text-[10px] font-bold mt-0.5 ${(m.status === 'LIVE' || m.status === '1H' || m.status === '2H') ? 'text-red-500' : 'text-slate-400'}`}>
                {m.minute ? `${m.minute}'` : m.status}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800 truncate">{m.awayTeam}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const [hero, ...rest] = FEATURED_ARTICLES
  const secondary = rest.slice(0, 2)
  const tertiary = rest.slice(2)

  return (
    <div className="bg-[#f8f9fc]">
      {/* Hero section */}
      <section className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main hero */}
          <div className="lg:col-span-2">
            <ArticleCard article={hero} size="large" />
          </div>
          {/* Secondary stories */}
          <div className="flex flex-col gap-4">
            {secondary.map(a => (
              <ArticleCard key={a.id} article={a} size="small" />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <AdSlot position="banner" />
      </div>

      {/* Main content grid */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: News feed */}
          <div className="lg:col-span-2 space-y-8">
            {/* Latest News */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
                  <span className="w-1 h-6 bg-blue-600 rounded-full inline-block"/>
                  LATEST NEWS
                </h2>
                <Link href="/news" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">All News <ChevronRight size={14}/></Link>
              </div>
              <div className="space-y-3">
                {FEATURED_ARTICLES.map(a => (
                  <ArticleCard key={a.id} article={a} size="medium" />
                ))}
              </div>
            </div>

            {/* In-article Ad */}
            <AdSlot position="in-article" />

            {/* Transfer News */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
                  <span className="w-1 h-6 bg-purple-600 rounded-full inline-block"/>
                  TRANSFER NEWS
                </h2>
                <Link href="/transfer-news" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">All Transfers <ChevronRight size={14}/></Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FEATURED_ARTICLES.filter(a => a.category_name === 'Transfer News').map(a => (
                  <ArticleCard key={a.id} article={a} size="small" />
                ))}
              </div>
            </div>

            {/* Gossip Section */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-orange-900 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
                  🔥 GOSSIP COLUMN
                </h2>
                <Link href="/gossip" className="text-orange-600 hover:text-orange-700 text-sm font-medium">More Gossip →</Link>
              </div>
              <div className="space-y-3">
                {TRENDING.filter(a => a.category_name === 'Transfer News').map((a, i) => (
                  <Link key={a.id} href={`/article/${a.slug}`} className="flex items-start gap-3 group">
                    <span className="text-2xl font-bold text-orange-300 leading-none">{String(i+1).padStart(2,'0')}</span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-orange-700 transition-colors leading-tight">{a.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{new Date(a.published_at!).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-6">
            {/* Live Scores Widget */}
            <Suspense fallback={<div className="bg-white rounded-2xl border border-slate-100 h-64 animate-pulse"/>}>
              <TodayScores />
            </Suspense>

            {/* Sidebar Ad */}
            <AdSlot position="sidebar" />

            {/* Standings Widget */}
            <Suspense fallback={<div className="bg-white rounded-2xl border border-slate-100 h-96 animate-pulse"/>}>
              <StandingsWidget />
            </Suspense>

            {/* Trending */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 flex items-center gap-2">
                <TrendingUp size={14} className="text-emerald-400"/>
                <h3 className="text-white font-bold text-sm" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>TRENDING NOW</h3>
              </div>
              <div className="p-3 space-y-1">
                {TRENDING.map((a, i) => (
                  <Link key={a.id} href={`/article/${a.slug}`}
                    className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg group transition-colors">
                    <span className="text-lg font-bold text-slate-200 w-6 text-center flex-shrink-0">{i+1}</span>
                    <p className="text-sm text-slate-700 group-hover:text-blue-700 font-medium leading-tight transition-colors line-clamp-2">{a.title}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-[#0f1f5c] to-[#1d4ed8] rounded-2xl p-5 text-white">
              <h3 className="font-bold text-lg mb-1" style={{fontFamily:'Oswald,sans-serif'}}>📧 DAILY DIGEST</h3>
              <p className="text-blue-200 text-sm mb-4">Get the day's biggest football stories direct to your inbox.</p>
              <form className="space-y-2" action="/api/newsletter" method="POST">
                <input type="email" name="email" placeholder="Your email address" className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" required />
                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2.5 rounded-lg text-sm transition-all" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
                  SUBSCRIBE FREE
                </button>
              </form>
              <p className="text-blue-300 text-xs mt-2 text-center">No spam. Unsubscribe anytime.</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Mobile footer ad */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-1">
        <AdSlot position="mobile-footer" />
      </div>
    </div>
  )
}
