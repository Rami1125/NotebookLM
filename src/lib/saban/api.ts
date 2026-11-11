import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { assessClaim } from "./compose";
import {
  campaignInputSchema,
  idSchema,
  knowledgeInputSchema,
  mediaInputSchema,
  productInputSchema,
  projectBriefSchema,
  promptInputSchema,
  signageInputSchema,
  slideInputSchema,
  technicalStatusSchema,
  videoBriefSchema,
  roleSchema,
} from "./schemas";
import { z } from "zod";

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { dashboard } = await import("./store.server");
    return dashboard(context.userId);
  });

export const getProducts = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { listProducts } = await import("./store.server");
    return listProducts(context.userId);
  });

export const createProductFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => productInputSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { createProduct } = await import("./store.server");
    return createProduct(context.userId, data);
  });

export const updateProductFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => productInputSchema.extend({ productId: z.string().min(4) }).parse(input))
  .handler(async ({ context, data }) => {
    const { updateProduct } = await import("./store.server");
    const { productId, ...rest } = data;
    return updateProduct(context.userId, productId, rest);
  });

export const deleteProductFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => idSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { deleteProduct } = await import("./store.server");
    return deleteProduct(context.userId, data.id);
  });

export const importProductsFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ rows: z.array(productInputSchema).max(200) }).parse(input))
  .handler(async ({ context, data }) => {
    const { importProducts } = await import("./store.server");
    return importProducts(context.userId, data.rows);
  });

export const getProjects = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { listProjects } = await import("./store.server");
    return listProjects(context.userId);
  });

export const generatePresentationFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => projectBriefSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { generatePresentation } = await import("./store.server");
    return generatePresentation(context.userId, data);
  });

export const getPresentationFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => idSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { getPresentation } = await import("./store.server");
    return getPresentation(context.userId, data.id);
  });

export const saveSlideFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => slideInputSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { saveSlide } = await import("./store.server");
    return saveSlide(context.userId, data);
  });

export const slideActionFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z.object({ slideId: z.string().min(4), action: z.enum(["up", "down", "duplicate", "delete"]) }).parse(input),
  )
  .handler(async ({ context, data }) => {
    const store = await import("./store.server");
    if (data.action === "duplicate") return store.duplicateSlide(context.userId, data.slideId);
    if (data.action === "delete") return store.deleteSlide(context.userId, data.slideId);
    return store.moveSlide(context.userId, data.slideId, data.action);
  });

export const setProjectStatusFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z
      .object({
        id: z.string().min(4),
        status: z.enum(["DRAFT", "IN_PROGRESS", "PENDING_REVIEW", "APPROVED", "ARCHIVED"]),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const { setProjectStatus } = await import("./store.server");
    return setProjectStatus(context.userId, data.id, data.status);
  });

export const deleteProjectFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => idSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { deleteProject } = await import("./store.server");
    return deleteProject(context.userId, data.id);
  });

export const exportPptxFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => idSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { buildPptx } = await import("./store.server");
    return buildPptx(context.userId, data.id);
  });

export const getVideos = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { listVideos } = await import("./store.server");
    return listVideos(context.userId);
  });

export const generateVideoFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => videoBriefSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { generateVideo } = await import("./store.server");
    return generateVideo(context.userId, data);
  });

export const getVideoFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => idSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { getVideo } = await import("./store.server");
    return getVideo(context.userId, data.id);
  });

const sceneSchema = z.object({
  sceneNumber: z.number().int(),
  duration: z.number().int().min(1).max(60),
  visualDescription: z.string().max(2000),
  cameraMovement: z.string().max(400),
  lighting: z.string().max(400),
  voiceover: z.string().max(2000),
  onScreenText: z.string().max(400),
  aiVideoPrompt: z.string().max(4000),
});

export const saveVideoFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z
      .object({
        videoId: z.string().min(4),
        title: z.string().trim().min(2).max(180),
        script: z.string().max(20000),
        videoPrompt: z.string().max(20000),
        storyboard: z.array(sceneSchema).max(12),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const { saveVideo } = await import("./store.server");
    return saveVideo(context.userId, data.videoId, data);
  });

export const getPrompts = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { listPrompts } = await import("./store.server");
    return listPrompts(context.userId);
  });

export const savePromptFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => promptInputSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { savePrompt } = await import("./store.server");
    return savePrompt(context.userId, data);
  });

export const deletePromptFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => idSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { deletePrompt } = await import("./store.server");
    return deletePrompt(context.userId, data.id);
  });

