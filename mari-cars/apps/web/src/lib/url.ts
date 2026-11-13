/** Builds a /vehicles URL from the current query plus changes. Changing anything resets paging. */
export function buildHref(
  raw: Record<string, string | undefined>,
  patch: Record<string, string | undefined>,
) {
  const next = { ...raw, ...patch };
  if (!('page' in patch)) delete next.page;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) if (v) params.set(k, v);
  const s = params.toString();
  return s ? `/vehicles?${s}` : '/vehicles';
}
