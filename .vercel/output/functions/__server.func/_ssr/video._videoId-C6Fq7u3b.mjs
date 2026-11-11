import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Card, l as Notice, m as messageOf, o as Field, p as TextArea, r as Button, s as Input, u as PageTitle } from "./shell-DG7LTl6a.mjs";
import { F as saveVideoFn, T as getVideoFn } from "./api-48hcTNoQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route$1 } from "./router-CbIY6VvA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/video._videoId-C6Fq7u3b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VideoEditor() {
	const { videoId } = Route$1.useParams();
	const [video, setVideo] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let live = true;
		getVideoFn({ data: { id: videoId } }).then((value) => {
			if (live) setVideo(value);
		}).catch((err) => {
			if (live) setError(messageOf(err));
		});
		return () => {
			live = false;
		};
	}, [videoId]);
	function patchScene(index, partial) {
		setVideo((current) => {
			if (!current) return current;
			const storyboard = current.storyboard.map((scene, sceneIndex) => sceneIndex === index ? {
				...scene,
				...partial
			} : scene);
			return {
				...current,
				storyboard
			};
		});
	}
	async function save() {
		if (!video) return;
		try {
			const next = await saveVideoFn({ data: {
				videoId: video.videoId,
				title: video.title,
				script: video.script,
				videoPrompt: video.videoPrompt,
				storyboard: video.storyboard
			} });
			setVideo(next);
			toast.success("נשמרה גרסה. הקובץ לא נוצר.");
		} catch (err) {
			setError(messageOf(err));
		}
	}
	async function copyPrompt() {
		if (!video) return;
		await navigator.clipboard.writeText(video.videoPrompt);
		toast.success("הפקודה הועתקה");
	}
	if (!video) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: error || "טוען תסריט…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			eyebrow: "עורך וידאו",
			title: video.title,
			lede: `${video.versions.length} גרסאות שמורות. סטטוס: ${video.status}. אין כתובת קובץ כי ספק הווידאו כבוי.`
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => void save(),
					children: "שמירת גרסה"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => void copyPrompt(),
					children: "העתקת פקודת וידאו"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "soft",
					disabled: true,
					title: "יצירת קובץ וידאו כבויה כדי לא להפעיל ספק בלי אישור",
					children: "יצירת קובץ וידאו כבויה"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "שם",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: video.title,
					onChange: (event) => setVideo({
						...video,
						title: event.target.value
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "תסריט",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						className: "min-h-40",
						value: video.script,
						onChange: (event) => setVideo({
							...video,
							script: event.target.value
						})
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: video.storyboard.map((scene, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-medium",
				children: [
					"סצנה ",
					scene.sceneNumber,
					" · ",
					scene.duration,
					" שניות"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-3 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "תיאור חזותי",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: scene.visualDescription,
							onChange: (event) => patchScene(index, { visualDescription: event.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "תנועת מצלמה",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: scene.cameraMovement,
							onChange: (event) => patchScene(index, { cameraMovement: event.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "תאורה",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: scene.lighting,
							onChange: (event) => patchScene(index, { lighting: event.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "קריינות",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: scene.voiceover,
							onChange: (event) => patchScene(index, { voiceover: event.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "טקסט על המסך",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: scene.onScreenText,
							onChange: (event) => patchScene(index, { onScreenText: event.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "פקודת AI",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: scene.aiVideoPrompt,
							onChange: (event) => patchScene(index, { aiVideoPrompt: event.target.value })
						})
					})
				]
			})] }, scene.sceneNumber))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium",
					children: "תצוגת פקודה מלאה"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-2 overflow-auto whitespace-pre-wrap rounded-xl bg-paper p-3 text-xs leading-5",
					children: video.videoPrompt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "מוזיקה: אין קובץ שמע במערכת. השתמשו רק ביצירה ברישיון שאושר מחוץ לסטודיו."
				})
			]
		})
	] });
}
//#endregion
export { VideoEditor as component };
