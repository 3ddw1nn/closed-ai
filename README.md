# ClosedAI

Everything that \*went\* wrong with OpenAI.

A satirical, sourced timeline of OpenAI incidents from 2023 to present — an homage to [clawd.rip](https://clawd.rip), restyled to look like the company it's roasting: white canvas, near-black ink, rounded pills, and that unmistakable ChatGPT green.

**Independent parody. Not affiliated with, endorsed by, or sponsored by OpenAI.**

## How it works

The public site has no APIs and no scraping — same as the original. Every event is hand-curated in [`src/data/timeline.ts`](src/data/timeline.ts) with a satirical title, a summary, a category tag (Legal / Quality / Reliability / Safety / Policy), and links to real news sources. Source favicons load from Google's favicon service, so there are no icon assets to maintain.

There's also a hidden, admin-only surface (Ctrl+Shift+C + a code) described below — the scraper only stages raw candidate headlines for manual review, it never auto-publishes anything.

## Stack

- [Astro](https://astro.build) — static site, zero client JS except the timeline order toggle, scroll-reveal, and the admin panel
- Plain CSS (no framework)
- A few standalone Vercel serverless functions under `api/` for the admin panel (the rest of the site stays static)
- A GitHub Actions cron job (`.github/workflows/scrape.yml`) for the daily scrape

## Develop

```sh
npm install
npm run dev      # dev server
npm run build    # static build to dist/
npm run preview  # preview the build
```

## Add an event

Append an object to `timelineEvents` in `src/data/timeline.ts`:

```ts
{
  date: "2026-08-01",
  period: "Aug 1, 2026",
  slug: "my-new-incident",
  title: "Something Went Wrong Again",
  summary: "What happened, with jokes.",
  sources: [{ title: "TechCrunch", url: "https://..." }],
  category: "Policy",
}
```

The event page at `/events/my-new-incident/` is generated automatically.

## Admin panel (secret menu)

Press **Ctrl+Shift+C** anywhere on the site and enter the admin code to unlock:

- **Run scraper now** — triggers `.github/workflows/scrape.yml` on demand (it also runs nightly at ~1am PST). It searches for recent OpenAI-controversy news via Firecrawl (social platforms like Facebook/Instagram/X/TikTok/Reddit/YouTube/LinkedIn are filtered out — news/blog sources only) and stages raw candidates (title/url/source) in `public/pending.json`.
- **Draft with AI** — per pending candidate, scrapes the full source page and drafts a complete article (title, summary, multi-paragraph body, category) in the site's voice using a free-tier LLM (see provider table below). The draft opens in an editable form — nothing is written to the repo yet.
- **Publish** — commits the (possibly edited) draft to `timeline.ts` and `stories.ts` via the GitHub Contents API and clears it from `pending.json`. The site redeploys ~1-2 minutes later.
- **Delete** — a trash icon appears on every timeline card and article page. Deleting removes the entry from `timeline.ts` via a direct commit and the site redeploys ~1-2 minutes later. Reachable via `git revert` if you delete the wrong thing.

Required secrets (set these yourself, values are not in the repo):

| Name | Where | Purpose |
| --- | --- | --- |
| `ADMIN_CODE` | Vercel project env var | The code checked by every `/api/*` admin endpoint |
| `GH_ADMIN_TOKEN` | Vercel project env var | Fine-grained GitHub PAT scoped to this repo, `contents:write` + `actions:write` |
| `FIRECRAWL_API_KEY` | Vercel project env var **and** GitHub Actions repo secret | Search (nightly scrape) and full-page scrape (AI drafting) |
| `GEMINI_API_KEY` | Vercel project env var | Default free-tier model for "Draft with AI" (`gemini-flash-latest`). See [`coding-playbook/free-ai-tools-setup.md`](coding-playbook/free-ai-tools-setup.md) — `MISTRAL_API_KEY` / `GROQ_API_KEY` / `CEREBRAS_API_KEY` / `OPENROUTER_API_KEY` are also supported; set `DRAFT_AI_PROVIDER` to switch (`gemini` \| `mistral` \| `groq` \| `cerebras` \| `openrouter`) |
