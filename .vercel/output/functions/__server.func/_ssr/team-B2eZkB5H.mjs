import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Select, i as Card, l as Notice, m as messageOf, r as Button, t as Badge, u as PageTitle } from "./shell-DG7LTl6a.mjs";
import { h as getLogs, w as getTeam, z as setRoleFn } from "./api-48hcTNoQ.mjs";
import { t as useLoad } from "./load-CEXbMbec.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team-B2eZkB5H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TeamPage() {
	const team = useLoad(() => getTeam(), []);
	const logs = useLoad(() => getLogs(), []);
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			eyebrow: "הרשאות",
			title: "מי יכול לערוך",
			lede: "מנהל, עורך וצופה. המשתמש הראשון שנכנס הופך למנהל. צופה יכול לקרוא ולא לשמור."
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: (team.data ?? []).map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: member.name || "בלי שם"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: member.email || member.userId
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: member.role === "ADMIN" ? "accent" : "neutral",
						children: member.role
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						className: "max-w-36",
						value: member.role,
						onChange: (event) => {
							const role = event.target.value;
							setRoleFn({ data: {
								userId: member.userId,
								role
							} }).then(() => team.reload()).catch((err) => setError(messageOf(err)));
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ADMIN",
								children: "ADMIN"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "EDITOR",
								children: "EDITOR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "VIEWER",
								children: "VIEWER"
							})
						]
					})]
				})]
			}, member.userId))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-6 mb-2 font-medium",
			children: "יומן פעולות"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [(logs.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "אין רשומות, או שאין הרשאה לצפות ביומן."
			}) : null, (logs.data ?? []).map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-surface px-3 py-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: log.action
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [
							" · ",
							log.entityType,
							" ",
							log.entityId,
							" · ",
							log.result
						]
					}),
					log.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-warn",
						children: [" · ", log.errorMessage]
					}) : null
				]
			}, log.logId))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-3",
			variant: "ghost",
			onClick: () => logs.reload(),
			children: "רענון יומן"
		})
	] });
}
//#endregion
export { TeamPage as component };
