import type { Metadata } from 'next'
import Link from 'next/link'
import AdSlot from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: 'Best Football Betting Sites 2025 – Top Rated & Reviewed',
  description: 'Compare the best football betting sites for 2025. Expert reviews, bonuses, odds quality and payout speed. Find the right bookmaker for you.',
  keywords: ['best betting sites 2025','football betting sites','top bookmakers','betting site reviews','best odds football'],
}

const SITES = [
  { name:'Betway', score:9.6, bonus:'100% up to £50', pros:['Excellent live betting','Competitive odds','Great mobile app','Fast withdrawals'], cons:['Wagering requirements apply'], href:'/betting/guide-betway', badge:'Editor\'s Choice' },
  { name:'Hollywoodbets', score:9.2, bonus:'£10 Free Bet', pros:['No deposit free bet','Easy registration','Good football markets'], cons:['Smaller selection than rivals'], href:'/betting/guide-hollywoodbets', badge:'Best Free Bet' },
  { name:'Betfred', score:9.0, bonus:'£40 Free Bet', pros:['40 match guarantee','Extra places on racing','Lots of promotions'], cons:['App could be improved'], href:'/betting/guide-betfred', badge:'Top Bonus' },
  { name:'Easybet', score:8.7, bonus:'50% up to £30', pros:['Best odds guarantee','Simple interface','Quick registration'], cons:['Smaller welcome bonus'], href:'/betting/guide-easybet', badge:'' },
  { name:'Yesplay', score:8.4, bonus:'£20 Free Bet', pros:['Fast payouts','Good customer service','Mobile friendly'], cons:['Limited live streaming'], href:'/betting/guide-yesplay', badge:'' },
]

export default function BestBettingSitesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link href="/betting" className="hover:text-[#E63946]">Betting</Link>
          <span>›</span><span>Best Betting Sites</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>🏆 BEST BETTING SITES 2025</h1>
        <p className="text-slate-500 text-sm mt-1">Our experts have reviewed and ranked the top football betting sites based on odds, bonuses, usability and payout speed.</p>
        <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
          <span>✅ Independently reviewed</span>
          <span>✅ Updated monthly</span>
          <span>✅ Licensed bookmakers only</span>
        </div>
      </div>

      <AdSlot position="banner" className="mb-6"/>

      <div className="space-y-5 mb-8">
        {SITES.map((site, i) => (
          <div key={site.name} className="bg-white rounded-2xl border border-slate-100 hover:border-[#E63946]/30 hover:shadow-lg transition-all overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="font-black text-slate-900 text-xl" style={{fontFamily:'Oswald,sans-serif'}}>{site.name}</h2>
                    {site.badge && <span className="bg-[#E63946] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">{site.badge}</span>}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">{[1,2,3,4,5].map(s => <span key={s} className={`text-base ${s <= Math.round(site.score/2) ? 'text-yellow-400' : 'text-slate-200'}`}>★</span>)}</div>
                    <span className="font-black text-slate-900">{site.score}/10</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1.5">Pros</p>
                      <ul className="space-y-1">{site.pros.map(p => <li key={p} className="text-sm text-slate-700 flex items-center gap-1.5"><span className="text-emerald-500 font-bold">✓</span>{p}</li>)}</ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1.5">Cons</p>
                      <ul className="space-y-1">{site.cons.map(c => <li key={c} className="text-sm text-slate-500 flex items-center gap-1.5"><span className="text-red-400">✗</span>{c}</li>)}</ul>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm px-3 py-2 rounded-xl mb-3 whitespace-nowrap">{site.bonus}</div>
                  <Link href={site.href} className="block bg-[#E63946] hover:bg-[#c0303c] text-white font-black px-5 py-2.5 rounded-xl transition-all text-sm text-center" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
                    CLAIM BONUS
                  </Link>
                  <Link href={site.href} className="block text-xs text-slate-400 hover:text-[#E63946] mt-2 text-center transition-colors">Read full review →</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 mb-6">
        <strong>⚠️ Important:</strong> All bonuses are subject to terms and conditions. Wagering requirements apply. ScoreNexa may receive a commission from partner bookmakers at no extra cost to you. Please gamble responsibly. 18+ only. <Link href="/betting/responsible-gambling" className="underline">Read our responsible gambling policy.</Link>
      </div>

      <AdSlot position="in-article"/>
    </div>
  )
}
