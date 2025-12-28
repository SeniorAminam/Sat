<!--
Project: Solana Token Workshop (SAT)
File: PRESENTATION_WALKTHROUGH.md
Author: Amin Davodian (Mohammadamin Davodian)
Website: https://senioramin.com
LinkedIn: https://linkedin.com/in/SudoAmin
GitHub: https://github.com/SeniorAminam
Created: 2025-12-27

Purpose: Complete step-by-step presentation script for a university class on Solana token creation.
Developed by Amin Davodian
-->

<div align="center">

# 🚀 ساخت توکن روی سولانا — از صفر تا قهرمان

### 🎓 ارائه‌ی دانشگاهی | کارگاه عملی ۱ ساعته

<img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" width="120" alt="Solana Logo"/>

**ارائه‌دهنده:**

[![Website](https://img.shields.io/badge/🌐_Website-senioramin.com-0A66C2?style=for-the-badge)](https://senioramin.com)
[![GitHub](https://img.shields.io/badge/💻_GitHub-SeniorAminam-181717?style=for-the-badge)](https://github.com/SeniorAminam)
[![LinkedIn](https://img.shields.io/badge/🔗_LinkedIn-SudoAmin-0A66C2?style=for-the-badge)](https://linkedin.com/in/SudoAmin)

---

**امین داوودیان** | Mohammadamin Davodian

</div>

---

## 📋 فهرست مطالب

1. [🎯 مقدمه و اهداف](#-مقدمه-و-اهداف)
2. [❓ چرا سولانا؟ چرا Anchor؟ چرا Token-2022؟](#-چرا-سولانا-چرا-anchor-چرا-token-2022)
3. [🛠️ پیش‌نیازها و نصب محیط](#️-پیش‌نیازها-و-نصب-محیط)
4. [⚡ مسیر ۱: ساخت توکن با CLI (سریع و ساده)](#-مسیر-۱-ساخت-توکن-با-cli-سریع-و-ساده)
5. [🧱 مسیر ۲: پروژه واقعی با Anchor (حرفه‌ای)](#-مسیر-۲-پروژه-واقعی-با-anchor-حرفه‌ای)
6. [💰 قیمت‌گذاری و Liquidity Pool](#-قیمت‌گذاری-و-liquidity-pool)
7. [✅ جمع‌بندی و نکات امنیتی](#-جمع‌بندی-و-نکات-امنیتی)

---

> [!TIP]
> **برای کارگاه عملی گام‌به‌گام، به این فایل مراجعه کنید:**
>
> ### 📘 [WORKSHOP.md](WORKSHOP.md) — راهنمای عملی کامل
>
> این فایل (PRESENTATION_WALKTHROUGH) برای ارائه‌دهنده است.  
> **WORKSHOP.md** برای دانشجو/شرکت‌کننده است.

---

## 🎯 مقدمه و اهداف

<div align="center">

### 🎤 معرفی خودم

</div>

> سلام! من **امین داوودیان** هستم، توسعه‌دهنده‌ی بلاک‌چین و علاقه‌مند به تکنولوژی‌های نوین.
>
> امروز قراره با هم از **صفر مطلق** یک توکن روی شبکه‌ی سولانا بسازیم، بهش متادیتا اضافه کنیم، و حتی قیمت‌گذاریش کنیم! 🚀

---

### 📌 خروجی این جلسه

در پایان این ارائه، شما:

| ردیف | مهارت | توضیح |
|:---:|---|---|
| 1️⃣ | **ساخت توکن** | یک توکن واقعی روی Devnet می‌سازید |
| 2️⃣ | **متادیتا** | نام، نماد و لوگو به توکن اضافه می‌کنید |
| 3️⃣ | **قرارداد هوشمند** | با Anchor یک برنامه Rust می‌نویسید |
| 4️⃣ | **قیمت‌گذاری** | توکن را در یک Pool قرار می‌دهید |
| 5️⃣ | **امنیت** | نکات امنیتی توکن‌سازی را یاد می‌گیرید |

---

## ❓ چرا سولانا؟ چرا Anchor؟ چرا Token-2022؟

<div align="center">

### 🌐 مقایسه شبکه‌های بلاک‌چین

</div>

#### ⚡ چرا سولانا؟

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│     معیار       │    Ethereum     │      BSC        │    Solana       │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ سرعت (TPS)      │      ~15        │     ~100        │   ~65,000+      │
│ کارمزد          │   $2 - $50+     │   $0.1 - $1     │  $0.00025 ⚡    │
│ Finality        │   ~13 دقیقه     │   ~3 دقیقه      │   ~400ms 🚀    │
│ زبان قرارداد    │    Solidity     │   Solidity      │    Rust 🦀     │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

> [!TIP]
> **سولانا** با مکانیزم **Proof of History (PoH)** + **Proof of Stake (PoS)** یکی از سریع‌ترین شبکه‌هاست!

---

#### 🔧 چرا Anchor؟

**Anchor** یک فریمورک برای توسعه‌ی قراردادهای هوشمند روی سولاناست که:

| ویژگی | توضیح |
|---|---|
| 🛡️ **امنیت** | بررسی خودکار account validation |
| 📦 **ساختار** | کد تمیز و قابل نگهداری |
| 🧪 **تست** | فریمورک تست داخلی |
| 📜 **IDL** | تولید خودکار Interface Description Language |

```rust
// بدون Anchor (کد خام):
let accounts = next_account_info(account_info_iter)?;
if accounts.owner != &spl_token::id() {
    return Err(ProgramError::InvalidAccountData);
}
// 50+ خط کد برای validation...

// با Anchor:
#[account(constraint = mint.owner == &spl_token::id())]
pub mint: Account<'info, Mint>,
// فقط 1 خط! ✨
```

---

#### 🆕 چرا Token-2022؟

**Token-2022** (یا **Token Extensions Program**) نسل جدید استاندارد توکن سولاناست:

| ویژگی | Token Program (قدیمی) | Token-2022 (جدید) |
|---|:---:|:---:|
| Transfer Fees | ❌ | ✅ |
| Interest Bearing | ❌ | ✅ |
| Confidential Transfers | ❌ | ✅ |
| Permanent Delegate | ❌ | ✅ |
| Non-Transferable | ❌ | ✅ |
| Metadata Extensions | ❌ | ✅ |

**تفاوت عملی:**

```bash
# SPL Token (قدیمی):
spl-token create-token
# Program ID: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA

# Token-2022 (جدید):
spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
# Program ID: TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
```

> [!IMPORTANT]
> **هر بار که `spl-token create-token` اجرا می‌کنید:**
> - یک Mint Address **جدید و منحصر به فرد** ساخته می‌شود
> - می‌توانید صدها توکن مختلف بسازید
> - هر توکن = یک mint address جدید
>
> **این تفاوت اصلی با Anchor Program است که در بخش بعدی توضیح می‌دهیم.**

---

## 🛠️ پیش‌نیازها و نصب محیط

### 📋 چک‌لیست نصب

> [!CAUTION]
> ⚠️ روی **Windows**، تمام دستورات باید داخل **WSL (Ubuntu)** اجرا شوند!

---

### 🖥️ مرحله ۱: ورود به WSL

```powershell
# در PowerShell ویندوز:
wsl
```

---

### 🦀 مرحله ۲: نصب Rust

```bash
# نصب Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# فعال‌سازی
source $HOME/.cargo/env

# بررسی
rustc --version
# خروجی مورد انتظار: rustc 1.xx.x
```

---

### ☀️ مرحله ۳: نصب Solana CLI

```bash
# نصب Solana (آخرین نسخه)
curl --proto '=https' --tlsv1.2 -sSfL https://solana-install.solana.workers.dev | bash

# فعال‌سازی PATH
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"

# بررسی
solana --version
# خروجی مورد انتظار: solana-cli 2.x.x
```

---

### ⚓ مرحله ۴: نصب Anchor

```bash
# نصب Anchor CLI
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked

# بررسی
anchor --version
# خروجی مورد انتظار: anchor-cli 0.32.x
```

---

### 📦 مرحله ۵: نصب Node.js و Yarn

```bash
# نصب Node.js (با nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 24

# نصب Yarn
npm install -g yarn

# بررسی
node --version   # v24.x.x
yarn --version   # 1.22.x
```

---

### ✅ چک نهایی — همه‌چیز آماده؟

```bash
echo "🔍 بررسی نسخه‌ها..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🦀 Rust:   $(rustc --version | cut -d' ' -f2)"
echo "☀️ Solana: $(solana --version | cut -d' ' -f2)"
echo "⚓ Anchor: $(anchor --version | cut -d' ' -f2)"
echo "📦 Node:   $(node --version)"
echo "🧶 Yarn:   $(yarn --version)"
echo "🪙 SPL:    $(spl-token --version | cut -d' ' -f2)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ محیط آماده است!"
```

---

### 💰 تنظیم کیف پول Devnet (ایزوله‌سازی برای کلاس)

> [!IMPORTANT]
> برای اینکه پروژه‌های قبلی مزاحم کار ما نشوند، یک محیط کاملاً پاک (Clean) ایجاد می‌کنیم.

```bash
# ۱. ساخت پوشه کار جدید مخصوص کلاس
mkdir ~/solana-class-live && cd ~/solana-class-live

# ۲. تنظیم شبکه روی Devnet
solana config set --url devnet

# ۳. ساخت کیف پول جدید مخصوص همین ارائه
solana-keygen new --outfile owner.json --no-bip39-passphrase

# ۴. تنظیم CLI برای استفاده از این فایل
solana config set --keypair owner.json

# ۵. گرفتن SOL رایگان (Airdrop)
solana airdrop 2

# ۶. بررسی موجودی و آدرس
solana address
solana balance
```

> [!NOTE]
> 💡 روی **Devnet**، SOL رایگان است! می‌توانید با `solana airdrop 2` دو سولانا دریافت کنید.

---

## ⚡ مسیر ۱: ساخت توکن با CLI (سریع و ساده)

<div align="center">

### 🎬 بیایید یک توکن بسازیم!

</div>

---

### 📝 مرحله ۱: ساخت Mint Address

```bash
# ساخت توکن جدید با Token-2022
spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb

# خروجی:
# Creating token 7xKXtg...
# Address: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU  ← این آدرس توکن شماست! 🎉
```

> [!TIP]
> 📋 آدرس توکن را کپی کنید! در مراحل بعدی نیاز داریم.

---

### 🏦 مرحله ۲: ساخت Token Account

```bash
# ذخیره آدرس توکن در متغیر
export MINT_ADDRESS="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"

# ساخت حساب برای نگهداری توکن
spl-token create-account $MINT_ADDRESS --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb

# خروجی:
# Creating account 9yZB4...
```

---

### 💸 مرحله ۳: Mint کردن توکن

```bash
# ساختن 1,000,000 توکن
spl-token mint $MINT_ADDRESS 1000000 --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb

# بررسی موجودی
spl-token balance $MINT_ADDRESS --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb
```

---

### 🖼️ مرحله ۴: اضافه کردن متادیتا

ابتدا باید یک فایل JSON برای متادیتا بسازیم:

```bash
# ساخت فایل metadata.json
cat > metadata.json << 'EOF'
{
  "name": "Demo Token",
  "symbol": "DEMO",
  "description": "توکن آموزشی ساخته شده در کارگاه دانشگاه",
  "image": "https://raw.githubusercontent.com/SeniorAminam/Sat/main/metadata/logo.png",
  "attributes": [
    {
      "trait_type": "Created By",
      "value": "Amin Davodian"
    },
    {
      "trait_type": "Workshop",
      "value": "University Token Workshop"
    }
  ]
}
EOF

cat metadata.json
```

> [!IMPORTANT]
> 📌 برای متادیتای واقعی، باید فایل را روی **IPFS** یا **Arweave** آپلود کنید!

---

### 🔍 مرحله ۵: مشاهده در Explorer

```bash
# لینک Explorer
echo "🔗 مشاهده توکن در Explorer:"
echo "https://explorer.solana.com/address/$MINT_ADDRESS?cluster=devnet"
```

<div align="center">

[![Solana Explorer](https://img.shields.io/badge/View_on_Explorer-14F195?style=for-the-badge&logo=solana&logoColor=white)](https://explorer.solana.com/?cluster=devnet)

</div>

---

## 🧱 مسیر ۲: پروژه واقعی با Anchor (حرفه‌ای)

<div align="center">

### 🏗️ ساخت پروژه از صفر

</div>

---

### 📁 مرحله ۱: ایجاد پروژه جدید

```bash
# رفتن به پوشه کاری
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token

# ساخت پروژه Anchor جدید
anchor init my_token
cd my_token

# ساختار پروژه:
# my_token/
# ├── programs/my_token/src/lib.rs  ← قرارداد هوشمند
# ├── tests/my_token.ts             ← تست‌ها
# ├── Anchor.toml                   ← تنظیمات
# └── Cargo.toml                    ← وابستگی‌های Rust
```

---

### 🦀 مرحله ۲: نوشتن قرارداد هوشمند

فایل `programs/my_token/src/lib.rs` را ویرایش کنید:

```rust
/**
 * Project: My Token
 * Author: Amin Davodian
 * Purpose: Token creation with Anchor
 */

use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Mint, MintTo, SetAuthority, Token, TokenAccount},
};

// Program ID (بعد از build عوض می‌شود)
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

// تنظیمات توکن
const TOKEN_DECIMALS: u8 = 9;
const TOTAL_SUPPLY: u64 = 1_000_000_000_000_000_000; // 1 میلیارد توکن

#[program]
pub mod my_token {
    use super::*;

    /// ساخت توکن و mint کردن supply اولیه
    pub fn create_and_mint(ctx: Context<CreateAndMint>) -> Result<()> {
        // بررسی: قبلاً mint نشده باشد
        if ctx.accounts.mint.supply != 0 {
            return err!(TokenError::AlreadyMinted);
        }

        msg!("🚀 Creating token...");
        msg!("📊 Decimals: {}", TOKEN_DECIMALS);
        msg!("💰 Total Supply: {}", TOTAL_SUPPLY);

        // Mint کردن توکن
        token::mint_to(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.token_account.to_account_info(),
                    authority: ctx.accounts.payer.to_account_info(),
                },
            ),
            TOTAL_SUPPLY,
        )?;

        // 🔒 قفل کردن Mint Authority (امنیت)
        token::set_authority(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                SetAuthority {
                    account_or_mint: ctx.accounts.mint.to_account_info(),
                    current_authority: ctx.accounts.payer.to_account_info(),
                },
            ),
            anchor_spl::token::spl_token::instruction::AuthorityType::MintTokens,
            None, // هیچ‌کس نمی‌تواند توکن جدید بسازد!
        )?;

        msg!("✅ Token created successfully!");
        msg!("🔒 Mint authority revoked (locked forever)");

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateAndMint<'info> {
    /// Mint account (توکن)
    #[account(
        init,
        payer = payer,
        seeds = [b"token-mint"],
        bump,
        mint::decimals = TOKEN_DECIMALS,
        mint::authority = payer,
    )]
    pub mint: Account<'info, Mint>,

    /// Token account (کیف پول توکن)
    #[account(
        init_if_needed,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = payer,
    )]
    pub token_account: Account<'info, TokenAccount>,

    /// پرداخت‌کننده کارمزد
    #[account(mut)]
    pub payer: Signer<'info>,

    /// برنامه‌های سیستمی
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}

#[error_code]
pub enum TokenError {
    #[msg("این توکن قبلاً mint شده است!")]
    AlreadyMinted,
}
```

---

### 🔨 مرحله ۳: Build پروژه

```bash
# اضافه کردن وابستگی‌ها به Cargo.toml
cat >> programs/my_token/Cargo.toml << 'EOF'

[dependencies]
anchor-spl = "0.32.0"
EOF

# Build کردن
anchor build

# خروجی:
# Compiling my_token v0.1.0
# Finished release [optimized] target(s)
```

---

### 🧪 مرحله ۴: تست پروژه

```bash
# اجرای تست
anchor test --skip-local-validator

# یا روی Devnet:
anchor test --provider.cluster devnet
```

---

### 🚀 مرحله ۵: Deploy روی Devnet

```bash
# Deploy
anchor deploy --provider.cluster devnet

# خروجی:
# Program Id: GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg
```

---

## 💰 قیمت‌گذاری و Liquidity Pool

<div align="center">

### 🌊 ورود به دنیای DeFi

</div>

> [!NOTE]
> 🎓 این بخش آموزشی است. ساخت Pool واقعی نیاز به SOL بیشتر و تنظیمات پیچیده‌تر دارد.

---

### 🏊 مفهوم Liquidity Pool

```
┌─────────────────────────────────────────────────────────────┐
│                    LIQUIDITY POOL                           │
│                                                             │
│    ┌─────────┐              ┌─────────┐                    │
│    │   SOL   │   ⟷⟷⟷⟷⟷⟷   │  TOKEN  │                    │
│    │  1000   │              │ 1000000 │                    │
│    └─────────┘              └─────────┘                    │
│                                                             │
│    قیمت: 1 TOKEN = 0.001 SOL                               │
│    فرمول: x * y = k (Constant Product)                     │
└─────────────────────────────────────────────────────────────┘
```

---

### 📊 گرفتن Quote از Raydium

```bash
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/raydium-sdk-V2-demo

# تنظیم متغیرها
export INPUT_MINT="So11111111111111111111111111111111111111112"  # SOL
export OUTPUT_MINT="CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv"  # SAT

# گرفتن قیمت (فقط Quote)
yarn dev src/cpmm/quote.ts
```

---

## ✅ جمع‌بندی و نکات امنیتی

<div align="center">

### 🛡️ امنیت توکن‌سازی

</div>

---

### ✅ چک‌لیست امنیتی (برای انتشار واقعی)

| # | نکته | وضعیت |
|:---:|---|:---:|
| 1 | **Mint Authority** باید `revoke` شود | ✅ |
| 2 | **Freeze Authority** باید `revoke` شود | ✅ |
| 3 | **Update Authority** باید `revoke` شود | ✅ |
| 4 | متادیتای کامل (نام، نماد، لوگو) | ✅ |
| 5 | کد قرارداد Verify شده | ✅ |
| 6 | Liquidity قفل شده (LP Burn) | ✅ |

---

### 🏆 خلاصه آموخته‌ها

```
┌────────────────────────────────────────────────────────────────┐
│  📚 امروز یاد گرفتیم:                                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  1️⃣  سولانا = سریع + ارزان + Rust                             │
│                                                                │
│  2️⃣  Token-2022 = استاندارد جدید با امکانات بیشتر              │
│                                                                │
│  3️⃣  Anchor = فریمورک امن برای نوشتن قرارداد                  │
│                                                                │
│  4️⃣  PDA = آدرس‌های قطعی برای امنیت                            │
│                                                                │
│  5️⃣  Authority Revoke = قفل کردن برای جلوگیری از تقلب         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

<div align="center">

### 🙏 سپاس از توجه شما!

---

**سوالی دارید؟** 💬

[![Email](https://img.shields.io/badge/📧_Email-Contact_Me-EA4335?style=for-the-badge)](mailto:contact@senioramin.com)
[![Telegram](https://img.shields.io/badge/💬_Telegram-@SeniorAmin-26A5E4?style=for-the-badge)](https://t.me/SeniorAmin)

---

**🔗 لینک‌های مفید**

| منبع | لینک |
|---|---|
| 📖 Solana Docs | https://solana.com/docs |
| ⚓ Anchor Book | https://book.anchor-lang.com |
| 🪙 SPL Token | https://spl.solana.com/token-2022 |
| 🔍 Explorer | https://explorer.solana.com |

---

<img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" width="60" alt="Solana"/>

**Built with ❤️ by Amin Davodian**

</div>
