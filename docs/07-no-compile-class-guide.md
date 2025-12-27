<!--
Project: Solana Token Workshop (SAT)
File: docs/07-no-compile-class-guide.md
Author: Amin Davodian (Mohammadamin Davodian)
Website: https://senioramin.com
LinkedIn: https://linkedin.com/in/SudoAmin
GitHub: https://github.com/SeniorAmin
am
Created: 2025-12-27

Purpose: Complete guide for using pre-compiled projects in class without recompilation delays.
Developed by Amin Davodian
-->

<div align="center">

# 🎯 راهنمای کلاس بدون کامپایل

### ⚡ استفاده از پروژه کامپایل شده + ساخت توکن جدید

</div>

---

## 🧠 درک استراتژی

> [!IMPORTANT]
> **سوال:** آیا می‌توانیم از همین پروژه SAT که کامپایل شده، توکن جدید بسازیم؟
>
> **پاسخ کوتاه:** **نه با همان program ID، اما بله با Token-2022 CLI!**

---

## 📊 دو مسیر متفاوت

```
┌─────────────────────────────────────────────────────────────────────┐
│                    استراتژی No-Compile                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  🎯 هدف: توکن جدید در کلاس بدون انتظار کامپایل                    │
│                                                                      │
│  ┌────────────────────────┐       ┌────────────────────────┐        │
│  │    Token-2022 CLI      │       │    Anchor SAT (مسیر    │       │
│  │   (برای توکن جدید)     │       │     آماده)            │        │
│  ├────────────────────────┤       ├────────────────────────┤        │
│  │                        │       │                        │        │
│  │ ✅ توکن جدید           │       │ ✅ Program کامپایل شده│        │
│  │ ✅ Metadata دلخواه      │       │ ✅ Explorer نمایش      │        │
│  │ ✅ بدون کامپایل         │       │ ✅ توضیح معماری       │        │
│  │ ✅ سریع (1-2 دقیقه)    │       │ ✅ نمایش PDA/Authority│        │
│  │ ✅ مناسب Demo          │       │ ✅ بدون deploy جدید   │        │
│  │                        │       │                        │        │
│  └────────────────────────┘       └────────────────────────┘        │
│           ↓                                  ↓                       │
│    برای ساخت واقعی              برای درک معماری                     │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ❓ چرا نمی‌توانیم با SAT توکن جدید بسازیم؟

### 🔍 نگاهی به کد SAT

```rust
// در programs/sat/src/lib.rs

#[account(
    init,
    payer = payer,
    seeds = [b"sat-mint"],  // ← seed ثابت!
    bump,
    // ...
)]
pub mint: Account<'info, Mint>,
```

**مشکل:**
- Mint به صورت PDA با seed **ثابت** (`sat-mint`) ساخته می‌شود
- PDA = همیشه همان آدرس با همان program ID
- نمی‌توان با همین brنامه mint جدید ساخت!

**راه‌حل:**
- برای توکن جدید: **Token-2022 CLI** ✅
- برای نمایش معماری Anchor: **از SAT آماده استفاده** ✅

---

## 🚀 مسیر پیشنهادی برای کلاس

### 📅 زمان‌بندی (۶۰ دقیقه)

| دقیقه | بخش | ابزار | زمان نیاز |
|:---:|---|---|:---:|
| 0-5 | مقدمه | Slides | - |
| 5-20 | **توکن جدید واقعی** | Token-2022 CLI | ~2 دقیقه |
| 20-40 | **معماری Anchor** | SAT (کامپایل شده) | ~30 ثانیه |
| 40-55 | **Raydium Pool** | Quote فقط | ~1 دقیقه |
| 55-60 | جمع‌بندی | - | - |

---

## ⚡ بخش ۱: ساخت توکن جدید (Token-2022 CLI)

> [!TIP]
> این بخش **کاملاً واقعی** است و یک توکن جدید می‌سازد!

### ✅ Preflight

```bash
# داخل WSL
solana config set --url devnet
solana config set --keypair ~/.config/solana/devnet.json
solana balance
```

### 🪙 ساخت Mint

```bash
# ساخت توکن جدید با Token-2022
spl-token create-token \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --enable-metadata \
  --decimals 9

