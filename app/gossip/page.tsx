import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleCard from '@/components/ui/ArticleCard'
import AdSlot from '@/components/ui/AdSlot'
import { timeAgo } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Football Gossip – Rumours, Whispers & Inside Stories',
  description: "The hottest football gossip and transfer rumours. ScoreNexa's gossip column brings you the inside track on what's really happening.",
}

const GOSSIP_ITEMS = [
  { id: '1', title: "EXCLUSIVE: Star Striker's Wife Posts Cryptic Goodbye Message as Exit Talks Accelerate", slug: 'star-striker-wife-goodbye-message', excerpt: "The social media activity from the player's family is fuelling speculation of an imminent departure.", featured_image: null, published_at: new Date(Date.now()-1800000).toISOString(), category_name: 'Gossip', author_name: 'Insider Desk', is_breaking: true, article_type: 'gossip', views: 22400 },
  { id: '2', title: "City Boss and Chairman Involved in Training Ground Row — Source", slug: 'city-boss-chairman-row', excerpt: "Relations between the manager and the boardroom have reportedly soured significantly since the January window.", featured_image: null, published_at: new Date(Date.now()-5400000).toISOString(), category_name: 'Gossip', author_name: 'Insider Desk', is_breaking: false, article_type: 'gossip', views: 15600 },
  { id: '3', title: 'Top-Six Defender "Offered Around" by Agent Amid Contract Standoff', slug: 'top-six-defender-offered-around', excerpt: "The defender's representative has been busy making calls as the player's deal enters its final 18 months.", featured_image: null, published_at: new Date(Date.now()-9000000).toISOString(), category_name: 'Gossip', author_name: 'Insider Desk', is_breaking: false, article_type: 'gossip', views: 9800 },
  { id: '4', title: "Bellingham's Camp Furious After Real Madrid's Latest Snub", slug: 'bellingham-camp-fury-real-madrid', excerpt: "The player reportedly felt humiliated by a commercial decision that sidelined him in a high-profile campaign.", featured_image: null, published_at: new Date(Date.now()-12600000).toISOString(), category_name: 'Gossip', author_name: 'Insider Desk', is_breaking: false, article_type: 'gossip', views: 18300 },
  { id: '5', title: 'Premier League Dressing Room Divided Over Disgruntled Teammate', slug: 'premier-league-dressing-room-divided', excerpt: "A faction of senior players have reportedly distanced themselves from a teammate who downed tools.", featured_image: null, published_at: new Date(Date.now()-18000000).toISOString(), category_name: 'Gossip', author_name: 'Sources Say', is_breaking: false, article_type: 'gossip', views: 11000 },
]

export default function GossipPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-3">🔥 GOSSIP COLUMN</div>
        <h1 className="text-3xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>FOOTBALL GOSSIP</h1>
        <p className="text-slate-500 text-sm mt-1">Inside stories, whispers and rumours from our sources across Europe</p>
      </div>
      <AdSlot position="banner" className="mb-6"/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {GOSSIP_ITEMS.map(a => <ArticleCard key={a.id} article={a} size="medium"/>)}
        </div>
        <aside className="space-y-6">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-4">
            <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
              🌡️ GOSSIP HEAT INDEX
            </h3>
            <div className="space-y-3">
              {GOSSIP_ITEMS.slice(0,5).map((g,i) => (
                <Link key={g.id} href={`/article/${g.slug}`} className="flex items-start gap-2 group">
                  <span className="text-orange-300 font-bold text-lg w-6 flex-shrink-0">{i+1}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-orange-700 transition-colors line-clamp-2 leading-tight">{g.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">🔥 {g.views.toLocaleString()} reads · {timeAgo(g.published_at)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <AdSlot position="sidebar"/>
        </aside>
      </div>
    </div>
  )
}
