"use client";

import { cn } from "@/lib/cn";

export interface FilterOption {
  value: string;
  label: string;
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div role="group" aria-labelledby={id} className="flex flex-col gap-3 md:flex-row md:items-start">
      <p id={id} className="txm-eyebrow w-32 shrink-0 text-txm-subtle md:pt-2.5">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

/** One value or none ("All"). */
export function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly FilterOption[];
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <FilterRow label={label}>
      <FilterButton active={!value} onClick={() => onChange(null)}>
        All
      </FilterButton>
      {options.map((o) => (
        <FilterButton key={o.value} active={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </FilterButton>
      ))}
    </FilterRow>
  );
}

/** Any number of values. "All" clears the selection. */
export function MultiFilterGroup({
  label,
  options,
  values,
  onChange,
  children,
}: {
  label: string;
  options: readonly FilterOption[];
  values: string[];
  onChange: (values: string[]) => void;
  children?: React.ReactNode;
}) {
  const toggle = (v: string) => onChange(values.includes(v) ? values.filter((x) => x !== v) : [...values, v]);
  return (
    <FilterRow label={label}>
      <FilterButton active={values.length === 0} onClick={() => onChange([])}>
        All
      </FilterButton>
      {options.map((o) => (
        <FilterButton key={o.value} active={values.includes(o.value)} onClick={() => toggle(o.value)}>
          {o.label}
        </FilterButton>
      ))}
      {children}
    </FilterRow>
  );
}

export function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "txm-focus rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? "border-transparent bg-txm-base text-white"
          : "border-txm-line bg-white text-txm-ink hover:bg-slate-50",
      )}
    >
      {children}
    </button>
  );
}
