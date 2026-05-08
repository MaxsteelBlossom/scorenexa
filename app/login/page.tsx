'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Invalid email or password.')
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-[#0D1117] rounded-2xl flex items-center justify-center relative">
              <span className="text-white font-black text-2xl" style={{fontFamily:'Arial Black,sans-serif'}}>S</span>
              <span className="text-[#E63946] font-black text-base" style={{fontFamily:'Arial Black,sans-serif'}}>N</span>
            </div>
          </Link>
          <h1 className="text-2xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>WELCOME BACK</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your ScoreNexa account</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                placeholder="your@email.com"/>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946] focus:border-transparent"
                placeholder="••••••••"/>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#E63946] hover:bg-[#c0303c] disabled:opacity-50 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
              {loading ? <><Loader2 size={15} className="animate-spin"/>SIGNING IN...</> : 'SIGN IN'}
            </button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-6">
            No account? <Link href="/register" className="text-[#E63946] font-semibold hover:underline">Register free →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
