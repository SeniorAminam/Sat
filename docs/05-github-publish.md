<!--
Project: Solana Token Workshop (SAT)
File: docs/05-github-publish.md
Author: Amin Davodian (Mohammadamin Davodian)
Website: https://senioramin.com
LinkedIn: https://linkedin.com/in/SudoAmin
GitHub: https://github.com/SeniorAminam
Created: 2025-12-27

Purpose: Steps to publish this folder as a GitHub repo and present docs from GitHub.
Developed by Amin Davodian
-->

# 📦 ساخت ریپو GitHub و انتشار

هدف: ساخت ریپو، push کردن محتوا، و نمایش مستندات از روی فایل‌های `docs/`.

نکته مهم: من این راهنما را طوری نوشته‌ام که اشتباه رایج «`git init` داخل فولدر اشتباه» تکرار نشود.

---

## 1) پیشنهاد ساختار ریپو

روت ریپو:

- `README.md` (ساخته شد)
- `docs/` (داکیومنت‌های انتشار)
- `sat/` (Anchor project)
- `raydium-sdk-V2-demo/` (TypeScript scripts)

---

## 2) نکته مهم: node_modules در ریپو push نمی‌شود

در روت ریپو `.gitignore` اضافه شد تا:

- `node_modules/`
- `target/`
- `.anchor/`

و... push نمی‌شود.

---

## 3) ایجاد ریپو روی GitHub

در GitHub:

- New repository
- اسم پیشنهادی:
  - `solana-token-workshop-sat`
- Public
- بدون اضافه کردن README (چون داخل پروژه داریم)

---

## 4) push کردن (گزینه CLI)

این بخش را می‌توان داخل WSL یا Git Bash اجرا کرد.

### 4.1) اول مطمئن شو دقیقاً در روت پروژه هستی

**روت درست این ریپو باید این‌ها را داشته باشد:**

- `README.md`
- `docs/`
- `sat/`
- `raydium-sdk-V2-demo/`

داخل WSL:

```bash
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token
pwd
ls
```

اگر خروجی `ls` این فولدرها را نشان نداد، یعنی در مسیر اشتباه هستی و نباید ادامه بدهی.

### 4.2) نکته حیاتی: `.git` های داخلی را submodule نکن

چون داخل `sat/` و `raydium-sdk-V2-demo/` پوشه‌ی `.git` وجود دارد، اگر بدون تغییر جلو برویم این‌ها submodule می‌شوند.

راه امن و قابل برگشت (فقط rename به بکاپ):

```bash
mv sat/.git sat/.git.bak
mv raydium-sdk-V2-demo/.git raydium-sdk-V2-demo/.git.bak
```

### 4.3) init و commit

در روت پروژه:

```bash
cd /mnt/d/Amin/Projects/Programming/Telegram/Bots/Tests/Solana/Token
git init -b main
git add .
git commit -m "Add SAT workshop (docs + projects)"
```

### 4.4) set remote و push

```bash
git remote add origin https://github.com/SeniorAminam/Sat.git
git push -u origin main
```

اگر قبلاً remote را با حروف کوچک اضافه کرده بودی و GitHub پیام “This repository moved” داد:

```bash
git remote set-url origin https://github.com/SeniorAminam/Sat.git
```

---

## 5) نمایش مستندات از روی GitHub

در انتشار مستندات:

- صفحه ریپو باز می‌شود.
- فایل `docs/index.md` باز می‌شود.
- طبق Runbook پیش می‌رود.

پیشنهاد:

- یک tab جدا برای Solana Explorer باز باشد.
- یک tab جدا برای GitHub docs باز باشد.
