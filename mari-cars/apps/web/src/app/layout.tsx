import type { Metadata } from 'next';
import { Heebo } from 'next/font/google';
import './globals.css';

const heebo = Heebo({ subsets: ['hebrew', 'latin'], variable: '--font-heebo', display: 'swap' });

export const metadata: Metadata = {
  title: 'Mari Cars | מכירה והשכרה של רכבים',
  description: 'עסק משפחתי למכירה והשכרה של רכבים. מבחר רכבים, מחירים הוגנים ושירות אישי.',
};

// Hebrew is the default locale: right-to-left from the first render.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
