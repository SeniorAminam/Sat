<!--
Project: Solana Token Workshop (SAT)
File: README.md
Author: Amin Davodian (Mohammadamin Davodian)
Website: https://senioramin.com
LinkedIn: https://linkedin.com/in/SudoAmin
GitHub: https://github.com/SeniorAminam
Created: 2025-12-27

Purpose: Professional repository landing page for the Solana Token Workshop.
Developed by Amin Davodian
-->

<div align="center">

# 🪙 SAT — Senior Amin Token

### ⚡ کارگاه عملی ساخت توکن روی Solana

<img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" width="150" alt="Solana Logo"/>

---

[![Solana](https://img.shields.io/badge/Solana-Devnet-14F195?style=for-the-badge&logo=solana&logoColor=white)](https://explorer.solana.com/?cluster=devnet)
[![Anchor](https://img.shields.io/badge/Anchor-v0.32-blue?style=for-the-badge)](https://anchor-lang.com)
[![Rust](https://img.shields.io/badge/Rust-1.92-orange?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

**یک پروژه آموزشی برای یادگیری ساخت توکن روی شبکه Solana**

از **صفر مطلق** تا **قرارداد هوشمند** و **قیمت‌گذاری**

</div>

---

## 👨‍💻 درباره ارائه‌دهنده

<div align="center">

| | **امین داوودیان** |
|---|---|
| 🌐 | [senioramin.com](https://senioramin.com) |
| 💻 | [@SeniorAminam](https://github.com/SeniorAminam) |
| 🔗 | [SudoAmin](https://linkedin.com/in/SudoAmin) |
| 📱 | [@SeniorAmin](https://t.me/SeniorAmin) |

</div>

---

## 🎯 این پروژه چیست؟

این ریپازیتوری شامل مستندات و کد یک **کارگاه آموزشی ۱ ساعته** است که در آن:

| # | موضوع | توضیح |
|:---:|---|---|
| 1️⃣ | **چرا Solana؟** | مقایسه با Ethereum و مزایای سرعت و کارمزد |
| 2️⃣ | **ساخت توکن با CLI** | روش سریع با `spl-token` |
| 3️⃣ | **قرارداد با Anchor** | نوشتن برنامه Rust حرفه‌ای |
| 4️⃣ | **متادیتا** | اضافه کردن نام، نماد و لوگو |
| 5️⃣ | **قیمت‌گذاری** | آشنایی با Liquidity Pool |

---

## 🚀 از اینجا شروع کنید!

> [!IMPORTANT]
> **برای شروع کارگاه، این فایل را باز کنید:**
>
> ### 📘 **[WORKSHOP.md](WORKSHOP.md)** ← **شروع اینجا**
>
> این راهنمای اصلی است که گام‌به‌گام شما را از صفر تا ساخت کامل میم کوین همراهی می‌کند.

<div align="center">

[![شروع کارگاه](https://img.shields.io/badge/🎯_شروع_کارگاه-WORKSHOP.md-00D9FF?style=for-the-badge)](WORKSHOP.md)

</div>

---

## 📂 ساختار ریپو

```
📦 Solana-Token-Workshop
├── 📖 PRESENTATION_WALKTHROUGH.md   ← اسکریپت اصلی ارائه (فارسی)
├── 📁 docs/                         ← مستندات تکمیلی
│   ├── 00-runbook-1h.md            ← زمان‌بندی کلاس
│   ├── 01-token-2022-cli.md        ← آموزش CLI
│   ├── 02-anchor-sat.md            ← آموزش Anchor
│   ├── 03-raydium-cpmm.md          ← آموزش Raydium
│   └── ...
├── 📁 sat/                          ← پروژه Anchor (SAT Token)
│   ├── programs/sat/src/lib.rs     ← قرارداد هوشمند
│   └── tests/                       ← تست‌ها
└── 📁 raydium-sdk-V2-demo/          ← اسکریپت‌های Raydium
```

---

## 🚀 شروع سریع

### ✅ پیش‌نیازها (داخل WSL)

```bash
# بررسی نسخه‌ها
solana --version    # 2.x.x
anchor --version    # 0.32.x
rustc --version     # 1.92.x
node --version      # v24.x.x
```

### 💰 تنظیم کیف پول

```bash
# شبکه Devnet
solana config set --url devnet

# گرفتن SOL رایگان
solana airdrop 2

# بررسی موجودی
solana balance
```

### 🛠️ Build پروژه

```bash
cd sat
anchor build
anchor test --skip-local-validator
```

---

## 🔗 لینک‌های مهم

<div align="center">

| منبع | لینک |
|---|---|
| 🔍 **Program on Explorer** | [GoyGGBpw...](https://explorer.solana.com/address/GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg?cluster=devnet) |
| 🪙 **SAT Token Mint** | [CJG3Hkz...](https://explorer.solana.com/address/CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv?cluster=devnet) |
| 🌊 **Raydium Pool** | [4dhEUxw...](https://explorer.solana.com/address/4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf?cluster=devnet) |

</div>

---

## 📚 مستندات کارگاه

### 🎯 راهنمای اصلی

| فایل | توضیح | اولویت |
|---|---|:---:|
| [🚀 **WORKSHOP.md**](WORKSHOP.md) | **راهنمای گام‌به‌گام کامل** — از اینجا شروع کنید! | ⭐ اول |

### 📖 مستندات تکمیلی

| فایل | توضیح |
|---|---|
| [📖 PRESENTATION_WALKTHROUGH.md](PRESENTATION_WALKTHROUGH.md) | اسکریپت کامل ارائه |
| [📋 docs/00-runbook-1h.md](docs/00-runbook-1h.md) | زمان‌بندی و چک‌لیست کلاس |
| [⚡ docs/01-token-2022-cli.md](docs/01-token-2022-cli.md) | راهنمای جامع CLI |
| [🧱 docs/02-anchor-sat.md](docs/02-anchor-sat.md) | پروژه Anchor و SAT |
| [💰 docs/03-raydium-cpmm.md](docs/03-raydium-cpmm.md) | قیمت‌گذاری با Raydium |
| [🔧 docs/04-troubleshooting.md](docs/04-troubleshooting.md) | حل مشکلات رایج |
| [🎓 docs/07-no-compile-class-guide.md](docs/07-no-compile-class-guide.md) | استراتژی بدون کامپایل |

---

## 🛡️ امنیت

<div align="center">

| نکته امنیتی | وضعیت |
|---|:---:|
| Mint Authority Revoked | ✅ |
| Freeze Authority Revoked | ✅ |
| Contract Immutable | ✅ |
| Full Metadata | ✅ |

</div>

---

## 📄 لایسنس

این پروژه تحت لایسنس **MIT** منتشر شده است. برای جزئیات بیشتر فایل [LICENSE](LICENSE) را مطالعه کنید.

---

<div align="center">

### ⭐ اگر این پروژه مفید بود، ستاره بدید!

---

**Built with ❤️ by [Amin Davodian](https://senioramin.com)**

[![Star](https://img.shields.io/github/stars/SeniorAminam/Sat?style=social)](https://github.com/SeniorAminam/Sat)
[![Fork](https://img.shields.io/github/forks/SeniorAminam/Sat?style=social)](https://github.com/SeniorAminam/Sat/fork)

</div>
