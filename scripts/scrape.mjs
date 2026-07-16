// Finds recent OpenAI-controversy news and stages raw candidates in
// public/pending.json for manual review via the site's secret admin menu.
// Never writes to src/data/timeline.ts — that stays hand-curated.
import { readFile, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
if (!FIRECRAWL_API_KEY) {
  console.error("FIRECRAWL_API_KEY is not set");
  process.exit(1);
}

const QUERY =
  "OpenAI (lawsuit OR controversy OR backlash OR investigation OR data breach OR safety incident OR outage OR fired OR sues OR fined OR regulator)";

const BLOCKED_HOSTS = [
  "facebook.com",
  "instagram.com",
  "twitter.com",
  "x.com",
  "tiktok.com",
  "threads.net",
  "reddit.com",
  "youtube.com",
  "linkedin.com",
  "pinterest.com",
];

function isBlockedSource(url) {
  const host = new URL(url).hostname.replace(/^www\./, "");
  return BLOCKED_HOSTS.some((blocked) => host === blocked || host.endsWith(`.${blocked}`));
}

const PENDING_PATH = new URL("../public/pending.json", import.meta.url);
const TIMELINE_PATH = new URL("../src/data/timeline.ts", import.meta.url);

async function search() {
  const res = await fetch("https://api.firecrawl.dev/v1/search", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, limit: 15, tbs: "qdr:d" }),
  });
  if (!res.ok) {
    throw new Error(`Firecrawl search failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  return json.data ?? [];
}

async function knownUrls() {
  const timelineSrc = await readFile(TIMELINE_PATH, "utf-8");
  const fromTimeline = [...timelineSrc.matchAll(/url:\s*"([^"]+)"/g)].map((m) => m[1]);

  let fromPending = [];
  try {
    const pending = JSON.parse(await readFile(PENDING_PATH, "utf-8"));
    fromPending = pending.map((item) => item.url);
  } catch {
    /* pending.json missing or empty, nothing to dedupe against yet */
  }

  return new Set([...fromTimeline, ...fromPending]);
}

function hasGitChanges() {
  return execSync("git status --porcelain public/pending.json").toString().trim().length > 0;
}

async function main() {
  const [results, seen] = await Promise.all([search(), knownUrls()]);

  const candidates = results
    .filter((r) => r.url && !seen.has(r.url) && !isBlockedSource(r.url))
    .map((r) => ({
      title: r.title ?? "",
      url: r.url,
      source: new URL(r.url).hostname.replace(/^www\./, ""),
      snippet: r.description ?? "",
      foundAt: new Date().toISOString(),
    }));

  if (candidates.length === 0) {
    console.log("No new candidates found.");
    return;
  }

  let existing = [];
  try {
    existing = JSON.parse(await readFile(PENDING_PATH, "utf-8"));
  } catch {
    /* start fresh */
  }

  const updated = [...existing, ...candidates];
  await writeFile(PENDING_PATH, JSON.stringify(updated, null, 2) + "\n");
  console.log(`Added ${candidates.length} candidate(s) to pending.json`);

  if (hasGitChanges()) {
    execSync('git config user.name "closedai-scraper"');
    execSync('git config user.email "actions@users.noreply.github.com"');
    execSync("git add public/pending.json");
    execSync(`git commit -m "Scrape: ${candidates.length} new candidate(s)"`);
    execSync("git push");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
