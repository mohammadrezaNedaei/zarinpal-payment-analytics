import { PagePlaceholder } from "@/components/layout/page-placeholder";

export function OverviewPage() {
  return (
    <PagePlaceholder
      title="نمای کلی پذیرنده"
      description="خلاصه شاخص‌های کلیدی پرداخت، سلامت کلی و بینش‌های اخیر. این صفحه در Task 5 با داده‌های mock ساخته می‌شود."
      plannedModules={[
        { title: "کارت‌های KPI", description: "فروش موفق، نرخ موفقیت، نرخ تلاش مجدد و مبلغ در معرض ازدست‌رفتن." },
        { title: "خلاصه سلامت پرداخت", description: "روند نرخ موفقیت نسبت به دوره قبل با baseline مشخص." },
        { title: "بینش‌های اخیر", description: "پررنگ‌ترین تغییرها با اولویت‌بندی شدت." },
        { title: "روند اصلی", description: "نمودار زمانی فروش و نرخ موفقیت با سطوح مقایسه." },
      ]}
    />
  );
}