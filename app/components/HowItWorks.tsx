'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    num: '01',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="44" height="44" rx="2" fill="#1A1700" stroke="#F5C200" strokeWidth="2"/>
        <polyline points="6,38 16,26 26,30 42,10" stroke="#00FF41" strokeWidth="3" fill="none" strokeLinejoin="round"/>
        <circle cx="42" cy="10" r="3" fill="#F5C200"/>
        <rect x="4" y="40" width="40" height="2" fill="#7A6108"/>
        <rect x="4" y="4" width="2" height="36" fill="#7A6108"/>
      </svg>
    ),
    title: 'OIL FUND',
    desc: '5% auto-converts to the United States Oil Fund (USO) token — real oil exposure for every holder.',
  },
  {
    num: '04',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="#1A1700" stroke="#F5C200" strokeWidth="3"/>
        <text x="24" y="31" textAnchor="middle" fill="#F5C200" fontSize="22" fontFamily="monospace" fontWeight="bold">$</text>
        <circle cx="24" cy="24" r="14" stroke="#B8960C" strokeWidth="1" fill="none" strokeDasharray="4 4"/>
      </svg>
    ),
    title: 'EARN DAILY',
    desc: '5% distributes to holders as oil yield. 1% fuels marketing & liquidity to grow the rig.',
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
      className="pixel-card flex flex-col gap-5 relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.55s ease ${index * 0.12}s, transform 0.55s ease ${index * 0.12}s`,
      }}
    >
      <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '48px', color: 'rgba(245,194,0,0.07)', position: 'absolute', top: '10px', right: '14px', userSelect: 'none', lineHeight: 1 }}>
        {step.num}
      </div>
      <div>{step.icon}</div>
      <h3 style={{ fontFamily: "'Upheaval', monospace", fontSize: '18px', color: '#F5C200', letterSpacing: '0.06em', lineHeight: 1.4 }}>
        {step.title}
      </h3>
      <p style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.9 }}>
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
          <h2 style={{ fontFamily: "'Upheaval', monospace", fontSize: 'clamp(28px, 4vw, 48px)', color: '#F5C200', letterSpacing: '0.08em', textShadow: '4px 4px 0 #B8960C' }}>
            HOW IT WORKS
          </h2>
        </div>

        {/* Tax breakdown banner */}
        <div className="mb-12" style={{
          background: 'linear-gradient(135deg, rgba(26,23,0,0.95) 0%, rgba(13,11,0,0.98) 100%)',
          border: '3px solid #B8960C',
          boxShadow: '0 0 40px rgba(245,194,0,0.12), inset 0 0 60px rgba(0,0,0,0.4)',
          padding: '36px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* corner accents */}
          {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h]) => (
            <div key={`${v}${h}`} style={{
              position: 'absolute', [v]: 0, [h]: 0,
              width: '18px', height: '18px',
              borderTop: v === 'top' ? '3px solid #F5C200' : 'none',
              borderBottom: v === 'bottom' ? '3px solid #F5C200' : 'none',
              borderLeft: h === 'left' ? '3px solid #F5C200' : 'none',
              borderRight: h === 'right' ? '3px solid #F5C200' : 'none',
            }} />
          ))}

          <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#7A6108', letterSpacing: '0.2em', textAlign: 'center', marginBottom: '28px' }}>
            TAX STRUCTURE
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-0">
            {/* 6% pill */}
            <div style={{ textAlign: 'center', padding: '0 32px' }}>
              <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '64px', color: '#F5C200', textShadow: '0 0 30px rgba(245,194,0,0.6), 4px 4px 0 #B8960C', lineHeight: 1 }}>6%</div>
              <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: '#7A6108', letterSpacing: '0.14em', marginTop: '8px' }}>ON EVERY TRADE</div>
            </div>

            {/* arrow */}
            <div className="flex md:flex-col items-center gap-2 px-4 py-4">
              <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #3a3000, #F5C200)' }} className="md:hidden" />
              <div style={{ height: '40px', width: '2px', background: 'linear-gradient(180deg, #3a3000, #F5C200)' }} className="hidden md:block" />
              <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '16px', color: '#F5C200' }}
                className="md:rotate-90">▶</div>
            </div>

            {/* split cards */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-lg">
              {/* 5% oil fund */}
              <div style={{
                flex: 1,
                background: 'rgba(0,255,65,0.05)',
                border: '2px solid rgba(0,255,65,0.35)',
                boxShadow: '0 0 20px rgba(0,255,65,0.08)',
                padding: '20px',
                textAlign: 'center',
              }}>
                <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '40px', color: '#00FF41', textShadow: '0 0 16px rgba(0,255,65,0.5)', lineHeight: 1 }}>5%</div>
                <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: '#fff', letterSpacing: '0.08em', marginTop: '10px' }}>OIL FUND</div>
                <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#00FF41', letterSpacing: '0.06em', marginTop: '6px' }}>→ HOLDERS</div>
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(0,255,65,0.15)' }}>
                  <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '10px', color: '#7A6108', letterSpacing: '0.04em', wordBreak: 'break-all' }}>
                    USO: rpydAzWd...adxondo
                  </div>
                </div>
              </div>

              {/* divider */}
              <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '18px', color: '#3a3000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>+</div>

              {/* 1% marketing */}
              <div style={{
                flex: 1,
                background: 'rgba(245,194,0,0.04)',
                border: '2px solid rgba(184,150,12,0.4)',
                boxShadow: '0 0 20px rgba(245,194,0,0.06)',
                padding: '20px',
                textAlign: 'center',
              }}>
                <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '40px', color: '#F5C200', textShadow: '0 0 16px rgba(245,194,0,0.4)', lineHeight: 1 }}>1%</div>
                <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: '#fff', letterSpacing: '0.08em', marginTop: '10px' }}>MARKETING</div>
                <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#F5C200', letterSpacing: '0.06em', marginTop: '6px' }}>& LIQUIDITY</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => <StepCard key={step.num} step={step} index={i} />)}
        </div>
      </div>
    </section>
  )
}
