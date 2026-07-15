// Shared helpers for the /api/* admin functions. Lives outside api/ so
// Vercel doesn't turn it into its own route.

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
