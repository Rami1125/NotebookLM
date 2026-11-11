import { o as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Empty, d as Select, i as Card, l as Notice, m as messageOf, o as Field, p as TextArea, r as Button, s as Input, u as PageTitle } from "./shell-DG7LTl6a.mjs";
import { u as generatePresentationFn, v as getProducts, y as getProjects } from "./api-48hcTNoQ.mjs";
import { t as useLoad } from "./load-CEXbMbec.mjs";
import { a as VISUAL_STYLES, r as PRESENTATION_FORMATS, t as AUDIENCES } from "./compose-DuheWigm.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/presentations-CwKYj21W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PresentationsPage() {
	const navigate = useNavigate();
	const products = useLoad(() => getProducts(), []);
	const projects = useLoad(() => getProjects(), []);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
		projectName: "",
		productId: "",
		targetAudience: AUDIENCES[0],
		goal: "להציג את המוצר לצוות בלי להמציא מפרט",
		visualStyle: VISUAL_STYLES[0],
		format: PRESENTATION_FORMATS[0],
		slideCount: 8
	});
	async function createProject() {
		setBusy(true);
		setError("");
		try {
			const result = await generatePresentationFn({ data: {
				...form,
				slideCount: Number(form.slideCount)
			} });
			toast.success("המצגת נשמרה");
			await navigate({
				to: "/presentations/$projectId",
				params: { projectId: result.project.projectId }
			});
		} catch (err) {
			setError(messageOf(err));
		} finally {
			setBusy(false);
		}
	}
	const decks = (projects.data ?? []).filter((project) => project.projectType === "presentation");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			eyebrow: "סטודיו מצגות",
			title: "מצגת מתוך המוצר, לא מתוך ניחוש",
			lede: "המערכת מרכיבה שקופיות רק מהשדות שנשמרו. נתון טכני שלא אומת מקבל אזהרה, לא מספר מומצא."
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[0.9fr_1.1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: "מצגת חדשה"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "שם המצגת",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.projectName,
							onChange: (event) => setForm({
								...form,
								projectName: event.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "מוצר",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.productId,
							onChange: (event) => setForm({
								...form,
								productId: event.target.value
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "בחרו מוצר"
							}), (products.data ?? []).map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: product.productId,
								children: product.nameHe
							}, product.productId))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "קהל",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: form.targetAudience,
							onChange: (event) => setForm({
								...form,
								targetAudience: event.target.value
							}),
							children: AUDIENCES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "מטרה",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: form.goal,
							onChange: (event) => setForm({
								...form,
								goal: event.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "סגנון",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: form.visualStyle,
									onChange: (event) => setForm({
										...form,
										visualStyle: event.target.value
									}),
									children: VISUAL_STYLES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "פורמט",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: form.format,
									onChange: (event) => setForm({
										...form,
										format: event.target.value
									}),
									children: PRESENTATION_FORMATS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "שקופיות",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 4,
									max: 12,
									value: form.slideCount,
									onChange: (event) => setForm({
										...form,
										slideCount: Number(event.target.value)
									})
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: busy || !form.productId || form.projectName.trim().length < 2,
						onClick: () => void createProject(),
						children: busy ? "יוצר…" : "יצירת מצגת"
					})
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: "מצגות שמורות"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-2",
				children: [decks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					title: "אין מצגות",
					body: "צרו מצגת מהטופס. היא תישמר מיד במסד."
				}) : null, decks.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/presentations/$projectId",
					params: { projectId: project.projectId },
					className: "rounded-xl border border-line px-3 py-3 hover:bg-paper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium",
						children: project.projectName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted",
						children: [
							project.targetAudience,
							" · ",
							project.format,
							" · ",
							project.status
						]
					})]
				}, project.projectId))]
			})] })]
		})
	] });
}
//#endregion
export { PresentationsPage as component };
