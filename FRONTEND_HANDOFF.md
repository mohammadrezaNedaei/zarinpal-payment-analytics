# سند تحویل فرانت‌اند — وضعیت فعلی

**پروژه:** داشبورد تحلیل پرداخت زرین‌پال
**تاریخ:** 2026-08-20
**دامنه این سند:** فقط کارهای انجام‌شده تا پایان Task 4 فرانت‌اند؛ هیچ Backend یا API واقعی پیاده‌سازی نشده است.

## 1. وضعیت اجرایی

فرانت‌اند در مسیر `frontend/` قرار دارد و با React، Vite، TypeScript، Tailwind CSS v4 و Shadcn UI آماده شده است.

برای اجرای محلی:

```powershell
cd D:\documents\Ahackathon\zarinpal\frontend
npm run dev
```

سپس آدرس نمایش‌داده‌شده توسط Vite (معمولاً `http://localhost:5173`) را در مرورگر باز کنید. برای build نهایی:

```powershell
npm run build
```

آخرین build در زمان تحویل Task 2 موفق بوده است. build پس از Task 3 به‌دلیل عدم دسترسی محیط اجرا (VM با خطای VM_DISK_SPACE_INSUFFICIENT) هنوز اجرا نشده؛ به‌محض دسترسی باید `npm run build` اجرا و نتیجه تأیید شود.

## 2. تصمیم‌های قطعی

- **زبان رابط:** فارسی و RTL.
- **نوع محصول:** داشبورد تحلیلی پرداخت؛ فعلاً مستقل از Backend.
- **پشته:** React + Vite + TypeScript + Tailwind CSS v4 + Shadcn UI + react-router-dom (v7).
- **فونت:** `Vazirmatn Variable` به‌صورت محلی از پکیج `@fontsource-variable/vazirmatn`؛ به فونت نصب‌شده کاربر وابسته نیست.
- **تم:** dark data console با پس‌زمینه navy/slate، رنگ amber برای اقدام/تمرکز و destructive برای خطا. light mode خارج از scope.
- **آیکون‌ها:** فقط Lucide؛ emoji در رابط استفاده نمی‌شود.
- **داده:** تمام محتوای فعلی صرفاً نمایشی است و نباید به‌عنوان تحلیل واقعی تراکنش نمایش داده شود.
- **مسیرهای ناوبری:** منبع حقیقت `src/lib/navigation.ts` است؛ برای افزودن صفحه، فقط این ماژول و روت‌های `app.tsx` تغییر می‌کنند.
- **فیلترهای سراسری:** منبع حقیقت `src/lib/global-filters.tsx` است (Context + کنترل‌های Select).

## 3. کارهای تکمیل‌شده

### Task 1 — Foundation

- تبدیل starter اولیه Vite از TypeScript ساده به React + TypeScript.
- پیکربندی Vite برای React، Tailwind و alias `@/`.
- تنظیم سراسری `lang="fa"` و `dir="rtl"`.
- توکن‌های ظاهری dark theme در `src/style.css` و فونت سراسری Vazirmatn.
- فایل پیکربندی Shadcn UI، کامپوننت پایه `Button` و utility تابع `cn`.

### Task 2 — Design System

کامپوننت‌های Shadcn: `Alert`، `Badge`، `Button`، `Card`، `Input`، `Select`، `Skeleton`، `Tabs`، `Tooltip`.
کامپوننت اختصاصی `DataState` برای سه وضعیت `loading`، `empty` و `error`.
صفحه فعلی (`/design`) نمایشگاه داخلی Design System است.

### Task 3 — Application Shell (کامل)

