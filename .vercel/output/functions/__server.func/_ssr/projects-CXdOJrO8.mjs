import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Card, l as Notice, m as messageOf, r as Button, t as Badge, u as PageTitle } from "./shell-DG7LTl6a.mjs";
import { R as setProjectStatusFn, o as deleteProjectFn, y as getProjects } from "./api-48hcTNoQ.mjs";
import { t as useLoad } from "./load-CEXbMbec.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-CXdOJrO8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProjectsPage() {
	const projects = useLoad(() => getProjects(), []);
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
			eyebrow: "פרויקטים",
			title: "כל העבודות השמורות",
			lede: "מצגות ותסריטי וידאו נשמרים כאן. מחיקה דורשת הרשאת עורך."
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
			tone: "danger",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: (projects.data ?? []).map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: project.projectName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						project.projectType,
						" · ",
						project.targetAudience,
						" · ",
						project.format
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: project.status }),
						project.projectType === "presentation" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/presentations/$projectId",
							params: { projectId: project.projectId },
							className: "inline-flex min-h-11 items-center rounded-lg border border-line px-3 text-sm",
							children: "פתיחה"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/video",
							className: "inline-flex min-h-11 items-center rounded-lg border border-line px-3 text-sm",
							children: "וידאו"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => void setProjectStatusFn({ data: {
								id: project.projectId,
								status: "APPROVED"
							} }).then(() => projects.reload()).catch((err) => setError(messageOf(err))),
							children: "אישור"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							onClick: () => void deleteProjectFn({ data: { id: project.projectId } }).then(() => projects.reload()).catch((err) => setError(messageOf(err))),
							children: "מחיקה"
						})
					]
				})]
			}, project.projectId))
		})
	] });
}
//#endregion
export { ProjectsPage as component };
