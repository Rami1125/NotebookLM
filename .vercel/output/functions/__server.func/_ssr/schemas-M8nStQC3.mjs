import { n as createMiddleware } from "./ssr.mjs";
import { A as boolean, D as _enum, F as object, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schemas-M8nStQC3.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-1vAx-gM_.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-B_pgbIC4.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
var text = (max) => string().trim().max(max);
var optionalText = (max) => text(max).optional().default("");
var httpUrl = string().trim().max(2e3).refine((value) => value === "" || /^https?:\/\//i.test(value), "יש להזין כתובת http או https");
var technicalStatusSchema = _enum([
	"VERIFIED",
	"USER_PROVIDED",
	"NEEDS_VERIFICATION",
	"OUTDATED"
]);
var roleSchema = _enum([
	"ADMIN",
	"EDITOR",
	"VIEWER"
]);
var productInputSchema = object({
	sku: optionalText(80),
	nameHe: text(180).min(2, "חסר שם בעברית"),
	nameEn: optionalText(180),
	manufacturer: optionalText(120),
	category: optionalText(80),
	packageSize: optionalText(80),
	description: optionalText(4e3),
	marketingBenefits: optionalText(4e3),
	technicalData: optionalText(8e3),
	technicalStatus: technicalStatusSchema.optional().default("NEEDS_VERIFICATION"),
	manufacturerUrl: httpUrl.optional().default(""),
	technicalSheetUrl: httpUrl.optional().default(""),
	productImageUrl: httpUrl.optional().default(""),
	priceText: optionalText(80),
	priceApproved: boolean().optional().default(false),
	promoText: optionalText(240),
	complementaryIds: array(string().trim().max(40)).max(12).optional().default([])
});
var projectBriefSchema = object({
	projectName: text(180).min(2, "חסר שם פרויקט"),
	productId: text(40).min(4),
	targetAudience: text(80).min(2),
	goal: text(400).min(2, "חסרה מטרה"),
	visualStyle: text(80),
	format: text(40),
	slideCount: number().int().min(4).max(12)
});
var videoBriefSchema = object({
	title: text(180).min(2),
	productId: text(40).min(4),
	targetAudience: text(80).min(2),
	goal: text(400).min(2),
	duration: number().int().min(15).max(90),
	aspectRatio: _enum([
		"16:9",
		"9:16",
		"1:1"
	])
});
var slideInputSchema = object({
	slideId: text(40),
	title: optionalText(200),
	subtitle: optionalText(240),
	body: optionalText(4e3),
	technicalContent: optionalText(4e3),
	imageUrl: httpUrl.optional().default(""),
	layout: optionalText(40),
	duration: number().int().min(3).max(60).optional().default(8),
	benefit: optionalText(400),
	cta: optionalText(200),
	warning: optionalText(400)
});
var promptInputSchema = object({
	promptName: text(160).min(2),
	promptType: _enum([
		"text",
		"image",
		"video",
		"signage",
		"storyboard"
	]),
	promptText: text(8e3).min(8),
	category: optionalText(80),
	variables: array(string().trim().max(40)).max(20).optional().default([])
});
var mediaInputSchema = object({
	fileName: text(180).min(1),
	mediaType: _enum([
		"image",
		"video",
		"document",
		"audio"
	]),
	productId: optionalText(40),
	sourceType: _enum([
		"link",
		"drive",
		"upload",
		"manufacturer",
		"generated"
	]),
	sourceUrl: httpUrl.optional().default(""),
	storageUrl: httpUrl.optional().default(""),
	licenseStatus: _enum([
		"UNSPECIFIED",
		"OWNED",
		"LICENSED",
		"MANUFACTURER",
		"RESTRICTED"
	]),
	notes: optionalText(1e3)
});
var knowledgeInputSchema = object({
	title: text(200).min(2),
	sourceType: _enum([
		"manufacturer",
		"tds",
		"sds",
		"catalog",
		"standard",
		"notebooklm",
		"other"
	]),
	sourceUrl: httpUrl.optional().default(""),
	productId: optionalText(40),
	documentUrl: httpUrl.optional().default(""),
	verificationStatus: technicalStatusSchema,
	lastVerified: optionalText(40),
	notes: optionalText(4e3),
	excerpt: optionalText(8e3)
});
var campaignInputSchema = object({
	campaignName: text(180).min(2),
	targetAudience: optionalText(80),
	productIds: array(string().trim().max(40)).max(24).optional().default([]),
	campaignGoal: optionalText(500),
	contentIds: array(string().trim().max(40)).max(24).optional().default([]),
	status: _enum([
		"DRAFT",
		"IN_PROGRESS",
		"PENDING_REVIEW",
		"APPROVED",
		"ARCHIVED"
	]).optional()
});
var signageInputSchema = object({
	name: text(160).min(2),
	screenType: _enum([
		"counter",
		"lobby",
		"parking"
	]),
	productIds: array(string().trim().max(40)).min(1).max(20),
	intervalSec: number().int().min(4).max(60),
	transition: _enum(["fade", "slide"])
});
var idSchema = object({ id: string().trim().min(4).max(40) });
//#endregion
export { mediaInputSchema as a, promptInputSchema as c, slideInputSchema as d, technicalStatusSchema as f, knowledgeInputSchema as i, roleSchema as l, campaignInputSchema as n, productInputSchema as o, videoBriefSchema as p, idSchema as r, projectBriefSchema as s, authMiddleware as t, signageInputSchema as u };
