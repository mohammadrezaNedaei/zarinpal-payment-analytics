import { useId } from "react";

export type ChartPoint = {
  x: number;
  y: number;
};

type LineChartProps = {
  points: ChartPoint[];
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  dotColor?: string;
  ariaLabel: string;
};

/**
 * نمودار خطی سبک مبتنی بر SVG با کنترل کامل RTL.
 * نقاط ورودی {x, y} با مقیاس واقعی هستند و در اینجا به مختصات SVG نگاشت می‌شوند.
 * اگر `renderTooltip` داده شود، روی هر نقطه یک دکمه شفاف برای هاور/فوکوس قرار می‌گیرد.
 */
export function LineChart({
  points,
  width = 480,
  height = 220,
  stroke = "#f59e0b",
  strokeWidth = 2,
  dotColor = "#ffffff",
  ariaLabel,
  renderTooltip,
}: LineChartProps) {
  const chartId = useId();

  if (points.length === 0) {
    return <ChartEmpty width={width} height={height} message="داده‌ای برای نمودار نیست" />;
  }

  const { plotWidth, plotHeight } = computePlotSize(width, height);
  const { xFn, yFn } = buildScales(points, plotWidth, plotHeight);

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${xFn(p.x)} ${yFn(p.y)}`).join(" ");
  const areaPath = `${pathD} L ${xFn(points[points.length - 1].x)} ${plotHeight} L ${xFn(points[0].x)} ${plotHeight} Z`;

  return (
    <div className="w-full overflow-x-auto" dir="ltr">
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto block h-auto w-full max-w-full"
      >
        <defs>
          <linearGradient id={`grad-${chartId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.25" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>

        <clipPath id={`clip-${chartId}`}>
          <rect x={0} y={0} width={plotWidth} height={plotHeight} />
        </clipPath>

        <g clip={`url(#clip-${chartId})`}>
          <path d={areaPath} fill={`url(#grad-${chartId})`} />
          <path
            d={pathD}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {points.map((p, i) => (
            <circle key={i} cx={xFn(p.x)} cy={yFn(p.y)} r={3.5} fill={dotColor} stroke={stroke} strokeWidth={1.5} />
          ))}
        </g>

        {/* نقاط تعاملی شفاف برای tooltip (استفاده از <title> برای دسترسی‌پذیری) */}
        <g>
          {points.map((p, i) => (
            <circle
              key={`hit-${i}`}
              cx={xFn(p.x)}
              cy={yFn(p.y)}
              r={18}
              fill="transparent"
              className="cursor-pointer"
            >
              <title>{`${points[i].y}`}</title>
            </circle>
          ))}
        </g>
      </svg>
    </div>
  );
}

const CHART_PADDING_X = 8;
const CHART_PADDING_Y = 8;

function computePlotSize(width: number, height: number): { plotWidth: number; plotHeight: number } {
  return { plotWidth: width - CHART_PADDING_X * 2, plotHeight: height - CHART_PADDING_Y * 2 };
}

function buildScales(points: ChartPoint[], plotWidth: number, plotHeight: number) {
  const minX = Math.min(...points.map((p) => p.x));
  const maxX = Math.max(...points.map((p) => p.x));
  const minY = Math.min(...points.map((p) => p.y));
  const maxY = Math.max(...points.map((p) => p.y));
  const spanX = Math.max(maxX - minX, 1);
  const spanY = Math.max(maxY - minY, 1);

  const xFn = (x: number) => ((x - minX) / spanX) * plotWidth;
  const yFn = (y: number) => plotHeight - ((y - minY) / spanY) * plotHeight;

  return { xFn, yFn };
}

function ChartEmpty({ width, height, message }: { width: number; height: number; message: string }) {
  return (
    <div
      role="status"
      className="flex items-center justify-center rounded-lg border border-dashed border-border"
      style={{ width, height }}
    >
      <span className="text-xs text-muted-foreground">{message}</span>
    </div>
  );
}