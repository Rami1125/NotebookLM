import { w as require_jsx_runtime, x as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as Card, l as Notice, t as Badge, u as PageTitle } from "./_ssr/shell-DG7LTl6a.mjs";
import { C as getStatus, p as getDashboard } from "./_ssr/api-48hcTNoQ.mjs";
import { t as useLoad } from "./_ssr/load-CEXbMbec.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-moSWytq3.js
var import_jsx_runtime = require_jsx_runtime();
var SHORTCUTS = [
	{
		to: "/presentations",
		label: "מצגת חדשה"
	},
	{
		to: "/video",
		label: "תסריט וידאו"
	},
	{
		to: "/prompts",
		label: "פקודת AI"
	},
	{
		to: "/signage",
		label: "מסך דלפק"
	},
	{
		to: "/products",
		label: "מוצר"
	},
	{
		to: "/knowledge",
		label: "מקור ידע"
	}
];
function Dashboard() {
	const board = useLoad(() => getDashboard(), []);
	const status = useLoad(() => getStatus(), []);
	const counts = board.data?.counts;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			eyebrow: "לוח בקרה",
			title: "הבוקר בסטודיו",
			lede: "המספרים נמשכים מהמסד של הסטודיו. רשומות הפתיחה מסומנות כממתינות לאימות ואינן מפרט טכני."
		}),
		board.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: board.error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "מוצרים",
					value: counts?.products,
					hint: "במאגר"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "פרויקטים",
					value: counts?.projects,
					hint: "מצגות ווידאו"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "שקופיות",
					value: counts?.slides,
					hint: "שנוצרו"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "תסריטי וידאו",
					value: counts?.videos,
					hint: "לא קבצי וידאו"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "קמפיינים פעילים",
					value: counts?.activeCampaigns,
					hint: "בתהליך או מאושרים"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "מקורות מאומתים",
					value: counts?.verifiedSources,
					hint: "ידע טכני"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "ממתינים לאישור",
					value: counts?.pendingReview,
					hint: "פרויקטים"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "התפקיד שלי"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xl font-semibold",
						children: board.data?.member.role ?? "…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: board.data?.member.email || board.data?.member.name || "אחרי כניסה"
					})
				] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3 lg:grid-cols-[1.4fr_0.8fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: "פרויקטים אחרונים"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-2",
				children: (board.data?.recentProjects.length ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: board.loading ? "טוען…" : "עדיין אין פרויקטים שמורים."
				}) : board.data?.recentProjects.map((project) => project.projectType === "presentation" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/presentations/$projectId",
					params: { projectId: project.projectId },
					className: "flex items-center justify-between rounded-xl border border-line px-3 py-2 hover:bg-paper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-medium",
						children: project.projectName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted",
						children: ["מצגת · ", project.targetAudience]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: project.status === "PENDING_REVIEW" ? "warn" : "accent",
						children: project.status
					})]
				}, project.projectId) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/video",
					className: "flex items-center justify-between rounded-xl border border-line px-3 py-2 hover:bg-paper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-medium",
						children: project.projectName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted",
						children: ["וידאו · ", project.targetAudience]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: project.status === "PENDING_REVIEW" ? "warn" : "accent",
						children: project.status
					})]
				}, project.projectId))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium",
					children: "מצב חיבורים"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Google Sheets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: status.data?.sheets.configured ? "warn" : "neutral",
								children: status.data?.sheets.configured ? "הוגדר, ממתין לבדיקה" : "לא מחובר"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Google Drive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: status.data?.integrations.driveFolderSet ? "warn" : "neutral",
								children: status.data?.integrations.driveFolderSet ? "מזהה תיקייה בלבד" : "לא הוגדר"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Grok לטקסט" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: status.data?.integrations.grok ? "ok" : "neutral",
								children: status.data?.integrations.grok ? "זמין בלחיצה" : "לא זמין"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "קובץ וידאו" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "כבוי" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NotebookLM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "קישורים ידניים" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs leading-5 text-muted",
					children: status.data?.sheets.message
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-2 sm:grid-cols-3",
			children: SHORTCUTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.to,
				className: "rounded-2xl border border-line bg-surface px-4 py-3 text-sm font-medium hover:border-accent",
				children: item.label
			}, item.to))
		})
	] });
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-3xl font-semibold tabular-nums",
			children: value ?? "—"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: hint
		})
	] });
}
//#endregion
export { Dashboard as component };
