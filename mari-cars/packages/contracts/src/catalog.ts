import { z } from 'zod';
import { FuelType, Transmission, VehicleCategory } from './vehicle';

/** Form fields arrive as '' when empty, and URLs can be edited by hand: bad values fall back to "not set". */
const blank = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === '' || v === null ? undefined : v), schema.optional().catch(undefined));

export const CatalogSort = z.enum(['newest', 'price_asc', 'price_desc', 'popular', 'deals']);

export const CatalogQuery = z.object({
  mode: z.enum(['buy', 'rent']).catch('buy'),
  q: blank(z.string().trim().max(80)),
  minPrice: blank(z.coerce.number().nonnegative()),
  maxPrice: blank(z.coerce.number().nonnegative()),
  make: blank(z.string().max(40)),
  minYear: blank(z.coerce.number().int()),
  maxYear: blank(z.coerce.number().int()),
  maxKm: blank(z.coerce.number().int().nonnegative()),
  transmission: blank(Transmission),
  fuel: blank(FuelType),
  category: blank(VehicleCategory),
  availableOnly: blank(z.literal('1')),
  deals: blank(z.literal('1')),
  sort: CatalogSort.catch('newest'),
  page: z.coerce.number().int().min(1).catch(1),
});
export type CatalogQuery = z.infer<typeof CatalogQuery>;
