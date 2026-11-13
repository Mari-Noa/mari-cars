import type { InquiryInput, RentalRequestInput } from '@mari-cars/contracts';

// STUBS: nothing is sent anywhere yet. Phase 5 replaces these with real calls to the API
// (POST `${NEXT_PUBLIC_API_URL}/inquiries` and `/rentals`).
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function submitInquiry(input: InquiryInput) {
  void input;
  await wait(500);
  return { ok: true as const };
}

export async function submitRental(input: RentalRequestInput) {
  void input;
  await wait(500);
  return { ok: true as const };
}
