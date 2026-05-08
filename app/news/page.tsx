import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleCard from '@/components/ui/ArticleCard'
import AdSlot from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: 'Football News – Latest Stories & Breaking News',
  description: 'The latest football news, match reports, and expert analysis from around the world. Updated throughout the day.',
}

const NEWS_ARTICLES = [
  { id: '1', title: 'Mbappé Set for Shock Return to PSG as Real Madrid Talks Collapse', slug: 'mbappe-shock-return-psg', excerpt: 'Negotiations over image rights have broken down, with the French star reportedly unhappy in Madrid.', featured_image: null, published_at: new Date(Date.now() - 3600000).toISOString(), category_name: 'Transfer News', author_name: 'James Fletcher', is_breaking: true, article_type: 'news', views: 14820 },
  { id: '2', title: 'Arsenal vs Man City: Five Key Battles That Will Decide the Title Race', slug: 'arsenal-man-city-key-battles', excerpt: 'Tactical analysis of the crucial matchup at the Etihad that could define who lifts the Premier League trophy.', featured_image: null, published_at: new Date(Date.now() - 7200000).toISOString(), category_name: 'News', author_name: 'Sarah Williams', is_breaking: false, article_type: 'news', views: 9240 },
  { id: '3', title: 'Guardiola Drops Biggest Hint Yet He Will Leave Manchester City', slug: 'guardiola-hints-man-city-exit', excerpt: 'The City manager gave a heavily coded response when pressed on his future at the Etihad beyond this season.', featured_image: null, published_at: new Date(Date.now() - 10800000).toISOString(), category_name: 'News', author_name: 'Mike Thompson', is_breaking: false, article_type: 'news', views: 8900 },
  { id: '4', title: 'Barcelona Plotting £180m Summer Double Swoop', slug: 'barcelona-180m-double-swoop-summer', excerpt: 'The Catalan club have identified two world-class targets and are prepared to break their wage structure.', featured_image: null, published_at: new Date(Date.now() - 14400000).toISOString(), category_name: 'Transfer News', author_name: 'Carlos Mendez', is_breaking: false, article_type: 'news', views: 7650 },
  { id: '5', title: 'Premier League Referees Facing Emergency Summit After VAR Chaos', slug: 'premier-league-var-emergency-summit', excerpt: 'The PGMOL have called an urgent review after three high-profile incidents in one matchweek sparked furious reactions from clubs.', featured_image: null, published_at: new Date(Date.now() - 18000000).toISOString(), category_name: 'News', author_name: 'David Park', is_breaking: false, article_type: 'news', views: 6300 },
  { id: '6', title: 'Ten Hag Promises "Everything Will Change" as Man United Review Looms', slug: 'ten-hag-man-united-review', excerpt: 'The Dutch manager spoke defiantly ahead of a critical board meeting that could determine his future at Old Trafford.', featured_image: null, published_at: new Date(Date.now() - 21600000).toISOString(), category_name: 'News', author_name: 'James Fletcher', is_breaking: false, article_type: 'news', views: 5400 },
  { id: '7', title: 'Liverpool Eye Lamine Yamal in Audacious £180m Summer Bid', slug: 'liverpool-lamine-yamal-bid', excerpt: 'Arne Slot has personally requested the board pursue the teenage sensation as Liverpool plan their next evolution.', featured_image: null, published_at: new Date(Date.now() - 28800000).toISOString(), category_name: 'Transfer News', author_name: 'Sarah Williams', is_breaking: false, article_type: 'news', views: 6700 },
  { id: '8', title: 'January Window: Every Signing Rated From Masterstrokes to Disasters', slug: 'january-window-all-signings-rated', excerpt: 'We graded every single transfer from the winter window — there were some real surprises among the big clubs.', featured_image: null, published_at: new Date(Date.now() - 36000000).toISOString(), category_name: 'Opinion', author_name: 'Mike Thompson', is_breaking: false, article_type: 'news', views: 5500 },
]

const CATEGORIES = ['All', 'News', 'Transfer News', 'Gossip', 'Match Reports', 'Opinion', 'Premier League', 'Champions League']

export default function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-1" style={{fontFamily:'Oswald,sans-serif'}}>⚽ FOOTBALL NEWS</h1>
        <p className="text-slate-500 text-sm">The latest stories, breaking news and expert analysis</p>
      </div>
      
      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map(cat => (
          <button key={cat} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${cat === 'All' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700'}`}>
            {cat}
          </button>
        ))}
      </div>

      <AdSlot position="banner" className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {NEWS_ARTICLES.map(a => <ArticleCard key={a.id} article={a} size="medium" />)}
          <div className="text-center pt-4">
            <button className="bg-white border border-slate-200 hover:border-blue-300 text-slate-600 hover:text-blue-700 px-8 py-3 rounded-xl font-medium transition-all">
              Load More Stories
            </button>
          </div>
        </div>
        <aside className="space-y-6">
          <AdSlot position="sidebar" />
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <h3 className="font-bold text-slate-800 mb-3" style={{fontFamily:'Oswald,sans-serif'}}>MOST READ TODAY</h3>
            <div className="space-y-3">
              {NEWS_ARTICLES.slice(0,5).map((a,i) => (
                <Link key={a.id} href={`/article/${a.slug}`} className="flex items-start gap-3 group">
                  <span className="text-xl font-bold text-slate-200 w-5 flex-shrink-0">{i+1}</span>
                  <p className="text-sm text-slate-700 group-hover:text-blue-700 font-medium transition-colors line-clamp-2">{a.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
