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
    <div className="flex items-center gap-3">
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '22px', color: '#F5C200', textShadow: '0 0 20px rgba(245,194,0,0.45)' }}>
        ${price.toFixed(2)}
      </span>
      <span className="flash-green" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}>
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
    <button
      onClick={copy}
      className="pixel-border flex items-center gap-4 px-5 py-3 hover:bg-[rgba(245,194,0,0.06)] transition-all"
      style={{ background: 'rgba(13,11,0,0.75)', cursor: 'pointer' }}
    >
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px', color: '#F5C200', letterSpacing: '0.06em' }}>
        CA: {CA}
      </span>
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: copied ? '#00FF41' : '#7A6108', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
        {copied ? '✓ COPIED' : '[ COPY ]'}
      </span>
    </button>
  )
}

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#0D0B00' }}>

      {/* ── Full-width banner ── */}
      <div className="relative w-full" style={{ height: 'clamp(320px, 52vw, 640px)' }}>
        <Image
          src="/banner.png"
          alt="RIGGED"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,11,0,0.1) 0%, rgba(13,11,0,0) 30%, rgba(13,11,0,0.55) 75%, rgba(13,11,0,1) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)' }} />
      </div>

      {/* ── Content row: barrel left, info right ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24 -mt-20">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-10 md:gap-16">

          {/* Barrel */}
          <div className="barrel-float flex-shrink-0">
            <Image
              src="/barrel.png"
              alt="RIGGED barrel"
              width={180}
              height={180}
              style={{ filter: 'drop-shadow(0 0 28px rgba(245,194,0,0.4))' }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5 items-center md:items-start text-center md:text-left pb-2">
            <PriceTag />
            <CopyCA />
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-1">
              <a href="https://meteora.ag" target="_blank" rel="noopener noreferrer" className="pixel-btn" style={{ fontSize: '9px' }}>
                BUY $RIGGED
              </a>
              <a href="#how-it-works" className="pixel-btn pixel-btn-outline" style={{ fontSize: '9px' }}>
                HOW IT WORKS
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
