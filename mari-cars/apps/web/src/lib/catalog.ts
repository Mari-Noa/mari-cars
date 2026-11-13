import type { CatalogQuery, VehicleCard } from '@mari-cars/contracts';
import { categoryLabel, fuelLabel } from './labels';

export const PER_PAGE = 9;

/** Price in shekels: sale price, or the daily rate for rentals. */
const unitPrice = (v: VehicleCard) => (v.sale?.price ?? v.rental?.dailyRate)?.amount ?? 0;

// Runs in memory over sample data now. Phase 5 replaces this with the API's /vehicles endpoint.
export function runCatalog(all: VehicleCard[], q: CatalogQuery) {
  const ofMode = all.filter((v) => (q.mode === 'rent' ? !!v.rental : !!v.sale));
  const makes = [...new Set(ofMode.map((v) => v.make))].sort();
  const needle = q.q?.toLowerCase();

  const filtered = ofMode.filter((v) => {
    const shekels = unitPrice(v) / 100;
    if (needle) {
      const hay = `${v.make} ${v.model} ${v.year} ${categoryLabel[v.category]} ${fuelLabel[v.fuelType]}`.toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    if (q.minPrice !== undefined && shekels < q.minPrice) return false;
    if (q.maxPrice !== undefined && shekels > q.maxPrice) return false;
    if (q.make && v.make !== q.make) return false;
    if (q.minYear !== undefined && v.year < q.minYear) return false;
    if (q.maxYear !== undefined && v.year > q.maxYear) return false;
    if (q.maxKm !== undefined && v.mileageKm > q.maxKm) return false;
    if (q.transmission && v.transmission !== q.transmission) return false;
    if (q.fuel && v.fuelType !== q.fuel) return false;
    if (q.category && v.category !== q.category) return false;
    if (q.availableOnly && v.status !== 'available') return false;
    if (q.deals && !v.sale?.discountPercent) return false;
    return true;
  });

  const sorters: Record<CatalogQuery['sort'], (a: VehicleCard, b: VehicleCard) => number> = {
    newest: (a, b) => b.listedAt.localeCompare(a.listedAt),
    price_asc: (a, b) => unitPrice(a) - unitPrice(b),
    price_desc: (a, b) => unitPrice(b) - unitPrice(a),
    popular: (a, b) => b.popularity - a.popularity,
    deals: (a, b) => (b.sale?.discountPercent ?? 0) - (a.sale?.discountPercent ?? 0),
  };
  filtered.sort(sorters[q.sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(q.page, pages);
  const items = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  return { items, total: filtered.length, page, pages, makes };
}
