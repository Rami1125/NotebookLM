import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function messageOf(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  return "הפעולה נכשלה";
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" | "soft" }) {
  const styles = {
    primary: "bg-primary text-primary-fg hover:brightness-110",
    ghost: "bg-surface text-ink border border-line hover:bg-paper",
    danger: "bg-danger-soft text-danger hover:brightness-95",
    soft: "bg-accent-soft text-primary hover:brightness-95",
  }[variant];
  return (
    <button
      className={cx(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition duration-150 disabled:cursor-not-allowed disabled:opacity-50",
        styles,
        className,
      )}
      {...props}
    />
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

const control =
  "min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink outline-none transition duration-150 placeholder:text-muted focus:border-accent";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx(control, props.className)} {...props} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx(control, "min-h-28 py-2", props.className)} {...props} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cx(control, props.className)} {...props} />;
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cx("rounded-3xl border border-line bg-surface p-4 shadow-[0_12px_40px_-28px_rgba(16,35,58,0.45)]", className)}>{children}</section>;
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "ok" | "warn" | "danger" | "accent";
}) {
  const tones = {
    neutral: "bg-paper text-muted",
    ok: "bg-ok-soft text-ok",
    warn: "bg-warn-soft text-warn",
    danger: "bg-danger-soft text-danger",
    accent: "bg-accent-soft text-primary",
  }[tone];
  return <span className={cx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", tones)}>{children}</span>;
}

export function Empty({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-paper px-4 py-8 text-center">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted">{body}</p>
    </div>
  );
}

export function Notice({ children, tone = "warn" }: { children: ReactNode; tone?: "warn" | "ok" | "danger" }) {
  const tones = {
    warn: "bg-warn-soft text-warn",
    ok: "bg-ok-soft text-ok",
    danger: "bg-danger-soft text-danger",
  }[tone];
  return <p className={cx("rounded-lg px-3 py-2 text-sm", tones)}>{children}</p>;
}
