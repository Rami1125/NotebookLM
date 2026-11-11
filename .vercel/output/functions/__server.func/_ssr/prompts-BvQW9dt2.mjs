import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Select, i as Card, l as Notice, m as messageOf, o as Field, p as TextArea, r as Button, s as Input, u as PageTitle } from "./shell-DG7LTl6a.mjs";
import { M as savePromptFn, O as rewriteFn, b as getPrompts, s as deletePromptFn, v as getProducts } from "./api-48hcTNoQ.mjs";
import { t as useLoad } from "./load-CEXbMbec.mjs";
import { l as fillPrompt } from "./compose-DuheWigm.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prompts-BvQW9dt2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PromptsPage() {
	const prompts = useLoad(() => getPrompts(), []);
	const products = useLoad(() => getProducts(), []);
	const [promptId, setPromptId] = (0, import_react.useState)("");
	const [productId, setProductId] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [draftName, setDraftName] = (0, import_react.useState)("");
	const [draftText, setDraftText] = (0, import_react.useState)("");
	const selected = (prompts.data ?? []).find((item) => item.promptId === promptId) ?? prompts.data?.[0];
	const product = (products.data ?? []).find((item) => item.productId === productId) ?? products.data?.[0];
	const filled = (0, import_react.useMemo)(() => {
		if (!selected) return "";
		return fillPrompt(selected.promptText, {
			productName: product?.nameHe ?? "",
			category: product?.category ?? "",
			audience: "קבלנים",
			aspectRatio: "16:9",
			benefit: product?.marketingBenefits.split("\n")[0] ?? "",
			goal: "הסבר זהיר לצוות",
			technicalData: product?.technicalData ?? ""
		});
	}, [selected, product]);
	async function save() {
		try {
			await savePromptFn({ data: {
				promptName: draftName,
				promptType: "text",
				promptText: draftText || filled,
				category: "מותאם",
				variables: []
			} });
			toast.success("הפקודה נשמרה");
			prompts.reload();
		} catch (err) {
			setError(messageOf(err));
		}
	}
	async function polish() {
		const result = await rewriteFn({ data: {
			draft: filled,
			instruction: "הפכו את הפקודה לברורה יותר בלי להוסיף נתונים"
		} });
		if (!result.ok) setError(result.error);
		else setDraftText(result.text);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			eyebrow: "מחולל פקודות",
			title: "פקודות מוכנות למנועי יצירה",
			lede: "המשתנים מתמלאים מכרטיס המוצר. Grok משפר ניסוח רק בלחיצה, ולא ממציא מפרט."
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "פקודה",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: selected?.promptId ?? "",
							onChange: (event) => setPromptId(event.target.value),
							children: (prompts.data ?? []).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.promptId,
								children: item.promptName
							}, item.promptId))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "מוצר",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: product?.productId ?? "",
							onChange: (event) => setProductId(event.target.value),
							children: (products.data ?? []).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.productId,
								children: item.nameHe
							}, item.productId))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "whitespace-pre-wrap rounded-xl bg-paper p-3 text-sm leading-6",
						children: draftText || filled || "טוען פקודות…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => void navigator.clipboard.writeText(draftText || filled).then(() => toast.success("הועתק")),
								children: "העתקה"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "soft",
								onClick: () => void polish(),
								children: "שיפור עם Grok"
							}),
							selected && !selected.builtin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "danger",
								onClick: () => void deletePromptFn({ data: { id: selected.promptId } }).then(() => prompts.reload()),
								children: "מחיקה"
							}) : null
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "שמירת פקודה חדשה"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "שם",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draftName,
							onChange: (event) => setDraftName(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "טקסט",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: draftText,
							placeholder: filled,
							onChange: (event) => setDraftText(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: draftName.trim().length < 2,
						onClick: () => void save(),
						children: "שמירה בספרייה"
					})
				]
			})]
		})
	] });
}
//#endregion
export { PromptsPage as component };
