import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Card, l as Notice, m as messageOf, r as Button, t as Badge, u as PageTitle } from "./shell-DG7LTl6a.mjs";
import { C as getStatus, V as syncSheetsFn, n as checkSheetsFn } from "./api-48hcTNoQ.mjs";
import { t as useLoad } from "./load-CEXbMbec.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-MIBXve6e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const status = useLoad(() => getStatus(), []);
	const [message, setMessage] = (0, import_react.useState)("");
	const [tone, setTone] = (0, import_react.useState)("warn");
	const data = status.data;
	async function run(action) {
		try {
			if (action === "check") {
				const result = await checkSheetsFn();
				setTone(result.ok ? "ok" : "warn");
				setMessage(result.message);
			} else {
				const result = await syncSheetsFn();
				setTone(result.ok ? "ok" : "danger");
				setMessage(result.message);
			}
		} catch (error) {
			setTone("danger");
			setMessage(messageOf(error));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			eyebrow: "הגדרות",
			title: "מה מחובר באמת",
			lede: "המפתחות נשארים בשרת. כאן רואים רק אם הם קיימים. אין קובץ סודות במאגר."
		}),
		message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone,
			children: message
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Google Sheets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-6 text-muted",
						children: data?.sheets.message ?? "בודק…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: data?.sheets.configured ? "warn" : "neutral",
							children: data?.sheets.configured ? "משתנים הוגדרו" : "לא הוגדר"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: data?.sheets.spreadsheetIdSet ? "יש מזהה גיליון" : "אין מזהה גיליון" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => void run("check"),
							children: "בדיקת חיבור"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => void run("sync"),
							children: "סנכרון למנהל"
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium",
					children: "Google Drive"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-6 text-muted",
					children: data?.integrations.driveMessage
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium",
					children: "ספקי AI"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Grok · טקסט" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: data?.integrations.grok ? "ok" : "neutral",
								children: data?.integrations.grok ? "מחובר" : "לא מחובר"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Gemini" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: data?.integrations.gemini ? "מפתח קיים" : "אין מפתח" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "תמונה" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "warn",
								children: "לא הופעל בממשק"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "וידאו" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "כבוי" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "קריינות קולית" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "טקסט בלבד" })]
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium",
					children: "NotebookLM"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-6 text-muted",
					children: "אין אינטגרציה ישירה. שומרים קישור למחברת ומסמך שיוצא ממנה במסך הידע, ומשייכים אותם למוצר. חיפוש רץ על מה שנשמר אצלנו."
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: "משתני סביבה נדרשים"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-6 text-muted",
				children: "GOOGLE_APPS_SCRIPT_URL, GOOGLE_SHEETS_API_KEY, GOOGLE_SPREADSHEET_ID, GOOGLE_DRIVE_FOLDER_ID, AI_PROVIDER, GROK_API_KEY, GEMINI_API_KEY, AUTH_SECRET, APP_BASE_URL. המפתח הפעיל לטקסט בסביבה הזו הוא מפתח השרת של Grok, לא ערך שמוזן במסך."
			})]
		})
	] });
}
//#endregion
export { SettingsPage as component };
