<!--
Project: Solana Token Workshop (SAT)
File: docs/06-project-history-and-lessons.md
Author: Amin Davodian (Mohammadamin Davodian)
Website: https://senioramin.com
LinkedIn: https://linkedin.com/in/SudoAmin
GitHub: https://github.com/SeniorAminam
Created: 2025-12-27

Purpose: Full project history, real problems encountered, root causes, fixes, and lessons learned for a university class session.
Developed by Amin Davodian
-->

# 🧪 تاریخچه پروژه + مشکلات واقعی + درس‌ها (Very Detailed)

این فایل برای جمع‌بندی جلسه نوشته شده است: **تمام چیزهایی که واقعاً در پروژه تجربه شد**، علت، راه‌حل، و درس‌های عملی برای پروژه واقعی.

> هدف: مشخص شود «ساخت توکن» فقط یک دستور نیست؛ مدیریت authority، متادیتا، RPC، و ادغام با DeFi هم مهم است.

**ارائه‌دهنده:** Amin Davodian (SeniorAmin)

- Website: https://senioramin.com
- GitHub: https://github.com/SeniorAminam

---

## 1) تصویر کلی پروژه (What we built)

داخل این ورک‌اسپیس دو مسیر داشتیم:

### 1.1) مسیر سریع: Token-2022

- هدف: ساخت توکن در Devnet با کمترین پیچیدگی
- ابزار اصلی: `spl-token`
- مزیت: metadata قابل attach (روی Token-2022)

### 1.2) مسیر پروژه واقعی: Anchor Program + SAT

مسیر `sat/`:

- ساخت mint به شکل **PDA** (قابل پیش‌بینی و deterministic)
- mint کردن supply اولیه
- revoke کردن `Mint Authority` و `Freeze Authority`

**نتیجه واقعی Devnet (طبق `sat/SAT_DEVNET_INFO.txt`)**

- Wallet pubkey:
  - `9HHDK9zwk3GLzFk2TZKeLifVAngpWMiWWUHLLm3Jwvs3`
- Program ID:
  - `GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg`
- SAT Mint PDA:
  - `CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv`

---

## 2) پروژه Anchor (sat/) — جزئیات فنی + نکات ارائه‌ای

### 2.1) چرا PDA برای Mint؟

با PDA:

- mint آدرس مشخصی دارد (براساس `seeds` و program id)
- از ساخت mint های تصادفی توسط افراد دیگر جلوگیری می‌شود
- برای قراردادهای واقعی (DAO/vesting/treasury) معماری استانداردتری است

در این پروژه، seed:

- `sat-mint`

### 2.2) منطق mint فقط یک بار (Idempotent)

در برنامه:

- اگر `mint.supply != 0` باشد، خطا می‌دهد (`AlreadyMinted`)

در تست JS هم:

- قبل از اجرای tx چک می‌کند `getAccountInfo(mintPda)` وجود دارد یا نه
- اگر وجود داشت، test را skip می‌کند

**نکته کلاسی:**

- برای یک جلسه عملی، idempotency باعث می‌شود اجرا تکرارپذیر بماند.

### 2.3) قفل کردن authority و پیامد واقعی

در `programs/sat/src/lib.rs` بعد از mint:

- `MintTokens` authority به `None`
- `FreezeAccount` authority به `None`

**مزیت امنیتی:**

- supply جدید دیگر قابل mint نیست
- freeze/unfreeze دیگر ممکن نیست

**مشکل واقعی‌ای که به آن خوردیم:**

- وقتی authority را revoke کردیم، بعضی عملیات‌های بعدی که نیاز به امضای authority دارند سخت/غیرممکن شدند.
- مثال مهم: برای SAT v1 که mint authority revoke شد، افزودن/تغییر بعضی metadata ها با مدل‌های رایج سخت شد.

**نکته اجرایی مهم:**

- اگر metadata یا تغییرات بعدی لازم باشد:
  - قبل از revoke انجام می‌شود
  - یا از Token-2022 استفاده می‌شود
  - یا authority به یک PDA/Multisig منتقل می‌شود (به جای `None`)

