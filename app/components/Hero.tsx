'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const CA = 'TBA'

function PriceTag() {
  const [price, setPrice] = useState(110.0)
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => Math.max(100, parseFloat((prev + (Math.random() - 0.48) * 0.5).toFixed(2))))
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <span style={{ fontFamily: "'Upheaval', monospace", fontSize: 'clamp(32px, 4vw, 52px)', color: '#F5C200', textShadow: '0 0 24px rgba(245,194,0,0.5)' }}>
        ${price.toFixed(2)}
      </span>
      <span className="flash-green" style={{ fontFamily: "'Upheaval', monospace", fontSize: 'clamp(16px, 2vw, 22px)' }}>
        +150% ▲
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
    <div className="flex flex-col gap-2">
      <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: '#7A6108', letterSpacing: '0.12em' }}>
        CONTRACT ADDRESS
      </span>
      <button
        onClick={copy}
        className="pixel-border flex items-center gap-5 px-5 py-3 hover:bg-[rgba(245,194,0,0.06)] transition-all"
        style={{ background: 'rgba(13,11,0,0.8)', cursor: 'pointer' }}
      >
        <span style={{ fontFamily: "'Upheaval', monospace", fontSize: 'clamp(14px, 1.5vw, 18px)', color: '#F5C200', letterSpacing: '0.04em' }}>
          {CA}
        </span>
        <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: copied ? '#00FF41' : '#7A6108', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
          {copied ? '✓ COPIED' : '[ COPY ]'}
        </span>
      </button>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#0D0B00' }}>

      {/* ── Background: full image, correct aspect ratio ── */}
      <div className="relative w-full" style={{ aspectRatio: '1536 / 1024' }}>
        <Image
          src="/background.png"
          alt="RIGGED"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
        />

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)' }} />

        {/* Bottom fade into page */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(13,11,0,0.6) 80%, rgba(13,11,0,1) 100%)' }} />

        {/* ── RIGGED title overlaid on image ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-[8%]">
          <h1
            className="glitch"
            style={{
              fontFamily: "'Upheaval', monospace",
              fontSize: 'clamp(64px, 12vw, 160px)',
              color: '#FFFFFF',
              letterSpacing: '0.06em',
              textShadow: '0 0 40px rgba(245,194,0,0.5), 6px 6px 0 rgba(0,0,0,0.8)',
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            RIGGED
          </h1>
          <p style={{
            fontFamily: "'Upheaval', monospace",
            fontSize: 'clamp(11px, 1.4vw, 18px)',
            color: '#B8960C',
            letterSpacing: '0.25em',
            marginTop: '12px',
            textAlign: 'center',
          }}>
            AUTOMATED OIL STOCK DISTRIBUTOR
          </p>
        </div>
      </div>

      {/* ── Content row: big barrel + details ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">

          {/* Big floating barrel */}
          <div className="barrel-float flex-shrink-0">
            <Image
              src="/barrel.png"
              alt="RIGGED barrel"
              width={260}
              height={260}
              style={{ filter: 'drop-shadow(0 0 32px rgba(245,194,0,0.45))' }}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6 justify-center py-4 items-center md:items-start text-center md:text-left">
            <PriceTag />
            <CopyCA />
            <div className="flex flex-wrap gap-4">
              <a href="https://meteora.ag" target="_blank" rel="noopener noreferrer" className="pixel-btn">
                BUY $RIGGED
              </a>
              <a href="#how-it-works" className="pixel-btn pixel-btn-outline">
                HOW IT WORKS
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
