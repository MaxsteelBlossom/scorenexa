import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'About ScoreNexa – Real-Time Sports Intelligence', description: 'Learn about ScoreNexa, our editorial standards, our team and our mission to deliver real-time football intelligence.' }
export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>ABOUT SCORENEXA</h1>
      <p className="text-blue-600 font-medium mb-8">Real-Time Sports Intelligence</p>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
        <p>ScoreNexa is a next-generation football media platform delivering live scores, transfer news, fixtures, standings, and expert analysis 24 hours a day, 7 days a week. We cover football across Europe's major leagues and competitions with a commitment to accuracy, speed, and depth.</p>
        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3" style={{fontFamily:'Oswald,sans-serif'}}>OUR MISSION</h2>
        <p>We believe football fans deserve better: faster news, cleaner presentation, and journalism that respects their intelligence. ScoreNexa was built to be the platform that football fans can rely on — whether they're tracking a live score, following a transfer rumour, or reading an in-depth match report.</p>
        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3" style={{fontFamily:'Oswald,sans-serif'}}>EDITORIAL STANDARDS</h2>
        <p>All content on ScoreNexa is produced by experienced football journalists and editors. Transfer rumours are clearly labelled and attributed to sources. Match reports are filed promptly after final whistle. Opinion pieces are clearly distinguished from news. We do not publish content we cannot stand behind.</p>
        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3" style={{fontFamily:'Oswald,sans-serif'}}>CONTACT US</h2>
        <p>For editorial enquiries: <a href="mailto:editorial@scorenexa.com" className="text-blue-600">editorial@scorenexa.com</a><br/>For advertising: <a href="mailto:ads@scorenexa.com" className="text-blue-600">ads@scorenexa.com</a><br/>For press: <a href="mailto:press@scorenexa.com" className="text-blue-600">press@scorenexa.com</a></p>
        <p className="text-sm text-slate-400">ScoreNexa is operated by SyntaxForgeScriptHorizon. Registered company.</p>
      </div>
    </div>
  )
}
