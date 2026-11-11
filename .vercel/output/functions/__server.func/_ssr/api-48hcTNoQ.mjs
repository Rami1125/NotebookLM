import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { D as _enum, F as object, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { a as mediaInputSchema, c as promptInputSchema, d as slideInputSchema, f as technicalStatusSchema, i as knowledgeInputSchema, l as roleSchema, n as campaignInputSchema, o as productInputSchema, p as videoBriefSchema, r as idSchema, s as projectBriefSchema, t as authMiddleware, u as signageInputSchema } from "./schemas-M8nStQC3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-48hcTNoQ.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("8aaba843002e8336c7e32832ac0645aa44c8d0c076679dc48f6e7627dfd27cfd"));
var getProducts = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("bbee3fe36153af75cefda647073ef3cfbda10c46f17ca162c158d4c681aedce3"));
var createProductFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => productInputSchema.parse(input)).handler(createSsrRpc("a282d9be06944790e27e7623e335e1b5373b7d8d0eee8b893d2738b9decc3206"));
var updateProductFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => productInputSchema.extend({ productId: string().min(4) }).parse(input)).handler(createSsrRpc("e42c729fc64e793732c25a92a26aee9868d76e2e0b73a9c0d7a7eb1e3a879ff9"));
var deleteProductFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(createSsrRpc("18f413265da83fb92fa2222c9991b32053aa0ca3f5ca2b8420978810a955415b"));
var importProductsFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ rows: array(productInputSchema).max(200) }).parse(input)).handler(createSsrRpc("40fea44468015d119281fa25749eb4b915d1babb584d51436590b481ba5a1567"));
var getProjects = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("9008b4d26f3a06cffecd019b0da4df3fb0b1c7ab551292379871f0f5a7d09690"));
var generatePresentationFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => projectBriefSchema.parse(input)).handler(createSsrRpc("1d9063ff0f073826b6f90a415b01f7e580e9f9fb9c7679be274a27984d49ee07"));
var getPresentationFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(createSsrRpc("0e7912828812de7749464a0c939d98486235249872d0dd1a739ee6548407dfa7"));
var saveSlideFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => slideInputSchema.parse(input)).handler(createSsrRpc("2e1e52008eaa145f17c150df00cb87db0c2c7f8b1b4d25734338faa75b0e2fe5"));
var slideActionFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	slideId: string().min(4),
	action: _enum([
		"up",
		"down",
		"duplicate",
		"delete"
	])
}).parse(input)).handler(createSsrRpc("a74a657eb2674e32b31f08ae63b9388e8a501cc83786e4cbfa18a89df7d9015b"));
var setProjectStatusFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	id: string().min(4),
	status: _enum([
		"DRAFT",
		"IN_PROGRESS",
		"PENDING_REVIEW",
		"APPROVED",
		"ARCHIVED"
	])
}).parse(input)).handler(createSsrRpc("2b3e73a357f10d1649f3a7350112223444232fb044d489d5763a12045aae7b69"));
var deleteProjectFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(createSsrRpc("5b1cd59ecadd9833e1e88984295c8a2a9a234593af3ec72bcb8878f6ec7f52ad"));
var exportPptxFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(createSsrRpc("40c08584948a8d86ee178e356a503211232444b00a9b4ab3c1c36889dcc87b52"));
var getVideos = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("1108eb72b66f0f95ec1ef3be87472e8464612f13102a0adf7b1ca7a9b2c35904"));
var generateVideoFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => videoBriefSchema.parse(input)).handler(createSsrRpc("bc5f8d6c8b0eb56e3bf4f84daf389500573e7faafa2d24b680d230dce9544905"));
var getVideoFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(createSsrRpc("01f80a701c98e9ad4f148b09c69bd5d1fd0e3c1a4de154975876a9d3b5ff2f5a"));
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
var saveVideoFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	videoId: string().min(4),
	title: string().trim().min(2).max(180),
	script: string().max(2e4),
	videoPrompt: string().max(2e4),
	storyboard: array(sceneSchema).max(12)
}).parse(input)).handler(createSsrRpc("1acfb09f3dd2df5fd164840f3954bd72e25967dcefbc05f5da975e1a324b42c7"));
var getPrompts = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("cc7f51f78890b10022697840b878826bbd0216bd872dbf24c20c46d63e44a955"));
var savePromptFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => promptInputSchema.parse(input)).handler(createSsrRpc("2c44e93d5fa075f31d1a786f48329f9eecf7210f977f87f11a2281d6a675b836"));
var deletePromptFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(createSsrRpc("2bc40ee2c981b8f66cceda072f6b4354a6021a4091901acb3a11a1c2cae3f956"));
var getMedia = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d870bdd043df6257627b47ecd0402ca35114791325dd7ea6c9899b69ffc17023"));
var saveMediaFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => mediaInputSchema.parse(input)).handler(createSsrRpc("860c263b8fd2a9b17c85698a640d9bbd687bd05d33438c47bbae9838f8e8e42a"));
var deleteMediaFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(createSsrRpc("3c6c2274004a64e08e33fbe6570256a3134f97b29c2c77e9c23522f416657337"));
var getKnowledge = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("25363fad11e1bf18907568fbb236056adb4ac136ebb3db8bf55884bd1c223c22"));
var saveKnowledgeFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => knowledgeInputSchema.parse(input)).handler(createSsrRpc("1d8d7731a985776944700385b4f7e9fe6cd46b440743c7fbb043f978a1836ed9"));
var setKnowledgeStatusFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	id: string().min(4),
	status: technicalStatusSchema
}).parse(input)).handler(createSsrRpc("282368f7086dcea60a5374c0a76139d3f800c1a02393147262bb44aefbe33e4f"));
var checkClaimFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	claim: string().max(2e3),
	productId: string().max(40).optional()
}).parse(input)).handler(createSsrRpc("5b7a801f0cb7cc70a5dd6b99606ab4de811aa8febe8e04771ece70db98867fac"));
var getCampaigns = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("545fdc1ce1b863e997f7770d4dd58b02aa43470f381cd35831e00b63efc55a65"));
var saveCampaignFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => campaignInputSchema.parse(input)).handler(createSsrRpc("4db71046356d92c7e044de3aabfa72f50a83e9bafaf88ed6cdfae22fb2c51a4e"));
var setCampaignStatusFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	id: string().min(4),
	status: _enum([
		"DRAFT",
		"IN_PROGRESS",
		"PENDING_REVIEW",
		"APPROVED",
		"ARCHIVED"
	])
}).parse(input)).handler(createSsrRpc("357af18928303d29948a3edf7bf84f18b1c85ff73536a9e29c6274e26e766a94"));
var getScreens = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("ca38797799c4edc6b860573c9bc8d120236034426be9be4617ef528c6c67b61d"));
var saveScreenFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => signageInputSchema.parse(input)).handler(createSsrRpc("72731df8b58377bcd01da0f222e3e90bf7d9ac23e9b6907da1dec8171d40b1b1"));
var getScreenFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(createSsrRpc("6721e517e9ca946a43ec4a61d83f75c39f0742aa58957827c3e395b841ea32fd"));
var deleteScreenFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idSchema.parse(input)).handler(createSsrRpc("5c83a3a66f94a7ab21f51bdfd4b31d0d39e7f3b57ba65471e0f37cc61e821637"));
var getTeam = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("468a8604b1313ae8ee12e1df5fae5f734b9f435f74577fdfb009d4aebc0bb992"));
var setRoleFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	userId: string().min(1),
	role: roleSchema
}).parse(input)).handler(createSsrRpc("13601fa4061652fe3e2470be78ff14bc0e034012ed4be115cf8add6f735cb31d"));
var getLogs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f66eed79b6f2f0c3b344ed78713e0cde94b99988eaa92fa26604a42b8072f132"));
var getStatus = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("ce932b8ede3893583652941f2178277b9593785e71a773533d4b70fc4ad3602b"));
var checkSheetsFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("2760b0bb5e57ff231e3382dfdfc051ee7b30ae16b82338b289cabf085d420be1"));
var syncSheetsFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("3a328ae7e495427a7b2d77cfc5ec14c529d40ad14d86e6c6abba7a3420db46c2"));
var rewriteFn = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	draft: string().max(4e3),
	instruction: string().max(400)
}).parse(input)).handler(createSsrRpc("704a3b75ebbb985f5a845ab9faf9c373aaecfa2255d465cd9da7c927b51c2401"));
//#endregion
export { saveKnowledgeFn as A, slideActionFn as B, getStatus as C, importProductsFn as D, getVideos as E, saveVideoFn as F, updateProductFn as H, setCampaignStatusFn as I, setKnowledgeStatusFn as L, savePromptFn as M, saveScreenFn as N, rewriteFn as O, saveSlideFn as P, setProjectStatusFn as R, getScreens as S, getVideoFn as T, syncSheetsFn as V, getPresentationFn as _, deleteProductFn as a, getPrompts as b, deleteScreenFn as c, generateVideoFn as d, getCampaigns as f, getMedia as g, getLogs as h, deleteMediaFn as i, saveMediaFn as j, saveCampaignFn as k, exportPptxFn as l, getKnowledge as m, checkSheetsFn as n, deleteProjectFn as o, getDashboard as p, createProductFn as r, deletePromptFn as s, checkClaimFn as t, generatePresentationFn as u, getProducts as v, getTeam as w, getScreenFn as x, getProjects as y, setRoleFn as z };
