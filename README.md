# Aral SetBot

پنل تک‌فایلی برای تنظیم و بررسی وبهوک ربات تلگرام روی Cloudflare Workers.

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Telegram](https://img.shields.io/badge/Telegram-Bot%20API-26A5E4?logo=telegram&logoColor=white)](https://core.telegram.org/bots/api)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Telegram](https://img.shields.io/badge/Telegram-%40AralDev-26A5E4?logo=telegram&logoColor=white)](https://t.me/AralDev)
[![GitHub](https://img.shields.io/badge/GitHub-Aral--Dev-181717?logo=github&logoColor=white)](https://github.com/Aral-Dev)

## معرفی

Aral SetBot یک پنل سبک برای تنظیم وبهوک ربات‌های تلگرام است.

پروژه روی Cloudflare Workers اجرا می‌شود و برای استفاده به build یا فایل‌های جانبی نیاز ندارد.

## ویژگی‌ها

- تنظیم خودکار Webhook ربات تلگرام
- نمایش و بررسی مراحل `getMe`، `setWebhook` و `getWebhookInfo`
- نمایش یا مخفی‌کردن توکن ربات
- رابط کاربری فارسی، راست‌چین و ریسپانسیو
- طراحی سایبرپانک با اجرای تک‌فایلی
- بدون نیاز به Build یا فریم‌ورک اضافی

## پیش‌نیازها

| مورد | نیاز |
|---|---|
| Cloudflare | حساب Cloudflare با دسترسی به Workers |
| Telegram | یک Bot Token معتبر از BotFather |

## راه‌اندازی

### روش اول: پنل Cloudflare

1. وارد بخش **Workers & Pages** شوید.
2. یک Worker جدید بسازید.
3. محتوای `AralSetBot.js` را در کد Worker قرار دهید.
4. Worker را Deploy کنید.

### روش دوم: Wrangler CLI

پس از نصب و ورود به Cloudflare، فایل Worker را در پروژه قرار دهید و با Wrangler اجرا کنید:

```bash
npx wrangler deploy
```

## روش استفاده

1. آدرس Worker را باز کنید.
2. توکن ربات را از BotFather وارد کنید.
3. آدرس HTTPS مربوط به Worker مقصد را وارد کنید.
4. روی **ست کردن وبهوک** کلیک کنید.
5. نتیجه مراحل و وضعیت وبهوک نمایش داده می‌شود.

## مستندات API

### `POST /api/setup`

برای تنظیم و بررسی وبهوک استفاده می‌شود.

#### Request

```http
POST /api/setup
Content-Type: application/json
```

```json
{
  "token": "123456789:AAxxxxxxxxxxxxxxxx",
  "url": "https://example.workers.dev"
}
```

#### پارامترها

| پارامتر | نوع | توضیح |
|---|---|---|
| `token` | string | توکن ربات تلگرام |
| `url` | string | آدرس HTTPS وبهوک |

#### Response موفق

```json
{
  "ok": true,
  "error": null,
  "steps": [
    { "name": "getMe", "ok": true },
    { "name": "setWebhook", "ok": true },
    { "name": "getWebhookInfo", "ok": true }
  ],
  "botInfo": {
    "first_name": "My Bot",
    "username": "my_bot"
  },
  "finalUrl": "https://example.workers.dev"
}
```

تنظیمات `setWebhook`:

```json
{
  "allowed_updates": [
    "message",
    "callback_query"
  ],
  "drop_pending_updates": true,
  "max_connections": 40
}
```

## امنیت

- توکن فقط برای ارتباط با Telegram Bot API استفاده می‌شود.
- توکن در رابط کاربری ذخیره نمی‌شود.
- پاسخ‌های API با `Cache-Control: no-store` ارسال می‌شوند.
- پنل **بدون احراز هویت** است و نباید بدون محدودسازی دسترسی در معرض استفاده عمومی قرار گیرد.

## لایسنس

این پروژه تحت لایسنس **MIT** منتشر شده است.

برای جزئیات، فایل `LICENSE` را مطالعه کنید.

---

### ARAL

- GitHub: [Aral-Dev](https://github.com/Aral-Dev)
- Telegram: [@AralDev](https://t.me/AralDev)
- YouTube: [@Aral-Dev](https://youtube.com/@Aral-Dev)

> هشدار امنیتی: پنل بدون احراز هویت است. در صورت عمومی بودن آدرس، دسترسی آن را محدود کنید.
