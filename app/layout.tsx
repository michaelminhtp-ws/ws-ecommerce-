// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import MetaPixel from "@/components/MetaPixel";
import TikTokPixel from "@/components/TikTokPixel";

export const metadata: Metadata = {
  title: "HirePro Polska | Elastyczna praca online",

  description:
    "Poznaj elastyczne możliwości pracy online w Polsce. Pracuj zdalnie i znajdź odpowiednie opcje pracy na pełny lub niepełny etat.",

  openGraph: {
    title: "HirePro Polska | Elastyczna praca online",

    description:
      "Poznaj elastyczne możliwości pracy online w Polsce. Pracuj zdalnie i znajdź odpowiednie opcje pracy na pełny lub niepełny etat.",

    url: "https://www.intelhirepropl.com/",

    siteName: "HirePro Polska",

    locale: "pl_PL",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "HirePro Polska | Elastyczna praca online",

    description:
      "Poznaj elastyczne możliwości pracy online w Polsce. Pracuj zdalnie i znajdź odpowiednie opcje pracy na pełny lub niepełny etat.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <MetaPixel />
        <TikTokPixel />
        {children}
      </body>
    </html>
  );
}
