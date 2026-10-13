// Publish gate, Phase 1 version (Architecture A8). Runs after `next build` and fails the
// build when rendered pages contain banned strings, placeholders or broken metadata.
// Catalogue rules (status, >=2 "does not do" items, a human decision point) are enforced
// at compile time by the types in content/types.ts.

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.join(process.cwd(), ".next", "server", "app");
const skip = new Set(["_not-found.html", "_global-error.html"]);

const banned = [
  { label: '"Quote pending"', re: /quote pending/i },
  { label: '"Client logo"', re: /client logo/i },
  { label: '"Live" badge', re: /\bLive\b/ },
  { label: '"in production"', re: /in production/i },
  { label: '"predictive maintenance"', re: /predictive maintenance/i },
  { label: '"rank candidates"', re: /rank candidates/i },
  { label: '"SOC 2 certified"', re: /SOC ?2 certified/i },
  { label: '"similar to Mercor"', re: /similar to mercor/i },
  { label: "internal CRM note", re: /routing to zoho/i },
  { label: '"Coming soon" placeholder', re: /coming soon/i },
  { label: '"Number on request"', re: /number on request/i },
  { label: "old blocktxm.com address", re: /@blocktxm\.com/i },
  { label: "[BRACKETED] placeholder", re: /\[[A-Z][A-Z0-9 _-]{2,}\]/ },
  { label: "lorem ipsum", re: /lorem ipsum/i },
  { label: "TODO", re: /\bTODO\b/ },
];

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    // "[param].html" files are fallback shells for unknown params, not published pages.
    else if (entry.name.endsWith(".html") && !skip.has(entry.name) && !entry.name.includes("[")) out.push(full);
  }
  return out;
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function visibleText(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " "),
  );
}

const files = await htmlFiles(root).catch(() => {
  console.error("check-content: no build output found. Run `next build` first.");
  process.exit(1);
});

const problems = [];
const titles = new Map();

for (const file of files) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const html = await readFile(file, "utf8");
  const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const text = `${visibleText(html)} ${decode(head)}`;

  for (const rule of banned) {
    const m = text.match(rule.re);
    if (m) {
      const at = Math.max(0, m.index - 40);
      problems.push(`${rel}: ${rule.label} → "…${text.slice(at, m.index + m[0].length + 40).trim()}…"`);
    }
  }

  const title = decode(head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
  if (!title) problems.push(`${rel}: missing <title>`);
  else {
    const own = title.replace(/ \| TalentXM$/, "");
    if (own.length > 60) problems.push(`${rel}: title over 60 characters (${own.length}): "${own}"`);
    titles.set(title, [...(titles.get(title) ?? []), rel]);
  }

  const description = head.match(/<meta name="description" content="([^"]*)"/i)?.[1];
  if (!description) problems.push(`${rel}: missing meta description`);
  else if (decode(description).length > 155)
    problems.push(`${rel}: description over 155 characters (${decode(description).length})`);

  if (!/<link rel="canonical"/i.test(head)) problems.push(`${rel}: missing canonical link`);
  if (/maximum-scale/i.test(head)) problems.push(`${rel}: viewport sets maximum-scale`);
}

for (const [title, pages] of titles) {
  if (pages.length > 1) problems.push(`duplicate title "${title}" on ${pages.join(", ")}`);
}

if (problems.length > 0) {
  console.error(`\ncheck-content: ${problems.length} problem(s) in ${files.length} pages\n`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  console.error("");
  process.exit(1);
}

console.log(`check-content: ${files.length} pages passed the publish gate.`);
