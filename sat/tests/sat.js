/**
  * Project: Senior Amin Token (SAT)
  * File: tests/sat.js
  * Author: Amin Davodian (Mohammadamin Davodian)
  * Website: https://senioramin.com
  * LinkedIn: https://linkedin.com/in/SudoAmin
  * GitHub: https://github.com/SeniorAminam
  * Created: 2025-12-22
  * 
  * Purpose: Anchor tests for creating the SAT mint PDA and minting initial supply.
  * Developed by Amin Davodian
  */
 
 const anchor = require("@coral-xyz/anchor");
 
 describe("sat", () => {
   const provider = anchor.AnchorProvider.env();
   anchor.setProvider(provider);
 
   it("Creates SAT mint and mints initial supply", async () => {
     const program = anchor.workspace.sat;
 
     const payer = provider.wallet.publicKey;
     const TOKEN_PROGRAM_ID = anchor.utils.token.TOKEN_PROGRAM_ID;
     const ASSOCIATED_TOKEN_PROGRAM_ID = anchor.utils.token.ASSOCIATED_PROGRAM_ID;
     const SYSVAR_RENT_PUBKEY = anchor.web3.SYSVAR_RENT_PUBKEY;
 
     const [mintPda] = anchor.web3.PublicKey.findProgramAddressSync(
       [Buffer.from("sat-mint")],
       program.programId
     );
 
     const [payerAta] = anchor.web3.PublicKey.findProgramAddressSync(
       [payer.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mintPda.toBuffer()],
       ASSOCIATED_TOKEN_PROGRAM_ID
     );
 
     console.log("SAT Mint PDA:", mintPda.toBase58());
     console.log("Payer ATA:", payerAta.toBase58());

     const existingMintAccount = await provider.connection.getAccountInfo(mintPda);
     if (existingMintAccount) {
       console.log(
         "SAT mint already exists on this cluster. Skipping createAndMintSat to keep test idempotent."
       );
       return;
     }
 
     const tx = await program.methods
       .createAndMintSat()
       .accounts({
         mint: mintPda,
         payerAta,
         payer,
         systemProgram: anchor.web3.SystemProgram.programId,
         tokenProgram: TOKEN_PROGRAM_ID,
         associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
         rent: SYSVAR_RENT_PUBKEY,
       })
       .rpc();
 
     console.log("Transaction signature:", tx);
   });
 });
