import { geminiRewrite, isGeminiConfigured, type AiEngine } from "./gemini.server";

const SYSTEM = [
  "אתה עורך תוכן של ח. סבן חומרי בניין.",
  "כתוב עברית מקצועית, קצרה וברורה.",
  "אסור להמציא נתוני צריכה, תקנים, זמני ייבוש, עמידות למים, מי שתייה, או הוראות יישום.",
  "אם חסר נתון, כתוב שהוא חסר ושיש לאמת מול גיליון היצרן.",
  "אל תוסיף מחיר.",
].join(" ");

export type RewriteResult =
  | { ok: true; text: string; engine: AiEngine }
  | { ok: false; error: string; engine?: AiEngine };

export async function grokRewrite(
  draft: string,
  instruction: string,
): Promise<{ ok: true; text: string } | { ok: false; error: string }> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false, error: "ספק Grok לא זמין בסביבה זו." };
  const trimmed = draft.trim();
  if (trimmed.length < 2) return { ok: false, error: "אין טקסט לשיפור." };
  try {
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.3,
        max_tokens: 700,
        messages: [
          { role: "system", content: SYSTEM },
          {
            role: "user",
            content: `הנחיה: ${instruction.slice(0, 400)}\n\nטיוטה:\n${trimmed.slice(0, 4000)}`,
          },
        ],
      }),
    });
    if (!response.ok) return { ok: false, error: `שגיאת ספק טקסט (${response.status}).` };
    const body = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false, error: "הספק החזיר תשובה ריקה." };
    return { ok: true, text };
  } catch {
    return { ok: false, error: "לא הצלחנו להגיע לספק הטקסט." };
  }
}

/**
 * Unified rewrite entry — choose engine explicitly.
 * Falls back to the other engine only when the requested one is unavailable
 * and the caller did not force a specific engine.
 */
export async function rewriteText(
  draft: string,
  instruction: string,
  engine: AiEngine = "grok",
): Promise<RewriteResult> {
  if (engine === "gemini") {
    if (!isGeminiConfigured()) {
      return { ok: false, error: "Gemini לא מוגדר (חסר GEMINI_API_KEY).", engine: "gemini" };
    }
    const result = await geminiRewrite(draft, instruction);
    if (!result.ok) return { ok: false, error: result.error, engine: "gemini" };
    return { ok: true, text: result.text, engine: "gemini" };
  }

  // default: grok
  const result = await grokRewrite(draft, instruction);
  if (!result.ok) return { ok: false, error: result.error, engine: "grok" };
  return { ok: true, text: result.text, engine: "grok" };
}

export function availableEngines(): { grok: boolean; gemini: boolean } {
  return {
    grok: Boolean(process.env.XAI_API_KEY?.trim()),
    gemini: isGeminiConfigured(),
  };
}
