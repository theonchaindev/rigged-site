'use client'

import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const USO_MINT = 'rpydAzWdCy85HEmoQkH5PVxYtDYQWjmLxgHHadxondo'

const SECTIONS = [
  {
    title: 'GETTING STARTED',
    items: [
      {
        q: 'What is $RIGGED?',
        a: '$RIGGED is an automated oil stock distributor on Solana. Every time $RIGGED is bought or sold, a 6% tax is collected and automatically converted into real oil stock (USO — United States Oil Fund). That yield is distributed to all holders every 10 minutes, on-chain.',
      },
      {
        q: 'How do I buy $RIGGED?',
        a: '$RIGGED is available on any Solana trading platform. The easiest way is via Meteora. You can also find it on Jupiter (jup.ag) by searching the contract address. No whitelist, no minimum — just connect your Solana wallet and buy.',
      },
      {
        q: 'What wallets are supported?',
        a: 'Any Solana-compatible wallet works: Phantom, Solflare, Backpack, Coinbase Wallet, and more. Make sure you have some SOL for transaction fees before buying.',
      },
    ],
  },
  {
    title: 'THE MECHANISM',
    items: [
      {
        q: 'How does the 6% tax work?',
        a: 'Every buy and sell of $RIGGED carries a 6% tax, split automatically on-chain:\n\n• 5% → Converted to USO (United States Oil Fund oil stock token) and distributed to holders\n• 1% → Marketing & liquidity to grow the protocol\n\nThis happens automatically — no claiming, no staking required.',
      },
      {
        q: 'What is the USO token?',
        a: 'USO is the on-chain representation of the United States Oil Fund — a real-world asset tied to crude oil prices. When the protocol buys USO with your tax share, you gain direct exposure to the oil market. The USO token on Solana is: ' + USO_MINT,
      },
      {
        q: 'How often do I receive distributions?',
        a: 'Oil stock yield is distributed to all $RIGGED holders every 10 minutes, automatically and on-chain. There is nothing to claim — distributions arrive directly in your wallet.',
      },
      {
        q: 'Do I need to stake or lock my tokens?',
        a: 'No. Simply hold $RIGGED in your wallet. The protocol tracks all holders and distributes proportionally based on your share of the total supply. No locking, no staking, no claiming.',
      },
    ],
  },
  {
    title: 'TRADING YOUR OIL STOCK',
    items: [
      {
        q: 'How do I swap my USO oil stock for SOL?',
        a: 'To convert your USO oil stock holdings to SOL (or any other token), use Jupiter — the best liquidity aggregator on Solana:\n\n1. Go to jup.ag\n2. In the "You\'re selling" field, paste the USO token address:\n   ' + USO_MINT + '\n3. Select SOL (or USDC) as the output token\n4. Review the quote and confirm the swap\n\nJupiter will route your swap through the best available liquidity pools automatically.',
      },
      {
        q: 'Can I trade $RIGGED on any DEX?',
        a: 'Yes. $RIGGED trades on Meteora DLMM pools for deep liquidity, but you can also use Jupiter, Raydium, or any other Solana DEX aggregator that supports the token.',
      },
      {
        q: 'Why is my USO balance growing?',
        a: 'Every time anyone buys or sells $RIGGED, 5% of the transaction value is converted to USO and sent to holders proportionally. The more trading volume, the faster your USO balance grows.',
      },
    ],
  },
  {
    title: 'GENERAL',
    items: [
      {
        q: 'Is this financial advice?',
        a: 'No. RIGGED is an experimental DeFi protocol. Nothing on this site constitutes financial advice. Always do your own research (DYOR) before investing in any token.',
      },
      {
        q: 'Where can I follow updates?',
        a: 'Follow @RiggedDistro on X (Twitter) for the latest news, distribution announcements, and protocol updates.',
      },
      {
        q: 'Where can I see live distribution data?',
        a: 'The Live Feed section on the homepage shows real-time USO oil price, total barrels distributed, and a live transaction feed of every USDC → USO swap made by the distribution wallet.',
      },
    ],
  },
]

function AccordionItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <div style={{
      borderBottom: '1px solid rgba(58,48,0,0.5)',
    }}>
      <button
        onClick={onClick}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: open ? '#F5C200' : 'rgba(255,255,255,0.85)', letterSpacing: '0.06em', lineHeight: 1.5 }}>
          {q}
        </span>
        <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '18px', color: '#F5C200', flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          +
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 24px 24px 24px' }}>
          {a.split('\n').map((line, i) => (
            line.trim() === '' ? <br key={i} /> :
            <p key={i} style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 2, letterSpacing: '0.03em', margin: '0 0 4px 0' }}>
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default function DocsPage() {
  const [open, setOpen] = useState<string | null>(null)

  const toggle = (key: string) => setOpen(prev => prev === key ? null : key)

  return (
    <>
      <Nav />
      <main style={{ background: '#0D0B00', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Page header */}
        <div style={{
          borderBottom: '3px solid rgba(245,194,0,0.15)',
          padding: '60px 24px 48px',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#7A6108', letterSpacing: '0.28em', marginBottom: '12px' }}>
            DOCUMENTATION
          </p>
          <h1 style={{ fontFamily: "'Upheaval', monospace", fontSize: 'clamp(32px, 5vw, 56px)', color: '#F5C200', letterSpacing: '0.08em', textShadow: '4px 4px 0 #B8960C', margin: '0 0 16px' }}>
            DOCS & FAQ
          </h1>
          <p style={{ fontFamily: "'Upheaval', monospace", fontSize: '13px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
            Everything you need to know about RIGGED, the 6% tax mechanism, and how to trade your oil stock.
          </p>
        </div>

        {/* Jupiter callout */}
        <div className="max-w-3xl mx-auto px-6 pt-12">
          <a
            href="https://jup.ag"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              background: 'rgba(26,23,0,0.9)',
              border: '2px solid rgba(0,255,65,0.35)',
              borderLeft: '4px solid #00FF41',
              padding: '20px 28px',
              textDecoration: 'none',
              marginBottom: '48px',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#00FF41')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,255,65,0.35)')}
          >
            <div>
              <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#00FF41', letterSpacing: '0.2em', marginBottom: '6px' }}>
                SWAP USO OIL STOCK → SOL
              </div>
              <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '14px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.04em' }}>
                Use Jupiter (jup.ag) to swap your USO holdings for SOL or any other token
              </div>
            </div>
            <span style={{ fontFamily: "'Upheaval', monospace", fontSize: '20px', color: '#00FF41', flexShrink: 0 }}>↗</span>
          </a>

          {/* Sections */}
          {SECTIONS.map(section => (
            <div key={section.title} style={{ marginBottom: '40px' }}>
              <div style={{
                fontFamily: "'Upheaval', monospace",
                fontSize: '11px',
                color: '#7A6108',
                letterSpacing: '0.24em',
                padding: '10px 24px',
                background: 'rgba(245,194,0,0.04)',
                borderLeft: '3px solid #F5C200',
                marginBottom: '2px',
              }}>
                {section.title}
              </div>
              <div style={{
                background: 'rgba(26,23,0,0.8)',
                border: '2px solid rgba(184,150,12,0.25)',
              }}>
                {section.items.map((item, i) => (
                  <AccordionItem
                    key={item.q}
                    q={item.q}
                    a={item.a}
                    open={open === `${section.title}-${i}`}
                    onClick={() => toggle(`${section.title}-${i}`)}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* USO address reference */}
          <div style={{
            background: 'rgba(26,23,0,0.7)',
            border: '2px solid rgba(184,150,12,0.2)',
            borderTop: '3px solid #B8960C',
            padding: '24px 28px',
            marginBottom: '60px',
          }}>
            <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '11px', color: '#7A6108', letterSpacing: '0.2em', marginBottom: '12px' }}>
              REFERENCE ADDRESSES
            </div>
            {[
              { label: 'USO OIL STOCK TOKEN', value: USO_MINT },
            ].map(({ label, value }) => (
              <div key={label} style={{ marginBottom: '8px' }}>
                <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '10px', color: '#7A6108', letterSpacing: '0.14em', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontFamily: "'Upheaval', monospace", fontSize: '12px', color: 'rgba(245,194,0,0.75)', letterSpacing: '0.03em', wordBreak: 'break-all' }}>{value}</div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
