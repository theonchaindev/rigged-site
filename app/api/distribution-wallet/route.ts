import { NextResponse } from 'next/server'

const WALLET = 'AD19Xv3k96nGdC7hGEYVgogihgsv4pf4njr6z96V1Crx'
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
const RPC = 'https://api.mainnet-beta.solana.com'

export async function GET() {
  try {
    const res = await fetch(RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getTokenAccountsByOwner',
        params: [
          WALLET,
          { mint: USDC_MINT },
          { encoding: 'jsonParsed' },
        ],
      }),
      next: { revalidate: 30 }, // cache for 30s
    })

    const data = await res.json()
    const accounts = data?.result?.value ?? []

    let balance = 0
    if (accounts.length > 0) {
      balance = accounts[0].account.data.parsed.info.tokenAmount.uiAmount ?? 0
    }

    return NextResponse.json({ balance, wallet: WALLET })
  } catch {
    return NextResponse.json({ balance: 0, wallet: WALLET })
  }
}
