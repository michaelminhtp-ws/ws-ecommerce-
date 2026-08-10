import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Asystent E-Commerce | Praca zdalna',
  description: 'Oferta pracy dla Asystenta E-Commerce — zdalnie lub hybrydowo, elastyczny grafik i szkolenie.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
