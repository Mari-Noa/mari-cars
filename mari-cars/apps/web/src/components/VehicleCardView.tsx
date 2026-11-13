import Link from 'next/link';
import type { VehicleCard } from '@mari-cars/contracts';
import { CarArt } from './CarArt';
import { cn } from '@/lib/cn';
import { formatKm, formatMoney } from '@/lib/format';
import { categoryLabel, fuelLabel, statusLabel, transmissionLabel } from '@/lib/labels';

export function VehicleCardView({ v, tone = 'dark' }: { v: VehicleCard; tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark';
  const isRental = !v.sale && !!v.rental;
  const price = v.sale?.price ?? v.rental?.dailyRate;
  const available = v.status === 'available';

  return (
    <Link
      href={`/vehicles/${v.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border transition duration-300 motion-safe:hover:-translate-y-1',
        dark ? 'border-line bg-panel hover:border-ember/70' : 'border-bone bg-white shadow-sm hover:border-ember/70',
      )}
    >
      <div className={cn('relative aspect-[16/10] overflow-hidden', dark ? 'bg-carbon' : 'bg-bone/60')}>
        <div className="speed-lines absolute inset-0 opacity-60" />
        <CarArt
          className={cn(
            'absolute inset-x-5 bottom-3 w-[calc(100%-2.5rem)] transition duration-500 motion-safe:group-hover:scale-105',
            dark ? 'text-paper' : 'text-ink',
          )}
        />
        <span className="absolute start-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold text-paper backdrop-blur">
          {isRental ? 'להשכרה' : 'למכירה'}
        </span>
        {v.sale?.discountPercent ? (
          <span className="cut absolute end-0 top-3 bg-ember py-1 ps-4 pe-3 text-sm font-black text-ink">
            -{v.sale.discountPercent}%
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-lg font-bold leading-tight" dir="auto">
            {v.make} {v.model}
          </h3>
          <p className={cn('mt-1 text-sm', dark ? 'text-mist' : 'text-ink/60')}>
            {v.year} · {categoryLabel[v.category]}
          </p>
        </div>

        <ul className={cn('flex flex-wrap gap-2 text-xs', dark ? 'text-paper/80' : 'text-ink/75')}>
          {[formatKm(v.mileageKm), transmissionLabel[v.transmission], fuelLabel[v.fuelType]].map((t) => (
            <li key={t} className={cn('rounded-md px-2.5 py-1', dark ? 'bg-line/70' : 'bg-bone/70')}>
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            {v.sale?.previousPrice ? (
              <div className="text-xs text-mist line-through">{formatMoney(v.sale.previousPrice)}</div>
            ) : null}
            {price ? (
              <div className="text-xl font-black">
                {formatMoney(price)}
                {isRental ? <span className="text-sm font-medium text-mist"> / ליום</span> : null}
              </div>
            ) : null}
          </div>
          <span className="flex items-center gap-1.5 text-xs">
            <span className={cn('size-2 rounded-full', available ? 'bg-emerald-400' : 'bg-amber-400')} />
            {statusLabel[v.status]}
          </span>
        </div>
      </div>
    </Link>
  );
}
