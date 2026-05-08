import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Login – ScoreNexa' }
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">SN</div>
          <h1 className="text-2xl font-bold text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>WELCOME BACK</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your ScoreNexa account</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">Email</label>
              <input type="email" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your@email.com"/>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">Password</label>
              <input type="password" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••"/>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600"><input type="checkbox" className="rounded"/> Remember me</label>
              <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700">Forgot password?</Link>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>SIGN IN</button>
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200"/>
              <span className="text-xs text-slate-400">or</span>
              <div className="flex-1 h-px bg-slate-200"/>
            </div>
            <button className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              <span>G</span> Continue with Google
            </button>
          </div>
          <p className="text-center text-sm text-slate-500 mt-6">No account? <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">Create one free →</Link></p>
        </div>
      </div>
    </div>
  )
}
