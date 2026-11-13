import type { Money } from '@mari-cars/contracts';

const ils = new Intl.NumberFormat('he-IL', {
  style: 'currency',
  currency: 'ILS',
  maximumFractionDigits: 0,
});

/** Money is stored in agorot; display in shekels. */
export const formatMoney = (m: Money) => ils.format(m.amount / 100);
export const formatKm = (km: number) => `${km.toLocaleString('he-IL')} ק״מ`;
