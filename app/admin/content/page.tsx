"use client";

import { useEffect, useState } from "react";

const API_URL = "https://api.devopsbyteflexshift.com";

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [jsonText, setJsonText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      setLoading(true);
      setMessage("");

      const meResponse = await fetch(`${API_URL}/api/admin/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!meResponse.ok) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      const meData = await meResponse.json();

      if (!meData.ok) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      setAuthorized(true);

      const response = await fetch(`${API_URL}/api/admin/site-content`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setMessage("Could not load site content.");
        setLoading(false);
        return;
      }

      const draft =
        data.content?.draft_content ??
        data.content?.published_content ??
        {};

      setContent(data.content);
      setJsonText(JSON.stringify(draft, null, 2));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Connection error.");
      setLoading(false);
    }
  }

  async function saveAndPublish() {
    try {
      setMessage("Saving...");

      let parsedContent;

      try {
        parsedContent = JSON.parse(jsonText);
      } catch {
        setMessage("JSON is not valid. Nothing was saved.");
        return;
      }

      const response = await fetch(`${API_URL}/api/admin/site-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          draft_content: parsedContent,
          published_content: parsedContent,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setMessage("Save failed.");
        return;
      }

      setContent(data.content);
      setMessage("Saved and published successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Connection error while saving.");
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

  if (loading) {
    return (
      <main
        style={{
          maxWidth: 1000,
          margin: "60px auto",
          padding: 20,
        }}
      >
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!authorized) {
    return (
      <main
        style={{
          maxWidth: 600,
          margin: "80px auto",
          padding: 20,
        }}
      >
        <h1>Admin session required</h1>

        <p>Please login again.</p>

        <a href="/admin">
          <button>Go to Login</button>
        </a>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: 1000,
        margin: "40px auto",
        padding: 20,
      }}
    >
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
          <h1 style={{ marginBottom: 8 }}>Site Content Editor</h1>
          <p style={{ marginTop: 0 }}>
            Temporary functional editor
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <a href="/admin">
            <button>Back</button>
          </a>

          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <hr />

      <div style={{ marginTop: 20 }}>
        <p>
          <strong>Published:</strong>{" "}
          {content?.published_at
            ? new Date(content.published_at).toLocaleString()
            : "Not available"}
        </p>

        <p>
          <strong>Last updated:</strong>{" "}
          {content?.updated_at
            ? new Date(content.updated_at).toLocaleString()
            : "Not available"}
        </p>
      </div>

      <div style={{ marginTop: 24 }}>
        <label
          htmlFor="site-content-json"
          style={{
            display: "block",
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          Website Content
        </label>

        <textarea
          id="site-content-json"
          name="site-content-json"
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          spellCheck={false}
          style={{
            width: "100%",
            minHeight: 600,
            padding: 16,
            fontFamily: "monospace",
            fontSize: 14,
            lineHeight: 1.5,
            boxSizing: "border-box",
          }}
        />
      </div>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <button onClick={saveAndPublish}>
          Save & Publish
        </button>

        <button onClick={loadContent}>
          Reload from Database
        </button>

        {message && <strong>{message}</strong>}
      </div>

      <div
        style={{
          marginTop: 30,
          padding: 16,
          border: "1px solid #ccc",
        }}
      >
        <strong>Important:</strong>
        <p style={{ marginBottom: 0 }}>
          This is our temporary test editor. Later we will replace this JSON
          box with normal fields for company name, salary, job title, reviews,
          FAQ, requirements, images, WhatsApp settings and the other sections.
        </p>
      </div>
    </main>
  );
}
