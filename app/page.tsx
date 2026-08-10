'use client';

const features = [
  ['📍', 'Cała Polska'],
  ['💼', 'Pełny etat'],
  ['🕒', 'Część etatu'],
  ['🏠', 'Zdalna'],
  ['🏢', 'Hybrydowa'],
  ['📅', 'Elastyczny grafik'],
  ['🎓', 'Szkolenie'],
];

const tasks = [
  'Aktualizować proste oferty produktowe',
  'Wspierać obsługę zamówień',
  'Przygotowywać podstawowe raporty',
  'Wykonywać proste zadania online zgodnie z instrukcją',
  'Komunikować się z zespołem, gdy zajdzie potrzeba',
];

const requirements = [
  'Ukończone 21 lat',
  'Telefon lub komputer z dobrym internetem',
  'Dobra komunikacja z zespołem',
  'Podstawowy angielski',
  'Wymagana znajomość języka lokalnego',
  'Brak wymaganego doświadczenia',
  'Brak wymagań co do płci',
];

const benefits = [
  ['💼', 'Pełny etat / część etatu'],
  ['🏠', 'Praca zdalna lub hybrydowa'],
  ['🎓', 'Szkolenie i wdrożenie'],
  ['👥', 'Wsparcie zespołu'],
  ['📈', 'Możliwość premii'],
  ['🚀', 'Szybki start'],
];

const reviews = [
  {
    initials: 'K',
    name: 'Kamil, 27',
    city: 'Warszawa',
    text: 'Świetne wdrożenie i zespół! Praca zdalna daje mi dużą swobodę.',
    pay: '6 800 PLN brutto / mies.',
  },
  {
    initials: 'N',
    name: 'Natalia, 31',
    city: 'Kraków',
    text: 'Nie miałam doświadczenia, a teraz czuję się pewnie w zespole.',
    pay: '6 200 PLN brutto / mies.',
  },
  {
    initials: 'P',
    name: 'Paulina, 25',
    city: 'Wrocław',
    text: 'Elastyczny grafik pozwala mi łączyć pracę z innymi planami.',
    pay: '6 500 PLN brutto / mies.',
  },
];

const faqs = [
  [
    'Czy wymagane jest doświadczenie?',
    'Nie. Zapewniamy krótkie wdrożenie oraz proste instrukcje potrzebne na start.',
  ],
  [
    'Czy mogę pracować tylko z telefonu?',
    'Do części zadań wystarczy telefon, ale komputer może być wygodniejszy przy dłuższej pracy.',
  ],
  [
    'Ile godzin dziennie trzeba pracować?',
    'Orientacyjnie 1–3 godziny przy części etatu i około 6 godzin przy pełnym etacie.',
  ],
  [
    'Jak szybko mogę zacząć?',
    'Po kontakcie przez WhatsApp otrzymasz szczegóły oferty i dalsze kroki.',
  ],
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="waIcon">
      <path
        fill="currentColor"
        d="M19.11 17.35c-.31-.16-1.84-.91-2.13-1.01-.28-.1-.49-.16-.7.16-.21.31-.8 1.01-.98 1.22-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.54-.92-.82-1.55-1.84-1.73-2.15-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.7-1.69-.96-2.31-.25-.61-.51-.53-.7-.54h-.6c-.21 0-.54.08-.83.39-.28.31-1.09 1.07-1.09 2.6s1.12 3.02 1.27 3.23c.16.21 2.2 3.36 5.33 4.71.74.32 1.32.51 1.77.65.74.24 1.42.2 1.96.12.6-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.28-.21-.59-.36Z"
      />
      <path
        fill="currentColor"
        d="M16.02 3.2a12.63 12.63 0 0 0-10.84 19.1L3.4 28.8l6.65-1.74a12.62 12.62 0 1 0 5.97-23.86Zm0 22.96c-1.88 0-3.72-.51-5.32-1.47l-.38-.23-3.95 1.03 1.05-3.85-.25-.4a10.34 10.34 0 1 1 8.85 4.92Z"
      />
    </svg>
  );
}

function CTA({ label }: { label: string }) {
  return (
    <button
      className="cta"
      type="button"
      onClick={() =>
        alert('WhatsApp redirect will be connected in a later phase.')
      }
    >
      <WhatsAppIcon />
      <span>{label}</span>
    </button>
  );
}

