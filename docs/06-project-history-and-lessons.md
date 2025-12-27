<!--
Project: Solana Token Workshop (SAT)
File: docs/06-project-history-and-lessons.md
Author: Amin Davodian (Mohammadamin Davodian)
Website: https://senioramin.com
LinkedIn: https://linkedin.com/in/SudoAmin
GitHub: https://github.com/SeniorAminam
Created: 2025-12-27

Purpose: Full project history, real problems encountered, root causes, fixes, and lessons learned.
Developed by Amin Davodian
-->

<div align="center">

# 📜 تاریخچه پروژه و درس‌های واقعی

### 🧬 کالبدشکافی یک پروژه بلاک‌چینی

<img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" width="80" alt="Solana"/>

---

**ارائه‌دهنده:** [امین داوودیان](https://senioramin.com) | [@SeniorAminam](https://github.com/SeniorAminam)

</div>

---

## 🌟 تصویر کلی پروژه (The Big Picture)

این پروژه دو مسیر موازی را برای یادگیری طی کرد:

<div align="center">

| مسیر | هدف | ابزار | نتیجه |
|---|---|---|---|
| 🐇 **مسیر سریع** | ساخت توکن ساده | Token-2022 CLI | توکن با متادیتا |
| 🐢 **مسیر حرفه‌ای** | امنیت و معماری | Anchor + Rust | توکن Immutable با PDA |

</div>

---

## 🕰️ تایم‌لاین توسعه

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          PROJECT TIMELINE                                │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  [Day 1] 🏗️ Setup & Anchor Init                                         │
│     │    └─ نصب Rust, Solana, Anchor                                     │
│     │    └─ ساخت پروژه `sat`                                             │
│     ▼                                                                    │
│  [Day 2] 🧠 Smart Contract Logic                                         │
│     │    └─ طراحی PDA برای Mint (امنیت)                                  │
│     │    └─ افزودن قابلیت Revoke Authority                               │
│     ▼                                                                    │
│  [Day 3] 🧪 Raydium Integration (Challenging!)                           │
│     │    └─ مواجهه با خطای 403 Cloudflare                                │
│     │    └─ تغییر استراتژی به RPC-Only                                   │
│     ▼                                                                    │
│  [Day 4] 📚 Documentation & Refinement                                   │
│          └─ نوشتن Runbook و زیباسازی مستندات                             │
│          └─ طراحی استراتژی No-Compile برای کلاس                          │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 🧯 چالش‌ها و درس‌های واقعی

### ۱. معماری PDA (چرا؟)

> [!NOTE]
> **مشکل:** اگر کلید خصوصی Mint روی فایل سیستم (`mint.json`) باشد، با گم شدن فایل، کنترل توکن از دست می‌رود.

**✅ راه‌حل Anchor:** استفاده از **PDA (Program Derived Address)**.
- آدرس Mint از ترکیب `Program ID` + `Seed ("sat-mint")` ساخته می‌شود.
- هیچ کلید خصوصی وجود ندارد! فقط برنامه می‌تواند آن را کنترل کند.

### ۲. امنیت Authority (اعتماد سازی)

> [!WARNING]
> **ریسک:** توسعه‌دهنده می‌تواند هر زمان توکن جدید Mint کند یا حساب‌ها را Freeze کند. (Rug Pull Risk)

**✅ راه‌حل:**
- در دستورالعمل `Initialize`، بلافاصله `Mint Authority` و `Freeze Authority` را روی `null` ست کردیم.
- نتیجه: توکن **Immutable** شد.

### ۳. مشکل Raydium API (دنیای واقعی)

> [!CAUTION]
> **باگ:** هنگام فچ کردن لیست استخرها در Devnet، ارور `403 Forbidden` دریافت شد.

**✅ راه‌حل مهندسی:**
- به جای استفاده از API ناپایدار، مستقیماً از **RPC Node** اطلاعات اکانت‌ها را خواندیم (`getAccountInfo`).
- درس: همیشه یک Plan B (روش سطح پایین‌تر) داشته باشید.

### ۴. چالش کلاس زنده (Time Management)

> [!IMPORTANT]
> **مشکل:** `anchor build` می‌تواند ۵ تا ۱۰ دقیقه طول بکشد و اینترنت کلاس ممکن است قطع شود.

**✅ استراتژی No-Compile:**
- پروژه از قبل بیلد شده است (`target/deploy`).
- در کلاس فقط `anchor test --skip-local-validator` اجرا می‌شود که در ۱۰ ثانیه تمام می‌شود.
- برای ساخت توکن جدید از روش سریع `Token-2022 CLI` استفاده می‌شود.

---

## 📊 مقایسه نهایی

| ویژگی | Token-2022 CLI | Anchor Program (SAT) |
|---|:---:|:---:|
| **سرعت ساخت** | ⚡ بسیار بالا | 🐢 کند (نیاز به کدنویسی) |
| **هزینه** | 💸 ارزان | 💰 گران‌تر (Deploy برنامه) |
| **امنیت** | 🔒 استاندارد | 🛡️ قابل برنامه ریزی (Custom) |
| **انعطاف** |  محدود | ♾️ نامحدود |
| **مناسب برای** | دمو، MVP | پروژه‌های جدی و DApp |

---

<div align="center">

**📚 مستندات مرتبط:**

[🔧 عیب‌یابی](04-troubleshooting.md) | [📦 انتشار در GitHub](05-github-publish.md)

---

**Built with ❤️ by [Amin Davodian](https://senioramin.com)**

</div>
