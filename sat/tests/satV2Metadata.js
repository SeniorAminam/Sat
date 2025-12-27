/**
  * Project: Senior Amin Token (SAT)
  * File: tests/satV2Metadata.js
  * Author: Amin Davodian (Mohammadamin Davodian)
  * Website: https://senioramin.com
  * LinkedIn: https://linkedin.com/in/SudoAmin
  * GitHub: https://github.com/SeniorAminam
  * Created: 2025-12-23
  * 
  * Purpose: Create a new SAT v2 mint on Devnet and attach Metaplex Token Metadata (name/symbol/uri).
  * Developed by Amin Davodian
  */

const anchor = require('@coral-xyz/anchor')
const {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  setAuthority,
  AuthorityType,
} = require('@solana/spl-token')
const { PublicKey } = require('@solana/web3.js')
const {
  PROGRAM_ID: TOKEN_METADATA_PROGRAM_ID,
  createCreateMetadataAccountV3Instruction,
} = require('@metaplex-foundation/mpl-token-metadata')

const SATV2_DECIMALS = Number(process.env.SATV2_DECIMALS || '9')
const SATV2_SUPPLY_WHOLE = process.env.SATV2_SUPPLY_WHOLE || '369000000'

const METADATA_NAME = process.env.METADATA_NAME || 'Senior Amin Token'
const METADATA_SYMBOL = process.env.METADATA_SYMBOL || 'SAT'
const METADATA_URI = process.env.METADATA_URI || 'https://example.com/sat.json'

const findMetadataPda = (mint) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    TOKEN_METADATA_PROGRAM_ID
  )[0]
}

describe('sat-metadata', () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  it('Creates SAT v2 mint + metadata on devnet', async () => {
    if (!Number.isFinite(SATV2_DECIMALS) || SATV2_DECIMALS < 0 || SATV2_DECIMALS > 9)
      throw new Error('Invalid SATV2_DECIMALS')

    const payer = provider.wallet.payer

    const mint = await createMint(
      provider.connection,
      payer,
      payer.publicKey,
      payer.publicKey,
      SATV2_DECIMALS
    )

    const ata = await getOrCreateAssociatedTokenAccount(provider.connection, payer, mint, payer.publicKey)

    const supplyBaseUnits = BigInt(SATV2_SUPPLY_WHOLE) * BigInt(10) ** BigInt(SATV2_DECIMALS)

    await mintTo(provider.connection, payer, mint, ata.address, payer.publicKey, supplyBaseUnits)

    const metadataPda = findMetadataPda(mint)

    const ix = createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataPda,
        mint,
        mintAuthority: payer.publicKey,
        payer: payer.publicKey,
        updateAuthority: payer.publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          data: {
            name: METADATA_NAME,
            symbol: METADATA_SYMBOL,
            uri: METADATA_URI,
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
          },
          isMutable: true,
          collectionDetails: null,
        },
      }
    )

    const tx = new anchor.web3.Transaction().add(ix)
    const sig = await provider.sendAndConfirm(tx, [], { commitment: 'confirmed' })

    await setAuthority(provider.connection, payer, mint, payer.publicKey, AuthorityType.MintTokens, null)
    await setAuthority(provider.connection, payer, mint, payer.publicKey, AuthorityType.FreezeAccount, null)

    console.log('SAT v2 Mint:', mint.toBase58())
    console.log('SAT v2 ATA:', ata.address.toBase58())
    console.log('Metadata PDA:', metadataPda.toBase58())
    console.log('Metadata tx:', `https://explorer.solana.com/tx/${sig}?cluster=devnet`)
  })
})
