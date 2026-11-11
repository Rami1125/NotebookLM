import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { D as _enum, F as object, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { a as mediaInputSchema, c as promptInputSchema, d as slideInputSchema, f as technicalStatusSchema, i as knowledgeInputSchema, l as roleSchema, n as campaignInputSchema, o as productInputSchema, p as videoBriefSchema, r as idSchema, s as projectBriefSchema, t as authMiddleware, u as signageInputSchema } from "./schemas-M8nStQC3.mjs";
import { o as assessClaim } from "./compose-DuheWigm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BCuOiUhT.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getDashboard_createServerFn_handler = createServerRpc({
	id: "8aaba843002e8336c7e32832ac0645aa44c8d0c076679dc48f6e7627dfd27cfd",
	name: "getDashboard",
	filename: "src/lib/saban/api.ts"
}, (opts) => getDashboard.__executeServer(opts));
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getDashboard_createServerFn_handler, async ({ context }) => {
	const { dashboard } = await import("./store.server-CUwwBFG7.mjs");
	return dashboard(context.userId);
});
var getProducts_createServerFn_handler = createServerRpc({
	id: "bbee3fe36153af75cefda647073ef3cfbda10c46f17ca162c158d4c681aedce3",
	name: "getProducts",
	filename: "src/lib/saban/api.ts"
}, (opts) => getProducts.__executeServer(opts));
var getProducts = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getProducts_createServerFn_handler, async ({ context }) => {
	const { listProducts } = await import("./store.server-CUwwBFG7.mjs");
	return listProducts(context.userId);
});
var createProductFn_createServerFn_handler = createServerRpc({
	id: "a282d9be06944790e27e7623e335e1b5373b7d8d0eee8b893d2738b9decc3206",
	name: "createProductFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => createProductFn.__executeServer(opts));
var createProductFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => productInputSchema.parse(input)).handler(createProductFn_createServerFn_handler, async ({ context, data }) => {
	const { createProduct } = await import("./store.server-CUwwBFG7.mjs");
	return createProduct(context.userId, data);
});
var updateProductFn_createServerFn_handler = createServerRpc({
	id: "e42c729fc64e793732c25a92a26aee9868d76e2e0b73a9c0d7a7eb1e3a879ff9",
	name: "updateProductFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => updateProductFn.__executeServer(opts));
var updateProductFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => productInputSchema.extend({ productId: string().min(4) }).parse(input)).handler(updateProductFn_createServerFn_handler, async ({ context, data }) => {
	const { updateProduct } = await import("./store.server-CUwwBFG7.mjs");
	const { productId, ...rest } = data;
	return updateProduct(context.userId, productId, rest);
});
var deleteProductFn_createServerFn_handler = createServerRpc({
	id: "18f413265da83fb92fa2222c9991b32053aa0ca3f5ca2b8420978810a955415b",
	name: "deleteProductFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => deleteProductFn.__executeServer(opts));
var deleteProductFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(deleteProductFn_createServerFn_handler, async ({ context, data }) => {
	const { deleteProduct } = await import("./store.server-CUwwBFG7.mjs");
	return deleteProduct(context.userId, data.id);
});
var importProductsFn_createServerFn_handler = createServerRpc({
	id: "40fea44468015d119281fa25749eb4b915d1babb584d51436590b481ba5a1567",
	name: "importProductsFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => importProductsFn.__executeServer(opts));
var importProductsFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ rows: array(productInputSchema).max(200) }).parse(input)).handler(importProductsFn_createServerFn_handler, async ({ context, data }) => {
	const { importProducts } = await import("./store.server-CUwwBFG7.mjs");
	return importProducts(context.userId, data.rows);
});
var getProjects_createServerFn_handler = createServerRpc({
	id: "9008b4d26f3a06cffecd019b0da4df3fb0b1c7ab551292379871f0f5a7d09690",
	name: "getProjects",
	filename: "src/lib/saban/api.ts"
}, (opts) => getProjects.__executeServer(opts));
var getProjects = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getProjects_createServerFn_handler, async ({ context }) => {
	const { listProjects } = await import("./store.server-CUwwBFG7.mjs");
	return listProjects(context.userId);
});
var generatePresentationFn_createServerFn_handler = createServerRpc({
	id: "1d9063ff0f073826b6f90a415b01f7e580e9f9fb9c7679be274a27984d49ee07",
	name: "generatePresentationFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => generatePresentationFn.__executeServer(opts));
var generatePresentationFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => projectBriefSchema.parse(input)).handler(generatePresentationFn_createServerFn_handler, async ({ context, data }) => {
	const { generatePresentation } = await import("./store.server-CUwwBFG7.mjs");
	return generatePresentation(context.userId, data);
});
var getPresentationFn_createServerFn_handler = createServerRpc({
	id: "0e7912828812de7749464a0c939d98486235249872d0dd1a739ee6548407dfa7",
	name: "getPresentationFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => getPresentationFn.__executeServer(opts));
var getPresentationFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(getPresentationFn_createServerFn_handler, async ({ context, data }) => {
	const { getPresentation } = await import("./store.server-CUwwBFG7.mjs");
	return getPresentation(context.userId, data.id);
});
var saveSlideFn_createServerFn_handler = createServerRpc({
	id: "2e1e52008eaa145f17c150df00cb87db0c2c7f8b1b4d25734338faa75b0e2fe5",
	name: "saveSlideFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => saveSlideFn.__executeServer(opts));
var saveSlideFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => slideInputSchema.parse(input)).handler(saveSlideFn_createServerFn_handler, async ({ context, data }) => {
	const { saveSlide } = await import("./store.server-CUwwBFG7.mjs");
	return saveSlide(context.userId, data);
});
var slideActionFn_createServerFn_handler = createServerRpc({
	id: "a74a657eb2674e32b31f08ae63b9388e8a501cc83786e4cbfa18a89df7d9015b",
	name: "slideActionFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => slideActionFn.__executeServer(opts));
var slideActionFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	slideId: string().min(4),
	action: _enum([
		"up",
		"down",
		"duplicate",
		"delete"
	])
}).parse(input)).handler(slideActionFn_createServerFn_handler, async ({ context, data }) => {
	const store = await import("./store.server-CUwwBFG7.mjs");
	if (data.action === "duplicate") return store.duplicateSlide(context.userId, data.slideId);
	if (data.action === "delete") return store.deleteSlide(context.userId, data.slideId);
	return store.moveSlide(context.userId, data.slideId, data.action);
});
var setProjectStatusFn_createServerFn_handler = createServerRpc({
	id: "2b3e73a357f10d1649f3a7350112223444232fb044d489d5763a12045aae7b69",
	name: "setProjectStatusFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => setProjectStatusFn.__executeServer(opts));
var setProjectStatusFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	id: string().min(4),
	status: _enum([
		"DRAFT",
		"IN_PROGRESS",
		"PENDING_REVIEW",
		"APPROVED",
		"ARCHIVED"
	])
}).parse(input)).handler(setProjectStatusFn_createServerFn_handler, async ({ context, data }) => {
	const { setProjectStatus } = await import("./store.server-CUwwBFG7.mjs");
	return setProjectStatus(context.userId, data.id, data.status);
});
var deleteProjectFn_createServerFn_handler = createServerRpc({
	id: "5b1cd59ecadd9833e1e88984295c8a2a9a234593af3ec72bcb8878f6ec7f52ad",
	name: "deleteProjectFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => deleteProjectFn.__executeServer(opts));
var deleteProjectFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(deleteProjectFn_createServerFn_handler, async ({ context, data }) => {
	const { deleteProject } = await import("./store.server-CUwwBFG7.mjs");
	return deleteProject(context.userId, data.id);
});
var exportPptxFn_createServerFn_handler = createServerRpc({
	id: "40c08584948a8d86ee178e356a503211232444b00a9b4ab3c1c36889dcc87b52",
	name: "exportPptxFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => exportPptxFn.__executeServer(opts));
var exportPptxFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(exportPptxFn_createServerFn_handler, async ({ context, data }) => {
	const { buildPptx } = await import("./store.server-CUwwBFG7.mjs");
	return buildPptx(context.userId, data.id);
});
var getVideos_createServerFn_handler = createServerRpc({
	id: "1108eb72b66f0f95ec1ef3be87472e8464612f13102a0adf7b1ca7a9b2c35904",
	name: "getVideos",
	filename: "src/lib/saban/api.ts"
}, (opts) => getVideos.__executeServer(opts));
var getVideos = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getVideos_createServerFn_handler, async ({ context }) => {
	const { listVideos } = await import("./store.server-CUwwBFG7.mjs");
	return listVideos(context.userId);
});
var generateVideoFn_createServerFn_handler = createServerRpc({
	id: "bc5f8d6c8b0eb56e3bf4f84daf389500573e7faafa2d24b680d230dce9544905",
	name: "generateVideoFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => generateVideoFn.__executeServer(opts));
var generateVideoFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => videoBriefSchema.parse(input)).handler(generateVideoFn_createServerFn_handler, async ({ context, data }) => {
	const { generateVideo } = await import("./store.server-CUwwBFG7.mjs");
	return generateVideo(context.userId, data);
});
var getVideoFn_createServerFn_handler = createServerRpc({
	id: "01f80a701c98e9ad4f148b09c69bd5d1fd0e3c1a4de154975876a9d3b5ff2f5a",
	name: "getVideoFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => getVideoFn.__executeServer(opts));
var getVideoFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(getVideoFn_createServerFn_handler, async ({ context, data }) => {
	const { getVideo } = await import("./store.server-CUwwBFG7.mjs");
	return getVideo(context.userId, data.id);
});
var sceneSchema = object({
	sceneNumber: number().int(),
	duration: number().int().min(1).max(60),
	visualDescription: string().max(2e3),
	cameraMovement: string().max(400),
	lighting: string().max(400),
	voiceover: string().max(2e3),
	onScreenText: string().max(400),
	aiVideoPrompt: string().max(4e3)
});
var saveVideoFn_createServerFn_handler = createServerRpc({
	id: "1acfb09f3dd2df5fd164840f3954bd72e25967dcefbc05f5da975e1a324b42c7",
	name: "saveVideoFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => saveVideoFn.__executeServer(opts));
var saveVideoFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	videoId: string().min(4),
	title: string().trim().min(2).max(180),
	script: string().max(2e4),
	videoPrompt: string().max(2e4),
	storyboard: array(sceneSchema).max(12)
}).parse(input)).handler(saveVideoFn_createServerFn_handler, async ({ context, data }) => {
	const { saveVideo } = await import("./store.server-CUwwBFG7.mjs");
	return saveVideo(context.userId, data.videoId, data);
});
var getPrompts_createServerFn_handler = createServerRpc({
	id: "cc7f51f78890b10022697840b878826bbd0216bd872dbf24c20c46d63e44a955",
	name: "getPrompts",
	filename: "src/lib/saban/api.ts"
}, (opts) => getPrompts.__executeServer(opts));
var getPrompts = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getPrompts_createServerFn_handler, async ({ context }) => {
	const { listPrompts } = await import("./store.server-CUwwBFG7.mjs");
	return listPrompts(context.userId);
});
var savePromptFn_createServerFn_handler = createServerRpc({
	id: "2c44e93d5fa075f31d1a786f48329f9eecf7210f977f87f11a2281d6a675b836",
	name: "savePromptFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => savePromptFn.__executeServer(opts));
var savePromptFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => promptInputSchema.parse(input)).handler(savePromptFn_createServerFn_handler, async ({ context, data }) => {
	const { savePrompt } = await import("./store.server-CUwwBFG7.mjs");
	return savePrompt(context.userId, data);
});
var deletePromptFn_createServerFn_handler = createServerRpc({
	id: "2bc40ee2c981b8f66cceda072f6b4354a6021a4091901acb3a11a1c2cae3f956",
	name: "deletePromptFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => deletePromptFn.__executeServer(opts));
var deletePromptFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(deletePromptFn_createServerFn_handler, async ({ context, data }) => {
	const { deletePrompt } = await import("./store.server-CUwwBFG7.mjs");
	return deletePrompt(context.userId, data.id);
});
var getMedia_createServerFn_handler = createServerRpc({
	id: "d870bdd043df6257627b47ecd0402ca35114791325dd7ea6c9899b69ffc17023",
	name: "getMedia",
	filename: "src/lib/saban/api.ts"
}, (opts) => getMedia.__executeServer(opts));
var getMedia = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMedia_createServerFn_handler, async ({ context }) => {
	const { listMedia } = await import("./store.server-CUwwBFG7.mjs");
	return listMedia(context.userId);
});
var saveMediaFn_createServerFn_handler = createServerRpc({
	id: "860c263b8fd2a9b17c85698a640d9bbd687bd05d33438c47bbae9838f8e8e42a",
	name: "saveMediaFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => saveMediaFn.__executeServer(opts));
var saveMediaFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => mediaInputSchema.parse(input)).handler(saveMediaFn_createServerFn_handler, async ({ context, data }) => {
	const { saveMedia } = await import("./store.server-CUwwBFG7.mjs");
	return saveMedia(context.userId, data);
});
var deleteMediaFn_createServerFn_handler = createServerRpc({
	id: "3c6c2274004a64e08e33fbe6570256a3134f97b29c2c77e9c23522f416657337",
	name: "deleteMediaFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => deleteMediaFn.__executeServer(opts));
var deleteMediaFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(deleteMediaFn_createServerFn_handler, async ({ context, data }) => {
	const { deleteMedia } = await import("./store.server-CUwwBFG7.mjs");
	return deleteMedia(context.userId, data.id);
});
var getKnowledge_createServerFn_handler = createServerRpc({
	id: "25363fad11e1bf18907568fbb236056adb4ac136ebb3db8bf55884bd1c223c22",
	name: "getKnowledge",
	filename: "src/lib/saban/api.ts"
}, (opts) => getKnowledge.__executeServer(opts));
var getKnowledge = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getKnowledge_createServerFn_handler, async ({ context }) => {
	const { listKnowledge } = await import("./store.server-CUwwBFG7.mjs");
	return listKnowledge(context.userId);
});
var saveKnowledgeFn_createServerFn_handler = createServerRpc({
	id: "1d8d7731a985776944700385b4f7e9fe6cd46b440743c7fbb043f978a1836ed9",
	name: "saveKnowledgeFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => saveKnowledgeFn.__executeServer(opts));
var saveKnowledgeFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => knowledgeInputSchema.parse(input)).handler(saveKnowledgeFn_createServerFn_handler, async ({ context, data }) => {
	const { saveKnowledge } = await import("./store.server-CUwwBFG7.mjs");
	return saveKnowledge(context.userId, data);
});
var setKnowledgeStatusFn_createServerFn_handler = createServerRpc({
	id: "282368f7086dcea60a5374c0a76139d3f800c1a02393147262bb44aefbe33e4f",
	name: "setKnowledgeStatusFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => setKnowledgeStatusFn.__executeServer(opts));
var setKnowledgeStatusFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	id: string().min(4),
	status: technicalStatusSchema
}).parse(input)).handler(setKnowledgeStatusFn_createServerFn_handler, async ({ context, data }) => {
	const { updateKnowledgeStatus } = await import("./store.server-CUwwBFG7.mjs");
	return updateKnowledgeStatus(context.userId, data.id, data.status);
});
var checkClaimFn_createServerFn_handler = createServerRpc({
	id: "5b7a801f0cb7cc70a5dd6b99606ab4de811aa8febe8e04771ece70db98867fac",
	name: "checkClaimFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => checkClaimFn.__executeServer(opts));
var checkClaimFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	claim: string().max(2e3),
	productId: string().max(40).optional()
}).parse(input)).handler(checkClaimFn_createServerFn_handler, async ({ context, data }) => {
	const { listKnowledge } = await import("./store.server-CUwwBFG7.mjs");
	const relevant = (await listKnowledge(context.userId)).filter((source) => !data.productId || source.productId === data.productId || !source.productId);
	return assessClaim(data.claim, relevant.map((source) => ({
		status: source.verificationStatus,
		excerpt: `${source.excerpt}\n${source.notes}`
	})));
});
var getCampaigns_createServerFn_handler = createServerRpc({
	id: "545fdc1ce1b863e997f7770d4dd58b02aa43470f381cd35831e00b63efc55a65",
	name: "getCampaigns",
	filename: "src/lib/saban/api.ts"
}, (opts) => getCampaigns.__executeServer(opts));
var getCampaigns = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getCampaigns_createServerFn_handler, async ({ context }) => {
	const { listCampaigns } = await import("./store.server-CUwwBFG7.mjs");
	return listCampaigns(context.userId);
});
var saveCampaignFn_createServerFn_handler = createServerRpc({
	id: "4db71046356d92c7e044de3aabfa72f50a83e9bafaf88ed6cdfae22fb2c51a4e",
	name: "saveCampaignFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => saveCampaignFn.__executeServer(opts));
var saveCampaignFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => campaignInputSchema.parse(input)).handler(saveCampaignFn_createServerFn_handler, async ({ context, data }) => {
	const { saveCampaign } = await import("./store.server-CUwwBFG7.mjs");
	return saveCampaign(context.userId, data);
});
var setCampaignStatusFn_createServerFn_handler = createServerRpc({
	id: "357af18928303d29948a3edf7bf84f18b1c85ff73536a9e29c6274e26e766a94",
	name: "setCampaignStatusFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => setCampaignStatusFn.__executeServer(opts));
var setCampaignStatusFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	id: string().min(4),
	status: _enum([
		"DRAFT",
		"IN_PROGRESS",
		"PENDING_REVIEW",
		"APPROVED",
		"ARCHIVED"
	])
}).parse(input)).handler(setCampaignStatusFn_createServerFn_handler, async ({ context, data }) => {
	const { setCampaignStatus } = await import("./store.server-CUwwBFG7.mjs");
	return setCampaignStatus(context.userId, data.id, data.status);
});
var getScreens_createServerFn_handler = createServerRpc({
	id: "ca38797799c4edc6b860573c9bc8d120236034426be9be4617ef528c6c67b61d",
	name: "getScreens",
	filename: "src/lib/saban/api.ts"
}, (opts) => getScreens.__executeServer(opts));
var getScreens = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getScreens_createServerFn_handler, async ({ context }) => {
	const { listScreens } = await import("./store.server-CUwwBFG7.mjs");
	return listScreens(context.userId);
});
var saveScreenFn_createServerFn_handler = createServerRpc({
	id: "72731df8b58377bcd01da0f222e3e90bf7d9ac23e9b6907da1dec8171d40b1b1",
	name: "saveScreenFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => saveScreenFn.__executeServer(opts));
var saveScreenFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => signageInputSchema.parse(input)).handler(saveScreenFn_createServerFn_handler, async ({ context, data }) => {
	const { saveScreen } = await import("./store.server-CUwwBFG7.mjs");
	return saveScreen(context.userId, data);
});
var getScreenFn_createServerFn_handler = createServerRpc({
	id: "6721e517e9ca946a43ec4a61d83f75c39f0742aa58957827c3e395b841ea32fd",
	name: "getScreenFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => getScreenFn.__executeServer(opts));
var getScreenFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(getScreenFn_createServerFn_handler, async ({ context, data }) => {
	const { getScreen } = await import("./store.server-CUwwBFG7.mjs");
	return getScreen(context.userId, data.id);
});
var deleteScreenFn_createServerFn_handler = createServerRpc({
	id: "5c83a3a66f94a7ab21f51bdfd4b31d0d39e7f3b57ba65471e0f37cc61e821637",
	name: "deleteScreenFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => deleteScreenFn.__executeServer(opts));
var deleteScreenFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(deleteScreenFn_createServerFn_handler, async ({ context, data }) => {
	const { deleteScreen } = await import("./store.server-CUwwBFG7.mjs");
	return deleteScreen(context.userId, data.id);
});
var getTeam_createServerFn_handler = createServerRpc({
	id: "468a8604b1313ae8ee12e1df5fae5f734b9f435f74577fdfb009d4aebc0bb992",
	name: "getTeam",
	filename: "src/lib/saban/api.ts"
}, (opts) => getTeam.__executeServer(opts));
var getTeam = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getTeam_createServerFn_handler, async ({ context }) => {
	const { listMembers } = await import("./store.server-CUwwBFG7.mjs");
	return listMembers(context.userId);
});
var setRoleFn_createServerFn_handler = createServerRpc({
	id: "13601fa4061652fe3e2470be78ff14bc0e034012ed4be115cf8add6f735cb31d",
	name: "setRoleFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => setRoleFn.__executeServer(opts));
var setRoleFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	userId: string().min(1),
	role: roleSchema
}).parse(input)).handler(setRoleFn_createServerFn_handler, async ({ context, data }) => {
	const { setMemberRole } = await import("./store.server-CUwwBFG7.mjs");
	return setMemberRole(context.userId, data.userId, data.role);
});
var getLogs_createServerFn_handler = createServerRpc({
	id: "f66eed79b6f2f0c3b344ed78713e0cde94b99988eaa92fa26604a42b8072f132",
	name: "getLogs",
	filename: "src/lib/saban/api.ts"
}, (opts) => getLogs.__executeServer(opts));
var getLogs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getLogs_createServerFn_handler, async ({ context }) => {
	const { listLogs } = await import("./store.server-CUwwBFG7.mjs");
	return listLogs(context.userId);
});
var getStatus_createServerFn_handler = createServerRpc({
	id: "ce932b8ede3893583652941f2178277b9593785e71a773533d4b70fc4ad3602b",
	name: "getStatus",
	filename: "src/lib/saban/api.ts"
}, (opts) => getStatus.__executeServer(opts));
var getStatus = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getStatus_createServerFn_handler, async () => {
	const { integrationStatus, sheetsStatusQuiet } = await import("./sheets.server-B6RjD0YU.mjs");
	return {
		integrations: integrationStatus(),
		sheets: sheetsStatusQuiet()
	};
});
var checkSheetsFn_createServerFn_handler = createServerRpc({
	id: "2760b0bb5e57ff231e3382dfdfc051ee7b30ae16b82338b289cabf085d420be1",
	name: "checkSheetsFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => checkSheetsFn.__executeServer(opts));
var checkSheetsFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(checkSheetsFn_createServerFn_handler, async ({ context }) => {
	const { checkSheets } = await import("./sheets.server-B6RjD0YU.mjs");
	const { rateLimit } = await import("./store.server-CUwwBFG7.mjs");
	rateLimit(context.userId, "sheets", 8);
	return checkSheets();
});
var syncSheetsFn_createServerFn_handler = createServerRpc({
	id: "3a328ae7e495427a7b2d77cfc5ec14c529d40ad14d86e6c6abba7a3420db46c2",
	name: "syncSheetsFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => syncSheetsFn.__executeServer(opts));
var syncSheetsFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(syncSheetsFn_createServerFn_handler, async ({ context }) => {
	const store = await import("./store.server-CUwwBFG7.mjs");
	const { member } = await store.contextFor(context.userId);
	if (member.role !== "ADMIN") throw new Error("סנכרון גיליון שמור למנהל.");
	store.rateLimit(context.userId, "sheets", 4);
	const [products, projects, prompts, media, campaigns, knowledge] = await Promise.all([
		store.listProducts(context.userId),
		store.listProjects(context.userId),
		store.listPrompts(context.userId),
		store.listMedia(context.userId),
		store.listCampaigns(context.userId),
		store.listKnowledge(context.userId)
	]);
	const { pushSnapshot } = await import("./sheets.server-B6RjD0YU.mjs");
	return pushSnapshot({
		products,
		projects,
		prompts,
		media,
		campaigns,
		knowledge
	});
});
var rewriteFn_createServerFn_handler = createServerRpc({
	id: "704a3b75ebbb985f5a845ab9faf9c373aaecfa2255d465cd9da7c927b51c2401",
	name: "rewriteFn",
	filename: "src/lib/saban/api.ts"
}, (opts) => rewriteFn.__executeServer(opts));
var rewriteFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	draft: string().max(4e3),
	instruction: string().max(400)
}).parse(input)).handler(rewriteFn_createServerFn_handler, async ({ context, data }) => {
	const { rateLimit } = await import("./store.server-CUwwBFG7.mjs");
	rateLimit(context.userId, "ai", 12);
	const { grokRewrite } = await import("./ai.server-CQcFjihT.mjs");
	return grokRewrite(data.draft, data.instruction);
});
//#endregion
export { checkClaimFn_createServerFn_handler, checkSheetsFn_createServerFn_handler, createProductFn_createServerFn_handler, deleteMediaFn_createServerFn_handler, deleteProductFn_createServerFn_handler, deleteProjectFn_createServerFn_handler, deletePromptFn_createServerFn_handler, deleteScreenFn_createServerFn_handler, exportPptxFn_createServerFn_handler, generatePresentationFn_createServerFn_handler, generateVideoFn_createServerFn_handler, getCampaigns_createServerFn_handler, getDashboard_createServerFn_handler, getKnowledge_createServerFn_handler, getLogs_createServerFn_handler, getMedia_createServerFn_handler, getPresentationFn_createServerFn_handler, getProducts_createServerFn_handler, getProjects_createServerFn_handler, getPrompts_createServerFn_handler, getScreenFn_createServerFn_handler, getScreens_createServerFn_handler, getStatus_createServerFn_handler, getTeam_createServerFn_handler, getVideoFn_createServerFn_handler, getVideos_createServerFn_handler, importProductsFn_createServerFn_handler, rewriteFn_createServerFn_handler, saveCampaignFn_createServerFn_handler, saveKnowledgeFn_createServerFn_handler, saveMediaFn_createServerFn_handler, savePromptFn_createServerFn_handler, saveScreenFn_createServerFn_handler, saveSlideFn_createServerFn_handler, saveVideoFn_createServerFn_handler, setCampaignStatusFn_createServerFn_handler, setKnowledgeStatusFn_createServerFn_handler, setProjectStatusFn_createServerFn_handler, setRoleFn_createServerFn_handler, slideActionFn_createServerFn_handler, syncSheetsFn_createServerFn_handler, updateProductFn_createServerFn_handler };
