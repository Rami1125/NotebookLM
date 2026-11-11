import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Select, i as Card, l as Notice, m as messageOf, o as Field, r as Button, s as Input, u as PageTitle } from "./shell-DG7LTl6a.mjs";
import { g as getMedia, i as deleteMediaFn, j as saveMediaFn, v as getProducts } from "./api-48hcTNoQ.mjs";
import { t as useLoad } from "./load-CEXbMbec.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-CLwsFaCj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MediaPage() {
	const media = useLoad(() => getMedia(), []);
	const products = useLoad(() => getProducts(), []);
	const [error, setError] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
		fileName: "",
		mediaType: "image",
		productId: "",
		sourceType: "link",
		sourceUrl: "",
		storageUrl: "",
		licenseStatus: "UNSPECIFIED",
		notes: ""
	});
	async function save() {
		try {
			await saveMediaFn({ data: form });
			toast.success("המדיה נשמרה ככתובת");
			media.reload();
			setForm({
				...form,
				fileName: "",
				sourceUrl: "",
				storageUrl: "",
				notes: ""
			});
		} catch (err) {
			setError(messageOf(err));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			eyebrow: "ספריית מדיה",
			title: "מטא־דאטה, לא קבצים בתוך תא",
			lede: "תמונה ווידאו גדולים לא נשמרים בגיליון. שומרים שם קובץ, כתובת, סוג, מוצר ורישיון. Drive ו־Blob אינם מחוברים להעלאה."
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "grid gap-3 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "שם קובץ",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.fileName,
						onChange: (event) => setForm({
							...form,
							fileName: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "סוג",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: form.mediaType,
						onChange: (event) => setForm({
							...form,
							mediaType: event.target.value
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "image",
								children: "תמונה"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "video",
								children: "וידאו"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "document",
								children: "מסמך"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "audio",
								children: "שמע"
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
					label: "מקור",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: form.sourceType,
						onChange: (event) => setForm({
							...form,
							sourceType: event.target.value
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "link",
								children: "קישור"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "drive",
								children: "Drive"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "manufacturer",
								children: "יצרן"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "upload",
								children: "העלאה חיצונית"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "generated",
								children: "נוצר"
							})
						]
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
					label: "כתובת אחסון",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.storageUrl,
						onChange: (event) => setForm({
							...form,
							storageUrl: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "רישיון",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: form.licenseStatus,
						onChange: (event) => setForm({
							...form,
							licenseStatus: event.target.value
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "UNSPECIFIED",
								children: "לא צוין"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "OWNED",
								children: "בבעלות העסק"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "LICENSED",
								children: "ברישיון"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "MANUFACTURER",
								children: "חומר יצרן"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "RESTRICTED",
								children: "מוגבל"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "הערה",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.notes,
						onChange: (event) => setForm({
							...form,
							notes: event.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: !form.fileName.trim(),
						onClick: () => void save(),
						children: "שמירה"
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-3 md:grid-cols-2",
			children: (media.data ?? []).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: item.fileName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						item.mediaType,
						" · ",
						item.licenseStatus
					]
				}),
				item.storageUrl || item.sourceUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "mt-2 block truncate text-sm text-accent underline",
					href: item.storageUrl || item.sourceUrl,
					target: "_blank",
					rel: "noreferrer",
					children: item.storageUrl || item.sourceUrl
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					variant: "danger",
					onClick: () => void deleteMediaFn({ data: { id: item.mediaId } }).then(() => media.reload()),
					children: "מחיקה"
				})
			] }, item.mediaId))
		})
	] });
}
//#endregion
export { MediaPage as component };
