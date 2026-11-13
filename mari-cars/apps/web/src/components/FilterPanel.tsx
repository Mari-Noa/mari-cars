import type { CatalogQuery } from '@mari-cars/contracts';
import { categoryLabel, fuelLabel, transmissionLabel } from '@/lib/labels';
import { Field, fieldClass } from './Field';

const opts = (labels: Record<string, string>) =>
  Object.entries(labels).map(([value, label]) => (
    <option key={value} value={value}>{label}</option>
  ));

/** A plain GET form: works without client JavaScript and keeps every filter in the URL. */
export function FilterPanel({ q, makes, idp }: { q: CatalogQuery; makes: string[]; idp: string }) {
  const rent = q.mode === 'rent';
  return (
    <form method="get" action="/vehicles" className="grid gap-4">
      <input type="hidden" name="mode" value={q.mode} />
      <input type="hidden" name="sort" value={q.sort} />
      <Field label="חיפוש">
        <input id={`${idp}-q`} name="q" defaultValue={q.q} placeholder="יצרן, דגם…" className={fieldClass} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label={rent ? 'מחיר ליום מ־' : 'מחיר מ־'}>
          <input name="minPrice" type="number" min={0} defaultValue={q.minPrice} className={fieldClass} />
        </Field>
        <Field label="עד">
          <input name="maxPrice" type="number" min={0} defaultValue={q.maxPrice} className={fieldClass} />
        </Field>
      </div>
      <Field label="יצרן">
        <select name="make" defaultValue={q.make ?? ''} className={fieldClass}>
          <option value="">הכל</option>
          {makes.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="שנה מ־">
          <input name="minYear" type="number" defaultValue={q.minYear} className={fieldClass} />
        </Field>
        <Field label="עד">
          <input name="maxYear" type="number" defaultValue={q.maxYear} className={fieldClass} />
        </Field>
      </div>
      <Field label="קילומטראז׳ מקסימלי">
        <input name="maxKm" type="number" min={0} step={5000} defaultValue={q.maxKm} className={fieldClass} />
      </Field>
      <Field label="תיבת הילוכים">
        <select name="transmission" defaultValue={q.transmission ?? ''} className={fieldClass}>
          <option value="">הכל</option>
          {opts(transmissionLabel)}
        </select>
      </Field>
      <Field label="סוג דלק">
        <select name="fuel" defaultValue={q.fuel ?? ''} className={fieldClass}>
          <option value="">הכל</option>
          {opts(fuelLabel)}
        </select>
      </Field>
      <Field label="סוג רכב">
        <select name="category" defaultValue={q.category ?? ''} className={fieldClass}>
          <option value="">הכל</option>
          {opts(categoryLabel)}
        </select>
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="availableOnly" value="1" defaultChecked={!!q.availableOnly} className="size-4 accent-ember" />
        זמינים בלבד
      </label>
      {!rent ? (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="deals" value="1" defaultChecked={!!q.deals} className="size-4 accent-ember" />
          מבצעים בלבד
        </label>
      ) : null}
      <div className="flex gap-3">
        <button type="submit" className="cut flex-1 bg-ember px-5 py-3 font-bold text-ink transition hover:bg-paper">
          סינון
        </button>
        <a
          href={rent ? '/vehicles?mode=rent' : '/vehicles'}
          className="rounded-sm border border-paper/30 px-5 py-3 text-center font-bold transition hover:border-ember hover:text-ember"
        >
          נקה
        </a>
      </div>
    </form>
  );
}
