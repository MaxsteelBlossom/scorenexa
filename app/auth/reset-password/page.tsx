'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Lock } from 'lucide-react'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Handle the token from the URL hash
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // User is now in recovery mode, ready to set new password
      }
    })
  }, [])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/admin/login'), 2000)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-white font-black text-xl" style={{fontFamily:'Oswald,sans-serif'}}>PASSWORD UPDATED</h2>
          <p className="text-slate-400 text-sm mt-2">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E63946] rounded-2xl mb-4">
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="text-white font-black text-2xl" style={{fontFamily:'Oswald,sans-serif'}}>SET NEW PASSWORD</h1>
          <p className="text-slate-500 text-sm mt-1">Choose a strong password</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <form onSubmit={handleReset} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            <div>
              <label className="text-slate-400 text-xs font-semibold block mb-1.5 uppercase tracking-wider">New Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Min. 8 characters" required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946] transition-all"/>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-semibold block mb-1.5 uppercase tracking-wider">Confirm Password</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                placeholder="Repeat password" required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946] transition-all"/>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#E63946] hover:bg-[#c0303c] disabled:opacity-50 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              style={{fontFamily:'Oswald,sans-serif', letterSpacing:'0.05em'}}>
              {loading ? <><Loader2 size={16} className="animate-spin"/>UPDATING...</> : '🔐 UPDATE PASSWORD'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
