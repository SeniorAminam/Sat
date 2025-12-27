/**
 * Project: Senior Amin Token (SAT)
 * File: src/cpmm/createSatCpmmPool.ts
 * Author: Amin Davodian (Mohammadamin Davodian)
 * Website: https://senioramin.com
 * LinkedIn: https://linkedin.com/in/SudoAmin
 * GitHub: https://github.com/SeniorAminam
 * Created: 2025-12-22
 * 
 * Purpose: Create a Raydium CPMM pool on Solana Devnet for WSOL/SAT with 3/6/9-themed initial liquidity.
 * Developed by Amin Davodian
 */

import { ApiCpmmConfigInfo, CpmmConfigInfoLayout, DEVNET_PROGRAM_ID, getCpmmPdaAmmConfigId, printSimulate } from '@raydium-io/raydium-sdk-v2'
import { TOKEN_PROGRAM_ID, NATIVE_MINT } from '@solana/spl-token'
import BN from 'bn.js'
import { connection, initSdk, txVersion } from '../config'

const SAT_MINT = 'CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv'

const WSOL_DECIMALS = 9
const SAT_DECIMALS = 9

const INITIAL_SOL_UI = '3.69'
const INITIAL_SAT_UI = '369000'

const SOL_BASE_UNITS = new BN('3690000000')
const SAT_BASE_UNITS = new BN('369000000000000')

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

export const createSatPool = async () => {
  const raydium = await initSdk()

  if (raydium.cluster !== 'devnet') {
    throw new Error(`This script is intended for devnet but sdk cluster is ${raydium.cluster}`)
  }

  const mintA = {
    address: NATIVE_MINT.toBase58(),
    programId: TOKEN_PROGRAM_ID.toBase58(),
    decimals: WSOL_DECIMALS,
  }

  const mintB = {
    address: SAT_MINT,
    programId: TOKEN_PROGRAM_ID.toBase58(),
    decimals: SAT_DECIMALS,
  }

  const feeConfig = await fetchCpmmFeeConfigFromRpc()

  const { execute, extInfo, transaction } = await raydium.cpmm.createPool({
    programId: DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_PROGRAM,
    poolFeeAccount: DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_FEE_ACC,

    mintA,
    mintB,

    mintAAmount: SOL_BASE_UNITS,
    mintBAmount: SAT_BASE_UNITS,

    startTime: new BN(0),
    feeConfig,
    associatedOnly: false,
    ownerInfo: {
      useSOLBalance: true,
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

  console.log('SAT CPMM pool created')
  console.log('Initial liquidity UI', {
    sol: INITIAL_SOL_UI,
    sat: INITIAL_SAT_UI,
  })
  console.log('Transaction', `https://explorer.solana.com/tx/${txId}?cluster=devnet`)
  console.log('Pool keys', poolKeys)

  process.exit(0)
}

createSatPool().catch((e) => {
  console.error(e)
  process.exit(1)
})
