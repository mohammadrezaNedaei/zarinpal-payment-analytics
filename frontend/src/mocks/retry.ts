/**
 * فیکسچر تحلیل تلاش مجدد.
 *
 * ⚠️ داده «نمایشی» برای طراحی رابط است؛ اعداد واقعی نیستند.
 */

import type { RetryAnalysis } from "@/api/types";

export const mockRetryAnalysis: RetryAnalysis = {
  retryRate: {
    name: "retry_rate",
    definitionVersion: "retry_v1",
    value: 0.24,
    baseline: 0.22,
    absoluteChange: 0.02,
    relativeChange: 0.091,
    unit: "percent",
  },
  recoveryRate: {
    name: "retry_recovery_rate",
    definitionVersion: "retry_v1",
    value: 0.58,
    baseline: 0.54,
    absoluteChange: 0.04,
    relativeChange: 0.074,
    unit: "percent",
  },
  recoveredAmount: 415_000_000,
  currency: "IRR",
  atRiskAmount: 310_000_000,
};