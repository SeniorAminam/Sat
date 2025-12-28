<!--
Project: Solana Token Workshop (SAT)
File: WORKSHOP.md
Author: Amin Davodian (Mohammadamin Davodian)
Website: https://senioramin.com
LinkedIn: https://linkedin.com/in/SudoAmin
GitHub: https://github.com/SeniorAminam
Created: 2025-12-27

Purpose: Main workshop guide - Complete step-by-step memecoin creation on Solana (Entry Point)
Developed by Amin Davodian
-->

<div align="center">

# 🚀 کارگاه عملی ساخت میم کوین روی سولانا

### از صفر تا یک توکن کامل با متادیتا و قیمت‌گذاری

<img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" width="120" alt="Solana Logo"/>

**⏱️ مدت زمان:** 60 دقیقه | **سطح:** مبتدی تا متوسط

---

**توسعه‌دهنده:** [امین داوودیان](https://senioramin.com) | [@SeniorAminam](https://github.com/SeniorAminam)

</div>

---

> [!IMPORTANT]
> **🎯 این راهنمای اصلی کارگاه است - از اینجا شروع کنید!**
>
> در این کارگاه یاد می‌گیرید:
> - یک میم کوین واقعی روی Solana Devnet بسازید
> - متادیتا (نام، نماد، لوگو) اضافه کنید
> - قیمت‌گذاری اولیه انجام دهید
> - نکات امنیتی را رعایت کنید

---

## 📋 فهرست مطالب (مسیر کارگاه)

| مرحله | موضوع | مدت زمان | وضعیت |
|:---:|---|:---:|:---:|
| **۰** | [پیش‌نیازها](#مرحله-۰-پیش‌نیازها--بررسی-اولیه) | 5 دقیقه | ✅ شروع |
| **۱** | [ساخت توکن جدید](#مرحله-۱-ساخت-توکن-جدید-با-token-2022-cli) | 10 دقیقه | ⏭️ |
| **۲** | [اضافه کردن متادیتا](#مرحله-۲-اضافه-کردن-متادیتا) | 5 دقیقه | ⏭️ |
| **۳** | [فهم معماری Anchor](#مرحله-۳-مقایسه-با-پروژه-sat-معماری-anchor) | 10 دقیقه | ⏭️ |
| **۴** | [قیمت‌گذاری اولیه](#مرحله-۴-قیمت‌گذاری-با-raydium) | 10 دقیقه | ⏭️ |
| **۵** | [نکات امنیتی](#مرحله-۵-نکات-امنیتی-و-چک‌لیست-نهایی) | 5 دقیقه | ⏭️ |
| **۶** | [تمرین و سوالات](#مرحله-۶-تمرین-و-سوالات) | 15 دقیقه | ⏭️ |

---

## مرحله ۰: پیش‌نیازها — بررسی اولیه

> [!CAUTION]
> ⚠️ **محیط کار:** تمام دستورات باید در **WSL (Ubuntu)** اجرا شوند، نه در PowerShell یا CMD ویندوز!

### 🔍 چک کردن نسخه‌ها

ابتدا وارد WSL شوید:

```powershell
# در PowerShell ویندوز:
wsl
```

حالا در WSL، نسخه‌های ابزار را چک کنید:

```bash
# داخل WSL
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 بررسی نسخه‌های نصب شده..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🦀 Rust:   $(rustc --version 2>/dev/null || echo '❌ نصب نشده')"
echo "☀️  Solana: $(solana --version 2>/dev/null || echo '❌ نصب نشده')"
echo "🪙 SPL:    $(spl-token --version 2>/dev/null || echo '❌ نصب نشده')"
echo "⚓ Anchor: $(anchor --version 2>/dev/null || echo '❌ نصب نشده')"
echo "📦 Node:   $(node --version 2>/dev/null || echo '❌ نصب نشده')"
echo "🧶 Yarn:   $(yarn --version 2>/dev/null || echo '❌ نصب نشده')"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

**نسخه‌های مورد نیاز:**
- Rust: `1.91+`
- Solana CLI: `2.0+`
- Anchor: `0.32+`
- Node.js: `v20+`
- Yarn: `1.22+`

> [!TIP]
> اگر ابزاری نصب نیست، به فایل [docs/01-token-2022-cli.md](docs/01-token-2022-cli.md) بخش "نصب" مراجعه کنید.

### 💰 مرحله ۰.۱: ایزوله‌سازی و تنظیم کیف پول Devnet

> [!IMPORTANT]
> برای اینکه پروژه‌های قبلی مزاحم کار ما نشوند، یک محیط کاملاً پاک (Clean) ایجاد می‌کنیم.

```bash
# ۱. ساخت پوشه کار جدید
mkdir ~/solana-workshop-live && cd ~/solana-workshop-live

# ۲. تنظیم شبکه روی Devnet
solana config set --url devnet

# ۳. ساخت کیف پول جدید مخصوص همین کلاس
solana-keygen new --outfile owner.json --no-bip39-passphrase

# ۴. تنظیم CLI برای استفاده از این فایل
solana config set --keypair owner.json

# ۵. گرفتن SOL رایگان (2 SOL کافی است)
solana airdrop 2

# ۶. بررسی موجودی و آدرس
solana address
solana balance
```

**خروجی مورد انتظار:**
```
2 SOL
```

> [!NOTE]
> 💡 روی Devnet، SOL رایگان است! هر بار می‌توانید حداکثر 2 SOL دریافت کنید.

### ✅ آماده‌سازی کامل؟

اگر تمام موارد زیر درست هستند، آماده هستید:

- [x] WSL نصب و فعال است
- [x] Solana CLI نسخه 2.0+ دارید
- [x] spl-token نصب است
- [x] کیف پول Devnet دارید
- [x] حداقل 2 SOL موجودی دارید

---

## مرحله ۱: ساخت توکن جدید با Token-2022 CLI

> [!IMPORTANT]
> **چرا Token-2022؟**
>
> Solana دو استاندارد توکن دارد:
> - **SPL Token (قدیمی):** `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`
> - **Token-2022 (جدید):** `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`
>
> Token-2022 قابلیت‌های جدید دارد: Metadata Extensions, Transfer Fees, Interest Bearing

### گام ۱.۱: ساخت Mint Address

```bash
# ساخت توکن جدید با Token-2022
# ⚠️ نکته مهم: فلگ --enable-metadata الزامی است تا بتوانیم metadata اضافه کنیم!
spl-token create-token \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --enable-metadata \
  --decimals 9
```

**خروجی مورد انتظار:**
```
Creating token 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU

Signature: 3Zx...
```

**7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU** این آدرس توکن شماست! 🎉

### گام ۱.۲: ذخیره آدرس در متغیر

```bash
# آدرس توکن خودتان را اینجا بگذارید
export MY_TOKEN="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"

# بررسی
echo "🪙 آدرس توکن من: $MY_TOKEN"
```

### گام ۱.۳: ساخت Token Account

برای نگه‌داری توکن، نیاز به یک Account داریم:

```bash
# ساخت account
spl-token create-account $MY_TOKEN

# خروجی:
# Creating account 9yZBb4vZGQpx...
```

### گام ۱.۴: Mint کردن توکن‌ها

حالا بیایید 1,000,000 توکن بسازیم:

```bash
# mint کردن 1 میلیون توکن
spl-token mint $MY_TOKEN 1000000

# بررسی موجودی
spl-token balance $MY_TOKEN
```

**خروجی مورد انتظار:**
```
1000000
```

### گام ۱.۵: مشاهده در Explorer

```bash
# لینک Explorer
echo "🔗 مشاهده توکن در Explorer:"
echo "https://explorer.solana.com/address/$MY_TOKEN?cluster=devnet"
```

این لینک را در مرورگر باز کنید. باید توکن خود را ببینید! 🎊

---

## مرحله ۲: اضافه کردن متادیتا

الان توکن داریم، اما **بدون نام و لوگو** است. بیایید اینها را اضافه کنیم!

### گام ۲.۱: آماده کردن فایل Metadata JSON

ابتدا یک فایل JSON برای متادیتا می‌سازیم:

```bash
# ساخت فایل metadata
cat > my-token-metadata.json << 'EOF'
{
  "name": "My Demo Coin",
  "symbol": "MDC",
  "description": "توکن آموزشی ساخته شده در کارگاه سولانا",
  "image": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
  "attributes": [
    {
      "trait_type": "Created By",
      "value": "شما"
    },
    {
      "trait_type": "Workshop",
      "value": "Solana Memecoin Workshop"
    }
  ],
  "properties": {
    "files": [
      {
        "uri": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        "type": "image/png"
      }
    ]
  }
}
EOF

# بررسی
cat my-token-metadata.json
```

> [!NOTE]
> 💡 برای تولید واقعی، باید:
> 1. لوگوی خودتان را آپلود کنید (IPFS یا Arweave)
> 2. فایل JSON را آپلود کنید
> 3. URL را در دستور بعدی استفاده کنید

### گام ۲.۲: آپلود Metadata (نسخه ساده)

برای سادگی، از یک URL آماده استفاده می‌کنیم:

```bash
# اضافه کردن metadata به توکن
spl-token initialize-metadata \
  $MY_TOKEN \
  "My Demo Coin" \
  "MDC" \
  "https://raw.githubusercontent.com/SeniorAminam/Sat/main/metadata/demo.json"
```

### گام ۲.۳: بررسی نتیجه

```bash
# دوباره در Explorer ببینید
echo "🔗 https://explorer.solana.com/address/$MY_TOKEN?cluster=devnet"
```

حالا باید نام و نماد توکن را در Explorer ببینید! ✨

---

## مرحله ۳: مقایسه با پروژه SAT (معماری Anchor)

> [!IMPORTANT]
> **سوال:** چرا نمی‌توانیم با پروژه SAT کامپایل‌شده، توکن جدید بسازیم؟
>
> **پاسخ:** چون SAT از **PDA** با seed ثابت استفاده می‌کند!

### 🧠 فهم تفاوت CLI و Anchor

#### روش ۱: Token-2022 CLI (همین الان استفاده کردیم)

```
هر بار spl-token create-token اجرا می‌شود:
→ یک Mint Address تصادفی جدید ساخته می‌شود
→ می‌توانید صدها توکن مختلف بسازید
→ هر کدام آدرس جداگانه دارند
```

#### روش ۲: Anchor Program (مثل SAT)

```rust
// در programs/sat/src/lib.rs
#[account(
    init,
    seeds = [b"sat-mint"],  // ← seed ثابت!
    bump,
    // ...
)]
pub mint: Account<'info, Mint>,
```

```
با Program ID مشخص + seed ثابت:
→ همیشه همان Mint Address تولید می‌شود (PDA)
→ نمی‌توان mint دوم ساخت (AlreadyMinted error)
→ برای token جدید باید Program جدید deploy کنیم
```

### 📊 نمایش SAT در Explorer

بیایید SAT را که قبلاً deploy شده ببینیم:

```bash
# اطلاعات SAT
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 SAT Token (از قبل deploy شده)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Program ID:"
echo "GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg"
echo ""
echo "SAT Mint Address (PDA):"
echo "CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv"
echo ""
echo "Total Supply:"
echo "369,000,000 SAT"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

### 🔗 لینک‌های Explorer

```bash
echo "🔍 SAT Program:"
echo "https://explorer.solana.com/address/GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg?cluster=devnet"
echo ""
echo "🪙 SAT Mint:"
echo "https://explorer.solana.com/address/CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv?cluster=devnet"
```

### 💡 نتیجه‌گیری

| ویژگی | Token-2022 CLI | Anchor Program (SAT) |
|---|:---:|:---:|
| توکن‌های متعدد | ✅ می‌توان ساخت | ❌ فقط یک بار |
| کامپایل | ❌ نیاز ندارد | ✅ نیاز دارد |
| سرعت ساخت | ⚡ چند ثانیه | 🐌 چند دقیقه |
| کنترل بیشتر | محدود | ✅ کامل |
| امنیت خودکار | دستی | ✅ Anchor |

**استفاده عملی:**
- برای یادگیری سریع: **CLI**
- برای فهم معماری: **SAT را بخوانید**
- برای پروژه واقعی: **ترکیب هردو**

---

## مرحله ۴: قیمت‌گذاری با Raydium

> [!CAUTION]
> ⚠️ **در این کارگاه Pool واقعی نمی‌سازیم!**
>
> دلیل:
> - نیاز به SOL زیاد
> - تنظیمات پیچیده
> - هدف آموزشی است
>
> فقط **Quote می‌گیریم** تا متوجه شویم چطور کار می‌کند.

### 🌊 مفهوم Liquidity Pool

```
┌────────────────────────────────────────┐
│         LIQUIDITY POOL                 │
├────────────────────────────────────────┤
│                                        │
│   ┌─────────┐       ┌─────────┐       │
│   │   SOL   │  ⟷⟷  │  TOKEN  │       │
│   │  1000   │       │ 1000000 │       │
│   └─────────┘       └─────────┘       │
│                                        │
│   قیمت: 1 TOKEN = 0.001 SOL           │
│   فرمول: x × y = k                    │
└────────────────────────────────────────┘
```

### گام ۴.۱: آماده‌سازی

```bash
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/raydium-sdk-V2-demo

# تنظیم متغیرها
export SOLANA_RPC_URL="https://api.devnet.solana.com"
export SOLANA_KEYPAIR_PATH="$HOME/.config/solana/devnet.json"
```

### گام ۴.۲: گرفتن Quote از Pool موجود SAT

```bash
# تنظیم pool و mode
export POOL_ID="4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf"
export MODE="quote"
export INPUT_MINT="So11111111111111111111111111111111111111112"  # SOL
export INPUT_AMOUNT_UI="0.01"

# اجرا
yarn dev src/cpmm/swap.ts
```

**خروجی مورد انتظار:**
```
✅ swap quote: {
  inputMint: "So11111111111111111111111111111111111111112",
  outputMint: "CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv",
  inputAmount: "10000000",
  outputAmount: "...",
  ...
}
MODE=quote: not sending any transaction...
```

### گام ۴.۳: مشاهده Pool در Explorer

```bash
echo "🌊 SAT-SOL Pool:"
echo "https://explorer.solana.com/address/4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf?cluster=devnet"
```

### 📚 یادگیری بیشتر

برای ساخت Pool واقعی برای توکن خودتان:
- مراجعه به [docs/03-raydium-cpmm.md](docs/03-raydium-cpmm.md)
- نیاز به SOL بیشتر (حداقل 10 SOL)
- فقط برای Mainnet توصیه می‌شود

---

## مرحله ۵: نکات امنیتی و چک‌لیست نهایی

> [!WARNING]
> **قبل از انتشار روی Mainnet، حتماً این موارد را چک کنید!**

### ✅ چک‌لیست امنیتی

| # | نکته امنیتی | چک شده؟ |
|:---:|---|:---:|
| 1 | **Mint Authority** باید revoke شود | ⬜ |
| 2 | **Freeze Authority** باید revoke شود | ⬜ |
| 3 | متادیتای کامل (نام، نماد، لوگو، توضیحات) | ⬜ |
| 4 | لوگو روی IPFS/Arweave آپلود شده | ⬜ |
| 5 | Liquidity Pool ساخته شده | ⬜ |
| 6 | LP Tokens سوزانده شده (Burn) | ⬜ |
| 7 | کد قرارداد verify شده | ⬜ |
| 8 | Audit امنیتی انجام شده | ⬜ |

### 🔒 Revoke کردن Authorities

**برای Devnet (آموزشی):**
```bash
# Revoke mint authority
spl-token authorize $MY_TOKEN mint --disable

# Revoke freeze authority
spl-token authorize $MY_TOKEN freeze --disable
```

> [!CAUTION]
> ⚠️ بعد از revoke، دیگر نمی‌توانید:
> - توکن جدید بسازید (mint)
> - کیف پول کاربران را freeze کنید
>
> **این عمل برگشت‌ناپذیر است!**

### 🛡️ ابزارهای بررسی امنیت

برای Mainnet، از این ابزارها استفاده کنید:

- **[Solsniffer](https://solsniffer.com/)** - امتیاز امنیتی (هدف: 96+)
- **[RugCheck](https://rugcheck.xyz/)** - بررسی rug pull
- **[Solana Explorer](https://explorer.solana.com/)** - مشاهده authorities

---

## مرحله ۶: تمرین و سوالات

### 🎯 تمرین عملی

حالا نوبت شماست! سعی کنید:

1. **توکن دوم بسازید:**
   ```bash
   # یک توکن جدید با نام و نماد متفاوت (--enable-metadata الزامی است!)
   spl-token create-token \
     --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
     --enable-metadata \
     --decimals 9
   ```

2. **متادیتای سفارشی اضافه کنید:**
   - نام و نماد خودتان را بگذارید
   - از لوگوی دلخواه استفاده کنید

3. **Authority ها را revoke کنید:**
   - Mint authority
   - Freeze authority

### ❓ سوالات متداول

<details>
<summary><strong>چرا توکن من در کیف پول ظاهر نمی‌شود؟</strong></summary>

باید metadata را اضافه کنید تا کیف پول‌ها توکن را تشخیص دهند.
</details>

<details>
<summary><strong>تفاوت Devnet و Mainnet چیست؟</strong></summary>

- **Devnet:** شبکه تست - SOL رایگان - برای آموزش
- **Mainnet:** شبکه واقعی - SOL واقعی - برای تولید
</details>

<details>
<summary><strong>چطور توکنم را به Mainnet منتقل کنم؟</strong></summary>

نمی‌توانید! باید روی Mainnet از ابتدا بسازید. Devnet فقط برای تست است.
</details>

---

## 🏆 تبریک! کارگاه تمام شد

شما موفق شدید:

- ✅ یک میم کوین روی Solana بسازید
- ✅ متادیتا اضافه کنید
- ✅ تفاوت CLI و Anchor را بفهمید
- ✅ مفهوم Liquidity Pool را یاد بگیرید
- ✅ نکات امنیتی را رعایت کنید

---

## 📚 منابع بیشتر

### مستندات این پروژه

| فایل | توضیح |
|---|---|
| [PRESENTATION_WALKTHROUGH.md](PRESENTATION_WALKTHROUGH.md) | اسکریپت کامل ارائه |
| [docs/01-token-2022-cli.md](docs/01-token-2022-cli.md) | راهنمای جامع CLI |
| [docs/02-anchor-sat.md](docs/02-anchor-sat.md) | راهنمای Anchor و SAT |
| [docs/03-raydium-cpmm.md](docs/03-raydium-cpmm.md) | راهنمای Raydium Pool |
| [docs/04-troubleshooting.md](docs/04-troubleshooting.md) | حل مشکلات رایج |

### لینک‌های خارجی

| منبع | آدرس |
|---|---|
| 📖 Solana Docs | https://solana.com/docs |
| ⚓ Anchor Book | https://book.anchor-lang.com |
| 🪙 SPL Token-2022 | https://spl.solana.com/token-2022 |
| 🔍 Solana Explorer | https://explorer.solana.com |
| 🌊 Raydium Docs | https://docs.raydium.io |

---

<div align="center">

### 💬 سوال یا مشکلی دارید؟

[![Email](https://img.shields.io/badge/📧_Email-Contact_Me-EA4335?style=for-the-badge)](mailto:contact@senioramin.com)
[![Telegram](https://img.shields.io/badge/💬_Telegram-@SeniorAmin-26A5E4?style=for-the-badge)](https://t.me/SeniorAmin)
[![GitHub](https://img.shields.io/badge/💻_GitHub-SeniorAminam-181717?style=for-the-badge)](https://github.com/SeniorAminam)

---

**Built with ❤️ by [Amin Davodian](https://senioramin.com)**

<img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" width="60" alt="Solana"/>

</div>
