import { r as getSql } from "./db-D6SGE5yi.mjs";
import { c as buildVideo, n as BUILTIN_PROMPTS, s as buildSlides } from "./compose-DuheWigm.mjs";
import { randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/store.server-CUwwBFG7.js
/** Opening catalog requested by the business. Identity only — no invented TDS values. */
var SEED_PRODUCTS = [
	{
		sku: "SIKA-CERAM-255",
		nameHe: "SikaCeram-255 StarFlex",
		nameEn: "SikaCeram-255 StarFlex",
		manufacturer: "Sika",
		category: "דבקים לריצוף",
		manufacturerUrl: "https://www.sika.com/",
		description: "רשומת פתיחה למוצר Sika ממשפחת הדבקים לריצוף. יש להחליף תיאור זה בטקסט שאושר מול דף היצרן.",
		marketingBenefits: "מותג Sika המוכר לקבלנים\nמיועד לשיחה מקצועית על ריצוף\nזמינות בפועל תאושר מול הסניף",
		technicalStatus: "NEEDS_VERIFICATION"
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
		technicalStatus: "NEEDS_VERIFICATION"
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
		technicalStatus: "NEEDS_VERIFICATION"
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
		technicalStatus: "NEEDS_VERIFICATION"
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
		technicalStatus: "NEEDS_VERIFICATION"
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
		technicalStatus: "NEEDS_VERIFICATION"
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
		technicalStatus: "NEEDS_VERIFICATION"
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
		technicalStatus: "NEEDS_VERIFICATION"
	}
];
var hits = /* @__PURE__ */ new Map();
function nid(prefix) {
	return `${prefix}_${randomBytes(6).toString("hex")}`;
}
function rateLimit(userId, bucket, limit = 40) {
	const key = `${userId}:${bucket}`;
	const now = Date.now();
	const recent = (hits.get(key) ?? []).filter((stamp) => now - stamp < 6e4);
	if (recent.length >= limit) throw new Error("יותר מדי בקשות. נסו שוב בעוד דקה.");
	recent.push(now);
	hits.set(key, recent);
}
function str(row, key) {
	const value = row[key];
	if (value == null) return "";
	if (value instanceof Date) return value.toISOString();
	return String(value);
}
function num(row, key) {
	const value = Number(row[key]);
	return Number.isFinite(value) ? value : 0;
}
function bool(row, key) {
	const value = row[key];
	return value === true || value === "t" || value === "true" || value === 1;
}
function list(row, key) {
	const raw = str(row, key);
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.map((item) => String(item)) : [];
	} catch {
		return [];
	}
}
function asRole(value) {
	if (value === "ADMIN" || value === "EDITOR" || value === "VIEWER") return value;
	return "VIEWER";
}
function mapProduct(row) {
	return {
		productId: str(row, "product_id"),
		sku: str(row, "sku"),
		nameHe: str(row, "name_he"),
		nameEn: str(row, "name_en"),
		manufacturer: str(row, "manufacturer"),
		category: str(row, "category"),
		packageSize: str(row, "package_size"),
		description: str(row, "description"),
		marketingBenefits: str(row, "marketing_benefits"),
		technicalData: str(row, "technical_data"),
		technicalStatus: str(row, "technical_status") || "NEEDS_VERIFICATION",
		manufacturerUrl: str(row, "manufacturer_url"),
		technicalSheetUrl: str(row, "technical_sheet_url"),
		productImageUrl: str(row, "product_image_url"),
		priceText: str(row, "price_text"),
		priceApproved: bool(row, "price_approved"),
		promoText: str(row, "promo_text"),
		complementaryIds: list(row, "complementary_ids"),
		createdAt: str(row, "created_at"),
		updatedAt: str(row, "updated_at")
	};
}
function mapProject(row) {
	return {
		projectId: str(row, "project_id"),
		projectName: str(row, "project_name"),
		projectType: str(row, "project_type"),
		productIds: list(row, "product_ids"),
		targetAudience: str(row, "target_audience"),
		visualStyle: str(row, "visual_style"),
		format: str(row, "format"),
		goal: str(row, "goal"),
		status: str(row, "status") || "DRAFT",
		previewUrl: str(row, "preview_url"),
		exportUrl: str(row, "export_url"),
		createdAt: str(row, "created_at"),
		updatedAt: str(row, "updated_at")
	};
}
function mapSlide(row) {
	return {
		slideId: str(row, "slide_id"),
		projectId: str(row, "project_id"),
		slideNumber: num(row, "slide_number"),
		title: str(row, "title"),
		subtitle: str(row, "subtitle"),
		body: str(row, "body"),
		technicalContent: str(row, "technical_content"),
		imageUrl: str(row, "image_url"),
		layout: str(row, "layout"),
		duration: num(row, "duration") || 8,
		benefit: str(row, "benefit"),
		cta: str(row, "cta"),
		warning: str(row, "warning"),
		createdAt: str(row, "created_at")
	};
}
function mapVideo(row) {
	let storyboard = [];
	let versions = [];
	try {
		storyboard = JSON.parse(str(row, "storyboard") || "[]");
	} catch {
		storyboard = [];
	}
	try {
		versions = JSON.parse(str(row, "versions") || "[]");
	} catch {
		versions = [];
	}
	return {
		videoId: str(row, "video_id"),
		projectId: str(row, "project_id"),
		title: str(row, "title"),
		duration: num(row, "duration"),
		aspectRatio: str(row, "aspect_ratio"),
		script: str(row, "script"),
		storyboard,
		videoPrompt: str(row, "video_prompt"),
		provider: str(row, "provider"),
		outputUrl: str(row, "output_url"),
		status: str(row, "status"),
		versions,
		createdAt: str(row, "created_at"),
		updatedAt: str(row, "updated_at")
	};
}
function mapMedia(row) {
	return {
		mediaId: str(row, "media_id"),
		fileName: str(row, "file_name"),
		mediaType: str(row, "media_type"),
		productId: str(row, "product_id"),
		sourceType: str(row, "source_type"),
		sourceUrl: str(row, "source_url"),
		storageUrl: str(row, "storage_url"),
		licenseStatus: str(row, "license_status"),
		notes: str(row, "notes"),
		createdAt: str(row, "created_at")
	};
}
function mapPrompt(row) {
	return {
		promptId: str(row, "prompt_id"),
		promptName: str(row, "prompt_name"),
		promptType: str(row, "prompt_type"),
		promptText: str(row, "prompt_text"),
		category: str(row, "category"),
		variables: list(row, "variables"),
		builtin: bool(row, "builtin"),
		createdAt: str(row, "created_at"),
		updatedAt: str(row, "updated_at")
	};
}
function mapKnowledge(row) {
	return {
		sourceId: str(row, "source_id"),
		title: str(row, "title"),
		sourceType: str(row, "source_type"),
		sourceUrl: str(row, "source_url"),
		productId: str(row, "product_id"),
		documentUrl: str(row, "document_url"),
		verificationStatus: str(row, "verification_status") || "NEEDS_VERIFICATION",
		lastVerified: str(row, "last_verified"),
		notes: str(row, "notes"),
		excerpt: str(row, "excerpt"),
		createdAt: str(row, "created_at"),
		updatedAt: str(row, "updated_at")
	};
}
function mapCampaign(row) {
	return {
		campaignId: str(row, "campaign_id"),
		campaignName: str(row, "campaign_name"),
		targetAudience: str(row, "target_audience"),
		productIds: list(row, "product_ids"),
		campaignGoal: str(row, "campaign_goal"),
		contentIds: list(row, "content_ids"),
		status: str(row, "status") || "DRAFT",
		createdAt: str(row, "created_at"),
		updatedAt: str(row, "updated_at")
	};
}
function mapScreen(row) {
	const screenType = str(row, "screen_type");
	const transition = str(row, "transition");
	return {
		screenId: str(row, "screen_id"),
		name: str(row, "name"),
		screenType: screenType === "lobby" || screenType === "parking" ? screenType : "counter",
		productIds: list(row, "product_ids"),
		intervalSec: num(row, "interval_sec") || 8,
		transition: transition === "slide" ? "slide" : "fade",
		status: str(row, "status"),
		createdAt: str(row, "created_at"),
		updatedAt: str(row, "updated_at")
	};
}
function mapMember(row) {
	return {
		userId: str(row, "user_id"),
		name: str(row, "name"),
		email: str(row, "email"),
		role: asRole(str(row, "role")),
		status: str(row, "status"),
		createdAt: str(row, "created_at")
	};
}
function mapLog(row) {
	return {
		logId: str(row, "log_id"),
		action: str(row, "action"),
		userId: str(row, "user_id"),
		entityType: str(row, "entity_type"),
		entityId: str(row, "entity_id"),
		timestamp: str(row, "timestamp"),
		result: str(row, "result"),
		errorMessage: str(row, "error_message")
	};
}
async function log(sql, userId, action, entityType, entityId, result, errorMessage = "") {
	await sql`insert into system_logs (log_id, action, user_id, entity_type, entity_id, result, error_message)
    values (${nid("log")}, ${action}, ${userId}, ${entityType}, ${entityId}, ${result}, ${errorMessage})`;
}
async function seedCatalog(sql, userId) {
	const existing = await sql`select count(*)::int as c from products`;
	if (Number(existing[0]?.c ?? 0) > 0) return;
	for (const item of SEED_PRODUCTS) await sql`insert into products (
      product_id, sku, name_he, name_en, manufacturer, category, description, marketing_benefits,
      technical_status, manufacturer_url, created_by
    ) values (
      ${nid("prd")}, ${item.sku}, ${item.nameHe}, ${item.nameEn}, ${item.manufacturer}, ${item.category},
      ${item.description}, ${item.marketingBenefits}, ${item.technicalStatus}, ${item.manufacturerUrl}, ${userId}
    )`;
	await log(sql, userId, "seedProducts", "product", "", "ok");
}
async function seedPrompts(sql, userId) {
	for (const prompt of BUILTIN_PROMPTS) {
		if ((await sql`select prompt_id from prompt_library where lower(prompt_name) = lower(${prompt.promptName}) limit 1`).length) continue;
		await sql`insert into prompt_library (
      prompt_id, prompt_name, prompt_type, prompt_text, category, variables, builtin, created_by
    ) values (
      ${nid("prm")}, ${prompt.promptName}, ${prompt.promptType}, ${prompt.promptText}, ${prompt.category},
      ${JSON.stringify(prompt.variables)}, true, ${userId}
    )`;
	}
}
async function contextFor(userId) {
	const sql = await getSql();
	const identity = await sql`select "name" as name, "email" as email from "user" where "id" = ${userId} limit 1`;
	const name = identity[0]?.name?.trim() || "";
	const email = identity[0]?.email?.trim() || "";
	await sql`insert into members (user_id, name, email, role, status)
    select ${userId}, ${name}, ${email},
      case when exists(select 1 from members where role = 'ADMIN') then 'VIEWER' else 'ADMIN' end,
      'ACTIVE'
    where not exists (select 1 from members where user_id = ${userId})`;
	if (name || email) await sql`update members set
      name = case when ${name} <> '' then ${name} else name end,
      email = case when ${email} <> '' then ${email} else email end
      where user_id = ${userId}`;
	const rows = await sql`select * from members where user_id = ${userId} limit 1`;
	const member = rows[0] ? mapMember(rows[0]) : null;
	if (!member || member.status !== "ACTIVE") throw new Error("המשתמש אינו פעיל.");
	if (member.role === "ADMIN") await seedCatalog(sql, userId);
	await seedPrompts(sql, userId);
	return {
		sql,
		member
	};
}
function assertWrite(role) {
	if (role === "VIEWER") throw new Error("לצופים אין הרשאת עריכה.");
}
function assertAdmin(role) {
	if (role !== "ADMIN") throw new Error("הפעולה שמורה למנהל.");
}
async function dashboard(userId) {
	const { sql, member } = await contextFor(userId);
	const [products, projects, videos, campaigns, sources, pending, recent, logs] = await Promise.all([
		sql`select count(*)::int as c from products`,
		sql`select count(*)::int as c from projects`,
		sql`select count(*)::int as c from video_projects`,
		sql`select count(*)::int as c from campaigns where status in ('IN_PROGRESS', 'APPROVED')`,
		sql`select count(*)::int as c from knowledge_sources where verification_status = 'VERIFIED'`,
		sql`select count(*)::int as c from projects where status = 'PENDING_REVIEW'`,
		sql`select * from projects order by updated_at desc limit 6`,
		sql`select * from system_logs order by timestamp desc limit 8`
	]);
	const slides = await sql`select count(*)::int as c from slides`;
	return {
		member,
		counts: {
			products: Number(products[0]?.c ?? 0),
			projects: Number(projects[0]?.c ?? 0),
			slides: Number(slides[0]?.c ?? 0),
			videos: Number(videos[0]?.c ?? 0),
			activeCampaigns: Number(campaigns[0]?.c ?? 0),
			verifiedSources: Number(sources[0]?.c ?? 0),
			pendingReview: Number(pending[0]?.c ?? 0)
		},
		recentProjects: recent.map(mapProject),
		recentLogs: member.role === "VIEWER" ? [] : logs.map(mapLog)
	};
}
async function listProducts(userId) {
	const { sql } = await contextFor(userId);
	return (await sql`select * from products order by name_he asc`).map(mapProduct);
}
async function createProduct(userId, input) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	rateLimit(userId, "write");
	if ((await sql`select product_id from products where lower(name_he) = lower(${input.nameHe}) limit 1`).length) throw new Error("כבר קיים מוצר עם אותו שם.");
	if (input.sku) {
		if ((await sql`select product_id from products where lower(sku) = lower(${input.sku}) limit 1`).length) throw new Error("מק״ט כבר קיים.");
	}
	const id = nid("prd");
	await sql`insert into products (
    product_id, sku, name_he, name_en, manufacturer, category, package_size, description,
    marketing_benefits, technical_data, technical_status, manufacturer_url, technical_sheet_url,
    product_image_url, price_text, price_approved, promo_text, complementary_ids, created_by
  ) values (
    ${id}, ${input.sku}, ${input.nameHe}, ${input.nameEn}, ${input.manufacturer}, ${input.category},
    ${input.packageSize}, ${input.description}, ${input.marketingBenefits}, ${input.technicalData},
    ${input.technicalStatus}, ${input.manufacturerUrl}, ${input.technicalSheetUrl}, ${input.productImageUrl},
    ${input.priceText}, ${input.priceApproved}, ${input.promoText}, ${JSON.stringify(input.complementaryIds)}, ${userId}
  )`;
	await log(sql, userId, "createProduct", "product", id, "ok");
	return mapProduct((await sql`select * from products where product_id = ${id}`)[0]);
}
async function updateProduct(userId, id, input) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	rateLimit(userId, "write");
	if (!(await sql`select product_id from products where product_id = ${id}`).length) throw new Error("המוצר לא נמצא.");
	if ((await sql`select product_id from products where lower(name_he) = lower(${input.nameHe}) and product_id <> ${id} limit 1`).length) throw new Error("כבר קיים מוצר עם אותו שם.");
	await sql`update products set
    sku = ${input.sku},
    name_he = ${input.nameHe},
    name_en = ${input.nameEn},
    manufacturer = ${input.manufacturer},
    category = ${input.category},
    package_size = ${input.packageSize},
    description = ${input.description},
    marketing_benefits = ${input.marketingBenefits},
    technical_data = ${input.technicalData},
    technical_status = ${input.technicalStatus},
    manufacturer_url = ${input.manufacturerUrl},
    technical_sheet_url = ${input.technicalSheetUrl},
    product_image_url = ${input.productImageUrl},
    price_text = ${input.priceText},
    price_approved = ${input.priceApproved},
    promo_text = ${input.promoText},
    complementary_ids = ${JSON.stringify(input.complementaryIds)},
    updated_at = now()
    where product_id = ${id}`;
	await log(sql, userId, "updateProduct", "product", id, "ok");
	return mapProduct((await sql`select * from products where product_id = ${id}`)[0]);
}
async function deleteProduct(userId, id) {
	const { sql, member } = await contextFor(userId);
	assertAdmin(member.role);
	rateLimit(userId, "write");
	await sql`delete from products where product_id = ${id}`;
	await log(sql, userId, "deleteProduct", "product", id, "ok");
	return { ok: true };
}
async function importProducts(userId, rowsIn) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	rateLimit(userId, "import", 8);
	let created = 0;
	const skipped = [];
	for (const input of rowsIn.slice(0, 200)) {
		if ((await sql`select product_id from products where lower(name_he) = lower(${input.nameHe}) limit 1`).length || input.sku && (await sql`select product_id from products where lower(sku) = lower(${input.sku}) limit 1`).length) {
			skipped.push(`${input.nameHe}: כפילות`);
			continue;
		}
		await sql`insert into products (
      product_id, sku, name_he, name_en, manufacturer, category, package_size, description,
      marketing_benefits, technical_data, technical_status, manufacturer_url, technical_sheet_url,
      product_image_url, price_text, price_approved, promo_text, complementary_ids, created_by
    ) values (
      ${nid("prd")}, ${input.sku}, ${input.nameHe}, ${input.nameEn}, ${input.manufacturer}, ${input.category},
      ${input.packageSize}, ${input.description}, ${input.marketingBenefits}, ${input.technicalData},
      ${input.technicalStatus}, ${input.manufacturerUrl}, ${input.technicalSheetUrl}, ${input.productImageUrl},
      ${input.priceText}, ${input.priceApproved}, ${input.promoText}, ${JSON.stringify(input.complementaryIds)}, ${userId}
    )`;
		created += 1;
	}
	await log(sql, userId, "importProducts", "product", "", created ? "ok" : "partial", skipped.slice(0, 3).join(" | "));
	return {
		created,
		skipped
	};
}
async function requireProduct(sql, id) {
	const rows = await sql`select * from products where product_id = ${id} limit 1`;
	if (!rows[0]) throw new Error("המוצר לא נמצא.");
	return mapProduct(rows[0]);
}
async function listProjects(userId) {
	const { sql } = await contextFor(userId);
	return (await sql`select * from projects order by updated_at desc`).map(mapProject);
}
async function generatePresentation(userId, brief) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	rateLimit(userId, "generate", 20);
	const product = await requireProduct(sql, brief.productId);
	const projectId = nid("prj");
	await sql`insert into projects (
    project_id, project_name, project_type, product_ids, target_audience, visual_style, format, goal, status, created_by
  ) values (
    ${projectId}, ${brief.projectName}, 'presentation', ${JSON.stringify([brief.productId])},
    ${brief.targetAudience}, ${brief.visualStyle}, ${brief.format}, ${brief.goal}, 'DRAFT', ${userId}
  )`;
	const drafts = buildSlides({
		product,
		audience: brief.targetAudience,
		goal: brief.goal,
		slideCount: brief.slideCount,
		visualStyle: brief.visualStyle
	});
	for (const draft of drafts) await sql`insert into slides (
      slide_id, project_id, slide_number, title, subtitle, body, technical_content, image_url, layout, duration, benefit, cta, warning
    ) values (
      ${nid("sld")}, ${projectId}, ${draft.slideNumber}, ${draft.title}, ${draft.subtitle}, ${draft.body},
      ${draft.technicalContent}, ${draft.imageUrl}, ${draft.layout}, ${draft.duration}, ${draft.benefit}, ${draft.cta}, ${draft.warning}
    )`;
	await log(sql, userId, "createProject", "project", projectId, "ok");
	return getPresentation(userId, projectId);
}
async function getPresentation(userId, projectId) {
	const { sql } = await contextFor(userId);
	const rows = await sql`select * from projects where project_id = ${projectId} limit 1`;
	if (!rows[0]) throw new Error("הפרויקט לא נמצא.");
	const slides = await sql`select * from slides where project_id = ${projectId} order by slide_number asc`;
	return {
		project: mapProject(rows[0]),
		slides: slides.map(mapSlide)
	};
}
async function saveSlide(userId, input) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	rateLimit(userId, "write");
	await sql`update slides set
    title = ${input.title},
    subtitle = ${input.subtitle},
    body = ${input.body},
    technical_content = ${input.technicalContent},
    image_url = ${input.imageUrl},
    duration = ${input.duration},
    benefit = ${input.benefit},
    cta = ${input.cta},
    warning = ${input.warning}
    where slide_id = ${input.slideId}`;
	const rows = await sql`select * from slides where slide_id = ${input.slideId}`;
	if (!rows[0]) throw new Error("השקף לא נמצא.");
	await sql`update projects set updated_at = now(), status = case when status = 'APPROVED' then 'IN_PROGRESS' else status end where project_id = ${str(rows[0], "project_id")}`;
	return mapSlide(rows[0]);
}
async function moveSlide(userId, slideId, direction) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	const rows = await sql`select * from slides where slide_id = ${slideId}`;
	if (!rows[0]) throw new Error("השקף לא נמצא.");
	const projectId = str(rows[0], "project_id");
	const all = (await sql`select * from slides where project_id = ${projectId} order by slide_number asc`).map(mapSlide);
	const index = all.findIndex((slide) => slide.slideId === slideId);
	const swapWith = direction === "up" ? index - 1 : index + 1;
	if (index < 0 || swapWith < 0 || swapWith >= all.length) return all;
	const current = all[index];
	const other = all[swapWith];
	await sql`update slides set slide_number = ${other.slideNumber} where slide_id = ${current.slideId}`;
	await sql`update slides set slide_number = ${current.slideNumber} where slide_id = ${other.slideId}`;
	return (await sql`select * from slides where project_id = ${projectId} order by slide_number asc`).map(mapSlide);
}
async function duplicateSlide(userId, slideId) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	const rows = await sql`select * from slides where slide_id = ${slideId}`;
	if (!rows[0]) throw new Error("השקף לא נמצא.");
	const slide = mapSlide(rows[0]);
	await sql`update slides set slide_number = slide_number + 1 where project_id = ${slide.projectId} and slide_number > ${slide.slideNumber}`;
	await sql`insert into slides (
    slide_id, project_id, slide_number, title, subtitle, body, technical_content, image_url, layout, duration, benefit, cta, warning
  ) values (
    ${nid("sld")}, ${slide.projectId}, ${slide.slideNumber + 1}, ${slide.title}, ${slide.subtitle}, ${slide.body},
    ${slide.technicalContent}, ${slide.imageUrl}, ${slide.layout}, ${slide.duration}, ${slide.benefit}, ${slide.cta}, ${slide.warning}
  )`;
	return (await sql`select * from slides where project_id = ${slide.projectId} order by slide_number asc`).map(mapSlide);
}
async function deleteSlide(userId, slideId) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	const rows = await sql`select * from slides where slide_id = ${slideId}`;
	if (!rows[0]) throw new Error("השקף לא נמצא.");
	const projectId = str(rows[0], "project_id");
	const count = await sql`select count(*)::int as c from slides where project_id = ${projectId}`;
	if (Number(count[0]?.c ?? 0) <= 1) throw new Error("חייבת להישאר לפחות שקופית אחת.");
	await sql`delete from slides where slide_id = ${slideId}`;
	const next = (await sql`select * from slides where project_id = ${projectId} order by slide_number asc`).map(mapSlide);
	for (let index = 0; index < next.length; index += 1) {
		const slide = next[index];
		if (slide.slideNumber !== index + 1) {
			await sql`update slides set slide_number = ${index + 1} where slide_id = ${slide.slideId}`;
			slide.slideNumber = index + 1;
		}
	}
	return next;
}
async function setProjectStatus(userId, projectId, status) {
	const { sql, member } = await contextFor(userId);
	if (status === "APPROVED" || status === "ARCHIVED") assertWrite(member.role);
	else assertWrite(member.role);
	await sql`update projects set status = ${status}, updated_at = now() where project_id = ${projectId}`;
	await log(sql, userId, "updateProject", "project", projectId, status);
	const rows = await sql`select * from projects where project_id = ${projectId}`;
	if (!rows[0]) throw new Error("הפרויקט לא נמצא.");
	return mapProject(rows[0]);
}
async function deleteProject(userId, projectId) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	await sql`delete from slides where project_id = ${projectId}`;
	await sql`delete from projects where project_id = ${projectId}`;
	await log(sql, userId, "deleteProject", "project", projectId, "ok");
	return { ok: true };
}
async function listVideos(userId) {
	const { sql } = await contextFor(userId);
	return (await sql`select * from video_projects order by updated_at desc`).map(mapVideo);
}
async function generateVideo(userId, brief) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	rateLimit(userId, "generate", 20);
	const product = await requireProduct(sql, brief.productId);
	const built = buildVideo({
		product,
		audience: brief.targetAudience,
		goal: brief.goal,
		duration: brief.duration,
		aspectRatio: brief.aspectRatio
	});
	const projectId = nid("prj");
	const videoId = nid("vid");
	await sql`insert into projects (
    project_id, project_name, project_type, product_ids, target_audience, format, goal, status, created_by
  ) values (
    ${projectId}, ${brief.title}, 'video', ${JSON.stringify([brief.productId])}, ${brief.targetAudience},
    ${brief.aspectRatio}, ${brief.goal}, 'DRAFT', ${userId}
  )`;
	await sql`insert into video_projects (
    video_id, project_id, title, duration, aspect_ratio, script, storyboard, video_prompt, provider, status, created_by
  ) values (
    ${videoId}, ${projectId}, ${brief.title}, ${brief.duration}, ${brief.aspectRatio}, ${built.script},
    ${JSON.stringify(built.scenes)}, ${built.videoPrompt}, 'prompt-only', 'SCRIPT', ${userId}
  )`;
	await log(sql, userId, "createVideoScript", "video", videoId, "ok");
	return getVideo(userId, videoId);
}
async function getVideo(userId, videoId) {
	const { sql } = await contextFor(userId);
	const rows = await sql`select * from video_projects where video_id = ${videoId} limit 1`;
	if (!rows[0]) throw new Error("סרטון לא נמצא.");
	return mapVideo(rows[0]);
}
async function saveVideo(userId, videoId, patch) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	rateLimit(userId, "write");
	const current = await getVideo(userId, videoId);
	const versions = [{
		savedAt: (/* @__PURE__ */ new Date()).toISOString(),
		script: current.script,
		storyboard: current.storyboard,
		videoPrompt: current.videoPrompt
	}, ...current.versions].slice(0, 12);
	await sql`update video_projects set
    title = ${patch.title},
    script = ${patch.script},
    storyboard = ${JSON.stringify(patch.storyboard)},
    video_prompt = ${patch.videoPrompt},
    versions = ${JSON.stringify(versions)},
    status = 'SCRIPT',
    updated_at = now()
    where video_id = ${videoId}`;
	await log(sql, userId, "saveVideo", "video", videoId, "ok");
	return getVideo(userId, videoId);
}
async function listPrompts(userId) {
	const { sql } = await contextFor(userId);
	return (await sql`select * from prompt_library order by builtin desc, prompt_name asc`).map(mapPrompt);
}
async function savePrompt(userId, input) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	rateLimit(userId, "write");
	if ((await sql`select prompt_id from prompt_library where lower(prompt_name) = lower(${input.promptName}) limit 1`).length) throw new Error("כבר קיימת פקודה בשם זה.");
	const id = nid("prm");
	await sql`insert into prompt_library (prompt_id, prompt_name, prompt_type, prompt_text, category, variables, builtin, created_by)
    values (${id}, ${input.promptName}, ${input.promptType}, ${input.promptText}, ${input.category}, ${JSON.stringify(input.variables)}, false, ${userId})`;
	await log(sql, userId, "savePrompt", "prompt", id, "ok");
	return mapPrompt((await sql`select * from prompt_library where prompt_id = ${id}`)[0]);
}
async function deletePrompt(userId, id) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	const rows = await sql`select * from prompt_library where prompt_id = ${id}`;
	if (!rows[0]) throw new Error("הפקודה לא נמצאה.");
	if (bool(rows[0], "builtin")) throw new Error("אי אפשר למחוק פקודת מערכת.");
	await sql`delete from prompt_library where prompt_id = ${id}`;
	return { ok: true };
}
async function listMedia(userId) {
	const { sql } = await contextFor(userId);
	return (await sql`select * from media_library order by created_at desc`).map(mapMedia);
}
async function saveMedia(userId, input) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	rateLimit(userId, "write");
	if (!input.sourceUrl && !input.storageUrl) throw new Error("יש לשמור כתובת. קבצים גדולים לא נשמרים בתוך הגיליון.");
	const id = nid("med");
	await sql`insert into media_library (
    media_id, file_name, media_type, product_id, source_type, source_url, storage_url, license_status, notes, created_by
  ) values (
    ${id}, ${input.fileName}, ${input.mediaType}, ${input.productId}, ${input.sourceType}, ${input.sourceUrl},
    ${input.storageUrl}, ${input.licenseStatus}, ${input.notes}, ${userId}
  )`;
	await log(sql, userId, "saveMedia", "media", id, "ok");
	return mapMedia((await sql`select * from media_library where media_id = ${id}`)[0]);
}
async function deleteMedia(userId, id) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	await sql`delete from media_library where media_id = ${id}`;
	await log(sql, userId, "deleteMedia", "media", id, "ok");
	return { ok: true };
}
async function listKnowledge(userId) {
	const { sql } = await contextFor(userId);
	return (await sql`select * from knowledge_sources order by updated_at desc`).map(mapKnowledge);
}
async function saveKnowledge(userId, input) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	rateLimit(userId, "write");
	if (input.verificationStatus === "VERIFIED" && !input.excerpt.trim() && !input.sourceUrl && !input.documentUrl) throw new Error("אי אפשר לסמן מאומת בלי קישור או ציטוט מהמסמך.");
	const id = nid("src");
	const verified = input.verificationStatus === "VERIFIED" ? input.lastVerified || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : input.lastVerified;
	await sql`insert into knowledge_sources (
    source_id, title, source_type, source_url, product_id, document_url, verification_status, last_verified, notes, excerpt, created_by
  ) values (
    ${id}, ${input.title}, ${input.sourceType}, ${input.sourceUrl}, ${input.productId}, ${input.documentUrl},
    ${input.verificationStatus}, ${verified}, ${input.notes}, ${input.excerpt}, ${userId}
  )`;
	await log(sql, userId, "saveKnowledgeSource", "knowledge", id, "ok");
	return mapKnowledge((await sql`select * from knowledge_sources where source_id = ${id}`)[0]);
}
async function updateKnowledgeStatus(userId, id, status) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	const rows = await sql`select * from knowledge_sources where source_id = ${id}`;
	if (!rows[0]) throw new Error("המקור לא נמצא.");
	if (status === "VERIFIED" && !str(rows[0], "excerpt") && !str(rows[0], "source_url") && !str(rows[0], "document_url")) throw new Error("אי אפשר לאמת מקור בלי קישור או ציטוט.");
	await sql`update knowledge_sources set verification_status = ${status}, last_verified = ${status === "VERIFIED" ? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : str(rows[0], "last_verified")}, updated_at = now() where source_id = ${id}`;
	return mapKnowledge((await sql`select * from knowledge_sources where source_id = ${id}`)[0]);
}
async function listCampaigns(userId) {
	const { sql } = await contextFor(userId);
	return (await sql`select * from campaigns order by updated_at desc`).map(mapCampaign);
}
async function saveCampaign(userId, input) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	rateLimit(userId, "write");
	const id = nid("cmp");
	await sql`insert into campaigns (
    campaign_id, campaign_name, target_audience, product_ids, campaign_goal, content_ids, status, created_by
  ) values (
    ${id}, ${input.campaignName}, ${input.targetAudience}, ${JSON.stringify(input.productIds)}, ${input.campaignGoal},
    ${JSON.stringify(input.contentIds)}, ${input.status || "DRAFT"}, ${userId}
  )`;
	await log(sql, userId, "saveCampaign", "campaign", id, "ok");
	return mapCampaign((await sql`select * from campaigns where campaign_id = ${id}`)[0]);
}
async function setCampaignStatus(userId, id, status) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	await sql`update campaigns set status = ${status}, updated_at = now() where campaign_id = ${id}`;
	const rows = await sql`select * from campaigns where campaign_id = ${id}`;
	if (!rows[0]) throw new Error("הקמפיין לא נמצא.");
	return mapCampaign(rows[0]);
}
async function listScreens(userId) {
	const { sql } = await contextFor(userId);
	return (await sql`select * from signage_screens order by updated_at desc`).map(mapScreen);
}
async function saveScreen(userId, input) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	rateLimit(userId, "write");
	const id = nid("scr");
	await sql`insert into signage_screens (screen_id, name, screen_type, product_ids, interval_sec, transition, status, created_by)
    values (${id}, ${input.name}, ${input.screenType}, ${JSON.stringify(input.productIds)}, ${input.intervalSec}, ${input.transition}, 'READY', ${userId})`;
	await log(sql, userId, "saveSignage", "signage", id, "ok");
	return mapScreen((await sql`select * from signage_screens where screen_id = ${id}`)[0]);
}
async function getScreen(userId, id) {
	const { sql } = await contextFor(userId);
	const rows = await sql`select * from signage_screens where screen_id = ${id} limit 1`;
	if (!rows[0]) throw new Error("מסך לא נמצא.");
	const screen = mapScreen(rows[0]);
	const products = await listProducts(userId);
	return {
		screen,
		products: screen.productIds.map((productId) => products.find((product) => product.productId === productId)).filter((product) => Boolean(product))
	};
}
async function deleteScreen(userId, id) {
	const { sql, member } = await contextFor(userId);
	assertWrite(member.role);
	await sql`delete from signage_screens where screen_id = ${id}`;
	return { ok: true };
}
async function listMembers(userId) {
	const { sql } = await contextFor(userId);
	return (await sql`select * from members order by created_at asc`).map(mapMember);
}
async function setMemberRole(userId, targetId, role) {
	const { sql, member } = await contextFor(userId);
	assertAdmin(member.role);
	if (targetId === userId && role !== "ADMIN") {
		const admins = await sql`select count(*)::int as c from members where role = 'ADMIN' and status = 'ACTIVE'`;
		if (Number(admins[0]?.c ?? 0) <= 1) throw new Error("חייב להישאר מנהל פעיל אחד.");
	}
	await sql`update members set role = ${role} where user_id = ${targetId}`;
	await log(sql, userId, "setRole", "user", targetId, role);
	const rows = await sql`select * from members where user_id = ${targetId}`;
	if (!rows[0]) throw new Error("המשתמש לא נמצא. הוא יופיע אחרי כניסה ראשונה.");
	return mapMember(rows[0]);
}
async function listLogs(userId) {
	const { sql, member } = await contextFor(userId);
	if (member.role === "VIEWER") return [];
	return (await sql`select * from system_logs order by timestamp desc limit 80`).map(mapLog);
}
async function buildPptx(userId, projectId) {
	const { project, slides } = await getPresentation(userId, projectId);
	const { default: PptxGenJS } = await import("../_libs/pptxgenjs.mjs").then((n) => n.t);
	const pptx = new PptxGenJS();
	pptx.defineLayout({
		name: "WIDE",
		width: 13.333,
		height: 7.5
	});
	pptx.layout = "WIDE";
	pptx.author = "SABAN CREATIVE STUDIO";
	pptx.title = project.projectName;
	pptx.rtlMode = true;
	for (const slide of slides) {
		const page = pptx.addSlide();
		page.background = { color: "F3F6FA" };
		page.addShape(pptx.ShapeType.rect, {
			x: 0,
			y: 0,
			w: .18,
			h: 7.5,
			fill: { color: "0B3A6A" }
		});
		page.addText(slide.title || project.projectName, {
			x: .6,
			y: .4,
			w: 12,
			h: .8,
			fontFace: "Arial",
			fontSize: 28,
			color: "0B3A6A",
			align: "right",
			bold: true
		});
		if (slide.subtitle) page.addText(slide.subtitle, {
			x: .6,
			y: 1.3,
			w: 12,
			h: .4,
			fontFace: "Arial",
			fontSize: 16,
			color: "1288A8",
			align: "right"
		});
		page.addText(slide.body || "", {
			x: .6,
			y: 1.9,
			w: 12,
			h: 3.2,
			fontFace: "Arial",
			fontSize: 18,
			color: "10233A",
			align: "right"
		});
		if (slide.warning) page.addText(slide.warning, {
			x: .6,
			y: 6.4,
			w: 12,
			h: .6,
			fontFace: "Arial",
			fontSize: 12,
			color: "8A5A12",
			align: "right"
		});
	}
	const base64 = await pptx.write({ outputType: "base64" });
	const { sql } = await contextFor(userId);
	await log(sql, userId, "exportPptx", "project", projectId, "ok");
	return {
		filename: `${project.projectName}.pptx`,
		base64
	};
}
//#endregion
export { buildPptx, contextFor, createProduct, dashboard, deleteMedia, deleteProduct, deleteProject, deletePrompt, deleteScreen, deleteSlide, duplicateSlide, generatePresentation, generateVideo, getPresentation, getScreen, getVideo, importProducts, listCampaigns, listKnowledge, listLogs, listMedia, listMembers, listProducts, listProjects, listPrompts, listScreens, listVideos, moveSlide, rateLimit, saveCampaign, saveKnowledge, saveMedia, savePrompt, saveScreen, saveSlide, saveVideo, setCampaignStatus, setMemberRole, setProjectStatus, updateKnowledgeStatus, updateProduct };
