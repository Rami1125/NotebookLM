import { z } from "zod";

const text = (max: number) => z.string().trim().max(max);
const optionalText = (max: number) => text(max).optional().default("");

const httpUrl = z
  .string()
  .trim()
  .max(2000)
  .refine((value) => value === "" || /^https?:\/\//i.test(value), "יש להזין כתובת http או https");

export const technicalStatusSchema = z.enum([
  "VERIFIED",
  "USER_PROVIDED",
  "NEEDS_VERIFICATION",
  "OUTDATED",
]);

export const roleSchema = z.enum(["ADMIN", "EDITOR", "VIEWER"]);

export const productInputSchema = z.object({
  sku: optionalText(80),
  nameHe: text(180).min(2, "חסר שם בעברית"),
  nameEn: optionalText(180),
  manufacturer: optionalText(120),
  category: optionalText(80),
  packageSize: optionalText(80),
  description: optionalText(4000),
  marketingBenefits: optionalText(4000),
  technicalData: optionalText(8000),
  technicalStatus: technicalStatusSchema.optional().default("NEEDS_VERIFICATION"),
  manufacturerUrl: httpUrl.optional().default(""),
  technicalSheetUrl: httpUrl.optional().default(""),
  productImageUrl: httpUrl.optional().default(""),
  priceText: optionalText(80),
  priceApproved: z.boolean().optional().default(false),
  promoText: optionalText(240),
  complementaryIds: z.array(z.string().trim().max(40)).max(12).optional().default([]),
});

export const projectBriefSchema = z.object({
  projectName: text(180).min(2, "חסר שם פרויקט"),
  productId: text(40).min(4),
  targetAudience: text(80).min(2),
  goal: text(400).min(2, "חסרה מטרה"),
  visualStyle: text(80),
  format: text(40),
  slideCount: z.number().int().min(4).max(12),
});

export const videoBriefSchema = z.object({
  title: text(180).min(2),
  productId: text(40).min(4),
  targetAudience: text(80).min(2),
  goal: text(400).min(2),
  duration: z.number().int().min(15).max(90),
  aspectRatio: z.enum(["16:9", "9:16", "1:1"]),
});

export const slideInputSchema = z.object({
  slideId: text(40),
  title: optionalText(200),
  subtitle: optionalText(240),
  body: optionalText(4000),
  technicalContent: optionalText(4000),
  imageUrl: httpUrl.optional().default(""),
  layout: optionalText(40),
  duration: z.number().int().min(3).max(60).optional().default(8),
  benefit: optionalText(400),
  cta: optionalText(200),
  warning: optionalText(400),
});

export const promptInputSchema = z.object({
  promptName: text(160).min(2),
  promptType: z.enum(["text", "image", "video", "signage", "storyboard"]),
  promptText: text(8000).min(8),
  category: optionalText(80),
  variables: z.array(z.string().trim().max(40)).max(20).optional().default([]),
});

export const mediaInputSchema = z.object({
  fileName: text(180).min(1),
  mediaType: z.enum(["image", "video", "document", "audio"]),
  productId: optionalText(40),
  sourceType: z.enum(["link", "drive", "upload", "manufacturer", "generated"]),
  sourceUrl: httpUrl.optional().default(""),
  storageUrl: httpUrl.optional().default(""),
  licenseStatus: z.enum(["UNSPECIFIED", "OWNED", "LICENSED", "MANUFACTURER", "RESTRICTED"]),
  notes: optionalText(1000),
});

export const knowledgeInputSchema = z.object({
  title: text(200).min(2),
  sourceType: z.enum(["manufacturer", "tds", "sds", "catalog", "standard", "notebooklm", "other"]),
  sourceUrl: httpUrl.optional().default(""),
  productId: optionalText(40),
  documentUrl: httpUrl.optional().default(""),
  verificationStatus: technicalStatusSchema,
  lastVerified: optionalText(40),
  notes: optionalText(4000),
  excerpt: optionalText(8000),
});

export const campaignInputSchema = z.object({
  campaignName: text(180).min(2),
  targetAudience: optionalText(80),
  productIds: z.array(z.string().trim().max(40)).max(24).optional().default([]),
  campaignGoal: optionalText(500),
  contentIds: z.array(z.string().trim().max(40)).max(24).optional().default([]),
  status: z.enum(["DRAFT", "IN_PROGRESS", "PENDING_REVIEW", "APPROVED", "ARCHIVED"]).optional(),
});

export const signageInputSchema = z.object({
  name: text(160).min(2),
  screenType: z.enum(["counter", "lobby", "parking"]),
  productIds: z.array(z.string().trim().max(40)).min(1).max(20),
  intervalSec: z.number().int().min(4).max(60),
  transition: z.enum(["fade", "slide"]),
});

export const idSchema = z.object({ id: z.string().trim().min(4).max(40) });

export type ProductInput = z.infer<typeof productInputSchema>;
export type ProjectBrief = z.infer<typeof projectBriefSchema>;
export type VideoBrief = z.infer<typeof videoBriefSchema>;
