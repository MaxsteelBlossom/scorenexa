import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Advertise With Us – ScoreNexa', description: 'Reach millions of passionate football fans. Advertising opportunities on ScoreNexa.' }
export default function AdvertisePage() {
  const options = [
    { name: 'Homepage Banner', desc: 'Premium 728x90 or 970x90 placement at the top of our homepage', price: 'From £500/week' },
    { name: 'Sponsored Article', desc: 'In-depth branded content written by our editorial team and clearly labelled as sponsored', price: 'From £300/article' },
    { name: 'Newsletter Sponsorship', desc: 'Dedicated banner or mention in our daily digest newsletter sent to 10,000+ subscribers', price: 'From £200/send' },
    { name: 'In-Feed Display Ads', desc: 'Programmatic or direct display advertising within our article feeds', price: 'CPM-based' },
    { name: 'Social Media Promotion', desc: 'Branded promotion across our Twitter/X, Instagram and YouTube channels', price: 'From £150/post' },
  ]
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>ADVERTISE WITH SCORENEXA</h1>
      <p className="text-slate-500 mb-8 text-lg">Reach passionate football fans when they're most engaged</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-center">
        {[['100K+','Monthly Visitors'],['50K+','Newsletter Subscribers'],['250K+','Monthly Page Views']].map(([n,l]) => (
          <div key={l} className="bg-gradient-to-br from-[#0f1f5c] to-[#1d4ed8] rounded-2xl p-6 text-white">
            <p className="text-3xl font-bold" style={{fontFamily:'Oswald,sans-serif'}}>{n}</p>
            <p className="text-blue-200 text-sm mt-1">{l}</p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-4" style={{fontFamily:'Oswald,sans-serif'}}>ADVERTISING OPTIONS</h2>
      <div className="space-y-3 mb-10">
        {options.map(o => (
          <div key={o.name} className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900">{o.name}</h3>
                <p className="text-slate-500 text-sm mt-1">{o.desc}</p>
              </div>
              <span className="text-blue-600 font-semibold text-sm flex-shrink-0">{o.price}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-blue-50 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-slate-900 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>GET IN TOUCH</h3>
        <p className="text-slate-600 mb-4">Contact our advertising team for a media pack and custom pricing</p>
        <a href="mailto:ads@scorenexa.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
          📧 ads@scorenexa.com
        </a>
      </div>
    </div>
  )
}