---

## 3) زمان کامپایل و مدیریت زمان در کلاس

### 3.1) چرا Anchor/Rust در کلاس ریسک دارد؟

- بار اول build ممکن است:
  - دانلود toolchain
  - دانلود crate ها
  - build طولانی

### 3.2) راه‌حل اجرایی برای کاهش ریسک

- قبل از کلاس:
  - `anchor build`
  - `yarn install` داخل `sat/`
- در کلاس:
  - فقط `anchor test --skip-local-validator`

**نکته کلاسی:**

- «کدنویسی در کلاس» با warm-up و caching قابل مدیریت‌تر است.

---

## 4) Raydium CPMM — ادغام توکن با DeFi + مشکلات واقعی

### 4.1) نتیجه واقعی Devnet

- Pool ID:
  - `4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf`
- Create tx:
  - `2UL7qT9nH8Ch9G2WQCFMH86KvpjJyzAF6Amfj5bF4oBLv1RBUBbETnGrXzq3fCQiKtfUh6UtyB8LGTEY1zGBFJF7`
- LP Mint:
  - `4wNbidbbT8bbhzn5bXo9wkcXfqprpfNce5fyWo3gdY7E`

### 4.2) مشکل بزرگ: 403 از Raydium API (Cloudflare)

**علت:**

- بعضی endpoint های Raydium در شرایطی (خصوصاً devnet) از پشت Cloudflare محدود می‌شوند.

**اثر روی پروژه:**

- fetch کردن config/token list یا pool info از API می‌توانست fail شود.

**راه‌حل واقعی‌ای که اجرا شد (RPC-only):**

- در `raydium-sdk-V2-demo/src/cpmm/createSatCpmmPool.ts`:
  - config fee را از RPC خواندیم با:
    - `CpmmConfigInfoLayout`
    - `getCpmmPdaAmmConfigId`
  - به جای API

**نکته کلاسی:**

- برای devnet و برای reliability، Plan B لازم است: `RPC-only`.

### 4.3) باگ بسیار رایج: decimals و تبدیل UI amount

**مشکل:**

- بعضی کدها مقدار UI را با `1e9` ثابت تبدیل می‌کنند.
- این فقط وقتی درست است که decimals = 9 باشد.

**تجربه واقعی ما:**

- در swap/quote، اگر input mint decimals متفاوت باشد، نتیجه quote غلط می‌شود.

**راه‌حل واقعی‌ای که اجرا شد:**

- در `raydium-sdk-V2-demo/src/cpmm/swap.ts`:
  - از `decimal.js` استفاده شد
  - `INPUT_AMOUNT_UI` با decimals واقعی mint تبدیل شد

**نکته کلاسی:**

- decimals یک bug-class رایج در DeFi integration است.

### 4.4) چرا در کلاس Pool جدید نسازیم؟

- نیاز به SOL بیشتر
- نیاز به config درست
- devnet گاهی کند/ناپایدار

**قید اجرایی:**

- فقط `MODE=quote` اجرا می‌شود (بدون tx)

---

## 5) نکات کاملاً عملی برای اجرای جلسه

### 5.1) قانون طلایی

- نصب/دانلود وسط کلاس ممنوع

### 5.2) قانون دوم

- اگر شبکه مشکل ایجاد کرد، سریع به Plan B منتقل می‌شویم:
  - Explorer link ها
  - توضیح معماری

### 5.3) کم‌ریسک‌ترین مسیر دمو

- Token-2022:
  - mint + account + mint supply
- Anchor:
  - `anchor test --skip-local-validator` (idempotent)
- Raydium:
  - فقط quote

---

## 6) لینک‌های آماده برای لحظه بحران (Copy/Paste)

```bash
echo "Program: https://explorer.solana.com/address/GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg?cluster=devnet"
echo "SAT Mint: https://explorer.solana.com/address/CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv?cluster=devnet"
echo "Raydium Pool: https://explorer.solana.com/address/4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf?cluster=devnet"
```
