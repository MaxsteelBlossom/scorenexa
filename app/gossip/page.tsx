import type { Metadata } from 'next'
import Link from 'next/link'
import AdSlot from '@/components/ui/AdSlot'
import { Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Football Gossip – Rumours, Whispers & Inside Stories',
  description: "The hottest football gossip and transfer rumours from ScoreNexa's gossip column.",
}

async function getGossip() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return []
    const res = await fetch(
      `${url}/rest/v1/articles?status=eq.published&order=published_at.desc&limit=20&or=(category_name.eq.Gossip,article_type.eq.gossip)`,
      { headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }, next: { revalidate: 60 } }
    )
    if (!res.ok) return []
    return await res.json()
  } catch { return [] }
}

export default async function GossipPage() {
  const articles = await getGossip()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-3">🔥 GOSSIP COLUMN</div>
      <h1 className="text-3xl font-black text-slate-900 mb-1" style={{fontFamily:'Oswald,sans-serif'}}>FOOTBALL GOSSIP</h1>
      <p className="text-slate-500 text-sm mb-6">Inside stories, whispers and rumours from our sources</p>
      <AdSlot position="banner" className="mb-6"/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {articles.length > 0 ? (
            <div className="space-y-3">
              {articles.map((a: any) => (
                <Link key={a.id} href={`/article/${a.slug}`} className="group flex gap-4 bg-white rounded-xl border border-slate-100 hover:border-orange-200 hover:shadow-md transition-all p-3">
                  {a.featured_image ? <img src={a.featured_image} alt={a.title} className="w-28 h-20 object-cover rounded-lg flex-shrink-0"/> : <div className="w-28 h-20 bg-gradient-to-br from-orange-900 to-slate-800 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl">🔥</div>}
                  <div className="flex-1 min-w-0">
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded mb-1 inline-block">Gossip</span>
                    <h3 className="text-slate-800 font-black text-sm line-clamp-2 group-hover:text-orange-700 transition-colors leading-snug" style={{fontFamily:'Oswald,sans-serif'}}>{a.title}</h3>
                    {a.excerpt && <p className="text-slate-500 text-xs mt-1 line-clamp-1">{a.excerpt}</p>}
                    <div className="flex items-center gap-3 mt-2 text-slate-400 text-xs">
                      <span className="flex items-center gap-1"><Clock size={10}/>{a.published_at ? new Date(a.published_at).toLocaleDateString('en-GB',{day:'numeric',month:'short'}) : ''}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
              <div className="text-5xl mb-4">🔥</div>
              <h3 className="text-xl font-black text-slate-700 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>NO GOSSIP YET</h3>
              <p className="text-slate-400 text-sm mb-4">Start your gossip column from the admin panel.</p>
              <Link href="/admin/articles/new?type=gossip" className="bg-orange-500 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all">Write Gossip Story →</Link>
            </div>
          )}
        </div>
        <aside><AdSlot position="sidebar"/></aside>
      </div>
    </div>
  )
}