# خروجی:
# Creating token 7xKXtg...
# Address: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU

# ذخیره در متغیر
export NEW_MINT="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
```

### 🏦 ساخت Account + Mint Supply

```bash
# ساخت token account
spl-token create-account $NEW_MINT

# mint کردن 1 میلیون توکن
spl-token mint $NEW_MINT 1000000

# بررسی
spl-token balance $NEW_MINT
```

### 🖼️ اضافه کردن Metadata

```bash
# استفاده از URL آماده (GitHub)
spl-token initialize-metadata \
  $NEW_MINT \
  "Class Demo Token" \
  "DEMO" \
  "https://raw.githubusercontent.com/SeniorAminam/Sat/main/metadata/demo.json"
```

### 🔗 نمایش در Explorer

```bash
echo "🔗 https://explorer.solana.com/address/$NEW_MINT?cluster=devnet"
```

**زمان مالتعدد واقعی:** حدود **2 دقیقه** ⚡

---

## 🧱 بخش ۲: معماری Anchor (از SAT آماده)

> [!NOTE]
> در این بخش دیگر کامپایل نمی‌کنیم! فقط نمایش + توضیح

### 🎯 هدف این بخش

**نشان دادن:**
- PDA چیست و چرا استفاده می‌شود
- Authority Revoke چیست
- تفاوت Anchor با CLI

### ✅ Preflight

```bash
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/sat

export ANCHOR_PROVIDER_URL="https://api.devnet.solana.com"
export ANCHOR_WALLET="$HOME/.config/solana/devnet.json"

echo "✅ محیط Anchor آماده است"
```

### 📊 نمایش اطلاعات Deploy شده

```bash
# اطلاعات واقعی از SAT_DEVNET_INFO.txt
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 SAT Program (Deploy شده)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Program ID:"
echo "GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg"
echo ""
echo "SAT Mint PDA:"
echo "CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv"
echo ""
echo "Total Supply:"
echo "369,000,000 SAT"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

### 🔗 Link های Explorer

```bash
# Program
echo "🔍 Program:"
echo "https://explorer.solana.com/address/GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg?cluster=devnet"

# Mint
echo ""
echo "🪙 SAT Mint:"
echo "https://explorer.solana.com/address/CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv?cluster=devnet"
```

### 📝 توضیح کد (بدون اجرا)

```bash
# نمایش کد مهم
cat programs/sat/src/lib.rs
```

**نکات برای توضیح:**
- ✅ PDA با seed `sat-mint`
- ✅ Authority revoke شده
- ✅ Idempotent (قابل تکرار)
- ✅ امنیت خودکار Anchor

### 🧪 اجرای Test (اختیاری — فقط اگر زمان داریم)

```bash
# تست idempotent است — اگر قبلاً اجرا شده، skip می‌کند
anchor test --skip-local-validator
```

**زمان واقعی:** ~30 ثانیه (فقط نمایش) یا ~2 دقیقه (با test)

---

## 💰 بخش ۳: Raydium CPMM (فقط Quote)

> [!CAUTION]
> در کلاس swap/pool ساخته نمی‌شود! فقط quote می‌گیریم.

### ✅ Preflight

```bash
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/raydium-sdk-V2-demo

export SOLANA_KEYPAIR_PATH="$HOME/.config/solana/devnet.json"
export SOLANA_RPC_URL="https://api.devnet.solana.com"
```

### 🧮 گرفتن Quote

```bash
export POOL_ID="4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf"
export MODE="quote"
export INPUT_MINT="So11111111111111111111111111111111111111112"
export INPUT_AMOUNT_UI="0.01"

yarn dev src/cpmm/swap.ts
```

**خروجی مورد انتظار:**
```
✅ swap quote: { ... }
MODE=quote: not sending any transaction...
```

### 🔗 نمایش Pool در Explorer

```bash
echo "🌊 Pool:"
echo "https://explorer.solana.com/address/4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf?cluster=devnet"
```

**زمان واقعی:** ~1 دقیقه

---

## 📋 چک‌لیست قبل از کلاس

