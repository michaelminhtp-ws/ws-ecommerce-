"use client";

import { useEffect, useState } from "react";

const API_URL = "https://api.devopsbyteflexshift.com";

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/me`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setUsername(data.admin?.username ?? "admin");
        setLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCheckingSession(false);
    }
  }

  async function login() {
    try {
      setMessage("Logging in...");

      const res = await fetch(
        `${API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setLoggedIn(true);
        setMessage("");
        setPassword("");
      } else {
        setMessage("Login failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Connection error");
    }
  }

  async function logout() {
    try {
      await fetch(
        `${API_URL}/api/admin/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } finally {
      setLoggedIn(false);
      setUsername("");
      setPassword("");
      setMessage("");
    }
  }

  const pageStyle: React.CSSProperties = {
    maxWidth: 900,
    margin: "70px auto",
    padding: "0 20px",
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#10203f",
  };

  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    border: "1px solid #d9e3f3",
    borderRadius: 18,
    padding: 24,
    boxShadow: "0 10px 30px rgba(27,55,99,0.06)",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 12px",
    border: "1px solid #cbd7ea",
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 15,
  };

  const buttonStyle: React.CSSProperties = {
    padding: "11px 16px",
    border: "1px solid #bccae0",
    borderRadius: 10,
    background: "#ffffff",
    cursor: "pointer",
    fontWeight: 700,
  };

  const primaryButtonStyle: React.CSSProperties = {
    padding: "12px 18px",
    border: "none",
    borderRadius: 10,
    background: "#10203f",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: 800,
  };

  const dashboardCardStyle: React.CSSProperties = {
    border: "1px solid #dce5f2",
    borderRadius: 14,
    padding: 18,
    background: "#f9fbff",
    height: "100%",
    boxSizing: "border-box",
  };

  if (checkingSession) {
    return (
      <main style={pageStyle}>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (loggedIn) {
    return (
      <main style={pageStyle}>
        <div style={cardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1 style={{ marginBottom: 6 }}>
                Admin Dashboard
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#6a7892",
                }}
              >
                Welcome, {username}
              </p>
            </div>

            <button
              style={buttonStyle}
              onClick={logout}
            >
              Logout
            </button>
          </div>

          <hr
            style={{
              border: 0,
              borderTop: "1px solid #e2e9f4",
              margin: "22px 0",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            <a
              href="/admin/content"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={dashboardCardStyle}>
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: 8,
                  }}
                >
                  Site Content
                </h2>

                <p
                  style={{
                    marginTop: 0,
                    color: "#6a7892",
                  }}
                >
                  Edit company, job, salary, reviews,
                  FAQ and landing-page sections.
                </p>

                <button style={primaryButtonStyle}>
                  Edit Site Content
                </button>
              </div>
            </a>

            <a
              href="/admin/whatsapp"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={dashboardCardStyle}>
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: 8,
                  }}
                >
                  WhatsApp
                </h2>

                <p
                  style={{
                    marginTop: 0,
                    color: "#6a7892",
                  }}
                >
                  Manage executives, active accounts
                  and round-robin destinations.
                </p>

                <button style={primaryButtonStyle}>
                  Manage WhatsApp
                </button>
              </div>
            </a>

            <a
              href="/admin/analytics"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={dashboardCardStyle}>
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: 8,
                  }}
                >
                  Analytics
                </h2>

                <p
                  style={{
                    marginTop: 0,
                    color: "#6a7892",
                  }}
                >
                  View WhatsApp clicks, unique IPs,
                  duplicate IPs and click activity.
                </p>

                <button style={primaryButtonStyle}>
                  View Analytics
                </button>
              </div>
            </a>

            <a
              href="/admin/settings"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={dashboardCardStyle}>
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: 8,
                  }}
                >
                  Settings
                </h2>

                <p
                  style={{
                    marginTop: 0,
                    color: "#6a7892",
                  }}
                >
                  Manage the duplicate-IP window used for
                  unique Lead detection.
                </p>

                <button style={primaryButtonStyle}>
                  Manage Settings
                </button>
              </div>
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <div style={cardStyle}>
        <h1>Admin Login</h1>

        <input
          style={inputStyle}
          name="username"
          autoComplete="username"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          style={inputStyle}
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          style={primaryButtonStyle}
          onClick={login}
        >
          Login
        </button>

        {message && (
          <p
            style={{
              marginBottom: 0,
              fontWeight: 700,
            }}
          >
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
