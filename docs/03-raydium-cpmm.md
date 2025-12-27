<!--
Project: Solana Token Workshop (SAT)
File: docs/03-raydium-cpmm.md
Author: Amin Davodian (Mohammadamin Davodian)
Website: https://senioramin.com
LinkedIn: https://linkedin.com/in/SudoAmin
GitHub: https://github.com/SeniorAminam
Created: 2025-12-27

Purpose: Raydium CPMM devnet walkthrough using the existing pool; includes real issues encountered and the RPC-only fixes.
Developed by Amin Davodian
-->

# 🧪 Raydium CPMM (Devnet) — تجربه واقعی پروژه

این بخش «advanced» است و در انتهای جلسه مطرح می‌شود.

**ارائه‌دهنده:** Amin Davodian (SeniorAmin)

- Website: https://senioramin.com
- GitHub: https://github.com/SeniorAminam

هدف: بعد از ساخت توکن، ورود آن به اکوسیستم DeFi نمایش داده می‌شود (Pool/Swap).

> قید اجرایی: **فقط quote گرفته می‌شود** (بدون ارسال تراکنش).

---

## 1) 🧾 اطلاعات Pool واقعی (Devnet)

طبق `sat/SAT_DEVNET_INFO.txt`:

- Pool ID:
  - `4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf`
- Create pool tx:
  - `2UL7qT9nH8Ch9G2WQCFMH86KvpjJyzAF6Amfj5bF4oBLv1RBUBbETnGrXzq3fCQiKtfUh6UtyB8LGTEY1zGBFJF7`
- Pair:
  - WSOL / SAT

Explorer:

```bash
echo "https://explorer.solana.com/address/4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf?cluster=devnet"
```

**قید اجرایی**

- از ساخت pool جدید در کلاس خودداری می‌شود.
- فقط quote گرفته می‌شود (بدون ارسال تراکنش).

---

## 2) 📁 رفتن به پروژه Raydium

در WSL:

```bash
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/raydium-sdk-V2-demo
```

### 2.1) ✅ Preflight (Copy/Paste)

چون `src/config.ts` از فایل keypair و RPC می‌خواند، این بلاک اجرا می‌شود تا محیط دقیقاً همان چیزی باشد که اسکریپت انتظار دارد:

```bash
export SOLANA_KEYPAIR_PATH="$HOME/.config/solana/devnet.json"
export SOLANA_RPC_URL="https://api.devnet.solana.com"
test -f "$SOLANA_KEYPAIR_PATH" && echo "OK: keypair exists" || echo "MISSING: keypair"
echo "SOLANA_KEYPAIR_PATH=$SOLANA_KEYPAIR_PATH"
echo "SOLANA_RPC_URL=$SOLANA_RPC_URL"
```

**خروجی مورد انتظار**

- پیام `OK: keypair exists` باید مشاهده شود.

(اگر در کلاس نصب انجام شده باشد، این مرحله سریع است)

```bash
yarn install
```

**قانون طلایی برای کلاس**

- `yarn install` قبل از کلاس انجام می‌شود.
- در کلاس فقط `yarn dev ...` اجرا می‌شود.

---

## 3) 🧮 Quote گرفتن (بدون ارسال تراکنش)

این اسکریپت در پروژه وجود دارد:

- `src/cpmm/swap.ts`

پیش‌فرض‌ها:

- pool id همان pool ساخته‌شده است.
- `MODE=quote` یعنی **تراکنش ارسال نمی‌کند**.

### مثال: quote گرفتن برای مقدار کوچک

```bash
export POOL_ID="4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf"
export MODE="quote"
export INPUT_MINT="So11111111111111111111111111111111111111112"
export INPUT_AMOUNT_UI="0.01"
yarn dev src/cpmm/swap.ts
```

**خروجی مورد انتظار**

- در ابتدای اجرا معمولاً لاگ‌هایی شبیه این مشاهده می‌شود:
  - `connect to rpc ... in devnet`
  - `using keypair file ...`
- سپس:
  - `swap quote` (یک آبجکت با عددها)
  - `MODE=quote: not sending any transaction...`

با مشاهده این خروجی‌ها، دمو موفق است و هیچ tx ارسال نشده.

---

## 4) 🧯 مشکلات واقعی که داشتیم (و راه‌حل‌ها)

### 4.1) مشکل Cloudflare 403 از Raydium API

- روی devnet بعضی endpoint ها 403 می‌دهند.
- راه‌حل اجرایی: به جای API، از **RPC-only** استفاده شد.

نمونه‌ها:

- `src/cpmm/createSatCpmmPool.ts`:
  - config با `CpmmConfigInfoLayout` از RPC خوانده شد و وابستگی به API کم شد.

### 4.2) باگ رایج decimals در تبدیل مقدار UI

- مشکل: بعضی اسکریپت‌ها مقدار UI را با `1e9` ثابت تبدیل می‌کنند.
- راه‌حل: در `src/cpmm/swap.ts` تبدیل با decimals واقعی mint انجام شد (`decimal.js`).

---

## 4.3) 🛟 Plan B (اگر حتی quote هم به مشکل خورد)

اگر به هر دلیل RPC کند بود یا fetch pool fail شد:

- کلاس متوقف نمی‌شود.
- فقط لینک Explorer pool و tx ایجاد pool نمایش داده می‌شود.

```bash
echo "Pool: https://explorer.solana.com/address/4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf?cluster=devnet"
echo "Create Tx: https://explorer.solana.com/tx/2UL7qT9nH8Ch9G2WQCFMH86KvpjJyzAF6Amfj5bF4oBLv1RBUBbETnGrXzq3fCQiKtfUh6UtyB8LGTEY1zGBFJF7?cluster=devnet"
```

## 5) 🏊 ساخت Pool جدید (در کلاس توصیه نمی‌شود)

ساخت Pool روی devnet:

- به SOL بیشتری نیاز دارد.
- ممکن است به خاطر congestion یا config index یا محدودیت RPC گیر کند.

برای تمرین خارج از کلاس:

```bash
yarn dev src/cpmm/createSatCpmmPool.ts
```

اگر خطای «عدم یافتن config» مشاهده شد:

```bash
CPMM_CONFIG_INDEX=0 yarn dev src/cpmm/createSatCpmmPool.ts
```
