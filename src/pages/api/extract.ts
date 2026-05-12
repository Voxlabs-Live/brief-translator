import type { APIRoute } from "astro";
import { callCached, parseJson } from "../../lib/anthropic";
import { readDemo, consumeDemo } from "../../lib/rate-limit";
import { BRIEF_SYSTEM_PROMPT } from "../../prompts/system";
import type { BriefResult } from "../../lib/brief-types";
import type { ApiResponse } from "../../lib/types";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // Step 1 — rate limit check (only enforces if DEMO_MODE=true)
  const usage = await readDemo(request);
  if (usage.exceeded) {
    return json<BriefResult>({
      ok: false,
      error: "rate_limit_exceeded",
      message: "Demo limit reached. Fork the repo to keep using.",
    });
  }

  // Step 2 — validate input
  let body: { message?: string };
  try {
    body = await request.json();
  } catch {
    return json<BriefResult>({
      ok: false,
      error: "invalid_input",
      message: "Body must be JSON with a `message` field.",
    });
  }
  const message = (body.message ?? "").trim();
  if (!message) {
    return json<BriefResult>({
      ok: false,
      error: "invalid_input",
      message: "Paste a client message first.",
    });
  }
  if (message.length > 8000) {
    return json<BriefResult>({
      ok: false,
      error: "invalid_input",
      message: "Message too long — keep it under 8000 characters.",
    });
  }

  // Step 3 — call Claude with cached system prompt
  let raw: string;
  try {
    const result = await callCached({
      systemPrompt: BRIEF_SYSTEM_PROMPT,
      userInput: `Client message:\n\n${message}`,
      maxTokens: 1800,
    });
    raw = result.text;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const code = msg.includes("ANTHROPIC_API_KEY")
      ? "missing_api_key"
      : "anthropic_error";
    return json<BriefResult>({ ok: false, error: code, message: msg });
  }

  // Step 4 — parse JSON
  let data: BriefResult;
  try {
    data = parseJson<BriefResult>(raw);
  } catch (err) {
    return json<BriefResult>({
      ok: false,
      error: "parse_error",
      message: "Claude returned non-JSON. Try again.",
    });
  }

  // Step 5 — consume one demo credit (only counts on success)
  await consumeDemo(request);
  const remaining =
    usage.remaining === Infinity ? -1 : Math.max(0, usage.remaining - 1);

  return json<BriefResult>({ ok: true, data, remaining });
};

function json<T>(payload: ApiResponse<T>): Response {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
