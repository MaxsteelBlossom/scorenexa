import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = {
  title: 'Responsible Gambling – ScoreNexa',
  description: 'ScoreNexa is committed to responsible gambling. Read our guidelines on safe betting, setting limits and where to get help.',
}
export default function ResponsibleGamblingPage() {
  const orgs = [
    { name:'GamCare', url:'https://www.gamcare.org.uk', desc:'Free support, information and counselling for anyone harmed by gambling.' },
    { name:'BeGambleAware', url:'https://www.begambleaware.org', desc:'Promoting responsible gambling and providing support for those affected.' },
    { name:'Gambling Therapy', url:'https://www.gamblingtherapy.org', desc:'Free online support for problem gambling.' },
    { name:'Gamblers Anonymous', url:'https://www.gamblersanonymous.org.uk', desc:'A fellowship of problem gamblers helping each other recover.' },
  ]
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
        <Link href="/betting" className="hover:text-[#E63946]">Betting</Link><span>›</span><span>Responsible Gambling</span>
      </div>
      <div className="bg-[#E63946] rounded-2xl p-6 text-white mb-8">
        <h1 className="text-3xl font-black mb-2" style={{fontFamily:'Oswald,sans-serif'}}>🛡️ RESPONSIBLE GAMBLING</h1>
        <p className="text-red-100">Gambling should be fun, not a source of stress or financial hardship. We take responsible gambling seriously.</p>
      </div>
      <div className="space-y-6 text-slate-700">
        {[
          ['Only gamble what you can afford to lose','Never use money needed for essential expenses such as rent, bills or food to fund gambling. Set a strict budget before you start and stick to it.'],
          ['Set time and deposit limits','Most bookmakers offer tools to set daily, weekly or monthly deposit limits. Use these to keep control of your spending. Also set time limits to avoid extended sessions.'],
          ['Never chase losses','If you\'re on a losing streak, the temptation to bet more to win it back is strong — but this almost always makes things worse. Accept losses as the cost of entertainment.'],
          ['Take regular breaks','Gambling continuously without breaks can lead to poor decision-making. Step away regularly and assess your situation with a clear head.'],
          ['Self-exclude if necessary','All licensed bookmakers offer self-exclusion. You can also use GamStop to self-exclude from all licensed UK gambling sites at once.'],
        ].map(([title, body]) => (
          <div key={title} className="bg-white border border-slate-100 rounded-2xl p-5">
            <h2 className="font-black text-slate-900 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>✅ {title}</h2>
            <p className="text-sm leading-relaxed text-slate-600">{body}</p>
          </div>
        ))}

        <div>
          <h2 className="text-xl font-black text-slate-900 mb-4" style={{fontFamily:'Oswald,sans-serif'}}>HELPLINES & SUPPORT</h2>
          <div className="grid gap-3">
            {orgs.map(o => (
              <a key={o.name} href={o.url} target="_blank" rel="noopener noreferrer"
                className="bg-white border border-slate-100 hover:border-[#E63946]/30 rounded-xl p-4 flex items-start gap-3 transition-all group">
                <span className="text-2xl">🆘</span>
                <div><p className="font-bold text-slate-900 group-hover:text-[#E63946] transition-colors">{o.name}</p>
                  <p className="text-sm text-slate-500">{o.desc}</p>
                  <p className="text-xs text-blue-600 mt-1">{o.url}</p></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
