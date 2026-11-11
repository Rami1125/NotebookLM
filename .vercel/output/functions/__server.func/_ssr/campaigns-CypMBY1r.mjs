import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Select, i as Card, l as Notice, m as messageOf, o as Field, p as TextArea, r as Button, s as Input, t as Badge, u as PageTitle } from "./shell-DG7LTl6a.mjs";
import { I as setCampaignStatusFn, f as getCampaigns, k as saveCampaignFn, v as getProducts } from "./api-48hcTNoQ.mjs";
import { t as useLoad } from "./load-CEXbMbec.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/campaigns-CypMBY1r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CampaignsPage() {
	const campaigns = useLoad(() => getCampaigns(), []);
	const products = useLoad(() => getProducts(), []);
	const [error, setError] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
		campaignName: "",
		targetAudience: "קבלנים",
		productIds: [],
		campaignGoal: "",
		contentIds: [],
		status: "DRAFT"
	});
	async function save() {
		try {
			await saveCampaignFn({ data: form });
			toast.success("הקמפיין נשמר");
			campaigns.reload();
			setForm({
				...form,
				campaignName: "",
				campaignGoal: "",
				productIds: []
			});
		} catch (err) {
			setError(messageOf(err));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			eyebrow: "קמפיינים",
			title: "מה רץ עכשיו",
			lede: "קמפיין קושר קהל, מוצרים ומטרה. הוא לא מפרסם לבד לרשת."
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "שם",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.campaignName,
						onChange: (event) => setForm({
							...form,
							campaignName: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "קהל",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.targetAudience,
						onChange: (event) => setForm({
							...form,
							targetAudience: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "מטרה",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						value: form.campaignGoal,
						onChange: (event) => setForm({
							...form,
							campaignGoal: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "מוצרים",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						multiple: true,
						className: "min-h-28",
						value: form.productIds,
						onChange: (event) => setForm({
							...form,
							productIds: [...event.target.selectedOptions].map((option) => option.value)
						}),
						children: (products.data ?? []).map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: product.productId,
							children: product.nameHe
						}, product.productId))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: form.campaignName.trim().length < 2,
					onClick: () => void save(),
					children: "שמירה"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-3",
			children: (campaigns.data ?? []).map((campaign) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: campaign.campaignName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						campaign.targetAudience,
						" · ",
						campaign.campaignGoal
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: campaign.status === "APPROVED" || campaign.status === "IN_PROGRESS" ? "ok" : "neutral",
							children: campaign.status
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => void setCampaignStatusFn({ data: {
								id: campaign.campaignId,
								status: "IN_PROGRESS"
							} }).then(() => campaigns.reload()),
							children: "הפעלה"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => void setCampaignStatusFn({ data: {
								id: campaign.campaignId,
								status: "APPROVED"
							} }).then(() => campaigns.reload()),
							children: "אישור"
						})
					]
				})]
			}, campaign.campaignId))
		})
	] });
}
//#endregion
export { CampaignsPage as component };
