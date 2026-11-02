// app/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Rocket,
  Star,
  Globe2,
  CheckCircle,
  Smartphone,
  Monitor,
  IdCard,
  Users,
  Lightbulb,
  ChevronDown,
} from "lucide-react";
import ApplicationForm from "./components/ApplicationForm";

const categories = [
  { name: "Design", icon: <Star className="h-5 w-5" aria-hidden /> },
  { name: "Marketing", icon: <Rocket className="h-5 w-5" aria-hidden /> },
  { name: "Operacje", icon: <Globe2 className="h-5 w-5" aria-hidden /> },
  {
    name: "Obsługa klienta",
    icon: <ShieldCheck className="h-5 w-5" aria-hidden />,
  },
  { name: "Sprzedaż", icon: <Star className="h-5 w-5" aria-hidden /> },
  { name: "Content", icon: <Star className="h-5 w-5" aria-hidden /> },
];

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-[var(--page)] text-[var(--text)]">
      <div className="border-b border-[#30290d] bg-[#17140b] px-3 py-1.5 text-center text-[11px] leading-snug text-[#e6d9a9] sm:text-xs">
        <span className="font-semibold text-[var(--brand)]">Nowość:</span>{" "}
        Elastyczne możliwości pracy online – bez opłaty za aplikację.
      </div>

      <header className="sticky top-0 z-30 border-b border-[#252a30] bg-[#0b0e11]/95 backdrop-blur-xl">
        <div className="container-page flex h-14 items-center justify-between gap-3 sm:h-16">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--brand)] font-black text-[#111] shadow-lg shadow-yellow-500/10 sm:h-9 sm:w-9 sm:rounded-xl">
              HP
            </div>
            <span className="font-semibold tracking-tight text-white">HirePro</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-[#9da3ab] md:flex">
            <a href="#how" className="nav-link">
              Jak to działa
            </a>
            <a href="#jobs" className="nav-link">
              Oferty
            </a>
            <a href="#req" className="nav-link">
              Wymagania
            </a>
            <a href="#faq" className="nav-link">
              FAQ
            </a>
          </nav>

          <Link href="#apply" className="btn-primary whitespace-nowrap px-4 py-2.5 text-sm sm:px-5">
            Aplikuj teraz
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b border-[#20252b] bg-[radial-gradient(circle_at_top_right,_rgba(240,185,11,0.10),_transparent_38%)]">
          <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 sm:py-7 md:py-8">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#50420e] bg-[#17140b] px-2.5 py-1 text-[11px] font-medium text-[#e6d9a9] sm:text-xs">
              <span aria-hidden>🇵🇱</span>
              Polska
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Zacznij <span className="text-[var(--brand)]">już teraz</span>
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#b9bec6] sm:mt-3 sm:text-base md:text-lg">
              Pracuj elastycznie i zdalnie. Poznaj możliwości pracy online,
              które możesz dopasować do swojego dnia.
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#aab0b8] sm:mt-4 sm:text-sm">
              <HeroPoint text="Brak opłaty za aplikację" />
              <HeroPoint text="Prosty proces aplikacji" />
              <HeroPoint text="Elastyczne możliwości pracy" />
            </div>
          </div>
        </section>

        <section className="container-page py-4 sm:py-6">
          <ApplicationForm />
        </section>

        <section id="how" className="section-compact border-t border-[#1d2228]">
          <div className="container-page">
            <SectionHeading
              eyebrow="Obszary"
              title="Poznaj możliwości według kategorii"
              description="Sprawdź elastyczne możliwości pracy w różnych obszarach."
            />

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="card-like flex items-center gap-2.5 px-3 py-3.5 transition hover:-translate-y-0.5 hover:border-[#5b4b11]"
                >
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#201c0c] text-[var(--brand)]">
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium text-[#e6e8ea]">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="jobs" className="section-compact bg-[var(--surface-soft)]">
          <div className="container-page">
            <SectionHeading
              eyebrow="Modele pracy"
              title="Możliwości pracy na pełny i niepełny etat"
              description="Porównaj elastyczne opcje i wybierz model dopasowany do swojej dostępności."
            />

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              <Card title="Niepełny etat">
                <ul className="space-y-2.5 text-sm leading-relaxed text-[#b6bbc3]">
                  <li>
                    W zależności od rodzaju i zakresu zadań możliwe jest około{" "}
                    <strong>130–1 650 zł dziennie</strong>
                  </li>
                  <li>
                    Przy pracy w niepełnym wymiarze można osiągnąć około{" "}
                    <strong>8 000–11 500 zł brutto miesięcznie</strong>
                  </li>
                  <li>Elastyczne godziny zależne od dostępnych zadań</li>
                  <li>Wygodna realizacja zadań online przez smartfon</li>
                  <li>Podstawowe umiejętności cyfrowe będą dodatkowym atutem</li>
                  <li>Możliwość elastycznej pracy z domu</li>
                </ul>
              </Card>

              <Card title="Pełny etat">
                <ul className="space-y-2.5 text-sm leading-relaxed text-[#b6bbc3]">
                  <li>
                    Przy pracy w pełnym wymiarze można osiągnąć około{" "}
                    <strong>15 300–20 600 zł brutto miesięcznie</strong>
                  </li>
                  <li>
                    W zależności od rodzaju i zakresu zadań możliwe jest do{" "}
                    <strong>1 650 zł dziennie</strong>
                  </li>
                  <li>Elastyczne godziny zależne od rodzaju pracy</li>
                  <li>Zadania online można wykonywać przez smartfon</li>
                  <li>Podstawowe umiejętności cyfrowe będą dodatkowym atutem</li>
                  <li>Wygodna praca z domu</li>
                </ul>
              </Card>

              <Card title="Elastyczna praca z dodatkowymi możliwościami">
                <ul className="space-y-3 text-sm leading-relaxed text-[#b6bbc3]">
                  <li>
                    <strong>Elastyczny udział:</strong> wybieraj dostępne zadania
                    zgodnie ze swoim czasem i dostępnością.
                  </li>
                  <li>
                    <strong>Możliwości długoterminowe:</strong> regularna
                    aktywność może zapewnić dostęp do kolejnych dostępnych zadań.
                  </li>
                  <li>
                    <strong>Dodatkowe możliwości:</strong> wybrane zadania lub
                    programy mogą być oferowane zależnie od kwalifikacji
                    i dostępności.
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        <section className="section-compact">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="overflow-hidden rounded-2xl border border-[#5b4b11] bg-gradient-to-br from-[#19160c] via-[#111418] to-[#0d1014] p-6 shadow-2xl shadow-black/20 sm:p-7">
              <p className="text-sm font-semibold text-[var(--brand)]">
                Znajdź możliwość dopasowaną do siebie
              </p>
              <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                Pracuj z domu
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#aeb4bc] sm:text-base">
                Korzystaj z elastycznych możliwości pracy, organizuj swój czas
                i wykonuj odpowiednie zadania online.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat number="183,2+" label="APLIKACJE" />
                <Stat number="12 500+" label="ZADANIA" />
                <Stat number="300+" label="ZESPÓŁ" />
                <Stat number="4,81" label="SATYSFAKCJA" />
              </div>
            </div>
          </div>
        </section>

        <section id="req" className="section-compact border-y border-[#1d2228] bg-[var(--surface-soft)]">
          <div className="container-page">
            <SectionHeading
              eyebrow="Wymagania"
              title="Czego potrzebujesz"
              description="Najważniejsze wymagania w skrócie."
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Req
                icon={<Smartphone className="h-5 w-5" />}
                text="Elastyczna praca online przez smartfon"
              />
              <Req
                icon={<Monitor className="h-5 w-5" />}
                text="Wymagany smartfon i dostęp do internetu"
              />
              <Req
                icon={<IdCard className="h-5 w-5" />}
                text="Kandydaci muszą mieć co najmniej 18 lat"
              />
              <Req
                icon={<Users className="h-5 w-5" />}
                text="Oferta dla odpowiednich i kwalifikujących się kandydatów"
              />
              <Req
                icon={<Lightbulb className="h-5 w-5" />}
                text="Podstawowe umiejętności cyfrowe będą dodatkowym atutem"
              />
            </div>
          </div>
        </section>

        <section id="why" className="section-compact">
          <div className="container-page grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                title: "Uporządkowany proces aplikacji",
                desc: "Prosty proces przesłania i weryfikacji aplikacji.",
              },
              {
                icon: <Rocket className="h-5 w-5" />,
                title: "Łatwy start",
                desc: "Po złożeniu aplikacji odpowiedni kandydaci otrzymają dalsze informacje o dostępnych możliwościach.",
              },
              {
                icon: <Star className="h-5 w-5" />,
                title: "Elastyczne możliwości",
                desc: "Dostępne opcje zależą od kwalifikacji, rodzaju pracy i dostępności.",
              },
            ].map((feature) => (
              <div key={feature.title} className="card-like p-5">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-[#201c0c] text-[var(--brand)]">
                  {feature.icon}
                </div>
                <p className="font-semibold text-white">{feature.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#aeb4bc]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <FAQSection />

        <section className="border-t border-[#30290d] bg-[#17140b] py-9 sm:py-10">
          <div className="container-page flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h3 className="m-0 text-2xl font-semibold text-white">
                Gotowy, aby aplikować?
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-[#b6bbc3]">
                Wypełnij formularz aplikacyjny. Po pomyślnym przesłaniu możesz
                kontynuować aplikację przez Telegram.
              </p>
            </div>

            <Link href="#apply" className="btn-primary whitespace-nowrap px-6">
              Aplikuj teraz
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#22272d] bg-[#090b0e] py-8">
        <div className="container-page grid gap-7 text-sm text-[#8f959e] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-[var(--brand)] font-black text-[#111]">
              HP
            </div>
            <p className="text-sm leading-relaxed text-[#8f959e]">
              HirePro pomaga odkrywać elastyczne możliwości pracy zdalnej.
            </p>
          </div>

          <Column title="Firma" items={["O nas", "Kariera", "Blog"]} />
          <Column title="Wsparcie" items={["Pomoc", "Bezpieczeństwo", "Kontakt"]} />
          <Column
            title="Informacje prawne"
            items={["Warunki", "Prywatność", "Cookies"]}
          />
        </div>

        <div className="mt-6 text-center text-xs text-[#666d76]">
          © {new Date().getFullYear()} HirePro, Inc. Wszelkie prawa zastrzeżone.
        </div>
      </footer>
    </div>
  );
}

function HeroPoint({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <CheckCircle className="h-4 w-4 text-[var(--brand)]" />
      {text}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
        {eyebrow}
      </p>
      <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#9da3ab] sm:text-base">
        {description}
      </p>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-like p-5">
      <p className="mb-3 text-base font-bold text-[var(--brand)]">{title}</p>
      {children}
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-xl border border-[#2b3036] bg-[#0b0e11]/80 p-3">
      <div className="text-xl font-semibold text-white sm:text-2xl">{number}</div>
      <div className="mt-1 text-[10px] tracking-widest text-[#8f959e]">
        {label}
      </div>
    </div>
  );
}

function Req({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="card-like flex items-center gap-3 p-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#201c0c] text-[var(--brand)]">
        {icon}
      </div>
      <p className="text-sm leading-snug text-[#d1d4d8]">{text}</p>
    </div>
  );
}

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 font-semibold text-[#e5e7e9]">{title}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item}>
            <a className="footer-link" href="#">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FAQSection() {
  const items = [
    {
      q: "Kto może aplikować?",
      a: "Aplikować mogą osoby od 18. roku życia, które mają smartfon i dostęp do internetu.",
    },
    {
      q: "Czy praca jest zdalna?",
      a: "Tak. Odpowiednie zadania można wykonywać online z miejsca ze stabilnym dostępem do internetu.",
    },
    {
      q: "Jak mogę aplikować?",
      a: "Wypełnij formularz aplikacyjny i wyślij go. Po pomyślnym przesłaniu pojawi się przycisk umożliwiający kontynuowanie aplikacji przez Telegram.",
    },
    {
      q: "Co dzieje się po złożeniu aplikacji?",
      a: "Po otrzymaniu aplikacji dane są weryfikowane. Odpowiedni kandydaci otrzymają następnie dalsze informacje o dostępnych możliwościach.",
    },
    {
      q: "Jak elastyczne są godziny pracy?",
      a: "Godziny zależą od rodzaju pracy, dostępnych zadań i wybranego modelu współpracy.",
    },
  ];

  return (
    <section id="faq" className="section-compact border-t border-[#1d2228] bg-[var(--surface-soft)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Najczęściej zadawane pytania"
          description="Odpowiedzi na najważniejsze pytania dotyczące aplikacji."
        />

        <div className="mt-5 space-y-2.5">
          {items.map((item, index) => (
            <FAQItem key={index} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`overflow-hidden rounded-xl border bg-[var(--surface)] transition ${
        open ? "border-[#6a5711]" : "border-[#30363d]"
      }`}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-[#eef0f2]">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[var(--brand)] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-[#2a3036] px-4 pb-4 pt-3 text-sm leading-relaxed text-[#aeb4bc]">
          {a}
        </div>
      )}
    </div>
  );
}
