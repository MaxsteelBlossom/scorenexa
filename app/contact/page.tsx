import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Contact ScoreNexa' }
export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>CONTACT US</h1>
      <p className="text-slate-500 mb-8">Get in touch with the ScoreNexa team</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {[['Editorial & Tips','editorial@scorenexa.com','Have a story tip or spotted an error?'],['Advertising','ads@scorenexa.com','Enquire about advertising opportunities'],['Premium Support','support@scorenexa.com','Issues with your Premium subscription'],['Press & Media','press@scorenexa.com','Media enquiries and interview requests']].map(([t,e,d]) => (
            <div key={t} className="bg-white border border-slate-100 rounded-xl p-4 hover:border-blue-200 transition-all">
              <h3 className="font-bold text-slate-900 text-sm mb-0.5">{t}</h3>
              <a href={`mailto:${e}`} className="text-blue-600 text-sm font-medium">{e}</a>
              <p className="text-xs text-slate-400 mt-1">{d}</p>
            </div>
          ))}
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <h2 className="font-bold text-slate-900 mb-4" style={{fontFamily:'Oswald,sans-serif'}}>SEND A MESSAGE</h2>
          <div className="space-y-3">
            <input type="text" placeholder="Your name" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input type="email" placeholder="Your email" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select enquiry type</option>
              <option>Editorial / News Tip</option>
              <option>Advertising</option>
              <option>Premium Support</option>
              <option>Press / Media</option>
              <option>Other</option>
            </select>
            <textarea rows={4} placeholder="Your message..." className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"/>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>SEND MESSAGE</button>
          </div>
        </div>
      </div>
    </div>
  )
}
