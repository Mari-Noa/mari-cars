import { cn } from '@/lib/cn';

export const fieldClass =
  'w-full rounded-lg border border-line bg-carbon px-3 py-2.5 text-sm text-paper placeholder:text-mist focus:border-ember focus:outline-none';

export function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('block text-sm', className)}>
      <span className="mb-1.5 block font-bold text-paper/90">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
