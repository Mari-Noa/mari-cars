import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CarArt } from '@/components/CarArt';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { InquiryForm } from '@/components/InquiryForm';
import { RentalRequest } from '@/components/RentalRequest';
import { VehicleCardView } from '@/components/VehicleCardView';
import { cn } from '@/lib/cn';
import { formatKm, formatMoney } from '@/lib/format';
import { categoryLabel, fuelLabel, statusLabel, transmissionLabel } from '@/lib/labels';
import { allVehicles, blockedRanges, getVehicle } from '@/lib/sample-data';
import { site } from '@/lib/site';

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const v = getVehicle((await params).slug);
  if (!v) return {};
  return { title: `${v.make} ${v.model} ${v.year} | Mari Cars` };
}

export default async function VehiclePage({ params }: { params: Params }) {
  const v = getVehicle((await params).slug);
  if (!v) notFound();

  const title = `${v.make} ${v.model}`;
  const rental = !v.sale && !!v.rental;
  const price = v.sale?.price ?? v.rental?.dailyRate;
  const available = v.status === 'available';
  const saving =
    v.sale?.previousPrice && v.sale.price
      ? { ...v.sale.price, amount: v.sale.previousPrice.amount - v.sale.price.amount }
      : null;

  const similar = allVehicles
    .filter((o) => o.id !== v.id && !!o.rental === rental && (o.category === v.category || o.make === v.make))
    .slice(0, 3);

  const specs: [string, string][] = [
    ['שנה', String(v.year)],
    ['קילומטראז׳', formatKm(v.mileageKm)],
    ['תיבת הילוכים', transmissionLabel[v.transmission]],
    ['דלק', fuelLabel[v.fuelType]],
    ['סוג רכב', categoryLabel[v.category]],
    ['מנוע', v.specs.engine],
    ['צבע', v.specs.color],
    ['מושבים', String(v.specs.seats)],
    ['יד', String(v.specs.owners)],
  ];

  const waText = encodeURIComponent(`שלום, אני מתעניין ב${title} ${v.year}`);
  const jsonLd =
    v.sale && JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Car',
      name: `${title} ${v.year}`,
      brand: { '@type': 'Brand', name: v.make },
      model: v.model,
      vehicleModelDate: String(v.year),
      mileageFromOdometer: { '@type': 'QuantitativeValue', value: v.mileageKm, unitCode: 'KMT' },
      offers: {
        '@type': 'Offer',
        price: v.sale.price.amount / 100,
        priceCurrency: 'ILS',
        availability: available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      },
    }).replace(/</g, '\\u003c');

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} /> : null}
        <nav aria-label="פירורי לחם" className="mb-6 text-sm text-mist">
          <Link href="/" className="hover:text-ember">בית</Link> /{' '}
          <Link href={rental ? '/vehicles?mode=rent' : '/vehicles'} className="hover:text-ember">
            {rental ? 'שכירות' : 'רכבים למכירה'}
          </Link>{' '}
          / <span className="text-paper">{title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid content-start gap-10">
            <section aria-label="גלריה">
              <div className="speed-lines relative grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl border border-line bg-carbon">
                <CarArt className="w-[85%] text-paper" />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="grid aspect-[4/3] place-items-center rounded-xl border border-line bg-carbon text-xs text-mist">
                    תמונה {n}
                  </div>
                ))}
              </div>
            </section>

            <section aria-label="מפרט">
              <h2 className="mb-5 text-2xl font-black">מפרט</h2>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                {specs.map(([k, val]) => (
                  <div key={k} className="bg-ink p-5">
                    <dt className="text-xs text-mist">{k}</dt>
                    <dd className="mt-1 font-bold">{val}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-label="תיאור">
              <h2 className="mb-4 text-2xl font-black">על הרכב</h2>
              <p className="leading-relaxed text-paper/85">{v.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2 text-sm">
                {v.features.map((f) => (
                  <li key={f} className="rounded-md bg-line/70 px-3 py-1.5">{f}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="self-start rounded-2xl border border-line bg-panel p-6 lg:sticky lg:top-24">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-3xl font-black leading-tight" dir="auto">{title}</h1>
                <p className="mt-1 text-sm text-mist">{v.year} · {categoryLabel[v.category]}</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs">
                <span className={cn('size-2 rounded-full', available ? 'bg-emerald-400' : 'bg-amber-400')} />
                {statusLabel[v.status]}
              </span>
            </div>

            <div className="mt-6">
              {v.sale?.previousPrice ? (
                <div className="text-sm text-mist line-through">{formatMoney(v.sale.previousPrice)}</div>
              ) : null}
              {price ? (
                <div className="text-4xl font-black">
                  {formatMoney(price)}
                  {rental ? <span className="text-base font-medium text-mist"> / ליום</span> : null}
                </div>
              ) : null}
              {saving && v.sale?.discountPercent ? (
                <p className="mt-2 inline-block cut bg-ember px-3 py-1 text-sm font-black text-ink">
                  חסכון של {formatMoney(saving)} (-{v.sale.discountPercent}%)
                </p>
              ) : null}
              {!rental ? <p className="mt-3 text-xs text-mist">מימון: בקשו הצעה בטופס או בטלפון.</p> : null}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-center text-sm font-bold">
              <a href={site.phoneHref} className="rounded-sm border border-paper/30 px-4 py-3 transition hover:border-ember hover:text-ember">
                התקשרו
              </a>
              <a href={`${site.whatsappHref}?text=${waText}`} className="rounded-sm border border-paper/30 px-4 py-3 transition hover:border-ember hover:text-ember">
                וואטסאפ
              </a>
            </div>

            <div className="mt-6 border-t border-line pt-6">
              <h2 className="mb-4 text-lg font-black">{rental ? 'בדקו זמינות ובקשו שכירות' : 'השאירו פרטים'}</h2>
              {rental && v.rental ? (
                <RentalRequest vehicleId={v.id} dailyRate={v.rental.dailyRate} blocked={blockedRanges[v.id] ?? []} />
              ) : (
                <InquiryForm vehicleId={v.id} />
              )}
            </div>
          </aside>
        </div>

        {similar.length ? (
          <section className="mt-20" aria-label="רכבים דומים">
            <h2 className="mb-8 text-3xl font-black">רכבים דומים</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s) => <VehicleCardView key={s.id} v={s} />)}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
