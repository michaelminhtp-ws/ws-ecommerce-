"use client";

import { useEffect, useMemo, useState } from "react";

const API_URL = "https://api.devopsbyteflexshift.com";

type SummaryFilter =
  | "today"
  | "yesterday"
  | "3_days"
  | "7_days"
  | "30_days"
  | "max";

type SummaryRow = {
  id: number;
  executiveName: string;
  isActive: boolean;
  position: number;
  wsClicks: number;
  uniqueIp: number;
  duplicateIp: number;
};

type SummaryResponse = {
  ok: boolean;
  filter: SummaryFilter;
  timezone: string;
  rows: SummaryRow[];
  total: {
    wsClicks: number;
    uniqueIp: number;
    duplicateIp: number;
  };
};

type ActivityRow = {
  id: number;
  createdAt: string;
  ipAddress: string;
  isDuplicate: boolean;
  executiveId: number | null;
  executiveName: string;
  device: string;
};

type ActivityResponse = {
  ok: boolean;
  timezone: string;
  rows: ActivityRow[];
  hasMore: boolean;
  nextBeforeId: number | null;
};

const FILTERS: { value: SummaryFilter; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "3_days", label: "3 Days" },
  { value: "7_days", label: "7 Days" },
  { value: "30_days", label: "30 Days" },
  { value: "max", label: "Max" },
];

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const [filter, setFilter] = useState<SummaryFilter>("today");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryRows, setSummaryRows] = useState<SummaryRow[]>([]);
  const [summaryTotal, setSummaryTotal] = useState({
    wsClicks: 0,
    uniqueIp: 0,
    duplicateIp: 0,
  });

  const [activityRows, setActivityRows] = useState<ActivityRow[]>([]);
  const [activityLoading, setActivityLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [nextBeforeId, setNextBeforeId] = useState<number | null>(null);

  const [timezone, setTimezone] = useState("Europe/Warsaw");
  const [message, setMessage] = useState("");

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (authorized) {
      loadSummary(filter);
    }
  }, [filter, authorized]);

  async function initialize() {
    try {
      setLoading(true);
      setMessage("");

      const meResponse = await fetch(`${API_URL}/api/admin/me`, {
        method: "GET",
        credentials: "include",
      });

      const meData = await meResponse.json().catch(() => ({}));

      if (!meResponse.ok || !meData.ok) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      setAuthorized(true);

      await Promise.all([
        loadSummary("today"),
        loadActivity(true),
      ]);
    } catch (error) {
      console.error(error);
      setMessage("Connection error.");
    } finally {
      setLoading(false);
    }
  }

  async function loadSummary(selectedFilter: SummaryFilter) {
    try {
      setSummaryLoading(true);
      setMessage("");

      const response = await fetch(
        `${API_URL}/api/admin/analytics/summary?filter=${encodeURIComponent(
          selectedFilter
        )}`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data: SummaryResponse = await response.json();

      if (!response.ok || !data.ok) {
        setMessage("Could not load analytics summary.");
        return;
      }

      setSummaryRows(data.rows ?? []);
      setSummaryTotal(
        data.total ?? {
          wsClicks: 0,
          uniqueIp: 0,
          duplicateIp: 0,
        }
      );

      if (data.timezone) {
        setTimezone(data.timezone);
      }
    } catch (error) {
      console.error(error);
      setMessage("Connection error while loading analytics.");
    } finally {
      setSummaryLoading(false);
    }
  }

  async function loadActivity(reset: boolean) {
    try {
      setActivityLoading(true);
      setMessage("");

      let url = `${API_URL}/api/admin/analytics/activity?limit=50`;

      if (!reset && nextBeforeId) {
        url += `&beforeId=${nextBeforeId}`;
      }

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data: ActivityResponse = await response.json();

      if (!response.ok || !data.ok) {
        setMessage("Could not load activity.");
        return;
      }

      if (reset) {
        setActivityRows(data.rows ?? []);
      } else {
        setActivityRows((current) => [
          ...current,
          ...(data.rows ?? []),
        ]);
      }

      setHasMore(Boolean(data.hasMore));
      setNextBeforeId(data.nextBeforeId ?? null);

      if (data.timezone) {
        setTimezone(data.timezone);
      }
    } catch (error) {
      console.error(error);
      setMessage("Connection error while loading activity.");
    } finally {
      setActivityLoading(false);
    }
  }

  async function reloadAll() {
    await Promise.all([
      loadSummary(filter),
      loadActivity(true),
    ]);
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

  function formatDateTime(value: string) {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        timeZone: timezone,
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date(value));
    } catch {
      return value;
    }
  }

  function formatDevice(value: string) {
    const text = value || "unknown";

    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const styles = useMemo(
    () => ({
      page: {
        maxWidth: 1120,
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
        padding: 20,
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
        padding: "10px 16px",
        border: "none",
        borderRadius: 10,
        background: "#10203f",
        color: "#ffffff",
        cursor: "pointer",
        fontWeight: 800,
      } as React.CSSProperties,

      th: {
        textAlign: "right" as const,
        padding: "12px 14px",
        fontSize: 13,
        color: "#64738c",
        whiteSpace: "nowrap" as const,
        borderBottom: "1px solid #dfe7f2",
      },

      td: {
        textAlign: "right" as const,
        padding: "13px 14px",
        borderBottom: "1px solid #edf1f7",
        whiteSpace: "nowrap" as const,
      },
    }),
    []
  );

  if (loading) {
    return (
      <main style={styles.page}>
        <h1>Loading Analytics...</h1>
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
            <button style={styles.primaryButton}>
              Go to Login
            </button>
          </a>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={{ marginBottom: 6 }}>Analytics</h1>
          <p style={{ margin: 0, color: "#6a7892" }}>
            WhatsApp clicks and IP activity.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <a href="/admin">
            <button style={styles.button}>Back</button>
          </a>

          <button
            style={styles.button}
            onClick={reloadAll}
          >
            Reload
          </button>

          <button
            style={styles.button}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      <section style={styles.card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>Executive Analytics</h2>
            <p
              style={{
                margin: "6px 0 0",
                color: "#6a7892",
                fontSize: 14,
              }}
            >
              Date filter applies only to this table.
            </p>
          </div>

          {summaryLoading && (
            <strong style={{ color: "#6a7892" }}>
              Loading...
            </strong>
          )}
        </div>

        <div
          style={{
            overflowX: "auto",
            maxHeight: 360,
            overflowY: "auto",
            border: "1px solid #e1e8f3",
            borderRadius: 12,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 620,
            }}
          >
            <thead
              style={{
                position: "sticky",
                top: 0,
                zIndex: 2,
                background: "#f7f9fd",
              }}
            >
              <tr>
                <th
                  style={{
                    ...styles.th,
                    textAlign: "left",
                  }}
                >
                  Executive
                </th>

                <th style={styles.th}>WS Clicks</th>
                <th style={styles.th}>Unique IP</th>
                <th style={styles.th}>Duplicate IP</th>
              </tr>
            </thead>

            <tbody>
              {summaryRows.map((row) => (
                <tr key={row.id}>
                  <td
                    style={{
                      ...styles.td,
                      textAlign: "left",
                      fontWeight: 700,
                    }}
                  >
                    {row.executiveName}

                    {!row.isActive && (
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: 11,
                          color: "#7d8799",
                          fontWeight: 600,
                        }}
                      >
                        Inactive
                      </span>
                    )}
                  </td>

                  <td style={styles.td}>{row.wsClicks}</td>
                  <td style={styles.td}>{row.uniqueIp}</td>
                  <td style={styles.td}>{row.duplicateIp}</td>
                </tr>
              ))}

              <tr
                style={{
                  background: "#f4f7fc",
                }}
              >
                <td
                  style={{
                    ...styles.td,
                    textAlign: "left",
                    fontWeight: 900,
                    borderBottom: 0,
                  }}
                >
                  Total
                </td>

                <td
                  style={{
                    ...styles.td,
                    fontWeight: 900,
                    borderBottom: 0,
                  }}
                >
                  {summaryTotal.wsClicks}
                </td>

                <td
                  style={{
                    ...styles.td,
                    fontWeight: 900,
                    borderBottom: 0,
                  }}
                >
                  {summaryTotal.uniqueIp}
                </td>

                <td
                  style={{
                    ...styles.td,
                    fontWeight: 900,
                    borderBottom: 0,
                  }}
                >
                  {summaryTotal.duplicateIp}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginTop: 16,
          }}
        >
          {FILTERS.map((item) => {
            const active = filter === item.value;

            return (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                disabled={summaryLoading}
                style={{
                  ...styles.button,
                  background: active ? "#10203f" : "#ffffff",
                  color: active ? "#ffffff" : "#10203f",
                  borderColor: active ? "#10203f" : "#becce1",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </section>

      <section style={styles.card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>Activity</h2>
            <p
              style={{
                margin: "6px 0 0",
                color: "#6a7892",
                fontSize: 14,
              }}
            >
              Independent from the date filter above.
              Unique IPs are green. Duplicate IPs are red.
            </p>
          </div>

          <button
            style={styles.button}
            onClick={() => loadActivity(true)}
            disabled={activityLoading}
          >
            Refresh Activity
          </button>
        </div>

        <div
          style={{
            maxHeight: 430,
            overflowY: "auto",
            overflowX: "auto",
            border: "1px solid #e1e8f3",
            borderRadius: 12,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 700,
            }}
          >
            <thead
              style={{
                position: "sticky",
                top: 0,
                zIndex: 2,
                background: "#f7f9fd",
              }}
            >
              <tr>
                <th
                  style={{
                    ...styles.th,
                    textAlign: "left",
                  }}
                >
                  Date / Time
                </th>

                <th
                  style={{
                    ...styles.th,
                    textAlign: "left",
                  }}
                >
                  IP
                </th>

                <th
                  style={{
                    ...styles.th,
                    textAlign: "left",
                  }}
                >
                  Executive
                </th>

                <th
                  style={{
                    ...styles.th,
                    textAlign: "left",
                  }}
                >
                  Device
                </th>
              </tr>
            </thead>

            <tbody>
              {activityRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      padding: 24,
                      textAlign: "center",
                      color: "#6a7892",
                    }}
                  >
                    No WhatsApp click activity yet.
                  </td>
                </tr>
              ) : (
                activityRows.map((row) => (
                  <tr key={row.id}>
                    <td
                      style={{
                        ...styles.td,
                        textAlign: "left",
                      }}
                    >
                      {formatDateTime(row.createdAt)}
                    </td>

                    <td
                      style={{
                        ...styles.td,
                        textAlign: "left",
                        fontWeight: 800,
                        color: row.isDuplicate
                          ? "#c62828"
                          : "#168544",
                      }}
                    >
                      {row.ipAddress}
                    </td>

                    <td
                      style={{
                        ...styles.td,
                        textAlign: "left",
                      }}
                    >
                      {row.executiveName}
                    </td>

                    <td
                      style={{
                        ...styles.td,
                        textAlign: "left",
                      }}
                    >
                      {formatDevice(row.device)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 14,
          }}
        >
          {hasMore ? (
            <button
              style={styles.button}
              onClick={() => loadActivity(false)}
              disabled={activityLoading}
            >
              {activityLoading
                ? "Loading..."
                : "Load Older Activity"}
            </button>
          ) : (
            <span
              style={{
                color: "#7b879b",
                fontSize: 13,
              }}
            >
              {activityRows.length > 0
                ? "No older activity."
                : ""}
            </span>
          )}
        </div>
      </section>

      {message && (
        <div
          style={{
            position: "sticky",
            bottom: 16,
            padding: "13px 16px",
            borderRadius: 12,
            background: "#10203f",
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
