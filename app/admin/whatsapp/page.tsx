"use client";

import { useEffect, useState } from "react";

const API_URL = "https://api.devopsbyteflexshift.com";

type WhatsAppAccount = {
  id: number | string;
  executive_name: string;
  whatsapp_target: string;
  is_active: boolean;
  position: number;
  created_at?: string;
  updated_at?: string;
};

export default function WhatsAppManagerPage() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [accounts, setAccounts] = useState<WhatsAppAccount[]>([]);
  const [message, setMessage] = useState("");
  const [savingId, setSavingId] = useState<string | number | null>(null);

  const [newExecutive, setNewExecutive] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  async function loadAccounts() {
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

      const response = await fetch(
        `${API_URL}/api/admin/whatsapp-accounts`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setMessage("Could not load WhatsApp accounts.");
        setLoading(false);
        return;
      }

      setAccounts(data.accounts ?? []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Connection error.");
      setLoading(false);
    }
  }

  function changeAccount(
    id: string | number,
    field: keyof WhatsAppAccount,
    value: string | number | boolean
  ) {
    setAccounts((current) =>
      current.map((account) =>
        String(account.id) === String(id)
          ? {
              ...account,
              [field]: value,
            }
          : account
      )
    );
  }

  function readableError(error: string) {
    switch (error) {
      case "at_least_one_active_whatsapp_account_required":
        return "At least one WhatsApp account must remain active.";

      case "at_least_one_whatsapp_account_required":
        return "You cannot remove the final WhatsApp account.";

      case "invalid_whatsapp_target":
        return "Please enter a valid WhatsApp number or WhatsApp link.";

      case "executive_name_required":
        return "Executive name is required.";

      case "whatsapp_account_not_found":
        return "WhatsApp account was not found.";

      default:
        return error || "Request failed.";
    }
  }

  async function saveAccount(account: WhatsAppAccount) {
    try {
      setSavingId(account.id);
      setMessage("Saving...");

      const response = await fetch(
        `${API_URL}/api/admin/whatsapp-accounts/${account.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            executive_name: account.executive_name,
            whatsapp_target: account.whatsapp_target,
            is_active: account.is_active,
            position: Number(account.position),
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        setMessage(readableError(data.error));
        setSavingId(null);
        await loadAccounts();
        return;
      }

      setAccounts((current) =>
        current.map((item) =>
          String(item.id) === String(account.id)
            ? data.account
            : item
        )
      );

      setMessage("WhatsApp account saved.");
      setSavingId(null);
    } catch (error) {
      console.error(error);
      setMessage("Connection error while saving.");
      setSavingId(null);
    }
  }

  async function addAccount() {
    if (!newExecutive.trim() || !newTarget.trim()) {
      setMessage("Enter executive name and WhatsApp number/link.");
      return;
    }

    try {
      setAdding(true);
      setMessage("Adding account...");

      const response = await fetch(
        `${API_URL}/api/admin/whatsapp-accounts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            executive_name: newExecutive.trim(),
            whatsapp_target: newTarget.trim(),
            is_active: true,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        setMessage(readableError(data.error));
        setAdding(false);
        return;
      }

      setNewExecutive("");
      setNewTarget("");
      setMessage("WhatsApp account added.");
      setAdding(false);

      await loadAccounts();
    } catch (error) {
      console.error(error);
      setMessage("Connection error while adding account.");
      setAdding(false);
    }
  }

  async function removeAccount(account: WhatsAppAccount) {
    const confirmed = window.confirm(
      `Remove "${account.executive_name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("Removing account...");

      const response = await fetch(
        `${API_URL}/api/admin/whatsapp-accounts/${account.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        setMessage(readableError(data.error));
        return;
      }

      setMessage("WhatsApp account removed.");
      await loadAccounts();
    } catch (error) {
      console.error(error);
      setMessage("Connection error while removing account.");
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

  const pageStyle: React.CSSProperties = {
    maxWidth: 1100,
    margin: "40px auto",
    padding: "0 20px 60px",
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#10203f",
  };

  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    border: "1px solid #d9e3f3",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    boxShadow: "0 10px 30px rgba(27,55,99,0.06)",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    border: "1px solid #cbd7ea",
    borderRadius: 10,
    fontSize: 14,
    background: "#fbfdff",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 14px",
    border: "1px solid #becce1",
    borderRadius: 10,
    background: "#ffffff",
    cursor: "pointer",
    fontWeight: 700,
  };

  const primaryButtonStyle: React.CSSProperties = {
    padding: "10px 16px",
    border: "none",
    borderRadius: 10,
    background: "#10203f",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: 800,
  };

  if (loading) {
    return (
      <main style={pageStyle}>
        <h1>Loading WhatsApp Manager...</h1>
      </main>
    );
  }

  if (!authorized) {
    return (
      <main style={pageStyle}>
        <div style={cardStyle}>
          <h1>Admin session required</h1>
          <p>Please login again.</p>

          <a href="/admin">
            <button style={primaryButtonStyle}>
              Go to Login
            </button>
          </a>
        </div>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ marginBottom: 6 }}>
            WhatsApp Manager
          </h1>

          <p
            style={{
              margin: 0,
              color: "#6a7892",
            }}
          >
            Manage executives and round-robin WhatsApp destinations.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <a href="/admin">
            <button style={buttonStyle}>
              Back
            </button>
          </a>

          <button
            style={buttonStyle}
            onClick={loadAccounts}
          >
            Reload
          </button>

          <button
            style={buttonStyle}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      <section style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>
          WhatsApp Accounts
        </h2>

        <p style={{ color: "#6a7892" }}>
          Only active accounts receive visitors. With multiple active
          accounts, visitors are distributed in round-robin order.
        </p>

        {accounts.map((account) => (
          <div
            key={account.id}
            style={{
              border: "1px solid #e0e8f4",
              borderRadius: 14,
              padding: 14,
              marginTop: 14,
              background: "#f9fbff",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(150px,1fr) minmax(260px,2fr) 90px 90px",
                gap: 12,
                alignItems: "end",
              }}
            >
              <label>
                <strong
                  style={{
                    display: "block",
                    fontSize: 13,
                    marginBottom: 6,
                  }}
                >
                  Executive
                </strong>

                <input
                  style={inputStyle}
                  value={account.executive_name}
                  onChange={(e) =>
                    changeAccount(
                      account.id,
                      "executive_name",
                      e.target.value
                    )
                  }
                />
              </label>

              <label>
                <strong
                  style={{
                    display: "block",
                    fontSize: 13,
                    marginBottom: 6,
                  }}
                >
                  WhatsApp number / link
                </strong>

                <input
                  style={inputStyle}
                  value={account.whatsapp_target}
                  onChange={(e) =>
                    changeAccount(
                      account.id,
                      "whatsapp_target",
                      e.target.value
                    )
                  }
                />
              </label>

              <label>
                <strong
                  style={{
                    display: "block",
                    fontSize: 13,
                    marginBottom: 6,
                  }}
                >
                  Position
                </strong>

                <input
                  style={inputStyle}
                  type="number"
                  min="0"
                  value={account.position}
                  onChange={(e) =>
                    changeAccount(
                      account.id,
                      "position",
                      Number(e.target.value)
                    )
                  }
                />
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  minHeight: 42,
                }}
              >
                <input
                  type="checkbox"
                  checked={account.is_active}
                  onChange={(e) =>
                    changeAccount(
                      account.id,
                      "is_active",
                      e.target.checked
                    )
                  }
                />

                <strong>Active</strong>
              </label>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 14,
              }}
            >
              <button
                style={primaryButtonStyle}
                disabled={savingId === account.id}
                onClick={() => saveAccount(account)}
              >
                {savingId === account.id
                  ? "Saving..."
                  : "Save"}
              </button>

              <button
                style={{
                  ...buttonStyle,
                  borderColor: "#e3aaaa",
                  background: "#fff7f7",
                }}
                onClick={() => removeAccount(account)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </section>

      <section style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>
          Add WhatsApp Account
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(180px,1fr) minmax(280px,2fr)",
            gap: 12,
          }}
        >
          <label>
            <strong
              style={{
                display: "block",
                fontSize: 13,
                marginBottom: 6,
              }}
            >
              Executive name
            </strong>

            <input
              style={inputStyle}
              placeholder="Example: Anna"
              value={newExecutive}
              onChange={(e) =>
                setNewExecutive(e.target.value)
              }
            />
          </label>

          <label>
            <strong
              style={{
                display: "block",
                fontSize: 13,
                marginBottom: 6,
              }}
            >
              WhatsApp number or link
            </strong>

            <input
              style={inputStyle}
              placeholder="+48123456789 or https://wa.me/48123456789"
              value={newTarget}
              onChange={(e) =>
                setNewTarget(e.target.value)
              }
            />
          </label>
        </div>

        <button
          style={{
            ...primaryButtonStyle,
            marginTop: 14,
          }}
          disabled={adding}
          onClick={addAccount}
        >
          {adding
            ? "Adding..."
            : "+ Add WhatsApp Account"}
        </button>
      </section>

      {message && (
        <div
          style={{
            position: "sticky",
            bottom: 16,
            padding: "14px 18px",
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
