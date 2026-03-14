import { NextResponse } from 'next/server'

export const revalidate = 60 // cache 60s

const WALLET = 'AD19Xv3k96nGdC7hGEYVgogihgsv4pf4njr6z96V1Crx'
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

    const signatures: string[] = (sigData?.result ?? []).map(
      (s: { signature: string }) => s.signature
    )

    if (signatures.length === 0) {
      return NextResponse.json({ total: 0, txCount: 0 })
    }

    // Fetch all transactions in parallel
    const txDatas = await Promise.all(
      signatures.map(sig =>
        rpc({
          jsonrpc: '2.0', id: 1,
          method: 'getTransaction',
          params: [sig, { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 }],
        })
      )
    )

    let totalUsdcSwapped = 0
    let swapCount = 0

    for (const txData of txDatas) {
      const tx = txData?.result
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
        if (!post) continue

        const delta = (post.uiTokenAmount.uiAmount ?? 0) - (pre.uiTokenAmount.uiAmount ?? 0)
        if (pre.mint === USDC_MINT) usdcDelta += delta
        if (pre.mint === USO_MINT) usoDelta += delta
      }

      // Swap detected: USDC spent, USO received
      if (usdcDelta < -0.01 && usoDelta > 0) {
        totalUsdcSwapped += Math.abs(usdcDelta)
        swapCount++
      }
    }

    return NextResponse.json({
      total: Math.round(totalUsdcSwapped * 100) / 100,
      swapCount,
      wallet: WALLET,
    })
  } catch {
    return NextResponse.json({ total: 0, swapCount: 0 })
  }
}
