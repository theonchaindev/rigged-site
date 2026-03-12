import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/USO?interval=1m&range=1d&_=${Date.now()}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'application/json',
        },
        cache: 'no-store',
      }
    )
    const data = await res.json()
    const meta = data?.chart?.result?.[0]?.meta
    const price: number = meta?.regularMarketPrice ?? null
    const prevClose: number = meta?.chartPreviousClose ?? meta?.previousClose ?? null
    const change = price && prevClose ? ((price - prevClose) / prevClose) * 100 : null

    return NextResponse.json(
      { price, change, symbol: 'USO' },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch {
    return NextResponse.json(
      { price: null, change: null, symbol: 'USO' },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
