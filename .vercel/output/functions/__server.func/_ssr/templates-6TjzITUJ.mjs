import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Card, u as PageTitle } from "./shell-DG7LTl6a.mjs";
import { i as TEMPLATES } from "./compose-DuheWigm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/templates-6TjzITUJ.js
var import_jsx_runtime = require_jsx_runtime();
var HREF = {
	presentation: "/presentations",
	video: "/video",
	signage: "/signage",
	prompt: "/prompts"
};
function TemplatesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTitle, {
		eyebrow: "תבניות",
		title: "נקודת פתיחה, לא תוכן מומצא",
		lede: "כל תבנית מובילה למודול המתאים. הסגנון והקהל כבר מוצעים בטופס, והתוכן עדיין נבנה מהמוצר שבחרתם."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 md:grid-cols-2",
		children: TEMPLATES.map((template) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-accent",
				children: template.kind
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 text-lg font-semibold",
				children: template.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-6 text-muted",
				children: template.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					template.audience,
					" · ",
					template.visualStyle,
					" · ",
					template.format
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: HREF[template.kind],
				className: "mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary",
				children: "פתיחה במודול"
			})
		] }, template.templateId))
	})] });
}
//#endregion
export { TemplatesPage as component };
