import type { Metadata } from 'next'
import Link from 'next/link'
import { Search } from 'lucide-react'
import AdSlot from '@/components/ui/AdSlot'

export const metadata: Metadata = { title: 'Search – ScoreNexa', description: 'Search ScoreNexa for news, teams, players and more.' }

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || ''
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6" style={{fontFamily:'Oswald,sans-serif'}}>🔍 SEARCH</h1>
      <form className="relative mb-6">
        <input name="q" defaultValue={query} placeholder="Search news, teams, players, transfers..."
          className="w-full border-2 border-slate-200 focus:border-blue-500 rounded-2xl px-5 py-4 pr-14 text-base outline-none transition-all"/>
        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700">
          <Search size={22}/>
        </button>
      </form>
      <AdSlot position="banner" className="mb-6"/>
      {query ? (
        <div>
          <p className="text-slate-500 text-sm mb-4">Showing results for <strong className="text-slate-800">"{query}"</strong></p>
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center">
            <p className="text-slate-500">Search connected to Supabase full-text search. Configure your database and the results will appear here automatically.</p>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-slate-600 font-medium mb-3" style={{fontFamily:'Oswald,sans-serif'}}>TRENDING SEARCHES</p>
          <div className="flex flex-wrap gap-2">
            {['Mbappé transfer','Premier League table','Champions League fixtures','Arsenal news','Real Madrid','Man City scores','Erling Haaland','Transfer window'].map(t => (
              <Link key={t} href={`/search?q=${encodeURIComponent(t)}`}
                className="bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-700 text-slate-600 px-4 py-2 rounded-full text-sm transition-all">
                🔍 {t}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
