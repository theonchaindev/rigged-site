'use client'

import { useEffect, useState, useRef } from 'react'

const STATS = [
  { label: 'PRICE', value: '$110.00', highlight: true },
  { label: 'MARKET CAP', value: '$11.0M', highlight: false },
  { label: 'TVL', value: '$3.2M', highlight: false },
  { label: '24H VOLUME', value: '$842K', highlight: false },
  { label: 'APY', value: '18.4%', highlight: true },
  { label: 'HOLDERS', value: '2,847', highlight: false },
]

const DISTRIBUTIONS = [
  { time: '2m ago',  wallet: '7xKd...f3Rp', amount: '+$4.82' },
  { time: '8m ago',  wallet: '3mWq...9aLs', amount: '+$12.10' },
  { time: '15m ago', wallet: 'BrTy...2pKn', amount: '+$7.35' },
  { time: '22m ago', wallet: '9sNe...q1Xc', amount: '+$2.91' },
  { time: '31m ago', wallet: 'Kw3F...7oMd', amount: '+$19.44' },
  { time: '45m ago', wallet: '4pLa...s8Hv', amount: '+$6.67' },
]

const TICKER = [
  '$RIGGED  +150%  ▲', 'PRICE: $110.00', 'TVL: $3.2M', 'APY: 18.4%',
  '24H VOL: $842K', 'HOLDERS: 2,847', 'METEORA × ONDO FINANCE',
  'NEXT DISTRIBUTION: 12:34:56', 'TOTAL DISTRIBUTED: $284,731',
].join('   ░░░   ')

function StatCard({ label, value, highlight }: { label: string; value: string; highlight: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className="pixel-card flex flex-col gap-2"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.45s ease, transform 0.45s ease',
        borderColor: highlight ? '#F5C200' : '#3a3000',
      }}
    >
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '6px', color: '#7A6108', letterSpacing: '0.14em' }}>
        {label}
      </span>
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: highlight ? '16px' : '13px', color: highlight ? '#F5C200' : '#fff', textShadow: highlight ? '0 0 10px rgba(245,194,0,0.35)' : 'none' }}>
        {value}
      </span>
    </div>
  )
}

export default function LiveFeed() {
  const [flash, setFlash] = useState<number | null>(null)
  useEffect(() => {
    const t = setInterval(() => {
      const i = Math.floor(Math.random() * DISTRIBUTIONS.length)
      setFlash(i)
      setTimeout(() => setFlash(null), 400)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="live-feed" style={{ background: '#080700', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #F5C200, transparent)' }} />

      {/* Ticker */}
      <div style={{ background: '#F5C200', borderBottom: '3px solid #B8960C', overflow: 'hidden', padding: '9px 0' }}>
        <div className="ticker-track">
          {[TICKER, TICKER].map((t, i) => (
            <span key={i} style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', color: '#0D0B00', whiteSpace: 'nowrap', paddingRight: '80px', letterSpacing: '0.07em' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 'clamp(16px, 2.5vw, 24px)', color: '#F5C200', letterSpacing: '0.1em', textShadow: '4px 4px 0 #B8960C' }}>
            LIVE FEED
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Distributions table */}
        <div className="pixel-border" style={{ background: 'rgba(26,23,0,0.7)' }}>
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 px-6 py-3" style={{ borderBottom: '2px solid #3a3000', background: 'rgba(245,194,0,0.04)' }}>
            {['TIME', 'WALLET', 'AMOUNT'].map(h => (
              <span key={h} style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: '#7A6108', letterSpacing: '0.1em' }}>
                {h}
              </span>
            ))}
          </div>
          {/* Rows */}
          {DISTRIBUTIONS.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3 gap-4 px-6 py-4"
              style={{
                borderBottom: i < DISTRIBUTIONS.length - 1 ? '1px solid rgba(58,48,0,0.5)' : 'none',
                background: flash === i ? 'rgba(245,194,0,0.07)' : 'transparent',
                transition: 'background 0.3s',
              }}
            >
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: 'rgba(255,255,255,0.28)' }}>{row.time}</span>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: 'rgba(255,255,255,0.55)' }}>{row.wallet}</span>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: '#00FF41' }}>{row.amount}</span>
            </div>
          ))}
          {/* Footer */}
          <div className="px-6 py-3 flex items-center justify-between" style={{ borderTop: '2px solid #3a3000' }}>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '6px', color: '#7A6108' }}>LIVE • METEORA DLMM</span>
            <a href="https://meteora.ag" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '6px', color: '#F5C200', textDecoration: 'none' }}>
              VIEW POOL →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
