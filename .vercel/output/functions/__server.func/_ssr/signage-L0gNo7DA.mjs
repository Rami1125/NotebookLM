import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Select, i as Card, l as Notice, m as messageOf, o as Field, r as Button, s as Input, u as PageTitle } from "./shell-DG7LTl6a.mjs";
import { N as saveScreenFn, S as getScreens, c as deleteScreenFn, v as getProducts } from "./api-48hcTNoQ.mjs";
import { t as useLoad } from "./load-CEXbMbec.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signage-L0gNo7DA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SignagePage() {
	const products = useLoad(() => getProducts(), []);
	const screens = useLoad(() => getScreens(), []);
	const [error, setError] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("דלפק ראשי");
	const [screenType, setScreenType] = (0, import_react.useState)("counter");
	const [intervalSec, setIntervalSec] = (0, import_react.useState)(8);
	const [transition, setTransition] = (0, import_react.useState)("fade");
	const [picked, setPicked] = (0, import_react.useState)([]);
	function toggle(id) {
		setPicked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
	}
	async function save() {
		try {
			const screen = await saveScreenFn({ data: {
				name,
				screenType,
				productIds: picked,
				intervalSec: Number(intervalSec),
				transition
			} });
			toast.success("הפלייליסט נשמר. כתובת ההקרנה זמינה עכשיו.");
			screens.reload();
			setPicked([]);
			return screen;
		} catch (err) {
			setError(messageOf(err));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			eyebrow: "מסכי דלפק",
			title: "הקרנה 1920×1080",
			lede: "דלפק, לובי וחניון. המחיר מופיע רק אם הוזן ואושר בכרטיס המוצר. כתובת ההקרנה נוצרת אחרי שמירה."
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[1fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "שם המסך",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (event) => setName(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "סוג",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: screenType,
									onChange: (event) => setScreenType(event.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "counter",
											children: "דלפק"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "lobby",
											children: "לובי"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "parking",
											children: "חניון"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "שניות",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 4,
									max: 60,
									value: intervalSec,
									onChange: (event) => setIntervalSec(Number(event.target.value))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "מעבר",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: transition,
									onChange: (event) => setTransition(event.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "fade",
										children: "עמעום"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "slide",
										children: "החלקה"
									})]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid max-h-72 gap-1 overflow-auto",
						children: (products.data ?? []).map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm hover:bg-paper",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: picked.includes(product.productId),
								onChange: () => toggle(product.productId)
							}), product.nameHe]
						}, product.productId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: picked.length === 0 || name.trim().length < 2,
						onClick: () => void save(),
						children: "שמירת פלייליסט"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: "מסכים שמורים"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-2",
				children: [(screens.data ?? []).map((screen) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-line p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: screen.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								screen.screenType,
								" · ",
								screen.intervalSec,
								"ש · ",
								screen.productIds.length,
								" מוצרים"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/play/$playlistId",
								params: { playlistId: screen.screenId },
								className: "inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-sm text-primary-fg",
								children: "הקרנה"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "danger",
								onClick: () => void deleteScreenFn({ data: { id: screen.screenId } }).then(() => screens.reload()),
								children: "מחיקה"
							})]
						})
					]
				}, screen.screenId)), (screens.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "עדיין אין מסך שמור, ולכן אין כתובת הקרנה."
				}) : null]
			})] })]
		})
	] });
}
//#endregion
export { SignagePage as component };
