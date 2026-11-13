export const transmissionLabel = { automatic: 'אוטומט', manual: 'ידני' } as const;

export const fuelLabel = {
  petrol: 'בנזין',
  diesel: 'דיזל',
  hybrid: 'היברידי',
  plug_in_hybrid: 'פלאג-אין',
  electric: 'חשמלי',
} as const;

export const categoryLabel = {
  sedan: 'סדאן',
  suv: 'רכב שטח',
  hatchback: 'האצ׳בק',
  coupe: 'קופה',
  convertible: 'קבריולה',
  van: 'מסחרי',
  pickup: 'טנדר',
  sports: 'ספורט',
  luxury: 'יוקרה',
} as const;

export const statusLabel = {
  draft: 'טיוטה',
  available: 'זמין',
  reserved: 'שמור',
  sold: 'נמכר',
  in_rental: 'מושכר',
  maintenance: 'בטיפול',
  archived: 'בארכיון',
} as const;