export const getMedia = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { listMedia } = await import("./store.server");
    return listMedia(context.userId);
  });

export const saveMediaFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => mediaInputSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { saveMedia } = await import("./store.server");
    return saveMedia(context.userId, data);
  });

export const deleteMediaFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => idSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { deleteMedia } = await import("./store.server");
    return deleteMedia(context.userId, data.id);
  });

export const getKnowledge = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { listKnowledge } = await import("./store.server");
    return listKnowledge(context.userId);
  });

export const saveKnowledgeFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => knowledgeInputSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { saveKnowledge } = await import("./store.server");
    return saveKnowledge(context.userId, data);
  });

export const setKnowledgeStatusFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ id: z.string().min(4), status: technicalStatusSchema }).parse(input))
  .handler(async ({ context, data }) => {
    const { updateKnowledgeStatus } = await import("./store.server");
    return updateKnowledgeStatus(context.userId, data.id, data.status);
  });

export const checkClaimFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ claim: z.string().max(2000), productId: z.string().max(40).optional() }).parse(input))
  .handler(async ({ context, data }) => {
    const { listKnowledge } = await import("./store.server");
    const sources = await listKnowledge(context.userId);
    const relevant = sources.filter((source) => !data.productId || source.productId === data.productId || !source.productId);
    return assessClaim(
      data.claim,
      relevant.map((source) => ({ status: source.verificationStatus, excerpt: `${source.excerpt}\n${source.notes}` })),
    );
  });

export const getCampaigns = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { listCampaigns } = await import("./store.server");
    return listCampaigns(context.userId);
  });

export const saveCampaignFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => campaignInputSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { saveCampaign } = await import("./store.server");
    return saveCampaign(context.userId, data);
  });

export const setCampaignStatusFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z.object({ id: z.string().min(4), status: z.enum(["DRAFT", "IN_PROGRESS", "PENDING_REVIEW", "APPROVED", "ARCHIVED"]) }).parse(input),
  )
  .handler(async ({ context, data }) => {
    const { setCampaignStatus } = await import("./store.server");
    return setCampaignStatus(context.userId, data.id, data.status);
  });

export const getScreens = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { listScreens } = await import("./store.server");
    return listScreens(context.userId);
  });

export const saveScreenFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => signageInputSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { saveScreen } = await import("./store.server");
    return saveScreen(context.userId, data);
  });

export const getScreenFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => idSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { getScreen } = await import("./store.server");
    return getScreen(context.userId, data.id);
  });

export const deleteScreenFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => idSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { deleteScreen } = await import("./store.server");
    return deleteScreen(context.userId, data.id);
  });

export const getTeam = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { listMembers } = await import("./store.server");
    return listMembers(context.userId);
  });

export const setRoleFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => z.object({ userId: z.string().min(1), role: roleSchema }).parse(input))
  .handler(async ({ context, data }) => {
    const { setMemberRole } = await import("./store.server");
    return setMemberRole(context.userId, data.userId, data.role);
  });

export const getLogs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { listLogs } = await import("./store.server");
    return listLogs(context.userId);
  });

export const getStatus = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const { integrationStatus, sheetsStatusQuiet } = await import("./sheets.server");
    return { integrations: integrationStatus(), sheets: sheetsStatusQuiet() };
  });

export const checkSheetsFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { checkSheets } = await import("./sheets.server");
    const { rateLimit } = await import("./store.server");
    rateLimit(context.userId, "sheets", 8);
    return checkSheets();
  });

export const syncSheetsFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const store = await import("./store.server");
    const { member } = await store.contextFor(context.userId);
    if (member.role !== "ADMIN") throw new Error("סנכרון גיליון שמור למנהל.");
    store.rateLimit(context.userId, "sheets", 4);
    const [products, projects, prompts, media, campaigns, knowledge] = await Promise.all([
      store.listProducts(context.userId),
      store.listProjects(context.userId),
      store.listPrompts(context.userId),
      store.listMedia(context.userId),
      store.listCampaigns(context.userId),
      store.listKnowledge(context.userId),
    ]);
    const { pushSnapshot } = await import("./sheets.server");
    return pushSnapshot({ products, projects, prompts, media, campaigns, knowledge });
  });

export const rewriteFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z.object({ draft: z.string().max(4000), instruction: z.string().max(400) }).parse(input),
  )
  .handler(async ({ context, data }) => {
    const { rateLimit } = await import("./store.server");
    rateLimit(context.userId, "ai", 12);
    const { grokRewrite } = await import("./ai.server");
    return grokRewrite(data.draft, data.instruction);
  });

