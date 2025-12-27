/**
 * Project: Senior Amin Token (SAT)
 * File: src/cpmm/swap.ts
 * Author: Amin Davodian (Mohammadamin Davodian)
 * Website: https://senioramin.com
 * LinkedIn: https://linkedin.com/in/SudoAmin
 * GitHub: https://github.com/SeniorAminam
 * Created: 2025-12-23
 * 
 * Purpose: Quote and optionally execute a swap on the SAT CPMM pool (devnet) using RPC-only pool fetching.
 * Developed by Amin Davodian
 */

import {
  ApiV3PoolInfoStandardItemCpmm,
  CpmmKeys,
  CpmmParsedRpcData,
  CurveCalculator,
  FeeOn,
  printSimulate,
  TxVersion,
} from '@raydium-io/raydium-sdk-v2'
import { initSdk } from '../config'
import BN from 'bn.js'
import { isValidCpmm } from './utils'
import { NATIVE_MINT } from '@solana/spl-token'
import Decimal from 'decimal.js'

const DEFAULT_POOL_ID = '4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf'

const uiAmountToBn = (uiAmount: string, decimals: number): BN => {
  const amount = new Decimal(uiAmount)
  if (!amount.isFinite() || amount.isNeg()) throw new Error('invalid INPUT_AMOUNT_UI')
  const baseUnits = amount.mul(new Decimal(10).pow(decimals))
  return new BN(baseUnits.toFixed(0, Decimal.ROUND_FLOOR))
}

const defaultInputAmount = (decimals: number): BN => {
  if (decimals <= 0) return new BN('1')
  if (decimals === 1) return new BN('1')
  return new BN(new Decimal(10).pow(decimals - 2).toFixed(0))
}

export const swap = async () => {
  const raydium = await initSdk()

  const poolId = process.env.POOL_ID || DEFAULT_POOL_ID

  const mode = (process.env.MODE || 'quote').toLowerCase() as 'quote' | 'swap'
  const inputMint = (process.env.INPUT_MINT || NATIVE_MINT.toBase58()).toString()
  const inputAmountLamports = process.env.INPUT_AMOUNT_LAMPORTS
  const inputAmountUi = process.env.INPUT_AMOUNT_UI

  let poolInfo: ApiV3PoolInfoStandardItemCpmm
  let poolKeys: CpmmKeys | undefined
  let rpcData: CpmmParsedRpcData

  if (raydium.cluster === 'mainnet') {
    // if you wish to get pool info from rpc, also can modify logic to go rpc method directly
    const data = await raydium.api.fetchPoolById({ ids: poolId })
    poolInfo = data[0] as ApiV3PoolInfoStandardItemCpmm
    if (!isValidCpmm(poolInfo.programId)) throw new Error('target pool is not CPMM pool')
    rpcData = await raydium.cpmm.getRpcPoolInfo(poolInfo.id, true)
  } else {
    const data = await raydium.cpmm.getPoolInfoFromRpc(poolId)
    poolInfo = data.poolInfo
    poolKeys = data.poolKeys
    rpcData = data.rpcData
  }

  if (inputMint !== poolInfo.mintA.address && inputMint !== poolInfo.mintB.address)
    throw new Error('input mint does not match pool')

  const baseIn = inputMint === poolInfo.mintA.address
  const inputDecimals = baseIn ? poolInfo.mintA.decimals : poolInfo.mintB.decimals
  const inputAmount = inputAmountLamports
    ? new BN(inputAmountLamports)
    : inputAmountUi
      ? uiAmountToBn(inputAmountUi, inputDecimals)
      : defaultInputAmount(inputDecimals)

  // swap pool mintA for mintB
  const swapResult = CurveCalculator.swapBaseInput(
    inputAmount,
    baseIn ? rpcData.baseReserve : rpcData.quoteReserve,
    baseIn ? rpcData.quoteReserve : rpcData.baseReserve,
    rpcData.configInfo!.tradeFeeRate,
    rpcData.configInfo!.creatorFeeRate,
    rpcData.configInfo!.protocolFeeRate,
    rpcData.configInfo!.fundFeeRate,
    rpcData.feeOn === FeeOn.BothToken || rpcData.feeOn === FeeOn.OnlyTokenB
  )

  console.log(
    'swap quote',
    Object.keys(swapResult).reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: swapResult[cur as keyof typeof swapResult].toString(),
      }),
      {}
    )
  )

  console.log('pool', {
    id: poolInfo.id,
    mintA: poolInfo.mintA.address,
    mintB: poolInfo.mintB.address,
    inputMint,
    baseIn,
  })

  /**
   * swapResult.inputAmount -> input amount
   * swapResult.outputAmount -> output amount
   * swapResult.tradeFee -> this swap fee, charge input mint
   */

  if (mode === 'quote') {
    console.log('MODE=quote: not sending any transaction. To execute swap set MODE=swap')
    process.exit(0)
  }

  const { execute, transaction } = await raydium.cpmm.swap({
    poolInfo,
    poolKeys,
    inputAmount,
    swapResult,
    slippage: 0.001,
    baseIn,
    txVersion: TxVersion.V0,
  })

  printSimulate([transaction])

  const { txId } = await execute({ sendAndConfirm: true })
  console.log('swap sent', {
    txId: `https://explorer.solana.com/tx/${txId}?cluster=devnet`,
  })
  process.exit(0)
}

/** uncomment code below to execute */
swap()
