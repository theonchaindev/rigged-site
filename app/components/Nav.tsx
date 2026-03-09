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
        background: scrolled ? 'rgba(13,11,0,0.97)' : 'rgba(13,11,0,0.75)',
        borderBottom: '3px solid',
        borderColor: scrolled ? '#F5C200' : 'rgba(245,194,0,0.25)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <Image
            src="/barrel.png"
            alt="RIGGED"
            width={40}
            height={40}
            style={{ filter: 'drop-shadow(0 0 6px rgba(245,194,0,0.4))' }}
          />
          <span
            style={{
              fontFamily: "'Upheaval', monospace",
              color: '#F5C200',
              fontSize: '22px',
              letterSpacing: '0.08em',
              textShadow: '0 0 20px rgba(245,194,0,0.4)',
              transition: 'text-shadow 0.3s',
            }}
          >
            RIGGED
          </span>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-5">
          <a
            href="https://meteora.ag"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Upheaval', monospace",
              fontSize: '14px',
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
          >
            JOIN THE RIG
          </a>
        </div>
      </div>
    </nav>
  )
}
