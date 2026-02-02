# 🎓 Educational Blog - MVC + REST API Project

**یک پروژه کامل وبلاگ آموزشی**  
ساخته‌شده با **جاوااسکریپت خالص** و معماری **MVC**، برای یادگیری اصول مهندسی نرم‌افزار

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/mohammadhossein-sa/simple-weblog-mvc.git)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/Educational-Project-purple?style=for-the-badge)](./LICENSE)

## ✨ ویژگی‌های کلیدی

| دسته‌بندی | امکانات |
|-----------|---------|
| **🏗 معماری** | MVC خالص + الگوی Observer |
| **🔧 عملیات** | CRUD کامل + RESTful API |
| **🎨 رابط کاربری** | واکنش‌گرا + Modal ویرایش + Toast |
| **🛡 اعتبارسنجی** | بررسی عنوان (≥۳) و محتوا (≥۱۰) کاراکتر |
| **⚡ عملکرد** | لودینگ هوشمند + مدیریت خطا |
| **📁 ذخیره‌سازی** | JSON File + بدون نیاز به دیتابیس |

## 🚀 شروع سریع

### پیش‌نیازها
- Node.js نسخه ۱۴ یا بالاتر
- npm یا yarn

### نصب و اجرا

```bash
# 1. کلون کردن پروژه
git clone https://github.com/mohammadhossein-sa/simple-weblog-mvc.git
cd simple-weblog-mvc

# 2. نصب وابستگی‌ها
npm install

# 3. اجرای پروژه
npm start          # حالت تولید
npm run dev        # حالت توسعه (توصیه می‌شود)
```

سپس مرورگر خود را باز کنید و به آدرس زیر بروید:
```
http://localhost:3001
```

## 📁 ساختار پروژه

```
simple-weblog-mvc/
├── 📂 css/
│   └── style.css           # استایل‌های مدرن و واکنش‌گرا
├── 📂 js/
│   ├── model.js            # لایه داده - API و اعتبارسنجی
│   ├── view.js             # لایه نمایش - رندرینگ و UI
│   ├── controller.js       # لایه منطق - هماهنگ‌کننده
│   └── app.js              # راه‌اندازی و Observer
├── 📜 index.html           # نقطه ورود اصلی
├── 📜 server.js            # سرور Express.js
├── 📜 package.json
└── 📜 README.md
```

## 🏛 نمای معماری

### MVC + Observer Pattern

```
┌─────────────────────────────────────────────────┐
│                    View                         │
│  • رندرینگ UI                                  │
│  • فرم‌ها و Modal                              │
│  • نمایش پیام‌ها                               │
└───────────────┬─────────────────────────────────┘
                │
                │ Event Trigger
                ▼
┌─────────────────────────────────────────────────┐
│               Controller                         │
│  • مدیریت منطق کسب‌وکار                        │
│  • هماهنگی Model ↔ View                        │
│  • پردازش رویدادها                             │
└───────────────┬─────────────────────────────────┘
                │
                │ Data Request/Update
                ▼
┌─────────────────────────────────────────────────┐
│                    Model                         │
│  • ارتباط با API                                │
│  • اعتبارسنجی داده                             │
│  • مدیریت State                                │
└─────────────────────────────────────────────────┘
```

### Observer Pattern
- Model تغییرات داده را اطلاع‌رسانی می‌کند
- View تعاملات کاربر را گزارش می‌دهد
- Controller همه‌چیز را هماهنگ می‌کند

## 🔌 REST API Endpoints

| متد | مسیر | توضیحات | کد پاسخ |
|-----|------|---------|---------|
| `GET` | `/api/posts` | دریافت همه پست‌ها | `200 OK` |
| `POST` | `/api/posts` | ایجاد پست جدید | `201 Created` |
| `PUT` | `/api/posts/:id` | ویرایش پست | `200 OK` |
| `DELETE` | `/api/posts/:id` | حذف پست | `204 No Content` |

**مثال پاسخ API (ایجاد پست):**
```json
{
  "id": 14,
  "title": "اولین پست من در وبلاگ",
  "content": "این یک معرفی ساده از وبلاگ من با معماری MVC است.",
  "author": "محمدحسین",
  "createdAt": "2026-02-02T08:54:20.000Z"
}
```

## 🛠 تکنولوژی‌های استفاده‌شده

### فرانت‌اند
- **JavaScript خالص** (ES6+، async/await، fetch)
- **HTML5 & CSS3** (Flexbox، Grid، Variables، Animations)
- **الگوهای طراحی** (Observer/Pub-Sub، MVC)
- **مدیریت DOM** و رویدادها

### بک‌اند
- **Node.js** با **Express.js**
- **JSON File Persistence** (سبک و بدون نیاز به دیتابیس)

### مفاهیم آموزشی
- جداسازی مسئولیت‌ها (SoC)
- برنامه‌نویسی واکنش‌گرا
- طراحی APIهای RESTful
- مدیریت خطا و بازخورد کاربر
- رابط کاربری دسترس‌پذیر

## 📚 دستاوردهای یادگیری

این پروژه به عنوان بخشی از درس **مهندسی نرم‌افزار** توسعه یافته تا مفاهیم زیر را نمایش دهد:

✅ **ساختاردهی برنامه‌های بزرگ جاوااسکریپت بدون فریم‌ورک**  
✅ **کاربرد عملی الگوهای طراحی (MVC + Observer)**  
✅ **مدیریت State و ارتباط با API**  
✅ **توسعه تدریجی و دیباگینگ**  
✅ **توجه به تجربه کاربری (UX) و بازخورد بصری**

## 🧩 اسکریپت‌های توسعه

```bash
# اجرای سرور در حالت Production
npm start

# اجرای سرور در حالت Development با ری‌لود خودکار
npm run dev
```

## 👤 نویسنده و مجوز

**👨‍💻 محمدحسین سالملیان**  
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?style=flat&logo=github)](https://github.com/mohammadhossein-sa)  
[![Repository](https://img.shields.io/badge/Repository-Link-green?style=flat)](https://github.com/mohammadhossein-sa/simple-weblog-mvc.git)

---

**📌 نکته:** این پروژه با هدف **آموزشی** و نمایش مفاهیم مهندسی نرم‌افزار توسعه یافته است.  
ساخته‌شده با ❤️ برای جامعه توسعه‌دهندگان - بهمن ۱۴۰۴