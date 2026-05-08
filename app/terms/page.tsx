import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Terms of Service – ScoreNexa' }
export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>TERMS OF SERVICE</h1>
      <p className="text-slate-400 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</p>
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm">
        <p>By accessing or using ScoreNexa, you agree to be bound by these Terms of Service. Please read them carefully before using the platform.</p>
        <h2 className="text-lg font-bold text-slate-900 mt-6" style={{fontFamily:'Oswald,sans-serif'}}>1. USE OF THE SERVICE</h2>
        <p>ScoreNexa provides football news, live scores, fixtures and related content for personal, non-commercial use. You agree not to reproduce, republish or redistribute our content without written permission. You must be at least 13 years of age to use ScoreNexa.</p>
        <h2 className="text-lg font-bold text-slate-900 mt-6" style={{fontFamily:'Oswald,sans-serif'}}>2. PREMIUM SUBSCRIPTIONS</h2>
        <p>Premium subscriptions are billed in advance on a monthly or annual basis. Subscriptions renew automatically unless cancelled at least 24 hours before the renewal date. Refunds are offered within 7 days of initial purchase if you are unsatisfied.</p>
        <h2 className="text-lg font-bold text-slate-900 mt-6" style={{fontFamily:'Oswald,sans-serif'}}>3. INTELLECTUAL PROPERTY</h2>
        <p>All content on ScoreNexa — including articles, images, data visualisations and logos — is owned by or licensed to ScoreNexa. Unauthorised use is prohibited.</p>
        <h2 className="text-lg font-bold text-slate-900 mt-6" style={{fontFamily:'Oswald,sans-serif'}}>4. DISCLAIMER</h2>
        <p>Transfer rumours and gossip are clearly labelled and represent unconfirmed reports. ScoreNexa makes no warranty as to the accuracy of third-party sports data. Sports scores and fixtures are provided for informational purposes only.</p>
        <h2 className="text-lg font-bold text-slate-900 mt-6" style={{fontFamily:'Oswald,sans-serif'}}>5. CONTACT</h2>
        <p>For terms enquiries: <a href="mailto:legal@scorenexa.com" className="text-blue-600">legal@scorenexa.com</a></p>
      </div>
    </div>
  )
}
