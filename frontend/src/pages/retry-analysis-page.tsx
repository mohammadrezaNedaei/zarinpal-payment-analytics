import { PagePlaceholder } from "@/components/layout/page-placeholder";

export function RetryAnalysisPage() {
  return (
    <PagePlaceholder
      title="تحلیل تلاش مجدد"
      description="روند بازیابی سشن‌های ناموفق پس از تلاش مجدد و تأثیر آن بر فروش. این صفحه در Task 7 ساخته می‌شود."
      plannedModules={[
        { title: "کارت‌های بازیابی", description: "نرخ تلاش مجدد، نرخ بازیابی و مبلغ بازیابی‌شده." },
        { title: "جدول تفکیکی", description: "وضعیت تلاش‌ها به تفکیک PSP، بانک صادرکننده و کد پاسخ." },
        { title: "حالت‌های توضیحی", description: "نمایش بارگذاری، نبود داده و خطا برای هر بخش." },
      ]}
    />
  );
}