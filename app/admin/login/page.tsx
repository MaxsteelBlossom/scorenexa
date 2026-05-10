'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Shield, Eye, EyeOff, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Step 1: Sign in
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError || !data.session) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    // Step 2: Check admin using raw query to avoid type issues
    const { data: rows } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', data.session.user.id)

    const isAdmin = Array.isArray(rows) && rows.length > 0 && rows[0]?.is_admin === true

    if (!isAdmin) {
      await supabase.auth.signOut()
      setError('Access denied. Run the SQL query in Supabase to grant admin access.')
      setLoading(false)
      return
    }

    // Step 3: Success
    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E63946] rounded-2xl mb-4">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="text-white font-black text-2xl" style={{fontFamily:'Oswald,sans-serif'}}>ADMIN ACCESS</h1>
          <p className="text-slate-500 text-sm mt-1">ScoreNexa Control Panel</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            <div>
              <label className="text-slate-400 text-xs font-semibold block mb-1.5 uppercase tracking-wider">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946] transition-all"/>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-semibold block mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="••••••••••••" required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-[#E63946] transition-all"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#E63946] hover:bg-[#c0303c] disabled:opacity-50 text-white font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              style={{fontFamily:'Oswald,sans-serif', letterSpacing:'0.05em'}}>
              {loading ? <><Loader2 size={16} className="animate-spin"/>SIGNING IN...</> : '🔐 SIGN IN TO ADMIN'}
            </button>
          </form>
        </div>
        <p className="text-center text-slate-700 text-xs mt-6">ScoreNexa Admin · Authorised access only</p>
      </div>
    </div>
  )
}
