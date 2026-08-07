"use client";

import type { ButtonHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
} & LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

const inputBase =
  "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-[var(--color-gold-dark)] focus:ring-2 focus:ring-[var(--color-gold)]/30";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputBase} ${props.className ?? ""}`} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputBase} ${props.className ?? ""}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputBase} min-h-28 resize-y ${props.className ?? ""}`} />;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" | "ghost" }) {
  const variants: Record<string, string> = {
    primary: "bg-[var(--color-charcoal)] text-white hover:bg-[var(--color-charcoal-light)]",
    secondary: "bg-[var(--color-gold)] text-[var(--color-charcoal)] hover:bg-[var(--color-gold-dark)]",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent text-neutral-600 hover:bg-neutral-100",
  };
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    />
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-neutral-200 bg-white p-6 shadow-sm ${className}`}>{children}</div>;
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 text-sm text-neutral-700"
      aria-pressed={checked}
    >
      <span
        className={`relative h-5 w-9 rounded-full transition ${checked ? "bg-[var(--color-gold)]" : "bg-neutral-300"}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${checked ? "left-4.5" : "left-0.5"}`}
          style={{ left: checked ? "18px" : "2px" }}
        />
      </span>
      {label}
    </button>
  );
}

export function PageHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="font-display text-2xl font-semibold text-[var(--color-charcoal)]">{title}</h1>
      {action}
    </div>
  );
}

export function Banner({ kind, message }: { kind: "error" | "success"; message: string }) {
  const styles = kind === "error" ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200";
  return <div className={`rounded-md border px-4 py-2.5 text-sm ${styles}`}>{message}</div>;
}

export function Spinner() {
  return (
    <div
      className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-[var(--color-gold-dark)]"
      role="status"
      aria-label="Loading"
    />
  );
}