- **Routing:** ۵ صفحه با مسیرهای منبع‌حقیقت `appRoutes` (overview=/، payment-health، retry-analysis، insights، trace) + مسیر `/design` + fallback `*`.
- **Sidebar راست (دسکتاپ `lg:block`):** دو بخش «تحلیل» و «اعتبارسنجی»؛ وضعیت active با `aria-current="page"`؛ برند نمایشی زرین‌پال (Mark صاعقه با Zap از Lucide — لوگوی واقعی هنوز اضافه نشده).
- **MobileNav (موبایل):** دکمه منو → Dialog تمام‌صفحه (Radix) با ناوبری فارسی؛ دکمه جست‌وجوی غیرفعال (شکل بدون action) با aria-label صریح.
- **TopBar:** نشان «داده نمایشی»، کنترل بازه زمانی و انتخاب پذیرنده به‌صورت نمایشی (Select)، دکمه icon-only شاخص سلامت با Tooltip و aria-label.
- **GlobalFilterProvider:** Context با `dateRangePreset` (۷/۳۰/۹۰ روز/دلخواه) و `merchantKey` — فقط state نمایشی، هنوز به داده متصل نیست.
- **PageHeader:** عنوان و توضیح هر صفحه از منبع ناوبری.
- **PagePlaceholder:** کامپوننت «در حال ساخت» با ماژول‌های برنامه‌ریزی‌شده هر صفحه + نشان فیلترهای فعلی — تضمین می‌کند هیچ صفحه‌ای به‌عنوان کامل تحویل داده نشود.
- **پنج صفحه placeholder:** overview، payment-health، retry-analysis، insights و trace — هر کدام با شرح ماژول‌های برنامه‌ریزی‌شده (Task 5 تا 9).

### Task 4 — Data Boundary و Mock Data (کامل)

- **قراردادهای TypeScript** در `src/api/types.ts`: `Merchant`، `KpiMetric`، `FunnelStage`، `RetryAnalysis`، `Insight` (دقیقاً طبق قرارداد استاندارد سند Backend بخش ۱۲)، `Trace` (بخش ۱۳)، `Overview`، `PaymentHealth`، `ApiError`، `DateRange`.
  - قواعد: درصد بین صفر و یک؛ مبلغ integer با currency جدا؛ `severity` از union محدود (`low|medium|high|critical`)؛ شمارش یک‌باره `session_key`؛ تفکیک «مبلغ در معرض ازدست‌رفتن» از زیان قطعی.
- **فیکسچرهای فارسی mock** در `src/mocks/`: `merchants.ts` (۳ پذیرنده ساختگی)، `insights.ts` (۳ بینش با severity/اثر مالی + trace با evidence و exclusionReasons)، `overview.ts` (KPIها + trend + recentInsights)، `retry.ts`، و `index.ts` به‌عنوان خروجی مرکزی.
  - ⚠️ همه data «نمایشی» است و در کد/file کامنت هشدار دارد.
- **لایه Adapter** در `src/api/adapter.ts`: فانکشن‌های async هم‌نام با APIهای آینده (`getMerchants`، `getOverview`، `getPaymentHealth`، `getFunnel`، `getRetryAnalysis`، `getInsights`، `getInsightDetail`، `getInsightTrace`، `getTrace`) که الان از mocks می‌خوانند. برای اتصال به Django فقط این فایل تغییر می‌کند؛ صفحات بدون تغییر می‌مانند.
- **گیت:** کارهای Task 4 در یک commit واحد ثبت شدند (Commit 2).

## 4. فایل‌های کلیدی

