import { forwardRef, useState, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Card({ className, glow, ...props }: HTMLAttributes<HTMLDivElement> & { glow?: boolean }) {
  return <div className={cn("card p-4", glow && "card-glow", className)} {...props} />;
}
export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-3 flex items-start justify-between gap-3", className)} {...props} />;
}
export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("h-display text-lg leading-tight", className)} {...props} />;
}
export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("muted text-sm", className)} {...props} />;
}
export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-sm leading-relaxed", className)} {...props} />;
}

const badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold", {
  variants: {
    variant: {
      default: "bg-ball-400/15 text-ball-300 border border-ball-400/30",
      blue: "bg-court-500/20 text-blue-200 border border-court-400/30",
      neutral: "bg-white/10 text-white/80 border border-white/10",
      success: "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30",
      danger: "bg-red-500/15 text-red-300 border border-red-400/30",
    },
  },
  defaultVariants: { variant: "default" },
});
export function Badge({ className, variant, ...props }: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ball-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:pointer-events-none disabled:opacity-50 active:scale-[.98]",
  {
    variants: {
      variant: {
        default: "bg-ball-400 text-ink-950 hover:bg-ball-300 shadow-glow",
        secondary: "bg-white/10 text-white hover:bg-white/15 border border-white/10",
        ghost: "text-white/80 hover:bg-white/10",
        outline: "border border-ball-400/60 text-ball-300 hover:bg-ball-400/10",
        danger: "bg-red-500/90 text-white hover:bg-red-500",
      },
      size: {
        default: "h-12 px-5 text-base",
        sm: "h-9 px-3 text-sm rounded-xl",
        lg: "h-14 px-6 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);
export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";

export function ProgressBar({ value, className, label }: { value: number; className?: string; label: string }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={label}
      className={cn("h-2.5 w-full overflow-hidden rounded-full bg-white/10", className)}
    >
      <div className="h-full rounded-full bg-gradient-to-r from-ball-500 to-ball-300 transition-[width] duration-700" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function ChipGroup<T extends string | number>({
  value,
  onChange,
  options,
  label,
  className,
}: {
  value: T | null;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  label: string;
  className?: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "tap rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
            value === o.value ? "border-ball-400 bg-ball-400/15 text-ball-200" : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const EMOJIS = ["😩", "😕", "🙂", "😃", "🤩"] as const;
export const SCORE_EMOJI = ["", ...EMOJIS] as const;

export function ScorePicker({ value, onChange, label }: { value: number | null; onChange: (v: 1 | 2 | 3 | 4 | 5) => void; label: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm">{label}</span>
      <div role="radiogroup" aria-label={label} className="flex gap-1">
        {EMOJIS.map((e, i) => {
          const v = (i + 1) as 1 | 2 | 3 | 4 | 5;
          return (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={value === v}
              aria-label={`${label} : ${v} sur 5`}
              onClick={() => onChange(v)}
              className={cn("tap h-11 w-11 rounded-xl text-xl transition-all", value === v ? "scale-110 bg-ball-400/20 ring-2 ring-ball-400" : "bg-white/5 opacity-70 hover:opacity-100")}
            >
              {e}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {hint && <span className="muted mb-1 block text-xs">{hint}</span>}
      {children}
    </label>
  );
}

export function Accordion({ title, subtitle, children, defaultOpen = false }: { title: string; subtitle?: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card className="p-0">
      <button type="button" className="tap flex w-full items-center gap-3 p-4 text-left" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <div className="flex-1">
          <p className="font-semibold">{title}</p>
          {subtitle && <p className="muted text-xs">{subtitle}</p>}
        </div>
        <ChevronDown className={cn("h-5 w-5 text-white/50 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open && <div className="border-t border-white/5 px-4 pb-4 pt-3">{children}</div>}
    </Card>
  );
}

export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="rounded-xl bg-red-500/15 px-3 py-2 text-sm text-red-200">
      {children}
    </p>
  );
}

export function PageHeader({ kicker, title, action }: { kicker: string; title: string; action?: ReactNode }) {
  return (
    <header className="flex items-end justify-between gap-3">
      <div>
        <p className="muted text-sm">{kicker}</p>
        <h1 className="h-display text-2xl">{title}</h1>
      </div>
      {action}
    </header>
  );
}
