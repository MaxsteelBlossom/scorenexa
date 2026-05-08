import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'DMCA Policy – ScoreNexa', description: 'ScoreNexa DMCA policy and copyright infringement reporting procedure.' }
export default function DMCAPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-slate-900 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>DMCA POLICY</h1>
      <p className="text-slate-400 text-sm mb-8">Digital Millennium Copyright Act Notice</p>
      <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
        <p>ScoreNexa respects the intellectual property rights of others and expects users of our services to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond to notices of alleged copyright infringement that comply with applicable law.</p>
        <h2 className="text-lg font-black text-slate-900 mt-6" style={{fontFamily:'Oswald,sans-serif'}}>REPORTING INFRINGEMENT</h2>
        <p>If you believe content on ScoreNexa infringes your copyright, please send a written notice to our designated agent containing:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Your physical or electronic signature</li>
          <li>Identification of the copyrighted work you claim has been infringed</li>
          <li>Identification of the material you claim is infringing, with enough detail for us to locate it</li>
          <li>Your contact information (address, telephone number, email)</li>
          <li>A statement that you have a good faith belief that use of the material is not authorised by the copyright owner</li>
          <li>A statement that the information in your notification is accurate and, under penalty of perjury, that you are the copyright owner or authorised to act on their behalf</li>
        </ul>
        <h2 className="text-lg font-black text-slate-900 mt-6" style={{fontFamily:'Oswald,sans-serif'}}>CONTACT OUR DMCA AGENT</h2>
        <p>Email: <a href="mailto:dmca@scorenexa.com" className="text-[#E63946] hover:underline">dmca@scorenexa.com</a></p>
        <p>We will review all valid notices and remove infringing content promptly.</p>
        <h2 className="text-lg font-black text-slate-900 mt-6" style={{fontFamily:'Oswald,sans-serif'}}>COUNTER-NOTIFICATION</h2>
        <p>If you believe material was removed in error, you may submit a counter-notification to our DMCA agent with the required information under 17 U.S.C. § 512(g).</p>
      </div>
    </div>
  )
}
