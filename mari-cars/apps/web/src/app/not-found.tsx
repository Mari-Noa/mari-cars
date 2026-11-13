import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="grid min-h-[60vh] place-items-center px-5 text-center">
        <div>
          <p className="text-7xl font-black text-ember" dir="ltr">404</p>
          <h1 className="mt-4 text-2xl font-black">הדף לא נמצא</h1>
          <Link href="/vehicles" className="cut mt-8 inline-block bg-ember px-7 py-3.5 font-bold text-ink hover:bg-paper">
            לכל הרכבים
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
