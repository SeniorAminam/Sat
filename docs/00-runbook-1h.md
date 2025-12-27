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

# 🗓️ Runbook ارائه ۱ ساعته (کلاسی)

هدف: در ۶۰ دقیقه، من **دو روش** ساخت توکن روی Solana Devnet را به صورت عملی اجرا می‌کنم:

- روش سریع و کم‌ریسک ⚡: **Token-2022 با CLI**
- روش پروژه واقعی 🧱: **Anchor Program + نکات واقعی پروژه + Raydium CPMM (اختیاری/نمایشی)**

> نکته: روی Windows، اجرای Solana/Anchor **داخل WSL** انجام می‌شود.

---

## 0) ✅ چک‌لیست قبل از کلاس (پیش‌نیازهای اجرایی)

این موارد برای کاهش ریسک خطا در کلاس است.

### 0.1) اینترنت + Explorer

- Explorer Devnet باز باشد:
  - https://explorer.solana.com/?cluster=devnet

### 0.2) WSL و ابزارها

داخل WSL اجرا می‌کنیم:

```bash
solana --version
anchor --version
rustc --version
node --version
yarn --version
spl-token --version
```

### 0.2.1) نصب سریع (از صفر) — فقط اگر هنوز نصب نیست

اگر قرار است «از صفر» محیط را بسازیم، این دستور نصب رسمی Solana (به‌همراه Rust/Anchor/Node/Yarn) داخل WSL استفاده می‌شود:

```bash
curl --proto '=https' --tlsv1.2 -sSfL https://solana-install.solana.workers.dev | bash
```

بعد از نصب:

```bash
rustc --version && solana --version && anchor --version && node --version && yarn --version
```

#### 0.2.2) Preflight (Copy/Paste) — چک سریع و کم‌ریسک

این بلاک کامل اجرا می‌شود. اگر همه چیز درست باشد، خروجی error دیده نمی‌شود و از روی خروجی‌ها وضعیت آماده‌بودن مشخص است.

```bash
solana config get
solana address
solana balance
test -f ~/.config/solana/devnet.json && echo "OK: devnet keypair exists" || echo "MISSING: ~/.config/solana/devnet.json"
spl-token --version
```

**خروجی مورد انتظار**

- `solana config get` باید `RPC URL: ...devnet...` نشان بدهد.
- `solana address` باید pubkey ولت را نشان بدهد.
- `solana balance` باید حداقل چند دهم SOL باشد (برای دمو بهتر: `>= 1 SOL`).

- اگر `anchor` یا `solana` موجود نبود: نصب و آماده‌سازی باید قبل از کلاس تکمیل شود.

### 0.3) Wallet + Devnet SOL

داخل WSL:

```bash
solana config set --url devnet
solana config set --keypair ~/.config/solana/devnet.json
solana address
solana airdrop 2
solana balance
```

- اگر `~/.config/solana/devnet.json` وجود نداشت:

```bash
solana-keygen new --outfile ~/.config/solana/devnet.json
solana config set --keypair ~/.config/solana/devnet.json
solana airdrop 2
```

### 0.4) Warm-up برای کامپایل (صرفه‌جویی در زمان کلاس)

این مرحله برای کاهش زمان اجرای کلاس است.

- Anchor (اولین بار ممکن است چند دقیقه طول بکشد):

```bash
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/sat
anchor build
```

#### 0.4.1) قانون طلایی: نصب/دانلود حین کلاس ممنوع

اگر `anchor build` یا `yarn install` بار اول باشد، ممکن است وسطش دانلود انجام شود.

- یک بار `anchor build` باید تا انتها اجرا شده باشد.
- یک بار `yarn install` باید تا انتها اجرا شده باشد.

در زمان کلاس فقط اجراهای سریع و تکرارپذیر انجام می‌شود.

- Raydium scripts:

```bash
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/raydium-sdk-V2-demo
yarn install
```

> زمان‌های واقعی (تقریبی):
> - `anchor build` بار اول: 3 تا 12 دقیقه (بسته به CPU/کش)
> - `anchor build` بار دوم: 30 تا 90 ثانیه
> - `yarn install` بار اول: 1 تا 5 دقیقه

### 0.5) 🛣️ میان‌بُر روز ارائه: دور زدن کامپایل (کاملاً شدنی)

