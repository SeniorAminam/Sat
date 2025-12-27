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

# 🧱 روش ۲: ساخت توکن با Anchor Program (پروژه واقعی)

این روش بر پایه پروژه Anchor موجود در پوشه `sat/` است.

**ارائه‌دهنده:** Amin Davodian (SeniorAmin)

- Website: https://senioramin.com
- GitHub: https://github.com/SeniorAminam

---

## 🎯 خروجی مورد انتظار این بخش

- ساخت mint به شکل PDA (deterministic)
- mint کردن supply اولیه
- قفل کردن `Mint Authority` و `Freeze Authority`

**نکته اجرایی (برای ارائه):**

- این برنامه mint را با یک seed ثابت (`sat-mint`) می‌سازد و بعد از mint اولیه، authorityها را `None` می‌کند.
- نتیجه: با همین program نمی‌شود «یک توکن جدید» ساخت/مینت کرد، مگر اینکه کد تغییر کند و دوباره deploy شود.
- برای ساخت یک توکن جدید + metadata بدون درگیری کامپایل، در ارائه از مسیر `docs/01-token-2022-cli.md` استفاده می‌کنم.

---

## 0) (اختیاری) ساخت یک پروژه مشابه SAT از صفر

اگر بخواهم «از صفر» یک پروژه شبیه SAT بسازم، مسیر پیشنهادی (برای تمرین خارج از زمان کلاس) این است:

```bash
mkdir -p ~/workshop
cd ~/workshop
anchor init sat-from-scratch
cd sat-from-scratch
```

بعد:

- در `Anchor.toml`، cluster را روی `devnet` و wallet را روی `~/.config/solana/devnet.json` قرار می‌دهم.
- داخل `programs/<program-name>/src/lib.rs` منطق پروژه SAT را پیاده می‌کنم.

نکته اجرایی برای کلاس:

- برای اینکه وسط ارائه درگیر کدنویسی و دیباگ نشویم، در روز کلاس از پروژه آماده‌ی `sat/` استفاده می‌کنم و فقط اجرای امن (`anchor test --skip-local-validator`) انجام می‌شود.

---

این روش بر پایه پروژه Anchor موجود در پوشه `sat/` است. مزیت‌ها:

- کنترل کامل روی ساخت Mint (با PDA)
- امکان enforce کردن قوانین (مثل یک‌بار mint کردن)
- امکان قفل کردن authority ها برای اعتمادسازی

- اما:

- کامپایل Rust زمان‌برتر است
- در کلاس باید زمان مدیریت شود (به همین خاطر warm-up قبل از شروع کلاس مهم است)

---

## 1) 🧾 اطلاعات واقعی پروژه (Devnet)

از فایل `sat/SAT_DEVNET_INFO.txt`:

- Wallet pubkey:
  - `9HHDK9zwk3GLzFk2TZKeLifVAngpWMiWWUHLLm3Jwvs3`
- Program ID:
  - `GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg`
- SAT Mint PDA:
  - `CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv`
- Total supply:
  - `369,000,000` با `decimals=9`

---

## 2) 📁 رفتن به پروژه و چک تنظیمات

در WSL:

```bash
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/sat
```

### 2.1) ✅ Preflight (Copy/Paste)

این بلاک اجرا می‌شود:

```bash
solana config set --url devnet
solana config set --keypair ~/.config/solana/devnet.json
solana config get
solana address
solana balance

export ANCHOR_PROVIDER_URL="https://api.devnet.solana.com"
export ANCHOR_WALLET="$HOME/.config/solana/devnet.json"
echo "ANCHOR_PROVIDER_URL=$ANCHOR_PROVIDER_URL"
echo "ANCHOR_WALLET=$ANCHOR_WALLET"
test -f "$ANCHOR_WALLET" && echo "OK: anchor wallet exists" || echo "MISSING: anchor wallet"
```

**خروجی مورد انتظار**

- `solana balance` بهتر است `>= 1 SOL` باشد.
- پیام `OK: anchor wallet exists` باید مشاهده شود.

بررسی تنظیمات Devnet:

```bash
solana config get
```

در `Anchor.toml` همین پروژه:

- cluster روی `devnet`
- wallet روی `~/.config/solana/devnet.json`

