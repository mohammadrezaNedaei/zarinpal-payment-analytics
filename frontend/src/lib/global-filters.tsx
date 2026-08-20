import { createContext, useContext, useState, type ReactNode } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type DateRangePreset = "7d" | "30d" | "90d" | "custom";

export type DateRangeOption = {
  value: DateRangePreset;
  label: string;
};

export const dateRangeOptions: DateRangeOption[] = [
  { value: "7d", label: "۷ روز اخیر" },
  { value: "30d", label: "۳۰ روز اخیر" },
  { value: "90d", label: "۹۰ روز اخیر" },
  { value: "custom", label: "بازه دلخواه" },
];

export type GlobalFilterContextValue = {
  dateRangePreset: DateRangePreset;
  setDateRangePreset: (value: DateRangePreset) => void;
  merchantKey: string;
  setMerchantKey: (value: string) => void;
};

export const GlobalFilterContext = createContext<GlobalFilterContextValue | null>(null);

export function GlobalFilterProvider({ children }: { children: ReactNode }) {
  const [dateRangePreset, setDateRangePreset] = useState<DateRangePreset>("30d");
  const [merchantKey, setMerchantKey] = useState("demo-merchant");

  const value = { dateRangePreset, setDateRangePreset, merchantKey, setMerchantKey };

  return <GlobalFilterContext.Provider value={value}>{children}</GlobalFilterContext.Provider>;
}

export function useGlobalFilters(): GlobalFilterContextValue {
  const context = useContext(GlobalFilterContext);
  if (context === null) {
    throw new Error("useGlobalFilters باید درون GlobalFilterProvider استفاده شود.");
  }
  return context;
}

export function DateRangeControl() {
  const { dateRangePreset, setDateRangePreset } = useGlobalFilters();

  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-muted-foreground">
      <span>بازه زمانی</span>
      <Select value={dateRangePreset} onValueChange={setDateRangePreset}>
        <SelectTrigger className="w-full min-w-36" aria-label="انتخاب بازه زمانی">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {dateRangeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

export function MerchantControl() {
  const { merchantKey, setMerchantKey } = useGlobalFilters();

  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-muted-foreground">
      <span>پذیرنده</span>
      <Select value={merchantKey} onValueChange={setMerchantKey}>
        <SelectTrigger className="w-full min-w-36" aria-label="انتخاب پذیرنده">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="demo-merchant">فروشگاه آنلاین نمونه</SelectItem>
          <SelectItem value="paydel">صندوق پی‌دل (نمایشی)</SelectItem>
          <SelectItem value="digikala-like">سوپرمارکت آنلاین (نمایشی)</SelectItem>
        </SelectContent>
      </Select>
    </label>
  );
}