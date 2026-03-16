import { NextResponse } from 'next/server'

const WALLET = 'oiLzcmVU9jemJpwJCpULeEwWf4Eisow4EEWdK4yJFSH'
const RPC = 'https://api.mainnet-beta.solana.com'

export async function GET() {
  try {
    const res = await fetch(RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', id: 1,
        method: 'getBalance',
        params: [WALLET],
      }),
      next: { revalidate: 30 },
    })
    const data = await res.json()
    const lamports = data?.result?.value ?? 0
    const sol = Math.round((lamports / 1_000_000_000) * 1000) / 1000
    return NextResponse.json({ sol, wallet: WALLET })
  } catch {
    return NextResponse.json({ sol: 0, wallet: WALLET })
  }
}