---

## 3) 📦 نصب وابستگی‌های JS (یک بار قبل از کلاس)

تست Anchor با mocha اجرا می‌شود. برای جلوگیری از دانلود/نصب در کلاس:

```bash
yarn install
```

---

## 4) 🏗️ Build و Deploy (نمایشی)

### Build

```bash
anchor build
```

- بار اول: ممکن است چند دقیقه طول بکشد.

### Deploy

```bash
anchor deploy
```

**قید اجرایی**

- اگر برنامه از قبل deploy شده باشد، در کلاس نیازی به `anchor deploy` نیست.
- در کلاس معمولاً فقط Explorer نمایش داده می‌شود.

- بعد از deploy می‌توان لینک Explorer را نشان داد:

لینک Explorer برنامه:

```bash
echo "https://explorer.solana.com/address/GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg?cluster=devnet"
```

---

## 5) 🧪 ساخت Mint و mint کردن Supply با Test (کم‌کدنویسی‌ترین دموی امن)

این پروژه یک تست دارد که mint PDA را می‌سازد و supply را mint می‌کند.

```bash
anchor test --skip-local-validator
```

این تست:
 
 - PDA را از seed `sat-mint` می‌سازد.
 - اگر mint از قبل وجود داشته باشد، تست به شکل **تکرارپذیر (idempotent)** اجرا می‌شود و mint مجدد انجام نمی‌شود (مناسب کلاس).
 
 **خروجی مورد انتظار**

- انتظار می‌رود لاگ‌های زیر مشاهده شود:
  - `SAT Mint PDA:`
  - `Payer ATA:`
  - `Transaction signature:` (یا پیام `Skipping ... idempotent`)

اگر مشاهده شد که Anchor در حال بالا آوردن local validator است، یعنی `--skip-local-validator` اعمال نشده.

### خروجی‌های مهم برای نمایش در کلاس

- `SAT Mint PDA` و `Payer ATA`
- `Transaction signature`

Explorer برای Mint:

```bash
echo "https://explorer.solana.com/address/CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv?cluster=devnet"
```

---

## 6) 🔒 نکته مهم امنیتی/پروژه‌ای: قفل کردن authority

در کد برنامه (`programs/sat/src/lib.rs`) بعد از mint اولیه:

- Mint authority به `None` ست می‌شود.
- Freeze authority هم به `None` ست می‌شود.

این یعنی:

- دیگر هیچ‌کس نمی‌تواند supply جدید mint کند.
- دیگر کسی نمی‌تواند freeze/unfreeze کند.

### تجربه واقعی پروژه (یک درس مهم)
 
چون mint authority را قفل کردیم، برای SAT v1 دیگر نتوانستیم بعضی کارها را انجام بدهیم (مثل اضافه کردن metadata با روش‌هایی که نیاز به امضای mint authority دارند). پس:
 
 - در صورت نیاز به metadata یا تغییرات بعدی، یا metadata قبل از revoke تنظیم می‌شود، یا از Token-2022 استفاده می‌شود.
 
---

## 7) ⏱️ نکته اجرایی: مدیریت زمان

برای اینکه `anchor build/test` در کلاس طولانی نشود:
 
- قبل از کلاس یک بار `anchor build` اجرا می‌شود.
 - در کلاس فقط `anchor test` (یا صرفاً نمایش Explorer + توضیح معماری) کافی است.

---

## 8) 🧯 خطاهای رایج و راه‌حل سریع

- **مشکل: تست روی localnet اجرا می‌شود**
  - **علائم:** شروع شدن local validator / آدرس‌های جدید / موجود نبودن داده‌های Devnet
  - **راه‌حل:** متغیرهای محیطی ست می‌شود و دوباره اجرا می‌شود:

```bash
export ANCHOR_PROVIDER_URL="https://api.devnet.solana.com"
export ANCHOR_WALLET="$HOME/.config/solana/devnet.json"
anchor test --skip-local-validator
```

- **مشکل: کمبود SOL**
  - **راه‌حل:**

```bash
solana airdrop 2
solana balance
```

**خروجی مورد انتظار**

- `solana airdrop 2` باید یک signature چاپ کند.
- `solana balance` باید افزایش پیدا کند.
