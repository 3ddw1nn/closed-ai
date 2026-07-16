import { checkCode, dispatchWorkflow } from "../lib/admin.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).end();

  if (!checkCode(req.body?.code)) {
    return res.status(401).json({ ok: false, error: "bad code" });
  }

  try {
    await dispatchWorkflow("scrape.yml");
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
