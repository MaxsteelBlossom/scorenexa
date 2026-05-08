'use client'
import { useEffect } from 'react'

interface AdSlotProps {
  position: 'banner' | 'sidebar' | 'in-article' | 'mobile-footer'
  className?: string
}

declare global {
  interface Window { adsbygoogle: any[] }
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  useEffect(() => {
    if (adsenseId && adsenseId !== 'ca-pub-XXXXXXXXXX') {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch {}
    }
  }, [])

  // If no real AdSense ID, show placeholder (for dev)
  if (!adsenseId || adsenseId === 'ca-pub-XXXXXXXXXX') {
    const sizes: Record<string, string> = {
      banner: 'h-[90px] md:h-[90px]',
      sidebar: 'h-[250px]',
      'in-article': 'h-[280px]',
      'mobile-footer': 'h-[50px] fixed bottom-0 left-0 right-0 z-40',
    }
    return (
      <div className={`ad-container ${sizes[position] || 'h-[90px]'} ${className}`}>
        <div className="flex flex-col items-center">
          <span className="ad-label">Advertisement</span>
          <span className="text-xs text-slate-400 mt-1">{position} ad slot</span>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <p className="ad-label text-center text-xs text-slate-400 mb-1">Advertisement</p>
      <ins className="adsbygoogle block"
        data-ad-client={adsenseId}
        data-ad-slot="auto"
        data-ad-format={position === 'banner' ? 'horizontal' : 'auto'}
        data-full-width-responsive="true"
        style={{ display: 'block' }}
      />
    </div>
  )
}
