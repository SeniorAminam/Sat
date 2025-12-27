<!--
Project: Solana Token Workshop (SAT)
File: docs/04-troubleshooting.md
Author: Amin Davodian (Mohammadamin Davodian)
Website: https://senioramin.com
LinkedIn: https://linkedin.com/in/SudoAmin
GitHub: https://github.com/SeniorAminam
Created: 2025-12-27

Purpose: Troubleshooting guide focused on preventing errors during a class/session.
Developed by Amin Davodian
-->

# 🧯 عیب‌یابی (روز کلاس)

این صفحه به عنوان راهنمای عیب‌یابی روز کلاس استفاده می‌شود.

**ارائه‌دهنده:** Amin Davodian (SeniorAmin)

- Website: https://senioramin.com
- GitHub: https://github.com/SeniorAminam

---

## 0) ✅ Preflight واحد (Copy/Paste) — قبل از شروع کلاس

این بلاک داخل WSL اجرا می‌شود. اگر خروجی‌ها درست باشد، احتمال خطا در کلاس بسیار کاهش پیدا می‌کند.

```bash
solana config set --url devnet
solana config set --keypair ~/.config/solana/devnet.json
solana config get
solana address
solana balance

test -f ~/.config/solana/devnet.json && echo "OK: devnet keypair exists" || echo "MISSING: ~/.config/solana/devnet.json"

export ANCHOR_PROVIDER_URL="https://api.devnet.solana.com"
export ANCHOR_WALLET="$HOME/.config/solana/devnet.json"
echo "ANCHOR_PROVIDER_URL=$ANCHOR_PROVIDER_URL"
echo "ANCHOR_WALLET=$ANCHOR_WALLET"

export SOLANA_KEYPAIR_PATH="$HOME/.config/solana/devnet.json"
export SOLANA_RPC_URL="https://api.devnet.solana.com"
echo "SOLANA_KEYPAIR_PATH=$SOLANA_KEYPAIR_PATH"
echo "SOLANA_RPC_URL=$SOLANA_RPC_URL"
```

**خروجی مورد انتظار**

- `RPC URL` باید Devnet باشد.
- پیام `OK: devnet keypair exists` باید مشاهده شود.
- `solana balance` بهتر است `>= 1 SOL` باشد.

---

## 1) 🪟 اشتباه رایج شماره ۱: اجرای سولانا روی PowerShell

- در Windows، اجرای **Solana/Anchor داخل WSL** انجام می‌شود.
- مسیر پروژه در WSL:

```bash
/mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token
```

---

## 2) 💧 مشکل airdrop / کمبود SOL

بررسی:

```bash
solana balance
```

راهکار:

```bash
solana airdrop 2
```

اگر باز هم انجام نشد:

- کلاس متوقف نمی‌شود و Plan B اجرا می‌شود:
  - Token-2022 از قبل ساخته شده و در کلاس فقط Explorer نمایش داده می‌شود.
  - برای بخش Anchor نیز فقط لینک‌های Explorer مربوط به program/mint نمایش داده می‌شود.

اگر devnet شلوغ بود:

- چند دقیقه صبر می‌شود و دوباره تلاش می‌شود.
- یا RPC تغییر داده می‌شود (در صورت استفاده از RPC پولی).

---

## 3) 🔁 مشکل mismatch نسخه‌ها (Anchor/Rust/Solana)

چک:

```bash
solana --version
anchor --version
rustc --version
```

این پروژه `sat/` یک `rust-toolchain.toml` دارد و روی `1.89.0` پین شده.

اگر Rusttoolchain دانلود نشده باشد، بار اول کمی زمان می‌برد.

---

## 4) 🔧 Anchor test/deploy fail به دلیل cluster/wallet

چک:

```bash
solana config get
```

باید شبیه این باشد:

- RPC URL: devnet
- Keypair Path: `~/.config/solana/devnet.json`

اگر تست روی local validator اجرا شد:

```bash
export ANCHOR_PROVIDER_URL="https://api.devnet.solana.com"
export ANCHOR_WALLET="$HOME/.config/solana/devnet.json"
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/sat
anchor test --skip-local-validator
```

---

## 5) 🌐 Raydium API 403 / null

راه‌حل عمومی (همان کاری که در پروژه انجام شده):

 - از `RPC-only` استفاده می‌شود.
 - در کلاس فقط `MODE=quote` اجرا می‌شود تا نیاز به ارسال تراکنش نباشد.

اگر quote هم fail شد:

- نمایش به Explorer و توضیح معماری منتقل می‌شود:

```bash
echo "Raydium Pool: https://explorer.solana.com/address/4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf?cluster=devnet"
echo "Create Pool Tx: https://explorer.solana.com/tx/2UL7qT9nH8Ch9G2WQCFMH86KvpjJyzAF6Amfj5bF4oBLv1RBUBbETnGrXzq3fCQiKtfUh6UtyB8LGTEY1zGBFJF7?cluster=devnet"
```

---

## 6) سریع‌ترین چک سلامت قبل کلاس (۳۰ ثانیه)

```bash
solana config get
solana balance
solana address
``` 
