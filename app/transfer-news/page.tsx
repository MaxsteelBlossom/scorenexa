import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleCard from '@/components/ui/ArticleCard'
import AdSlot from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: 'Transfer News – Latest Football Transfers & Rumours',
  description: 'The latest football transfer news, rumours and confirmed deals. Stay ahead of every transfer window with ScoreNexa.',
}

const TRANSFERS = [
  { id: '1', title: 'Mbappé Set for Shock Return to PSG as Real Madrid Talks Collapse', slug: 'mbappe-psg-return', excerpt: 'Image rights dispute has brought negotiations to a standstill as PSG re-enter the frame.', featured_image: null, published_at: new Date(Date.now()-3600000).toISOString(), category_name: 'Transfer News', author_name: 'James Fletcher', is_breaking: true, article_type: 'news', views: 14820 },
  { id: '2', title: 'Barcelona Plotting Audacious £180m Double Summer Swoop', slug: 'barcelona-double-swoop', excerpt: 'The Blaugrana have identified two world-class targets and are ready to break their wage structure.', featured_image: null, published_at: new Date(Date.now()-7200000).toISOString(), category_name: 'Transfer News', author_name: 'Carlos Mendez', is_breaking: false, article_type: 'news', views: 7650 },
  { id: '3', title: 'Liverpool Close in on £65m Midfielder as Arne Slot Shapes His Squad', slug: 'liverpool-65m-midfielder', excerpt: 'Slot has made a dynamic central midfielder his top priority ahead of the summer window opening.', featured_image: null, published_at: new Date(Date.now()-10800000).toISOString(), category_name: 'Transfer News', author_name: 'Sarah Williams', is_breaking: false, article_type: 'news', views: 6200 },
  { id: '4', title: 'Manchester United Ready £50m Bid for Bundesliga Sensation', slug: 'man-utd-bundesliga-target', excerpt: 'INEOS are moving quickly on a target that could signal the start of a major rebuild at Old Trafford.', featured_image: null, published_at: new Date(Date.now()-14400000).toISOString(), category_name: 'Transfer News', author_name: 'Mike Thompson', is_breaking: false, article_type: 'news', views: 5400 },
  { id: '5', title: "Bellingham's Agent in Secret Talks With Premier League Giants", slug: 'bellingham-secret-talks', excerpt: 'Growing unrest at Real Madrid has prompted a stunning approach from two top English clubs.', featured_image: null, published_at: new Date(Date.now()-18000000).toISOString(), category_name: 'Transfer News', author_name: 'Insider Desk', is_breaking: false, article_type: 'news', views: 11200 },
  { id: '6', title: 'Chelsea Set to Miss Out on Primary Target as Rival Makes Move', slug: 'chelsea-miss-primary-target', excerpt: 'The Blues have been pipped at the post in a major deal as another club submits a higher bid.', featured_image: null, published_at: new Date(Date.now()-21600000).toISOString(), category_name: 'Transfer News', author_name: 'David Park', is_breaking: false, article_type: 'news', views: 4800 },
]

const CONFIRMED_DEALS = [
  { from: 'Atletico Madrid', to: 'Arsenal', player: 'Julián Alvarez', fee: '£82m', date: 'Jan 2025' },
  { from: 'Sporting CP', to: 'Manchester City', player: 'Viktor Gyökeres', fee: '£75m', date: 'Jan 2025' },
  { from: 'Napoli', to: 'Chelsea', player: 'Khvicha Kvaratskhelia', fee: '£70m', date: 'Jan 2025' },
  { from: 'Brighton', to: 'Liverpool', player: 'Evan Ferguson', fee: '£60m', date: 'Jan 2025' },
]

export default function TransferNewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>💼 TRANSFER NEWS</h1>
        <p className="text-slate-500 text-sm mt-1">Confirmed deals, rumours and exclusive reports from across Europe</p>
      </div>
      <AdSlot position="banner" className="mb-6"/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2" style={{fontFamily:'Oswald,sans-serif'}}>
            <span className="w-1 h-5 bg-purple-600 rounded-full"/>LATEST TRANSFER STORIES
          </h2>
          {TRANSFERS.map(a => <ArticleCard key={a.id} article={a} size="medium"/>)}
        </div>
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-4 py-3">
              <h3 className="text-white font-bold text-sm" style={{fontFamily:'Oswald,sans-serif'}}>✅ CONFIRMED DEALS</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {CONFIRMED_DEALS.map((d,i) => (
                <div key={i} className="px-4 py-3">
                  <p className="font-bold text-slate-800 text-sm">{d.player}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="text-slate-500">{d.from}</span>
                    <span className="text-emerald-500 font-bold">→</span>
                    <span className="text-slate-800 font-semibold">{d.to}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="bg-emerald-100 text-emerald-700 font-bold text-xs px-2 py-0.5 rounded">{d.fee}</span>
                    <span className="text-[10px] text-slate-400">{d.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <AdSlot position="sidebar"/>
        </aside>
      </div>
    </div>
  )
}
