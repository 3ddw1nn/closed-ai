// Shared helpers for the /api/* admin functions. Lives outside api/ so
// Vercel doesn't turn it into its own route.

import { callAiJson } from "./ai-providers.js";

const GITHUB_API = "https://api.github.com";
const REPO = "3ddw1nn/closed-ai";

export function checkCode(code: unknown): boolean {
  const expected = process.env.ADMIN_CODE;
  return typeof code === "string" && !!expected && code === expected;
}

function githubHeaders() {
  return {
    Authorization: `Bearer ${process.env.GH_ADMIN_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function dispatchWorkflow(workflow: string) {
  const res = await fetch(
    `${GITHUB_API}/repos/${REPO}/actions/workflows/${workflow}/dispatches`,
    {
      method: "POST",
      headers: { ...githubHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ ref: "main" }),
    },
  );
  if (!res.ok) {
    throw new Error(`GitHub dispatch failed: ${res.status} ${await res.text()}`);
  }
}

export async function getFile(path: string): Promise<{ content: string; sha: string }> {
  const res = await fetch(
    `${GITHUB_API}/repos/${REPO}/contents/${path}?ref=main`,
    { headers: githubHeaders() },
  );
  if (!res.ok) {
    throw new Error(`GitHub getFile failed: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { content: string; sha: string };
  return { content: Buffer.from(json.content, "base64").toString("utf-8"), sha: json.sha };
}

export async function putFile(path: string, content: string, sha: string, message: string) {
  const res = await fetch(`${GITHUB_API}/repos/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: { ...githubHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf-8").toString("base64"),
      sha,
      branch: "main",
    }),
  });
  if (!res.ok) {
    throw new Error(`GitHub putFile failed: ${res.status} ${await res.text()}`);
  }
}

const CATEGORIES = ["Legal", "Quality", "Reliability", "Safety", "Policy"] as const;

export type DraftedArticle = {
  date: string;
  period: string;
  slug: string;
  prompt: string;
  title: string;
  summary: string;
  body: string[];
  aftermath?: string;
  category: (typeof CATEGORIES)[number];
};

export async function firecrawlScrape(url: string): Promise<string> {
  const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, formats: ["markdown"] }),
  });
  if (!res.ok) {
    throw new Error(`Firecrawl scrape failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  return (json.data?.markdown ?? "").slice(0, 12000);
}

const DRAFT_SYSTEM_PROMPT = `You write entries for ClosedAI, a satirical but factually-sourced timeline of OpenAI controversies. Voice: dry, specific, a little cutting, never cartoonish — the jokes come from precise details and irony, not exaggeration. Every factual claim must be grounded in the provided source text; never invent facts, quotes, or numbers not present in the source.

Example of the house voice (for calibration only, don't reuse the content):
"A Redis race condition let users see strangers' chat titles and, for 1.2% of Plus subscribers, names, emails, and partial card data. The company built on 'aligning AI with humans' got misaligned with its own cache."

Return ONLY valid JSON, no markdown fences, no commentary, matching exactly this shape:
{
  "date": "ISO date YYYY-MM-DD the incident/news occurred or was reported",
  "period": "Human readable date, e.g. 'Jul 16, 2026'",
  "slug": "kebab-case, url-safe, 2-5 words",
  "prompt": "A short, snarky fake chat-bubble question a user might ask about this",
  "title": "Satirical headline for the incident",
  "summary": "1-2 sentence dry, specific summary for the card view",
  "body": ["2-4 paragraphs of long-form body copy, matching the house voice, may include inline <a href> links to the source"],
  "aftermath": "optional 1-sentence 'where it stands now' closer, omit if not applicable",
  "category": "one of: Legal, Quality, Reliability, Safety, Policy"
}`;

const DEFAULT_AI_PROVIDER = (process.env.DRAFT_AI_PROVIDER ?? "gemini") as Parameters<
  typeof callAiJson
>[0];

export async function draftArticle(candidate: {
  title: string;
  url: string;
  source: string;
  snippet: string;
}, sourceText: string): Promise<DraftedArticle> {
  const input = `Candidate headline: ${candidate.title}\nSource: ${candidate.source} (${candidate.url})\nSearch snippet: ${candidate.snippet}\n\nFull source content:\n${sourceText || "(source page could not be fetched — use only the headline and snippet above, be conservative)"}`;
  const result = await callAiJson(DEFAULT_AI_PROVIDER, DRAFT_SYSTEM_PROMPT, input);
  return result as DraftedArticle;
}

function timelineEntrySource(article: DraftedArticle, sourceTitle: string, sourceUrl: string): string {
  return `  {
    date: ${JSON.stringify(article.date)},
    period: ${JSON.stringify(article.period)},
    slug: ${JSON.stringify(article.slug)},
    prompt: ${JSON.stringify(article.prompt)},
    title: ${JSON.stringify(article.title)},
    summary: ${JSON.stringify(article.summary)},
    sources: [{ title: ${JSON.stringify(sourceTitle)}, url: ${JSON.stringify(sourceUrl)} }],
    category: ${JSON.stringify(article.category)},
  },`;
}

function storyEntrySource(article: DraftedArticle): string {
  const body = article.body.map((p) => `      ${JSON.stringify(p)},`).join("\n");
  const aftermath = article.aftermath ? `\n    aftermath: ${JSON.stringify(article.aftermath)},` : "";
  return `  ${JSON.stringify(article.slug)}: {
    body: [
${body}
    ],${aftermath}
  },`;
}

export function appendTimelineEntry(source: string, article: DraftedArticle, sourceTitle: string, sourceUrl: string): string {
  const marker = "\n];\n\nexport const categories";
  const idx = source.indexOf(marker);
  if (idx === -1) throw new Error("could not find timelineEvents array end");
  return source.slice(0, idx) + "\n" + timelineEntrySource(article, sourceTitle, sourceUrl) + source.slice(idx);
}

export function appendStoryEntry(source: string, article: DraftedArticle): string {
  const trimmed = source.trimEnd();
  if (!trimmed.endsWith("};")) throw new Error("unexpected stories.ts format");
  const idx = trimmed.length - 2;
  return trimmed.slice(0, idx) + storyEntrySource(article) + "\n" + trimmed.slice(idx) + "\n";
}

export function removePendingByUrl(pendingJson: string, url: string): string {
  const items = JSON.parse(pendingJson) as Array<{ url: string }>;
  return JSON.stringify(items.filter((item) => item.url !== url), null, 2) + "\n";
}

/**
 * Removes the object literal containing `slug: "<slug>"` from a source file
 * shaped like `export const x = [ { ... }, { ... } ];` by walking outward
 * from the match to the enclosing balanced {...} and deleting that block
 * plus its trailing comma/whitespace.
 */
export function removeObjectBySlug(source: string, slug: string): string {
  const marker = `slug: "${slug}"`;
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(`slug "${slug}" not found`);
  }

  let start = source.lastIndexOf("{", markerIndex);
  let depth = 1;
  let end = start + 1;
  while (depth > 0) {
    const char = source[end];
    if (char === "{") depth++;
    else if (char === "}") depth--;
    else if (end >= source.length) {
      throw new Error("unbalanced braces while removing entry");
    }
    end++;
  }

  // Swallow a trailing comma and the newline/indentation after it, so the
  // surrounding array formatting stays clean.
  let sliceEnd = end;
  while (source[sliceEnd] === "," ) sliceEnd++;
  while (source[sliceEnd] === "\n" || source[sliceEnd] === " ") sliceEnd++;

  // And the leading indentation/newline before the block, so we don't leave
  // a blank line behind.
  let sliceStart = start;
  while (source[sliceStart - 1] === " ") sliceStart--;
  while (source[sliceStart - 1] === "\n") sliceStart--;

  return source.slice(0, sliceStart) + "\n" + source.slice(sliceEnd);
}
