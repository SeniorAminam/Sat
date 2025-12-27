<!--
Project: Solana Token Workshop (SAT)
File: docs/01-token-2022-cli.md
Author: Amin Davodian (Mohammadamin Davodian)
Website: https://senioramin.com
LinkedIn: https://linkedin.com/in/SudoAmin
GitHub: https://github.com/SeniorAminam
Created: 2025-12-27

Purpose: Step-by-step, low-risk Token-2022 workflow using Solana CLI + spl-token.
Developed by Amin Davodian
-->

<div align="center">

# ⚡ روش ۱: ساخت توکن با Token-2022

### 🚀 سریع، ساده، بدون کدنویسی

<img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" width="100" alt="Solana"/>

---

**ارائه‌دهنده:** [امین داوودیان](https://senioramin.com) | [@SeniorAminam](https://github.com/SeniorAminam)

</div>

---

## 🎯 هدف این بخش

در این بخش از ارائه، یک توکن کامل با ویژگی‌های زیر می‌سازیم:

<div align="center">

| ویژگی | توضیح | زمان |
|:---:|---|:---:|
| 🪙 **Mint Address** | آدرس یکتای توکن روی Devnet | ~30 ثانیه |
| 🏦 **Token Account** | حساب نگهداری توکن | ~15 ثانیه |
| 💰 **Supply** | تعداد اولیه توکن‌ها | ~15 ثانیه |
| 🖼️ **Metadata** | نام، نماد و لوگو | ~30 ثانیه |
| 🔗 **Explorer** | مشاهده در Solana Explorer | - |

**⏱️ زمان کل: حدود 2 دقیقه**

</div>

---

## 💡 چرا Token-2022؟

```
┌──────────────────────────────────────────────────────────┐
│         Token Program vs Token-2022                      │
├────────────────────┬─────────────────────────────────────┤
│                    │                                     │
│  Token Program     │         Token-2022                  │
│   (قدیمی)          │          (جدید)                     │
│                    │                                     │
│  ┌──────────┐      │    ┌──────────────────────┐        │
│  │  Core    │      │    │  Core + Extensions   │        │
│  └──────────┘      │    └──────────────────────┘        │
│                    │                                     │
│  ✅ Transfer       │    ✅ Transfer                      │
│  ✅ Mint           │    ✅ Mint                          │
│  ✅ Burn           │    ✅ Burn                          │
│  ❌ Metadata       │    ✅ Metadata on-chain ⭐          │
│  ❌ Transfer Fee   │    ✅ Transfer Fee                  │
│  ❌ Interest       │    ✅ Interest Bearing              │
│                    │                                     │
└────────────────────┴─────────────────────────────────────┘
```

> [!TIP]
> 💡 برای پروژه‌های جدید، **Token-2022** انتخاب بهتری است!

---

## 🛠️ پیش‌نیازها

### ✅ چک‌لیست قبل از شروع

<div align="center">

| # | مورد | دستور چک | وضعیت |
|:---:|---|---|:---:|
| 1️⃣ | **WSL فعال** | `wsl --version` | ⬜ |
| 2️⃣ | **Solana CLI** | `solana --version` | ⬜ |
| 3️⃣ | **SPL Token** | `spl-token --version` | ⬜ |
| 4️⃣ | **Devnet Config** | `solana config get` | ⬜ |
| 5️⃣ | **SOL Balance** | `solana balance` (>= 0.5 SOL) | ⬜ |

</div>

---

## 📋 مراحل اجرا

### 🔧 مرحله ۱: تنظیم محیط

> [!IMPORTANT]
> ⚠️ تمام دستورات باید **داخل WSL** اجرا شوند!

```bash
# ورود به WSL (در PowerShell ویندوز)
wsl

# تنظیم Devnet
solana config set --url devnet
solana config set --keypair ~/.config/solana/devnet.json

# بررسی تنظیمات
solana config get
```

**خروجی مورد انتظار:**

```
Config File: /home/user/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com  ← باید devnet باشد
WebSocket URL: wss://api.devnet.solana.com/
Keypair Path: /home/user/.config/solana/devnet.json
Commitment: confirmed
```

---

### 💧 دریافت SOL تستی

```bash
# مشاهده آدرس کیف پول
solana address

# درخواست airdrop
solana airdrop 2

# بررسی موجودی
solana balance
```

**نکات مهم:**

> [!NOTE]
> 🌐 SOL روی Devnet کاملاً **رایگان** است!

> [!WARNING]
> ⚠️ اگر airdrop failed شد، چند دقیقه صبر کنید و دوباره امتحان کنید.

---

### 🪙 مرحله ۲: ساخت Mint

این مهم‌ترین مرحله است — ساخت آدرس اصلی توکن!

```bash
# ساخت توکن با Token-2022
spl-token create-token \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --enable-metadata \
  --decimals 9
```

**پارامترها:**

<div align="center">

| پارامتر | مقدار | توضیح |
|---|---|---|
| `--program-id` | `TokenzQd...xuEb` | آدرس Token-2022 Program |
| `--enable-metadata` | - | فعال‌سازی metadata |
| `--decimals` | `9` | تعداد اعشار (استاندارد Solana) |

</div>

**خروجی:**

```
Creating token 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU

Signature: 4Z2eN...h8Kp
```

**ذخیره آدرس:**

```bash
# کپی آدرس mint و قرار دادن در متغیر
export MINT="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"

# تایید
echo "✅ Mint Address: $MINT"
```

> [!TIP]
> 📋 این آدرس را کپی کنید! در مراحل بعدی نیاز داریم.

---

### 🏦 مرحله ۳: ساخت Token Account

برای نگهداری توکن‌ها نیاز به یک **Token Account** داریم:

```bash
spl-token create-account $MINT
```

**خروجی:**

```
Creating account 9yZB4bPq...

Signature: 2Ks9V...mPx4
```

**بررسی بالانس:**

```bash
spl-token balance $MINT
```

**خروجی:**

```
0
```

> [!NOTE]
> 💡 هنوز توکنی mint نکرده‌ایم، بنابراین بالانس صفر است.

---

### 💸 مرحله ۴: Mint کردن Supply

حالا توکن‌های اولیه را می‌سازیم:

```bash
# mint کردن 1,000,000 توکن
spl-token mint $MINT 1000000

# بررسی بالانس
spl-token balance $MINT
```

**خروجی:**

```
Minting 1000000 tokens
  Token: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
  Recipient: 9yZB4bPq...

Signature: 3Hp2...Kx9w

---

1000000
```

> [!SUCCESS]
> 🎉 تبریک! شما الان **1,000,000 توکن** دارید!

---

### 🖼️ مرحله ۵: اضافه کردن Metadata

Metadata شامل نام، نماد و لوگوی توکن است.

#### گزینه ۱: استفاده از URL آماده (پیشنهادی برای کلاس)

```bash
spl-token initialize-metadata \
  $MINT \
  "Class Demo Token" \
  "DEMO" \
  "https://raw.githubusercontent.com/SeniorAminam/Sat/main/metadata/demo.json"
```

#### گزینه ۲: ساخت فایل Metadata سفارشی

**۱. ساخت فایل JSON:**

```bash
mkdir -p metadata
cat > metadata/metadata.json << 'EOF'
{
  "name": "My Awesome Token",
  "symbol": "MAT",
  "description": "توکن آموزشی ساخته شده در کارگاه دانشگاه",
  "image": "https://example.com/logo.png",
  "external_url": "https://senioramin.com",
  "attributes": [
    {
      "trait_type": "Created By",
      "value": "Amin Davodian"
    },
    {
      "trait_type": "Workshop",
      "value": "University Token Workshop 2025"
    }
  ]
}
EOF
```

**۲. آپلود به IPFS یا GitHub**

**۳. اتصال Metadata:**

```bash
spl-token initialize-metadata \
  $MINT \
  "My Awesome Token" \
  "MAT" \
  "https://your-url.com/metadata.json"
```

> [!IMPORTANT]
> 🔗 URL باید در دسترس عموم باشد (IPFS، Arweave، یا GitHub Raw)

---

### 🔍 مرحله ۶: مشاهده در Explorer

```bash
# نمایش لینک Explorer
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔗 مشاهده توکن در Solana Explorer:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "https://explorer.solana.com/address/$MINT?cluster=devnet"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

<div align="center">

[![View on Explorer](https://img.shields.io/badge/🔍_View_on_Solana_Explorer-14F195?style=for-the-badge&logo=solana&logoColor=white)](https://explorer.solana.com/?cluster=devnet)

</div>

---

## 🎁 مرحله اضافی: انتقال توکن

می‌توانید توکن را به آدرس دیگری منتقل کنید:

```bash
# آدرس مقصد را تنظیم کنید
export RECIPIENT="<RECIPIENT_WALLET_ADDRESS>"

# انتقال 100 توکن
spl-token transfer $MINT 100 $RECIPIENT

# یا انتقال به همراه ساخت account (اگر وجود ندارد)
spl-token transfer $MINT 100 $RECIPIENT --fund-recipient
```

---

## ✅ خلاصه مراحل

```
┌─────────────────────────────────────────────────────────┐
│           مراحل ساخت توکن با Token-2022                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  1️⃣  تنظیم Devnet                      ✅              │
│  2️⃣  دریافت SOL تستی                   ✅              │
│  3️⃣  ساخت Mint                         ✅              │
│  4️⃣  ساخت Token Account                ✅              │
│  5️⃣  Mint کردن Supply                  ✅              │
│  6️⃣  اضافه کردن Metadata               ✅              │
│  7️⃣  مشاهده در Explorer                ✅              │
│                                                          │
│  ⏱️ زمان کل: ~2 دقیقه                                  │
│  💰 هزینه: رایگان (Devnet)                             │
│  📊 سختی: آسان                                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 کاربردها

<div align="center">

| کاربرد | مناسب؟ | توضیح |
|---|:---:|---|
| 🎨 **MVP و Demo** | ✅ | عالی برای نمایش سریع |
| 🎓 **آموزش** | ✅ | ساده و قابل فهم |
| 🚀 **پروژه کوچک** | ✅ | برای شروع سریع |
| 🏢 **پروژه بزرگ** | ⚠️ | بهتر از Anchor استفاده شود |
| 🔒 **منطق پیچیده** | ❌ | نیاز به قرارداد هوشمند |

</div>

---

## 🆚 مقایسه با Anchor

```
┌──────────────────┬─────────────────┬──────────────────┐
│      معیار       │  Token-2022 CLI │  Anchor Program  │
├──────────────────┼─────────────────┼──────────────────┤
│ زمان             │   ~2 دقیقه      │   ~1 ساعت        │
│ پیچیدگی          │   آسان          │   متوسط-سخت     │
│ کدنویسی          │   ندارد         │   Rust           │
│ کنترل            │   محدود         │   کامل           │
│ امنیت            │   استاندارد     │   سفارشی         │
│ قابلیت توسعه     │   محدود         │   بالا           │
└──────────────────┴─────────────────┴──────────────────┘
```

---

## 🎓 نکات آموزشی

> [!TIP]
> **چه زمانی از Token-2022 CLI استفاده کنیم؟**
> - پروتوتایپ سریع
> - یادگیری و آموزش
> - توکن‌های ساده بدون منطق پیچیده
> - تست و آزمایش

> [!NOTE]
> **چه زمانی از Anchor استفاده کنیم؟**
> - پروژه‌های production
> - نیاز به منطق سفارشی
> - کنترل کامل روی authority ها
> - قوانین پیچیده mint/burn

---

<div align="center">

### ✨ تبریک! 🎉

شما با موفقیت یک توکن کامل روی Solana ساختید!

---

**📚 مرحله بعد:**

[🧱 روش ۲: Anchor Program →](02-anchor-sat.md)

---

**[← بازگشت به فهرست](index.md)** | **[Troubleshooting →](04-troubleshooting.md)**

---

**Built with ❤️ by [Amin Davodian](https://senioramin.com)**

</div>
