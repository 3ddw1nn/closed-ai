# closedai.rip

Everything that \*went\* wrong with OpenAI.

A satirical, sourced timeline of OpenAI incidents from 2023 to present — an homage to [clawd.rip](https://clawd.rip), restyled to look like the company it's roasting: white canvas, near-black ink, rounded pills, and that unmistakable ChatGPT green.

**Independent parody. Not affiliated with, endorsed by, or sponsored by OpenAI.**

## How it works

There are no APIs and no scraping — same as the original. Every event is hand-curated in [`src/data/timeline.ts`](src/data/timeline.ts) with a satirical title, a summary, a category tag (Legal / Quality / Reliability / Safety / Policy), and links to real news sources. Source favicons load from Google's favicon service, so there are no icon assets to maintain.

## Stack

- [Astro](https://astro.build) — static site, zero client JS except the timeline order toggle and scroll-reveal
- Plain CSS (no framework)

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
