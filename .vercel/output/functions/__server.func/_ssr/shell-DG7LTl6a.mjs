import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, m as useRouterState, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as signOut, r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { a as hasGateSessionMarker, t as GROK_PROVIDERS } from "./server-CR17Qwkr.mjs";
import { a as Settings, c as Megaphone, d as FolderKanban, f as Clapperboard, i as Shapes, l as LayoutDashboard, m as BookOpenText, o as Presentation, p as Boxes, r as Sparkles, s as MonitorPlay, t as Users, u as Images } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-DG7LTl6a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	return useSessionUserState();
}
function useSessionUserState() {
	const { data, isPending } = authClient.useSession();
	const id = data?.user.id;
	const displayName = data?.user.name ?? null;
	const primaryEmail = data?.user.email ?? null;
	const profileImageUrl = data?.user.image ?? null;
	const user = (0, import_react.useMemo)(() => id ? {
		id,
		displayName,
		primaryEmail,
		profileImageUrl,
		isDevFallback: false
	} : null, [
		id,
		displayName,
		primaryEmail,
		profileImageUrl
	]);
	return (0, import_react.useMemo)(() => ({
		user,
		isPending
	}), [user, isPending]);
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function cx(...parts) {
	return parts.filter(Boolean).join(" ");
}
function messageOf(error) {
	if (error instanceof Error && error.message) return error.message;
	return "הפעולה נכשלה";
}
function Button({ variant = "primary", className, ...props }) {
	const styles = {
		primary: "bg-primary text-primary-fg hover:brightness-110",
		ghost: "bg-surface text-ink border border-line hover:bg-paper",
		danger: "bg-danger-soft text-danger hover:brightness-95",
		soft: "bg-accent-soft text-primary hover:brightness-95"
	}[variant];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cx("inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition duration-150 disabled:cursor-not-allowed disabled:opacity-50", styles, className),
		...props
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1.5 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium text-ink",
			children: label
		}), children]
	});
}
var control = "min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink outline-none transition duration-150 placeholder:text-muted focus:border-accent";
function Input(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cx(control, props.className),
		...props
	});
}
function TextArea(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cx(control, "min-h-28 py-2", props.className),
		...props
	});
}
function Select(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cx(control, props.className),
		...props
	});
}
function Card({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cx("rounded-3xl border border-line bg-surface p-4 shadow-[0_12px_40px_-28px_rgba(16,35,58,0.45)]", className),
		children
	});
}
function Badge({ children, tone = "neutral" }) {
	const tones = {
		neutral: "bg-paper text-muted",
		ok: "bg-ok-soft text-ok",
		warn: "bg-warn-soft text-warn",
		danger: "bg-danger-soft text-danger",
		accent: "bg-accent-soft text-primary"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", tones),
		children
	});
}
function Empty({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-dashed border-line bg-paper px-4 py-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: body
		})]
	});
}
function Notice({ children, tone = "warn" }) {
	const tones = {
		warn: "bg-warn-soft text-warn",
		ok: "bg-ok-soft text-ok",
		danger: "bg-danger-soft text-danger"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cx("rounded-lg px-3 py-2 text-sm", tones),
		children
	});
}
var NAV = [
	{
		to: "/",
		label: "לוח בקרה",
		icon: LayoutDashboard
	},
	{
		to: "/presentations",
		label: "סטודיו מצגות",
		icon: Presentation
	},
	{
		to: "/video",
		label: "סטודיו וידאו",
		icon: Clapperboard
	},
	{
		to: "/prompts",
		label: "מחולל פקודות AI",
		icon: Sparkles
	},
	{
		to: "/signage",
		label: "מסכי דלפק",
		icon: MonitorPlay
	},
	{
		to: "/products",
		label: "ספריית מוצרים",
		icon: Boxes
	},
	{
		to: "/knowledge",
		label: "ידע טכני",
		icon: BookOpenText
	},
	{
		to: "/media",
		label: "ספריית מדיה",
		icon: Images
	},
	{
		to: "/campaigns",
		label: "קמפיינים",
		icon: Megaphone
	},
	{
		to: "/templates",
		label: "תבניות",
		icon: Shapes
	},
	{
		to: "/projects",
		label: "פרויקטים",
		icon: FolderKanban
	},
	{
		to: "/team",
		label: "משתמשים והרשאות",
		icon: Users
	},
	{
		to: "/settings",
		label: "הגדרות מערכת",
		icon: Settings
	}
];
function BootScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-paper px-6 text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.18em] text-accent",
					children: "SABAN CREATIVE STUDIO"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-3xl font-semibold",
					children: "ח. סבן חומרי בניין"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "טוען את הסטודיו…"
				})
			]
		})
	});
}
function LoginPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-paper px-4 text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-3xl border border-line bg-surface p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.16em] text-accent",
					children: "SABAN CREATIVE STUDIO"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-2xl font-semibold",
					children: "כניסה לסטודיו"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-6 text-muted",
					children: "המערכת של ח. סבן חומרי בניין (1994) בע״מ. אחרי הכניסה תקבלו תפקיד צופה, והמשתמש הראשון הופך למנהל."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-2",
					children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => signIn(provider.providerId, { callbackURL: "/" }),
						className: "min-h-11 rounded-lg border border-line bg-paper px-4 text-sm font-medium hover:bg-accent-soft",
						children: ["המשך עם ", provider.label]
					}, provider.providerId))
				})
			]
		})
	});
}
function Shell({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const { user } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink md:grid md:grid-cols-[16rem_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: cx("no-print border-l border-line bg-surface md:sticky md:top-0 md:flex md:h-screen md:flex-col", open ? "fixed inset-y-0 right-0 z-40 flex w-72 flex-col shadow-xl" : "hidden"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-line px-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-accent",
							children: "SABAN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base font-semibold",
							children: "סטודיו קריאייטיב"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "ח. סבן חומרי בניין"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 space-y-1 overflow-y-auto p-2",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							onClick: () => setOpen(false),
							className: cx("flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm", active ? "bg-primary text-primary-fg" : "text-ink hover:bg-paper"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-4 shrink-0",
								"aria-hidden": "true"
							}), item.label]
						}, item.to);
					})
				})]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "fixed inset-0 z-30 bg-ink/30 md:hidden",
				"aria-label": "סגירת תפריט",
				onClick: () => setOpen(false)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "no-print sticky top-0 z-20 flex min-h-16 items-center justify-between gap-3 border-b border-line bg-paper/95 px-4 backdrop-blur",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 rounded-lg border border-line bg-surface px-3 text-sm md:hidden",
							onClick: () => setOpen(true),
							children: "תפריט"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden md:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "סטודיו יצירה שיווקית וטכנית"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: user?.displayName || user?.primaryEmail || "משתמש מחובר"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto w-full max-w-6xl px-4 py-5",
					children
				})]
			})
		]
	});
}
function PageTitle({ eyebrow, title, lede }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-5",
		children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium text-accent",
				children: eyebrow
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: title
			}),
			lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-3xl text-sm leading-6 text-muted",
				children: lede
			}) : null
		]
	});
}
//#endregion
export { Empty as a, LoginPanel as c, Select as d, Shell as f, useCurrentUserState as h, Card as i, Notice as l, messageOf as m, BootScreen as n, Field as o, TextArea as p, Button as r, Input as s, Badge as t, PageTitle as u };
