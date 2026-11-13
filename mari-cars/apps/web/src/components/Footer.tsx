import { site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-5 w-1.5 -skew-x-12 bg-ember" />
            <span className="text-lg font-black" dir="ltr">MARI<span className="text-ember">·</span>CARS</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
            עסק משפחתי למכירה והשכרה של רכבים. שירות אישי, שקיפות ומחיר הוגן.
          </p>
        </div>
        <nav aria-label="קישורים" className="grid gap-3 text-sm text-paper/80">
          <a href="/#sale" className="hover:text-ember">רכבים למכירה</a>
          <a href="/#rent" className="hover:text-ember">שכירות</a>
          <a href="/#why" className="hover:text-ember">למה אנחנו</a>
          <a href="/#contact" className="hover:text-ember">צרו קשר</a>
        </nav>
        <div className="grid gap-2 text-sm text-paper/80">
          <a href={site.phoneHref} className="hover:text-ember" dir="ltr" style={{ textAlign: 'start' }}>{site.phone}</a>
          <span>{site.address}</span>
          <span className="text-mist">{site.hours}</span>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-mist">
        © {new Date().getFullYear()} Mari Cars. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
