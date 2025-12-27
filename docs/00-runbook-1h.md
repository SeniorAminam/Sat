<!--
Project: Solana Token Workshop (SAT)
File: docs/00-runbook-1h.md
Author: Amin Davodian (Mohammadamin Davodian)
Website: https://senioramin.com
LinkedIn: https://linkedin.com/in/SudoAmin
GitHub: https://github.com/SeniorAminam
Created: 2025-12-27

Purpose: Time-boxed 1-hour runbook for a class session with commands and a pre-class checklist.
Developed by Amin Davodian
-->

<div align="center">

# 🗓️ Runbook ارائه ۱ ساعته

### ⏱️ زمان‌بندی حرفه‌ای برای کارگاه عملی

<img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" width="80" alt="Solana"/>

---

**ارائه‌دهنده:** [امین داوودیان](https://senioramin.com) | [@SeniorAminam](https://github.com/SeniorAminam)

</div>

---

## 🎯 هدف جلسه

در ۶۰ دقیقه، **دو روش** ساخت توکن روی Solana Devnet اجرا می‌شود:

<div align="center">

| روش | نوع | زمان | ریسک |
|:---:|---|:---:|:---:|
| ⚡ **Token-2022 CLI** | سریع و کم‌ریسک | ~15 دقیقه | 🟢 کم |
| 🧱 **Anchor Program** | حرفه‌ای و واقعی | ~20 دقیقه | 🟡 متوسط |
| 💰 **Raydium CPMM** | اختیاری/نمایشی | ~10 دقیقه | 🟢 کم |

</div>

> [!IMPORTANT]
> ⚠️ روی Windows، تمام دستورات **داخل WSL** اجرا می‌شوند!

---

## ⏱️ Timeline

```
┌──────────────────────────────────────────────────────────────────┐
│                      60 MINUTES TIMELINE                          │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  0min           5            30           50          60          │
│    │            │             │            │           │          │
│    ▼            ▼             ▼            ▼           ▼          │
│  ┌────┐    ┌──────────┐  ┌──────────┐  ┌────────┐  ┌──────┐      │
│  │مقدمه│    │Token-2022│  │  Anchor  │  │Raydium │  │پایان │      │
│  │ 5m │    │   25m    │  │   20m    │  │  10m   │  │ 0m   │      │
│  └────┘    └──────────┘  └──────────┘  └────────┘  └──────┘      │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## ✅ چک‌لیست قبل از کلاس

### 🌐 اینترنت + Explorer

- [ ] Explorer Devnet باز باشد: [explorer.solana.com](https://explorer.solana.com/?cluster=devnet)
- [ ] اتصال اینترنت پایدار

### 🛠️ WSL و ابزارها

```bash
# چک نسخه‌ها (داخل WSL)
solana --version    # >= 2.x
anchor --version    # >= 0.32
rustc --version     # >= 1.89
node --version      # >= 20
yarn --version      # >= 1.22
spl-token --version # >= 4.x
```

### 📦 نصب سریع (اگر نیاز بود)

```bash
# نصب رسمی Solana
curl --proto '=https' --tlsv1.2 -sSfL https://solana-install.solana.workers.dev | bash

# چک نهایی
rustc --version && solana --version && anchor --version && node --version && yarn --version
```

### 💰 Wallet + Devnet SOL

```bash
# تنظیم Devnet
solana config set --url devnet
solana config set --keypair ~/.config/solana/devnet.json

# چک و airdrop
solana address
solana airdrop 2
solana balance  # باید >= 2 SOL باشد
```

**اگر keypair موجود نبود:**

```bash
solana-keygen new --outfile ~/.config/solana/devnet.json
solana config set --keypair ~/.config/solana/devnet.json
solana airdrop 2
```

### 🔥 Warm-up (قبل از کلاس!)

> [!CAUTION]
> **قانون طلایی:** نصب/دانلود وسط کلاس ممنوع!

```bash
# SAT project
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/sat
anchor build    # بار اول: 3-10 دقیقه
yarn install

# Raydium scripts
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/raydium-sdk-V2-demo
yarn install
```

---

## 🎯 استراتژی No-Compile

> [!TIP]
> 📖 برای جلوگیری از درگیری با کامپایل: [راهنمای کامل No-Compile](07-no-compile-class-guide.md)

| مرحله | ابزار | کلاس؟ |
|---|---|:---:|
| ساخت توکن جدید | Token-2022 CLI | ✅ |
| نمایش معماری | SAT (کامپایل شده) | ✅ |
| Quote گرفتن | Raydium | ✅ |
| Build/Deploy | Anchor | ❌ |

---

## 📋 سناریو اجرا (۶۰ دقیقه)

### ⏰ دقیقه 0-5: مقدمه سریع

```
┌────────────────────────────────────────┐
│  📚 مقدمه (5 دقیقه)                   │
├────────────────────────────────────────┤
│  • سولانا چیست؟ (Account model)       │
│  • SPL Token چیست؟                    │
│  • تفاوت Token Program و Token-2022   │
└────────────────────────────────────────┘
```

---

### ⏰ دقیقه 5-30: Token-2022 CLI

**راهنما:** [01-token-2022-cli.md](01-token-2022-cli.md)

<div align="center">

| خروجی | زمان |
|---|:---:|
| 🪙 ساخت Mint | ~30s |
| 🏦 ساخت Account | ~15s |
| 💰 Mint Supply | ~15s |
| 🖼️ Metadata | ~30s |
| 🔗 Explorer | ~10s |

</div>

> [!NOTE]
> اگر metadata (CID) آماده نیست، این مرحله skip می‌شود.

---

### ⏰ دقیقه 30-50: Anchor SAT

**راهنما:** [02-anchor-sat.md](02-anchor-sat.md)

```
┌────────────────────────────────────────┐
│  🧱 Anchor (20 دقیقه)                 │
├────────────────────────────────────────┤
│  • PDA چیست و چرا؟                    │
│  • Authority Revoke = امنیت           │
│  • anchor test (idempotent)           │
│  • نمایش Explorer                     │
└────────────────────────────────────────┘
```

> [!CAUTION]
> ❌ `anchor deploy` در کلاس انجام **نمی‌شود**!  
> ✅ فقط `anchor test --skip-local-validator`

---

### ⏰ دقیقه 50-60: Raydium CPMM

**راهنما:** [03-raydium-cpmm.md](03-raydium-cpmm.md)

```
┌────────────────────────────────────────┐
│  💰 Raydium (10 دقیقه)                │
├────────────────────────────────────────┤
│  • فقط Quote (بدون tx)                │
│  • نمایش Pool در Explorer             │
│  • توضیح x × y = k                    │
└────────────────────────────────────────┘
```

> [!WARNING]
> ❌ `MODE=swap` اجرا **نمی‌شود**!  
> ❌ ساخت Pool جدید **نمی‌شود**!

---

## 📌 قواعد اجرای کلاس

<div align="center">

| قاعده | توضیح |
|---|---|
| 🖥️ **WSL** | همه دستورات داخل WSL |
| 💰 **Balance** | قبل از هر دموی سنگین چک شود |
| 🚫 **No Pool** | از ساخت Pool جدید خودداری |
| ✅ **Confirm** | بعد از هر دستور، خروجی چک شود |

</div>

---

## 🛟 Plan B (اگر مشکلی پیش آمد)

**اگر Devnet/RPC اذیت کرد:**

- کلاس متوقف **نمی‌شود**!
- سریع به "نمایش Explorer + توضیح معماری" منتقل می‌شویم

```bash
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Program:"
echo "https://explorer.solana.com/address/GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg?cluster=devnet"
echo ""
echo "🪙 SAT Mint:"
echo "https://explorer.solana.com/address/CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv?cluster=devnet"
echo ""
echo "🌊 Raydium Pool:"
echo "https://explorer.solana.com/address/4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf?cluster=devnet"
echo ""
echo "📝 Create Pool TX:"
echo "https://explorer.solana.com/tx/2UL7qT9nH8Ch9G2WQCFMH86KvpjJyzAF6Amfj5bF4oBLv1RBUBbETnGrXzq3fCQiKtfUh6UtyB8LGTEY1zGBFJF7?cluster=devnet"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

---

## ✅ پایان (جمع‌بندی ۳۰ ثانیه‌ای)

```
┌──────────────────────────────────────────────────────────────────┐
│                         خلاصه جلسه                               │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ⚡ Token-2022: سریع، ساده، مناسب MVP و Demo                    │
│                                                                   │
│  🧱 Anchor: قابل اعتمادتر، مناسب پروژه واقعی                    │
│     (اما زمان کامپایل و پیچیدگی بیشتر)                          │
│                                                                   │
│  💰 Raydium: ورود توکن به DeFi                                   │
│     (در کلاس فقط Quote گرفتیم)                                   │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

<div align="center">

**📚 مستندات تکمیلی:**

[⚡ Token-2022](01-token-2022-cli.md) | [🧱 Anchor](02-anchor-sat.md) | [💰 Raydium](03-raydium-cpmm.md) | [🔧 Troubleshooting](04-troubleshooting.md)

---

**[← فهرست مستندات](index.md)** | **[اسکریپت ارائه →](../PRESENTATION_WALKTHROUGH.md)**

---

**Built with ❤️ by [Amin Davodian](https://senioramin.com)**

</div>
