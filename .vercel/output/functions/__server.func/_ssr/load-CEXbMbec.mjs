import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as messageOf } from "./shell-DG7LTl6a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/load-CEXbMbec.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useLoad(loader, deps) {
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const reload = (0, import_react.useCallback)(() => {
		let live = true;
		setLoading(true);
		setError("");
		loader().then((value) => {
			if (live) setData(value);
		}).catch((error) => {
			if (live) setError(messageOf(error));
		}).finally(() => {
			if (live) setLoading(false);
		});
		return () => {
			live = false;
		};
	}, deps);
	(0, import_react.useEffect)(() => reload(), [reload]);
	return {
		data,
		error,
		loading,
		reload,
		setData
	};
}
//#endregion
export { useLoad as t };
