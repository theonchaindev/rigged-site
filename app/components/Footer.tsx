'use client'

import Image from 'next/image'
import { useState } from 'react'

const CA = 'A8kWdqhGzoX4iEpvNYcuEB6ehESzjeC3XG6uHZ63M7Bs'

const LINKS = [
  { label: 'X / TWITTER', href: 'https://x.com/RiggedDistro' },
  { label: 'METEORA', href: 'https://meteora.ag' },
  { label: 'ONDO FINANCE', href: 'https://ondo.finance' },
]

function CopyCAButton() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(CA)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="pixel-btn" style={{ cursor: 'pointer', border: 'none' }}>
      {copied ? '✓ COPIED!' : 'COPY CA'}
    </button>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#080700', borderTop: '4px solid #F5C200', overflow: 'hidden' }}>

      <div className="max-w-5xl mx-auto px-6 pt-16 pb-10 flex flex-col gap-10">

        {/* Top: logo + links + copy CA */}
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

          <div className="flex flex-col items-center md:items-end gap-5">
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
            <CopyCAButton />
          </div>
        </div>

      </div>

      {/* Full-width RIGGED wordmark */}
      <div style={{
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0.85,
        paddingTop: '8px',
      }}>
        <div style={{
          fontFamily: "'Upheaval', monospace",
          fontSize: 'clamp(120px, 21vw, 320px)',
          color: 'rgba(245,194,0,0.07)',
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          userSelect: 'none',
        }}>
          RIGGED
        </div>
      </div>

    </footer>
  )
}
