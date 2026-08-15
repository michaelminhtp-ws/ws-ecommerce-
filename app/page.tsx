import HomeClient from './HomeClient';
import { siteConfig } from '../lib/siteConfig';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let initialConfig: typeof siteConfig = siteConfig;

  try {
    const response = await fetch(
      'https://api.devopsbyteflexshift.com/api/site-content',
      {
        cache: 'no-store',
      },
    );

    if (response.ok) {
      const data = await response.json();

      if (data?.ok === true && data?.content) {
        initialConfig = data.content as typeof siteConfig;
      }
    }
  } catch (error) {
    console.error('Using local siteConfig fallback:', error);
  }

  return <HomeClient initialConfig={initialConfig} />;
}
