import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Editorial Policy – ScoreNexa', description: "ScoreNexa's editorial standards and policies for news, transfer rumours and gossip coverage." }
export default function EditorialPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>EDITORIAL POLICY</h1>
      <p className="text-slate-400 text-sm mb-8">How we report, verify and publish football news</p>
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm">
        <p>ScoreNexa is committed to fair, accurate and transparent journalism. This editorial policy outlines the standards our writers and editors adhere to.</p>
        <h2 className="text-lg font-bold text-slate-900 mt-6" style={{fontFamily:'Oswald,sans-serif'}}>NEWS REPORTING</h2>
        <p>News articles are based on verified information from at least two independent sources where possible. We clearly identify when a report is based on a single source. Breaking news may be published before full verification and will be updated as information becomes available.</p>
        <h2 className="text-lg font-bold text-slate-900 mt-6" style={{fontFamily:'Oswald,sans-serif'}}>TRANSFER RUMOURS & GOSSIP</h2>
        <p>Transfer stories are clearly labelled by confidence level. Stories from credible national newspapers or well-known reporters are presented differently to third-hand speculation. We do not fabricate transfer stories. Gossip is clearly labelled as such.</p>
        <h2 className="text-lg font-bold text-slate-900 mt-6" style={{fontFamily:'Oswald,sans-serif'}}>SPONSORED CONTENT</h2>
        <p>All sponsored and branded content is clearly labelled as "Sponsored" or "Advertisement" in line with ASA guidelines. Our editorial team has no obligation to produce favourable coverage of advertisers.</p>
        <h2 className="text-lg font-bold text-slate-900 mt-6" style={{fontFamily:'Oswald,sans-serif'}}>CORRECTIONS</h2>
        <p>We promptly correct factual errors and clearly note when an article has been updated. Corrections can be requested by emailing editorial@scorenexa.com.</p>
      </div>
    </div>
  )
}
