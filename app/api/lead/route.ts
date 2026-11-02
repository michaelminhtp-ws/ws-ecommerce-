// app/api/lead/route.ts  (WEB on Vercel) — PROXY ONLY

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_BASE = process.env.API_BASE;
const WEB_ORIGIN = "https://www.devopsbyteflexshift.com";

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": WEB_ORIGIN,
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "Content-Type, Authorization",
      vary: "Origin",
    },
  });
}

export async function POST(req: Request) {
  try {
    if (!API_BASE) {
      return json(500, {
        ok: false,
        error: "API_BASE is not configured on the web app",
      });
    }

    const payload = await req.json();
    const h = req.headers;
    const fwd = h.get("x-forwarded-for") || "";
    const real = h.get("x-real-ip") || "";
    const vercel = h.get("x-vercel-forwarded-for") || "";
    const clientIp = fwd.split(",")[0]?.trim() || real || vercel || "";

    const res = await fetch(`${API_BASE}/api/lead`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(clientIp ? { "x-forwarded-for": clientIp } : {}),
        origin: WEB_ORIGIN,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    return json(res.status, data);
  } catch (err: any) {
    return json(500, { ok: false, error: err?.message || "proxy failed" });
  }
}
