import { CarArt } from '@/components/CarArt';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { VehicleCardView } from '@/components/VehicleCardView';
import { deals, featured, forRent, latest, testimonials } from '@/lib/sample-data';
import { site } from '@/lib/site';

const wrap = 'mx-auto max-w-7xl px-5 md:px-8';

const categories = [
  { label: 'סדאן', q: 'category=sedan' },
  { label: 'רכב שטח', q: 'category=suv' },
  { label: 'האצ׳בק', q: 'category=hatchback' },
  { label: 'ספורט', q: 'category=sports' },
  { label: 'קבריולה', q: 'category=convertible' },
  { label: 'חשמלי', q: 'fuel=electric' },
];

const why = [
  { t: 'שקיפות מלאה', d: 'מחיר, היסטוריה ופרטי הרכב גלויים לפני שמגיעים אלינו.' },
  { t: 'שירות משפחתי', d: 'מדברים עם אותם אנשים מהפנייה הראשונה ועד המסירה.' },
  { t: 'מכירה והשכרה במקום אחד', d: 'לא בטוחים אם לקנות או לשכור? נסביר ונתאים את הדרך.' },
  { t: 'ליווי אחרי העסקה', d: 'אנחנו זמינים גם אחרי שיצאתם לדרך.' },
];

function Heading({ eyebrow, title, dark = true, href }: { eyebrow: string; title: string; dark?: boolean; href?: string }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-4">
      <div>
        <p className="mb-3 flex items-center gap-2 text-sm font-bold text-ember">
          <span className="h-px w-8 bg-ember" />
          {eyebrow}
        </p>
        <h2 className={`text-3xl font-black tracking-tight md:text-5xl ${dark ? 'text-paper' : 'text-ink'}`}>{title}</h2>
      </div>
      {href ? (
        <a href={href} className="shrink-0 text-sm font-bold text-ember hover:underline">
          לכל הרכבים ←
        </a>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="speed-lines relative overflow-hidden border-b border-line">
          <div className={`${wrap} grid items-center gap-10 py-16 md:grid-cols-2 md:py-28`}>
            <div className="rise">
              <p className="mb-5 flex items-center gap-2 text-sm font-bold text-ember">
                <span className="h-px w-8 bg-ember" />
                עסק משפחתי · מכירה והשכרה
              </p>
              <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                הרכב הבא שלך
                <br />
                <span className="text-ember">מחכה כאן.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">
                מבחר רכבים נבחרים למכירה ולהשכרה, מחירים שקופים ושירות אישי מהיכרות ראשונה ועד המסירה.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#sale" className="cut bg-ember px-7 py-3.5 font-bold text-ink transition hover:bg-paper">
                  לצפייה ברכבים
                </a>
                <a href="#sale" className="rounded-sm border border-paper/30 px-7 py-3.5 font-bold transition hover:border-ember hover:text-ember">
                  קנו רכב
                </a>
                <a href="#rent" className="rounded-sm border border-paper/30 px-7 py-3.5 font-bold transition hover:border-ember hover:text-ember">
                  שכרו רכב
                </a>
              </div>
            </div>
            <div className="drive-in relative">
              <CarArt className="w-full text-paper" />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b border-line bg-carbon" aria-label="סוגי רכבים">
          <div className={`${wrap} flex gap-3 overflow-x-auto py-6`}>
            {categories.map((c, i) => (
              <a
                key={c.q}
                href={`/vehicles?${c.q}`}
                className="flex shrink-0 items-center gap-3 rounded-full border border-line px-6 py-3 text-sm font-bold transition hover:border-ember hover:text-ember"
              >
                <span className="text-xs text-mist" dir="ltr">0{i + 1}</span>
                {c.label}
              </a>
            ))}
          </div>
        </section>

        {/* Featured */}
        <section id="sale" className="scroll-mt-16 bg-paper py-20 text-ink md:py-28">
          <div className={wrap}>
            <Heading eyebrow="נבחרים" title="רכבים מומלצים" dark={false} href="/vehicles" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((v) => <VehicleCardView key={v.id} v={v} tone="light" />)}
            </div>
          </div>
        </section>

        {/* Latest + deals */}
        <section className="py-20 md:py-28">
          <div className={wrap}>
            <Heading eyebrow="מבצעים" title="מחירים שמורידים" href="/vehicles?deals=1" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {deals.slice(0, 3).map((v) => <VehicleCardView key={v.id} v={v} />)}
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-carbon py-20 md:py-28">
          <div className={wrap}>
            <Heading eyebrow="חדש אצלנו" title="הגיעו לאחרונה" href="/vehicles?sort=newest" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((v) => <VehicleCardView key={v.id} v={v} />)}
            </div>
          </div>
        </section>

        {/* Rentals */}
        <section id="rent" className="scroll-mt-16 bg-paper py-20 text-ink md:py-28">
          <div className={wrap}>
            <Heading eyebrow="שכירות" title="רכבים להשכרה" dark={false} href="/vehicles?mode=rent" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {forRent.map((v) => <VehicleCardView key={v.id} v={v} tone="light" />)}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section id="why" className="scroll-mt-16 py-20 md:py-28">
          <div className={wrap}>
            <Heading eyebrow="למה אנחנו" title="עסק קטן. סטנדרט גבוה." />
            <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {why.map((w, i) => (
                <div key={w.t} className="bg-ink p-8 transition hover:bg-panel">
                  <div className="mb-6 text-sm font-black text-ember" dir="ltr">0{i + 1}</div>
                  <h3 className="mb-3 text-xl font-bold">{w.t}</h3>
                  <p className="text-sm leading-relaxed text-mist">{w.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y border-line bg-carbon py-20 md:py-28">
          <div className={wrap}>
            <Heading eyebrow="לקוחות" title="מה אומרים עלינו" />
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <figure key={i} className="rounded-2xl border border-line bg-panel p-7">
                  <blockquote className="leading-relaxed text-paper/90">{t.text}</blockquote>
                  <figcaption className="mt-5 text-sm font-bold text-ember">{t.name}</figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-5 text-xs text-mist">ביקורות לדוגמה בלבד. יוחלפו בביקורות אמיתיות לפני ההשקה.</p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-16 py-20 md:py-28">
          <div className={wrap}>
            <Heading eyebrow="צרו קשר" title="בואו נדבר." />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid content-start gap-4">
                <a href={site.phoneHref} className="cut flex items-center justify-between bg-ember px-7 py-5 text-lg font-black text-ink transition hover:bg-paper">
                  <span>התקשרו</span>
                  <span dir="ltr">{site.phone}</span>
                </a>
                <a href={site.whatsappHref} className="flex items-center justify-between rounded-sm border border-paper/30 px-7 py-5 text-lg font-bold transition hover:border-ember hover:text-ember">
                  <span>וואטסאפ</span>
                  <span aria-hidden="true">←</span>
                </a>
              </div>
              <div className="rounded-2xl border border-line bg-panel p-8">
                <h3 className="mb-4 text-lg font-bold">כתובת ושעות פעילות</h3>
                <p className="text-paper/90">{site.address}</p>
                <p className="mt-2 text-mist">{site.hours}</p>
                <div className="speed-lines mt-6 grid h-40 place-items-center rounded-xl border border-line text-sm text-mist">
                  מפה תתווסף כאן
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
