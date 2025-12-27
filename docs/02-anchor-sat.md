<!--
Project: Solana Token Workshop (SAT)
File: docs/02-anchor-sat.md
Author: Amin Davodian (Mohammadamin Davodian)
Website: https://senioramin.com
LinkedIn: https://linkedin.com/in/SudoAmin
GitHub: https://github.com/SeniorAminam
Created: 2025-12-27

Purpose: Walkthrough of the SAT Anchor project: PDA mint creation, minting supply, and revoking authorities; includes real devnet IDs.
Developed by Amin Davodian
-->

<div align="center">

# 🧱 روش ۲: ساخت توکن با Anchor Program

### 💎 حرفه‌ای، امن، قابل کنترل

<img src="https://raw.githubusercontent.com/coral-xyz/anchor/master/assets/icon.png" width="100" alt="Anchor"/>

---

**ارائه‌دهنده:** [امین داوودیان](https://senioramin.com) | [@SeniorAminam](https://github.com/SeniorAminam)

</div>

---

## 🎯 هدف این بخش

<div align="center">

| ویژگی | توضیح | مزیت |
|:---:|---|---|
| 🔐 **PDA Mint** | آدرس قطعی و deterministic | امنیت بالا |
| 💰 **Controlled Minting** | فقط یک بار mint | جلوگیری از تقلب |
| 🔒 **Authority Revoke** | قفل کامل authorities | غیرقابل تغییر |
| 🧪 **Testable** | تست خودکار با Mocha | قابل اطمینان |

</div>

> [!IMPORTANT]
> این برنامه mint را با seed ثابت (`sat-mint`) می‌سازد. بعد از mint اولیه، authorityها را `None` می‌کند.  
> **نتیجه:** نمی‌توان با همین program، mint جدید ساخت یا supply اضافه کرد!

---

## 💡 چرا Anchor؟

```
┌──────────────────────────────────────────────────────────┐
│              Raw Solana vs Anchor Framework              │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  🔴 Rust خام                   🟢 Anchor Framework       │
│                                                           │
│  • 500+ خطکد                   • 100 خط کد ✅           │
│  • Validation دستی             • Validation خودکار ✅     │
│  • امنیت دستی                  • امنیت built-in ✅       │
│  • تست سخت                     • تست آسان با Mocha ✅    │
│  • بدون IDL                    • IDL خودکار ✅           │
│  • یادگیری سخت                 • یادگیری متوسط ✅        │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

---

## 📊 اطلاعات واقعی پروژه (Devnet)

> [!NOTE]
> این اطلاعات از `sat/SAT_DEVNET_INFO.txt` گرفته شده‌اند.

<div align="center">

| مورد | مقدار |
|---|---|
| 👤 **Wallet** | `9HHDK9zwk3GLzFk2TZKeLifVAngpWMiWWUHLLm3Jwvs3` |
| 📦 **Program ID** | `GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg` |
| 🪙 **SAT Mint PDA** | `CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv` |
| 💰 **Total Supply** | `369,000,000 SAT` (decimals=9) |

[![View Program](https://img.shields.io/badge/🔍_View_Program_on_Explorer-14F195?style=for-the-badge&logo=solana&logoColor=white)](https://explorer.solana.com/address/GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg?cluster=devnet)

</div>

---

## 🛠️ پیش‌نیازها

### ✅ چک‌لیست محیط

```bash
# داخل WSL
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/sat
```

> [!IMPORTANT]
> ⚠️ تمام دستور Anchor/Rust باید **داخل WSL** اجرا شوند!

---

## 📋 مراحل نمایش (بدون کامپایل)

### 🔧 مرحله ۱: تنظیم Preflight

```bash
# تنظیم Devnet
solana config set --url devnet
solana config set --keypair ~/.config/solana/devnet.json

# بررسی تنظیمات
solana config get
solana address
solana balance

# متغیرهای Anchor
export ANCHOR_PROVIDER_URL="https://api.devnet.solana.com"
export ANCHOR_WALLET="$HOME/.config/solana/devnet.json"

echo "ANCHOR_PROVIDER_URL=$ANCHOR_PROVIDER_URL"
echo "ANCHOR_WALLET=$ANCHOR_WALLET"

test -f "$ANCHOR_WALLET" && echo "✅ OK: anchor wallet exists" || echo "❌ MISSING: anchor wallet"
```

**خروجی مورد انتظار:**

<div align="center">

| چک | وضعیت مورد انتظار |
|---|---|
| `solana balance` | >= 1 SOL |
| `anchor wallet exists` | ✅ OK |
| `RPC URL` | devnet |

</div>

---

### 📦 مرحله ۲: نصب وابستگی‌ها (یک بار)

> [!TIP]
> این مرحله **قبل از کلاس** انجام شود!

```bash
yarn install
```

---

### 🏗️ مرحله ۳: Build (اختیاری — قبل از کلاس)

```bash
anchor build
```

**زمان:**
- بار اول: 3-10 دقیقه
- بار دوم: 30-90 ثانیه

> [!CAUTION]
> در کلاس **build نکنید**! از پروژه کامپایل شده استفاده کنید.

---

### 🚀 مرحله ۴: Deploy (نمایشی — نه در کلاس!)

```bash
anchor deploy
```

**خروجی:**

```
Program Id: GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg
```

> [!NOTE]
> 💡 در کلاس، program از قبل deploy شده است. فقط Explorer نمایش می‌دهیم.

### 🔗 نمایش در Explorer

```bash
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Program on Explorer:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "https://explorer.solana.com/address/GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg?cluster=devnet"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

---

### 🧪 مرحله ۵: اجرای Test (کم‌ریسک)

```bash
anchor test --skip-local-validator
```

**این تست چه کارهایی انجام می‌دهد؟**

```
┌─────────────────────────────────────────────────────────┐
│                 Anchor Test Workflow                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1️⃣  بررسی: آیا mint PDA از قبل وجود دارد؟             │
│      └─ بله → Skip (idempotent)                        │
│      └─ خیر → ادامه ⬇️                                  │
│                                                          │
│  2️⃣  ساخت mint PDA با seed "sat-mint"                  │
│                                                          │
│  3️⃣  mint کردن total supply (369M tokens)              │
│                                                          │
│  4️⃣  Revoke کردن mint authority → None 🔒              │
│                                                          │
│  5️⃣  Revoke کردن freeze authority → None 🔒            │
│                                                          │
│  ✅  نتیجه: توکن immutable و safe                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**خروجی مورد انتظار:**

```
SAT Token Test
  ✓ Create and Mint SAT Tokens (2134ms)

1 passing (2s)
```

---

## 🔒 نکته امنیتی مهم: Authority Revoke

```rust
// از programs/sat/src/lib.rs

// بعد از mint:
token::set_authority(
    // ...
    AuthorityType::MintTokens,
    None,  // ← دیگر هیچ‌کس نمی‌تواند mint کند!
)?;

token::set_authority(
    // ...
    AuthorityType::FreezeAccount,
    None,  // ← دیگر هیچ‌کس نمی‌تواند freeze کند!
)?;
```

### ✅ مزایا

<div align="center">

| مزیت | توضیح |
|---|---|
| 🛡️ **امنیت** | جلوگیری از supply inflation |
| 🔒 **اعتماد** | ثابت است که supply تغییر نمی‌کند |
| ⚖️ **عدالت** | کسی نمی‌تواند freeze کند |

</div>

### ⚠️ محدودیت‌ها

> [!WARNING]
> **تجربه واقعی پروژه:**  
> چون mint authority revoke شد، برخی کارهای بعدی (مثل افزودن metadata با روش‌های خاص) سخت/غیرممکن شد!

**راه‌حل برای پروژه‌های آینده:**

<div align="center">

| سناریو | راه‌حل |
|---|---|
| نیاز به metadata بعدی | قبل از revoke تنظیم کنید |
|نیاز به flexibility | از Token-2022 استفاده کنید |
| نیاز به مدیریت | authority را به PDA/Multisig منتقل کنید |

</div>

---

## 🏛️ معماری: چرا PDA؟

```
┌──────────────────────────────────────────────────────────┐
│                    PDA (Program Derived Address)         │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  بدون PDA:                       با PDA:                 │
│                                                           │
│  Mint = Random Address           Mint = Deterministic    │
│  └─❌ غیرقابل پیش‌بینی           └─✅ قابل پیش‌بینی       │
│  └─❌ نیاز به ذخیره              └─✅ محاسبه‌پذیر         │
│  └─❌ امنیت کمتر                 └─✅ امنیت بیشتر         │
│                                                           │
│  فرمول PDA:                                              │
│  ┌────────────────────────────────────────────┐          │
│  │ PDA = f(seeds, program_id, bump)           │          │
│  └────────────────────────────────────────────┘          │
│                                                           │
│  مثال پروژه SAT:                                         │
│  seed = "sat-mint"                                       │
│  program_id = GoyGGBp...                                 │
│  bump = (محاسبه خودکار)                                 │
│  ↓                                                        │
│  PDA = CJG3Hkz...                                        │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

---

## ⏱️ مدیریت زمان در کلاس

> [!TIP]
> **استراتژی No-Build:**

```
┌──────────────────────────────────────────┐
│  قبل از کلاس:                            │
│  ✅ anchor build (یک بار)               │
│  ✅ anchor deploy (یک بار)              │
│  ✅ yarn install (یک بار)               │
│                                           │
│  در کلاس:                                │
│  ✅ anchor test (30-60 ثانیه)           │
│  یا                                       │
│  ✅ فقط Explorer links (0 ثانیه) ⚡     │
│                                           │
│  ❌ anchor build (ممنوع!)                │
│  ❌ anchor deploy (ممنوع!)               │
└──────────────────────────────────────────┘
```

---

## 🧯 خطاهای رایج و راه‌حل

### ❌ خطا: تست روی localnet اجرا می‌شود

**علائم:**
- شروع local validator
- آدرس‌های جدید
- موجود نبودن داده‌های Devnet

**راه‌حل:**

```bash
export ANCHOR_PROVIDER_URL="https://api.devnet.solana.com"
export ANCHOR_WALLET="$HOME/.config/solana/devnet.json"
anchor test --skip-local-validator
```

### ❌ خطا: کمبود SOL

**راه‌حل:**

```bash
solana airdrop 2
solana balance
```

---

## 📊 خلاصه مقایسه دو روش

<div align="center">

| معیار | Token-2022 CLI | Anchor SAT |
|---|:---:|:---:|
| ⏱️ **زمان** | ~2 دقیقه | ~1 ساعت (اولین بار) |
| 💻 **کدنویسی** | ❌ | ✅ Rust |
| 🎯 **کنترل** | محدود | کامل |
| 🔒 **امنیت** | استاندارد | سفارشی |
| 📈 **مقیاس‌پذیری** | کم | بالا |
| 🎓 **یادگیری** | آسان | سخت |
| 🏢 **Production** | MVP | ✅ پیشنهاد |

</div>

---

## ✅ خلاصه آموخته‌ها

```
┌──────────────────────────────────────────────────────────┐
│               دستاوردهای این بخش                         │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  1️⃣  PDA = آدرس قطعی + امن                              │
│                                                           │
│  2️⃣  Anchor = کد کمتر + امنیت بیشتر                     │
│                                                           │
│  3️⃣  Authority Revoke = supply ثابت                      │
│                                                           │
│  4️⃣  Idempotent Test = قابل تکرار                        │
│                                                           │
│  5️⃣  Production-Ready = آماده استفاده واقعی             │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

---

<div align="center">

### 🎓 نکته کلیدی

> **برای یادگیری:** Token-2022 CLI ⚡  
> **برای پروژه واقعی:** Anchor Program 💎

---

**📚 مرحله بعد:**

[💰 قیمت‌گذاری با Raydium →](03-raydium-cpmm.md)

---

**[← Token-2022 CLI](01-token-2022-cli.md)** | **[فهرست مستندات](index.md)** | **[Raydium CPMM →](03-raydium-cpmm.md)**

---

**Built with ❤️ by [Amin Davodian](https://senioramin.com)**

</div>
