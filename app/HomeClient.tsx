'use client';

import { useState, type ReactNode } from 'react';
import Script from 'next/script';
import { siteConfig, type IconName } from '../lib/siteConfig';

function BaseIcon({
  children,
  size = 20,
  color = 'currentColor',
}: {
  children: ReactNode;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      style={{
        display: 'inline-block',
        flexShrink: 0,
        color,
        verticalAlign: 'middle',
      }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function Icon({
  name,
  size = 20,
  color = 'currentColor',
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  switch (name) {
    case 'location':
      return (
        <BaseIcon size={size} color={color}>
          <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z" />
          <circle cx="12" cy="11" r="2.2" />
        </BaseIcon>
      );
    case 'briefcase':
      return (
        <BaseIcon size={size} color={color}>
          <rect x="3" y="7" width="18" height="12" rx="2" />
          <path d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7" />
          <path d="M3 11.5h18" />
        </BaseIcon>
      );
    case 'clock':
      return (
        <BaseIcon size={size} color={color}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5v4.8l3.2 1.8" />
        </BaseIcon>
      );
    case 'home':
      return (
        <BaseIcon size={size} color={color}>
          <path d="M4 10.5 12 4l8 6.5" />
          <path d="M6.5 9.8V20h11V9.8" />
          <path d="M10 20v-5h4v5" />
        </BaseIcon>
      );
    case 'building':
      return (
        <BaseIcon size={size} color={color}>
          <rect x="6" y="3.5" width="12" height="17" rx="1.8" />
          <path d="M9 7h1M14 7h1M9 10.5h1M14 10.5h1M9 14h1M14 14h1" />
          <path d="M11 20.5v-3h2v3" />
        </BaseIcon>
      );
    case 'calendar':
      return (
        <BaseIcon size={size} color={color}>
          <rect x="3" y="5.5" width="18" height="15" rx="2" />
          <path d="M8 3.5v4M16 3.5v4M3 9.5h18" />
        </BaseIcon>
      );
    case 'graduation':
      return (
        <BaseIcon size={size} color={color}>
          <path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z" />
          <path d="M7 11.5v3.2c0 1.8 2.2 3.3 5 3.3s5-1.5 5-3.3v-3.2" />
        </BaseIcon>
      );
    case 'card':
      return (
        <BaseIcon size={size} color={color}>
          <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
          <path d="M3 10h18" />
          <path d="M7 15h3.5" />
        </BaseIcon>
      );
    case 'user':
      return (
        <BaseIcon size={size} color={color}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 19c1.3-2.6 3.7-4 6.5-4s5.2 1.4 6.5 4" />
        </BaseIcon>
      );
    case 'users':
      return (
        <BaseIcon size={size} color={color}>
          <circle cx="9" cy="9" r="2.5" />
          <circle cx="16.2" cy="10" r="2.1" />
          <path d="M4.5 18c1-2.2 2.9-3.4 4.9-3.4s3.9 1.2 4.9 3.4" />
          <path d="M14 17.8c.7-1.5 2-2.3 3.5-2.3 1.3 0 2.4.6 3 1.7" />
        </BaseIcon>
      );
    case 'chart':
      return (
        <BaseIcon size={size} color={color}>
          <path d="M5 19h14" />
          <path d="M7 16v-4" />
          <path d="M12 16V9" />
          <path d="M17 16v-7" />
        </BaseIcon>
      );
    case 'rocket':
      return (
        <BaseIcon size={size} color={color}>
          <path d="M14.5 4.5c2.8.3 5 2.5 5.3 5.3-1.1 1.8-2.8 3.8-5 5.9l-3.6-3.6c2.1-2.2 4.1-3.9 5.9-5Z" />
          <path d="M11.2 12.1 8.6 14.7" />
          <path d="M9 18l-3 .8.8-3L9 18Z" />
          <path d="M13.8 8.2h.01" />
        </BaseIcon>
      );
    case 'clipboard':
      return (
        <BaseIcon size={size} color={color}>
          <rect x="5" y="5.5" width="14" height="15" rx="2" />
          <path d="M9 5.5v-1a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 4.5v1" />
          <path d="M8.5 10h7M8.5 13.5h7M8.5 17h4.5" />
        </BaseIcon>
      );
    case 'gift':
      return (
        <BaseIcon size={size} color={color}>
          <rect x="4" y="9" width="16" height="11" rx="2" />
          <path d="M12 9v11M4 13h16" />
          <path d="M12 9H8.8A1.8 1.8 0 1 1 10 5.7L12 9Z" />
          <path d="M12 9h3.2A1.8 1.8 0 1 0 14 5.7L12 9Z" />
        </BaseIcon>
      );
    case 'shield':
      return (
        <BaseIcon size={size} color={color}>
          <path d="M12 3.5 19 6v5.5c0 4.2-2.7 7.4-7 9-4.3-1.6-7-4.8-7-9V6l7-2.5Z" />
        </BaseIcon>
      );
    case 'heart':
      return (
        <BaseIcon size={size} color={color}>
          <path d="M12 20s-6.5-4.3-8.3-8a4.8 4.8 0 0 1 8.3-4.7A4.8 4.8 0 0 1 20.3 12C18.5 15.7 12 20 12 20Z" />
        </BaseIcon>
      );
    case 'age':
      return (
        <BaseIcon size={size} color={color}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M9 9.5h2v5" />
          <path d="M13 11.5c0-1.2.9-2 2.1-2 1.1 0 1.9.7 1.9 1.8 0 .9-.4 1.4-1.4 2.1l-1.5 1.1h3" />
        </BaseIcon>
      );
    default:
      return null;
  }
}

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      className="waIcon"
      style={{ display: 'inline-block', flexShrink: 0 }}
    >
      <path
        fill="currentColor"
        d="M16.02 3.2c-6.95 0-12.6 5.6-12.6 12.5 0 2.22.58 4.38 1.69 6.28L3.3 28.8l6.98-1.82a12.66 12.66 0 0 0 5.74 1.38h.01c6.95 0 12.59-5.61 12.59-12.51 0-3.34-1.31-6.48-3.69-8.84A12.52 12.52 0 0 0 16.02 3.2Zm0 22.95h-.01a10.46 10.46 0 0 1-5.34-1.47l-.38-.22-4.14 1.08 1.11-4.02-.24-.41a10.25 10.25 0 0 1-1.57-5.42c0-5.69 4.67-10.32 10.42-10.32 2.78 0 5.38 1.08 7.35 3.04a10.23 10.23 0 0 1 3.06 7.29c0 5.7-4.67 10.33-10.43 10.33Z"
      />
      <path
        fill="currentColor"
        d="M21.9 18.54c-.33-.16-1.95-.95-2.25-1.06-.3-.11-.52-.16-.74.17-.22.33-.86 1.06-1.05 1.28-.19.22-.39.25-.72.08-.33-.16-1.39-.51-2.65-1.63-.98-.87-1.65-1.95-1.84-2.28-.19-.33-.02-.5.14-.66.15-.15.33-.39.5-.58.17-.19.22-.33.33-.55.11-.22.06-.41-.03-.58-.09-.16-.74-1.78-1.02-2.44-.27-.65-.54-.56-.74-.57-.18-.01-.39-.01-.6-.01s-.56.08-.85.41c-.3.33-1.14 1.11-1.14 2.71 0 1.59 1.16 3.13 1.32 3.35.17.22 2.27 3.47 5.49 4.87.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.95-.79 2.22-1.56.27-.77.27-1.43.19-1.56-.08-.14-.3-.22-.63-.38Z"
      />
    </svg>
  );
}

function SectionTitle({
  icon,
  title,
}: {
  icon: IconName;
  title: string;
}) {
  return (
    <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span
        style={{
          width: 32,
          height: 32,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          background: '#eef8f3',
          color: '#23b26d',
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={18} />
      </span>
      {title}
    </h2>
  );
}

function QuickStatIcon({
  icon,
  color,
}: {
  icon: IconName;
  color: string;
}) {
  return (
    <span
      style={{
        width: 46,
        height: 46,
        minWidth: 46,
        minHeight: 46,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        flexShrink: 0,
      }}
    >
      <Icon name={icon} size={28} color={color} />
    </span>
  );
}

const WHATSAPP_REDIRECT_URL = 'https://api.devopsbyteflexshift.com/go';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type MetaPixelWindow = Window & {
  fbq?: (...args: unknown[]) => void;
};

function trackMetaEvent(eventName: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const metaWindow = window as MetaPixelWindow;

  if (typeof metaWindow.fbq === 'function') {
    metaWindow.fbq('track', eventName);
  }
}

function CTA({ label }: { label: string }) {
  return (
    <button
      className="cta"
      type="button"
      onClick={() => {
        trackMetaEvent('Contact');
        window.location.href = WHATSAPP_REDIRECT_URL;
      }}
    >
      <WhatsAppIcon />
      <span>{label}</span>
    </button>
  );
}

function formatSalary(min: number, max: number, currency: string) {
  return `${min.toLocaleString('pl-PL')}–${max.toLocaleString('pl-PL')} ${currency}`;
}

export default function HomeClient({
  initialConfig,
}: {
  initialConfig: typeof siteConfig;
}) {
  const [config] = useState(initialConfig);

  const salaryText = formatSalary(
    config.salary.minimum,
    config.salary.maximum,
    config.general.currency,
  );

  return (
    <main className="pageShell">
      {META_PIXEL_ID && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
              fbq('track', 'ViewContent');
            `,
          }}
        />
      )}

      {config.sections.showTicker && (
        <div className="ticker" aria-label={config.ticker.ariaLabel}>
          <div className="tickerTrack">{config.ticker.text}</div>
        </div>
      )}

      <section className="hero glassCard">
        <div className="heroBrandRow">
          <div className="brandIdentity">
            <div className="brandLogo" aria-label={config.brand.logoAlt}>
              {config.brand.logoFallbackText}
            </div>

            <div>
              <div className="brandName">{config.brand.companyName}</div>
              <div className="brandMeta">{config.brand.subtitle}</div>
            </div>
          </div>

          <div className="startBadge">{config.brand.startBadge}</div>
        </div>

        <div className="ratingRow">
          <span className="stars">★★★★★</span>
          <strong>{config.hero.rating}</strong>
          <span>{config.hero.reviewCountText}</span>
        </div>

        <div className="recommend">
          <span className="dot" />
          {config.hero.recommendationText}
        </div>

        <h1>{config.hero.jobTitle}</h1>

        <p className="leadText">{config.hero.description}</p>

        <div className="chips">
          {config.hero.features.map((item) => (
            <span
              className="chip"
              key={item.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Icon name={item.icon} size={16} color="#6c7ba1" />
              {item.label}
            </span>
          ))}
        </div>

        {config.sections.showSalary && (
          <div className="salaryBox">
            <div className="salaryMain">
              <div
                className="salaryIcon"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#23b26d',
                }}
              >
                <Icon name="card" size={22} />
              </div>

              <div>
                <strong>{salaryText}</strong>
                <span>
                  {config.salary.taxLabel} / {config.salary.periodLabel}
                </span>
                <em>{config.salary.bonusText}</em>
              </div>
            </div>

            {config.sections.showSalaryComparison && (
              <div className="salaryCompare">
                <span>{config.salary.comparisonLabel}</span>
                <strong>
                  {config.salary.comparisonValue.toLocaleString('pl-PL')}{' '}
                  {config.general.currency}
                </strong>
              </div>
            )}
          </div>
        )}

        {config.sections.showHeroCta && (
          <CTA label={config.cta.hero} />
        )}
      </section>

      {config.sections.showQuickStats && (
        <section className="quickStats">
          <div className="statCard">
            <QuickStatIcon icon="card" color="#23b26d" />
            <div>
              <strong>{salaryText}</strong>
              <small>
                {config.salary.taxLabel} / {config.salary.periodLabel}
              </small>
            </div>
          </div>

          <div className="statCard">
            <QuickStatIcon icon="user" color="#4f7cff" />
            <div>
              <strong>{config.quickStats.experience.title}</strong>
              <small>{config.quickStats.experience.subtitle}</small>
            </div>
          </div>

          <div className="statCard">
            <QuickStatIcon icon="age" color="#ff9d2e" />
            <div>
              <strong>{config.quickStats.age.title}</strong>
              <small>{config.quickStats.age.subtitle}</small>
            </div>
          </div>

          <div className="statCard">
            <QuickStatIcon icon="clock" color="#5a84ff" />
            <div>
              <strong>{config.quickStats.schedule.title}</strong>
              <small>{config.quickStats.schedule.subtitle}</small>
            </div>
          </div>
        </section>
      )}

      {(config.sections.showTasks || config.sections.showBenefits) && (
        <section className="twoCol">
          {config.sections.showTasks && (
            <article className="glassCard sectionCard">
              <SectionTitle icon="clipboard" title={config.tasks.title} />

              <ul className="checkList">
                {config.tasks.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          )}

          {config.sections.showBenefits && (
            <article className="glassCard sectionCard">
              <SectionTitle icon="gift" title={config.benefits.title} />

              <div className="benefitGrid">
                {config.benefits.items.map((item) => (
                  <div
                    className="benefit"
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <Icon name={item.icon} size={18} color="#6b7da8" />
                    {item.label}
                  </div>
                ))}
              </div>
            </article>
          )}
        </section>
      )}

      {config.sections.showRequirements && (
        <section className="glassCard sectionCard requirements">
          <SectionTitle icon="user" title={config.requirements.title} />

          <ul className="checkList">
            {config.requirements.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {config.sections.showReviews && (
        <section className="reviewsGrid">
          {config.reviews.map((review) => (
            <article className="reviewCard glassCard" key={review.name}>
              <div className="reviewHead">
                <div className="avatar">{review.initials}</div>

                <div>
                  <strong>{review.name}</strong>
                  <span>{review.city}</span>
                </div>

                <div className="quote">“</div>
              </div>

              <p>{review.text}</p>
              <strong className="reviewPay">{review.pay}</strong>
            </article>
          ))}
        </section>
      )}

      {config.sections.showMidCta && (
        <section className="midCta glassCard">
          <div className="midCtaText">
            <div className="waBubble">
              <WhatsAppIcon />
            </div>

            <div>
              <strong>{config.midCta.title}</strong>
              <span>{config.midCta.subtitle}</span>
            </div>
          </div>

          <CTA label={config.cta.middle} />
        </section>
      )}

      {config.sections.showSteps && (
        <section className="glassCard sectionCard">
          <h2>{config.steps.title}</h2>

          <div className="steps">
            {config.steps.items.map((step, index) => (
              <div className="step" key={step.title}>
                <span>{index + 1}</span>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {config.sections.showFaq && (
        <section className="glassCard sectionCard faqSection">
          <h2>{config.faq.title}</h2>

          <div className="faqs">
            {config.faq.items.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span>+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {config.sections.showFooterTrust && (
        <section className="trustCard glassCard">
          <div
            className="trustIcon"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#5a84ff',
            }}
          >
            <Icon name="shield" size={24} />
          </div>

          <div>
            <strong>{config.footerTrust.title}</strong>
            <span>{config.footerTrust.description}</span>
          </div>

          <div
            className="heart"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c7cfeb',
            }}
          >
            <Icon name="heart" size={20} />
          </div>
        </section>
      )}

      <div className="bottomSpacer" />

      {config.sections.showStickyCta && (
        <div className="stickyCta">
          <CTA label={config.cta.sticky} />
        </div>
      )}
    </main>
  );
}
