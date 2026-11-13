'use client';

import { useEffect, useState } from 'react';
import { RentalRequestInput, type Money } from '@mari-cars/contracts';
import { submitRental } from '@/lib/api';
import { cn } from '@/lib/cn';
import { formatMoney } from '@/lib/format';
import { Field, fieldClass } from './Field';

type Props = { vehicleId: string; dailyRate: Money; blocked: [string, string][] };

/** Rental days = nights between pickup and return, at least 1. */
const daysBetween = (start: string, end: string) =>
  Math.max(1, Math.round((Date.parse(end) - Date.parse(start)) / 864e5));

export function RentalRequest({ vehicleId, dailyRate, blocked }: Props) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [today, setToday] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  useEffect(() => setToday(new Date().toLocaleDateString('en-CA')), []);

  const datesOk = !!start && !!end && end >= start;
  const clash = datesOk && blocked.some(([a, b]) => start <= b && end >= a);
  const days = datesOk ? daysBetween(start, end) : 0;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = RentalRequestInput.safeParse({ ...data, vehicleId, startDate: start, endDate: end });
    const found: Record<string, string> = {};
    if (!parsed.success) for (const i of parsed.error.issues) found[String(i.path[0])] = i.message;
    if (today && start && start < today) found.startDate = 'תאריך האיסוף כבר עבר';
    if (clash) found.endDate = 'הרכב תפוס בתאריכים אלה';
    setErrors(found);
    if (!parsed.success || Object.keys(found).length) return;
    setState('sending');
    try {
      await submitRental(parsed.data);
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div role="status" className="rounded-xl border border-ember/50 bg-ember/10 p-6">
        <p className="font-bold">הבקשה התקבלה.</p>
        <p className="mt-1 text-sm text-mist">נאשר את ההזמנה ונחזור אליכם. התאריכים נחסמים רק לאחר אישור.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="איסוף" error={errors.startDate}>
          <input type="date" value={start} min={today} onChange={(e) => setStart(e.target.value)} className={fieldClass} />
        </Field>
        <Field label="החזרה" error={errors.endDate}>
          <input type="date" value={end} min={start || today} onChange={(e) => setEnd(e.target.value)} className={fieldClass} />
        </Field>
      </div>

      {blocked.length ? (
        <p className="text-xs text-mist">
          תפוס בתאריכים:{' '}
          {blocked.map(([a, b]) => `${a.split('-').reverse().join('/')}–${b.split('-').reverse().join('/')}`).join(', ')}
        </p>
      ) : null}

      {datesOk ? (
        <div className={cn('rounded-xl border p-4 text-sm', clash ? 'border-red-400/60' : 'border-line bg-carbon')}>
          {clash ? (
            <p className="font-bold text-red-400">הרכב תפוס בתאריכים שבחרתם.</p>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="text-mist">{days} ימים × {formatMoney(dailyRate)}</span>
                <span className="text-lg font-black">{formatMoney({ ...dailyRate, amount: dailyRate.amount * days })}</span>
              </div>
              <p className="mt-2 text-xs text-mist">הערכת מחיר. המחיר הסופי ופרטי הפיקדון יאושרו על ידינו.</p>
            </>
          )}
        </div>
      ) : null}

      <Field label="שם מלא" error={errors.name}>
        <input name="name" autoComplete="name" className={fieldClass} />
      </Field>
      <Field label="טלפון" error={errors.phone}>
        <input name="phone" type="tel" autoComplete="tel" dir="ltr" className={cn(fieldClass, 'text-start')} />
      </Field>
      <Field label="אימייל (אופציונלי)" error={errors.email}>
        <input name="email" type="email" autoComplete="email" dir="ltr" className={cn(fieldClass, 'text-start')} />
      </Field>
      {state === 'error' ? <p className="text-sm text-red-400">משהו השתבש. נסו שוב.</p> : null}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="cut bg-ember px-6 py-3.5 font-bold text-ink transition hover:bg-paper disabled:opacity-60"
      >
        {state === 'sending' ? 'שולח…' : 'שליחת בקשת שכירות'}
      </button>
      {process.env.NODE_ENV !== 'production' ? (
        <p className="text-xs text-mist">מצב פיתוח: הבקשה עדיין לא נשלחת לשרת.</p>
      ) : null}
    </form>
  );
}
