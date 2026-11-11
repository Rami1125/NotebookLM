import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as LoginPanel, h as useCurrentUserState, m as messageOf, n as BootScreen } from "./shell-DG7LTl6a.mjs";
import { x as getScreenFn } from "./api-48hcTNoQ.mjs";
import { u as statusLabel } from "./compose-DuheWigm.mjs";
import { i as Route$3 } from "./router-CbIY6VvA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play._playlistId-Cco6kQap.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlayGate() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginPanel, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Player, {});
}
function Player() {
	const { playlistId } = Route$3.useParams();
	const [screen, setScreen] = (0, import_react.useState)(null);
	const [products, setProducts] = (0, import_react.useState)([]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)("");
	const [scale, setScale] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		let live = true;
		getScreenFn({ data: { id: playlistId } }).then((result) => {
			if (!live) return;
			setScreen(result.screen);
			setProducts(result.products);
		}).catch((err) => {
			if (live) setError(messageOf(err));
		});
		return () => {
			live = false;
		};
	}, [playlistId]);
	(0, import_react.useEffect)(() => {
		const fit = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
		fit();
		window.addEventListener("resize", fit);
		return () => window.removeEventListener("resize", fit);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!screen || products.length < 2) return;
		const timer = window.setInterval(() => {
			setIndex((value) => (value + 1) % products.length);
		}, screen.intervalSec * 1e3);
		return () => window.clearInterval(timer);
	}, [screen, products.length]);
	const product = products[index];
	const dark = screen?.screenType === "parking";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid min-h-screen place-items-center bg-ink text-primary-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative overflow-hidden",
			style: {
				width: 1920 * scale,
				height: 1080 * scale
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `absolute top-0 right-0 origin-top-right ${dark ? "bg-primary text-primary-fg" : "bg-paper text-ink"}`,
				style: {
					width: 1920,
					height: 1080,
					transform: `scale(${scale})`
				},
				children: !product || !screen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-full place-items-center text-3xl",
					children: error || "טוען מסך…"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: `grid h-full grid-cols-2 gap-16 p-20 ${screen.transition === "slide" ? "animate-[signage-slide_600ms_ease]" : "animate-[signage-fade_600ms_ease]"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-center",
						children: [
							screen.screenType === "lobby" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl text-accent",
								children: "ח. סבן חומרי בניין · 1994"
							}) : null,
							screen.screenType === "parking" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl text-accent",
								children: "סבן · חניון"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-3xl text-accent",
								children: product.category || "חומר בנייה"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 text-7xl leading-tight font-semibold",
								children: product.nameHe
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-8 max-w-3xl text-4xl leading-snug",
								children: product.marketingBenefits.split("\n").find(Boolean) || "שאלו את הצוות בסניף"
							}),
							product.technicalStatus !== "VERIFIED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-8 text-2xl text-warn",
								children: ["פרטים טכניים רק לפי גיליון היצרן · ", statusLabel(product.technicalStatus)]
							}) : null,
							product.priceApproved && product.priceText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-8 text-4xl",
								children: product.priceText
							}) : null,
							product.promoText && product.priceApproved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-2xl",
								children: product.promoText
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `grid place-items-center rounded-3xl ${dark ? "bg-white/10" : "bg-surface"}`,
						children: product.productImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: product.productImageUrl,
							alt: "",
							className: "max-h-[70%] max-w-[80%] object-contain"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-9xl font-semibold text-primary/20",
							children: product.nameHe.slice(0, 1)
						})
					})]
				}, product.productId)
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `@keyframes signage-fade{from{opacity:0}to{opacity:1}}@keyframes signage-slide{from{transform:translateX(-24px);opacity:.4}to{transform:none;opacity:1}}` })]
	});
}
//#endregion
export { PlayGate as component };
