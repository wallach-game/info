// Cloudflare Worker: serves the static portfolio from ./portfolio and adds
// security + cache headers. Assets are bound as env.ASSETS (see wrangler.toml).
// /api and /llms.txt describe the services for AI agents (see profile.js).

import { PROFILE, llmsTxt } from "./profile.js";

const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self'; script-src 'none'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src https://fonts.gstatic.com; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "www.numerlab.org") {
      url.hostname = "numerlab.org";
      return Response.redirect(url.toString(), 301);
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }

    if (url.pathname === "/api" || url.pathname === "/llms.txt") {
      const isJson = url.pathname === "/api";
      return new Response(isJson ? JSON.stringify(PROFILE, null, 2) : llmsTxt(PROFILE), {
        headers: {
          ...SECURITY_HEADERS,
          "Content-Type": isJson ? "application/json; charset=utf-8" : "text/markdown; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    const res = await env.ASSETS.fetch(request);
    const headers = new Headers(res.headers);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) headers.set(k, v);

    const type = headers.get("Content-Type") || "";
    if (type.includes("text/html")) {
      headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    } else if (res.ok) {
      headers.set("Cache-Control", "public, max-age=86400");
    }

    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  },
};
