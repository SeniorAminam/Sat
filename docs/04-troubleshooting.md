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

<div align="center">

# 🧯 عیب‌یابی سریع (روز کلاس)

### 🛡️ حل مشکلات رایج در کمتر از ۳۰ ثانیه

---

**ارائه‌دهنده:** [امین داوودیان](https://senioramin.com) | [@SeniorAminam](https://github.com/SeniorAminam)

</div>

---

## ✅ چک سلامت ۳۰ ثانیه‌ای (قبل از شروع)

```bash
# کپی/پیست کامل این بلاک داخل WSL
solana config set --url devnet
solana config set --keypair ~/.config/solana/devnet.json
solana config get
solana address
solana balance

test -f ~/.config/solana/devnet.json && echo "✅ OK: devnet keypair exists" || echo "❌ MISSING: keypair"

export ANCHOR_PROVIDER_URL="https://api.devnet.solana.com"
export ANCHOR_WALLET="$HOME/.config/solana/devnet.json"
echo "ANCHOR_PROVIDER_URL=$ANCHOR_PROVIDER_URL"
echo "ANCHOR_WALLET=$ANCHOR_WALLET"

export SOLANA_KEYPAIR_PATH="$HOME/.config/solana/devnet.json"
export SOLANA_RPC_URL="https://api.devnet.solana.com"
echo "SOLANA_KEYPAIR_PATH=$SOLANA_KEYPAIR_PATH"
echo "SOLANA_RPC_URL=$SOLANA_RPC_URL"
```

**انتظار داریم:**

<div align="center">

| چک | مقدار مورد انتظار |
|---|---|
| RPC URL | `https://api.devnet.solana.com` |
| Keypair Path | `~/.config/solana/devnet.json` |
| Balance | >= 1 SOL |
| Keypair exists | ✅ OK |

</div>

---

## 🔴 خطاهای رایج و راه‌حل فوری

### ❌ خطا ۱: اجرای Solana در PowerShell (به جای WSL)

```
┌──────────────────────────────────────────────────────────┐
│             ❌ اشتباه رایج شماره ۱                       │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ❌ غلط: اجرا در PowerShell                              │
│  PS C:\> solana --version                                │
│                                                           │
│  ✅ درست: اجرا در WSL                                    │
│  $ solana --version                                       │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**راه‌حل:**

```bash
# در PowerShell ویندوز:
wsl

# سپس در WSL:
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token
```

---

### ❌ خطا ۲: Airdrop Failed یا کمبود SOL

```
┌──────────────────────────────────────────────────────────┐
│                  💧 مشکل: کمبود SOL                      │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  Error: airdrop request failed                           │
│  یا                                                       │
│  Insufficient funds for fee                              │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**راه‌حل:**

```bash
# چک بالانس
solana balance

# درخواست airdrop
solana airdrop 2

# اگر fail شد، ۲ دقیقه صبر کن و دوباره
sleep 120 && solana airdrop 2
```

> [!TIP]
> 💡 **Plan B:** همه‌چیز از قبل با SOL کافی آماده است. فقط Explorer نشان بده!

---

### ❌ خطا ۳: Version Mismatch (Anchor/Rust/Solana)

```
┌──────────────────────────────────────────────────────────┐
│              🔄 مشکل: نسخه ناسازگار                      │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  Error: incompatible version                             │
│  یا                                                       │
│  thread 'main' panicked at ...                           │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**چک:**

```bash
solana --version   # باید 2.x.x باشد
anchor --version   # باید 0.32.x باشد
rustc --version    # باید 1.89+ باشد
```

> [!NOTE]
> پروژه `sat/` دارای `rust-toolchain.toml` است که نسخه Rust را 1.89.0 پین کرده.

---

### ❌ خطا ۴: Anchor Test روی Localnet (به جای Devnet)

```
┌──────────────────────────────────────────────────────────┐
│             🌐 مشکل: cluster اشتباه                      │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  علائم:                                                  │
│  • شروع شدن local-validator                              │
│  • آدرس‌های جدید و ناشناخته                              │
│  • موجود نبودن داده‌های Devnet                           │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**راه‌حل:**

```bash
# تنظیم متغیرهای محیطی
export ANCHOR_PROVIDER_URL="https://api.devnet.solana.com"
export ANCHOR_WALLET="$HOME/.config/solana/devnet.json"

# اجرای تست با skip-local-validator
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token/sat
anchor test --skip-local-validator
```

---

### ❌ خطا ۵: Raydium API 403 / null

```
┌──────────────────────────────────────────────────────────┐
│              🌐 مشکل: Raydium API                        │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  Error: 403 Forbidden                                    │
│  یا                                                       │
│  Cannot read property 'xxx' of null                      │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**راه‌حل:**

- ما از **RPC-only** استفاده کرده‌ایم
- در کلاس فقط `MODE=quote` اجرا کن

```bash
export MODE="quote"
yarn dev src/cpmm/swap.ts
```

> [!WARNING]
> اگر باز هم fail شد، سریع به Explorer links برو!

**Plan B:**

```bash
echo "🌊 Pool: https://explorer.solana.com/address/4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf?cluster=devnet"
```

---

### ❌ خطا ۶: Keypair Not Found

```
┌──────────────────────────────────────────────────────────┐
│              🔑 مشکل: Keypair گم شده                    │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  Error: No such file or directory:                       │
│  /home/user/.config/solana/devnet.json                   │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

**راه‌حل:**

```bash
# ساخت keypair جدید
solana-keygen new --outfile ~/.config/solana/devnet.json

# تنظیم
solana config set --keypair ~/.config/solana/devnet.json

# گرفتن SOL
solana airdrop 2
```

---

## 🛟 Plan B های Ultimate

### 🆘 همه‌چیز خراب شد؟

```bash
# فقط این لینک‌ها را باز کن و توضیح بده!
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Program:"
echo "https://explorer.solana.com/address/GoyGGBpwUQYxoicpFRiNQ8k8qKk1myVRDkiiLvXaT1jg?cluster=devnet"
echo ""
echo "🪙 SAT Mint:"
echo "https://explorer.solana.com/address/CJG3HkzGDshcrZ3XkERcM4wA4opZfJC81EuTfmzKSrnv?cluster=devnet"
echo ""
echo "🌊 Raydium Pool:"
echo "https://explorer.solana.com/address/4dhEUxwSA2BrEmYHQU5Kn7YZD73c9R9W8iM8HLYqqZqf?cluster=devnet"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

---

## 📊 خلاصه سریع

<div align="center">

| مشکل | راه‌حل فوری |
|---|---|
| PowerShell به جای WSL | `wsl` |
| کمبود SOL | `solana airdrop 2` |
| Version mismatch | چک نسخه‌ها |
| Localnet به جای Devnet | `--skip-local-validator` |
| Raydium 403 | `MODE=quote` یا Explorer |
| Keypair گم شده | `solana-keygen new` |
| همه‌چیز خراب | Explorer links! |

</div>

---

<div align="center">

### 🎓 قانون طلایی

> **اگر چیزی fail شد، کلاس متوقف نشود!**  
> **سریع به Plan B برو: Explorer + توضیح معماری** 📖

---

**[← Raydium CPMM](03-raydium-cpmm.md)** | **[فهرست مستندات](index.md)** | **[GitHub Publish →](05-github-publish.md)**

---

**Built with ❤️ by [Amin Davodian](https://senioramin.com)**

</div>
