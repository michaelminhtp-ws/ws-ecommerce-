import type { Metadata } from "next";

export type LandingConfig = {
  slug: string;
  pixelId: string;
  title: string;
  description: string;
  ogImage?: string;
};

// Homepage:
// https://www.devopsbyteflexshift.com/
// Uses NEXT_PUBLIC_META_PIXEL_ID from Vercel.
//
// Path pages:
// /Co002 -> CO-Anan-002
// /Co003 -> CO-Anan-003
// /Co004 -> CO-Anan-004
//
// Pixel IDs are public browser identifiers, not access tokens.
export const LANDING_PAGES: Record<string, LandingConfig> = {
  Co002: {
    slug: "Co002",
    pixelId: "1145438844674496",
    title: "HirePro Colombia | Trabajo online flexible",
    description:
      "Descubre oportunidades flexibles de trabajo online en Colombia. Trabaja de forma remota y encuentra opciones de tiempo completo o medio tiempo.",
  },

  Co003: {
    slug: "Co003",
    pixelId: "1115162561371096",
    title: "HirePro Colombia | Trabajo online flexible",
    description:
      "Descubre oportunidades flexibles de trabajo online en Colombia. Trabaja de forma remota y encuentra opciones de tiempo completo o medio tiempo.",
  },

  Co004: {
    slug: "Co004",
    pixelId: "2054700951850488",
    title: "HirePro Colombia | Trabajo online flexible",
    description:
      "Descubre oportunidades flexibles de trabajo online en Colombia. Trabaja de forma remota y encuentra opciones de tiempo completo o medio tiempo.",
  },
};

export const HOME_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "2184553425802563";

export function getLandingConfig(slug?: string | null) {
  if (!slug) return null;
  return LANDING_PAGES[slug] || null;
}

export function getLandingConfigFromPath(pathname?: string | null) {
  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length !== 1) return null;

  return getLandingConfig(segments[0]);
}

export function getPixelIdForPath(pathname?: string | null) {
  if (!pathname || pathname === "/") return HOME_PIXEL_ID;

  const landing = getLandingConfigFromPath(pathname);

  return landing?.pixelId || "";
}

export function metadataForLanding(config: LandingConfig): Metadata {
  const baseUrl = "https://www.devopsbyteflexshift.com";
  const url = `${baseUrl}/${config.slug}`;

  return {
    title: config.title,
    description: config.description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: config.title,
      description: config.description,
      url,
      siteName: "HirePro Colombia",
      locale: "es_CO",
      type: "website",

      ...(config.ogImage
        ? {
            images: [
              {
                url: config.ogImage,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,

      ...(config.ogImage
        ? {
            images: [config.ogImage],
          }
        : {}),
    },
  };
}