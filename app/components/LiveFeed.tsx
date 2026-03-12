'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const DIST_WALLET = 'oiLzcmVU9jemJpwJCpULeEwWf4Eisow4EEWdK4yJFSH'

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
    const t = setInterval(load, 30000)
    return () => clearInterval(t)
  }, [])
  return { price, change }
}

function useDistroBalance() {
  const [balance, setBalance] = useState<number | null>(null)
  useEffect(() => {
    const load = () =>
      fetch('/api/distribution-wallet')
        .then(r => r.json())
        .then(d => setBalance(d.balance))
        .catch(() => {})
    load()
    const t = setInterval(load, 30000)
    return () => clearInterval(t)
  }, [])
  return balance
}

export default function LiveFeed() {
  const { price: oilPrice, change: oilChange } = useOilPrice()
  const distroBalance = useDistroBalance()

  const oilStr = oilPrice != null ? `$${oilPrice.toFixed(2)}` : '—'
  const oilChangeStr = oilChange != null
    ? `${oilChange >= 0 ? '+' : ''}${oilChange.toFixed(2)}%`
    : '—'
  const oilUp = (oilChange ?? 0) >= 0

  const distroStr = distroBalance != null
    ? distroBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '—'

  const tickerItems = [
    // Logo + name
    <span key="brand" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', paddingRight: '48px' }}>
      <Image src="/barrel.png" alt="" width={18} height={18} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
      <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: '#0D0B00', letterSpacing: '0.08em' }}>RIGGED</span>
    </span>,
    <span key="sep1" style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: 'rgba(13,11,0,0.4)', paddingRight: '48px' }}>░░░</span>,
    // Oil price
    <span key="oil" style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: '#0D0B00', whiteSpace: 'nowrap', paddingRight: '48px', letterSpacing: '0.06em' }}>
      USO OIL: {oilStr} <span style={{ color: oilUp ? '#006600' : '#880000' }}>{oilChangeStr}</span>
    </span>,
    <span key="sep2" style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: 'rgba(13,11,0,0.4)', paddingRight: '48px' }}>░░░</span>,
    // MCAP
    <span key="mcap" style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: '#0D0B00', whiteSpace: 'nowrap', paddingRight: '48px', letterSpacing: '0.06em' }}>
      MCAP: —
    </span>,
    <span key="sep3" style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: 'rgba(13,11,0,0.4)', paddingRight: '48px' }}>░░░</span>,
    // Tagline
    <span key="tag" style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: '#0D0B00', whiteSpace: 'nowrap', paddingRight: '48px', letterSpacing: '0.06em' }}>
      AUTOMATED OIL STOCK DISTRIBUTOR
    </span>,
    <span key="sep4" style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: 'rgba(13,11,0,0.4)', paddingRight: '48px' }}>░░░</span>,
  ]

  return (
    <section id="live-feed" style={{ background: '#080700', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #F5C200, transparent)' }} />

      {/* Ticker */}
      <div style={{ background: '#F5C200', borderBottom: '3px solid #B8960C', overflow: 'hidden', padding: '10px 0' }}>
        <div className="ticker-track" style={{ display: 'flex', alignItems: 'center' }}>
          {[...tickerItems, ...tickerItems]}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-14">
          <p style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#7A6108', letterSpacing: '0.28em', marginBottom: '12px' }}>
            ON-CHAIN DATA
          </p>
          <h2 style={{ fontFamily: "'Upheaval', monospace", fontSize: 'clamp(32px, 5vw, 52px)', color: '#F5C200', letterSpacing: '0.1em', textShadow: '4px 4px 0 #B8960C', margin: 0 }}>
            LIVE FEED
          </h2>
        </div>

        {/* Distribution wallet — full width focal card */}
        <a
          href={`https://solscan.io/account/${DIST_WALLET}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pulse-gold"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            marginBottom: '32px',
            textDecoration: 'none',
            background: 'rgba(26,23,0,0.9)',
            border: '3px solid #F5C200',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(26,23,0,1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(26,23,0,0.9)')}
        >
          <div style={{
            background: 'rgba(245,194,0,0.06)',
            borderBottom: '1px solid rgba(184,150,12,0.3)',
            padding: '10px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#7A6108', letterSpacing: '0.2em' }}>
              DISTRIBUTION WALLET
            </span>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: 'rgba(245,194,0,0.4)', letterSpacing: '0.1em' }}>
              UPDATES EVERY 30S ↗
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 md:p-8">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Upheaval', monospace", fontSize: 'clamp(36px, 5vw, 56px)', color: '#F5C200', textShadow: '0 0 30px rgba(245,194,0,0.45)', lineHeight: 1 }}>
                  ${distroStr}
                </span>
                <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '16px', color: '#7A6108', letterSpacing: '0.1em' }}>
                  USDC
                </span>
              </div>
              <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>
                PENDING DISTRIBUTION TO HOLDERS
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
              <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '10px', color: '#7A6108', letterSpacing: '0.14em' }}>
                WALLET ADDRESS
              </span>
              <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: 'rgba(245,194,0,0.8)', letterSpacing: '0.04em' }}>
                {DIST_WALLET.slice(0, 6)}...{DIST_WALLET.slice(-6)}
              </span>
            </div>
          </div>
        </a>

        {/* Stats row — oil price, mcap, volume */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {/* USO Oil Price — live */}
          <div style={{
            background: 'rgba(26,23,0,0.8)',
            border: '2px solid rgba(0,255,65,0.3)',
            borderTop: '3px solid #00FF41',
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#7A6108', letterSpacing: '0.18em' }}>USO OIL PRICE</span>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '36px', color: '#00FF41', textShadow: '0 0 16px rgba(0,255,65,0.4)', lineHeight: 1 }}>
              {oilStr}
            </span>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: oilUp ? '#00FF41' : '#ff5555', letterSpacing: '0.06em' }}>
              {oilChangeStr} 24H
            </span>
          </div>

          {/* Market Cap — waiting for CA */}
          <div style={{
            background: 'rgba(26,23,0,0.8)',
            border: '2px solid rgba(184,150,12,0.25)',
            borderTop: '3px solid #F5C200',
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#7A6108', letterSpacing: '0.18em' }}>MARKET CAP</span>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '36px', color: 'rgba(255,255,255,0.2)', lineHeight: 1 }}>—</span>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: 'rgba(184,150,12,0.4)', letterSpacing: '0.12em' }}>LAUNCHING SOON</span>
          </div>

          {/* 24H Volume — waiting for CA */}
          <div style={{
            background: 'rgba(26,23,0,0.8)',
            border: '2px solid rgba(184,150,12,0.25)',
            borderTop: '3px solid #B8960C',
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#7A6108', letterSpacing: '0.18em' }}>24H VOLUME</span>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '36px', color: 'rgba(255,255,255,0.2)', lineHeight: 1 }}>—</span>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: 'rgba(184,150,12,0.4)', letterSpacing: '0.12em' }}>LAUNCHING SOON</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a href="https://meteora.ag" target="_blank" rel="noopener noreferrer" className="pixel-btn">
            TRADE ON METEORA ↗
          </a>
        </div>

      </div>
    </section>
  )
}
