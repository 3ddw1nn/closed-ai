import {
  checkCode,
  getFile,
  putFile,
  appendTimelineEntry,
  appendStoryEntry,
  removePendingByUrl,
} from "../lib/admin.js";

const TIMELINE_PATH = "src/data/timeline.ts";
const STORIES_PATH = "src/data/stories.ts";
const PENDING_PATH = "public/pending.json";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).end();

  const { code, article, sourceTitle, sourceUrl } = req.body ?? {};
  if (!checkCode(code)) {
    return res.status(401).json({ ok: false, error: "bad code" });
  }
  if (!article?.slug || !article?.title || !Array.isArray(article?.body)) {
    return res.status(400).json({ ok: false, error: "incomplete article" });
  }

  try {
    const timeline = await getFile(TIMELINE_PATH);
    await putFile(
      TIMELINE_PATH,
      appendTimelineEntry(timeline.content, article, sourceTitle ?? "Source", sourceUrl ?? ""),
      timeline.sha,
      `Publish "${article.slug}" via admin panel`,
    );

    const stories = await getFile(STORIES_PATH);
    await putFile(
      STORIES_PATH,
      appendStoryEntry(stories.content, article),
      stories.sha,
      `Add story for "${article.slug}"`,
    );

    if (sourceUrl) {
      try {
        const pending = await getFile(PENDING_PATH);
        await putFile(
          PENDING_PATH,
          removePendingByUrl(pending.content, sourceUrl),
          pending.sha,
          `Remove published candidate "${article.slug}" from pending`,
        );
      } catch {
        // non-fatal — the article is already live, pending.json cleanup can wait
      }
    }

    return res.status(200).json({ ok: true, slug: article.slug });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
