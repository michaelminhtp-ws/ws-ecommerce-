// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import MetaPixel from "@/components/MetaPixel";
import TikTokPixel from "@/components/TikTokPixel";

export const metadata: Metadata = {
  title: "HirePro Colombia | Trabajo online flexible",
  description:
    "Descubre oportunidades flexibles de trabajo online en Colombia. Trabaja de forma remota y encuentra opciones de tiempo completo o medio tiempo.",
  openGraph: {
    title: "HirePro Colombia | Trabajo online flexible",
    description:
      "Descubre oportunidades flexibles de trabajo online en Colombia. Trabaja de forma remota y encuentra opciones de tiempo completo o medio tiempo.",
    url: "https://www.devopsbyteflexshift.com/",
    siteName: "HirePro Colombia",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HirePro Colombia | Trabajo online flexible",
    description:
      "Descubre oportunidades flexibles de trabajo online en Colombia. Trabaja de forma remota y encuentra opciones de tiempo completo o medio tiempo.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <MetaPixel />
        <TikTokPixel />
        {children}
      </body>
    </html>
  );
}
