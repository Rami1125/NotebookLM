import type { Product, Slide, StudioTemplate, VideoScene } from "./types";

export const AUDIENCES = ["קבלנים", "אדריכלים", "לקוחות פרטיים", "צוות מכירות", "מנהלי עבודה"] as const;

export const VISUAL_STYLES = ["נקי תכלת", "טכני בהיר", "קבלנים — גדול וברור", "לובי — מעט טקסט"] as const;

export const PRESENTATION_FORMATS = ["16:9", "A4", "דלפק 16:9"] as const;

export const TEMPLATES: StudioTemplate[] = [
  {
    templateId: "tpl-sales-8",
    name: "מצגת מכירה לסניף",
    kind: "presentation",
    audience: "צוות מכירות",
    description: "פתיח, הבטחה, יתרונות שהוזנו, שקף טכני עם סטטוס אימות, וקריאה לפעולה.",
    visualStyle: "נקי תכלת",
    format: "16:9",
    slideCount: 8,
  },
  {
    templateId: "tpl-contractor-6",
    name: "תדריך קבלן",
    kind: "presentation",
    audience: "קבלנים",
    description: "שפה ישירה. בלי נתוני צריכה שלא אומתו. כולל רשימת חוסרים לבדיקה מול היצרן.",
    visualStyle: "קבלנים — גדול וברור",
    format: "A4",
    slideCount: 6,
  },
  {
    templateId: "tpl-lobby",
    name: "מסך לובי",
    kind: "signage",
    audience: "לקוחות פרטיים",
    description: "מעט טקסט, שם מוצר גדול, בלי מחיר אלא אם אושר.",
    visualStyle: "לובי — מעט טקסט",
    format: "16:9",
    slideCount: 1,
  },
  {
    templateId: "tpl-counter",
    name: "מסך דלפק",
    kind: "signage",
    audience: "צוות מכירות",
    description: "פלייליסט מוצרים לדלפק. תמונה אם קיימת, אחרת מונוגרמה טיפוגרפית.",
    visualStyle: "נקי תכלת",
    format: "דלפק 16:9",
    slideCount: 1,
  },
  {
    templateId: "tpl-video-30",
    name: "סרטון מוצר 30 שניות",
    kind: "video",
    audience: "קבלנים",
    description: "תסריט ולוח סצנות. לא נוצר קובץ וידאו בלי ספק שהופעל.",
    visualStyle: "טכני בהיר",
    format: "16:9",
    slideCount: 6,
  },
  {
    templateId: "tpl-prompt-pack",
    name: "חבילת פקודות AI",
    kind: "prompt",
    audience: "צוות מכירות",
    description: "פקודות מוכנות לתמונה, וידאו וטקסט, עם משתנים וללא המצאת מפרט.",
    visualStyle: "נקי תכלת",
    format: "טקסט",
    slideCount: 1,
  },
];

type ProductLike = Pick<
  Product,
  | "nameHe"
  | "nameEn"
  | "manufacturer"
  | "category"
  | "packageSize"
  | "description"
  | "marketingBenefits"
  | "technicalData"
  | "technicalStatus"
  | "manufacturerUrl"
  | "technicalSheetUrl"
  | "productImageUrl"
  | "priceText"
  | "priceApproved"
  | "promoText"
>;

export type SlideDraft = Omit<Slide, "slideId" | "projectId" | "createdAt">;

const STATUS_LABEL: Record<Product["technicalStatus"], string> = {
  VERIFIED: "מאומת",
  USER_PROVIDED: "סופק על ידי המשתמש",
  NEEDS_VERIFICATION: "ממתין לאימות",
  OUTDATED: "לא עדכני",
};

export function statusLabel(status: string): string {
  return STATUS_LABEL[status as Product["technicalStatus"]] ?? status;
}

function lines(value: string): string[] {
  return value
    .split(/\n|•|·|(?<=\.)\s+/)
    .map((line) => line.replace(/^[-–]\s*/, "").trim())
    .filter((line) => line.length > 1);
}

