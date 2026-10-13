import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

// Primary (filled), secondary (outline) and text link with arrow (UX01: reuse).
// Each variant has a distinct hover and a visible focus ring.
export const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "border",
        text: "rounded-md px-0 py-0",
      },
      tone: {
        light: "txm-focus",
        dark: "txm-focus-inverse",
      },
      size: {
        md: "px-6 py-3 text-[15px]",
        sm: "px-4 py-2 text-sm",
      },
    },
    compoundVariants: [
      { variant: "primary", tone: "light", className: "bg-txm-base text-white hover:bg-txm-surface" },
      { variant: "primary", tone: "dark", className: "bg-white text-txm-base hover:bg-slate-200" },
      {
        variant: "secondary",
        tone: "light",
        className: "border-txm-base/20 text-txm-ink hover:border-txm-base/40 hover:bg-slate-50",
      },
      { variant: "secondary", tone: "dark", className: "border-white/35 text-white hover:bg-white/10" },
      { variant: "text", tone: "light", className: "text-txm-indigo hover:text-txm-base" },
      { variant: "text", tone: "dark", className: "text-txm-cyan hover:text-white" },
      { variant: "text", size: "md", className: "px-0 py-0" },
      { variant: "text", size: "sm", className: "px-0 py-0" },
    ],
    defaultVariants: { variant: "primary", tone: "light", size: "md" },
  },
);

type ButtonStyleProps = VariantProps<typeof buttonStyles>;

interface ButtonLinkProps extends ButtonStyleProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
}

export function ButtonLink({ href, children, variant, tone, size, className, arrow }: ButtonLinkProps) {
  const showArrow = arrow ?? (variant === "primary" || variant === "text" || variant === undefined);
  const isExternal = /^https?:\/\//.test(href);
  const classes = cn(buttonStyles({ variant, tone, size }), "group", className);
  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      )}
    </>
  );
  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
