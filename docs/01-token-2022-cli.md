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

# ⚡ روش ۱: ساخت توکن با Token-2022 (سریع و ساده)

در این بخش از ارائه، من از Token-2022 به عنوان مسیر سریع استفاده می‌کنم؛ علت انتخاب:

- عدم نیاز به کدنویسی Rust/Anchor
- اجرای قابل تکرار با CLI
- امکان اتصال metadata روی خود توکن (Token-2022 extensions)

> در این جلسه، همه دستورات داخل WSL اجرا می‌شود.

**ارائه‌دهنده:** Amin Davodian (SeniorAmin)

- Website: https://senioramin.com
- GitHub: https://github.com/SeniorAminam

---

## 🎯 خروجی مورد انتظار این بخش

- ساخت یک `mint` روی Devnet
- ساخت ATA برای ولت
- mint کردن supply اولیه
- گرفتن لینک Explorer و نمایش نتیجه

---

## 1) 🔧 تنظیم Devnet و Wallet

### 1.1) Preflight (Copy/Paste)

ابتدا این دستورات اجرا می‌شود تا Devnet و کیف پول فعال بررسی شود:

```bash
solana config set --url devnet
solana config set --keypair ~/.config/solana/devnet.json
solana config get
solana address
test -f ~/.config/solana/devnet.json && echo "OK: keypair exists" || echo "MISSING: ~/.config/solana/devnet.json"
```

**خروجی مورد انتظار**

- `solana config get` باید `RPC URL` مربوط به Devnet را نمایش دهد.
- `solana address` یک pubkey چاپ می‌کند.
- پیام `OK: keypair exists` باید مشاهده شود.

```bash
solana address
```

### 💧 گرفتن SOL تستی

```bash
solana airdrop 2
solana balance
```

**خروجی مورد انتظار**

- `solana airdrop 2` باید یک signature چاپ کند.
- `solana balance` باید بیشتر از 0 باشد.

**اگر airdrop خطا داد**

- چند دقیقه صبر می‌کنیم و دوباره امتحان می‌شود.
- یا از RPC دیگری استفاده می‌شود.
- برای اینکه روند کلاس متوقف نشود: می‌توان Token-2022 را از قبل ساخته و در کلاس فقط `spl-token balance` و Explorer را نمایش داد.

---

## 2) 🪙 ساخت Mint با Token-2022

Token-2022 Program Id:

- `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`

دستور ساخت mint:

```bash
spl-token create-token \
  --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --enable-metadata \
  --decimals 9
```

- خروجی این دستور یک `Address:` می‌دهد. آدرس mint در متغیر `MINT` قرار داده می‌شود (برای جلوگیری از اشتباه در copy/paste):

```bash
export MINT="<PASTE_MINT_ADDRESS_HERE>"
echo "MINT=$MINT"
```

**خروجی مورد انتظار**

- باید `MINT=...` مشاهده شود.

### 🔎 تایید در Explorer

```bash
echo "https://explorer.solana.com/address/$MINT?cluster=devnet"
```

---

## 3) 👛 ساخت Token Account (ATA) برای کیف پول

```bash
spl-token create-account $MINT
```

**خروجی مورد انتظار**

- معمولاً یک `Creating account ...` و سپس یک `Address:` یا `Account:` چاپ می‌شود (همان ATA).

### چک بالانس

```bash
spl-token balance $MINT
```

---

## 4) 🏭 Mint کردن Supply اولیه

مثلا 1,000,000 واحد (UI):

```bash
spl-token mint $MINT 1000000
spl-token balance $MINT
```

**خروجی مورد انتظار**

- بعد از mint، `spl-token balance` باید `1000000` (یا عدد متناظر) را نمایش دهد.

---

## 5) 🖼️ اضافه کردن Metadata (اختیاری؛ برای نمایش در Explorer)

برای اینکه `name/symbol/logo/description` نمایش داده شود، باید یک فایل `metadata.json` جایی host شود (ترجیحا IPFS).

### ساخت فایل‌های metadata (لوکال)

یک پوشه محلی ساخته می‌شود:

```bash
mkdir -p metadata
```

- یک تصویر `logo.png` داخل `metadata/` قرار می‌گیرد.
- سپس فایل `metadata/metadata.json` ساخته می‌شود (نمونه):

```json
{
  "name": "MyToken Token",
  "symbol": "MTK",
  "description": "Example token created in class on Solana Devnet.",
  "image": "logo.png",
  "external_url": "https://senioramin.com",
  "properties": {
    "files": [{ "uri": "logo.png", "type": "image/png" }],
    "category": "image"
  }
}
```

### آپلود به IPFS

- برای کاهش ریسک، این بخش از قبل آماده می‌شود و در کلاس فقط URL استفاده می‌شود.

پس از دریافت CID، URL نهایی مثلا:

- `https://gateway.pinata.cloud/ipfs/<CID>/metadata.json`

### گزینه جایگزین کم‌ریسک (برای کلاس): GitHub Raw URL (بدون IPFS)

اگر ریپو public باشد، می‌توان فایل metadata را داخل ریپو commit کرد و URI را از GitHub به صورت raw استفاده کرد.

مثال:

- `https://raw.githubusercontent.com/SeniorAminam/Sat/main/sat/metadata/sat.json`

### اتصال Metadata به Mint

#### گزینه ۱ (پیشنهادی برای کلاس): GitHub Raw URL

```bash
spl-token initialize-metadata \
  $MINT \
  "MyToken Token" \
  "MTK" \
  "https://raw.githubusercontent.com/SeniorAminam/Sat/main/sat/metadata/sat.json"
```

#### گزینه ۲: IPFS Gateway URL

```bash
spl-token initialize-metadata \
  $MINT \
  "MyToken Token" \
  "MTK" \
  "https://gateway.pinata.cloud/ipfs/<CID>/metadata.json"
```

**نکته اجرایی (کاهش ریسک)**

- اگر `CID` از قبل آماده نیست، این مرحله در کلاس انجام نمی‌شود.
- به جای آن mint/supply و Explorer نمایش داده می‌شود.

---

## 6) 🔁 انتقال توکن (دموی ساده)

```bash
export RECIPIENT="<RECIPIENT_WALLET_ADDRESS>"
spl-token transfer $MINT 100 $RECIPIENT
```

**خروجی مورد انتظار**

- باید یک signature چاپ شود.

---

## ✅ جمع‌بندی

- کاربرد رایج این مسیر: MVP و Demo
- برای منطق پیچیده‌تر (قفل/vesting/permission/...) یک Program (Anchor) لازم است.
