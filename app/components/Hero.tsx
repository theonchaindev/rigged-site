'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const CA = 'TBA'

function PriceDisplay() {
  const [price, setPrice] = useState(110.0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => Math.max(100, parseFloat((prev + (Math.random() - 0.48) * 0.5).toFixed(2))))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-6 flex-wrap justify-center">
      <div
        className="pixel-card pulse-gold flex flex-col items-center gap-2"
        style={{ padding: '16px 28px', minWidth: '180px' }}
      >
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: '#7A6108', letterSpacing: '0.12em' }}>
          LIVE PRICE
        </span>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '20px', color: '#F5C200', textShadow: '0 0 16px rgba(245,194,0,0.5)' }}>
          ${price.toFixed(2)}
        </span>
        <span className="flash-green" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px' }}>
          +150% ▲
        </span>
      </div>
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
    <div className="flex flex-col items-center gap-3 w-full max-w-xl">
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: '#7A6108', letterSpacing: '0.15em' }}>
        CONTRACT ADDRESS
      </span>
      <button
        onClick={copy}
        className="pixel-border w-full flex items-center justify-between gap-4 px-5 py-3 transition-all hover:bg-[rgba(245,194,0,0.06)]"
        style={{ background: 'rgba(13,11,0,0.85)', cursor: 'pointer' }}
      >
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px', color: '#F5C200', letterSpacing: '0.06em' }}>
          {CA}
        </span>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: copied ? '#00FF41' : '#7A6108', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
          {copied ? '✓ COPIED' : '[ COPY ]'}
        </span>
      </button>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: '#0D0B00' }}>

      {/* ── Banner image fills top half ── */}
      <div className="relative w-full" style={{ height: 'clamp(260px, 45vw, 560px)' }}>
        <Image
          src="/banner.png"
          alt="RIGGED — Automated Oil Stock Distributor"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
        {/* Dark gradient fade into page bg */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(13,11,0,0.15) 0%, rgba(13,11,0,0) 40%, rgba(13,11,0,0.6) 80%, rgba(13,11,0,1) 100%)',
          }}
        />
        {/* Scanlines on top of banner */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
          }}
        />
      </div>

      {/* ── Content sits below/over the banner ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-20 -mt-24 gap-8">

        {/* Barrel logo */}
        <div className="barrel-float">
          <Image
            src="/barrel.png"
            alt="RIGGED barrel"
            width={160}
            height={160}
            style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 0 24px rgba(245,194,0,0.35))' }}
          />
        </div>

        {/* Price */}
        <PriceDisplay />

        {/* CA */}
        <CopyCA />

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center pt-2">
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

        {/* Scroll hint */}
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: 'rgba(245,194,0,0.3)', letterSpacing: '0.15em', marginTop: '8px' }}>
          ▼ SCROLL ▼
        </div>
      </div>

    </section>
  )
}
