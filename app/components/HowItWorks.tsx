'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    num: '01',
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="8" width="36" height="36" rx="2" fill="#1A1700" stroke="#F5C200" strokeWidth="3"/>
        <rect x="4" y="14" width="40" height="5" fill="#B8960C"/>
        <rect x="4" y="30" width="40" height="5" fill="#B8960C"/>
        <circle cx="24" cy="26" r="7" stroke="#F5C200" strokeWidth="2" fill="none"/>
        <rect x="2" y="4" width="44" height="8" rx="2" fill="#B8960C"/>
      </svg>
    ),
    title: 'BUY $RIGGED',
    desc: 'Grab $RIGGED on Meteora. Connect your wallet and load up — no whitelists, no minimums.',
  },
  {
    num: '02',
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
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
    title: '6% TAX',
    desc: 'Every trade carries a 6% tax — automatically split and routed on-chain. No manual steps.',
  },
  {
    num: '03',
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <rect x="2" y="2" width="44" height="44" rx="2" fill="#1A1700" stroke="#F5C200" strokeWidth="2"/>
        <polyline points="6,38 16,26 26,30 42,10" stroke="#00FF41" strokeWidth="3" fill="none" strokeLinejoin="round"/>
        <circle cx="42" cy="10" r="3" fill="#F5C200"/>
        <rect x="4" y="40" width="40" height="2" fill="#7A6108"/>
        <rect x="4" y="4" width="2" height="36" fill="#7A6108"/>
      </svg>
    ),
    title: 'OIL FUND',
    desc: '5% auto-converts to the United States Oil Fund (USO) — real oil exposure on every trade.',
  },
  {
    num: '04',
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" fill="#1A1700" stroke="#F5C200" strokeWidth="3"/>
        <text x="24" y="31" textAnchor="middle" fill="#F5C200" fontSize="22" fontFamily="monospace" fontWeight="bold">$</text>
        <circle cx="24" cy="24" r="14" stroke="#B8960C" strokeWidth="1" fill="none" strokeDasharray="4 4"/>
      </svg>
    ),
    title: 'EARN DAILY',
    desc: 'Oil yield distributes daily to all holders. 1% funds marketing and liquidity to grow the rig.',
  },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 0.13}s, transform 0.6s ease ${index * 0.13}s`,
        background: 'rgba(26,23,0,0.8)',
        border: '2px solid rgba(184,150,12,0.35)',
        borderTop: '3px solid #F5C200',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
      }}
    >
      {/* Step number — top right, large but subtle */}
      <div style={{
        position: 'absolute', top: '16px', right: '20px',
        fontFamily: "'Upheaval', monospace",
        fontSize: '52px',
        color: 'rgba(245,194,0,0.1)',
        lineHeight: 1,
        userSelect: 'none',
      }}>
        {step.num}
      </div>

      {/* Icon + step num badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          background: 'rgba(245,194,0,0.06)',
          border: '2px solid rgba(184,150,12,0.3)',
          padding: '10px',
          display: 'flex',
        }}>
          {step.icon}
        </div>
        <span style={{
          fontFamily: "'Upheaval', monospace",
          fontSize: '11px',
          color: '#B8960C',
          letterSpacing: '0.2em',
          background: 'rgba(245,194,0,0.08)',
          padding: '4px 10px',
          border: '1px solid rgba(184,150,12,0.3)',
        }}>
          STEP {step.num}
        </span>
      </div>

      <h3 style={{
        fontFamily: "'Upheaval', monospace",
        fontSize: '20px',
        color: '#F5C200',
        letterSpacing: '0.06em',
        lineHeight: 1.2,
        margin: 0,
      }}>
        {step.title}
      </h3>

      <p style={{
        fontFamily: "'Upheaval', monospace",
        fontSize: '13px',
        color: 'rgba(255,255,255,0.72)',
        lineHeight: 2,
        margin: 0,
      }}>
        {step.desc}
      </p>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-6" style={{ background: '#0D0B00' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #F5C200, transparent)' }} />

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#7A6108', letterSpacing: '0.28em', marginBottom: '12px' }}>
            THE MECHANISM
          </p>
          <h2 style={{ fontFamily: "'Upheaval', monospace", fontSize: 'clamp(32px, 5vw, 52px)', color: '#F5C200', letterSpacing: '0.08em', textShadow: '4px 4px 0 #B8960C', margin: 0 }}>
            HOW IT WORKS
          </h2>
        </div>

        {/* Tax breakdown */}
        <div className="mb-14" style={{
          border: '2px solid rgba(184,150,12,0.4)',
          borderLeft: '4px solid #F5C200',
          background: 'rgba(26,23,0,0.7)',
          padding: '0',
          overflow: 'hidden',
        }}>
          {/* Banner header */}
          <div style={{
            background: 'rgba(245,194,0,0.06)',
            borderBottom: '1px solid rgba(184,150,12,0.3)',
            padding: '14px 28px',
          }}>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#7A6108', letterSpacing: '0.22em' }}>
              TAX STRUCTURE — ON EVERY TRADE
            </span>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* 6% block */}
            <div style={{
              padding: '28px 36px',
              borderRight: '1px solid rgba(184,150,12,0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '160px',
            }}>
              <div style={{
                fontFamily: "'Upheaval', monospace",
                fontSize: '72px',
                color: '#F5C200',
                textShadow: '0 0 40px rgba(245,194,0,0.5), 4px 4px 0 #B8960C',
                lineHeight: 1,
              }}>6%</div>
              <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#7A6108', letterSpacing: '0.16em', marginTop: '8px' }}>
                TOTAL TAX
              </div>
            </div>

            {/* Arrow */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 20px', color: '#3a3000' }}>
              <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '20px', color: 'rgba(184,150,12,0.4)' }}>▶</span>
            </div>

            {/* Split */}
            <div className="flex flex-col sm:flex-row flex-1">
              {/* 5% */}
              <div style={{
                flex: 1,
                padding: '28px 28px',
                borderRight: '1px solid rgba(184,150,12,0.2)',
                borderTop: '3px solid #00FF41',
              }}>
                <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '44px', color: '#00FF41', textShadow: '0 0 20px rgba(0,255,65,0.4)', lineHeight: 1 }}>5%</div>
                <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: '#FFFFFF', letterSpacing: '0.06em', marginTop: '10px' }}>OIL FUND → HOLDERS</div>
                <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: 'rgba(0,255,65,0.6)', letterSpacing: '0.04em', marginTop: '6px' }}>
                  United States Oil Fund (USO)
                </div>
                <div style={{ marginTop: '12px', fontFamily: "'Upheaval', monospace", fontSize: '10px', color: '#7A6108', letterSpacing: '0.03em' }}>
                  rpydAzWd...adxondo
                </div>
              </div>

              {/* 1% */}
              <div style={{
                flex: 1,
                padding: '28px 28px',
                borderTop: '3px solid #B8960C',
              }}>
                <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '44px', color: '#F5C200', textShadow: '0 0 20px rgba(245,194,0,0.4)', lineHeight: 1 }}>1%</div>
                <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: '#FFFFFF', letterSpacing: '0.06em', marginTop: '10px' }}>MARKETING & LIQUIDITY</div>
                <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: 'rgba(184,150,12,0.6)', letterSpacing: '0.04em', marginTop: '6px' }}>
                  Grows the rig for all holders
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => <StepCard key={step.num} step={step} index={i} />)}
        </div>

      </div>
    </section>
  )
}
