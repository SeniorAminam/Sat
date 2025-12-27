/**
 * Project: Senior Amin Token (SAT)
 * File: src/cpmm/createSatV2TusdtCpmmPool.ts
 * Author: Amin Davodian (Mohammadamin Davodian)
 * Website: https://senioramin.com
 * LinkedIn: https://linkedin.com/in/SudoAmin
 * GitHub: https://github.com/SeniorAminam
 * Created: 2025-12-23
 * 
 * Purpose: Create a Raydium CPMM pool on Solana Devnet for SATv2/tUSDT using RPC-only config fetching.
 * Developed by Amin Davodian
 */

import {
  ApiCpmmConfigInfo,
  CpmmConfigInfoLayout,
  DEVNET_PROGRAM_ID,
  getCpmmPdaAmmConfigId,
  printSimulate,
} from '@raydium-io/raydium-sdk-v2'
import { NATIVE_MINT, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import BN from 'bn.js'
import Decimal from 'decimal.js'
import { connection, initSdk, txVersion } from '../config'

const uiAmountToBn = (uiAmount: string, decimals: number): BN => {
  const amount = new Decimal(uiAmount)
  if (!amount.isFinite() || amount.isNeg()) throw new Error('invalid ui amount')
  const baseUnits = amount.mul(new Decimal(10).pow(decimals))
  return new BN(baseUnits.toFixed(0, Decimal.ROUND_FLOOR))
}

const requireEnv = (key: string): string => {
  const v = process.env[key]
  if (!v) throw new Error(`Missing env var ${key}`)
  return v
}

const fetchCpmmFeeConfigFromRpc = async (): Promise<ApiCpmmConfigInfo> => {
  const configuredIndexRaw = process.env.CPMM_CONFIG_INDEX
  const configuredIndex = configuredIndexRaw !== undefined ? Number(configuredIndexRaw) : undefined

  const indices = configuredIndex !== undefined ? [configuredIndex] : Array.from({ length: 10 }, (_, i) => i)

  for (const index of indices) {
    const configId = getCpmmPdaAmmConfigId(DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_PROGRAM, index).publicKey
    const accountInfo = await connection.getAccountInfo(configId)
    if (!accountInfo) continue

    const decoded = CpmmConfigInfoLayout.decode(accountInfo.data)
    if (decoded.disableCreatePool) continue

    return {
      id: configId.toBase58(),
      index: decoded.index,
      protocolFeeRate: decoded.protocolFeeRate.toNumber(),
      tradeFeeRate: decoded.tradeFeeRate.toNumber(),
      fundFeeRate: decoded.fundFeeRate.toNumber(),
      createPoolFee: decoded.createPoolFee.toString(),
      creatorFeeRate: decoded.creatorFeeRate.toNumber(),
    }
  }

  throw new Error('Unable to fetch a valid CPMM config from RPC. Try setting CPMM_CONFIG_INDEX env var (e.g. CPMM_CONFIG_INDEX=0).')
}

export const createSatV2TusdtPool = async () => {
  const raydium = await initSdk()

  if (raydium.cluster !== 'devnet') {
    throw new Error(`This script is intended for devnet but sdk cluster is ${raydium.cluster}`)
  }

  const satMint = requireEnv('SATV2_MINT')
  const tusdtMint = requireEnv('TUSDT_MINT')

  const satDecimals = Number(process.env.SATV2_DECIMALS ?? '9')
  const tusdtDecimals = Number(process.env.TUSDT_DECIMALS ?? '6')

  if (!Number.isFinite(satDecimals) || satDecimals < 0) throw new Error('invalid SATV2_DECIMALS')
  if (!Number.isFinite(tusdtDecimals) || tusdtDecimals < 0) throw new Error('invalid TUSDT_DECIMALS')

  const mintA = {
    address: satMint,
    programId: TOKEN_PROGRAM_ID.toBase58(),
    decimals: satDecimals,
  }

  const mintB = {
    address: tusdtMint,
    programId: TOKEN_PROGRAM_ID.toBase58(),
    decimals: tusdtDecimals,
  }

  const mintAAmountUi = requireEnv('SATV2_AMOUNT_UI')
  const mintBAmountUi = requireEnv('TUSDT_AMOUNT_UI')

  const mintAAmount = uiAmountToBn(mintAAmountUi, satDecimals)
  const mintBAmount = uiAmountToBn(mintBAmountUi, tusdtDecimals)

  const feeConfig = await fetchCpmmFeeConfigFromRpc()

  const useSOLBalance = mintA.address === NATIVE_MINT.toBase58() || mintB.address === NATIVE_MINT.toBase58()

  const { execute, extInfo, transaction } = await raydium.cpmm.createPool({
    programId: DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_PROGRAM,
    poolFeeAccount: DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_FEE_ACC,

    mintA,
    mintB,

    mintAAmount,
    mintBAmount,

    startTime: new BN(0),
    feeConfig,
    associatedOnly: false,
    ownerInfo: {
      useSOLBalance,
    },
    txVersion,
  })

  printSimulate([transaction])

  const { txId } = await execute({ sendAndConfirm: true })

  const poolKeys = Object.keys(extInfo.address).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: extInfo.address[cur as keyof typeof extInfo.address].toString(),
    }),
    {} as Record<string, string>
  )

  console.log('SATv2/tUSDT CPMM pool created')
  console.log('Initial liquidity UI', {
    satV2: mintAAmountUi,
    tusdt: mintBAmountUi,
  })
  console.log('Transaction', `https://explorer.solana.com/tx/${txId}?cluster=devnet`)
  console.log('Pool keys', poolKeys)

  process.exit(0)
}

createSatV2TusdtPool().catch((e) => {
  console.error(e)
  process.exit(1)
})
