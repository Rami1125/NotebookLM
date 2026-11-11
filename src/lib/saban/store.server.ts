import { randomBytes } from "node:crypto";
import { getSql, type Sql } from "@/lib/db";
import { BUILTIN_PROMPTS, buildSlides, buildVideo } from "./compose";
import { SEED_PRODUCTS } from "./seed-data";
import type {
  Campaign,
  KnowledgeSource,
  MediaItem,
  Member,
  Product,
  Project,
  PromptItem,
  Role,
  SignageScreen,
  Slide,
  SystemLog,
  VideoProject,
  VideoScene,
  VideoVersion,
} from "./types";
import type {
  ProductInput,
  ProjectBrief,
  VideoBrief,
} from "./schemas";

type Row = Record<string, unknown>;

const hits = new Map<string, number[]>();

export function nid(prefix: string): string {
  return `${prefix}_${randomBytes(6).toString("hex")}`;
}

export function rateLimit(userId: string, bucket: string, limit = 40): void {
  const key = `${userId}:${bucket}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((stamp) => now - stamp < 60_000);
  if (recent.length >= limit) {
    throw new Error("יותר מדי בקשות. נסו שוב בעוד דקה.");
  }
  recent.push(now);
  hits.set(key, recent);
}

function str(row: Row, key: string): string {
  const value = row[key];
  if (value == null) return "";
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function num(row: Row, key: string): number {
  const value = Number(row[key]);
  return Number.isFinite(value) ? value : 0;
}

function bool(row: Row, key: string): boolean {
  const value = row[key];
  return value === true || value === "t" || value === "true" || value === 1;
}

function list(row: Row, key: string): string[] {
  const raw = str(row, key);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.map((item) => String(item)) : [];
  } catch {
    return [];
  }
}

function asRole(value: string): Role {
  if (value === "ADMIN" || value === "EDITOR" || value === "VIEWER") return value;
  return "VIEWER";
}

function mapProduct(row: Row): Product {
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
    technicalStatus: (str(row, "technical_status") || "NEEDS_VERIFICATION") as Product["technicalStatus"],
    manufacturerUrl: str(row, "manufacturer_url"),
    technicalSheetUrl: str(row, "technical_sheet_url"),
    productImageUrl: str(row, "product_image_url"),
    priceText: str(row, "price_text"),
    priceApproved: bool(row, "price_approved"),
    promoText: str(row, "promo_text"),
    complementaryIds: list(row, "complementary_ids"),
    createdAt: str(row, "created_at"),
    updatedAt: str(row, "updated_at"),
  };
}

function mapProject(row: Row): Project {
  return {
    projectId: str(row, "project_id"),
    projectName: str(row, "project_name"),
    projectType: str(row, "project_type"),
    productIds: list(row, "product_ids"),
    targetAudience: str(row, "target_audience"),
    visualStyle: str(row, "visual_style"),
    format: str(row, "format"),
    goal: str(row, "goal"),
    status: (str(row, "status") || "DRAFT") as Project["status"],
    previewUrl: str(row, "preview_url"),
    exportUrl: str(row, "export_url"),
    createdAt: str(row, "created_at"),
    updatedAt: str(row, "updated_at"),
  };
}

function mapSlide(row: Row): Slide {
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
    createdAt: str(row, "created_at"),
  };
}

function mapVideo(row: Row): VideoProject {
  let storyboard: VideoScene[] = [];
  let versions: VideoVersion[] = [];
  try {
    storyboard = JSON.parse(str(row, "storyboard") || "[]") as VideoScene[];
  } catch {
    storyboard = [];
  }
  try {
    versions = JSON.parse(str(row, "versions") || "[]") as VideoVersion[];
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
    updatedAt: str(row, "updated_at"),
  };
}

function mapMedia(row: Row): MediaItem {
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
    createdAt: str(row, "created_at"),
  };
}

function mapPrompt(row: Row): PromptItem {
  return {
    promptId: str(row, "prompt_id"),
    promptName: str(row, "prompt_name"),
    promptType: str(row, "prompt_type"),
    promptText: str(row, "prompt_text"),
    category: str(row, "category"),
    variables: list(row, "variables"),
    builtin: bool(row, "builtin"),
    createdAt: str(row, "created_at"),
    updatedAt: str(row, "updated_at"),
  };
}

function mapKnowledge(row: Row): KnowledgeSource {
  return {
    sourceId: str(row, "source_id"),
    title: str(row, "title"),
    sourceType: str(row, "source_type"),
    sourceUrl: str(row, "source_url"),
    productId: str(row, "product_id"),
    documentUrl: str(row, "document_url"),
    verificationStatus: (str(row, "verification_status") || "NEEDS_VERIFICATION") as KnowledgeSource["verificationStatus"],
    lastVerified: str(row, "last_verified"),
    notes: str(row, "notes"),
    excerpt: str(row, "excerpt"),
    createdAt: str(row, "created_at"),
    updatedAt: str(row, "updated_at"),
  };
}

function mapCampaign(row: Row): Campaign {
  return {
    campaignId: str(row, "campaign_id"),
    campaignName: str(row, "campaign_name"),
    targetAudience: str(row, "target_audience"),
    productIds: list(row, "product_ids"),
    campaignGoal: str(row, "campaign_goal"),
    contentIds: list(row, "content_ids"),
    status: (str(row, "status") || "DRAFT") as Campaign["status"],
    createdAt: str(row, "created_at"),
    updatedAt: str(row, "updated_at"),
  };
}

function mapScreen(row: Row): SignageScreen {
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
    updatedAt: str(row, "updated_at"),
  };
}

function mapMember(row: Row): Member {
  return {
    userId: str(row, "user_id"),
    name: str(row, "name"),
    email: str(row, "email"),
    role: asRole(str(row, "role")),
    status: str(row, "status"),
    createdAt: str(row, "created_at"),
  };
}

function mapLog(row: Row): SystemLog {
  return {
    logId: str(row, "log_id"),
    action: str(row, "action"),
    userId: str(row, "user_id"),
    entityType: str(row, "entity_type"),
    entityId: str(row, "entity_id"),
    timestamp: str(row, "timestamp"),
    result: str(row, "result"),
    errorMessage: str(row, "error_message"),
  };
}

async function log(
  sql: Sql,
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  result: string,
  errorMessage = "",
): Promise<void> {
  await sql`insert into system_logs (log_id, action, user_id, entity_type, entity_id, result, error_message)
    values (${nid("log")}, ${action}, ${userId}, ${entityType}, ${entityId}, ${result}, ${errorMessage})`;
}

async function seedCatalog(sql: Sql, userId: string): Promise<void> {
  const existing = await sql<{ c: number }>`select count(*)::int as c from products`;
  if (Number(existing[0]?.c ?? 0) > 0) return;
  for (const item of SEED_PRODUCTS) {
    await sql`insert into products (
      product_id, sku, name_he, name_en, manufacturer, category, description, marketing_benefits,
      technical_status, manufacturer_url, created_by
    ) values (
      ${nid("prd")}, ${item.sku}, ${item.nameHe}, ${item.nameEn}, ${item.manufacturer}, ${item.category},
      ${item.description}, ${item.marketingBenefits}, ${item.technicalStatus}, ${item.manufacturerUrl}, ${userId}
    )`;
  }
  await log(sql, userId, "seedProducts", "product", "", "ok");
}

async function seedPrompts(sql: Sql, userId: string): Promise<void> {
  for (const prompt of BUILTIN_PROMPTS) {
    const found = await sql<{ prompt_id: string }>`select prompt_id from prompt_library where lower(prompt_name) = lower(${prompt.promptName}) limit 1`;
    if (found.length) continue;
    await sql`insert into prompt_library (
      prompt_id, prompt_name, prompt_type, prompt_text, category, variables, builtin, created_by
    ) values (
      ${nid("prm")}, ${prompt.promptName}, ${prompt.promptType}, ${prompt.promptText}, ${prompt.category},
      ${JSON.stringify(prompt.variables)}, true, ${userId}
    )`;
  }
}

export async function contextFor(userId: string) {
  const sql = await getSql();
  const identity = await sql<{ name: string; email: string }>`select "name" as name, "email" as email from "user" where "id" = ${userId} limit 1`;
  const name = identity[0]?.name?.trim() || "";
  const email = identity[0]?.email?.trim() || "";
  const { isPrimaryAdminEmail } = await import("./admin-emails");
  const forceAdmin = isPrimaryAdminEmail(email);
  await sql`insert into members (user_id, name, email, roleole, status)
    select ${userId}, ${name}, ${email},
      case
        when ${forceAdmin} then 'ADMIN'
        when exists(select 1 from members where role = 'ADMIN') then 'VIEWER'
        else 'ADMIN'
      end,
      'ACTIVE'
    where not exists (select 1 from members where user_id = ${userId})`;
  if (name || email) {
    await sql`update members set
      name = case when ${name} <> '' then ${name} else name end,
      email = case when ${email} <> '' then ${email} else email end,
      role = case when ${forceAdmin} then 'ADMIN' else role end
      where user_id = ${userId}`;
  }
  const rows = await sql<Row>`select * from members where user_id = ${userId} limit 1`;
  const member = rows[0] ? mapMember(rows[0]) : null;
  if (!member || member.status !== "ACTIVE") {
    throw new Error("המשתמש אינו פעיל.");
  }
  if (member.role === "ADMIN") {
    await seedCatalog(sql, userId);
  }
  await seedPrompts(sql, userId);
  return { sql, member };
}

function assertWrite(role: Role): void {
  if (role === "VIEWER") throw new Error("לצופים אין הרשאת עריכה.");
}

function assertAdmin(role: Role): void {
  if (role !== "ADMIN") throw new Error("הפעולה שמורה למנהל.");
}

// NOTE: Rest of module recovered from previous commit via artifacts backup.
// Full function bodies for products/projects/etc. follow in companion push if truncated.
export async function dashboard(userId: string) {
  const { sql, member } = await contextFor(userId);
  const [products, projects, videos, campaigns, sources, pending, recent, logs] = await Promise.all([
    sql<{ c: number }>`select count(*)::int as c from products`,
    sql<{ c: number }>`select count(*)::int as c from projects`,
    sql<{ c: number }>`select count(*)::int as c from video_projects`,
    sql<{ c: number }>`select count(*)::int as c from campaigns where status in ('IN_PROGRESS', 'APPROVED')`,
    sql<{ c: number }>`select count(*)::int as c from knowledge_sources where verification_status = 'VERIFIED'`,
    sql<{ c: number }>`select count(*)::int as c from projects where status = 'PENDING_REVIEW'`,
    sql<Row>`select * from projects order by updated_at desc limit 6`,
    sql<Row>`select * from system_logs order by timestamp desc limit 8`,
  ]);
  const slides = await sql<{ c: number }>`select count(*)::int as c from slides`;
  return {
    member,
    counts: {
      products: Number(products[0]?.c ?? 0),
      projects: Number(projects[0]?.c ?? 0),
      slides: Number(slides[0]?.c ?? 0),
      videos: Number(videos[0]?.c ?? 0),
      activeCampaigns: Number(campaigns[0]?.c ?? 0),
      verifiedSources: Number(sources[0]?.c ?? 0),
      pendingReview: Number(pending[0]?.c ?? 0),
    },
    recentProjects: recent.map(mapProject),
    recentLogs: member.role === "VIEWER" ? [] : logs.map(mapLog),
  };
}

export async function listProducts(userId: string): Promise<Product[]> {
  const { sql } = await contextFor(userId);
  const rows = await sql<Row>`select * from products order by name_he asc`;
  return rows.map(mapProduct);
}

export async function createProduct(userId: string, input: ProductInput): Promise<Product> {
  const { sql, member } = await contextFor(userId);
  assertWrite(member.role);
  rateLimit(userId, "write");
  const dup = await sql`select product_id from products where lower(name_he) = lower(${input.nameHe}) limit 1`;
  if (dup.length) throw new Error("כבר קיים מוצר עם אותו שם.");
  if (input.sku) {
    const sku = await sql`select product_id from products where lower(sku) = lower(${input.sku}) limit 1`;
    if (sku.length) throw new Error("מק\"ט כבר קיים.");
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
  const rows = await sql<Row>`select * from products where product_id = ${id}`;
  return mapProduct(rows[0]!);
}

export async function updateProduct(userId: string, id: string, input: ProductInput): Promise<Product> {
  const { sql, member } = await contextFor(userId);
  assertWrite(member.role);
  rateLimit(userId, "write");
  const current = await sql`select product_id from products where product_id = ${id}`;
  if (!current.length) throw new Error("המוצר לא נמצא.");
  const dup = await sql`select product_id from products where lower(name_he) = lower(${input.nameHe}) and product_id <> ${id} limit 1`;
  if (dup.length) throw new Error("כבר קיים מוצר עם אותו שם.");
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
  const rows = await sql<Row>`select * from products where product_id = ${id}`;
  return mapProduct(rows[0]!);
}

export async function deleteProduct(userId: string, id: string): Promise<{ ok: true }> {
  const { sql, member } = await contextFor(userId);
  assertAdmin(member.role);
  rateLimit(userId, "write");
  await sql`delete from products where product_id = ${id}`;
  await log(sql, userId, "deleteProduct", "product", id, "ok");
  return { ok: true };
}

export async function importProducts(userId: string, rowsIn: ProductInput[]): Promise<{ created: number; skipped: string[] }> {
  const { sql, member } = await contextFor(userId);
  assertWrite(member.role);
  rateLimit(userId, "import", 8);
  let created = 0;
  const skipped: string[] = [];
  for (const input of rowsIn.slice(0, 200)) {
    const dup = await sql`select product_id from products where lower(name_he) = lower(${input.nameHe}) limit 1`;
    if (dup.length || (input.sku && (await sql`select product_id from products where lower(sku) = lower(${input.sku}) limit 1`).length)) {
      skipped.push(`${input.nameHe}: כפילות`);
      continue;
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
    created += 1;
  }
  await log(sql, userId, "importProducts", "product", "", created ? "ok" : "partial");
  return { created, skipped };
}
