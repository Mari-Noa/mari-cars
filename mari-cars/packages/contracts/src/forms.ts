import { z } from 'zod';

export const InquiryType = z.enum(['purchase', 'callback', 'test_drive', 'general']);
export type InquiryType = z.infer<typeof InquiryType>;

const name = z.string().trim().min(2, 'נא למלא שם').max(80);
const phone = z
  .string()
  .trim()
  .regex(/^[0-9+\-\s()]{7,20}$/, 'מספר טלפון לא תקין');
const email = z.string().trim().email('כתובת אימייל לא תקינה').or(z.literal('')).optional();
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'תאריך לא תקין');

export const InquiryInput = z.object({
  type: InquiryType,
  vehicleId: z.string().optional(),
  name,
  phone,
  email,
  message: z.string().trim().max(2000).optional(),
});
export type InquiryInput = z.infer<typeof InquiryInput>;

export const RentalRequestInput = z
  .object({
    vehicleId: z.string(),
    startDate: isoDate,
    endDate: isoDate,
    name,
    phone,
    email,
    notes: z.string().trim().max(2000).optional(),
  })
  .refine((d) => d.endDate >= d.startDate, {
    message: 'תאריך ההחזרה חייב להיות אחרי תאריך האיסוף',
    path: ['endDate'],
  });
export type RentalRequestInput = z.infer<typeof RentalRequestInput>;
