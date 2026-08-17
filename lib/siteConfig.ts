export type IconName =
  | 'location'
  | 'briefcase'
  | 'clock'
  | 'home'
  | 'building'
  | 'calendar'
  | 'graduation'
  | 'card'
  | 'user'
  | 'users'
  | 'chart'
  | 'rocket'
  | 'clipboard'
  | 'gift'
  | 'shield'
  | 'heart'
  | 'age';

export const siteConfig = {
  general: {
  country: 'Poland',
  language: 'Polish',
  languageCode: 'pl',
  locale: 'pl-PL',
  currency: 'PLN',
  pageTitle: 'Asystent E-Commerce',
  metaDescription:
    'Oferta pracy dla Asystenta E-Commerce — elastyczna forma pracy, szkolenie i wsparcie.',
},

  sections: {
    showTicker: true,
    showSalary: true,
    showSalaryComparison: true,
    showHeroCta: true,
    showQuickStats: true,
    showTasks: true,
    showBenefits: true,
    showRequirements: true,
    showReviews: true,
    showMidCta: true,
    showSteps: true,
    showFaq: true,
    showFooterTrust: true,
    showStickyCta: true,
  },

  brand: {
    companyName: 'ALLEYBIZCOM Sp. z o.o.',
    subtitle: 'Lublin • Technology Recruitment™',
    logoAlt: 'Tymczasowe logo firmy',
    logoFallbackText: 'A',
    logoImageUrl: '',
    startBadge: 'OD ZARAZ',
  },

  ticker: {
    ariaLabel: 'Rekrutacja aktywna',
    text:
      '• Rekrutacja aktywna • Nie zwlekaj • Zostały tylko 3 miejsca 🔥 • Rekrutacja aktywna • Nie zwlekaj •',
  },

  hero: {
    rating: '4.9',
    reviewCountText: 'na podstawie 1 357+ opinii',
    recommendationText: '94% kandydatów poleca tę ofertę',
    jobTitle: 'Asystent E-Commerce',
    description:
      'Nie wymagamy doświadczenia! Zapewniamy pełne szkolenie i wsparcie na każdym etapie.',
    features: [
      { icon: 'location' as IconName, label: 'Cała Polska' },
      { icon: 'briefcase' as IconName, label: 'Pełny etat' },
      { icon: 'clock' as IconName, label: 'Część etatu' },
      { icon: 'home' as IconName, label: 'Zdalna' },
      { icon: 'building' as IconName, label: 'Hybrydowa' },
      { icon: 'calendar' as IconName, label: 'Elastyczny grafik' },
      { icon: 'graduation' as IconName, label: 'Szkolenie' },
    ],
  },

  salary: {
    minimum: 6000,
    maximum: 7500,
    taxLabel: 'brutto',
    periodLabel: 'miesiąc',
    bonusText: '+ możliwa premia',
    comparisonLabel: 'Średnia krajowa:',
    comparisonValue: 4000,
  },

  quickStats: {
    experience: { title: 'Brak', subtitle: 'doświadczenia' },
    age: { title: '21+', subtitle: 'wiek' },
    schedule: { title: 'Elastyczny', subtitle: 'grafik' },
  },

  tasks: {
    title: 'Co będziesz robić?',
    items: [
      'Aktualizować proste oferty produktowe',
      'Wspierać obsługę zamówień',
      'Przygotowywać podstawowe raporty',
      'Wykonywać proste zadania online zgodnie z instrukcją',
      'Komunikować się z zespołem, gdy zajdzie potrzeba',
    ],
  },

  benefits: {
    title: 'Co otrzymasz?',
    items: [
      { icon: 'briefcase' as IconName, label: 'Pełny etat / część etatu' },
      { icon: 'home' as IconName, label: 'Praca zdalna lub hybrydowa' },
      { icon: 'graduation' as IconName, label: 'Szkolenie i wdrożenie' },
      { icon: 'users' as IconName, label: 'Wsparcie zespołu' },
      { icon: 'chart' as IconName, label: 'Możliwość premii' },
      { icon: 'rocket' as IconName, label: 'Szybki start' },
    ],
  },

  requirements: {
    title: 'Czego potrzebujesz?',
    items: [
      'Ukończone 21 lat',
      'Telefon lub komputer z dobrym internetem',
      'Dobra komunikacja z zespołem',
      'Podstawowy angielski',
      'Wymagana znajomość języka lokalnego',
      'Brak wymaganego doświadczenia',
      'Brak wymagań co do płci',
    ],
  },

  reviews: [
    {
      initials: 'K',
      name: 'Kamil, 27',
      city: 'Warszawa',
      text: 'Świetne wdrożenie i zespół! Praca zdalna daje mi dużą swobodę.',
      pay: '6 800 PLN brutto / mies.',
      imageUrl: '',
    },
    {
      initials: 'N',
      name: 'Natalia, 31',
      city: 'Kraków',
      text: 'Nie miałam doświadczenia, a teraz czuję się pewnie w zespole.',
      pay: '6 200 PLN brutto / mies.',
      imageUrl: '',
    },
    {
      initials: 'P',
      name: 'Paulina, 25',
      city: 'Wrocław',
      text: 'Elastyczny grafik pozwala mi łączyć pracę z innymi planami.',
      pay: '6 500 PLN brutto / mies.',
      imageUrl: '',
    },
  ],

  midCta: {
    title: 'Zainteresowana/y?',
    subtitle: 'Napisz do nas i dowiedz się więcej o ofercie.',
  },

  steps: {
    title: 'Jak wygląda rozpoczęcie?',
    items: [
      {
        title: 'Napisz do nas',
        description: 'Skontaktuj się przez WhatsApp — odpowiemy szybko i konkretnie.',
      },
      {
        title: 'Krótkie wdrożenie',
        description: 'Otrzymasz szkolenie i wszystkie potrzebne materiały.',
      },
      {
        title: 'Rozpocznij pracę',
        description: 'Zacznij pracować zdalnie lub hybrydowo — zgodnie z ustaleniami.',
      },
    ],
  },

  faq: {
    title: 'Najczęściej zadawane pytania',
    items: [
      {
        question: 'Czy wymagane jest doświadczenie?',
        answer: 'Nie. Zapewniamy krótkie wdrożenie oraz proste instrukcje potrzebne na start.',
      },
      {
        question: 'Czy mogę pracować tylko z telefonu?',
        answer: 'Do części zadań wystarczy telefon, ale komputer może być wygodniejszy przy dłuższej pracy.',
      },
      {
        question: 'Ile godzin dziennie trzeba pracować?',
        answer: 'Orientacyjnie 1–3 godziny przy części etatu i około 6 godzin przy pełnym etacie.',
      },
      {
        question: 'Jak szybko mogę zacząć?',
        answer: 'Po kontakcie przez WhatsApp otrzymasz szczegóły oferty i dalsze kroki.',
      },
    ],
  },

  cta: {
    hero: 'Zapytaj o pracę przez WhatsApp',
    middle: 'Aplikuj przez WhatsApp',
    sticky: 'Napisz na WhatsApp',
  },

  footerTrust: {
    title: 'Dbamy o Twoje bezpieczeństwo i komfort pracy.',
    description: 'Wszystkie warunki współpracy omawiamy jasno i przejrzyście.',
  },

  media: {
    logoImageUrl: '',
    review1ImageUrl: '',
    review2ImageUrl: '',
    review3ImageUrl: '',
  },

  system: {
    placeholderWhatsAppMessage: 'WhatsApp redirect will be connected in a later phase.',
  },
} as const;
