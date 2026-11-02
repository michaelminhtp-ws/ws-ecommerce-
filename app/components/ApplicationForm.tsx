"use client";

import React, { useMemo, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { fbqTrack } from "@/lib/pixel";
import { ttqTrack } from "@/lib/tiktok";

const BOT_USERNAME =
  process.env.NEXT_PUBLIC_BOT_USERNAME || "Asignr_aciondetarea_bot";

const COUNTRIES = [
  { iso: "co", name: "Colombia", dial: "+57", flag: "🇨🇴" },
  { iso: "ve", name: "Venezuela", dial: "+58", flag: "🇻🇪" },
  { iso: "ec", name: "Ecuador", dial: "+593", flag: "🇪🇨" },
  { iso: "pe", name: "Perú", dial: "+51", flag: "🇵🇪" },
  { iso: "pa", name: "Panamá", dial: "+507", flag: "🇵🇦" },
  { iso: "br", name: "Brasil", dial: "+55", flag: "🇧🇷" },
  { iso: "mx", name: "México", dial: "+52", flag: "🇲🇽" },
  { iso: "ar", name: "Argentina", dial: "+54", flag: "🇦🇷" },
  { iso: "cl", name: "Chile", dial: "+56", flag: "🇨🇱" },
  { iso: "bo", name: "Bolivia", dial: "+591", flag: "🇧🇴" },
  { iso: "us", name: "EE. UU./Canadá", dial: "+1", flag: "🇺🇸" },
  { iso: "es", name: "España", dial: "+34", flag: "🇪🇸" },
];

const isMobile = () =>
  /iPhone|iPad|iPod|Android/i.test(
    typeof navigator === "undefined" ? "" : navigator.userAgent
  );

const onlyDigits = (value: string) => value.replace(/\D+/g, "");

const normalizeLocalPhone = (dial: string, value: string) => {
  const countryCode = onlyDigits(dial);
  let localNumber = onlyDigits(value);

  while (localNumber.startsWith("00")) {
    localNumber = localNumber.slice(2);
  }

  if (
    countryCode &&
    localNumber.startsWith(countryCode) &&
    localNumber.length > countryCode.length
  ) {
    localNumber = localNumber.slice(countryCode.length);
  }

  localNumber = localNumber.replace(/^0+/, "");
  return localNumber;
};

type LeadApiResponse = {
  ok?: boolean;
  id?: number;
  workCode?: string;
  work_code?: string;
  phone_e164?: string;
  isNew?: boolean;
  error?: string;
};

export default function ApplicationForm() {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedIsNew, setSubmittedIsNew] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<number | null>(null);
  const [submittedPhoneE164, setSubmittedPhoneE164] = useState("");
  const [conversionSent, setConversionSent] = useState(false);

  const phoneLocalNumber = useMemo(
    () => normalizeLocalPhone(selectedCountry.dial, phone),
    [selectedCountry, phone]
  );

  const phoneE164 = useMemo(() => {
    const countryCode = onlyDigits(selectedCountry.dial);

    return countryCode && phoneLocalNumber
      ? `+${countryCode}${phoneLocalNumber}`
      : "";
  }, [selectedCountry, phoneLocalNumber]);

  const openTelegram = () => {
    const tgWeb = `https://t.me/${BOT_USERNAME}`;
    const tgApp = `tg://resolve?domain=${BOT_USERNAME}`;
    const tgIntent = `intent://resolve?domain=${BOT_USERNAME}#Intent;scheme=tg;package=org.telegram.messenger;end`;

    if (isMobile()) {
      location.href = tgApp;

      setTimeout(() => {
        if (document.visibilityState === "hidden") return;

        const onAndroid = /Android/i.test(navigator.userAgent);

        if (onAndroid) {
          location.href = tgIntent;

          setTimeout(() => {
            if (document.visibilityState === "hidden") return;
            location.href = tgWeb;
          }, 450);
        } else {
          location.href = tgWeb;
        }
      }, 650);
    } else {
      window.open(tgWeb, "_blank", "noopener,noreferrer");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (saving || submitted) return;

    setError(null);
    const ageNum = Number(age || "0");

    if (!name.trim()) {
      return setError("Ingresa tu nombre completo.");
    }

    if (!phoneE164) {
      return setError("Ingresa el número de teléfono que usas en Telegram.");
    }

    if (!ageNum || ageNum < 23 || ageNum > 99) {
      return setError("Ingresa una edad válida entre 23 y 99 años.");
    }

    const payload = {
      name: name.trim(),
      email: "",
      countryIso: selectedCountry.iso,
      dial: selectedCountry.dial,
      phone: phoneLocalNumber,
      phoneE164,
      gender,
      age: ageNum,
      note: null as string | null,
    };

    setSaving(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response
        .json()
        .catch(() => null)) as LeadApiResponse | null;

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "No se pudo guardar la solicitud.");
      }

      try {
        ttqTrack("SubmitApplication", {
          action: "application_saved",
        });
      } catch {
        // El flujo debe continuar aunque TikTok no esté disponible.
      }

      setSubmittedIsNew(data.isNew === true);
      setSubmittedLeadId(typeof data.id === "number" ? data.id : null);
      setSubmittedPhoneE164(data.phone_e164 || phoneE164);
      setSubmitted(true);
      setSaving(false);
    } catch {
      setSaving(false);
      setError("No se pudo guardar la solicitud. Inténtalo de nuevo.");
    }
  };

  const handleTelegramContinue = async () => {
    setError(null);

    if (!conversionSent) {
      const eventId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `telegram-${Date.now()}-${Math.random().toString(36).slice(2)}`;

      if (submittedLeadId && submittedPhoneE164) {
        try {
          await fetch("/api/lead/continue", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              eventId,
              leadId: submittedLeadId,
              phoneE164: submittedPhoneE164,
              isNew: submittedIsNew,
            }),
            keepalive: true,
          });
        } catch {
          // Los eventos del navegador y Telegram pueden continuar.
        }
      }

      try {
        fbqTrack("Lead", { action: "telegram_continue" });
      } catch {}

      try {
        ttqTrack("Lead", { action: "telegram_continue" });
      } catch {}

      if (submittedIsNew) {
        try {
          fbqTrack("CompleteRegistration", {
            action: "unique_phone_telegram_continue",
          });
        } catch {}

        try {
          ttqTrack("CompleteRegistration", {
            action: "unique_phone_telegram_continue",
          });
        } catch {}
      }

      setConversionSent(true);
    }

    if (isMobile()) {
      window.setTimeout(openTelegram, 180);
    } else {
      openTelegram();
    }
  };

  const fieldClass =
    "mt-1.5 w-full h-11 rounded-xl border border-[#59616b] bg-[#0f1216] px-3 text-[#f5f5f5] placeholder:text-[#737983] shadow-inner transition focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ring)] disabled:cursor-not-allowed disabled:opacity-60 sm:h-12";

  return (
    <form id="apply" onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl scroll-mt-20">
      <div className="rounded-2xl border border-[#3c434b] bg-[var(--surface)] p-4 shadow-2xl shadow-black/20 sm:p-6">
        <div className="mb-4 rounded-xl border border-[#5c4b12] bg-[#1a1710] px-3.5 py-2.5 text-xs leading-relaxed text-[#e6d9a9] sm:px-4 sm:py-3 sm:text-sm">
          Nuestro equipo de selección contacta a los candidatos seleccionados por Telegram.
          Usa el número de teléfono vinculado a tu cuenta de Telegram.
        </div>

        <label className="block text-sm font-semibold text-[#e8e8e8]">
          * Nombre completo
        </label>
        <input
          type="text"
          placeholder="Ingresa tu nombre completo"
          value={name}
          disabled={submitted}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />

        <label className="mt-4 block text-sm font-semibold text-[#e8e8e8]">
          * Número de teléfono de Telegram
        </label>

        <div className="mt-1.5 grid grid-cols-[0.95fr_1.05fr] gap-2 sm:grid-cols-10 sm:gap-3">
          <select
            value={selectedCountry.iso}
            disabled={submitted}
            onChange={(e) =>
              setSelectedCountry(
                COUNTRIES.find((country) => country.iso === e.target.value) ||
                  COUNTRIES[0]
              )
            }
            className="h-11 min-w-0 rounded-xl border border-[#59616b] bg-[#0f1216] px-2.5 text-sm text-[#f5f5f5] shadow-inner transition focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ring)] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-4 sm:h-12 sm:px-3"
          >
            {COUNTRIES.map((country) => (
              <option key={country.iso} value={country.iso}>
                {country.flag} {country.name} · {country.dial}
              </option>
            ))}
          </select>

          <input
            type="tel"
            inputMode="numeric"
            placeholder="Ingresa tu número"
            value={phone}
            disabled={submitted}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 min-w-0 rounded-xl border border-[#59616b] bg-[#0f1216] px-2.5 text-sm text-[#f5f5f5] placeholder:text-[#737983] shadow-inner transition focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ring)] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-6 sm:h-12 sm:px-3"
          />
        </div>

        <p className="mt-1.5 text-[11px] text-[#8f959e] sm:text-xs">
          Este número se utilizará para la verificación en Telegram:&nbsp;
          <strong className="text-[#c9cdd2]">{phoneE164 || "—"}</strong>
        </p>

        <label className="mt-4 block text-sm font-semibold text-[#e8e8e8]">
          * Género
        </label>

        <div className="mt-2 flex flex-wrap items-center gap-5 text-sm text-[#d7d9dc]">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              checked={gender === "male"}
              disabled={submitted}
              onChange={() => setGender("male")}
              className="accent-[#f0b90b]"
            />
            <span>Hombre</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              checked={gender === "female"}
              disabled={submitted}
              onChange={() => setGender("female")}
              className="accent-[#f0b90b]"
            />
            <span>Mujer</span>
          </label>
        </div>

        <label className="mt-4 block text-sm font-semibold text-[#e8e8e8]">
          * Edad
        </label>

        <input
          type="number"
          min={23}
          max={99}
          placeholder="Ingresa tu edad"
          value={age}
          disabled={submitted}
          onChange={(e) => setAge(e.target.value)}
          className={fieldClass}
        />

        {!submitted && (
          <div className="mt-5 flex justify-center">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary min-w-[220px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Guardando…" : "Enviar solicitud"}
            </button>
          </div>
        )}

        {error && (
          <p className="mt-4 rounded-lg border border-red-900/70 bg-red-950/40 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        {submitted && (
          <div
            id="apply-status"
            className="mt-5 rounded-2xl border border-[#6d5810] bg-[#17140b] p-4 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand)]" />
              <div>
                <h3 className="m-0 text-base font-semibold text-white">
                  Solicitud enviada correctamente
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#b8bdc5]">
                  Tus datos han sido guardados. Para continuar con la solicitud,
                  abre Telegram usando el botón de abajo. Asegúrate de tener
                  Telegram instalado en tu dispositivo.
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={handleTelegramContinue}
                className="btn-primary min-w-[250px] gap-2"
              >
                <Send className="h-4 w-4" />
                Continuar por Telegram
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-[#8f959e]">
              Telegram se abrirá únicamente después de seleccionar este botón.
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
