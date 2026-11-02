"use client";

import React, { useMemo, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { fbqTrack } from "@/lib/pixel";
import { ttqTrack } from "@/lib/tiktok";

const BOT_USERNAME =
  process.env.NEXT_PUBLIC_BOT_USERNAME || "applyyourjobhere_bot";

const COUNTRIES = [
  { iso: "pl", name: "Polska", dial: "+48", flag: "🇵🇱" },
  { iso: "de", name: "Niemcy", dial: "+49", flag: "🇩🇪" },
  { iso: "in", name: "Indie", dial: "+91", flag: "🇮🇳" },
  { iso: "tr", name: "Turcja", dial: "+90", flag: "🇹🇷" },
  { iso: "sy", name: "Syria", dial: "+963", flag: "🇸🇾" },
  { iso: "us", name: "USA/Kanada", dial: "+1", flag: "🇺🇸" },
  { iso: "my", name: "Malezja", dial: "+60", flag: "🇲🇾" },
  { iso: "id", name: "Indonezja", dial: "+62", flag: "🇮🇩" },
  { iso: "ph", name: "Filipiny", dial: "+63", flag: "🇵🇭" },
  { iso: "vn", name: "Wietnam", dial: "+84", flag: "🇻🇳" },
  { iso: "th", name: "Tajlandia", dial: "+66", flag: "🇹🇭" },
  { iso: "mm", name: "Mjanma", dial: "+95", flag: "🇲🇲" },
  { iso: "bd", name: "Bangladesz", dial: "+880", flag: "🇧🇩" },
  { iso: "pk", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { iso: "np", name: "Nepal", dial: "+977", flag: "🇳🇵" },
  { iso: "lk", name: "Sri Lanka", dial: "+94", flag: "🇱🇰" },
  { iso: "au", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { iso: "za", name: "Republika Południowej Afryki", dial: "+27", flag: "🇿🇦" },
  { iso: "fr", name: "Francja", dial: "+33", flag: "🇫🇷" },
  { iso: "gb", name: "Wielka Brytania", dial: "+44", flag: "🇬🇧" },
  { iso: "ae", name: "Zjednoczone Emiraty Arabskie", dial: "+971", flag: "🇦🇪" },
  { iso: "sg", name: "Singapur", dial: "+65", flag: "🇸🇬" },
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
      return setError("Wpisz swoje imię i nazwisko.");
    }

    if (!phoneE164) {
      return setError(
        "Wpisz numer telefonu, którego używasz w Telegramie."
      );
    }

    if (!ageNum || ageNum < 23 || ageNum > 99) {
      return setError(
        "Wpisz prawidłowy wiek od 23 do 99 lat."
      );
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
        throw new Error(
          data?.error || "Nie udało się zapisać aplikacji."
        );
      }

      // Meta conversion events are intentionally NOT fired here.
      // TikTok records the successful application submission at this stage.
      try {
        ttqTrack("SubmitApplication", {
          action: "application_saved",
        });
      } catch {
        // The application flow must continue even if TikTok tracking is unavailable.
      }

      // Meta Lead / CompleteRegistration and TikTok Lead / CompleteRegistration
      // fire only after the applicant confirms they want to continue in Telegram.
      setSubmittedIsNew(data.isNew === true);
      setSubmittedLeadId(typeof data.id === "number" ? data.id : null);
      setSubmittedPhoneE164(data.phone_e164 || phoneE164);
      setSubmitted(true);
      setSaving(false);
    } catch {
      setSaving(false);
      setError(
        "Nie udało się zapisać aplikacji. Bitte versuchen Sie es erneut."
      );
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
          // Meta events and Telegram can still continue if DB event recording fails.
        }
      }

      try {
        fbqTrack("Lead", {
          action: "telegram_continue",
        });
      } catch {
        // Telegram can still open if the browser pixel event cannot be sent.
      }

      try {
        ttqTrack("Lead", {
          action: "telegram_continue",
        });
      } catch {
        // Telegram can still open if TikTok tracking is unavailable.
      }

      if (submittedIsNew) {
        try {
          fbqTrack("CompleteRegistration", {
            action: "unique_phone_telegram_continue",
          });
        } catch {
          // Telegram can still open if the browser pixel event cannot be sent.
        }

        try {
          ttqTrack("CompleteRegistration", {
            action: "unique_phone_telegram_continue",
          });
        } catch {
          // Telegram can still open if TikTok tracking is unavailable.
        }
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
          Nasz zespół rekrutacyjny kontaktuje się z wybranymi kandydatami przez Telegram.
          Użyj numeru telefonu powiązanego z Twoim kontem Telegram
          .
        </div>

        <label className="block text-sm font-semibold text-[#e8e8e8]">
          * Imię i nazwisko
        </label>
        <input
          type="text"
          placeholder="Wpisz imię i nazwisko"
          value={name}
          disabled={submitted}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />

        <label className="mt-4 block text-sm font-semibold text-[#e8e8e8]">
          * Numer telefonu w Telegramie
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
            placeholder="Wpisz numer telefonu"
            value={phone}
            disabled={submitted}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 min-w-0 rounded-xl border border-[#59616b] bg-[#0f1216] px-2.5 text-sm text-[#f5f5f5] placeholder:text-[#737983] shadow-inner transition focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-ring)] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-6 sm:h-12 sm:px-3"
          />
        </div>

        <p className="mt-1.5 text-[11px] text-[#8f959e] sm:text-xs">
          Ten numer będzie używany w Telegramie:&nbsp;
          <strong className="text-[#c9cdd2]">{phoneE164 || "—"}</strong>
        </p>

        <label className="mt-4 block text-sm font-semibold text-[#e8e8e8]">
          * Płeć
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
            <span>Mężczyzna</span>
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
            <span>Kobieta</span>
          </label>
        </div>

        <label className="mt-4 block text-sm font-semibold text-[#e8e8e8]">
          * Wiek
        </label>

        <input
          type="number"
          min={23}
          max={99}
          placeholder="Wpisz swój wiek"
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
              {saving ? "Zapisywanie…" : "Wyślij aplikację"}
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
                  Aplikacja została pomyślnie przesłana
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#b8bdc5]">
                  Twoje dane zostały zapisane. Aby kontynuować aplikację,
                  otwórz Telegram za pomocą przycisku poniżej.
                  Upewnij się, że Telegram jest zainstalowany na Twoim
                  urządzeniu.
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
                Kontynuuj przez Telegram
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-[#8f959e]">
              Telegram zostanie otwarty dopiero po wybraniu tego
              przycisku.
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
