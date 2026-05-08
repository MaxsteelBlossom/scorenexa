import type { Metadata } from 'next'
import Link from 'next/link'
import AdSlot from '@/components/ui/AdSlot'
export const metadata: Metadata = {
  title: 'Both Teams to Score Tips Today | ScoreNexa',
  description: 'ScoreNexa betting hub: Both Teams to Score Tips Today. Expert content, updated regularly.',
}
export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
        <Link href="/betting" className="hover:text-[#E63946]">Betting</Link><span>›</span><span>Both Teams to Score Tips Today</span>
      </div>
      <h1 className="text-3xl font-black text-slate-900 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>Both Teams to Score Tips Today</h1>
      <AdSlot position="banner" className="my-6"/>
      <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center">
        <div className="text-5xl mb-4">🎯</div>
        <h2 className="text-xl font-bold text-slate-800 mb-3" style={{fontFamily:'Oswald,sans-serif'}}>Content Coming Soon</h2>
        <p className="text-slate-500 mb-6">Our editorial team is preparing expert content for this page. Check back soon for comprehensive guides and tips.</p>
        <Link href="/betting" className="bg-[#E63946] hover:bg-[#c0303c] text-white font-bold px-6 py-3 rounded-xl transition-all inline-block" style={{fontFamily:'Oswald,sans-serif'}}>← BACK TO BETTING</Link>
      </div>
    </div>
  )
}
