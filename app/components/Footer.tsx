'use client'

import { useState } from 'react'
import Image from 'next/image'

const CA = 'TBA'

const LINKS = [
  { label: 'X / TWITTER', href: 'https://x.com' },
  { label: 'METEORA', href: 'https://meteora.ag' },
  { label: 'ONDO FINANCE', href: 'https://ondo.finance' },
]

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(CA)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer style={{ background: '#080700', borderTop: '4px solid #F5C200' }}>
      <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col gap-12">

        {/* Top: logo + links */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex items-center gap-4">
            <Image src="/barrel.png" alt="RIGGED" width={48} height={48} style={{ filter: 'drop-shadow(0 0 8px rgba(245,194,0,0.3))' }} />
            <div className="flex flex-col gap-1">
              <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '28px', color: '#F5C200', textShadow: '3px 3px 0 #B8960C', letterSpacing: '0.06em' }}>
                RIGGED
              </span>
              <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#7A6108', letterSpacing: '0.15em' }}>
                AUTOMATED OIL STOCK DISTRIBUTOR
              </span>
            </div>
          </div>

          <div className="flex gap-8 items-center flex-wrap justify-center">
            {LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: '#7A6108', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F5C200')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7A6108')}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* CA */}
        <div id="ca" className="flex flex-col items-center gap-5 py-10" style={{ borderTop: '2px solid rgba(58,48,0,0.5)', borderBottom: '2px solid rgba(58,48,0,0.5)' }}>
          <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: '#7A6108', letterSpacing: '0.14em' }}>
            CONTRACT ADDRESS
          </span>
          <button
            onClick={copy}
            className="pixel-border flex items-center gap-6 px-6 py-4 transition-all hover:bg-[rgba(245,194,0,0.05)]"
            style={{ background: 'rgba(13,11,0,0.8)', cursor: 'pointer' }}
          >
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: 'clamp(14px, 1.5vw, 20px)', color: '#F5C200', letterSpacing: '0.05em' }}>{CA}</span>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: copied ? '#00FF41' : '#7A6108', transition: 'color 0.2s', minWidth: '80px' }}>
              {copied ? '✓ COPIED' : '[ COPY ]'}
            </span>
          </button>
          <a href="https://meteora.ag" target="_blank" rel="noopener noreferrer" className="pixel-btn" style={{ marginTop: '4px' }}>
            BUY $RIGGED ON METEORA
          </a>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: 'rgba(122,97,8,0.5)', letterSpacing: '0.06em' }}>
            RIGGED © 2025
          </span>
          <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '12px', color: 'rgba(122,97,8,0.35)', letterSpacing: '0.04em' }}>
            NOT FINANCIAL ADVICE. DYOR.
          </span>
        </div>

      </div>
    </footer>
  )
}
