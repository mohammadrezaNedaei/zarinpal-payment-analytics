import { PagePlaceholder } from "@/components/layout/page-placeholder";

export function TracePage() {
  return (
    <PagePlaceholder
      title="ردیابی محاسبات"
      description="هر KPI و بینش تا تعریف، فیلترها، صورت و مخرج، پوشش داده و شواهد قابل ردیابی است. این صفحه در Task 9 ساخته می‌شود."
      plannedModules={[
        { title: "تعریف معیار", description: "نام، نسخه تعریف، فرمول انسانی و سطح محاسبه (سشن یا تلاش)." },
        { title: "فیلترها و پوشش", description: "فیلترهای اعمال‌شده، تعداد رکورد ورودی/خروجی و missing-data coverage." },
        { title: "جدول شواهد", description: "نمونه رکوردهای پشتیبان با pagination منطبق بر قرارداد trace خروجی." },
      ]}
    />
  );
}