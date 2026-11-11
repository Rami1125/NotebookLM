import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Select, i as Card, l as Notice, m as messageOf, o as Field, p as TextArea, r as Button, s as Input, t as Badge, u as PageTitle } from "./shell-DG7LTl6a.mjs";
import { A as saveKnowledgeFn, L as setKnowledgeStatusFn, m as getKnowledge, t as checkClaimFn, v as getProducts } from "./api-48hcTNoQ.mjs";
import { t as useLoad } from "./load-CEXbMbec.mjs";
import { u as statusLabel } from "./compose-DuheWigm.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/knowledge-D_Rf5Rmy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KnowledgePage() {
	const sources = useLoad(() => getKnowledge(), []);
	const products = useLoad(() => getProducts(), []);
	const [query, setQuery] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [claim, setClaim] = (0, import_react.useState)("");
	const [productId, setProductId] = (0, import_react.useState)("");
	const [verdict, setVerdict] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		sourceType: "tds",
		sourceUrl: "",
		productId: "",
		documentUrl: "",
		verificationStatus: "NEEDS_VERIFICATION",
		lastVerified: "",
		notes: "",
		excerpt: ""
	});
	const visible = (sources.data ?? []).filter((source) => {
		return `${source.title} ${source.notes} ${source.excerpt}`.toLowerCase().includes(query.trim().toLowerCase());
	});
	async function save() {
		try {
			await saveKnowledgeFn({ data: form });
			toast.success("המקור נשמר");
			sources.reload();
			setForm({
				...form,
				title: "",
				sourceUrl: "",
				documentUrl: "",
				notes: "",
				excerpt: ""
			});
		} catch (err) {
			setError(messageOf(err));
		}
	}
	async function check() {
		try {
			const result = await checkClaimFn({ data: {
				claim,
				productId
			} });
			setVerdict(`${statusLabel(result.status)}. ${result.warning}`.trim());
		} catch (err) {
			setError(messageOf(err));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			eyebrow: "ידע טכני",
			title: "מקור ליד כל טענה",
			lede: "NotebookLM נשמר כאן כקישור למחברת וכמסמך שיוצא ממנה. אין חיבור API ישיר למחברת, ולא נוצרים נתונים טכניים יש מאין."
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "מקור חדש"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "כותרת",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.title,
							onChange: (event) => setForm({
								...form,
								title: event.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "סוג",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.sourceType,
							onChange: (event) => setForm({
								...form,
								sourceType: event.target.value
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "manufacturer",
									children: "אתר יצרן"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "tds",
									children: "גיליון טכני"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "sds",
									children: "גיליון בטיחות"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "catalog",
									children: "קטלוג"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "standard",
									children: "תקן"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "notebooklm",
									children: "מחברת NotebookLM"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "other",
									children: "אחר"
								})
							]
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
								children: "בלי שיוך"
							}), (products.data ?? []).map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: product.productId,
								children: product.nameHe
							}, product.productId))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "כתובת מקור",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.sourceUrl,
							onChange: (event) => setForm({
								...form,
								sourceUrl: event.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "מסמך שיוצא",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.documentUrl,
							onChange: (event) => setForm({
								...form,
								documentUrl: event.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "ציטוט מהמסמך",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: form.excerpt,
							onChange: (event) => setForm({
								...form,
								excerpt: event.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "הערות",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: form.notes,
							onChange: (event) => setForm({
								...form,
								notes: event.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "סטטוס",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.verificationStatus,
							onChange: (event) => setForm({
								...form,
								verificationStatus: event.target.value
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "NEEDS_VERIFICATION",
									children: "ממתין לאימות"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "USER_PROVIDED",
									children: "סופק על ידי המשתמש"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "VERIFIED",
									children: "מאומת"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "OUTDATED",
									children: "לא עדכני"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: form.title.trim().length < 2,
						onClick: () => void save(),
						children: "שמירת מקור"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "בדיקת טענה מול הציטוטים"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "מוצר לבדיקה",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: productId,
							onChange: (event) => setProductId(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "כל המקורות"
							}), (products.data ?? []).map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: product.productId,
								children: product.nameHe
							}, product.productId))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "טענה",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: claim,
							onChange: (event) => setClaim(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "soft",
						onClick: () => void check(),
						children: "בדיקה מקומית"
					}),
					verdict ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
						tone: "warn",
						children: verdict
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-5 text-muted",
						children: "הבדיקה משווה את המילים לציטוט שסומן כמאומת. היא לא גולשת לאינטרנט ולא שואלת מודל אם מותר להמציא מספר."
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "חיפוש במקורות",
				value: query,
				onChange: (event) => setQuery(event.target.value)
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 grid gap-3",
			children: visible.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-medium",
						children: source.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: source.verificationStatus === "VERIFIED" ? "ok" : "warn",
						children: statusLabel(source.verificationStatus)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted",
					children: [
						source.sourceType,
						" ",
						source.lastVerified ? `· נבדק ${source.lastVerified}` : ""
					]
				}),
				source.excerpt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 whitespace-pre-wrap text-sm leading-6",
					children: source.excerpt
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-3 text-sm",
					children: [source.sourceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-accent underline",
						href: source.sourceUrl,
						target: "_blank",
						rel: "noreferrer",
						children: "מקור"
					}) : null, source.documentUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-accent underline",
						href: source.documentUrl,
						target: "_blank",
						rel: "noreferrer",
						children: "מסמך"
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => void setKnowledgeStatusFn({ data: {
							id: source.sourceId,
							status: "VERIFIED"
						} }).then(() => sources.reload()).catch((err) => setError(messageOf(err))),
						children: "סמן כמאומת"
					})
				})
			] }, source.sourceId))
		})
	] });
}
//#endregion
export { KnowledgePage as component };
