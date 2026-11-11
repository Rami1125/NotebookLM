/**
 * SABAN CREATIVE STUDIO — Gemini AI Core
 * Server-only. Uses GEMINI_API_KEY (Google AI Studio / Gemini API).
 * Strict professional rules: never invent technical data for building materials.
 */

const SABAN_SYSTEM = [
  "אתה עורך תוכן מקצועי של ח. סבן חומרי בניין (1994) בע\"מ.",
  "כתוב עברית מקצועית, קצרה, ברורה ומדויקת.",
  "אסור לחלוטין להמציא או לנחש: נתוני צריכה למ\"ר, תקנים ישראליים, זמני ייבוש,",
  "עמידות למים, מי שתייה, הוראות יישום, עובי שכבה, יחס ערבוב או מפרטים טכניים.",
  "אם חסר נתון במקור — כתוב במפורש שהוא חסר ויש לאמת מול גיליון היצרן (TDS).",
  "שמור על טרמינולוגיה מקצועית: מליטה, אגרגטים, פריימרים, איטום, גבס, טיח, דבקים, צבעים.",
  "אל תוסיף מחירים, מבצעים או הבטחות שיווקיות שלא הופיעו במקור.",
  "אל תמציא מספרי תקן (ת\"י) או ערכי בדיקה.",
].join(" ");

const TDS_EXTRACT_SYSTEM = [
  SABAN_SYSTEM,
  "המשימה שלך: לחלץ רק עובדות שמופיעות במפורש בטקסט המקור.",
  "החזר JSON בלבד, ללא markdown וללא הסברים.",
  "מבנה:",
  "{\"productName\":string|null,\"consumption\":string|null,\"dryingTime\":string|null,",
  "\"israeliStandards\":string[],\"applicationNotes\":string[],\"warnings\":string[],",
  "\"missingFields\":string[],\"confidence\":\"high\"|\"medium\"|\"low\"}",
  "אם שדה לא מופיע במקור — null או מערך ריק. אל תשלים מניסיון כללי.",
].join(" ");

export type AiEngine = "grok" | "gemini";

export type GeminiResult =
  | { ok: true; text: string; model: string }
  | { ok: false; error: string };

export type TdsExtraction = {
  productName: string | null;
  consumption: string | null;
  dryingTime: string | null;
  israeliStandards: string[];
  applicationNotes: string[];
  warnings: string[];
  missingFields: string[];
  confidence: "high" | "medium" | "low";
};

function getApiKey(): string | undefined {
  return process.env.GEMINI_API_KEY?.trim() || undefined;
}

export function isGeminiConfigured(): boolean {
  return Boolean(getApiKey());
}

/** Default model: Gemini 2.0 Flash (fast, good for rewrite). Override via env. */
function pickModel(preferPro = false): string {
  const fromEnv = process.env.GEMINI_MODEL?.trim();
  if (fromEnv) return fromEnv;
  return preferPro ? "gemini-2.0-flash" : "gemini-2.0-flash";
}

async function callGemini(
  system: string,
  user: string,
  opts: { maxOutputTokens?: number; temperature?: number; preferPro?: boolean } = {},
): Promise<GeminiResult> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return { ok: false, error: "מפתח Gemini לא הוגדר בסביבה (GEMINI_API_KEY)." };
  }

  const model = pickModel(opts.preferPro);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: user }] }],
        generationConfig: {
          temperature: opts.temperature ?? 0.25,
          maxOutputTokens: opts.maxOutputTokens ?? 1024,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      return {
        ok: false,
        error: `שגיאת Gemini (${response.status})${errText ? `: ${errText.slice(0, 180)}` : ""}`,
      };
    }

    const body = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
      error?: { message?: string };
    };

    if (body.error?.message) {
      return { ok: false, error: body.error.message };
    }

    const text =
      body.candidates?.[0]?.content?.parts
        ?.map((p) => p.text ?? "")
        .join("")
        .trim() ?? "";

    if (!text) return { ok: false, error: "Gemini החזיר תשובה ריקה." };
    return { ok: true, text, model };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "לא הצלחנו להגיע ל-Gemini.",
    };
  }
}

/** Rewrite / polish marketing or technical draft under Saban rules. */
export async function geminiRewrite(
  draft: string,
  instruction: string,
): Promise<GeminiResult> {
  const trimmed = draft.trim();
  if (trimmed.length < 2) return { ok: false, error: "אין טקסט לשיפור." };

  const user = [
    `הנחיה לעריכה: ${instruction.slice(0, 500)}`,
    "",
    "טיוטה לעריכה:",
    trimmed.slice(0, 6000),
  ].join("\n");

  return callGemini(SABAN_SYSTEM, user, { maxOutputTokens: 900, temperature: 0.3 });
}

/**
 * Extract verified technical facts from TDS / product sheet text.
 * Never invents values — only surfaces what appears in the source.
 */
export async function geminiExtractTds(sourceText: string): Promise<
  | { ok: true; data: TdsExtraction; model: string }
  | { ok: false; error: string }
> {
  const text = sourceText.trim();
  if (text.length < 20) {
    return { ok: false, error: "טקסט המקור קצר מדי לחילוץ מפרט." };
  }

  const result = await callGemini(TDS_EXTRACT_SYSTEM, text.slice(0, 12000), {
    maxOutputTokens: 1200,
    temperature: 0.1,
    preferPro: true,
  });

  if (!result.ok) return result;

  try {
    // Strip accidental markdown fences if the model adds them
    const cleaned = result.text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    const parsed = JSON.parse(cleaned) as Partial<TdsExtraction>;

    const data: TdsExtraction = {
      productName: typeof parsed.productName === "string" ? parsed.productName : null,
      consumption: typeof parsed.consumption === "string" ? parsed.consumption : null,
      dryingTime: typeof parsed.dryingTime === "string" ? parsed.dryingTime : null,
      israeliStandards: Array.isArray(parsed.israeliStandards)
        ? parsed.israeliStandards.filter((x): x is string => typeof x === "string")
        : [],
      applicationNotes: Array.isArray(parsed.applicationNotes)
        ? parsed.applicationNotes.filter((x): x is string => typeof x === "string")
        : [],
      warnings: Array.isArray(parsed.warnings)
        ? parsed.warnings.filter((x): x is string => typeof x === "string")
        : [],
      missingFields: Array.isArray(parsed.missingFields)
        ? parsed.missingFields.filter((x): x is string => typeof x === "string")
        : [],
      confidence:
        parsed.confidence === "high" || parsed.confidence === "medium" || parsed.confidence === "low"
          ? parsed.confidence
          : "low",
    };

    return { ok: true, data, model: result.model };
  } catch {
    return {
      ok: false,
      error: "לא הצלחנו לפרסר את תשובת Gemini כ-JSON תקין.",
    };
  }
}
