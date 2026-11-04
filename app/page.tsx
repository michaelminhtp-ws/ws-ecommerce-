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
  { name: "Diseño", icon: <Star className="h-5 w-5" aria-hidden /> },
  { name: "Marketing", icon: <Rocket className="h-5 w-5" aria-hidden /> },
  { name: "Operaciones", icon: <Globe2 className="h-5 w-5" aria-hidden /> },
  {
    name: "Atención al cliente",
    icon: <ShieldCheck className="h-5 w-5" aria-hidden />,
  },
  { name: "Ventas", icon: <Star className="h-5 w-5" aria-hidden /> },
  { name: "Contenido", icon: <Star className="h-5 w-5" aria-hidden /> },
];

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-[var(--page)] text-[var(--text)]">
      <div className="border-b border-[#30290d] bg-[#17140b] px-3 py-1.5 text-center text-[11px] leading-snug text-[#e6d9a9] sm:text-xs">
        <span className="font-semibold text-[var(--brand)]">Nuevo:</span>{" "}
        Oportunidades flexibles de trabajo online, sin costo de solicitud.
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
            <a href="#how" className="nav-link">Cómo funciona</a>
            <a href="#jobs" className="nav-link">Oportunidades</a>
            <a href="#req" className="nav-link">Requisitos</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>

          <Link href="#apply" className="btn-primary whitespace-nowrap px-4 py-2.5 text-sm sm:px-5">
            Solicitar ahora
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b border-[#20252b] bg-[radial-gradient(circle_at_top_right,_rgba(240,185,11,0.10),_transparent_38%)]">
          <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 sm:py-7 md:py-8">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#50420e] bg-[#17140b] px-2.5 py-1 text-[11px] font-medium text-[#e6d9a9] sm:text-xs">
              <span aria-hidden>🇨🇴</span>
              Colombia
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Empieza <span className="text-[var(--brand)]">hoy mismo</span>
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#b9bec6] sm:mt-3 sm:text-base md:text-lg">
              Trabaja de forma flexible y remota. Descubre oportunidades online
              que puedes adaptar a tu día.
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#aab0b8] sm:mt-4 sm:text-sm">
              <HeroPoint text="Sin costo de solicitud" />
              <HeroPoint text="Proceso de solicitud sencillo" />
              <HeroPoint text="Oportunidades de trabajo flexibles" />
            </div>
          </div>
        </section>

        <section className="container-page py-4 sm:py-6">
          <ApplicationForm />
        </section>

        <section id="how" className="section-compact border-t border-[#1d2228]">
          <div className="container-page">
            <SectionHeading
              eyebrow="Áreas"
              title="Explora oportunidades por categoría"
              description="Conoce opciones de trabajo flexible en distintas áreas."
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
              eyebrow="Modalidades"
              title="Opciones de tiempo completo y medio tiempo"
              description="Compara opciones flexibles y elige la modalidad que mejor se adapte a tu disponibilidad."
            />

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              <Card title="Medio tiempo">
                <ul className="space-y-2.5 text-sm leading-relaxed text-[#b6bbc3]">
                  <li>
                    Según el tipo y el alcance de las tareas, es posible obtener aproximadamente{" "}
                    <strong>$42.000–$128.000 al día</strong>
                  </li>
                  <li>
                    En modalidad de medio tiempo se puede alcanzar aproximadamente{" "}
                    <strong>$1.800.000–$2.100.000 brutos al mes</strong>
                  </li>
                  <li>Horarios flexibles según las tareas disponibles</li>
                  <li>Realiza tareas online cómodamente desde tu smartphone</li>
                  <li>Las habilidades digitales básicas son una ventaja</li>
                  <li>Posibilidad de trabajar desde casa de forma flexible</li>
                </ul>
              </Card>

              <Card title="Tiempo completo">
                <ul className="space-y-2.5 text-sm leading-relaxed text-[#b6bbc3]">
                  <li>
                    En modalidad de tiempo completo se puede alcanzar aproximadamente{" "}
                    <strong>$3.200.000–$5.800.000 brutos al mes</strong>
                  </li>
                  <li>
                    Según el tipo y el alcance de las tareas, es posible obtener hasta{" "}
                    <strong>$122.000 al día</strong>
                  </li>
                  <li>Horarios flexibles según el tipo de trabajo</li>
                  <li>Las tareas online pueden realizarse desde un smartphone</li>
                  <li>Las habilidades digitales básicas son una ventaja</li>
                  <li>Trabajo cómodo desde casa</li>
                </ul>
              </Card>

              <Card title="Trabajo flexible con oportunidades adicionales">
                <ul className="space-y-3 text-sm leading-relaxed text-[#b6bbc3]">
                  <li>
                    <strong>Participación flexible:</strong> elige tareas disponibles
                    según tu tiempo y disponibilidad.
                  </li>
                  <li>
                    <strong>Oportunidades a largo plazo:</strong> una actividad regular
                    puede darte acceso a nuevas tareas disponibles.
                  </li>
                  <li>
                    <strong>Oportunidades adicionales:</strong> algunas tareas o
                    programas pueden ofrecerse según tus cualificaciones y disponibilidad.
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
                Encuentra una oportunidad que se adapte a ti
              </p>
              <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                Trabaja desde casa
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#aeb4bc] sm:text-base">
                Aprovecha oportunidades flexibles, organiza tu tiempo y realiza
                tareas online adecuadas para ti.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat number="183,2+" label="SOLICITUDES" />
                <Stat number="12.500+" label="TAREAS" />
                <Stat number="300+" label="EQUIPO" />
                <Stat number="4,81" label="SATISFACCIÓN" />
              </div>
            </div>
          </div>
        </section>

        <section id="req" className="section-compact border-y border-[#1d2228] bg-[var(--surface-soft)]">
          <div className="container-page">
            <SectionHeading
              eyebrow="Requisitos"
              title="Lo que necesitas"
              description="Los requisitos principales, de forma sencilla."
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Req icon={<Smartphone className="h-5 w-5" />} text="Trabajo online flexible desde tu smartphone" />
              <Req icon={<Monitor className="h-5 w-5" />} text="Smartphone y acceso a internet" />
              <Req icon={<IdCard className="h-5 w-5" />} text="Los candidatos deben tener al menos 18 años" />
              <Req icon={<Users className="h-5 w-5" />} text="Dirigido a candidatos adecuados que cumplan los requisitos" />
              <Req icon={<Lightbulb className="h-5 w-5" />} text="Las habilidades digitales básicas son una ventaja" />
            </div>
          </div>
        </section>

        <section id="why" className="section-compact">
          <div className="container-page grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                title: "Proceso de solicitud organizado",
                desc: "Un proceso sencillo para enviar y verificar tu solicitud.",
              },
              {
                icon: <Rocket className="h-5 w-5" />,
                title: "Inicio sencillo",
                desc: "Después de enviar la solicitud, los candidatos adecuados recibirán más información sobre las oportunidades disponibles.",
              },
              {
                icon: <Star className="h-5 w-5" />,
                title: "Oportunidades flexibles",
                desc: "Las opciones disponibles dependen de las cualificaciones, el tipo de trabajo y la disponibilidad.",
              },
            ].map((feature) => (
              <div key={feature.title} className="card-like p-5">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-[#201c0c] text-[var(--brand)]">
                  {feature.icon}
                </div>
                <p className="font-semibold text-white">{feature.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#aeb4bc]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <FAQSection />

        <section className="border-t border-[#30290d] bg-[#17140b] py-9 sm:py-10">
          <div className="container-page flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h3 className="m-0 text-2xl font-semibold text-white">¿Listo para solicitar?</h3>
              <p className="mt-2 max-w-2xl text-sm text-[#b6bbc3]">
                Completa el formulario. Después de enviarlo correctamente,
                podrás continuar tu solicitud por Telegram.
              </p>
            </div>

            <Link href="#apply" className="btn-primary whitespace-nowrap px-6">
              Solicitar ahora
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#22272d] bg-[#090b0e] py-8">
        <div className="container-page grid gap-7 text-sm text-[#8f959e] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-[var(--brand)] font-black text-[#111]">HP</div>
            <p className="text-sm leading-relaxed text-[#8f959e]">
              HirePro te ayuda a descubrir oportunidades flexibles de trabajo remoto.
            </p>
          </div>

          <Column title="Empresa" items={["Sobre nosotros", "Carreras", "Blog"]} />
          <Column title="Soporte" items={["Ayuda", "Seguridad", "Contacto"]} />
          <Column title="Legal" items={["Términos", "Privacidad", "Cookies"]} />
        </div>

        <div className="mt-6 text-center text-xs text-[#666d76]">
          © {new Date().getFullYear()} HirePro, Inc. Todos los derechos reservados.
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

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#9da3ab] sm:text-base">{description}</p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
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
      <div className="mt-1 text-[10px] tracking-widest text-[#8f959e]">{label}</div>
    </div>
  );
}

function Req({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="card-like flex items-center gap-3 p-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#201c0c] text-[var(--brand)]">{icon}</div>
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
          <li key={item}><a className="footer-link" href="#">{item}</a></li>
        ))}
      </ul>
    </div>
  );
}

