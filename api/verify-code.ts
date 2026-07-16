import { checkCode } from "../lib/admin.js";

export default function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).end();

  if (!checkCode(req.body?.code)) {
    return res.status(401).json({ ok: false });
  }
  return res.status(200).json({ ok: true });
}