اگر نمی‌خواهیم درگیر کامپایل Rust/Anchor شویم (یا ریسک زمان را نزدیک صفر کنیم)، سناریو این است:

- برای «توکن جدید واقعی + mint + metadata» از مسیر **Token-2022 CLI** استفاده می‌کنیم (بدون Rust).
- برای بخش Anchor، فقط از پروژه‌ی آماده‌ی `sat/` برای **توضیح معماری + اجرای امن/نمایش Explorer** استفاده می‌کنیم.

مسیر اجرایی:

- ساخت توکن جدید + metadata:
  - `docs/01-token-2022-cli.md`
- پروژه واقعی (Anchor) بدون ریسک کامپایل وسط کلاس:
  - `docs/02-anchor-sat.md`

---

## 1) ⏱️ سناریو و زمان‌بندی پیشنهادی (60 دقیقه)

### دقیقه 0-5: مقدمه سریع

- سولانا چیست؟ (Account model)
- SPL Token چیست؟
- تفاوت `Token Program` و `Token-2022`

### دقیقه 5-30: روش ۱ (Token-2022 با CLI)

- اجرای کامل طبق: `docs/01-token-2022-cli.md`

هدف: ساخت mint + ایجاد token account + mint supply + نمایش در Explorer + (در صورت داشتن CID) metadata.

**قید اجرایی**

- اگر metadata (CID) آماده نیست، مرحله IPFS در کلاس حذف می‌شود.
- اجرای mint/account/mint-supply و نمایش Explorer کافی است.

### دقیقه 30-50: روش ۲ (Anchor program واقعی)

- اجرای بخش‌های کلیدی طبق: `docs/02-anchor-sat.md`

هدف: نشان می‌دهد که می‌توان mint را با برنامه ساخت (PDA)، supply را mint کرد و authority را قفل کرد.

**قید اجرایی**

- `anchor deploy` در کلاس انجام نمی‌شود (ریسک شبکه/کمبود SOL/کندی). برنامه از قبل deploy شده.
- در کلاس فقط `anchor test --skip-local-validator` اجرا می‌شود (در داک آمده).

### دقیقه 50-60: Raydium CPMM (اختیاری + کم‌ریسک)

- فقط **Quote** گرفته می‌شود (بدون ارسال تراکنش) تا ریسک نزدیک صفر شود:
  - طبق `docs/03-raydium-cpmm.md`

**قید اجرایی**

- `MODE=swap` اجرا نمی‌شود.
- ساخت pool جدید انجام نمی‌شود.

---

## 2) 📌 قواعد اجرای کلاس

- اجرا داخل WSL انجام می‌شود.
- قبل از هر دموی سنگین، `solana balance` چک می‌شود.
- از ساخت Pool جدید خودداری می‌شود؛ فقط **Quote** گرفته می‌شود.
- بعد از هر دستور مهم، خروجی تاییدی چک می‌شود (در داک‌ها نوشته شده).

---

## 3) 🛟 Plan B (اگر Devnet/RPC اذیت کرد)

اگر Devnet شلوغ بود یا airdrop انجام نشد یا یک تراکنش طول کشید:

- کلاس متوقف نمی‌شود؛ سریع به “نمایش Explorer + توضیح معماری” منتقل می‌شویم.
- لینک‌های آماده Devnet (از پروژه واقعی):

```bash
echo "Program: https://explorer.solana.com/address/GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg?cluster=devnet"
echo "SAT Mint: https://explorer.solana.com/address/CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv?cluster=devnet"
echo "Raydium Pool: https://explorer.solana.com/address/4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf?cluster=devnet"
echo "Create Pool Tx: https://explorer.solana.com/tx/2UL7qT9nH8Ch9G2WQCFMH86KvpjJyzAF6Amfj5bF4oBLv1RBUBbETnGrXzq3fCQiKtfUh6UtyB8LGTEY1zGBFJF7?cluster=devnet"
```

---

## 4) ✅ پایان (جمع‌بندی ۳۰ ثانیه‌ای)

- روش Token-2022: سریع، ساده، مناسب MVP و Demo.
- روش Anchor: قابل اعتمادتر برای پروژه واقعی (قانون‌گذاری/کنترل)، ولی زمان کامپایل و پیچیدگی بیشتری دارد.
- Raydium: ورود توکن به DeFi؛ در کلاس فقط **Quote** گرفته می‌شود.
