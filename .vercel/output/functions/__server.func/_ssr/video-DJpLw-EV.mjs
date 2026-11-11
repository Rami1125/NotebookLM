import { o as __toESM } from "../_runtime.mjs";
import { S as useNavigate, Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Empty, d as Select, i as Card, l as Notice, m as messageOf, o as Field, p as TextArea, r as Button, s as Input, u as PageTitle } from "./shell-DG7LTl6a.mjs";
import { E as getVideos, d as generateVideoFn, v as getProducts } from "./api-48hcTNoQ.mjs";
import { t as useLoad } from "./load-CEXbMbec.mjs";
import { t as AUDIENCES } from "./compose-DuheWigm.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/video-DJpLw-EV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VideoHome() {
	const navigate = useNavigate();
	const products = useLoad(() => getProducts(), []);
	const videos = useLoad(() => getVideos(), []);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		productId: "",
		targetAudience: AUDIENCES[0],
		goal: "להסביר את המוצר בלי נתון שלא אומת",
		duration: 30,
		aspectRatio: "16:9"
	});
	async function create() {
		setBusy(true);
		setError("");
		try {
			const video = await generateVideoFn({ data: {
				...form,
				duration: Number(form.duration)
			} });
			toast.success("התסריט נשמר. לא נוצר קובץ וידאו.");
			await navigate({
				to: "/video/$videoId",
				params: { videoId: video.videoId }
			});
		} catch (err) {
			setError(messageOf(err));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			eyebrow: "סטודיו וידאו",
			title: "תסריט ולוח סצנות",
			lede: "כאן נוצרים רעיון, קריינות, שוטים ופקודה למנוע וידאו. יצירת קובץ הווידאו עצמו כבויה עד שספק מדיה יופעל בנפרד."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: "ספק קובץ הווידאו לא פעיל. אפשר להעתיק את הפקודה למנוע חיצוני." }),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				tone: "danger",
				children: error
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "שם",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.title,
							onChange: (event) => setForm({
								...form,
								title: event.target.value
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
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "משך בשניות",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 15,
								max: 90,
								value: form.duration,
								onChange: (event) => setForm({
									...form,
									duration: Number(event.target.value)
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "יחס",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.aspectRatio,
								onChange: (event) => setForm({
									...form,
									aspectRatio: event.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "16:9" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "9:16" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "1:1" })
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: busy || !form.productId || form.title.trim().length < 2,
						onClick: () => void create(),
						children: busy ? "כותב תסריט…" : "יצירת תסריט"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: "תסריטים שמורים"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-2",
				children: [(videos.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					title: "אין תסריטים",
					body: "יצירה שומרת גרסת SCRIPT בלבד."
				}) : null, (videos.data ?? []).map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/video/$videoId",
					params: { videoId: video.videoId },
					className: "rounded-xl border border-line px-3 py-3 hover:bg-paper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium",
						children: video.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted",
						children: [
							video.aspectRatio,
							" · ",
							video.duration,
							"ש · ",
							video.status
						]
					})]
				}, video.videoId))]
			})] })]
		})
	] });
}
//#endregion
export { VideoHome as component };
