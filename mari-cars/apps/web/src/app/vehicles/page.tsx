import type { Metadata } from 'next';
import Link from 'next/link';
import { CatalogQuery } from '@mari-cars/contracts';
import { FilterPanel } from '@/components/FilterPanel';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { VehicleCardView } from '@/components/VehicleCardView';
import { cn } from '@/lib/cn';
import { runCatalog } from '@/lib/catalog';
import { allVehicles } from '@/lib/sample-data';
import { buildHref } from '@/lib/url';

export const metadata: Metadata = { title: 'כל הרכבים | Mari Cars' };

const sorts = [
  ['newest', 'חדשים'],
  ['price_asc', 'מחיר: מהנמוך'],
  ['price_desc', 'מחיר: מהגבוה'],
  ['popular', 'פופולריים'],
  ['deals', 'מבצעים'],
] as const;

export default async function VehiclesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const raw = Object.fromEntries(
    Object.entries(sp).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]),
  ) as Record<string, string | undefined>;
  const q = CatalogQuery.parse(raw);
  const { items, total, page, pages, makes } = runCatalog(allVehicles, q);
  const modeRaw = { ...raw, mode: q.mode, sort: q.sort };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-bold text-ember">
              <span className="h-px w-8 bg-ember" />
              מבחר הרכבים
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              {q.mode === 'rent' ? 'רכבים להשכרה' : 'רכבים למכירה'}
            </h1>
          </div>
          <div className="flex rounded-full border border-line p-1 text-sm font-bold" role="tablist">
            {(
              [['buy', 'קנייה'], ['rent', 'שכירות']] as const
            ).map(([m, label]) => (
              <Link
                key={m}
                href={buildHref({}, { mode: m === 'rent' ? 'rent' : undefined })}
                role="tab"
                aria-selected={q.mode === m}
                className={cn('rounded-full px-6 py-2 transition', q.mode === m ? 'bg-ember text-ink' : 'hover:text-ember')}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
          <details className="rounded-xl border border-line bg-panel lg:hidden">
            <summary className="cursor-pointer list-none px-5 py-4 font-bold [&::-webkit-details-marker]:hidden">
              סינון וחיפוש
            </summary>
            <div className="border-t border-line p-5">
              <FilterPanel q={q} makes={makes} idp="m" />
            </div>
          </details>
          <aside className="hidden self-start rounded-xl border border-line bg-panel p-5 lg:sticky lg:top-24 lg:block">
            <FilterPanel q={q} makes={makes} idp="d" />
          </aside>

          <section aria-label="תוצאות">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-mist">{total} רכבים</p>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                {sorts.map(([key, label]) => (
                  <Link
                    key={key}
                    href={buildHref(raw, { sort: key })}
                    className={cn(
                      'rounded-full border px-4 py-2 transition',
                      q.sort === key ? 'border-ember bg-ember text-ink' : 'border-line hover:border-ember hover:text-ember',
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {items.length ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((v) => <VehicleCardView key={v.id} v={v} />)}
              </div>
            ) : (
              <div className="rounded-2xl border border-line p-12 text-center">
                <p className="text-lg font-bold">לא נמצאו רכבים מתאימים.</p>
                <p className="mt-2 text-sm text-mist">נסו להרחיב את הסינון או לנקות אותו.</p>
              </div>
            )}

            {pages > 1 ? (
              <nav aria-label="עמודים" className="mt-10 flex items-center justify-center gap-3 text-sm font-bold">
                {page > 1 ? (
                  <Link href={buildHref(modeRaw, { page: String(page - 1) })} className="rounded-full border border-line px-5 py-2 hover:border-ember hover:text-ember">
                    → הקודם
                  </Link>
                ) : null}
                <span className="text-mist">{page} / {pages}</span>
                {page < pages ? (
                  <Link href={buildHref(modeRaw, { page: String(page + 1) })} className="rounded-full border border-line px-5 py-2 hover:border-ember hover:text-ember">
                    הבא ←
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
