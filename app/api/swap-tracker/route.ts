import { NextResponse } from 'next/server'

export const revalidate = 60 // cache 60s

const WALLET = 'oiLzcmVU9jemJpwJCpULeEwWf4Eisow4EEWdK4yJFSH'
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
const RPC = 'https://api.mainnet-beta.solana.com'
const LAMPORTS = 1_000_000_000

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

    const txDatas = await Promise.all(
      sigEntries.map(s =>
        rpc({
          jsonrpc: '2.0', id: 1,
          method: 'getTransaction',
          params: [s.signature, { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 }],
        })
      )
    )

    let totalSolSwapped = 0
    let totalUsdcReceived = 0
    let swapCount = 0
    const swaps: { sig: string; blockTime: number; solAmount: number; usdcAmount: number }[] = []

    for (let i = 0; i < txDatas.length; i++) {
      const tx = txDatas[i]?.result
      if (!tx?.meta) continue

      // Find wallet's index in the transaction accounts
      const accountKeys: { pubkey: string }[] = tx.transaction?.message?.accountKeys ?? []
      const walletIndex = accountKeys.findIndex((k: { pubkey: string }) => k.pubkey === WALLET)
      if (walletIndex === -1) continue

      // SOL balance delta (includes fee, but good enough signal)
      const preSol = (tx.meta.preBalances[walletIndex] ?? 0) / LAMPORTS
      const postSol = (tx.meta.postBalances[walletIndex] ?? 0) / LAMPORTS
      const solDelta = postSol - preSol // negative = SOL spent

      // USDC balance delta
      type TokenBalance = {
        accountIndex: number
        mint: string
        owner: string
        uiTokenAmount: { uiAmount: number | null }
      }

      const preBals: TokenBalance[] = tx.meta.preTokenBalances ?? []
      const postBals: TokenBalance[] = tx.meta.postTokenBalances ?? []

      let usdcDelta = 0

      for (const pre of preBals) {
        if (pre.owner !== WALLET || pre.mint !== USDC_MINT) continue
        const post = postBals.find(p => p.accountIndex === pre.accountIndex)
        usdcDelta += (post?.uiTokenAmount.uiAmount ?? 0) - (pre.uiTokenAmount.uiAmount ?? 0)
      }

      // Handle new USDC token account (first time receiving USDC)
      for (const post of postBals) {
        if (post.owner !== WALLET || post.mint !== USDC_MINT) continue
        const hasPre = preBals.some(p => p.accountIndex === post.accountIndex)
        if (!hasPre) usdcDelta += post.uiTokenAmount.uiAmount ?? 0
      }

      // Swap detected: SOL spent, USDC received
      if (solDelta < -0.001 && usdcDelta > 0.01) {
        const solAmt = Math.round(Math.abs(solDelta) * 1000) / 1000
        const usdcAmt = Math.round(usdcDelta * 100) / 100
        totalSolSwapped += solAmt
        totalUsdcReceived += usdcAmt
        swapCount++
        swaps.push({
          sig: sigEntries[i].signature,
          blockTime: tx.blockTime ?? sigEntries[i].blockTime ?? 0,
          solAmount: solAmt,
          usdcAmount: usdcAmt,
        })
      }
    }

    return NextResponse.json({
      totalSol: Math.round(totalSolSwapped * 1000) / 1000,
      totalUsdc: Math.round(totalUsdcReceived * 100) / 100,
      swapCount,
      swaps: swaps.slice(0, 10),
      wallet: WALLET,
    })
  } catch {
    return NextResponse.json({ total: 0, swapCount: 0, swaps: [] })
  }
}
