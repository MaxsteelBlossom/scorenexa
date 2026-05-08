'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: `${firstName} ${lastName}` } }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center max-w-md w-full">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-black text-slate-900 mb-2" style={{fontFamily:'Oswald,sans-serif'}}>CHECK YOUR EMAIL</h2>
          <p className="text-slate-500 text-sm">We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account then sign in.</p>
          <Link href="/login" className="mt-6 inline-block bg-[#E63946] text-white font-black px-6 py-3 rounded-xl text-sm hover:bg-[#c0303c] transition-all" style={{fontFamily:'Oswald,sans-serif'}}>
            GO TO LOGIN →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-slate-900" style={{fontFamily:'Oswald,sans-serif'}}>CREATE YOUR ACCOUNT</h1>
          <p className="text-slate-500 text-sm mt-1">Join ScoreNexa free — no credit card needed</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">First Name</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]" placeholder="John"/>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Last Name</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]" placeholder="Smith"/>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]" placeholder="your@email.com"/>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946]" placeholder="Min. 8 characters"/>
            </div>
            <label className="flex items-start gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" required className="mt-0.5 flex-shrink-0"/>
              <span>I agree to the <Link href="/terms" className="text-[#E63946]">Terms</Link> and <Link href="/privacy-policy" className="text-[#E63946]">Privacy Policy</Link></span>
            </label>
            <button type="submit" disabled={loading}
              className="w-full bg-[#E63946] hover:bg-[#c0303c] disabled:opacity-50 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
              {loading ? <><Loader2 size={15} className="animate-spin"/>CREATING ACCOUNT...</> : 'CREATE FREE ACCOUNT'}
            </button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account? <Link href="/login" className="text-[#E63946] font-semibold">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
