import { checkCode, getFile, putFile, removeObjectBySlug } from "../lib/admin.js";

const TIMELINE_PATH = "src/data/timeline.ts";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).end();

  const { code, slug } = req.body ?? {};
  if (!checkCode(code)) {
    return res.status(401).json({ ok: false, error: "bad code" });
  }
  if (typeof slug !== "string" || !slug) {
    return res.status(400).json({ ok: false, error: "missing slug" });
  }

  try {
    const { content, sha } = await getFile(TIMELINE_PATH);
    const updated = removeObjectBySlug(content, slug);
    await putFile(TIMELINE_PATH, updated, sha, `Remove "${slug}" via admin panel`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
