import { PagePlaceholder } from "@/components/layout/page-placeholder";

export function PaymentHealthPage() {
  return (
    <PagePlaceholder
      title="سلامت پرداخت و قیف"
      description="نرخ موفقیت، مقایسه PSP و قیف پرداخت از تلاش تا موفقیت. این صفحه در Task 6 ساخته می‌شود."
      plannedModules={[
        { title: "نرخ موفقیت", description: "روند موفقیت سشن‌ها به تفکیک بازه و مقایسه با دوره قبل." },
        { title: "مقایسه PSP", description: "سهم و عملکرد PSPها با نمایش صریح وضوح داده." },
        { title: "قیف پرداخت", description: "از شروع سشن تا موفقیت نهایی؛ تفکیک دلیل توقف در هر مرحله." },
        { title: "مبلغ در معرض ازدست‌رفتن", description: "جداسازی «بالقوه در معرض خطر» از زیان قطعی، طبق سند Backend." },
      ]}
    />
  );
}