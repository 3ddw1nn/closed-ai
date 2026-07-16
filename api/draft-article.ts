import { checkCode, firecrawlScrape, draftArticle } from "../lib/admin.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).end();

  const { code, candidate } = req.body ?? {};
  if (!checkCode(code)) {
    return res.status(401).json({ ok: false, error: "bad code" });
  }
  if (!candidate?.url || !candidate?.title) {
    return res.status(400).json({ ok: false, error: "missing candidate" });
  }

  try {
    let sourceText = "";
    try {
      sourceText = await firecrawlScrape(candidate.url);
    } catch {
      // fall back to just the headline/snippet already in the candidate
    }
    const article = await draftArticle(candidate, sourceText);
    return res.status(200).json({ ok: true, article });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
