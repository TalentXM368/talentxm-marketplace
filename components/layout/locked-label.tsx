import { cn } from "@/lib/cn";

/** Stands in for a link to a page that is not open yet (lib/site-lock.ts): dimmed and not clickable. */
export function LockedLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span aria-disabled="true" title="In development" className={cn("cursor-not-allowed opacity-40", className)}>
      {children}
      <span className="sr-only"> (in development)</span>
    </span>
  );
}
