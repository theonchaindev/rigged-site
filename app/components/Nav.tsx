'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(13, 11, 0, 0.97)'
          : 'rgba(13, 11, 0, 0.8)',
        borderBottom: '3px solid',
        borderColor: scrolled ? '#F5C200' : 'rgba(245,194,0,0.3)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Image
            src="/barrel.png"
            alt="RIGGED"
            width={36}
            height={36}
            style={{ imageRendering: 'pixelated', filter: 'drop-shadow(0 0 6px rgba(245,194,0,0.4))' }}
          />
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              color: '#F5C200',
              fontSize: '16px',
              letterSpacing: '0.08em',
              textShadow: '0 0 20px rgba(245,194,0,0.4)',
              transition: 'text-shadow 0.3s',
            }}
            className="group-hover:[text-shadow:0_0_30px_rgba(245,194,0,0.8)]"
          >
            RIGGED
          </span>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a
            href="https://meteora.ag"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '8px',
              color: '#7A6108',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              display: 'none',
            }}
            className="md:block hover:text-[#F5C200] transition-colors"
          >
            TRADE
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn"
            style={{ fontSize: '8px', padding: '10px 18px' }}
          >
            JOIN THE RIG
          </a>
        </div>
      </div>
    </nav>
  )
}