function missingFacts(product: ProductLike): string[] {
  const gaps: string[] = [];
  if (!product.technicalData.trim()) gaps.push("אין טקסט טכני שמור");
  if (!product.technicalSheetUrl) gaps.push("חסר קישור לגיליון טכני");
  if (!product.manufacturerUrl) gaps.push("חסר קישור לאתר היצרן");
  if (!product.packageSize) gaps.push("חסר גודל אריזה");
  if (!product.productImageUrl) gaps.push("חסרה תמונת מוצר");
  if (product.technicalStatus !== "VERIFIED") gaps.push(`סטטוס טכני: ${statusLabel(product.technicalStatus)}`);
  return gaps;
}

function technicalWarning(product: ProductLike): string {
  if (product.technicalStatus === "VERIFIED" && product.technicalData.trim()) return "";
  return "אין להציג נתוני צריכה, תקנים, זמני ייבוש או התאמה למים כעובדה עד לאימות מול מסמך יצרן.";
}

export function buildSlides(input: {
  product: ProductLike;
  audience: string;
  goal: string;
  slideCount: number;
  visualStyle: string;
}): SlideDraft[] {
  const product = input.product;
  const count = Math.min(12, Math.max(4, input.slideCount));
  const benefits = lines(product.marketingBenefits);
  const warning = technicalWarning(product);
  const gaps = missingFacts(product);
  const maker = product.manufacturer ? `${product.manufacturer}` : "יצרן לא צוין";

  const drafts: SlideDraft[] = [
    {
      slideNumber: 1,
      layout: "cover",
      title: product.nameHe,
      subtitle: `${input.audience} · ${maker}`,
      body: input.goal,
      technicalContent: "",
      imageUrl: product.productImageUrl,
      duration: 8,
      benefit: product.category || "חומר בנייה",
      cta: "",
      warning: "",
    },
    {
      slideNumber: 2,
      layout: "message",
      title: "למי זה מיועד",
      subtitle: input.audience,
      body: input.goal,
      technicalContent: "",
      imageUrl: "",
      duration: 8,
      benefit: product.category,
      cta: "",
      warning: "",
    },
    {
      slideNumber: 3,
      layout: "message",
      title: "מה יש לנו על המוצר",
      subtitle: product.nameEn || product.nameHe,
      body: product.description.trim() || "לא הוזן תיאור. אל תוסיפו הבטחות ביצועים לפני שיש טקסט מאושר.",
      technicalContent: "",
      imageUrl: product.productImageUrl,
      duration: 10,
      benefit: "",
      cta: "",
      warning: product.description.trim() ? "" : "תיאור חסר",
    },
  ];

  const benefitSlides = (benefits.length ? benefits : ["לא הוזנו יתרונות שיווקיים. אין להמציא אותם."]).slice(0, 3);
  benefitSlides.forEach((benefit, index) => {
    drafts.push({
      slideNumber: drafts.length + 1,
      layout: "benefit",
      title: benefits.length ? `יתרון ${index + 1}` : "יתרונות",
      subtitle: product.nameHe,
      body: benefit,
      technicalContent: "",
      imageUrl: "",
      duration: 8,
      benefit,
      cta: "",
      warning: benefits.length ? "" : "מסר שיווקי חסר במאגר",
    });
  });

  drafts.push({
    slideNumber: drafts.length + 1,
    layout: "technical",
    title: "מידע טכני",
    subtitle: statusLabel(product.technicalStatus),
    body: product.technicalData.trim() || "לא נשמר מידע טכני עבור המוצר.",
    technicalContent: [
      product.packageSize ? `אריזה שהוזנה: ${product.packageSize}` : "",
      product.technicalSheetUrl ? `גיליון: ${product.technicalSheetUrl}` : "",
      product.manufacturerUrl ? `יצרן: ${product.manufacturerUrl}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    imageUrl: "",
    duration: 12,
    benefit: "",
    cta: "",
    warning,
  });

  drafts.push({
    slideNumber: drafts.length + 1,
    layout: "visual",
    title: "המחשה מוצעת",
    subtitle: input.visualStyle,
    body: "צלמו את האריזה, יישום על משטח אמיתי, וידיים של בעל מקצוע. אל תציגו חתך טכני עם מידות שלא הופיעו בגיליון.",
    technicalContent: "",
    imageUrl: product.productImageUrl,
    duration: 8,
    benefit: "",
    cta: "",
    warning: "",
  });

  drafts.push({
    slideNumber: drafts.length + 1,
    layout: "checklist",
    title: "מה עוד חובה לאמת",
    subtitle: "לפני פרסום",
    body: gaps.length ? gaps.map((gap) => `• ${gap}`).join("\n") : "השדות המרכזיים מולאו. עדיין יש להצליב מול המסמך המקורי לפני הבטחת ביצועים.",
    technicalContent: "",
    imageUrl: "",
    duration: 10,
    benefit: "",
    cta: "",
    warning: warning || "בדקו שהציטוט תואם את המהדורה העדכנית של הגיליון.",
  });

  drafts.push({
    slideNumber: drafts.length + 1,
    layout: "cta",
    title: "ח. סבן חומרי בניין",
    subtitle: "מאז 1994",
    body: product.promoText.trim() || "נשמח להתאים את המוצר לעבודה. המחיר והמבצע מוצגים רק אחרי אישור.",
    technicalContent: product.priceApproved && product.priceText ? `מחיר שאושר: ${product.priceText}` : "",
    imageUrl: "",
    duration: 8,
    benefit: "",
    cta: "דברו עם הצוות בסניף",
    warning: product.priceText && !product.priceApproved ? "הוזן מחיר אך הוא לא אושר להצגה." : "",
  });

  const trimmed = drafts.slice(0, count).map((slide, index) => ({ ...slide, slideNumber: index + 1 }));
  while (trimmed.length < count) {
    const n = trimmed.length + 1;
    trimmed.push({
      slideNumber: n,
      layout: "message",
      title: "שקף לעריכה",
      subtitle: product.nameHe,
      body: "שקף ריק מכוון. כתבו כאן רק מידע שאושר.",
      technicalContent: "",
      imageUrl: "",
      duration: 8,
      benefit: "",
      cta: "",
      warning: "",
    });
  }
  return trimmed;
}

export function buildVideo(input: {
  product: ProductLike;
  audience: string;
  goal: string;
  duration: number;
  aspectRatio: string;
}): { script: string; scenes: VideoScene[]; videoPrompt: string } {
  const product = input.product;
  const warning = technicalWarning(product);
  const total = Math.min(90, Math.max(15, input.duration));
  const weights = [0.12, 0.16, 0.22, 0.22, 0.16, 0.12];
  const durations = weights.map((weight) => Math.max(3, Math.round(total * weight)));
  const drift = total - durations.reduce((sum, value) => sum + value, 0);
  durations[durations.length - 1] = Math.max(3, (durations[durations.length - 1] ?? 3) + drift);

  const benefit = lines(product.marketingBenefits)[0] || "יתרון שיווקי טרם הוזן";
  const scenes: VideoScene[] = [
    {
      sceneNumber: 1,
      duration: durations[0] ?? 4,
      visualDescription: `פתיח: שם המוצר ${product.nameHe} על אריזה או שלט סניף, בלי גרפיקת מפרט.`,
      cameraMovement: "התקרבות איטית",
      lighting: "אור יום רך, בלי הבזק",
      voiceover: `${product.nameHe}. ${input.goal}`,
      onScreenText: product.nameHe,
      aiVideoPrompt: `Slow push-in on a building-material package labeled ${product.nameEn || product.nameHe} in a bright Israeli trade counter, natural light, no spec callouts, no readable fake data, ${input.aspectRatio}`,
    },
    {
      sceneNumber: 2,
      duration: durations[1] ?? 5,
      visualDescription: `בעל מקצוע בסביבת עבודה, קהל היעד: ${input.audience}. בלי להציג תוצאת ביצוע שלא תועדה.`,
      cameraMovement: "צילום יד יציב מהצד",
      lighting: "תאורת אתר טבעית",
      voiceover: `מיועד ל${input.audience}.`,
      onScreenText: input.audience,
      aiVideoPrompt: `Side angle of a professional at a clean construction site, documentary style, no logos other than a plain package, no overlaid numbers, ${input.aspectRatio}`,
    },
    {
      sceneNumber: 3,
      duration: durations[2] ?? 6,
      visualDescription: product.description.trim()
        ? "הקראה חזותית של התיאור שנשמר במאגר, על גבי שוט של המוצר."
        : "אין תיאור שמור. השאירו שוט שקט של האריזה בלי קריינות טכנית.",
      cameraMovement: "שוט סטטי",
      lighting: "שולחן בהיר, רקע ניטרלי",
      voiceover: product.description.trim() || "התיאור יתווסף לאחר אישור.",
      onScreenText: product.category || "",
      aiVideoPrompt: `Static product shot on a pale blue-white table, architectural catalog photography, package unbranded if the real pack shot is unavailable, ${input.aspectRatio}`,
    },
    {
      sceneNumber: 4,
      duration: durations[3] ?? 6,
      visualDescription: `מסר שיווקי שהוזן: ${benefit}`,
      cameraMovement: "מעבר רך בין אריזה ליישום",
      lighting: "אור אחיד",
      voiceover: benefit,
      onScreenText: benefit.slice(0, 42),
      aiVideoPrompt: `Gentle match cut from package to a generic material application, no performance claims burned into the frame, ${input.aspectRatio}`,
    },
    {
      sceneNumber: 5,
      duration: durations[4] ?? 5,
      visualDescription: product.technicalData.trim()
        ? "הצגת הטקסט הטכני השמור בלבד, עם תווית סטטוס האימות."
        : "שקף המתנה: אין נתון טכני מאומת להקרנה.",
      cameraMovement: "ללא תנועה",
      lighting: "שטוחה וקריאה",
      voiceover: product.technicalData.trim()
        ? `לפי מה שנשמר במערכת, וסטטוס האימות הוא ${statusLabel(product.technicalStatus)}.`
        : "פרטים טכניים יפורסמו רק אחרי אימות מול הגיליון.",
      onScreenText: statusLabel(product.technicalStatus),
      aiVideoPrompt: `Clean title card area with empty space for Hebrew captions, pale background, no numbers, no standards marks, ${input.aspectRatio}`,
    },
    {
      sceneNumber: 6,
      duration: durations[5] ?? 4,
      visualDescription: "סגירה על שם העסק ח. סבן חומרי בניין, בלי מחיר אלא אם אושר בנפרד.",
      cameraMovement: "התרחקות קלה",
      lighting: "בהירה",
      voiceover: "ח. סבן חומרי בניין. נשמח להתאים את החומר לעבודה.",
      onScreenText: "ח. סבן · 1994",
      aiVideoPrompt: `End card, bright trade-counter interior, navy and white, no price tag, ${input.aspectRatio}`,
    },
  ];

  const script = scenes
    .map((scene) => `סצנה ${scene.sceneNumber} (${scene.duration}ש)\nקריינות: ${scene.voiceover}\nחזותי: ${scene.visualDescription}`)
    .join("\n\n");

  const videoPrompt = [
    `Product film for ${product.nameEn || product.nameHe}, audience ${input.audience}.`,
    `Goal: ${input.goal}`,
    warning ? `Constraint: ${warning}` : "",
    "Do not invent coverage rates, standards, cure times, or potable-water claims.",
    `Aspect ${input.aspectRatio}. Total about ${total} seconds.`,
    ...scenes.map((scene) => `Scene ${scene.sceneNumber}: ${scene.aiVideoPrompt}`),
  ]
    .filter(Boolean)
    .join("\n");

  return { script, scenes, videoPrompt };
}

export type BuiltinPrompt = {
  promptName: string;
  promptType: "text" | "image" | "video" | "signage" | "storyboard";
  category: string;
  variables: string[];
  promptText: string;
};

export const BUILTIN_PROMPTS: BuiltinPrompt[] = [
  {
    promptName: "תמונת מוצר לקטלוג",
    promptType: "image",
    category: "תמונה",
    variables: ["productName", "category"],
    promptText:
      "צילום קטלוג נקי של {{productName}} ממשפחת {{category}}, רקע לבן-כחלחל, אור רך, בלי מספרים, בלי תווי תקן, בלי טקסט מזויף על האריזה.",
  },
  {
    promptName: "פקודת וידאו למוצר",
    promptType: "video",
    category: "וידאו",
    variables: ["productName", "audience", "aspectRatio"],
    promptText:
      "סרטון הדרכה קצר על {{productName}} לקהל {{audience}}, יחס {{aspectRatio}}. צילום תיעודי בהיר. אסור להמציא מינונים, זמני ייבוש או תקנים. השאירו מקום לכתוביות בעברית.",
  },
  {
    promptName: "טקסט לדלפק",
    promptType: "signage",
    category: "שילוט",
    variables: ["productName", "benefit"],
    promptText:
      "כתבו שורת שילוט אחת בעברית עבור {{productName}}. השתמשו רק ביתרון הזה אם הוא לא ריק: {{benefit}}. בלי מחיר, בלי סימן קריאה מוגזם, עד 12 מילים.",
  },
  {
    promptName: "לוח סצנות",
    promptType: "storyboard",
    category: "וידאו",
    variables: ["productName", "goal"],
    promptText:
      "חלקו סרטון על {{productName}} לשישה שוטים. המטרה: {{goal}}. לכל שוט: משך, תנועת מצלמה, תאורה, קריינות, טקסט על המסך. אל תוסיפו נתון טכני שלא סופק.",
  },
  {
    promptName: "מדריך קבלן זהיר",
    promptType: "text",
    category: "תוכן",
    variables: ["productName", "technicalData"],
    promptText:
      "נסחו פסקת הכוונה לקבלן על {{productName}}. אם גוש המידע הטכני ריק, כתבו במפורש שהיישום ייקבע לפי הגיליון העדכני ואל תמלאו מספרים. מידע שסופק: {{technicalData}}",
  },
  {
    promptName: "פוסט לקמפיין",
    promptType: "text",
    category: "קמפיין",
    variables: ["productName", "audience", "goal"],
    promptText:
      "פוסט קצר בעברית על {{productName}} ל{{audience}}. מטרה: {{goal}}. טון מקצועי של בית מסחר לחומרי בניין. בלי הבטחת אחריות ובלי מחיר.",
  },
];

export function fillPrompt(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key: string) => vars[key] ?? "");
}

export function assessClaim(claim: string, excerpts: { status: string; excerpt: string }[]): {
  status: Product["technicalStatus"];
  warning: string;
} {
  const trimmed = claim.trim();
  if (!trimmed) return { status: "NEEDS_VERIFICATION", warning: "לא הוזנה טענה לבדיקה." };
  const hasNumber = /\d/.test(trimmed);
  const verified = excerpts.filter((item) => item.status === "VERIFIED" && item.excerpt.trim());
  const supported = verified.some((item) => claimSupported(trimmed, item.excerpt));
  if (supported) return { status: "VERIFIED", warning: "" };
  if (hasNumber) {
    return {
      status: "NEEDS_VERIFICATION",
      warning: "הטענה כוללת מספר, והוא לא נמצא במקור מסומן כמאומת. אל תפרסמו אותה כעובדה.",
    };
  }
  if (!verified.length) {
    return {
      status: "NEEDS_VERIFICATION",
      warning: "אין מקור מאומת שמקושר לבדיקה. סמנו את המסמך כמאומת רק אחרי קריאה בו.",
    };
  }
  return {
    status: "USER_PROVIDED",
    warning: "הניסוח לא צוטט מתוך המקור המאומת. התייחסו אליו כאל טיוטה.",
  };
}

function claimSupported(claim: string, excerpt: string): boolean {
  const needles = claim
    .split(/[^\p{L}\p{N}]+/u)
    .map((word) => word.trim())
    .filter((word) => word.length > 2 || /\d/.test(word));
  if (!needles.length) return false;
  const hay = excerpt.toLowerCase();
  const hits = needles.filter((word) => hay.includes(word.toLowerCase())).length;
  return hits / needles.length >= 0.6;
}
