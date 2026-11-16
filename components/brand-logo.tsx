import Link from "next/link"

import { cn } from "@/lib/utils"

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
    >
      <rect width="32" height="32" rx="8" className="fill-primary" />
      {/* Bridge arch */}
      <path
        d="M7 22c0-5 4-9 9-9s9 4 9 9"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="stroke-brand"
      />
      {/* Deck */}
      <path
        d="M6 22h20"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="stroke-primary-foreground"
      />
    </svg>
  )
}

export function BrandLogo({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Data Bridge Academy home"
      className={cn(
        "flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <BrandMark />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[1.0625rem] font-semibold tracking-tight">
          Data Bridge
        </span>
        <span className="mt-0.5 text-[0.6875rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Academy
        </span>
      </span>
    </Link>
  )
}
