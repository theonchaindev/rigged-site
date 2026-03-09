'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const CA = 'TBA'
const DIST_WALLET = '6sAVGFquhCw94VJtqvZCmGJSEFWcQtyRowUtukWTLGsH'

function DistroBalance() {
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

  const formatted = balance !== null
    ? balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '...'

  return (
    <a
      href={`https://solscan.io/account/${DIST_WALLET}`}
      target="_blank"
      rel="noopener noreferrer"
      className="md:hidden"
      style={{
        background: 'rgba(13,11,0,0.75)',
        border: '2px solid #F5C200',
        boxShadow: '0 0 16px rgba(245,194,0,0.25)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '10px', color: '#7A6108', letterSpacing: '0.16em' }}>
          DISTRO WALLET
        </span>
        <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '22px', color: '#F5C200', textShadow: '0 0 12px rgba(245,194,0,0.5)', lineHeight: 1 }}>
          ${formatted}
        </span>
      </div>
      <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
        USDC ↗
      </span>
    </a>
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
    <button
      onClick={copy}
      className="pixel-border flex items-center gap-4 px-5 py-3 hover:bg-[rgba(245,194,0,0.08)] transition-all"
      style={{ background: 'rgba(13,11,0,0.75)', cursor: 'pointer' }}
    >
      <span style={{ fontFamily: "'Upheaval', monospace", fontSize: 'clamp(13px, 1.4vw, 17px)', color: '#F5C200', letterSpacing: '0.04em' }}>
        CA: {CA}
      </span>
      <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: copied ? '#00FF41' : '#7A6108', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
        {copied ? '✓ COPIED' : '[ COPY ]'}
      </span>
    </button>
  )
}

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center" style={{ background: '#0D0B00' }}>

      {/* Background image */}
      <Image
        src="/background.png"
        alt="RIGGED background"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center center' }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(8, 6, 0, 0.62)' }} />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)' }} />

      {/* Bottom fade */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(13,11,0,0.8) 90%, rgba(13,11,0,1) 100%)' }} />

      {/* ── All content overlaid on background ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-16 gap-6 max-w-4xl mx-auto w-full">

        {/* Floating barrel logo */}
        <div className="barrel-float">
          <Image
            src="/barrel.png"
            alt="RIGGED"
            width={200}
            height={200}
            style={{ filter: 'drop-shadow(0 0 32px rgba(245,194,0,0.5))' }}
          />
        </div>

        {/* Title */}
        <h1
          className="glitch"
          style={{
            fontFamily: "'Upheaval', monospace",
            fontSize: 'clamp(72px, 14vw, 180px)',
            color: '#FFFFFF',
            letterSpacing: '0.06em',
            textShadow: '0 0 50px rgba(245,194,0,0.45), 6px 6px 0 rgba(0,0,0,0.9)',
            lineHeight: 0.95,
          }}
        >
          RIGGED
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Upheaval', monospace",
          fontSize: 'clamp(11px, 1.6vw, 18px)',
          color: '#B8960C',
          letterSpacing: '0.28em',
        }}>
          AUTOMATED OIL STOCK DISTRIBUTOR
        </p>

        {/* Divider */}
        <div style={{ width: '120px', height: '3px', background: 'linear-gradient(90deg, transparent, #F5C200, transparent)', margin: '4px 0' }} />

        {/* CA */}
        <CopyCA />

        {/* Distro wallet — mobile only */}
        <DistroBalance />

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://meteora.ag" target="_blank" rel="noopener noreferrer" className="pixel-btn">
            BUY $RIGGED
          </a>
          <a href="#how-it-works" className="pixel-btn pixel-btn-outline">
            HOW IT WORKS
          </a>
        </div>

        {/* Scroll hint */}
        <p style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: 'rgba(245,194,0,0.3)', letterSpacing: '0.2em', marginTop: '8px' }}>
          ▼ SCROLL ▼
        </p>

      </div>
    </section>
  )
}
