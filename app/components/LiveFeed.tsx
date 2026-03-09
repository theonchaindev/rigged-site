'use client'

import { useEffect, useState, useRef } from 'react'

// Mock stats — swap for live Meteora API when pool is live
const MOCK_STATS = {
  price: '$110.00',
  marketCap: '$11.0M',
  volume24h: '$842K',
  holders: '2,847',
  apy: '18.4%',
  tvl: '$3.2M',
}

const MOCK_DISTRIBUTIONS = [
  { time: '2m ago', wallet: '7xKd...f3Rp', amount: '+$4.82', type: 'YIELD' },
  { time: '8m ago', wallet: '3mWq...9aLs', amount: '+$12.10', type: 'YIELD' },
  { time: '15m ago', wallet: 'BrTy...2pKn', amount: '+$7.35', type: 'YIELD' },
  { time: '22m ago', wallet: '9sNe...q1Xc', amount: '+$2.91', type: 'YIELD' },
  { time: '31m ago', wallet: 'Kw3F...7oMd', amount: '+$19.44', type: 'YIELD' },
  { time: '45m ago', wallet: '4pLa...s8Hv', amount: '+$6.67', type: 'YIELD' },
]

const TICKER_ITEMS = [
  '$RIGGED  +150%  ▲',
  'PRICE: $110.00',
  'TVL: $3.2M',
  'APY: 18.4%',
  '24H VOL: $842K',
  'HOLDERS: 2,847',
  'POWERED BY METEORA × ONDO',
  '$RIGGED  +150%  ▲',
  'NEXT DISTRIBUTION IN: 12:34:56',
  'TOTAL DISTRIBUTED: $284,731',
]

function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="pixel-card flex flex-col gap-3"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        borderColor: highlight ? '#F5C200' : '#7A6108',
      }}
    >
      <span
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '6.5px',
          color: '#7A6108',
          letterSpacing: '0.15em',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: highlight ? '18px' : '14px',
          color: highlight ? '#F5C200' : '#FFFFFF',
          textShadow: highlight ? '0 0 12px rgba(245,194,0,0.4)' : 'none',
        }}
      >
        {value}
      </span>
    </div>
  )
}

export default function LiveFeed() {
  const [flash, setFlash] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * MOCK_DISTRIBUTIONS.length)
      setFlash(idx)
      setTimeout(() => setFlash(null), 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const tickerLine = TICKER_ITEMS.join('   ░░░   ')

  return (
    <section id="live-feed" style={{ background: '#080700', position: 'relative' }}>
      {/* Top border */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, transparent, #F5C200, transparent)' }} />

      {/* Ticker tape */}
      <div
        style={{
          background: '#F5C200',
          borderBottom: '3px solid #B8960C',
          overflow: 'hidden',
          padding: '10px 0',
        }}
      >
        <div className="ticker-track">
          {[tickerLine, tickerLine].map((t, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '8px',
                color: '#0D0B00',
                whiteSpace: 'nowrap',
                paddingRight: '80px',
                letterSpacing: '0.08em',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '8px',
              color: '#7A6108',
              letterSpacing: '0.25em',
              marginBottom: '16px',
            }}
          >
            // REAL-TIME DATA
          </p>
          <h2
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(16px, 2.5vw, 24px)',
              color: '#F5C200',
              letterSpacing: '0.1em',
              textShadow: '4px 4px 0 #B8960C',
            }}
          >
            LIVE FEED
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          <StatCard label="PRICE" value={MOCK_STATS.price} highlight />
          <StatCard label="MARKET CAP" value={MOCK_STATS.marketCap} />
          <StatCard label="TVL" value={MOCK_STATS.tvl} />
          <StatCard label="24H VOLUME" value={MOCK_STATS.volume24h} />
          <StatCard label="APY" value={MOCK_STATS.apy} highlight />
          <StatCard label="HOLDERS" value={MOCK_STATS.holders} />
        </div>

        {/* Recent distributions */}
        <div className="pixel-border" style={{ background: 'rgba(26,23,0,0.7)' }}>
          {/* Table header */}
          <div
            className="grid grid-cols-4 gap-4 px-6 py-4"
            style={{
              borderBottom: '3px solid #7A6108',
              background: 'rgba(245,194,0,0.05)',
            }}
          >
            {['TIME', 'WALLET', 'AMOUNT', 'TYPE'].map(h => (
              <span
                key={h}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '7px',
                  color: '#7A6108',
                  letterSpacing: '0.12em',
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {MOCK_DISTRIBUTIONS.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-4 px-6 py-4"
              style={{
                borderBottom: i < MOCK_DISTRIBUTIONS.length - 1 ? '1px solid rgba(122,97,8,0.2)' : 'none',
                background: flash === i ? 'rgba(245,194,0,0.08)' : 'transparent',
                transition: 'background 0.3s',
              }}
            >
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: 'rgba(255,255,255,0.3)' }}>
                {row.time}
              </span>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: 'rgba(255,255,255,0.6)' }}>
                {row.wallet}
              </span>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: '#00FF41' }}>
                {row.amount}
              </span>
              <span
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '6px',
                  color: '#F5C200',
                  background: 'rgba(245,194,0,0.1)',
                  padding: '3px 6px',
                  border: '1px solid rgba(245,194,0,0.3)',
                  display: 'inline-block',
                }}
              >
                {row.type}
              </span>
            </div>
          ))}

          {/* Footer */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderTop: '3px solid #7A6108', background: 'rgba(245,194,0,0.03)' }}
          >
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '6px', color: '#7A6108' }}>
              UPDATING LIVE • METEORA DLMM POOL
            </span>
            <a
              href="https://meteora.ag"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '6px', color: '#F5C200', textDecoration: 'none' }}
            >
              VIEW POOL →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
