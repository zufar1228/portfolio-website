type TraceProps = {
  values: number[];
  reading: string;
  caption: string;
};

const TOP = 6;
const RANGE = 88;

function toPath(values: number[]) {
  const last = values.length - 1;
  return values
    .map((v, i) => {
      const x = ((i / last) * 1000).toFixed(1);
      const y = (TOP + (1 - v) * RANGE).toFixed(2);
      return `${i === 0 ? "M" : "L"}${x} ${y}`;
    })
    .join(" ");
}

export default function Trace({ values, reading, caption }: TraceProps) {
  const endY = TOP + (1 - values[values.length - 1]) * RANGE;

  return (
    <figure>
      <div className="relative h-[clamp(88px,15vw,176px)] border-b border-line">
        <svg
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="trace-reveal absolute inset-y-0 left-0 h-full w-[calc(100%-6px)] overflow-visible"
          aria-hidden="true"
        >
          <path
            d={toPath(values)}
            fill="none"
            stroke="var(--ink)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span
          className="trace-marker absolute right-0 block size-3 -translate-y-1/2 rounded-full border-2 border-ink bg-signal"
          style={{ top: `${endY}%` }}
          aria-hidden="true"
        />
      </div>
      <figcaption className="mt-3 flex items-start justify-between gap-6">
        <span className="max-w-[46ch] text-sm leading-snug text-muted">{caption}</span>
        <span className="trace-marker type-reading shrink-0 text-[clamp(1.75rem,4.5vw,3rem)] leading-none">
          {reading}
        </span>
      </figcaption>
    </figure>
  );
}
