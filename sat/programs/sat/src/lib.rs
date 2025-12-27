/**
  * Project: Senior Amin Token (SAT)
  * File: programs/sat/src/lib.rs
  * Author: Amin Davodian (Mohammadamin Davodian)
  * Website: https://senioramin.com
  * LinkedIn: https://linkedin.com/in/SudoAmin
  * GitHub: https://github.com/SeniorAminam
  * Created: 2025-12-22
  * 
  * Purpose: Anchor program for creating the SAT SPL mint and minting initial supply on Solana devnet.
  * Developed by Amin Davodian
  */
 
 use anchor_lang::prelude::*;
 use anchor_spl::{
     associated_token::AssociatedToken,
     token::{self, Mint, MintTo, SetAuthority, Token, TokenAccount},
 };
 
 declare_id!("GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg");
 
 const SAT_DECIMALS: u8 = 9;
 const SAT_DECIMAL_FACTOR: u64 = 1_000_000_000;
 const SAT_TOTAL_SUPPLY_WHOLE: u64 = 369_000_000;
 const SAT_TOTAL_SUPPLY_BASE_UNITS: u64 = SAT_TOTAL_SUPPLY_WHOLE * SAT_DECIMAL_FACTOR;
 
 #[program]
 pub mod sat {
     use super::*;
 
     pub fn create_and_mint_sat(ctx: Context<CreateAndMintSat>) -> Result<()> {
         if ctx.accounts.mint.supply != 0 {
             return err!(SatError::AlreadyMinted);
         }
 
         msg!("Creating Senior Amin Token (SAT)");
         msg!("Decimals: {}", SAT_DECIMALS);
         msg!("Total supply (base units): {}", SAT_TOTAL_SUPPLY_BASE_UNITS);
 
         token::mint_to(
             CpiContext::new(
                 ctx.accounts.token_program.to_account_info(),
                 MintTo {
                     mint: ctx.accounts.mint.to_account_info(),
                     to: ctx.accounts.payer_ata.to_account_info(),
                     authority: ctx.accounts.payer.to_account_info(),
                 },
             ),
             SAT_TOTAL_SUPPLY_BASE_UNITS,
         )?;
 
         token::set_authority(
             CpiContext::new(
                 ctx.accounts.token_program.to_account_info(),
                 SetAuthority {
                     account_or_mint: ctx.accounts.mint.to_account_info(),
                     current_authority: ctx.accounts.payer.to_account_info(),
                 },
             ),
             anchor_spl::token::spl_token::instruction::AuthorityType::MintTokens,
             None,
         )?;

         token::set_authority(
             CpiContext::new(
                 ctx.accounts.token_program.to_account_info(),
                 SetAuthority {
                     account_or_mint: ctx.accounts.mint.to_account_info(),
                     current_authority: ctx.accounts.payer.to_account_info(),
                 },
             ),
             anchor_spl::token::spl_token::instruction::AuthorityType::FreezeAccount,
             None,
         )?;
 
         msg!("SAT mint created, initial supply minted, mint+freeze authorities locked.");
         Ok(())
     }
 }
 
 #[derive(Accounts)]
 pub struct CreateAndMintSat<'info> {
     #[account(
         init,
         payer = payer,
         seeds = [b"sat-mint"],
         bump,
         mint::decimals = SAT_DECIMALS,
         mint::authority = payer,
         mint::freeze_authority = payer,
     )]
     pub mint: Account<'info, Mint>,
 
     #[account(
         init_if_needed,
         payer = payer,
         associated_token::mint = mint,
         associated_token::authority = payer,
     )]
     pub payer_ata: Account<'info, TokenAccount>,
 
     #[account(mut)]
     pub payer: Signer<'info>,
 
     pub system_program: Program<'info, System>,
     pub token_program: Program<'info, Token>,
     pub associated_token_program: Program<'info, AssociatedToken>,
     pub rent: Sysvar<'info, Rent>,
 }
 
 #[error_code]
 pub enum SatError {
     #[msg("SAT supply was already minted for this mint.")]
     AlreadyMinted,
 }
