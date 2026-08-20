import { PagePlaceholder } from "@/components/layout/page-placeholder";

export function InsightsPage() {
  return (
    <PagePlaceholder
      title="بینش‌ها"
      description="تغییرهای معنادار، اثر مالی و اقدام‌های پیشنهادی بر پایه قرارداد استاندارد Insight در سند Backend. این صفحه در Task 8 ساخته می‌شود."
      plannedModules={[
        { title: "لیست بینش‌ها", description: "فیلتر بر اساس شدت و نوع؛ اولویت‌بندی بر اساس اثر مالی." },
        { title: "جزئیات بینش", description: "خلاصه، معیار و baseline، تخمین اثر مالی، عوامل مرتبط و اقدام پیشنهادی." },
        { title: "پشتیبانی از trace", description: "دسترسی مستقیم به trace و شواهد هر بینش." },
      ]}
    />
  );
}