```text
frontend/
├── components.json                 # تنظیمات Shadcn UI
├── package.json                    # scripts و وابستگی‌ها
├── vite.config.ts                  # React، Tailwind و alias @/
├── index.html                      # HTML فارسی/RTL
└── src/
    ├── app.tsx                     # روت‌ها و AppShell (روتینگ react-router-dom)
    ├── main.tsx                    # React root + BrowserRouter
    ├── style.css                   # توکن‌های تم و font سراسری
    ├── lib/
    │   ├── utils.ts                # تابع cn
    │   ├── navigation.ts           # منبع حقیقت مسیرها و آیتم‌های ناوبری
    │   └── global-filters.tsx      # Context فیلترهای سراسری + کنترل‌های Select
    ├── api/
    │   ├── types.ts                # قراردادهای TypeScript (مرز داده، هماهنگ با Backend)
    │   └── adapter.ts              # لایه data access (mock امروز، fetch به Django در آینده)
    ├── mocks/
    │   ├── index.ts                # خروجی مرکزی فیکسچرها
    │   ├── merchants.ts            # پذیرنده‌های ساختگی
    │   ├── insights.ts             # بینش‌ها + trace
    │   ├── overview.ts             # KPIها + trend + recentInsights
    │   └── retry.ts                # تحلیل تلاش مجدد
    ├── components/
    │   ├── design-system-showcase.tsx
    │   ├── layout/
    │   │   ├── app-shell.tsx       # چیدمان کلی: Sidebar + MobileNav + TopBar + PageHeader
    │   │   ├── sidebar.tsx         # سایدبار دسکتاپ
    │   │   ├── mobile-nav.tsx      # منوی موبایل (Dialog)
    │   │   ├── top-bar.tsx         # هدر بالا + کنترل‌های mock
    │   │   └── page-placeholder.tsx# الگوی صفحه در حال ساخت
    │   └── ui/                     # کامپوننت‌های Shadcn + data-state
    └── pages/
        ├── overview-page.tsx
        ├── payment-health-page.tsx
        ├── retry-analysis-page.tsx
        ├── insights-page.tsx
        ├── trace-page.tsx
        └── design-page.tsx
```

## 5. قرارداد طراحی و کیفیت

- کامپوننت‌ها نام انگلیسی، محدود و تک‌مسئولیت‌اند؛ متن نمایشی فارسی است.
- توکن‌های رنگ و فونت فقط در `src/style.css`؛ رنگ خام در صفحات پراکنده نمی‌شود.
- Button حداقل 44px ارتفاع (`min-h-11` در buttonVariants)؛ دکمه icon-only دارای `aria-label`.
- ناوبری با keyboard قابل دسترسی است (لینک‌های واقعی + `aria-current`).
- وضعیت‌های loading، empty و error جدا نمایش داده می‌شوند (الزام شفافیت).
- RTL در کل چیدمان رعایت شده (sidebar راست، آیکون‌ها در سمت درست).
- الگوهای CLEAN_CODE_GUIDELINES در فرانت دنبال می‌شود: ماژول‌های تک‌قابلیت، منبع حقیقت واحد برای مسیرها، بدون abstraction بی‌مورد، نام‌های گویا.

## 6. محدودیت‌ها و نکات مهم

- Backend، API client، mock contract و داده‌های Dashboard هنوز ساخته نشده‌اند (Task 4 به بعد).
- **فایل‌های باقی‌مانده starter قدیمی Vite (`src/main.ts`، `src/counter.ts`، `src/assets/`) هنوز بلااستفاده‌اند و حذف نشده‌اند؛ cleanup مستقل لازم است.**
- لوگوی واقعی زرین‌پال اضافه نشده؛ برند فعلی Mark نمایشی است.
- build پس از Task 3 هنوز اجرا نشده (محدودیت VM)؛ باید در اولین فرصت `npm run build` اجرا شود.
- `main.tsx` جدید با BrowserRouter است؛ اگر هاست استاتیک باشد مسیرها نیاز به rewrites دارند (فعلاً dev و local کافی است).
- تم فعلی dark-only است.

## 7. گام پیشنهادی بعدی

**Task 5: Overview Dashboard**
- کارت‌های KPI (فروش موفق، نرخ موفقیت، نرخ تلاش مجدد، مبلغ در معرض ازدست‌رفتن) از طریق `getOverview` و `getInsights`.
- خلاصه سلامت پرداخت، بینش‌های اخیر و نمودار روند.
- حالت‌های loading، empty و error با `DataState`.

سپس به ترتیب Task 6 (Payment Health و Funnel)، Task 7 (Retry Analysis)، Task 8 (Insights)، Task 9 (Trace)، Task 10 (کیفیت و ریسپانسیو) و Task 11 (README و تحویل).

## 8. مستندات مرجع

- `BACKEND_IMPLEMENTATION_SPEC.md`: قراردادهای آینده API، insight و trace (مرجع Task 4 تا 9).
- `CLEAN_CODE_GUIDELINES.md`: قواعد کیفیت کد (نام‌گذاری، لایه‌بندی، type safety).
- این سند: وضعیت واقعی فرانت‌اند تا این لحظه.
