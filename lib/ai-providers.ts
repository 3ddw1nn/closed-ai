// Generic free-tier AI provider router, per coding-playbook/free-ai-tools-setup.md.
// Server-side only — never import this from client code.

export type AiProvider = "gemini" | "mistral" | "groq" | "cerebras" | `openrouter${string}`;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

function sanitizeJsonControlChars(text: string): string {
  let out = "";
  let inString = false;
  let escaped = false;

  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (inString && !escaped && code < 0x20) {
      if (ch === "\n") out += "\\n";
      else if (ch === "\r") out += "\\r";
      else if (ch === "\t") out += "\\t";
      else out += "\\u" + code.toString(16).padStart(4, "0");
      continue;
    }
    out += ch;
    if (escaped) escaped = false;
    else if (ch === "\\" && inString) escaped = true;
    else if (ch === '"') inString = !inString;
  }
  return out;
}

function parseModelJson(providerLabel: string, text: string) {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "");
  try {
    return JSON.parse(cleaned);
  } catch {
    try {
      return JSON.parse(sanitizeJsonControlChars(cleaned));
    } catch (err) {
      throw new Error(`${providerLabel} returned invalid JSON: ${String(err)}`);
    }
  }
}

async function callOpenAiCompatible(opts: {
  providerLabel: string;
  baseUrl: string;
  apiKey: string;
  model: string;
  system: string;
  input: string;
}) {
  const res = await fetch(`${opts.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${opts.apiKey}`,
    },
    body: JSON.stringify({
      model: opts.model,
      messages: [
        { role: "system", content: opts.system },
        { role: "user", content: opts.input },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    throw new Error(`${opts.providerLabel} error (${res.status}): ${await res.text()}`);
  }
  const json = await res.json();
  const text = json.choices?.[0]?.message?.content ?? "{}";
  return parseModelJson(opts.providerLabel, text);
}

async function callGemini(opts: { system: string; input: string }) {
  const apiKey = requireEnv("GEMINI_API_KEY");
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${opts.system}\n\n${opts.input}` }] }],
        generationConfig: { response_mime_type: "application/json" },
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`Gemini error (${res.status}): ${await res.text()}`);
  }
  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
  return parseModelJson("Gemini", text);
}

export async function callAiJson(
  modelProvider: AiProvider,
  system: string,
  input: string,
): Promise<unknown> {
  if (modelProvider === "gemini") {
    return callGemini({ system, input });
  }
  if (modelProvider === "mistral") {
    return callOpenAiCompatible({
      providerLabel: "Mistral",
      baseUrl: "https://api.mistral.ai/v1",
      apiKey: requireEnv("MISTRAL_API_KEY"),
      model: "mistral-small-latest",
      system,
      input,
    });
  }
  if (modelProvider === "groq") {
    return callOpenAiCompatible({
      providerLabel: "Groq",
      baseUrl: "https://api.groq.com/openai/v1",
      apiKey: requireEnv("GROQ_API_KEY"),
      model: "llama-3.3-70b-versatile",
      system,
      input,
    });
  }
  if (modelProvider === "cerebras") {
    return callOpenAiCompatible({
      providerLabel: "Cerebras",
      baseUrl: "https://api.cerebras.ai/v1",
      apiKey: requireEnv("CEREBRAS_API_KEY"),
      model: "gpt-oss-120b",
      system,
      input,
    });
  }
  if (modelProvider.startsWith("openrouter")) {
    const model = modelProvider.startsWith("openrouter:")
      ? modelProvider.slice("openrouter:".length)
      : "openrouter/free";
    return callOpenAiCompatible({
      providerLabel: "OpenRouter",
      baseUrl: "https://openrouter.ai/api/v1",
      apiKey: requireEnv("OPENROUTER_API_KEY"),
      model,
      system,
      input,
    });
  }
  throw new Error(`Unknown model provider: ${modelProvider}`);
}
