import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch(
      'https://query1.finance.yahoo.com/v8/finance/chart/USO?interval=1d&range=1d',
      {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        next: { revalidate: 30 }, // cache 30s
      }
    )
    const data = await res.json()
    const meta = data?.chart?.result?.[0]?.meta
    const price: number = meta?.regularMarketPrice ?? null
    const prevClose: number = meta?.chartPreviousClose ?? meta?.previousClose ?? null
    const change = price && prevClose ? ((price - prevClose) / prevClose) * 100 : null

    return NextResponse.json({ price, change, symbol: 'USO' })
  } catch {
    return NextResponse.json({ price: null, change: null, symbol: 'USO' })
  }
}
