import { _ as Outlet, w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as LoginPanel, f as Shell, h as useCurrentUserState, n as BootScreen } from "./_ssr/shell-DG7LTl6a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-C5TI7xT5.js
var import_jsx_runtime = require_jsx_runtime();
function AppLayout() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginPanel, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AppLayout as component };
