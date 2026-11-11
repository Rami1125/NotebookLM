import type { TechnicalStatus } from "./types";

export type SeedProduct = {
  sku: string;
  nameHe: string;
  nameEn: string;
  manufacturer: string;
  category: string;
  manufacturerUrl: string;
  description: string;
  marketingBenefits: string;
  technicalStatus: TechnicalStatus;
};

/** Opening catalog requested by the business. Identity only — no invented TDS values. */
export const SEED_PRODUCTS: SeedProduct[] = [
  {
    sku: "SIKA-CERAM-255",
    nameHe: "SikaCeram-255 StarFlex",
    nameEn: "SikaCeram-255 StarFlex",
    manufacturer: "Sika",
    category: "דבקים לריצוף",
    manufacturerUrl: "https://www.sika.com/",
    description: "רשומת פתיחה למוצר Sika ממשפחת הדבקים לריצוף. יש להחליף תיאור זה בטקסט שאושר מול דף היצרן.",
    marketingBenefits: "מותג Sika המוכר לקבלנים\nמיועד לשיחה מקצועית על ריצוף\nזמינות בפועל תאושר מול הסניף",
    technicalStatus: "NEEDS_VERIFICATION",
  },
  {
    sku: "SIKA-TOP-SEAL-107",
    nameHe: "SikaTop Seal-107",
    nameEn: "SikaTop Seal-107",
    manufacturer: "Sika",
    category: "איטום",
    manufacturerUrl: "https://www.sika.com/",
    description: "רשומת פתיחה למוצר איטום של Sika. אין כאן נתוני עובי, התאמה למי שתייה או זמני ייבוש.",
    marketingBenefits: "שייך למשפחת פתרונות האיטום של Sika\nמתאים לשיחת ייעוץ בסניף לפני בחירה",
    technicalStatus: "NEEDS_VERIFICATION",
  },
  {
    sku: "TAMB-SUPERCRYL-MATT",
    nameHe: "Tambour Supercryl Matt",
    nameEn: "Tambour Supercryl Matt",
    manufacturer: "Tambour",
    category: "צבעים",
    manufacturerUrl: "https://www.tambour.co.il/",
    description: "רשומת פתיחה לצבע טמבור. גוון, כיסוי ודילול יילקחו רק מגיליון היצרן אחרי שיקושר.",
    marketingBenefits: "צבע קיר מבית טמבור\nמתאים להצגה בדלפק הצבע",
    technicalStatus: "NEEDS_VERIFICATION",
  },
  {
    sku: "G200-ECO",
    nameHe: "G200 ECO",
    nameEn: "G200 ECO",
    manufacturer: "",
    category: "כללי",
    manufacturerUrl: "",
    description: "רשומת פתיחה. היצרן לא הוזן ולכן לא שויך. יש להשלים יצרן וקישור רשמי לפני פרסום.",
    marketingBenefits: "",
    technicalStatus: "NEEDS_VERIFICATION",
  },
  {
    sku: "TESA-4435",
    nameHe: "Tesa 4435 Outdoor",
    nameEn: "Tesa 4435 Outdoor",
    manufacturer: "Tesa",
    category: "סרטי הדבקה",
    manufacturerUrl: "https://www.tesa.com/",
    description: "רשומת פתיחה לסרט Tesa לשימוש חוץ, לפי שם המוצר בלבד. רוחב, אורך ועמידות יאומתו מהקטלוג.",
    marketingBenefits: "סרט מקצועי מבית Tesa\nרלוונטי לעבודות חוץ — בכפוף לגיליון",
    technicalStatus: "NEEDS_VERIFICATION",
  },
  {
    sku: "TAMB-BONDROL-SUPER",
    nameHe: "Tambour Bondrol Super",
    nameEn: "Tambour Bondrol Super",
    manufacturer: "Tambour",
    category: "צבעים",
    manufacturerUrl: "https://www.tambour.co.il/",
    description: "רשומת פתיחה למוצר טמבור. אין במערכת הוראות מריחה או זמני המתנה.",
    marketingBenefits: "מוצר משלים בפינת הצבע\nההתאמה למשטח תיקבע לפי הגיליון",
    technicalStatus: "NEEDS_VERIFICATION",
  },
  {
    sku: "SIKA-LATEX-SBR",
    nameHe: "SikaLatex SBR",
    nameEn: "SikaLatex SBR",
    manufacturer: "Sika",
    category: "תוספים",
    manufacturerUrl: "https://www.sika.com/",
    description: "רשומת פתיחה לתוסף Sika. מינון ושימושים אסורים עד לקישור דף הנתונים.",
    marketingBenefits: "תוסף מוכר מבית Sika\nהמינון אינו מוצג כי לא אומת",
    technicalStatus: "NEEDS_VERIFICATION",
  },
  {
    sku: "SIKA-SEALTAPE-F",
    nameHe: "Sika SealTape F",
    nameEn: "Sika SealTape F",
    manufacturer: "Sika",
    category: "אביזרי איטום",
    manufacturerUrl: "https://www.sika.com/",
    description: "רשומת פתיחה לסרט איטום של Sika. מידות ותאימות למערכת האיטום יאומתו בנפרד.",
    marketingBenefits: "אביזר משלים למערכות איטום\nיש לאשר תאימות מול המערכת שנבחרה",
    technicalStatus: "NEEDS_VERIFICATION",
  },
];
