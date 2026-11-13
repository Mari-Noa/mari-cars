import { z } from 'zod';

export const Locale = z.enum(['he', 'en']);
export type Locale = z.infer<typeof Locale>;

export const VehicleStatus = z.enum([
  'draft',
  'available',
  'reserved',
  'sold',
  'in_rental',
  'maintenance',
  'archived',
]);
export const Transmission = z.enum(['automatic', 'manual']);
export const FuelType = z.enum(['petrol', 'diesel', 'hybrid', 'plug_in_hybrid', 'electric']);
export const VehicleCategory = z.enum([
  'sedan',
  'suv',
  'hatchback',
  'coupe',
  'convertible',
  'van',
  'pickup',
  'sports',
  'luxury',
]);

/** Hebrew is required (default locale); English is optional until the second locale ships. */
export const LocalizedText = z.object({ he: z.string().min(1), en: z.string().optional() });

/** Money is always an integer in minor units (agorot) plus a currency. */
export const Money = z.object({
  amount: z.number().int().nonnegative(),
  currency: z.literal('ILS').default('ILS'),
});
export type Money = z.infer<typeof Money>;

export const VehicleCard = z.object({
  id: z.string(),
  slug: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number().int(),
  mileageKm: z.number().int().nonnegative(),
  transmission: Transmission,
  fuelType: FuelType,
  category: VehicleCategory,
  status: VehicleStatus,
  primaryImageUrl: z.string().nullable(),
  popularity: z.number().int().default(0),
  listedAt: z.string(),
  sale: z
    .object({
      price: Money,
      previousPrice: Money.optional(),
      discountPercent: z.number().int().min(0).max(100).optional(),
    })
    .optional(),
  rental: z.object({ dailyRate: Money }).optional(),
});
export type VehicleCard = z.infer<typeof VehicleCard>;

export const VehicleDetail = VehicleCard.extend({
  description: z.string(),
  specs: z.object({
    engine: z.string(),
    seats: z.number().int(),
    color: z.string(),
    owners: z.number().int(),
  }),
  features: z.array(z.string()),
});
export type VehicleDetail = z.infer<typeof VehicleDetail>;
