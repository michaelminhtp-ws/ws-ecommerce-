import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '../lib/siteConfig';

async function getPublishedGeneral() {
  try {
    const response = await fetch(
      'https://api.devopsbyteflexshift.com/api/site-content',
      {
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      return siteConfig.general;
    }

    const data = await response.json();

    return data?.ok === true && data?.content?.general
      ? data.content.general
      : siteConfig.general;
  } catch {
    return siteConfig.general;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const general = await getPublishedGeneral();

  return {
    title: general.pageTitle || siteConfig.general.pageTitle,
    description:
      general.metaDescription || siteConfig.general.metaDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const general = await getPublishedGeneral();

  const languageCode =
    general.languageCode || siteConfig.general.languageCode || 'en';

  return (
    <html lang={languageCode}>
      <body>{children}</body>
    </html>
  );
}
