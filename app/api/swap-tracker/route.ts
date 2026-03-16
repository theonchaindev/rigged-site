import { NextResponse } from 'next/server'

export const revalidate = 60 // cache 60s

const WALLET = 'oiLzcmVU9jemJpwJCpULeEwWf4Eisow4EEWdK4yJFSH'
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
const USO_MINT = 'rpydAzWdCy85HEmoQkH5PVxYtDYQWjmLxgHHadxondo'
const RPC = 'https://api.mainnet-beta.solana.com'

async function rpc(body: object) {
  const res = await fetch(RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  return res.json()
}

export async function GET() {
  try {
    // Get last 50 transaction signatures for the wallet
    const sigData = await rpc({
      jsonrpc: '2.0', id: 1,
      method: 'getSignaturesForAddress',
      params: [WALLET, { limit: 50 }],
    })

    type SigEntry = { signature: string; blockTime?: number }
    const sigEntries: SigEntry[] = sigData?.result ?? []

    if (sigEntries.length === 0) {
      return NextResponse.json({ total: 0, swapCount: 0, swaps: [] })
    }

    // Fetch all transactions in parallel
    const txDatas = await Promise.all(
      sigEntries.map(s =>
        rpc({
          jsonrpc: '2.0', id: 1,
          method: 'getTransaction',
          params: [s.signature, { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 }],
        })
      )
    )

    let totalUsdcSwapped = 0
    let swapCount = 0
    const swaps: { sig: string; blockTime: number; usdcAmount: number; usoAmount: number }[] = []

    for (let i = 0; i < txDatas.length; i++) {
      const tx = txDatas[i]?.result
      if (!tx?.meta) continue

      type TokenBalance = {
        accountIndex: number
        mint: string
        owner: string
        uiTokenAmount: { uiAmount: number | null }
      }

      const preBals: TokenBalance[] = tx.meta.preTokenBalances ?? []
      const postBals: TokenBalance[] = tx.meta.postTokenBalances ?? []

      let usdcDelta = 0
      let usoDelta = 0

      for (const pre of preBals) {
        if (pre.owner !== WALLET) continue
        const post = postBals.find(p => p.accountIndex === pre.accountIndex)
        const delta = (post?.uiTokenAmount.uiAmount ?? 0) - (pre.uiTokenAmount.uiAmount ?? 0)
        if (pre.mint === USDC_MINT) usdcDelta += delta
        if (pre.mint === USO_MINT) usoDelta += delta
      }

      // Handle new stock token accounts (no pre-balance = wallet receiving for first time)
      for (const post of postBals) {
        if (post.owner !== WALLET) continue
        if (post.mint !== USO_MINT) continue
        const hasPre = preBals.some(p => p.accountIndex === post.accountIndex)
        if (!hasPre) usoDelta += post.uiTokenAmount.uiAmount ?? 0
      }

      // Swap detected: USDC spent, USO received
      if (usdcDelta < -0.01 && usoDelta > 0) {
        const usdcAmt = Math.round(Math.abs(usdcDelta) * 100) / 100
        const usoAmt = Math.round(usoDelta * 1000) / 1000
        totalUsdcSwapped += usdcAmt
        swapCount++
        swaps.push({
          sig: sigEntries[i].signature,
          blockTime: tx.blockTime ?? sigEntries[i].blockTime ?? 0,
          usdcAmount: usdcAmt,
          usoAmount: usoAmt,
        })
      }
    }

    return NextResponse.json({
      total: Math.round(totalUsdcSwapped * 100) / 100,
      swapCount,
      swaps: swaps.slice(0, 10), // most recent 10 swaps for the feed
      wallet: WALLET,
    })
  } catch {
    return NextResponse.json({ total: 0, swapCount: 0, swaps: [] })
  }
}
