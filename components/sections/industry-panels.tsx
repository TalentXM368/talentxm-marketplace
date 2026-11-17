import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Panel {
  title: string;
  description: string;
  href: string;
  image?: string;
}

/**
 * Industries as tall panels side by side (MOTION.md: "Expanding panels"). The panel under the
 * pointer or keyboard focus widens; on small screens they stack. All text is always visible.
 */
export function IndustryPanels({ panels }: { panels: Panel[] }) {
  return (
    <ul className="txm-panels">
      {panels.map((p) => (
        <li key={p.href} className="txm-panel">
          <Link href={p.href} className="txm-panel-link txm-focus-inverse group">
            {p.image ? (
              <>
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="txm-panel-image object-cover"
                />
                {/* Solid tint, so white text keeps its contrast over any photo. */}
                <span className="txm-panel-tint" aria-hidden="true" />
              </>
            ) : (
              <span className="absolute inset-0 bg-txm-surface" aria-hidden="true" />
            )}
            <div className="relative mt-auto p-7 md:p-9">
              <div className="flex items-start justify-between gap-6">
                <h3 className="txm-h3 text-white">{p.title}</h3>
                <ArrowUpRight
                  className="h-6 w-6 shrink-0 text-txm-yellow transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
              <p className="txm-body mt-3 max-w-[38ch] text-white/85">{p.description}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
