import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Register – ScoreNexa' }
export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">SN</div>
          <h1 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>CREATE YOUR ACCOUNT</h1>
          <p className="text-slate-500 text-sm mt-1">Join ScoreNexa for free. No credit card needed.</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">First Name</label>
                <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John"/>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">Last Name</label>
                <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Smith"/>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">Email</label>
              <input type="email" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="your@email.com"/>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">Password</label>
              <input type="password" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Min. 8 characters"/>
            </div>
            <div className="flex items-start gap-2 text-sm text-slate-600">
              <input type="checkbox" className="mt-0.5 rounded flex-shrink-0"/>
              <span>I agree to the <Link href="/terms" className="text-blue-600">Terms of Service</Link> and <Link href="/privacy-policy" className="text-blue-600">Privacy Policy</Link></span>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>CREATE FREE ACCOUNT</button>
          </div>
          <p className="text-center text-sm text-slate-500 mt-6">Already have an account? <Link href="/login" className="text-blue-600 font-medium">Sign in →</Link></p>
        </div>
      </div>
    </div>
  )
}