function FAQSection() {
  const items = [
    {
      q: "¿Quién puede solicitar?",
      a: "Pueden solicitar personas mayores de 18 años que tengan un smartphone y acceso a internet.",
    },
    {
      q: "¿El trabajo es remoto?",
      a: "Sí. Las tareas adecuadas pueden realizarse online desde un lugar con acceso estable a internet.",
    },
    {
      q: "¿Cómo puedo solicitar?",
      a: "Completa y envía el formulario. Después de enviarlo correctamente aparecerá un botón para continuar la solicitud por Telegram.",
    },
    {
      q: "¿Qué ocurre después de enviar la solicitud?",
      a: "Después de recibirla, los datos se verifican. Los candidatos adecuados recibirán más información sobre las oportunidades disponibles.",
    },
    {
      q: "¿Qué tan flexibles son los horarios?",
      a: "Los horarios dependen del tipo de trabajo, las tareas disponibles y la modalidad seleccionada.",
    },
  ];

  return (
    <section id="faq" className="section-compact border-t border-[#1d2228] bg-[var(--surface-soft)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Preguntas frecuentes"
          description="Respuestas a las preguntas principales sobre el proceso de solicitud."
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
    <div className={`overflow-hidden rounded-xl border bg-[var(--surface)] transition ${open ? "border-[#6a5711]" : "border-[#30363d]"}`}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-[#eef0f2]">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-[var(--brand)] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-[#2a3036] px-4 pb-4 pt-3 text-sm leading-relaxed text-[#aeb4bc]">{a}</div>
      )}
    </div>
  );
}
