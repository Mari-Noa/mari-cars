'use client';

import { useState } from 'react';
import { InquiryInput, type InquiryType } from '@mari-cars/contracts';
import { submitInquiry } from '@/lib/api';
import { cn } from '@/lib/cn';
import { Field, fieldClass } from './Field';

const tabs: { type: InquiryType; label: string }[] = [
  { type: 'purchase', label: 'שאלה על הרכב' },
  { type: 'callback', label: 'חזרו אליי' },
  { type: 'test_drive', label: 'נסיעת מבחן' },
];

export function InquiryForm({ vehicleId }: { vehicleId: string }) {
  const [type, setType] = useState<InquiryType>('purchase');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = InquiryInput.safeParse({ ...data, type, vehicleId });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setState('sending');
    try {
      await submitInquiry(parsed.data);
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div role="status" className="rounded-xl border border-ember/50 bg-ember/10 p-6">
        <p className="font-bold">תודה! קיבלנו את הפנייה.</p>
        <p className="mt-1 text-sm text-mist">נחזור אליכם בהקדם.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div role="tablist" className="grid grid-cols-3 gap-1 rounded-xl bg-carbon p-1">
        {tabs.map((t) => (
          <button
            key={t.type}
            type="button"
            role="tab"
            aria-selected={type === t.type}
            onClick={() => setType(t.type)}
            className={cn(
              'rounded-lg px-2 py-2.5 text-xs font-bold transition sm:text-sm',
              type === t.type ? 'bg-ember text-ink' : 'text-paper/80 hover:text-ember',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <Field label="שם מלא" error={errors.name}>
        <input name="name" autoComplete="name" className={fieldClass} />
      </Field>
      <Field label="טלפון" error={errors.phone}>
        <input name="phone" type="tel" autoComplete="tel" dir="ltr" className={cn(fieldClass, 'text-start')} />
      </Field>
      <Field label="אימייל (אופציונלי)" error={errors.email}>
        <input name="email" type="email" autoComplete="email" dir="ltr" className={cn(fieldClass, 'text-start')} />
      </Field>
      <Field label="הודעה (אופציונלי)" error={errors.message}>
        <textarea name="message" rows={3} className={fieldClass} />
      </Field>
      {state === 'error' ? <p className="text-sm text-red-400">משהו השתבש. נסו שוב.</p> : null}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="cut bg-ember px-6 py-3.5 font-bold text-ink transition hover:bg-paper disabled:opacity-60"
      >
        {state === 'sending' ? 'שולח…' : 'שליחה'}
      </button>
      {process.env.NODE_ENV !== 'production' ? (
        <p className="text-xs text-mist">מצב פיתוח: הטופס עדיין לא נשלח לשרת.</p>
      ) : null}
    </form>
  );
}
