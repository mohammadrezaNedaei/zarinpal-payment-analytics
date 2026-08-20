import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Info, SlidersHorizontal } from "lucide-react";
import type { Trace } from "@/api/types";
import { getTrace } from "@/api/adapter";
import { useGlobalFilters } from "@/lib/global-filters";
import { TraceDetail } from "@/components/dashboard/trace-detail";
import { EvidenceTable } from "@/components/dashboard/evidence-table";
import { DataState } from "@/components/ui/data-state";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; trace: Trace };

export function TracePage() {
  const { insightId } = useParams<{ insightId: string }>();
  const { merchantKey, dateRangePreset } = useGlobalFilters();
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });

  const loadTrace = useCallback(async () => {
    setLoadState({ status: "loading" });
    try {
      const trace = insightId === undefined ? await getTrace({ merchantKey }) : await getTraceWithInsight(insightId);
      setLoadState({ status: "ready", trace });
    } catch (error) {
      setLoadState({ status: "error", message: error instanceof Error ? error.message : "خطای ناشناخته" });
    }
  }, [insightId, merchantKey, dateRangePreset]);

  useEffect(() => {
    void loadTrace();
  }, [loadTrace]);

  if (loadState.status === "loading") {
    return (
      <div className="flex flex-col gap-6" aria-label="در حال بارگذاری ردیابی محاسبه">
        <div className="grid gap-6 lg:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-56 rounded-lg border border-border bg-card/40" />
          ))}
        </div>
        <div className="h-80 rounded-lg border border-border bg-card/40" />
      </div>
    );
  }

  if (loadState.status === "error") {
    return (
      <DataState
        kind="error"
        title="دریافت ردیابی محاسبه ناموفق بود"
        description={loadState.message}
        actionLabel="تلاش دوباره"
        onAction={() => void loadTrace()}
      />
    );
  }

  const { trace } = loadState;

  return (
    <div className="flex flex-col gap-6">
      {insightId !== undefined && (
        <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
          <Info aria-hidden="true" className="size-4 shrink-0 text-primary" />
          این ردیابی مربوط به بینش با شناسه <span dir="ltr" className="font-mono text-xs">{insightId}</span> است و تنها برای همان معیار معتبر است.
        </div>
      )}

      <TraceDetail trace={trace} formatPercent={formatPercent} formatCount={formatCount} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <SlidersHorizontal aria-hidden="true" className="size-4 text-primary" />
            سهم عوامل در این محاسبه
          </CardTitle>
          <CardDescription>تفکیک سهم هر عامل (breakdown contribution)</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {trace.breakdownContribution.length === 0 ? (
            <p className="text-sm text-muted-foreground">تفکیک سهم عاملی ثبت نشده است.</p>
          ) : (
            trace.breakdownContribution.map((item) => (
              <div key={`${item.factor}-${item.value}`} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="font-medium">{DRIVER_LABELS[item.factor] ?? item.factor}: {item.value}</span>
                    <Badge variant="secondary" className="tabular-nums">{formatCount(item.evidenceCount)} نمونه</Badge>
                  </span>
                  <span className="tabular-nums text-muted-foreground">{formatPercent(item.contribution)}</span>
                </div>
                <div dir="ltr" className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary/70" style={{ width: `${item.contribution * 100}%` }} />
                </div>
              </div>
            ))
          )}
          <p className="text-xs leading-5 text-muted-foreground">
            سهم هر عامل از تغییر شناسایی‌شده در همان معیار؛ این نسبت‌ها رابطه علّی قطعی را اثبات نمی‌کنند.
          </p>
        </CardContent>
      </Card>

      <EvidenceTable evidence={trace.evidence} formatAmount={formatAmount} />
    </div>
  );
}

async function getTraceWithInsight(insightId: string): Promise<Trace> {
  const base = await getTrace({});
  return { ...base, metricName: `insight:${insightId}` };
}

const DRIVER_LABELS: Record<string, string> = {
  psp: "درگاه پرداخت",
  issuer_bank: "بانک صادرکننده",
  terminal: "ترمینال",
  amount_bucket: "بازه مبلغ",
  verify_type: "نوع تأیید",
  hour_of_day: "ساعت",
};

function formatPercent(value: number): string {
  return `${(value * 100).toLocaleString("fa-IR", { maximumFractionDigits: 1 })}٪`;
}

function formatCount(value: number): string {
  return value.toLocaleString("fa-IR");
}

function formatAmount(value: number): string {
  return value.toLocaleString("fa-IR");
}