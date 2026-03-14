'use client'

import { useEffect, useState } from 'react'

const DIST_WALLET = 'AD19Xv3k96nGdC7hGEYVgogihgsv4pf4njr6z96V1Crx'

export default function DistroFloat() {
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
      className="hidden md:flex"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        background: 'rgba(13,11,0,0.92)',
        border: '4px solid #F5C200',
        boxShadow: '0 0 28px rgba(245,194,0,0.35), 6px 6px 0 #B8960C',
        padding: '20px 28px',
        flexDirection: 'column',
        gap: '8px',
        textDecoration: 'none',
        backdropFilter: 'blur(8px)',
        transition: 'box-shadow 0.2s, transform 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 0 36px rgba(245,194,0,0.55), 4px 4px 0 #B8960C'
        e.currentTarget.style.transform = 'translate(-2px, -2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 0 20px rgba(245,194,0,0.3), 4px 4px 0 #B8960C'
        e.currentTarget.style.transform = 'translate(0, 0)'
      }}
    >
      <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: '#7A6108', letterSpacing: '0.14em' }}>
        DISTRO WALLET
      </span>
      <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '38px', color: '#F5C200', textShadow: '0 0 20px rgba(245,194,0,0.5)', lineHeight: 1 }}>
        ${formatted}
      </span>
      <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '12px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
        USDC • PENDING ↗
      </span>
    </a>
  )
}