### ✅ نصب و Warm-up

```bash
# داخل WSL

# 1. چک نسخه‌ها
solana --version
anchor --version
spl-token --version

# 2. چک wallet + SOL
solana config set --url devnet
solana balance  # >= 2 SOL

# 3. Warm-up SAT (یک بار!)
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/sat
anchor build        # بار اول: 3-10 دقیقه
yarn install

# 4. Warm-up Raydium (یک بار!)
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/raydium-sdk-V2-demo
yarn install
```

### ✅ تست قبل از کلاس

```bash
# تست Token-2022 (کامل)
spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb

# تست SAT (Explorer فقط)
cd sat
echo "https://explorer.solana.com/address/GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg?cluster=devnet"

# تست Raydium (Quote فقط)
cd raydium-sdk-V2-demo
export MODE="quote"
yarn dev src/cpmm/swap.ts
```

---

## 🛟 Plan B (اگر مشکلی پیش آمد)

### Scenario 1: Airdrop کار نمی‌کند

```bash
# Plan B:
# - از قبل 5 SOL airdrop کرده‌ایم
# - یا از فایل‌های آماده استفاده می‌کنیم
```

### Scenario 2: RPC کند است

```bash
# Plan B:
# - سریع به Explorer links می‌رویم
# - فقط توضیح می‌دهیم، دستور اجرا نمی‌کنیم
```

### Scenario 3: همه‌چیز خراب شد 😅

```bash
# Ultimate Plan B:
# فقط Explorer links + توضیح معماری + Slides

echo "Program: https://explorer.solana.com/address/GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg?cluster=devnet"
echo "SAT Mint: https://explorer.solana.com/address/CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv?cluster=devnet"
echo "Pool: https://explorer.solana.com/address/4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf?cluster=devnet"
```

---

## 💡 نکات کلیدی

### ✅ چیزهایی که انجام می‌دهیم

| ردیف | کار | ابزار | زمان |
|:---:|---|---|:---:|
| 1 | ساخت توکن جدید | Token-2022 CLI | ~2 دقیقه |
| 2 | نمایش معماری | SAT Explorer | ~30 ثانیه |
| 3 | Quote گرفتن | Raydium | ~1 دقیقه |

### ❌ چیزهایی که انجام **نمی‌دهیم**

- ❌ کامپایل کردن Anchor در کلاس
- ❌ Deploy کردن برنامه جدید
- ❌ ساخت Pool جدید
- ❌ Swap واقعی

---

## 🎯 خلاصه استراتژی

```
┌──────────────────────────────────────────────────────────┐
│           استراتژی No-Compile برای کلاس                  │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  🎬 بخش 1: Token-2022 CLI                               │
│     → توکن جدید واقعی می‌سازیم                           │
│     → Metadata اضافه می‌کنیم                             │
│     → Explorer نمایش می‌دهیم                             │
│                                                           │
│  🏗️ بخش 2: Anchor SAT                                   │
│     → از پروژه کامپایل شده استفاده می‌کنیم               │
│     → معماری PDA را توضیح می‌دهیم                        │
│     → Authority revoke را نمایش می‌دهیم                  │
│                                                           │
│  💰 بخش 3: Raydium                                       │
│     → فقط Quote می‌گیریم (بدون tx)                       │
│     → Pool آماده را نمایش می‌دهیم                        │
│                                                           │
│  ⏱️ زمان کل واقعی: ~5 دقیقه اجرا + توضیحات             │
│  ✅ ریسک: نزدیک صفر!                                     │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

---

<div align="center">

### ✨ نتیجه‌گیری

**با این استراتژی:**
- ✅ توکن جدید واقعی می‌سازیم (Token-2022)
- ✅ معماری حرفه‌ای نمایش می‌دهیم (Anchor SAT)
- ✅ DeFi را معرفی می‌کنیم (Raydium)
- ✅ **بدون انتظار برای کامپایل!** ⚡

---

**[← بازگشت به Runbook](00-runbook-1h.md)** | **[مستندات  →](index.md)**

---

**Built with ❤️ by [Amin Davodian](https://senioramin.com)**

</div>
