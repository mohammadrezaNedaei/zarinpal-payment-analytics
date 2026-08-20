/**
 * لایه آداپتر داده.
 *
 * این ماژول تنها جایی است که صفحات از آن داده می‌گیرند. الان جواب‌ها از
 * فیکسچرهای mock خوانده می‌شود. برای اتصال به API واقعی (Django)، هر
 * فانکشن را با fetch جایگزین کنید؛ شکل خروجی (`api/types.ts`) تغییری نمی‌کند
 * و صفحات Dashboard نیاز به تغییر ندارند.
 *
 * مسیر APIهای آینده (طبق BACKEND_IMPLEMENTATION_SPEC بخش 14):
 *   GET /api/v1/merchants
 *   GET /api/v1/merchants/{merchant_key}/overview
 *   GET /api/v1/merchants/{merchant_key}/payment-health
 *   GET /api/v1/merchants/{merchant_key}/funnel
 *   GET /api/v1/merchants/{merchant_key}/retry-analysis
 *   GET /api/v1/merchants/{merchant_key}/insights
 *   GET /api/v1/insights/{insight_id}
 *   GET /api/v1/insights/{insight_id}/trace
 */

import type {
  Insight,
  Merchant,
  Overview,
  PaymentHealth,
  RetryAnalysis,
  Trace,
} from "@/api/types";
import { mockInsights, mockMerchants, mockOverview, mockPaymentHealth, mockRetryAnalysis, mockTrace } from "@/mocks";

/**
 * قرارداد ورودی مشترک: همه فانکشن‌ها فقط داده‌های فعلی را برمی‌گردانند.
 * برای نگه‌داشتن سادگی، هیچ پارامتری هنوز اعمال نمی‌شود؛
 * وقتی API واقعی آمد، paramsها به query-string تبدیل می‌شوند.
 */
export type QueryParams = {
  merchantKey?: string;
  dateFrom?: string;
  dateTo?: string;
};

export async function getMerchants(): Promise<Merchant[]> {
  return mockMerchants;
}

// نکته: پارامترهای QueryParams تا اتصال به API واقعی استفاده نمی‌شوند؛
// پیشوند `_` نشان‌گر عمدی بودن این موضوع است (noUnusedParameters).
// وقتی fetch اضافه شد، همین پارامترها به query-string تبدیل می‌شوند.

export async function getOverview(_params: QueryParams = {}): Promise<Overview> {
  return mockOverview;
}

export async function getPaymentHealth(_params: QueryParams = {}): Promise<PaymentHealth> {
  return mockPaymentHealth;
}

export async function getFunnel(_params: QueryParams = {}): Promise<PaymentHealth["funnel"]> {
  return mockPaymentHealth.funnel;
}

export async function getRetryAnalysis(_params: QueryParams = {}): Promise<RetryAnalysis> {
  return mockRetryAnalysis;
}

export async function getInsights(_params: QueryParams = {}): Promise<Insight[]> {
  return mockInsights;
}

export async function getInsightDetail(insightId: string): Promise<Insight> {
  const insight = mockInsights.find((item) => item.id === insightId);
  if (insight === undefined) {
    throw new Error(`بینش با شناسه «${insightId}» یافت نشد.`);
  }
  return insight;
}

export async function getInsightTrace(_insightId: string): Promise<Trace> {
  // در نسخه mock، trace مستقل از insightId است تا رابط ساده بماند.
  // وقتی API واقعی آمد، همین شناسه به مسیر Trace ارسال می‌شود.
  return mockTrace;
}

export async function getTrace(_params: QueryParams = {}): Promise<Trace> {
  return mockTrace;
}