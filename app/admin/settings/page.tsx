"use client";

import { useEffect, useMemo, useState } from "react";

const API_URL = "https://api.devopsbyteflexshift.com";

type DuplicateWindow =
  | "same_day"
  | "24_hours"
  | "3_days"
  | "7_days"
  | "30_days"
  | "3_months"
  | "6_months"
  | "1_year"
  | "forever";

type SettingsResponse = {
  ok: boolean;
  settings?: {
    timezone: string;
    duplicateWindow: DuplicateWindow;
    updatedAt: string;
  };
  error?: string;
};

const DUPLICATE_WINDOW_OPTIONS: {
  value: DuplicateWindow;
  label: string;
  description: string;
}[] = [
  { value: "same_day", label: "Same Day", description: "The same IP becomes unique again on the next Warsaw calendar day." },
  { value: "24_hours", label: "24 Hours", description: "The same IP stays duplicate for 24 hours from its first click." },
  { value: "3_days", label: "3 Days", description: "The same IP stays duplicate for 3 days." },
  { value: "7_days", label: "7 Days", description: "The same IP stays duplicate for 7 days." },
  { value: "30_days", label: "30 Days", description: "The same IP stays duplicate for 30 days." },
  { value: "3_months", label: "3 Months", description: "The same IP stays duplicate for 3 months." },
  { value: "6_months", label: "6 Months", description: "The same IP stays duplicate for 6 months." },
  { value: "1_year", label: "1 Year", description: "The same IP stays duplicate for 1 year." },
  { value: "forever", label: "Forever", description: "Once recorded, the same IP always remains duplicate." },
];

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [timezone, setTimezone] = useState("Europe/Warsaw");
  const [duplicateWindow, setDuplicateWindow] =
    useState<DuplicateWindow>("24_hours");
  const [savedDuplicateWindow, setSavedDuplicateWindow] =
    useState<DuplicateWindow>("24_hours");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<"success" | "error" | "">("");

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    try {
      setLoading(true);
      setMessage("");
      setMessageType("");

      const meResponse = await fetch(`${API_URL}/api/admin/me`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const meData = await meResponse.json().catch(() => ({}));

      if (!meResponse.ok || !meData.ok) {
        setAuthorized(false);
        return;
      }

      setAuthorized(true);

      const response = await fetch(
        `${API_URL}/api/admin/system-settings`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );
      const data: SettingsResponse = await response.json();

      if (!response.ok || !data.ok || !data.settings) {
        setMessage("Could not load system settings.");
        setMessageType("error");
        return;
      }

      setTimezone(data.settings.timezone || "Europe/Warsaw");
      setDuplicateWindow(data.settings.duplicateWindow);
      setSavedDuplicateWindow(data.settings.duplicateWindow);
    } catch (error) {
      console.error(error);
      setMessage("Connection error while loading settings.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings() {
    try {
      setSaving(true);
      setMessage("");
      setMessageType("");

      const response = await fetch(
        `${API_URL}/api/admin/system-settings`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            timezone: "Europe/Warsaw",
            duplicateWindow,
          }),
        }
      );
      const data: SettingsResponse = await response.json();

      if (!response.ok || !data.ok || !data.settings) {
        setMessage("Could not save duplicate window.");
        setMessageType("error");
        return;
      }

      setTimezone(data.settings.timezone || "Europe/Warsaw");
      setDuplicateWindow(data.settings.duplicateWindow);
      setSavedDuplicateWindow(data.settings.duplicateWindow);
      setMessage("Duplicate window saved.");
      setMessageType("success");
    } catch (error) {
      console.error(error);
      setMessage("Connection error while saving settings.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    try {
      await fetch(`${API_URL}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      window.location.href = "/admin";
    }
  }

  const currentOption = DUPLICATE_WINDOW_OPTIONS.find(
    (item) => item.value === duplicateWindow
  );

  const styles = useMemo(
    () => ({
      page: {
        maxWidth: 900,
        margin: "36px auto",
        padding: "0 20px 60px",
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: "#10203f",
      } as React.CSSProperties,
      header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 14,
        flexWrap: "wrap" as const,
        marginBottom: 22,
      },
      card: {
        background: "#ffffff",
        border: "1px solid #d9e3f3",
        borderRadius: 18,
        padding: 22,
        marginBottom: 18,
        boxShadow: "0 10px 30px rgba(27,55,99,0.06)",
      } as React.CSSProperties,
      button: {
        padding: "10px 14px",
        border: "1px solid #becce1",
        borderRadius: 10,
        background: "#ffffff",
        cursor: "pointer",
        fontWeight: 700,
        color: "#10203f",
      } as React.CSSProperties,
      primaryButton: {
        padding: "11px 18px",
        border: "none",
        borderRadius: 10,
        background: "#10203f",
        color: "#ffffff",
        cursor: "pointer",
        fontWeight: 800,
      } as React.CSSProperties,
      select: {
        width: "100%",
        padding: "12px 14px",
        border: "1px solid #cbd7ea",
        borderRadius: 10,
        fontSize: 15,
        background: "#ffffff",
        color: "#10203f",
      } as React.CSSProperties,
    }),
    []
  );

  if (loading) {
    return (
      <main style={styles.page}>
        <h1>Loading Settings...</h1>
      </main>
    );
  }

  if (!authorized) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1>Admin session required</h1>
          <p>Please login again.</p>
          <a href="/admin">
            <button style={styles.primaryButton}>Go to Login</button>
          </a>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={{ marginBottom: 6 }}>Settings</h1>
          <p style={{ margin: 0, color: "#6a7892" }}>
            Manage duplicate-IP behavior.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="/admin">
            <button style={styles.button}>Back</button>
          </a>
          <button style={styles.button} onClick={initialize} disabled={saving}>
            Reload
          </button>
          <button style={styles.button} onClick={logout}>Logout</button>
        </div>
      </div>

      <section style={styles.card}>
        <h2 style={{ marginTop: 0, marginBottom: 8 }}>Duplicate IP Window</h2>

        <p style={{ marginTop: 0, color: "#6a7892", lineHeight: 1.55 }}>
          A WhatsApp click from a new IP is counted as a Unique IP and can
          produce a Lead. Further clicks from that IP during this window are
          counted as Duplicate IPs and do not produce another Lead.
        </p>

        <div style={{ marginTop: 22, maxWidth: 520 }}>
          <label
            htmlFor="duplicate-window"
            style={{ display: "block", marginBottom: 8, fontWeight: 800 }}
          >
            Duplicate window
          </label>

          <select
            id="duplicate-window"
            style={styles.select}
            value={duplicateWindow}
            disabled={saving}
            onChange={(event) => {
              setDuplicateWindow(event.target.value as DuplicateWindow);
              setMessage("");
              setMessageType("");
            }}
          >
            {DUPLICATE_WINDOW_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <div
            style={{
              marginTop: 12,
              padding: "12px 14px",
              background: "#f7f9fd",
              border: "1px solid #e1e8f3",
              borderRadius: 10,
              color: "#566781",
              lineHeight: 1.5,
            }}
          >
            {currentOption?.description}
          </div>

          <div
            style={{
              marginTop: 16,
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{ ...styles.primaryButton, opacity: saving ? 0.65 : 1 }}
              onClick={saveSettings}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <span style={{ fontSize: 14, color: "#6a7892" }}>
              Current saved value:{" "}
              <strong>
                {DUPLICATE_WINDOW_OPTIONS.find(
                  (item) => item.value === savedDuplicateWindow
                )?.label}
              </strong>
            </span>
          </div>
        </div>
      </section>

      <section style={styles.card}>
        <h2 style={{ marginTop: 0, marginBottom: 8 }}>Timezone</h2>
        <p style={{ margin: 0, color: "#6a7892", lineHeight: 1.55 }}>
          The system timezone is fixed to{" "}
          <strong>{timezone || "Europe/Warsaw"}</strong>. This keeps
          duplicate-day calculations and Analytics date filters consistent.
        </p>
      </section>

      {message && (
        <div
          style={{
            position: "sticky",
            bottom: 16,
            padding: "13px 16px",
            borderRadius: 12,
            background: messageType === "error" ? "#8f1d1d" : "#10203f",
            color: "#ffffff",
            fontWeight: 700,
          }}
        >
          {message}
        </div>
      )}
    </main>
  );
}
