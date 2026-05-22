'use client'
import { useEffect, useRef } from 'react'

interface AdSlotProps {
  position: 'banner' | 'sidebar' | 'in-article' | 'mobile-footer'
  className?: string
}

declare global {
  interface Window { adsbygoogle: any[] }
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID
  const adRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (adsenseId && adsenseId !== 'ca-pub-XXXXXXXXXX' && !pushed.current) {
      try {
        pushed.current = true
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch {}
    }
  }, [adsenseId])

  // No AdSense ID = show nothing (clean site for visitors)
  if (!adsenseId || adsenseId === 'ca-pub-XXXXXXXXXX') {
    return null
  }

  const adStyles: Record<string, React.CSSProperties> = {
    banner: { display: 'block', minHeight: '90px' },
    sidebar: { display: 'block', minHeight: '250px' },
    'in-article': { display: 'block', minHeight: '280px' },
    'mobile-footer': { display: 'block', minHeight: '50px' },
  }

  return (
    <div className={className}>
      <p style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Advertisement
      </p>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={adStyles[position] || { display: 'block' }}
        data-ad-client={adsenseId}
        data-ad-slot="auto"
        data-ad-format={position === 'banner' ? 'horizontal' : 'auto'}
        data-full-width-responsive="true"
      />
    </div>
  )
}
