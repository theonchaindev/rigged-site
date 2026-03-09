'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    num: '01',
    icon: '🛢️',
    pixelIcon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
        <rect x="6" y="8" width="36" height="36" rx="2" fill="#1A1700" stroke="#F5C200" strokeWidth="3"/>
        <rect x="4" y="14" width="40" height="5" fill="#B8960C"/>
        <rect x="4" y="30" width="40" height="5" fill="#B8960C"/>
        <circle cx="24" cy="26" r="7" stroke="#F5C200" strokeWidth="2" fill="none"/>
        <rect x="2" y="4" width="44" height="8" rx="2" fill="#B8960C"/>
      </svg>
    ),
    title: 'BUY $RIGGED',
    desc: 'Grab $RIGGED tokens on Meteora. No whitelists, no gatekeeping — just connect your wallet and load up.',
  },
  {
    num: '02',
    icon: '💧',
    pixelIcon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
        <rect x="4" y="4" width="16" height="16" fill="#1A1700" stroke="#F5C200" strokeWidth="2"/>
        <rect x="28" y="4" width="16" height="16" fill="#1A1700" stroke="#F5C200" strokeWidth="2"/>
        <rect x="4" y="28" width="16" height="16" fill="#1A1700" stroke="#F5C200" strokeWidth="2"/>
        <rect x="28" y="28" width="16" height="16" fill="#1A1700" stroke="#F5C200" strokeWidth="2"/>
        <rect x="20" y="12" width="8" height="4" fill="#F5C200"/>
        <rect x="20" y="32" width="8" height="4" fill="#F5C200"/>
        <rect x="12" y="20" width="4" height="8" fill="#F5C200"/>
        <rect x="32" y="20" width="4" height="8" fill="#F5C200"/>
      </svg>
    ),
    title: 'POOL LIQUIDITY',
    desc: 'The protocol automatically deposits liquidity into Meteora DLMM pools — maximizing depth and earning swap fees around the clock.',
  },
  {
    num: '03',
    icon: '📈',
    pixelIcon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
        <rect x="2" y="2" width="44" height="44" rx="2" fill="#1A1700" stroke="#F5C200" strokeWidth="2"/>
        <polyline points="6,38 16,26 26,30 42,10" stroke="#00FF41" strokeWidth="3" fill="none" strokeLinejoin="round"/>
        <circle cx="42" cy="10" r="3" fill="#F5C200"/>
        <rect x="4" y="40" width="40" height="2" fill="#7A6108"/>
        <rect x="4" y="4" width="2" height="36" fill="#7A6108"/>
      </svg>
    ),
    title: 'ONDO YIELD',
    desc: 'Capital is routed into Ondo Finance RWA products — tokenized real-world assets generating institutional-grade oil stock yield.',
  },
  {
    num: '04',
    icon: '💰',
    pixelIcon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
        <circle cx="24" cy="24" r="20" fill="#1A1700" stroke="#F5C200" strokeWidth="3"/>
        <text x="24" y="30" textAnchor="middle" fill="#F5C200" fontSize="20" fontFamily="monospace" fontWeight="bold">$</text>
        <circle cx="24" cy="24" r="14" stroke="#B8960C" strokeWidth="1" fill="none" strokeDasharray="4 4"/>
      </svg>
    ),
    title: 'EARN DAILY',
    desc: 'Yields auto-compound and get distributed to $RIGGED holders. No staking, no claiming — just hold and earn.',
  },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
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
      className="pixel-card flex flex-col gap-5 relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      {/* Step number badge */}
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '32px',
          color: 'rgba(245,194,0,0.08)',
          position: 'absolute',
          top: '12px',
          right: '16px',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        {step.num}
      </div>

      {/* Icon */}
      <div className="w-12 h-12">{step.pixelIcon}</div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '10px',
          color: '#F5C200',
          letterSpacing: '0.1em',
          lineHeight: 1.6,
        }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '7.5px',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 2.2,
        }}
      >
        {step.desc}
      </p>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-6" style={{ background: '#0D0B00' }}>
      {/* Top border */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, transparent, #F5C200, transparent)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '8px',
              color: '#7A6108',
              letterSpacing: '0.25em',
              marginBottom: '16px',
            }}
          >
            // THE MECHANISM
          </p>
          <h2
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(18px, 3vw, 28px)',
              color: '#F5C200',
              letterSpacing: '0.08em',
              textShadow: '4px 4px 0 #B8960C',
            }}
          >
            HOW IT WORKS
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>

        {/* Bottom callout */}
        <div
          className="mt-16 text-center pixel-border p-8"
          style={{ background: 'rgba(26,23,0,0.6)' }}
        >
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '8px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 2.5,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Powered by{' '}
            <a href="https://meteora.ag" target="_blank" rel="noopener noreferrer" style={{ color: '#F5C200', textDecoration: 'none' }}>
              METEORA
            </a>
            {' '}DLMM pools &amp;{' '}
            <a href="https://ondo.finance" target="_blank" rel="noopener noreferrer" style={{ color: '#F5C200', textDecoration: 'none' }}>
              ONDO FINANCE
            </a>
            {' '}real-world assets.{' '}
            Yield generated on-chain. Distributed automatically.
          </p>
        </div>
      </div>
    </section>
  )
}