export default function Home() {
  return (
    <main className="pageShell">
      <div className="ticker" aria-label="Rekrutacja aktywna">
        <div className="tickerTrack">
          • Rekrutacja aktywna • Nie zwlekaj • Zostały tylko 3 miejsca 🔥 •
          Rekrutacja aktywna • Nie zwlekaj •
        </div>
      </div>

      <section className="hero glassCard">
        <div className="heroBrandRow">
          <div className="brandIdentity">
            <div className="brandLogo" aria-label="Tymczasowe logo">
              A
            </div>

            <div>
              <div className="brandName">ALLEYBIZCOM Sp. z o.o.</div>
              <div className="brandMeta">
                Lublin • Technology Recruitment™
              </div>
            </div>
          </div>

          <div className="startBadge">OD ZARAZ</div>
        </div>

        <div className="ratingRow">
          <span className="stars">★★★★★</span>
          <strong>4.9</strong>
          <span>na podstawie 1 357+ opinii</span>
        </div>

        <div className="recommend">
          <span className="dot" />
          94% kandydatów poleca tę ofertę
        </div>

        <h1>Asystent E-Commerce</h1>

        <p className="leadText">
          Nie wymagamy doświadczenia! Zapewniamy pełne szkolenie i wsparcie
          na każdym etapie.
        </p>

        <div className="chips">
          {features.map(([icon, label]) => (
            <span className="chip" key={label}>
              <span>{icon}</span>
              {label}
            </span>
          ))}
        </div>

        <div className="salaryBox">
          <div className="salaryMain">
            <div className="salaryIcon">💳</div>

            <div>
              <strong>6 000–7 500 PLN</strong>
              <span>brutto / miesiąc</span>
              <em>+ możliwa premia</em>
            </div>
          </div>

          <div className="salaryCompare">
            <span>Średnia krajowa:</span>
            <strong>4 000 PLN</strong>
          </div>
        </div>

        <CTA label="Zapytaj o pracę przez WhatsApp" />
      </section>

      <section className="quickStats">
        <div className="statCard">
          <span>💳</span>
          <div>
            <strong>6 000–7 500 PLN</strong>
            <small>brutto / miesiąc</small>
          </div>
        </div>

        <div className="statCard">
          <span>👤</span>
          <div>
            <strong>Brak</strong>
            <small>doświadczenia</small>
          </div>
        </div>

        <div className="statCard">
          <span>🎂</span>
          <div>
            <strong>21+</strong>
            <small>wiek</small>
          </div>
        </div>

        <div className="statCard">
          <span>🕒</span>
          <div>
            <strong>Elastyczny</strong>
            <small>grafik</small>
          </div>
        </div>
      </section>

      <section className="twoCol">
        <article className="glassCard sectionCard">
          <h2>📋 Co będziesz robić?</h2>

          <ul className="checkList">
            {tasks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="glassCard sectionCard">
          <h2>🎁 Co otrzymasz?</h2>

          <div className="benefitGrid">
            {benefits.map(([icon, label]) => (
              <div className="benefit" key={label}>
                <span>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="glassCard sectionCard requirements">
        <h2>👤 Czego potrzebujesz?</h2>

        <ul className="checkList">
          {requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="reviewsGrid">
        {reviews.map((review) => (
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

      <section className="midCta glassCard">
        <div className="midCtaText">
          <div className="waBubble">
            <WhatsAppIcon />
          </div>

          <div>
            <strong>Zainteresowana/y?</strong>
            <span>Napisz do nas i dowiedz się więcej o ofercie.</span>
          </div>
        </div>

        <CTA label="Aplikuj przez WhatsApp" />
      </section>

      <section className="glassCard sectionCard">
        <h2>Jak wygląda rozpoczęcie?</h2>

        <div className="steps">
          <div className="step">
            <span>1</span>
            <strong>Napisz do nas</strong>
            <p>
              Skontaktuj się przez WhatsApp — odpowiemy szybko i konkretnie.
            </p>
          </div>

          <div className="step">
            <span>2</span>
            <strong>Krótkie wdrożenie</strong>
            <p>Otrzymasz szkolenie i wszystkie potrzebne materiały.</p>
          </div>

          <div className="step">
            <span>3</span>
            <strong>Rozpocznij pracę</strong>
            <p>
              Zacznij pracować zdalnie lub hybrydowo — zgodnie z ustaleniami.
            </p>
          </div>
        </div>
      </section>

      <section className="glassCard sectionCard faqSection">
        <h2>Najczęściej zadawane pytania</h2>

        <div className="faqs">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>

              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="trustCard glassCard">
        <div className="trustIcon">🛡️</div>

        <div>
          <strong>Dbamy o Twoje bezpieczeństwo i komfort pracy.</strong>
          <span>
            Wszystkie warunki współpracy omawiamy jasno i przejrzyście.
          </span>
        </div>

        <div className="heart">♡</div>
      </section>

      <div className="bottomSpacer" />

      <div className="stickyCta">
        <CTA label="Napisz na WhatsApp" />
      </div>
    </main>
  );
}
