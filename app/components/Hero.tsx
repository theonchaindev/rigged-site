'use client'

import { useState, useEffect } from 'react'

const CA = 'TBA'

function PixelBarrel() {
  return (
    <div className="barrel-float select-none" style={{ fontSize: '80px', lineHeight: 1 }}>
      {/* SVG oil barrel */}
      <svg width="120" height="160" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
        {/* Barrel body */}
        <rect x="16" y="24" width="88" height="112" rx="4" fill="#1A1700"/>
        <rect x="16" y="24" width="88" height="112" rx="4" stroke="#F5C200" strokeWidth="4"/>
        {/* Barrel bands */}
        <rect x="12" y="48" width="96" height="10" fill="#B8960C"/>
        <rect x="12" y="102" width="96" height="10" fill="#B8960C"/>
        {/* Oil symbol */}
        <circle cx="60" cy="80" r="20" fill="#F5C200" opacity="0.15"/>
        <circle cx="60" cy="80" r="20" stroke="#F5C200" strokeWidth="3"/>
        {/* Drip */}
        <rect x="52" y="136" width="16" height="24" rx="8" fill="#B8960C" opacity="0.6"/>
        {/* Top lid */}
        <rect x="8" y="16" width="104" height="16" rx="4" fill="#B8960C"/>
        <rect x="8" y="16" width="104" height="16" rx="4" stroke="#F5C200" strokeWidth="3"/>
        {/* RIGGED label */}
        <rect x="28" y="68" width="64" height="20" fill="#0D0B00" opacity="0.7"/>
      </svg>
    </div>
  )
}

function PriceDisplay() {
  const [price, setPrice] = useState(110.0)
  const [change] = useState(+150)

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => {
        const delta = (Math.random() - 0.48) * 0.5
        return Math.max(100, parseFloat((prev + delta).toFixed(2)))
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="pixel-card inline-flex flex-col items-center gap-2 pulse-gold"
      style={{ minWidth: '220px', padding: '20px 28px' }}
    >
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', color: '#7A6108', letterSpacing: '0.1em' }}>
        LIVE PRICE
      </span>
      <span
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '22px',
          color: '#F5C200',
          textShadow: '0 0 16px rgba(245,194,0,0.5)',
        }}
      >
        ${price.toFixed(2)}
      </span>
      <span className="flash-green" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px' }}>
        +{change}% ▲
      </span>
    </div>
  )
}

function CopyCA() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(CA)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', color: '#7A6108', letterSpacing: '0.12em' }}>
        CONTRACT ADDRESS
      </span>
      <button
        onClick={copy}
        className="pixel-border flex items-center gap-4 px-5 py-3 transition-all hover:bg-[rgba(245,194,0,0.06)] group"
        style={{ background: 'rgba(26,23,0,0.8)', cursor: 'pointer' }}
      >
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '10px',
            color: '#F5C200',
            letterSpacing: '0.08em',
          }}
        >
          {CA}
        </span>
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '8px',
            color: copied ? '#00FF41' : '#7A6108',
            transition: 'color 0.2s',
            minWidth: '52px',
          }}
        >
          {copied ? '✓ COPIED' : '[ COPY ]'}
        </span>
      </button>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center grid-bg pt-24 pb-16 overflow-hidden"
      style={{ background: '#0D0B00' }}
    >
      <div className="noise-overlay" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(245,194,0,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center max-w-5xl mx-auto">

        {/* Barrel + title row */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <PixelBarrel />

          <div className="flex flex-col items-center md:items-start gap-5">
            {/* Main title */}
            <h1
              className="glitch"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(42px, 8vw, 88px)',
                color: '#F5C200',
                letterSpacing: '0.05em',
                textShadow: '0 0 40px rgba(245,194,0,0.35), 6px 6px 0 #B8960C',
                lineHeight: 1.1,
              }}
            >
              RIGGED
            </h1>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(7px, 1.5vw, 11px)',
                color: '#B8960C',
                letterSpacing: '0.2em',
                lineHeight: 2,
              }}
            >
              AUTOMATED OIL STOCK DISTRIBUTOR
            </p>

            {/* Description */}
            <p
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '8px',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 2.2,
                maxWidth: '440px',
                textAlign: 'left',
              }}
            >
              Hold $RIGGED. Earn real oil-stock yield.<br />
              Powered by Ondo Finance &amp; Meteora.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://meteora.ag"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn"
                style={{ fontSize: '9px' }}
              >
                BUY $RIGGED
              </a>
              <a
                href="#how-it-works"
                className="pixel-btn pixel-btn-outline"
                style={{ fontSize: '9px' }}
              >
                HOW IT WORKS
              </a>
            </div>
          </div>
        </div>

        {/* Price display */}
        <PriceDisplay />

        {/* CA */}
        <CopyCA />

        {/* Scroll hint */}
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '7px',
            color: 'rgba(245,194,0,0.3)',
            letterSpacing: '0.15em',
            animation: 'pulse-gold 2s infinite',
            marginTop: '8px',
          }}
        >
          ▼ SCROLL ▼
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-24 left-6 opacity-10 text-[#F5C200] select-none" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px' }}>
        ████<br/>█<br/>█<br/>████
      </div>
      <div className="absolute top-24 right-6 opacity-10 text-[#F5C200] select-none" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', textAlign: 'right' }}>
        ████<br/>   █<br/>   █<br/>████
      </div>
    </section>
  )
}
