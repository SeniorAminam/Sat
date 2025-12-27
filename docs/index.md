<!--
Project: Solana Token Workshop (SAT)
File: docs/index.md
Author: Amin Davodian (Mohammadamin Davodian)
Website: https://senioramin.com
LinkedIn: https://linkedin.com/in/SudoAmin
GitHub: https://github.com/SeniorAminam
Created: 2025-12-27

Purpose: Beautiful landing page for the documentation folder.
Developed by Amin Davodian
-->

<div align="center">

# 📚 مستندات کارگاه ساخت توکن سولانا

### 🎓 راهنمای کامل از صفر تا قهرمان

---

<img src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" width="100" alt="Solana"/>

**ارائه‌دهنده:** [امین داوودیان](https://senioramin.com) | [@SeniorAminam](https://github.com/SeniorAminam)

</div>

---

## 🎯 هدف این جلسه

> **ما قراره امروز یک توکن واقعی بسازیم، بهش اسم و لوگو بدیم، و حتی قیمت‌گذاریش کنیم!**

| خروجی | توضیح |
|---|---|
| 🪙 **توکن** | یک mint address روی Devnet |
| 📝 **متادیتا** | نام، نماد و تصویر |
| 🔒 **امنیت** | Authority ها revoke شده |
| 💰 **Pool** | قیمت‌گذاری با Raydium |

---

## 🗺️ نقشه‌ی مستندات

<div align="center">

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          📁 docs/                                        │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌─────────────────┐                                                    │
│   │ 📖 index.md     │  ←  شما اینجا هستید!                              │
│   └────────┬────────┘                                                    │
│            │                                                             │
│            ▼                                                             │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐       │
│   │ 🧠 WHY_SOLANA   │   │ 📋 00-runbook   │   │ ⚡ 01-token     │       │
│   │    چرا سولانا؟  │   │   زمان‌بندی     │   │   CLI سریع     │       │
│   └─────────────────┘   └─────────────────┘   └─────────────────┘       │
│                                                                          │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐       │
│   │ 🧱 02-anchor    │   │ 💰 03-raydium   │   │ 🔧 04-trouble   │       │
│   │   پروژه واقعی   │   │   قیمت‌گذاری    │   │   عیب‌یابی      │       │
│   └─────────────────┘   └─────────────────┘   └─────────────────┘       │
│                                                                          │
│   ┌─────────────────┐   ┌─────────────────┐                             │
│   │ 📤 05-github    │   │ 📜 06-history   │                             │
│   │   انتشار        │   │   درس‌ها        │                             │
│   └─────────────────┘   └─────────────────┘                             │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

</div>

---

## 📚 فهرست مستندات

### 🎓 مقدماتی

| # | فایل | توضیح |
|:---:|---|---|
| 🧠 | [WHY_SOLANA.md](WHY_SOLANA.md) | **چرا سولانا؟** چرا Anchor؟ چرا Token-2022؟ |
| 📋 | [00-runbook-1h.md](00-runbook-1h.md) | **زمان‌بندی کلاس** — چک‌لیست قبل از ارائه |

### ⚡ مسیر ۱: سریع و ساده (CLI)

| # | فایل | توضیح |
|:---:|---|---|
| ⚡ | [01-token-2022-cli.md](01-token-2022-cli.md) | **ساخت توکن با CLI** — بدون کدنویسی |

### 🧱 مسیر ۲: حرفه‌ای (Anchor)

| # | فایل | توضیح |
|:---:|---|---|
| 🧱 | [02-anchor-sat.md](02-anchor-sat.md) | **پروژه Anchor** — قرارداد هوشمند Rust |

### 💰 قیمت‌گذاری

| # | فایل | توضیح |
|:---:|---|---|
| 💰 | [03-raydium-cpmm.md](03-raydium-cpmm.md) | **Raydium Pool** — اضافه کردن liquidity |

### 🛠️ پشتیبانی

| # | فایل | توضیح |
|:---:|---|---|
| 🔧 | [04-troubleshooting.md](04-troubleshooting.md) | **عیب‌یابی** — مشکلات رایج و راه‌حل |
| 📤 | [05-github-publish.md](05-github-publish.md) | **انتشار** — push به GitHub |
| 📜 | [06-project-history-and-lessons.md](06-project-history-and-lessons.md) | **درس‌ها** — تجربیات واقعی پروژه |

---

## ⚠️ نکات مهم

> [!CAUTION]
> 🖥️ تمام دستورات **Solana** و **Anchor** باید داخل **WSL (Ubuntu)** اجرا شوند!

> [!TIP]
> 💡 قبل از کلاس، حتماً یک بار `anchor build` و `yarn install` را اجرا کنید تا کش بسازید.

> [!NOTE]
> 🌐 این پروژه روی **Devnet** اجرا می‌شود. SOL رایگان است!

---

## 🔗 لینک‌های سریع

<div align="center">

| منبع | لینک |
|---|---|
| 🔍 Explorer | [explorer.solana.com](https://explorer.solana.com/?cluster=devnet) |
| 📖 Solana Docs | [solana.com/docs](https://solana.com/docs) |
| ⚓ Anchor Book | [book.anchor-lang.com](https://book.anchor-lang.com) |
| 🪙 SPL Token | [spl.solana.com](https://spl.solana.com/token-2022) |

</div>

---

## 🎬 شروع کنید!

<div align="center">

**📖 اسکریپت اصلی ارائه:**

[![Presentation](https://img.shields.io/badge/📖_مشاهده_اسکریپت_ارائه-FF6B6B?style=for-the-badge)](../PRESENTATION_WALKTHROUGH.md)

---

[← بازگشت به README](../README.md)

---

**Built with ❤️ by [Amin Davodian](https://senioramin.com)**

</div>
