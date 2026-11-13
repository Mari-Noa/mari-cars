// SAMPLE DATA for development only. Real data comes from the API in Phase 4/5.
import type { VehicleCard, VehicleDetail } from '@mari-cars/contracts';

type Row = [
  id: string, make: string, model: string, year: number, km: number, trans: 'A' | 'M',
  fuel: VehicleCard['fuelType'], cat: VehicleCard['category'], status: VehicleCard['status'],
  price: number, prev: number, popularity: number, listedAt: string,
];

const sellRows: Row[] = [
  ['s1', 'Toyota', 'Camry', 2022, 38000, 'A', 'hybrid', 'sedan', 'available', 148000, 0, 64, '2026-11-01'],
  ['s2', 'BMW', '330i', 2021, 52000, 'A', 'petrol', 'sedan', 'available', 189000, 205000, 88, '2026-10-28'],
  ['s3', 'Kia', 'Sportage', 2023, 21000, 'A', 'hybrid', 'suv', 'available', 167000, 0, 71, '2026-11-05'],
  ['s4', 'Tesla', 'Model 3', 2022, 44000, 'A', 'electric', 'sedan', 'reserved', 158000, 169000, 95, '2026-10-20'],
  ['s5', 'Mazda', 'MX-5', 2020, 29000, 'M', 'petrol', 'convertible', 'available', 139000, 149000, 57, '2026-10-15'],
  ['s6', 'Mercedes-Benz', 'C200', 2022, 33000, 'A', 'petrol', 'luxury', 'available', 214000, 0, 80, '2026-11-08'],
  ['s7', 'Hyundai', 'Tucson', 2022, 41000, 'A', 'petrol', 'suv', 'available', 152000, 0, 49, '2026-10-02'],
  ['s8', 'Skoda', 'Octavia', 2021, 60000, 'A', 'petrol', 'sedan', 'available', 98000, 104000, 40, '2026-09-25'],
  ['s9', 'Volkswagen', 'Golf', 2020, 72000, 'M', 'petrol', 'hatchback', 'available', 79000, 0, 52, '2026-09-18'],
  ['s10', 'Mazda', '3', 2021, 48000, 'A', 'petrol', 'hatchback', 'available', 92000, 0, 44, '2026-10-10'],
  ['s11', 'Toyota', 'RAV4', 2023, 18000, 'A', 'hybrid', 'suv', 'available', 189000, 0, 77, '2026-11-10'],
  ['s12', 'Audi', 'A4', 2021, 55000, 'A', 'diesel', 'luxury', 'sold', 176000, 0, 66, '2026-08-30'],
  ['s13', 'Ford', 'Mustang', 2019, 35000, 'A', 'petrol', 'sports', 'available', 229000, 245000, 99, '2026-10-12'],
  ['s14', 'Kia', 'Niro EV', 2023, 15000, 'A', 'electric', 'suv', 'available', 172000, 0, 61, '2026-11-11'],
];
const rentRows: Row[] = [
  ['r1', 'Hyundai', 'Elantra', 2024, 12000, 'A', 'petrol', 'sedan', 'available', 220, 0, 50, '2026-10-01'],
  ['r2', 'Skoda', 'Octavia', 2023, 18000, 'A', 'petrol', 'sedan', 'available', 240, 0, 46, '2026-10-03'],
  ['r3', 'Toyota', 'RAV4', 2024, 9000, 'A', 'hybrid', 'suv', 'in_rental', 380, 0, 70, '2026-10-05'],
  ['r4', 'Mazda', '3', 2023, 22000, 'A', 'petrol', 'hatchback', 'available', 230, 0, 38, '2026-09-30'],
  ['r5', 'Kia', 'Niro EV', 2024, 7000, 'A', 'electric', 'suv', 'available', 360, 0, 55, '2026-11-02'],
  ['r6', 'Mercedes-Benz', 'C200', 2023, 14000, 'A', 'petrol', 'luxury', 'available', 620, 0, 60, '2026-11-04'],
];

const ils = (shekels: number) => ({ amount: shekels * 100, currency: 'ILS' as const });
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const toCard = (r: Row, rental: boolean): VehicleCard => {
  const [id, make, model, year, km, trans, fuel, cat, status, price, prev, popularity, listedAt] = r;
  return {
    id, make, model, year, status, popularity, listedAt,
    slug: slugify(`${make}-${model}-${year}`),
    mileageKm: km,
    transmission: trans === 'A' ? 'automatic' : 'manual',
    fuelType: fuel,
    category: cat,
    primaryImageUrl: null,
    ...(rental
      ? { rental: { dailyRate: ils(price) } }
      : {
          sale: {
            price: ils(price),
            ...(prev ? { previousPrice: ils(prev), discountPercent: Math.round(((prev - price) / prev) * 100) } : {}),
          },
        }),
  };
};

export const forSale = sellRows.map((r) => toCard(r, false));
export const forRent = rentRows.map((r) => toCard(r, true));
export const allVehicles = [...forSale, ...forRent];

export const deals = forSale.filter((v) => v.sale?.discountPercent);
export const featured = [forSale[0]!, forSale[2]!, forSale[5]!, forSale[4]!];
export const latest = [...forSale].sort((a, b) => b.listedAt.localeCompare(a.listedAt)).slice(0, 3);

/** Ranges already booked, per rental vehicle id (the API's rentalBlocks in Phase 4). */
export const blockedRanges: Record<string, [string, string][]> = {
  r1: [['2026-11-20', '2026-11-25']],
  r2: [['2026-12-01', '2026-12-05']],
};

const colors = ['לבן', 'שחור', 'אפור', 'כחול', 'כסף'];
const engines: Record<VehicleCard['fuelType'], string> = {
  petrol: 'בנזין',
  diesel: 'דיזל',
  hybrid: 'היברידי',
  plug_in_hybrid: 'פלאג-אין היברידי',
  electric: 'חשמלי',
};

// SAMPLE details generated from the card: placeholders, not real vehicle data.
export function getVehicle(slug: string): VehicleDetail | undefined {
  const card = allVehicles.find((v) => v.slug === slug);
  if (!card) return undefined;
  const n = Number(card.id.replace(/\D/g, ''));
  return {
    ...card,
    description: 'תיאור לדוגמה. כאן יופיע תיאור הרכב כפי שיוזן בממשק הניהול.',
    specs: {
      engine: engines[card.fuelType],
      seats: card.category === 'convertible' || card.category === 'sports' ? 4 : 5,
      color: colors[n % colors.length]!,
      owners: 1 + (n % 2),
    },
    features: ['מזגן אוטומטי', 'מצלמה אחורית', 'חיישני חניה', 'Bluetooth', 'בקרת שיוט'],
  };
}

// SAMPLE testimonials: placeholders, not real customers. Replace with real ones before launch.
export const testimonials = [
  { name: 'לקוח לדוגמה', text: 'טקסט ביקורת לדוגמה. כאן יופיעו דברי לקוחות אמיתיים.' },
  { name: 'לקוחה לדוגמה', text: 'טקסט ביקורת לדוגמה. כאן יופיעו דברי לקוחות אמיתיים.' },
  { name: 'לקוח לדוגמה', text: 'טקסט ביקורת לדוגמה. כאן יופיעו דברי לקוחות אמיתיים.' },
];
