import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Empty, d as Select, i as Card, l as Notice, m as messageOf, o as Field, p as TextArea, r as Button, s as Input, t as Badge, u as PageTitle } from "./shell-DG7LTl6a.mjs";
import { o as productInputSchema } from "./schemas-M8nStQC3.mjs";
import { D as importProductsFn, H as updateProductFn, a as deleteProductFn, r as createProductFn, v as getProducts } from "./api-48hcTNoQ.mjs";
import { t as useLoad } from "./load-CEXbMbec.mjs";
import { u as statusLabel } from "./compose-DuheWigm.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-BHy1booP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY = {
	sku: "",
	nameHe: "",
	nameEn: "",
	manufacturer: "",
	category: "",
	packageSize: "",
	description: "",
	marketingBenefits: "",
	technicalData: "",
	technicalStatus: "NEEDS_VERIFICATION",
	manufacturerUrl: "",
	technicalSheetUrl: "",
	productImageUrl: "",
	priceText: "",
	priceApproved: false,
	promoText: "",
	complementaryIds: []
};
function fromProduct(product) {
	return {
		...product,
		productId: product.productId
	};
}
function ProductsPage() {
	const products = useLoad(() => getProducts(), []);
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)(EMPTY);
	const [error, setError] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const categories = (0, import_react.useMemo)(() => [...new Set((products.data ?? []).map((item) => item.category).filter(Boolean))], [products.data]);
	const visible = (products.data ?? []).filter((product) => {
		const matchesQuery = `${product.nameHe} ${product.nameEn} ${product.sku} ${product.manufacturer}`.toLowerCase().includes(query.trim().toLowerCase());
		const matchesCategory = !category || product.category === category;
		return matchesQuery && matchesCategory;
	});
	async function save() {
		setError("");
		try {
			if (form.productId) await updateProductFn({ data: {
				...form,
				productId: form.productId
			} });
			else await createProductFn({ data: form });
			toast.success("המוצר נשמר");
			setOpen(false);
			setForm(EMPTY);
			products.reload();
		} catch (err) {
			setError(messageOf(err));
		}
	}
	async function onFile(file) {
		try {
			const parsed = (file.name.endsWith(".csv") ? await rowsFromCsv(await file.text()) : await rowsFromExcel(await file.arrayBuffer())).map((row) => productInputSchema.parse(row));
			const result = await importProductsFn({ data: { rows: parsed } });
			toast.success(`יובאו ${result.created} מוצרים`);
			if (result.skipped.length) setError(result.skipped.slice(0, 4).join(" · "));
			products.reload();
		} catch (err) {
			setError(messageOf(err));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			eyebrow: "ספריית מוצרים",
			title: "מודיעין מוצר",
			lede: "שמונת המוצרים הראשונים הם רשומות פתיחה בסטטוס ממתין לאימות. אל תתייחסו אליהם כאל דף נתונים."
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "max-w-xs",
					placeholder: "חיפוש",
					value: query,
					onChange: (event) => setQuery(event.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					className: "max-w-xs",
					value: category,
					onChange: (event) => setCategory(event.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "כל הקטגוריות"
					}), categories.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						setForm(EMPTY);
						setOpen(true);
					},
					children: "מוצר חדש"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-line bg-surface px-4 text-sm",
					children: ["יבוא CSV / Excel", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "sr-only",
						type: "file",
						accept: ".csv,.xlsx,.xls",
						onChange: (event) => {
							const file = event.target.files?.[0];
							if (file) onFile(file);
							event.target.value = "";
						}
					})]
				})
			]
		}),
		open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-4 grid gap-3 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "שם בעברית",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.nameHe,
						onChange: (event) => setForm({
							...form,
							nameHe: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "שם באנגלית",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.nameEn,
						onChange: (event) => setForm({
							...form,
							nameEn: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "מק״ט",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.sku,
						onChange: (event) => setForm({
							...form,
							sku: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "יצרן",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.manufacturer,
						onChange: (event) => setForm({
							...form,
							manufacturer: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "קטגוריה",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.category,
						onChange: (event) => setForm({
							...form,
							category: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "אריזה",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.packageSize,
						onChange: (event) => setForm({
							...form,
							packageSize: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "סטטוס טכני",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: form.technicalStatus,
						onChange: (event) => setForm({
							...form,
							technicalStatus: event.target.value
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "מחיר (מוסתר עד אישור)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.priceText,
						onChange: (event) => setForm({
							...form,
							priceText: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: form.priceApproved,
						onChange: (event) => setForm({
							...form,
							priceApproved: event.target.checked
						})
					}), "המחיר אושר להצגה"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "מבצע",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.promoText,
						onChange: (event) => setForm({
							...form,
							promoText: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "אתר יצרן",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.manufacturerUrl,
						onChange: (event) => setForm({
							...form,
							manufacturerUrl: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "גיליון טכני",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.technicalSheetUrl,
						onChange: (event) => setForm({
							...form,
							technicalSheetUrl: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "תמונה",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.productImageUrl,
						onChange: (event) => setForm({
							...form,
							productImageUrl: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "תיאור",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: form.description,
							onChange: (event) => setForm({
								...form,
								description: event.target.value
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "יתרונות שיווקיים, שורה לכל יתרון",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: form.marketingBenefits,
							onChange: (event) => setForm({
								...form,
								marketingBenefits: event.target.value
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "מידע טכני שהוזן בפועל",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: form.technicalData,
							onChange: (event) => setForm({
								...form,
								technicalData: event.target.value
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "מוצרים משלימים",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							multiple: true,
							className: "min-h-28",
							value: form.complementaryIds,
							onChange: (event) => setForm({
								...form,
								complementaryIds: [...event.target.selectedOptions].map((option) => option.value)
							}),
							children: (products.data ?? []).filter((item) => item.productId !== form.productId).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.productId,
								children: item.nameHe
							}, item.productId))
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void save(),
						children: "שמירה"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => setOpen(false),
						children: "סגירה"
					})]
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "אין מוצרים להצגה",
				body: products.loading ? "טוען…" : "נסו חיפוש אחר או הוסיפו מוצר."
			}) : null, visible.map((product) => {
				const related = product.complementaryIds.map((id) => products.data?.find((item) => item.productId === id)?.nameHe).filter(Boolean);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: product.nameHe
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								product.manufacturer || "יצרן לא צוין",
								" · ",
								product.category || "בלי קטגוריה",
								" · ",
								product.sku
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: product.technicalStatus === "VERIFIED" ? "ok" : "warn",
							children: statusLabel(product.technicalStatus)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-6",
						children: product.description
					}),
					product.technicalStatus !== "VERIFIED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-warn",
						children: "הנתון הטכני לא אומת. אין להציג אותו כעובדת יצרן."
					}) : null,
					related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: ["משלימים: ", related.join(", ")]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => {
								setForm(fromProduct(product));
								setOpen(true);
							},
							children: "עריכה"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							onClick: () => void deleteProductFn({ data: { id: product.productId } }).then(() => products.reload()).catch((err) => setError(messageOf(err))),
							children: "מחיקה"
						})]
					})
				] }, product.productId);
			})]
		})
	] });
}
var HEADER_MAP = {
	sku: "sku",
	nameHe: "nameHe",
	namehe: "nameHe",
	"שם": "nameHe",
	nameEn: "nameEn",
	manufacturer: "manufacturer",
	"יצרן": "manufacturer",
	category: "category",
	"קטגוריה": "category",
	packageSize: "packageSize",
	description: "description",
	"תיאור": "description",
	marketingBenefits: "marketingBenefits",
	technicalData: "technicalData",
	technicalStatus: "technicalStatus",
	manufacturerUrl: "manufacturerUrl",
	technicalSheetUrl: "technicalSheetUrl",
	productImageUrl: "productImageUrl"
};
function mapRow(raw) {
	const next = { ...EMPTY };
	for (const [key, value] of Object.entries(raw)) {
		const mapped = HEADER_MAP[key.trim()];
		if (!mapped || mapped === "priceApproved" || mapped === "complementaryIds") continue;
		if (mapped === "technicalStatus") {
			if (value === "VERIFIED" || value === "USER_PROVIDED" || value === "OUTDATED" || value === "NEEDS_VERIFICATION") next.technicalStatus = value;
			continue;
		}
		next[mapped] = value.trim();
	}
	return next;
}
async function rowsFromCsv(text) {
	const matrix = [];
	let cell = "";
	let row = [];
	let quoted = false;
	for (let index = 0; index < text.length; index += 1) {
		const char = text[index];
		if (quoted) {
			if (char === "\"") {
				if (text[index + 1] === "\"") {
					cell += "\"";
					index += 1;
				} else quoted = false;
			} else cell += char;
		} else if (char === "\"") quoted = true;
		else if (char === ",") {
			row.push(cell);
			cell = "";
		} else if (char === "\n") {
			row.push(cell);
			matrix.push(row);
			row = [];
			cell = "";
		} else if (char !== "\r") cell += char;
	}
	row.push(cell);
	if (row.some((item) => item.trim())) matrix.push(row);
	const headers = matrix[0] ?? [];
	return matrix.slice(1).filter((line) => line.some((item) => item.trim())).map((line) => mapRow(Object.fromEntries(headers.map((header, index) => [header, line[index] ?? ""]))));
}
async function rowsFromExcel(buffer) {
	const XLSX = await import("../_libs/xlsx.mjs").then((n) => n.t);
	const book = XLSX.read(buffer, { type: "array" });
	const sheet = book.Sheets[book.SheetNames[0] ?? ""];
	if (!sheet) return [];
	return XLSX.utils.sheet_to_json(sheet, { defval: "" }).map((row) => mapRow(Object.fromEntries(Object.entries(row).map(([key, value]) => [key, String(value)]))));
}
//#endregion
export { ProductsPage as component };
