import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  solid:
    "bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-110 hover:-translate-y-0.5 shadow-sm",
  outline:
    "border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
  ghost: "text-[var(--ink-soft)] hover:text-[var(--ink)]",
};

export function Button({
  children,
  variant = "solid",
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
} & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = "solid",
  className = "",
  href,
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
} & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
