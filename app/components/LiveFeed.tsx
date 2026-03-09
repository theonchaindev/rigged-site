'use client'

import { useEffect, useState, useRef } from 'react'

const DIST_WALLET = '6sAVGFquhCw94VJtqvZCmGJSEFWcQtyRowUtukWTLGsH'

function useOilPrice() {
  const [price, setPrice] = useState<number | null>(null)
  const [change, setChange] = useState<number | null>(null)
  useEffect(() => {
    const load = () =>
      fetch('/api/oil-price')
        .then(r => r.json())
        .then(d => { setPrice(d.price); setChange(d.change) })
        .catch(() => {})
    load()
    const t = setInterval(load, 60000)
    return () => clearInterval(t)
  }, [])
  return { price, change }
}

function DistributionWallet() {
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch_ = () =>
      fetch('/api/distribution-wallet')
        .then(r => r.json())
        .then(d => { setBalance(d.balance); setLoading(false) })
        .catch(() => setLoading(false))

    fetch_()
    const t = setInterval(fetch_, 30000) // refresh every 30s
    return () => clearInterval(t)
  }, [])

  const formatted = balance !== null
    ? balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '—'

  return (
    <div
      className="pixel-border pulse-gold flex flex-col md:flex-row items-center md:items-start justify-between gap-6 p-6 md:p-8"
      style={{ background: 'rgba(26,23,0,0.85)', marginBottom: '40px' }}
    >
      <div className="flex flex-col gap-3">
        <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '12px', color: '#7A6108', letterSpacing: '0.18em' }}>
          DISTRIBUTION WALLET
        </span>
        <div className="flex items-baseline gap-3 flex-wrap justify-center md:justify-start">
          <span style={{ fontFamily: "'Upheaval', monospace", fontSize: 'clamp(28px, 4vw, 48px)', color: '#F5C200', textShadow: '0 0 20px rgba(245,194,0,0.4)' }}>
            {loading ? '...' : `$${formatted}`}
          </span>
          <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: '#7A6108' }}>
            USDC
          </span>
        </div>
        <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '12px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
          PENDING DISTRIBUTION TO HOLDERS
        </span>
      </div>

      <div className="flex flex-col gap-2 items-center md:items-end">
        <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#7A6108', letterSpacing: '0.1em' }}>
          WALLET
        </span>
        <a
          href={`https://solscan.io/account/${DIST_WALLET}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#F5C200', textDecoration: 'none', letterSpacing: '0.03em', wordBreak: 'break-all', textAlign: 'right', maxWidth: '280px' }}
          onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
        >
          {DIST_WALLET.slice(0, 4)}...{DIST_WALLET.slice(-4)} ↗
        </a>
        <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '10px', color: 'rgba(245,194,0,0.25)', letterSpacing: '0.06em' }}>
          UPDATES EVERY 30S
        </span>
      </div>
    </div>
  )
}

// Static placeholder stats (update when token launches)
const DISTRIBUTIONS = [
  { time: '2m ago',  wallet: '7xKd...f3Rp', amount: '+$4.82' },
  { time: '8m ago',  wallet: '3mWq...9aLs', amount: '+$12.10' },
  { time: '15m ago', wallet: 'BrTy...2pKn', amount: '+$7.35' },
  { time: '22m ago', wallet: '9sNe...q1Xc', amount: '+$2.91' },
  { time: '31m ago', wallet: 'Kw3F...7oMd', amount: '+$19.44' },
  { time: '45m ago', wallet: '4pLa...s8Hv', amount: '+$6.67' },
]


export default function LiveFeed() {
  const [flash, setFlash] = useState<number | null>(null)
  const { price: oilPrice, change: oilChange } = useOilPrice()

  useEffect(() => {
    const t = setInterval(() => {
      const i = Math.floor(Math.random() * DISTRIBUTIONS.length)
      setFlash(i)
      setTimeout(() => setFlash(null), 400)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  const oilStr = oilPrice != null ? `$${oilPrice.toFixed(2)}` : '...'
  const oilChangeStr = oilChange != null
    ? `${oilChange >= 0 ? '+' : ''}${oilChange.toFixed(2)}%`
    : ''
  const oilUp = (oilChange ?? 0) >= 0

  const TICKER = [
    `USO OIL: ${oilStr} ${oilChangeStr}`, '$RIGGED • AUTOMATED OIL DISTRIBUTOR',
    'METEORA × ONDO FINANCE', '5% → USO OIL FUND', '1% → MARKETING & LIQUIDITY', 'BUY ON METEORA ↗',
  ].join('   ░░░   ')

  const stats = [
    { label: 'USO OIL PRICE', value: oilStr, highlight: true, sub: oilChangeStr, subUp: oilUp },
    { label: '$RIGGED PRICE', value: 'TBA', highlight: false },
    { label: 'MARKET CAP', value: 'TBA', highlight: false },
    { label: 'TOTAL FEES', value: 'TBA', highlight: false },
    { label: '24H VOLUME', value: 'TBA', highlight: false },
    { label: 'HOLDERS', value: 'TBA', highlight: false },
  ]

  return (
    <section id="live-feed" style={{ background: '#080700', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #F5C200, transparent)' }} />

      {/* Ticker */}
      <div style={{ background: '#F5C200', borderBottom: '3px solid #B8960C', overflow: 'hidden', padding: '10px 0' }}>
        <div className="ticker-track">
          {[TICKER, TICKER].map((t, i) => (
            <span key={i} style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: '#0D0B00', whiteSpace: 'nowrap', paddingRight: '80px', letterSpacing: '0.06em' }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 style={{ fontFamily: "'Upheaval', monospace", fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5C200', letterSpacing: '0.1em', textShadow: '4px 4px 0 #B8960C' }}>
            LIVE FEED
          </h2>
        </div>

        {/* Distribution wallet */}
        <DistributionWallet />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {stats.map(s => (
            <div
              key={s.label}
              className="pixel-card flex flex-col gap-3"
              style={{ borderColor: s.highlight ? '#F5C200' : '#3a3000' }}
            >
              <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '12px', color: '#7A6108', letterSpacing: '0.12em' }}>
                {s.label}
              </span>
              <span style={{ fontFamily: "'Upheaval', monospace", fontSize: s.highlight ? '28px' : '22px', color: s.highlight ? '#F5C200' : '#fff', textShadow: s.highlight ? '0 0 10px rgba(245,194,0,0.35)' : 'none' }}>
                {s.value}
              </span>
              {'sub' in s && s.sub && (
                <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: s.subUp ? '#00FF41' : '#ff4444' }}>
                  {s.sub}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Distributions table */}
        <div className="pixel-border" style={{ background: 'rgba(26,23,0,0.7)' }}>
          <div className="grid grid-cols-3 gap-4 px-6 py-4" style={{ borderBottom: '2px solid #3a3000', background: 'rgba(245,194,0,0.04)' }}>
            {['TIME', 'WALLET', 'AMOUNT'].map(h => (
              <span key={h} style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: '#7A6108', letterSpacing: '0.1em' }}>
                {h}
              </span>
            ))}
          </div>
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
              <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: 'rgba(255,255,255,0.28)' }}>{row.time}</span>
              <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>{row.wallet}</span>
              <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: '#00FF41' }}>{row.amount}</span>
            </div>
          ))}
          <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop: '2px solid #3a3000' }}>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '12px', color: '#7A6108' }}>LIVE • METEORA DLMM</span>
            <a href="https://meteora.ag" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Upheaval', monospace", fontSize: '12px', color: '#F5C200', textDecoration: 'none' }}>
              VIEW POOL →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
