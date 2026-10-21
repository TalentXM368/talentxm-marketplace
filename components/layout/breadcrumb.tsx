import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbLd } from "@/lib/seo";
import { isOpenPath } from "@/lib/site-lock";

export interface Crumb {
  label: string;
  href: string;
}

/** Shown from depth 2 (Architecture S3). Last item is the current page. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbLd(all)} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 txm-small text-slate-400">
          {all.map((item, i) => {
            const last = i === all.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-slate-200">
                    {item.label}
                  </span>
                ) : (
                  <>
                    {isOpenPath(item.href) ? (
                      <Link href={item.href} className="txm-focus-inverse hover:text-white">
                        {item.label}
                      </Link>
                    ) : (
                      <span>{item.label}</span>
                    )}
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
