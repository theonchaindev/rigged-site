'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    num: '01',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="8" width="36" height="36" rx="2" fill="#1A1700" stroke="#F5C200" strokeWidth="3"/>
        <rect x="4" y="14" width="40" height="5" fill="#B8960C"/>
        <rect x="4" y="30" width="40" height="5" fill="#B8960C"/>
        <circle cx="24" cy="26" r="7" stroke="#F5C200" strokeWidth="2" fill="none"/>
        <rect x="2" y="4" width="44" height="8" rx="2" fill="#B8960C"/>
      </svg>
    ),
    title: 'BUY $RIGGED',
    desc: 'Grab $RIGGED on Meteora. Connect your wallet and load up — no whitelists.',
  },
  {
    num: '02',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    desc: 'Protocol auto-deposits into Meteora DLMM pools — earning swap fees 24/7.',
  },
  {
    num: '03',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="44" height="44" rx="2" fill="#1A1700" stroke="#F5C200" strokeWidth="2"/>
        <polyline points="6,38 16,26 26,30 42,10" stroke="#00FF41" strokeWidth="3" fill="none" strokeLinejoin="round"/>
        <circle cx="42" cy="10" r="3" fill="#F5C200"/>
        <rect x="4" y="40" width="40" height="2" fill="#7A6108"/>
        <rect x="4" y="4" width="2" height="36" fill="#7A6108"/>
      </svg>
    ),
    title: 'ONDO YIELD',
    desc: 'Capital routes into Ondo Finance RWA products generating institutional oil-stock yield.',
  },
  {
    num: '04',
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="#1A1700" stroke="#F5C200" strokeWidth="3"/>
        <text x="24" y="31" textAnchor="middle" fill="#F5C200" fontSize="22" fontFamily="monospace" fontWeight="bold">$</text>
        <circle cx="24" cy="24" r="14" stroke="#B8960C" strokeWidth="1" fill="none" strokeDasharray="4 4"/>
      </svg>
    ),
    title: 'EARN DAILY',
    desc: 'Yields auto-distribute to holders. No staking, no claiming — just hold.',
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
      className="pixel-card flex flex-col gap-4 relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.55s ease ${index * 0.12}s, transform 0.55s ease ${index * 0.12}s`,
      }}
    >
      <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '28px', color: 'rgba(245,194,0,0.07)', position: 'absolute', top: '10px', right: '14px', userSelect: 'none', lineHeight: 1 }}>
        {step.num}
      </div>
      <div>{step.icon}</div>
      <h3 style={{ fontFamily: "'Upheaval', monospace", fontSize: '10px', color: '#F5C200', letterSpacing: '0.08em', lineHeight: 1.6 }}>
        {step.title}
      </h3>
      <p style={{ fontFamily: "'Upheaval', monospace", fontSize: '7.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 2.2 }}>
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
        <div className="text-center mb-14">
          <h2 style={{ fontFamily: "'Upheaval', monospace", fontSize: 'clamp(16px, 2.8vw, 26px)', color: '#F5C200', letterSpacing: '0.08em', textShadow: '4px 4px 0 #B8960C' }}>
            HOW IT WORKS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
