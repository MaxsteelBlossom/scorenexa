import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Zap, Bell, Star, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ScoreNexa Premium – Ad-Free Football Coverage',
  description: 'Go Premium on ScoreNexa for ad-free reading, exclusive alerts, priority transfer news and more.',
}

const FEATURES = [
  { icon: Shield, label: 'Completely ad-free experience' },
  { icon: Bell, label: 'Real-time team & player alerts' },
  { icon: Zap, label: 'Breaking news 30 mins early' },
  { icon: Star, label: 'Exclusive premium analysis' },
  { icon: Check, label: 'Priority transfer tracker access' },
  { icon: Check, label: 'Personalised dashboard' },
  { icon: Check, label: 'Cancel anytime, no contracts' },
]

export default function PremiumPage() {
  return (
    <div className="bg-gradient-to-b from-[#0a1240] to-[#0f1f5c] min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">⭐ ScoreNexa Premium</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily:'Oswald,sans-serif'}}>FOOTBALL WITHOUT<br/>THE INTERRUPTIONS</h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">Join thousands of football fans who read ScoreNexa without ads, with exclusive alerts and premium features.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Monthly */}
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-1" style={{fontFamily:'Oswald,sans-serif'}}>MONTHLY</h2>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">£4.99</span>
              <span className="text-blue-300">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {FEATURES.map(f => (
                <li key={f.label} className="flex items-center gap-3 text-sm text-blue-100">
                  <f.icon size={16} className="text-emerald-400 flex-shrink-0"/>
                  {f.label}
                </li>
              ))}
            </ul>
            <button className="w-full bg-white text-blue-900 font-bold py-3.5 rounded-xl hover:bg-blue-50 transition-all" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
              START FREE TRIAL
            </button>
          </div>
          {/* Annual */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</div>
            <h2 className="text-xl font-bold mb-1" style={{fontFamily:'Oswald,sans-serif'}}>ANNUAL</h2>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold">£39.99</span>
              <span className="text-emerald-100">/year</span>
            </div>
            <p className="text-emerald-100 text-xs mb-6">Just £3.33/month — save 33%</p>
            <ul className="space-y-3 mb-8">
              {FEATURES.map(f => (
                <li key={f.label} className="flex items-center gap-3 text-sm text-white">
                  <f.icon size={16} className="text-white flex-shrink-0"/>
                  {f.label}
                </li>
              ))}
            </ul>
            <button className="w-full bg-white text-emerald-700 font-bold py-3.5 rounded-xl hover:bg-emerald-50 transition-all" style={{fontFamily:'Oswald,sans-serif',letterSpacing:'0.05em'}}>
              GET ANNUAL PREMIUM
            </button>
          </div>
        </div>
        <p className="text-center text-blue-400 text-sm">7-day free trial on all plans · No credit card required to start · Cancel anytime</p>
      </div>
    </div>
  )
}
