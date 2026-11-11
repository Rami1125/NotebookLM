import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Card, l as Notice, m as messageOf, o as Field, p as TextArea, r as Button, s as Input, t as Badge, u as PageTitle } from "./shell-DG7LTl6a.mjs";
import { B as slideActionFn, O as rewriteFn, P as saveSlideFn, R as setProjectStatusFn, _ as getPresentationFn, l as exportPptxFn } from "./api-48hcTNoQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Route$2 } from "./router-CbIY6VvA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/presentations._projectId-B-e3WAwV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Editor() {
	const { projectId } = Route$2.useParams();
	const [slides, setSlides] = (0, import_react.useState)([]);
	const [active, setActive] = (0, import_react.useState)(0);
	const [title, setTitle] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const slide = slides[active];
	(0, import_react.useEffect)(() => {
		let live = true;
		getPresentationFn({ data: { id: projectId } }).then((result) => {
			if (!live) return;
			setSlides(result.slides);
			setTitle(result.project.projectName);
		}).catch((err) => {
			if (live) setError(messageOf(err));
		});
		return () => {
			live = false;
		};
	}, [projectId]);
	(0, import_react.useEffect)(() => {
		if (!slide) return;
		const handle = window.setTimeout(() => {
			setSaving(true);
			saveSlideFn({ data: {
				slideId: slide.slideId,
				title: slide.title,
				subtitle: slide.subtitle,
				body: slide.body,
				technicalContent: slide.technicalContent,
				imageUrl: slide.imageUrl,
				duration: slide.duration,
				benefit: slide.benefit,
				cta: slide.cta,
				warning: slide.warning,
				layout: slide.layout
			} }).catch((err) => setError(messageOf(err))).finally(() => setSaving(false));
		}, 700);
		return () => window.clearTimeout(handle);
	}, [slide]);
	function patch(partial) {
		setSlides((current) => current.map((item, index) => index === active ? {
			...item,
			...partial
		} : item));
	}
	async function act(action) {
		if (!slide) return;
		const next = await slideActionFn({ data: {
			slideId: slide.slideId,
			action
		} });
		setSlides(next);
		setActive((index) => Math.max(0, Math.min(index, next.length - 1)));
	}
	async function exportPptx() {
		try {
			const file = await exportPptxFn({ data: { id: projectId } });
			const bytes = Uint8Array.from(atob(file.base64), (char) => char.charCodeAt(0));
			const blob = new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
			const url = URL.createObjectURL(blob);
			const anchor = document.createElement("a");
			anchor.href = url;
			anchor.download = file.filename;
			anchor.click();
			URL.revokeObjectURL(url);
			toast.success("קובץ PPTX ירד");
		} catch (err) {
			setError(messageOf(err));
		}
	}
	async function polish() {
		if (!slide) return;
		const result = await rewriteFn({ data: {
			draft: `${slide.title}\n${slide.body}`,
			instruction: "שפרו את הניסוח השיווקי בלי להוסיף עובדות טכניות"
		} });
		if (!result.ok) {
			setError(result.error);
			return;
		}
		patch({ body: result.text });
		toast.success("הניסוח עודכן. בדקו אותו לפני פרסום.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			eyebrow: "עורך מצגת",
			title: title || "מצגת",
			lede: saving ? "שומר…" : "שמירה אוטומטית אחרי עריכה."
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-print mb-3 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => window.print(),
					children: "ייצוא PDF"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => void exportPptx(),
					children: "ייצוא PPTX"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "soft",
					onClick: () => void setProjectStatusFn({ data: {
						id: projectId,
						status: "PENDING_REVIEW"
					} }).then(() => toast.success("נשלח לאישור")),
					children: "שליחה לאישור"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					disabled: !slide,
					onClick: () => void polish(),
					children: "שיפור ניסוח עם Grok"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[16rem_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-print grid gap-2",
				children: slides.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setActive(index),
					className: `rounded-xl border px-3 py-2 text-right text-sm ${index === active ? "border-primary bg-primary text-primary-fg" : "border-line bg-surface"}`,
					children: [
						item.slideNumber,
						". ",
						item.title
					]
				}, item.slideId))
			}), slide ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "print-sheet aspect-video overflow-hidden bg-paper",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-accent",
							children: slide.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-3xl font-semibold text-primary",
							children: slide.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-2xl whitespace-pre-wrap text-base leading-7",
							children: slide.body
						}),
						slide.technicalContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 whitespace-pre-wrap text-sm text-muted",
							children: slide.technicalContent
						}) : null,
						slide.benefit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm font-medium",
							children: slide.benefit
						}) : null,
						slide.cta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-accent",
							children: slide.cta
						}) : null,
						slide.warning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 rounded-lg bg-warn-soft px-3 py-2 text-sm text-warn",
							children: slide.warning
						}) : null,
						slide.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: slide.imageUrl,
							alt: "",
							className: "mt-4 max-h-40 rounded-lg object-contain"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-5xl font-semibold text-primary/15",
							children: slide.title.slice(0, 1)
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "no-print grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: () => void act("up"),
									children: "למעלה"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: () => void act("down"),
									children: "למטה"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: () => void act("duplicate"),
									children: "שכפול"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "danger",
									onClick: () => void act("delete"),
									children: "מחיקה"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: slide.layout })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "כותרת",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: slide.title,
								onChange: (event) => patch({ title: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "כותרת משנה",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: slide.subtitle,
								onChange: (event) => patch({ subtitle: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "גוף",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
								value: slide.body,
								onChange: (event) => patch({ body: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "תוכן טכני",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
								value: slide.technicalContent,
								onChange: (event) => patch({ technicalContent: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "יתרון",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: slide.benefit,
								onChange: (event) => patch({ benefit: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "קריאה לפעולה",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: slide.cta,
								onChange: (event) => patch({ cta: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "אזהרה",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: slide.warning,
								onChange: (event) => patch({ warning: event.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "כתובת תמונה",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: slide.imageUrl,
								onChange: (event) => patch({ imageUrl: event.target.value })
							})
						})
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: error ? "" : "טוען שקופיות…"
			})]
		})
	] });
}
//#endregion
export { Editor as component };
