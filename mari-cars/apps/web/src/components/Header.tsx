import Link from 'next/link';
import { site } from '@/lib/site';

const links = [
  { href: '/vehicles', label: 'רכבים למכירה' },
  { href: '/vehicles?mode=rent', label: 'שכירות' },
  { href: '/#why', label: 'למה אנחנו' },
  { href: '/#contact', label: 'צרו קשר' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Mari Cars, דף הבית">
          <span className="h-5 w-1.5 -skew-x-12 bg-ember" />
          <span className="text-lg font-black tracking-tight" dir="ltr">
            MARI<span className="text-ember">·</span>CARS
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-paper/80 md:flex" aria-label="ראשי">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-ember">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="cut hidden bg-ember px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-paper sm:block"
          >
            {site.phone}
          </a>
          <details className="relative md:hidden">
            <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-lg border border-line [&::-webkit-details-marker]:hidden">
              <span className="sr-only">תפריט</span>
              <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
                <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="2" />
              </svg>
            </summary>
            <nav
              className="absolute end-0 mt-3 w-56 rounded-xl border border-line bg-panel p-2 shadow-2xl"
              aria-label="נייד"
            >
              {links.map((l) => (
                <a key={l.href} href={l.href} className="block rounded-lg px-4 py-3 hover:bg-line">
                  {l.label}
                </a>
              ))}
              <a href={site.phoneHref} className="mt-1 block rounded-lg bg-ember px-4 py-3 font-bold text-ink">
                {site.phone}
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
