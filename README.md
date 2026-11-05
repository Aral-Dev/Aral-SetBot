<div align="center">

# 🔥 Aral SetBot

**پنل حرفه‌ای ست کردن وبهوک ربات تلگرام روی Cloudflare Workers**

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Telegram Bot API](https://img.shields.io/badge/Telegram-Bot%20API-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://core.telegram.org/bots/api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[![Telegram](https://img.shields.io/badge/Telegram-@AralDev-26A5E4?style=flat-square&logo=telegram&logoColor=white)](https://t.me/AralDev)
[![YouTube](https://img.shields.io/badge/YouTube-@Aral--Dev-FF0000?style=flat-square&logo=youtube&logoColor=white)](https://youtube.com/@Aral-Dev)
[![GitHub](https://img.shields.io/badge/GitHub-Aral--Dev-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Aral-Dev)

</div>

---

## 📖 معرفی

**Aral SetBot** یک پنل تک‌فایلی، سبک و کاملاً فارسی برای **ست کردن وبهوک ربات تلگرام** روی **Cloudflare Workers** است. با رابط کاربری سایبرپانک و طراحی اختصاصی **ARAL CF Design System**، تنها با وارد کردن توکن ربات و آدرس Worker، وبهوک را به‌صورت خودکار ست، تأیید و ری‌استارت می‌کند — بدون ترمینال و بدون دردسر.

### ✨ ویژگی‌ها

- 🎨 **طراحی سایبرپانک اختصاصی** — تم ARAL CF با افکت‌های گلیچ، رادار، اسکن‌لاین و گرید
- 🌐 **کاملاً فارسی و RTL** — با فونت زیبای Vazirmatn + JetBrains Mono + Orbitron
- 🔐 **ست کردن امن وبهوک** — تمام درخواست‌ها سمت سرور Worker ارسال می‌شوند
- 👁 **نمایش / مخفی‌کردن توکن** — دکمه چشم برای مدیریت راحت توکن
- ✅ **تأیید خودکار** — پس از ست شدن، وبهوک با `getWebhookInfo` تأیید می‌شود
- 📊 **نمایش جزئیات مراحل** — مشاهده گام‌به‌گام `getMe`، `setWebhook` و `getWebhookInfo`
- 🤖 **نمایش اطلاعات ربات** — نام و یوزرنیم ربات پس از ست شدن
- 📱 **کاملاً ریسپانسیو** — بهینه برای موبایل و دسکتاپ
- 🪶 **تک‌فایلی** — بدون نیاز به build یا پکیج اضافه
- ⚡ **پری‌لودر انیمیشنی** — تجربه بارگذاری حرفه‌ای با افکت گلیچ

---

## 🚀 راه‌اندازی سریع

### پیش‌نیازها

- یک حساب [Cloudflare](https://dash.cloudflare.com/sign-up) (رایگان)
- یک ربات تلگرام ساخته‌شده با [@BotFather](https://t.me/BotFather)

### روش ۱: دیپلوی از پنل Cloudflare (ساده‌ترین)

1. وارد [پنل Cloudflare Workers](https://dash.cloudflare.com/) شوید
2. روی **Create Application** → **Create Worker** کلیک کنید
3. کد موجود در فایل `AralSetBot.js` را کامل کپی کرده و در ادیتور جایگزین کنید
4. روی **Deploy** کلیک کنید
5. آدرس Worker خود را (مثلاً `https://aral-setbot.username.workers.dev`) کپی کنید

### روش ۲: دیپلوی با Wrangler CLI

```bash
# نصب wrangler
npm install -g wrangler

# ورود به حساب
wrangler login

# دیپلوی
wrangler deploy AralSetBot.js --name aral-setbot