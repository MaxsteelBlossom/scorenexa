import type { Metadata } from 'next'
import AdSlot from '@/components/ui/AdSlot'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const name = params.slug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())
  return {
    title: `${name} – News, Squad, Fixtures & Results`,
    description: `Latest ${name} news, squad information, upcoming fixtures and match results on ScoreNexa.`,
  }
}

export default function TeamPage({ params }: { params: { slug: string } }) {
  const name = params.slug.replace(/-/g,' ').replace(/\b\w/g,(c:string)=>c.toUpperCase())
  const tabs = ['Overview','News','Fixtures','Results','Squad','Stats']
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-[#0f1f5c] to-[#1d4ed8] rounded-2xl p-6 mb-6 flex items-center gap-5">
        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl font-bold text-white">{name[0]}</div>
        <div>
          <h1 className="text-3xl font-bold text-white" style={{fontFamily:'Oswald,sans-serif'}}>{name}</h1>
          <p className="text-blue-200 text-sm mt-1">Premier League · England</p>
        </div>
      </div>
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {tabs.map((t,i) => (
          <button key={t} className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${i===0?'bg-blue-600 text-white':'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'}`}>{t}</button>
        ))}
      </div>
      <AdSlot position="banner" className="mb-6"/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="font-bold text-slate-800 mb-4" style={{fontFamily:'Oswald,sans-serif'}}>LATEST {name.toUpperCase()} NEWS</h2>
            <p className="text-slate-500 text-sm">Connect your Supabase database to display team-specific articles. Add the team tag when publishing articles in the admin dashboard.</p>
          </div>
        </div>
        <aside>
          <AdSlot position="sidebar"/>
        </aside>
      </div>
    </div>
  )
}
