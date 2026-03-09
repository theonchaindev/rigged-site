'use client'

import { useState } from 'react'

const CA = 'TBA'

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(CA)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer
      style={{
        background: '#080700',
        borderTop: '4px solid #F5C200',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(245,194,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,194,0,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-14">
          {/* Logo */}
          <div className="flex flex-col gap-2">
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '28px',
                color: '#F5C200',
                textShadow: '4px 4px 0 #B8960C, 0 0 30px rgba(245,194,0,0.3)',
                letterSpacing: '0.06em',
              }}
            >
              RIGGED
            </span>
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '6px',
                color: '#7A6108',
                letterSpacing: '0.2em',
              }}
            >
              AUTOMATED OIL STOCK DISTRIBUTOR
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 items-center justify-center">
            {[
              { label: 'X / TWITTER', href: 'https://x.com' },
              { label: 'METEORA', href: 'https://meteora.ag' },
              { label: 'ONDO FINANCE', href: 'https://ondo.finance' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '7px',
                  color: '#7A6108',
                  textDecoration: 'none',
                  letterSpacing: '0.12em',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F5C200')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7A6108')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* CA section */}
        <div
          className="flex flex-col items-center gap-5 py-10 mb-12"
          style={{ borderTop: '2px solid rgba(122,97,8,0.3)', borderBottom: '2px solid rgba(122,97,8,0.3)' }}
        >
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '8px',
              color: '#7A6108',
              letterSpacing: '0.15em',
            }}
          >
            CONTRACT ADDRESS
          </span>
          <button
            onClick={copy}
            className="pixel-border"
            style={{
              background: 'rgba(13,11,0,0.8)',
              padding: '14px 24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,194,0,0.06)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(13,11,0,0.8)')}
          >
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '11px',
                color: '#F5C200',
                letterSpacing: '0.08em',
              }}
            >
              {CA}
            </span>
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '8px',
                color: copied ? '#00FF41' : '#7A6108',
                transition: 'color 0.2s',
                minWidth: '60px',
              }}
            >
              {copied ? '✓ COPIED' : '[ COPY ]'}
            </span>
          </button>
          <a
            href="https://meteora.ag"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn"
            style={{ fontSize: '9px', marginTop: '4px' }}
          >
            BUY $RIGGED ON METEORA
          </a>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '7px',
              color: 'rgba(122,97,8,0.5)',
              letterSpacing: '0.08em',
            }}
          >
            RIGGED © 2025. ALL YIELDS RESERVED.
          </span>
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '6px',
              color: 'rgba(122,97,8,0.4)',
              letterSpacing: '0.06em',
              textAlign: 'center',
              maxWidth: '400px',
              lineHeight: 2,
            }}
          >
            NOT FINANCIAL ADVICE. CRYPTO IS RISKY. DO YOUR OWN RESEARCH.
          </span>
        </div>
      </div>
    </footer>
  )
}
