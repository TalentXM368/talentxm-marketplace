// One-time helper: exchanges a Zoho Self Client grant code for the refresh token the website uses,
// and saves it as ZOHO_REFRESH_TOKEN in .env.local. No secret is printed.
//
// 1. Put ZOHO_CLIENT_ID and ZOHO_CLIENT_SECRET in .env.local (and ZOHO_ACCOUNTS_URL if the org is not
//    on the US data centre, for example https://accounts.zoho.eu).
// 2. Generate a code in api-console.zoho.com (scope ZohoCRM.modules.leads.CREATE); it expires within minutes.
// 3. Run:  node scripts/zoho-refresh-token.mjs <grant-code>
//    (or set ZOHO_GRANT_CODE instead of passing the code).
// Then copy the three ZOHO_* values from .env.local into Vercel (Production and Preview).

import fs from "node:fs";
import path from "node:path";

const envFile = path.join(process.cwd(), ".env.local");
const fileText = fs.existsSync(envFile) ? fs.readFileSync(envFile, "utf8") : "";
const fromFile = Object.fromEntries(
  fileText
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].replace(/^["']|["']$/g, "")]),
);
const read = (name) => process.env[name] || fromFile[name] || "";

const clientId = read("ZOHO_CLIENT_ID");
const clientSecret = read("ZOHO_CLIENT_SECRET");
const code = (process.argv[2] || process.env.ZOHO_GRANT_CODE || "").trim();
const accounts = (read("ZOHO_ACCOUNTS_URL") || "https://accounts.zoho.com").replace(/\/+$/, "");

if (!clientId || !clientSecret) {
  console.error("ZOHO_CLIENT_ID and ZOHO_CLIENT_SECRET are missing: add them to .env.local first.");
  process.exit(1);
}
if (!/^1000\.[0-9a-f]+\.[0-9a-f]+$/.test(code)) {
  console.error("Pass the grant code from api-console.zoho.com: node scripts/zoho-refresh-token.mjs <code>");
  process.exit(1);
}

const res = await fetch(`${accounts}/oauth/v2/token`, {
  method: "POST",
  body: new URLSearchParams({ grant_type: "authorization_code", client_id: clientId, client_secret: clientSecret, code }),
});
const body = await res.json().catch(() => ({}));

if (!res.ok || !body.refresh_token) {
  console.error(`Zoho did not return a refresh token (${res.status} ${body.error ?? ""}).`.trim());
  console.error("Codes expire within minutes and work once: generate a new one. Also check ZOHO_ACCOUNTS_URL matches the org's data centre.");
  process.exit(1);
}

const line = `ZOHO_REFRESH_TOKEN=${body.refresh_token}`;
const updated = /^ZOHO_REFRESH_TOKEN=.*$/m.test(fileText)
  ? fileText.replace(/^ZOHO_REFRESH_TOKEN=.*$/m, line)
  : `${fileText.replace(/\s*$/, "")}${fileText.trim() ? "\n" : ""}${line}\n`;
fs.writeFileSync(envFile, updated);

console.log(`Saved ZOHO_REFRESH_TOKEN to .env.local (API domain for this org: ${body.api_domain}).`);
console.log("Copy ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET and ZOHO_REFRESH_TOKEN into Vercel (Production and Preview).");
